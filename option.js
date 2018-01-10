/**
 * Created by Administrator on 2018/1/8/008.
 */
var state = loginJudge();
var $rose = $("#rose");//增长率
if (!state) {
    $(".login-judge").show();
    $("#loading_coin").hide();
    $("#loginButton").click(function(){
        loginEvent();
    })
    $("#signUpButton").click(function(){
        loginEvent();
        signUp();
    })
} else {
    $(".login-judge").hide();
    var loginUser = new User(state.loginName,state.member_id);
    loginUser.setBalance(CookieUtil.getCookie('balance'));
    console.log(parseFloat(loginUser.getBalance()).toFixed(2));
    $account.text(parseFloat(loginUser.getBalance()).toFixed(2));
    loginUser.getBettingHistory();
}

$("html").on('click','#tradeHistoryPage li a',function(event){
    if (!loginJudge()) {
        console.log('no user');
        return false;
    }
    console.log(1);
    if($(this).parent('li').hasClass('active')){
        return false;
    } else if($(this).parent('li').hasClass('disabled')){
        return false;
    } else {
        $("#loading_coin").show();
        loginUser.getBettingHistory($(this).attr("data-page"));
    }
})
$("#logout,.phoneLogout").click(function(){
    logout();
    loginJudge();
    logout();
    $(".login-judge-area").show();
    $("#loading_coin").hide();
    $("#historyTrade thead").empty();
    try {
        if(loginUser) {
            loginUser = null;
            $account.text('0.00');
        }
    } catch (err){

    }
});

