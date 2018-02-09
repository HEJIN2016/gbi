/**
 * Created by Administrator on 2017/12/28/028.
 * Option Game
 */

var $amount = $("#amount");
var $account = $("#account");

function getMinutesTime() {
    return {
        date: {
            date: [],
            timestamp: []
        }
    };
}

//Echarts绘图配置
var gameChart = {
    elemId: 'option',
    color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(119,186,230,0.11)'
        }, {
            offset: 1, color: 'rgba(138,205,172,0.11)'
        }]
    },
    //echarts loading参数
    defaultConfig: {
        text: 'loading',
        //color: '#c23531',
        textColor: '#fff',
         maskColor: '#0a0c10',
       // maskColor: 'rgba(46, 51, 53, 1)',
        zlevel: 0
    },
    option: indexOption2()
}

var playGameChart = echarts.init(document.getElementById(gameChart.elemId));
playGameChart.setOption(gameChart.option);

window.onresize = function () {
    playGameChart.resize();
    setHTMLFontSize();
}

//二元期权游戏 试玩
var Game = {
    value: {
        date: {
            date: [],      //时间 format("HH:mm:ss")
            timestamp: []  //时间戳
        },
        data:[]            //指数数据
    },
    playUser: null,   //游戏玩家
    odds: 1,  //赔率
    playTimes: 0, //绘图次数
    startGameTime: null, //游戏开始时间
    xIndex: null,     //xIndex为赌局截止时间
    startIndex: null, //startIndex为赌局开始时的指数，
    stopGameTime: 0, // 结束时间

    //清除数据
    clearData: function(){
        this.value = {
            date: {
                date: [],      //时间 format("HH:mm:ss")
                timestamp: []  //时间戳
            },
            data:[]            //指数数据
        };
        this.playTimes = 0;
        this.startGameTime = null;
        this.xIndex = null;
        this.startIndex = null;
        this.stopGameTime = 0 ;
    },

    //echarts填充数据函数
    setChartOption: function(xIndex,startIndex,stopTime){
        playGameChart.setOption({
            xAxis: [{
                data: this.value.date.date
            }],
            series: [{
                data: this.value.data,
                areaStyle: {
                    normal: {
                        color: gameChart.color
                    }
                },
                markLine: {
                    data: [
                        {yAxis: startIndex, name: 'Start Index'},
                        {xAxis: getDateSecondTime(new Date(xIndex)), name: 'End Betting Time'},
                        {xAxis: getDateSecondTime(new Date(stopTime)), name: 'End Time'},
                    ]
                },
                markPoint: {
                    data: [{
                        xAxis: this.value.date.date[this.value.data.length - 1],
                        yAxis: this.value.data[this.value.data.length - 1]
                    }]
                }
            }]
        })
    },

    //初始化echarts
    initChart: function(){
        //gameChart.call(this,this.option,this.chart);
        //playGameChart.setOption(gameChart.option);
    },
    //设置第一批时间和指数数据
    setInitData: function(){
        //清除数据
        this.value =  {
            date: {
                date: [],      //时间 format("HH:mm:ss")
                    timestamp: []  //时间戳
            },
            data:[]            //指数数据
        };
        //添加1分钟的时间数据，总共60s
        var startTime = Date.now();
        var i= 0;
        for(i = startTime; i < startTime + 60000; i+=1000){
            this.value.date.date.push(getDateSecondTime(new Date(i)));
            this.value.date.timestamp.push(i);
        }
        this.value.data.push(parseInt(11000 + 1600 * Math.random()));
        this.startIndex = this.value.data[0];
        var timeLength = this.value.date.timestamp.length;
        this.stopGameTime = this.value.date.timestamp[timeLength - 1];
    },
    //试玩功能，每过1s添加一条数据
    addGameData: function(state){
        var dataLength = this.value.data.length;
        this.value.data.push(parseInt(this.value.data[dataLength - 1] + this.value.data[dataLength - 1] * getRandomMultiple(state)));
        this.playTimes++;
    },
    //试玩游戏初始化
    initGame: function(){
        this.clearData();
        this.setInitData();
        var length = this.value.data.length;
        this.startGameTime = this.value.date.timestamp[0];
        //this.startIndex = this.value.data[9];
        this.startIndex = this.value.data[0];
        this.xIndex = this.startGameTime + 39000;
        this.setChartOption(this.xIndex,this.startIndex);
    },
    //试玩游戏定时器
    gameInter: null,
    //试玩函数入口
    init: function(obj){
        if(obj) {
            this.odds = obj.odds;
            this.playUser = obj.User;
        }
        if(this.gameInter) clearInterval(this.gameInter);
        this.initChart();
        this.initGame();
        this.gameInter = setInterval(function(){
            if(Date.now() < this.stopGameTime) {
                this.addGameData();
                var length = this.value.data.length;
                this.startGameTime = this.value.date.timestamp[0];
                //this.startIndex = this.value.data[length - 1];
                this.startIndex = this.value.data[0];
                this.xIndex = this.startGameTime + 39000;
                this.stopGameTime = this.value.date.timestamp[this.value.date.timestamp.length - 1];
                this.setChartOption(this.xIndex, this.startIndex, this.stopGameTime);
                //console.log(this.xIndex);
            } else {
                this.init();
            }
        }.bind(this),1000);
    },
    //开始试玩
    startPlayGames: function(state,amount){
        this.playUser.changeBalance((parseFloat($account.text()) - parseFloat(amount)).toFixed(2));//玩家余额减少
        $account.text(this.playUser.balance);
        $(".option-amount .btn").attr("disabled","disabled");
        clearInterval(this.gameInter);
        var currentDataLength = this.value.data.length;
        var startPlayIndex = this.value.data[currentDataLength - 1];
        var stopPlayIndex,gameResult;
        this.addGameData(state);
        this.setChartOption(this.xIndex,this.startIndex,this.stopGameTime);
        var playGames = setInterval(function(){
            if(Date.now() < this.stopGameTime) {
                this.addGameData();
                this.setChartOption(this.xIndex,this.startIndex,this.stopGameTime);
            }  else {
                this.addGameData();
                this.setChartOption(this.xIndex,this.startIndex);
                stopPlayIndex = this.value.data[this.value.data.length - 1];
                console.log(startPlayIndex);
                console.log(stopPlayIndex);
                //console.log(dataTimes.date.date[dataTimes.data.length - 1]);
                if(stopPlayIndex < startPlayIndex) gameResult = 0;
                else if(stopPlayIndex == startPlayIndex) gameResult = -1;
                else gameResult = 1;
                this.stop(state,amount,gameResult);
                clearInterval(playGames);
            }
        }.bind(this),1000);
    },
    //结束试玩游戏
    stop: function(state,amount,gameResult){
        console.log('stop game');
        $amount.removeAttr('disabled');
        $(".option-amount .btn").removeAttr('disabled');
        if(gameResult == state){
            $(".lose-result").css('display','none');
            $(".win-result").css('display','inline-block');
            $("#resultTitle").text('Good Prediction');
            this.playUser.changeBalance((parseFloat($account.text()) + parseFloat(amount)*(1 + this.odds)).toFixed(2));//玩家余额增加
            $account.text(this.playUser.balance);
            $(".win-result .balance").text((parseFloat(amount)*this.odds).toFixed(2));
        } else {
            $("#resultTitle").text('Bad Guess');
            $(".win-result").css('display','none');
            $(".lose-result").css('display','inline-block');
            $account.text((parseFloat($account.text())).toFixed(2));
            $(".lose-result .balance").text('-' + parseFloat(amount).toFixed(2));
        }
        judgeAmount();
        $("#result").show();
        //开始下一轮
        this.init();
    }
}

var coinMinUnit = 0.01;

var dataTimes = getMinutesTime();
var startValue,xValue,endTimes,value;

var times = 0;
var GBIIndex = [];
var timeUnit = 1;  //时间单位

//到截止交易时间时暂停交易
function pauseTradeOption(){
    $(".option-amount .btn").attr("disabled","disabled");
    $(".pause-trade-area").show();
}

//重新开始交易
function startTradeOption(){
    $(".option-amount .btn").removeAttr("disabled");
    $(".pause-trade-area").hide();
}


$(".close-result,.btn-area .btn").click(function(){
    $("#result").hide();
})

$amount.change(function(){
    judgeAmount();
})

$amount.get(0).oninput = function(){
    console.log('1');
    judgeAmount();
}

$(".reduce-area").click(function () {
    if(!$(this).attr('disabled')) {
        console.log('-');
        $amount.val($amount.val() > coinMinUnit ? (parseFloat($amount.val()) - coinMinUnit).toFixed(2) : coinMinUnit);
        judgeAmount();
    }
});
$(".add-area").click(function () {
    if(!$(this).attr('disabled')) {
        console.log('+');
        $amount.val((parseFloat($amount.val()) + coinMinUnit).toFixed(2));
        judgeAmount();
    }
});

//游戏结束时的结果显示
function stopOptionGame(result,winMoney){
    console.log(result);
    if(result == 1){
        $("#resultTitle").html('Good prediction');
        $(".lose-result").hide();
        $(".win-result").css('display','inline-block').find('span.balance').text(winMoney);
        $("#result").show();
    }//胜局
    else {
        $("#resultTitle").html('Bad Guess');
        $(".lose-result").css('display','inline-block').find('span.balance').text(winMoney);
        $(".win-result").hide();
        $("#result").show();
    }//平局以及败局
}