$(function() {
    var socket;
    if(!!window.WebSocket && !!window.WebSocket.prototype.send){
        socket  = new WebSocket('wss://www.mtum.com/THBIT/portfolio');
        //socket = new WebSocket('ws://18.221.215.188:8082/THBIT/portfolio');
    } else {
        socket = new SockJS('/THBIT/sockjs/portfolio');
    }
    //var socket = new SockJS('http://192.168.14.178:8080/THBIT/sockjs/portfolio');
    //var socket = new SockJS('/THBIT/sockjs/portfolio');
    //var socket = new SockJS('/THBIT/sockjs/portfolio');
    var stompClient = Stomp.over(socket);
    var periodsno;//游戏期数
    var $swellMoney = $("#swellMoney"); //赌涨金额
    var $tumbleMoney = $("#tumbleMoney"); //赌跌金额
    var $swellOdds = $("#swellOdds"); //赌涨赔率
    var $tumbleOdds = $("#tumbleOdds"); //赌跌赔率
    var $highterTotal = $(".highter-total"); //赌涨总金额div
    var $lowterTotal = $(".lowter-total"); //赌跌总金额div
    var tradeData = []; //交易（下赌注）时的数据

    var trade = {
        tradeMoney: [],
        xAxis: [],
        yAxis: [],
        tradeTimestamp: []
    };//投注点

    playGameChart.showLoading(gameChart.defaultConfig); //echarts加载动画

    //设置赔率显示、赢的币的比例等显示函数
    function setOddsDisplay(data) {
        $swellMoney.text(parseFloat(data.swellmoney).toFixed(2));
        $tumbleMoney.text(parseFloat(data.tumblemoney).toFixed(2));
        if (data.swellmoney == 0 || data.tumblemoney == 0) {
            $swellOdds.text(1);
            $tumbleOdds.text(1);
            $highterTotal.animate({width: '49.5%'});
            $lowterTotal.animate({width: '49.5%'});
        } else {
            $highterTotal.animate({width: (data.swellmoney / (data.swellmoney + data.tumblemoney)) * 99 + '%'});
            $lowterTotal.animate({width: (data.tumblemoney / (data.swellmoney + data.tumblemoney)) * 99 + '%'});
            //console.log((1 + (data.tumblemoney/data.swellmoney)).toFixed(2));
            $swellOdds.text((1 + (data.tumblemoney / data.swellmoney)).toFixed(2));
            $tumbleOdds.text((1 + (data.swellmoney / data.tumblemoney)).toFixed(2));
        }
    }

    stompClient.connect("","", function (frame) {
        playGameChart.hideLoading();
        //console.log(1);
        //订阅服务，获取当前期数数据
        stompClient.subscribe('/app/periodsNo', function (data) {
           // console.log(JSON.parse(data.body));
            if (data.body) {
                data = JSON.parse(data.body);
                periodsno = data.periodsno;
                dataTimes.date.date = [];
                dataTimes.date.timestamp = [];
                GBIIndex = [];
                for (var i = data.startdatetime; i <= data.enddatetime; i += timeUnit) {
                    dataTimes.date.date.push(getDateSecondTime(new Date(i * 1000)));
                    dataTimes.date.timestamp.push(i);
                }
                xValue = data.expirydatetime; //截止投注时间
                value = data.initvalue;        //当前期数开始时的指数值
                console.log(dataTimes);
                setOddsDisplay(data);

                stompClient.subscribe('/app/periodsGBIExponential', function (data) { //订阅消息  当前期数BTC指数数据
                    data = JSON.parse(data.body);
                    startTradeOption();
                    if (data.length != 0) {
                        var i;
                        for (i = 0; i < data.length; i++) {
                            GBIIndex.push(parseFloat(data[i].gbi));
                        }
                        i = data.length - 1;
                        if(value != 0){
                            //$rose.text(((parseFloat(data[i].gbi) - value)/value*100).toFixed(2));
                            if(data[i].gbi > value) {
                                $(".option-rose").addClass('add').removeClass('reduce');
                                $rose.text('+' + ((parseFloat(data[i].gbi) - value)/value*100).toFixed(2));
                            } else {
                                $(".option-rose").removeClass('add').addClass('reduce');
                                $rose.text(((parseFloat(data[i].gbi) - value)/value*100).toFixed(2));
                            }
                            playGameChart.setOption({
                                xAxis: [{
                                    data: dataTimes.date.date
                                }],
                                yAxis: [{
                                    min: function (value) {
                                        return parseInt((Math.floor(value.min) - 10) / 10) * 10;
                                    },
                                    max: function (value) {
                                        return parseInt((Math.floor(value.max) + 20) / 10) * 10;
                                    }
                                }],
                                series: [{
                                    name: 'Index',
                                    data: GBIIndex,
                                    markLine: {
                                        data: [
                                            {yAxis: value, name: 'Start Index'},
                                            {xAxis: getDateSecondTime(new Date(xValue * 1000)), name: 'End Time'}
                                        ]
                                    }
                                }]
                            })
                        } else {
                            value = data[0].gbi;
                            playGameChart.setOption({
                                xAxis: [{
                                    data: dataTimes.date.date
                                }],
                                yAxis: [{
                                    min: function (value) {
                                        return parseInt((Math.floor(value.min) - 10) / 10) * 10;
                                    },
                                    max: function (value) {
                                        return parseInt((Math.floor(value.max) + 20) / 10) * 10;
                                    }
                                }],
                                series: [{
                                    name: 'GBI',
                                    data: GBIIndex
                                }]
                            })
                        }
                    }
                });
            }
        })

        stompClient.subscribe('/topic/createPeriods', function (data) { //新生成的期数数据
            //console.log(JSON.parse(data.body));
            if (data.body) {
                startTradeOption();
                data = JSON.parse(data.body);
                periodsno = data.periodsno;
                dataTimes.date.date = [];
                dataTimes.date.timestamp = [];
                GBIIndex = [];
                for (var i = data.startdatetime; i <= data.enddatetime; i += timeUnit) {
                    dataTimes.date.date.push(getDateSecondTime(new Date(i * timeUnit*1000)));
                    dataTimes.date.timestamp.push(i);
                }
                setOddsDisplay(data);
                xValue = data.expirydatetime; //截止投注时间
                console.log(dataTimes);
                newOption = true;

                value = data.initvalue;//初始指数

                GBIIndex.push(data.initvalue);
                playGameChart.setOption({
                    series: {
                        data: GBIIndex,
                        markLine: {
                            data: [
                                {yAxis: value, name: 'Start Index'},
                                {xAxis: getDateSecondTime(new Date(xValue * 1000)), name: 'End Time'}
                            ]
                        },
                        markPoint: {
                            data: [{
                                xAxis: dataTimes.date.date[GBIIndex.length - 1],
                                yAxis: GBIIndex[GBIIndex.length - 1]
                            }]
                        }
                    },
                    xAxis: {
                        data: dataTimes.date.date
                    },
                    yAxis: [{
                        min: function (value) {
                            return parseInt((Math.floor(value.min) - 10) / 10) * 10;
                        },
                        max: function (value) {
                            return parseInt((Math.floor(value.max) + 20) / 10) * 10;
                        }
                    }]
                });
            }
        })

        //订阅gbi指数服务，每1s一次
        stompClient.subscribe('/topic/gbiExponential', function (data) {
            data = JSON.parse(data.body);

            GBIIndex.push(parseFloat(data.GBIExponential.gbi));
            var xData = getDateSecondTime(new Date(data.GBIExponential._id*1000));
            var yLength = GBIIndex.length;
            dataTimes.date.timestamp[yLength - 1] = data.GBIExponential._id;
            dataTimes.date.date[yLength - 1] = xData;

            if (data.GBIExponential._id >= xValue) {
                pauseTradeOption();
                $("#trade_modal").modal('hide');
            }
            else startTradeOption();

            if(value != 0){
                //console.log(data.GBIExponential.gbi);
                if(data.GBIExponential.gbi > value) {
                    $(".option-rose").addClass('add').removeClass('reduce');
                    $rose.text('+' + ((parseFloat(data.GBIExponential.gbi) - value) / value * 100).toFixed(2));
                } else {
                    $(".option-rose").removeClass('add').addClass('reduce');
                    $rose.text(((parseFloat(data.GBIExponential.gbi) - value) / value * 100).toFixed(2));
                }
            }

            setOddsDisplay(data.PeriodsEModel);
            // console.log(playGameChart.getOption());

            playGameChart.setOption({
                series: {
                    data: GBIIndex,
                    markPoint: {
                        data: [{
                            //xAxis: dataTimes.date.date[GBIIndex.length - 1],
                            xAxis: xData,
                            yAxis: GBIIndex[GBIIndex.length - 1]
                        }]
                    }
                },
                xAxis: {
                    data: dataTimes.date.date
                    //data: xData
                },
                yAxis: [{
                    min: function (value) {
                        return parseInt((Math.floor(value.min) - 10) / 10) * 10;
                    },
                    max: function (value) {
                        return parseInt((Math.floor(value.max) + 20) / 10) * 10;
                    }
                }]
            });
            var tradeLength = trade.xAxis.length;
            if(tradeLength != 0){
                var height = playGameChart.getHeight();
                for(var j = 0;j < tradeLength;j++){
                    var point = playGameChart.convertToPixel({seriesIndex: 0},[trade.xAxis[j],trade.yAxis[j]]);
                    var left = point[0] - $(".trade-point").eq(j).width() - 20 + 'px';
                    var bottom = height - point[1] + 4 + 'px';
                    $(".trade-point").eq(j).css({
                        left: left,
                        bottom: bottom
                    })
                }
            }

            if(value&&xValue){
                playGameChart.setOption({
                    series: {
                        markLine: {
                            data: [
                                {yAxis: value, name: 'Start Index'},
                                {xAxis: getDateSecondTime(new Date(xValue * 1000)), name: 'End Time'}
                            ]
                        }
                    }
                })
            }
        });

        //结束
        stompClient.subscribe("/topic/endPeriods", function (data) {
            console.log(data.body);
            if (!!data.body && !!JSON.parse(data.body)) {
                data = JSON.parse(data.body);
                GBIIndex.push(data.endvalue);
                //console.log(dataTimes);
                pauseTradeOption();

                var xData = getDateSecondTime(new Date(data.enddatetime*1000));
                var yLength = GBIIndex.length;
                dataTimes.date.timestamp[yLength - 1] = data.enddatetime;
                dataTimes.date.date[yLength - 1] = xData;

                if(value != 0){
                    if(data.endvalue > value) {
                        $rose.text('+' + ((parseFloat(data.endvalue) - value) / value * 100).toFixed(2));
                    } else {
                        $rose.text(((parseFloat(data.endvalue) - value) / value * 100).toFixed(2));
                    }
                }

                playGameChart.setOption({
                    series: {
                        data: GBIIndex,
                        markPoint: {
                            data: [{
                                xAxis: xData,
                                yAxis: GBIIndex[GBIIndex.length - 1]
                            }]
                        }
                    },
                    xAxis: {
                        data: dataTimes.date.date
                    },
                    yAxis: [{
                        min: function (value) {
                            return parseInt((Math.floor(value.min) - 10) / 10) * 10;
                        },
                        max: function (value) {
                            return parseInt((Math.floor(value.max) + 20) / 10) * 10;
                        }
                    }]
                });
            }
        });

        var tradetime;
        $(".btn-call").click(function () {
            console.log(123);
            if(!loginJudge()){
                loginEvent();
            } else {
                var amount = parseFloat($("#amount").val());
                var action = "Up";
                var username = loginUser.loginName;
                console.log(username);
                tradetime = parseInt(new Date().getTime()/1000);

                $("#tradeMoney").text(amount);
                $("#trade_modal").modal('toggle');
                $("#confirmTrade").unbind('click').click(function(){
                    tradeData.push({
                        periodsno: periodsno,
                        amount: amount,
                        action: action,
                        username: username,
                        tradetime: tradetime
                    });
                    stompClient.send("/app/tradePay", {}, JSON.stringify(tradeData[tradeData.length - 1]));
                })
            }
        })

        $(".btn-put").click(function () {
            if (!loginUser) {
                loginEvent();
            } else {
                var amount = parseFloat($("#amount").val());
                var action = "Down";
                var username = loginUser.loginName;
                console.log(username);
                tradetime = parseInt(new Date().getTime()/1000);
                $("#tradeMoney").text(amount);
                $("#trade_modal").modal('toggle');
                $("#confirmTrade").unbind('click').click(function(){
                    tradeData.push({
                        periodsno: periodsno,
                        amount: amount,
                        action: action,
                        username: username,
                        tradetime: tradetime
                    });
                    stompClient.send("/app/tradePay", {}, JSON.stringify(tradeData[tradeData.length - 1]));
                })
            }
        })

        if(loginUser!=null) {
            //收到交易之后的用户余额信息
            stompClient.subscribe('/user/' + loginUser.loginName + '/queue/amount-updates', function (data) {
                console.log(data.body);
                loginUser.setBalance(data.body);
                // debugger;
                var oldBalance = parseFloat($account.text());
                var newBalance = parseFloat(parseFloat(data.body).toFixed(2));
                var gapTime = (Math.abs(oldBalance - newBalance))/0.01;
                var timer = 2000/gapTime;
                function doScaledTimeout(i,times) {
                    setTimeout(function() {
                        $account.text(i);
                    }, times * timer);
                }

                var times = 0;
                for(var j = oldBalance;j > newBalance;j-=0.01){
                    times++;
                    doScaledTimeout(j.toFixed(2),times);
                }

                trade.tradeMoney.push((tradeData[tradeData.length - 1].amount).toFixed(2));
                var dataLength = GBIIndex.length - 1;
                trade.xAxis.push(dataTimes.date.date[dataLength]);
                trade.yAxis.push(GBIIndex[dataLength]);

                var startTimestamp = dataTimes.date.timestamp[0];
                var stopTimestamp = dataTimes.date.timestamp[dataTimes.date.timestamp.length - 1];
                trade.tradeTimestamp.push(dataTimes.date.timestamp[dataLength]);
                //debugger;
                var option = playGameChart.getOption();

                var width = playGameChart.getWidth();
                var height = playGameChart.getHeight();
                var tradeTimes = trade.xAxis.length - 1;
                var point = playGameChart.convertToPixel({seriesIndex: 0},[trade.xAxis[tradeTimes],trade.yAxis[tradeTimes]]);
               // console.log(point);
                var left = point[0] - 64 + 'px';
                var bottom = height - point[1] + 4 + 'px';
                var color,styleTypeClass;
                console.clear();
                console.log(trade);
                console.log(tradeData);
                console.log(tradeTimes);
                if(tradeData[tradeTimes].action == "Up"){
                    color = '#33ac48';
                    styleTypeClass = 'icon-caret-up-small';
                } else {
                    color = '#db4931';
                    styleTypeClass = 'icon-shang-copy';
                }

                var style = 'left:' + left + ';bottom:' + bottom + ';background:' + color;
                var markTradePoint = "<div class='trade-point' style='" + style + "'>" + trade.tradeMoney[tradeTimes];
                markTradePoint+= "<div class='font-circle' style='background:" + color + "'><i class='iconfont " + styleTypeClass + "'";
                markTradePoint += "></i>" + "</div></div>";

                $("#option").children('div').append(markTradePoint);
                var $trade = $(".trade-point");
                var length = $trade.length;
                $trade.eq(length - 1).css('left',left + 64 - $trade.eq(length - 1).width() - 20);

                //$account.text(parseFloat(data.body).toFixed(2));
            });

            //收到游戏结束时用户的余额及赌注等信息
            stompClient.subscribe('/user/' + loginUser.loginName + '/queue/amount-TradeInfo', function (data) {
                console.log(JSON.parse(data.body));
                //清空交易数据
                $(".trade-point").remove();
                trade = {
                    tradeMoney: [],
                    xAxis: [],
                    yAxis: [],
                    tradeTimestamp: []
                };
                tradeData = [];

                data = JSON.parse(data.body);
                var optionResult,symbol;
                if (data.winMoney < 0) {
                    stopOptionGame(false,data.winMoney);
                    optionResult = "Lose";
                    symbol = "";
                } else if(data.winMoney == 0){
                    stopOptionGame(1, data.winMoney);
                    loginUser.setBalance(parseFloat(loginUser.getBalance()) + data.winMoney + data.dealMoney);
                    $account.text((parseFloat(loginUser.getBalance())).toFixed(2));
                    optionResult = "Draw";
                    symbol = "";
                } else {
                    stopOptionGame(1, data.winMoney);
                    loginUser.setBalance(parseFloat(loginUser.getBalance()) + data.winMoney + data.dealMoney);
                    $account.text((parseFloat(loginUser.getBalance())).toFixed(2));
                    optionResult = "Win";
                    symbol = "+";
                }

                //更新交易信息
                var str = "<tr><td>" + data.periodsNo + "</td>";
                str += "<td>" + getYearDateTime(new Date(tradetime * 1000)) + "</td>";
                str += "<td>" + optionResult + "</td>";
                str += "<td>" + gameCoinUnit + " " + data.dealMoney + "</td>";
                str += "<td>" + gameCoinUnit + " " + symbol + data.winMoney + "</td></tr>";
                if($("#tradeHistoryPage .active").attr("id") != 1) {
                    var $elem = $("#historyTrade tbody");
                    if ($elem.children('tr').length == 10) {
                        $elem.prepend(str).children('tr:last-child').remove();
                    } else {
                        $elem.prepend(str);
                    }
                } else {
                    loginUser.getBettingHistory(0);
                }
            });
        }
    })
})