function StompClient(socketURL){
    this.url = socketURL;
}

//涉及交易的Dom元素
var tradeDom = {
    $swellMoney: $("#swellMoney"), //赌涨金额
    $tumbleMoney: $("#tumbleMoney"), //赌跌金额
    $swellOdds: $("#swellOdds"), //赌涨赔率
    $tumbleOdds: $("#tumbleOdds"), //赌跌赔率
    $highterTotal: $(".highter-total"), //赌涨总金额div
    $lowterTotal: $(".lowter-total") //赌跌总金额div
}

//设置赔率显示、赢的币的比例等显示函数
function setOddsDisplay(data) {
    tradeDom.$swellMoney.text(parseFloat(data.swellmoney).toFixed(2));
    tradeDom.$tumbleMoney.text(parseFloat(data.tumblemoney).toFixed(2));
    if (data.swellmoney == 0 || data.tumblemoney == 0) {
        tradeDom.$swellOdds.text(1);
        tradeDom.$tumbleOdds.text(1);
        tradeDom.$highterTotal.css({width: '49.5%'});
        tradeDom.$lowterTotal.css({width: '49.5%'});
    } else {
        tradeDom.$highterTotal.css({width: ((data.swellmoney / (data.swellmoney + data.tumblemoney)) * 99 + '%')});
        tradeDom.$lowterTotal.css({width: ((data.tumblemoney / (data.swellmoney + data.tumblemoney)) * 99 + '%')});
        //console.log((1 + (data.tumblemoney/data.swellmoney)).toFixed(2));
        tradeDom.$swellOdds.text((1 + (data.tumblemoney / data.swellmoney)).toFixed(2));
        tradeDom.$tumbleOdds.text((1 + (data.swellmoney / data.tumblemoney)).toFixed(2));
    }
}

var $rose = $("#rose");//指数增长率

/*option二元期权Game*/
var optionGame = {
    //期数信息
    periods: {
        periodsno: null
    },

    //用户投注交易信息
    trade: {
        tradeMoney: [],
        xAxis: [],
        yAxis: [],
        tradeTimestamp: []
    },

    //时间信息
    times: {
        xValue: 0,
        value: 0
    },

    //交易（下赌注）时的数据
    tradeData: [],

    //echarts画图数据
    dataTimes: {
        date: {
            date: [],      //时间 format("HH:mm:ss")
            timestamp: []  //时间戳
        },
        GBIIndex: []            //指数数据,//
    },

    //处理当前期数数据
    initPeriods: function(data){
        if(data&&data.body){
            data = JSON.parse(data.body);
            this.periods.periodsno = data.periodsno;
            this.dataTimes.date.date = [];
            this.dataTimes.date.timestamp = [];
            for (var i = data.startdatetime; i <= data.enddatetime; i += timeUnit) {
                this.dataTimes.date.date.push(getDateSecondTime(new Date(i * 1000)));
                this.dataTimes.date.timestamp.push(i);
            }
            this.times.xValue = data.expirydatetime; //截止投注时间
            this.times.value = data.initvalue;        //当前期数开始时的指数值
            setOddsDisplay(data);                  //显示赌注信息
        } else getErrorData();
    },
    //处理获取到的该期到现在的时间的指数数据
    getPreviousIndex: function(data){
        if(data&&data.body){
            data = JSON.parse(data.body);
            startTradeOption(); //开始交易
            if (data.length != 0) {
                var i;
                for (i = 0; i < data.length; i++) {
                    this.dataTimes.GBIIndex.push(parseFloat(data[i].gbi));
                }
                i = data.length - 1;
                this.times.value = data[0].gbi;
                playGameChart.setOption({
                    xAxis: [{
                        data: this.dataTimes.date.date
                    }],
                    yAxis: [{
                        min: function (value) {
                            return parseInt((Math.floor(value.min) - 15) / 10) * 10;
                        },
                        max: function (value) {
                            return parseInt((Math.floor(value.max) + 15) / 10) * 10;
                        }
                    }],
                    series: [{
                        name: 'GBI',
                        data: this.dataTimes.GBIIndex
                    }]
                })
            } else getErrorData();
        } else getErrorData();
    },
    //处理新生成的期数数据
    createPeriods: function(data){
        if (data&&data.body) {
            data = JSON.parse(data.body);
            startTradeOption();
            this.periods.periodsno = data.periodsno;
            this.dataTimes.date.date = [];
            this.dataTimes.date.timestamp = [];
            this.dataTimes.GBIIndex = [];
            for (var i = data.startdatetime; i <= data.enddatetime; i += timeUnit) {
                this.dataTimes.date.date.push(getDateSecondTime(new Date(i * timeUnit*1000)));
                this.dataTimes.date.timestamp.push(i);
            }
            setOddsDisplay(data);
            this.times.xValue = data.expirydatetime; //截止投注时间
            this.times.value = data.initvalue;//初始指数
            var _length = this.dataTimes.GBIIndex.length - 1;

            this.dataTimes.GBIIndex.push(data.initvalue);
            playGameChart.setOption({
                series: {
                    data: this.dataTimes.GBIIndex,
                    markLine: {
                        data: [
                            {yAxis: this.times.value, name: 'Start Index'},
                            {xAxis: getDateSecondTime(new Date(this.times.xValue * 1000)), name: 'End Time'}
                        ]
                    },
                    markPoint: {
                        data: [{
                            xAxis: this.dataTimes.date.date[_length],
                            yAxis: this.dataTimes.GBIIndex[_length]
                        }]
                    }
                },
                xAxis: {
                    data: this.dataTimes.date.date
                }
                //yAxis: [{
                //    min: function (value) {
                //        return parseInt((Math.floor(value.min) - 10) / 10) * 10;
                //    },
                //    max: function (value) {
                //        return parseInt((Math.floor(value.max) + 20) / 10) * 10;
                //    }
                //}]
            });
        } else getErrorData();
    },
    //处理获取到的指数数据，每1s一次
    gbiExponential: function(data){
        data = JSON.parse(data.body);
        this.dataTimes.GBIIndex.push(parseFloat(data.GBIExponential.gbi));

        //修改x坐标轴，因为socket收到的时间与预先设定的时间会有差距
        var xData = getDateSecondTime(new Date(data.GBIExponential._id*1000));
        var yLength = this.dataTimes.GBIIndex.length;
        this.dataTimes.date.timestamp[yLength - 1] = data.GBIExponential._id;
        this.dataTimes.date.date[yLength - 1] = xData;

        if (data.GBIExponential._id >= this.times.xValue) {
            pauseTradeOption();
            $("#trade_modal").modal('hide');
        }//如果到了截止交易的时间，则暂停交易，隐藏交易框
        else startTradeOption();

        if(!!this.times.value){
            if(data.GBIExponential.gbi > this.times.value) {
                $(".option-rose").addClass('add').removeClass('reduce');
                $rose.text('+' + ((parseFloat(data.GBIExponential.gbi) - this.times.value) / this.times.value * 100).toFixed(2));
            } else {
                $(".option-rose").removeClass('add').addClass('reduce');
                $rose.text(((parseFloat(data.GBIExponential.gbi) - this.times.value) / this.times.value * 100).toFixed(2));
            }//修改指数增长率
        }
        setOddsDisplay(data.PeriodsEModel);
        // console.log(playGameChart.getOption());

        playGameChart.setOption({
            series: {
                data: this.dataTimes.GBIIndex,
                markPoint: {
                    data: [{
                        xAxis: xData,
                        yAxis: this.dataTimes.GBIIndex[yLength - 1]
                    }]
                }
            },
            xAxis: {
                data: this.dataTimes.date.date
            }
            //yAxis: [{
            //    min: function (value) {
            //        return parseInt((Math.floor(value.min) - 10) / 10) * 10;
            //    },
            //    max: function (value) {
            //        return parseInt((Math.floor(value.max) + 20) / 10) * 10;
            //    }
            //}]
        });
        var tradeLength = this.trade.xAxis.length;
        if(tradeLength != 0){
            var height = playGameChart.getHeight();
            for(var j = 0;j < tradeLength;j++){
                var point = playGameChart.convertToPixel({seriesIndex: 0},[this.trade.xAxis[j],this.trade.yAxis[j]]);//获取交易点的在echarts图中的像素坐标
                var left = point[0] - $(".trade-point").eq(j).width() - 20 + 'px';
                var bottom = height - point[1] + 4 + 'px';
                $(".trade-point").eq(j).css({
                    left: left,
                    bottom: bottom
                })
            }
        }

        if(this.times.value&&this.times.xValue){
            playGameChart.setOption({
                series: {
                    markLine: {
                        data: [
                            {yAxis: this.times.value, name: 'Start Index'},
                            {xAxis: getDateSecondTime(new Date(this.times.xValue * 1000)), name: 'End Time'}
                        ]
                    }
                }
            })
        }
    },
    //结束该轮游戏，系统结算
    stopOption: function(data){
        if (!!data.body && !!JSON.parse(data.body)) {
            data = JSON.parse(data.body);
            this.dataTimes.GBIIndex.push(data.endvalue);
            //console.log(dataTimes);
            pauseTradeOption();

            var xData = getDateSecondTime(new Date(data.enddatetime*1000));
            var yLength = this.dataTimes.GBIIndex.length;
            this.dataTimes.date.timestamp[yLength - 1] = data.enddatetime;
            this.dataTimes.date.date[yLength - 1] = xData;//修改结算时间(因为socket传输可能产生延迟)

            if(!!this.times.value){
                if(data.endvalue > this.times.value) {
                    $rose.text('+' + ((parseFloat(data.endvalue) - this.times.value) / this.times.value * 100).toFixed(2));
                } else {
                    $rose.text(((parseFloat(data.endvalue) - this.times.value) / this.times.value * 100).toFixed(2));
                }
            }//修改指数增长率

            playGameChart.setOption({
                series: {
                    data: this.dataTimes.GBIIndex,
                    markPoint: {
                        data: [{
                            xAxis: xData,
                            yAxis: this.dataTimes.GBIIndex[yLength - 1]
                        }]
                    }
                },
                xAxis: {
                    data: this.dataTimes.date.date
                }
                //yAxis: [{
                //    min: function (value) {
                //        return parseInt((Math.floor(value.min) - 10) / 10) * 10;
                //    },
                //    max: function (value) {
                //        return parseInt((Math.floor(value.max) + 20) / 10) * 10;
                //    }
                //}]
            });
        } else getErrorData();
    },
    //每次交易之后，处理用户余额
    handleUserBalance: function(data){
        console.log(loginUser.getBalance());
        data = JSON.parse(data.body);
        loginUser.setBalance(data.funds);
        var oldBalance = parseFloat($account.text()); //投注之前的用户余额
        console.log(oldBalance);
        var newBalance = parseFloat(parseFloat(data.funds).toFixed(2)); //投注之后的用户余额
        var gapTime = (Math.abs(oldBalance - newBalance))/0.01;
        var timer = 1500/gapTime;
        function doScaledTimeout(i,times) {
            setTimeout(function() {
                $account.text(i);
            }, times * timer);
        }

        var times = 0;
        for(var j = oldBalance;j > newBalance;j-=0.01){
            times++;
            doScaledTimeout(j.toFixed(2),times);
        }//余额较少时的动画效果

        this.trade.tradeMoney.push((this.tradeData[this.tradeData.length - 1].amount).toFixed(2));
        var dataLength = this.dataTimes.GBIIndex.length - 1;
        this.trade.xAxis.push(this.dataTimes.date.date[dataLength]); //交易时的x坐标
        this.trade.yAxis.push(this.dataTimes.GBIIndex[dataLength]); //交易时的y坐标
        this.trade.tradeTimestamp.push(this.dataTimes.date.timestamp[dataLength]); //交易时间戳
        var option = playGameChart.getOption();

        var width = playGameChart.getWidth();
        var height = playGameChart.getHeight();
        var tradeTimes = this.trade.xAxis.length - 1; //一局二元期权游戏里该用户的总投注次数
        var point = playGameChart.convertToPixel({seriesIndex: 0},[this.trade.xAxis[tradeTimes],this.trade.yAxis[tradeTimes]]);
        var left = point[0] - 64 + 'px';
        var bottom = height - point[1] + 4 + 'px';
        var color,styleTypeClass;

        if(this.tradeData[tradeTimes].action == "Up"){
            color = '#33ac48';
            styleTypeClass = 'icon-caret-up-small';
        } else {
            color = '#db4931';
            styleTypeClass = 'icon-shang-copy';
        }

        var style = 'left:' + left + ';bottom:' + bottom + ';background:' + color;
        var markTradePoint = "<div class='trade-point' style='" + style + "'>" + this.trade.tradeMoney[tradeTimes];
        markTradePoint += "<div class='font-circle' style='background:" + color + "'><i class='iconfont " + styleTypeClass + "'";
        markTradePoint += "></i>" + "</div></div>";

        $("#option").children('div').append(markTradePoint); //交易时的气泡div显示
        var $trade = $(".trade-point");
        var length = $trade.length;
        $trade.eq(length - 1).css('left',left + 64 - $trade.eq(length - 1).width() - 20);
    },

    //处理结算数据
    handleUserStopGame: function(data){
        //记录最后一次交易时间
        var tradetime = this.trade.tradeTimestamp[this.trade.tradeTimestamp.length - 1];
        //清空交易数据
        $(".trade-point").remove();
        this.trade = {
            tradeMoney: [],
            xAxis: [],
            yAxis: [],
            tradeTimestamp: []
        };
        this.tradeData = [];

        data = JSON.parse(data.body);
        var optionResult,symbol;
        if (data.winMoney < 0) {
            stopOptionGame(false,data.winMoney);
            optionResult = "Lose";
            symbol = ""; //输钱
        } else if(data.winMoney == 0){
            stopOptionGame(1, data.winMoney);
            loginUser.setBalance(parseFloat(loginUser.getBalance()) + data.winMoney + data.dealMoney);
            $account.text((parseFloat(loginUser.getBalance())).toFixed(2));
            optionResult = "Draw";
            symbol = ""; //平局
        } else {
            stopOptionGame(1, data.winMoney);
            loginUser.setBalance(parseFloat(loginUser.getBalance()) + data.winMoney + data.dealMoney);
            $account.text((parseFloat(loginUser.getBalance())).toFixed(2));
            optionResult = "Win";
            symbol = "+"; //赢钱
        }

        //更新交易记录信息
        var str = "<tr><td>" + data.periodsNo + "</td>";
        str += "<td>" + getYearDateTime(new Date(tradetime * 1000)) + "</td>";
        str += "<td>" + optionResult + "</td>";
        str += "<td>" + gameCoinUnit + " " + data.dealMoney + "</td>";
        str += "<td>" + gameCoinUnit + " " + symbol + data.winMoney + "</td></tr>";
        if($("#tradeHistoryPage .active").attr("id") != 1) { //判断用户此时的交易记录的页数是否为第一页
            var $elem = $("#historyTrade tbody");
            if ($elem.children('tr').length == 10) {
                $elem.prepend(str).children('tr:last-child').remove();
            } else {
                $elem.prepend(str);
            }
        } else {
            loginUser.getBettingHistory(0);
        }
    },
    init: function(){
        var socket;
        if(!!window.WebSocket && !!window.WebSocket.prototype.send){
            socket  = new WebSocket(CONFIG.webSocket);
            //socket = new WebSocket('ws://18.221.215.188:8082/THBIT/portfolio');
        } else {
            socket = new SockJS(CONFIG.socketJS);
        }
        //websocket连接错误
        socket.onerror = function(e){
            alert('Sorry,connect error,please try again!');
        }

        //断开连接
        socket.onclose = function(e){
            alert('Sorry,connect close,please reload this page!');
        }
        //stomp协议封装
        var stompClient = Stomp.over(socket);
        playGameChart.showLoading(gameChart.defaultConfig); //echarts加载动画

        var gameModel = new OptionModel(stompClient);
        gameModel.connect();

        //用户点击交易按钮
        var userTradeTime;
        $(".btn-call").click(function () {
            if(!loginJudge()){
                loginEvent();
            } else {
                var amount = parseFloat($("#amount").val());
                var action = "Up";
                var username = loginUser.loginName;
                userTradeTime = parseInt(new Date().getTime()/1000);

                $("#tradeMoney").text(amount);
                $("#trade_modal").modal('toggle');
                $("#confirmTrade").unbind('click').click(function(){
                    this.tradeData.push({
                        periodsno: this.periods.periodsno,
                        amount: amount,
                        action: action,
                        username: username,
                        tradetime: userTradeTime
                    });
                    stompClient.send("/app/tradePay", {}, JSON.stringify(this.tradeData[this.tradeData.length - 1]));
                }.bind(this));
            }
        }.bind(this));
        $(".btn-put").click(function () {
            if (!loginUser) {
                loginEvent();
            } else {
                var amount = parseFloat($("#amount").val());
                var action = "Down";
                var username = loginUser.loginName;
                userTradeTime = parseInt(new Date().getTime()/1000);
                $("#tradeMoney").text(amount);
                $("#trade_modal").modal('toggle');
                $("#confirmTrade").unbind('click').click(function(){
                    this.tradeData.push({
                        periodsno: this.periods.periodsno,
                        amount: amount,
                        action: action,
                        username: username,
                        tradetime: userTradeTime
                    });
                    stompClient.send("/app/tradePay", {}, JSON.stringify(this.tradeData[this.tradeData.length - 1]));
                }.bind(this))
            }
        }.bind(this));
    }
};

//收到异常收据或无数据时的处理
function getErrorData(){
    alert('Sorry,get data error,please try again!');
}

//stomp协议连接，订阅服务
function OptionModel(stompClient){
    this.connect = function(){
        stompClient.connect("","", function (frame) {
            //错误处理
            stompClient.subscribe("/user/queue/errors", function(message) {
                console.log(message.body);
                alert('Sorry,get data error,please try again!');
            });

            //取消加载动画
            playGameChart.hideLoading();

            //订阅服务，获取当前期数数据
            stompClient.subscribe('/app/periodsNo', function (data) {
                optionGame.initPeriods(data);

                //订阅消息  获取当前时间之前的期数GBI指数数据
                stompClient.subscribe('/app/periodsGBIExponential', function (data) {
                    optionGame.getPreviousIndex(data);
                })
            });

            //订阅服务，获取下一轮的新生成的期数数据
            stompClient.subscribe('/topic/createPeriods', function (data) {
                optionGame.createPeriods(data);
            });

            //订阅gbi指数服务，每1s一次
            stompClient.subscribe('/topic/gbiExponential', function (data) {
                optionGame.gbiExponential(data);
            })

            //结束该期的二元期权游戏
            stompClient.subscribe("/topic/endPeriods", function (data) {
                optionGame.stopOption(data);
            })

            //若有用户登录
            if(loginUser != null) {
                //收到交易之后的用户余额信息
                stompClient.subscribe('/user/' + loginUser.loginName + '/queue/amount-updates', function (data) {
                    optionGame.handleUserBalance(data);
                });

                //收到游戏结束时用户的余额及赌注等信息
                stompClient.subscribe('/user/' + loginUser.loginName + '/queue/amount-TradeInfo', function (data) {
                    optionGame.handleUserStopGame(data);
                });
            }
        },function(error){
            //出现错误
            console.log(error);
            alert('Sorry,Connect error,Please try again.');
        });
    }
}





