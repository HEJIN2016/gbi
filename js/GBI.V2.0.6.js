/* Created by HeJin on 2017/10/30 0030.*/
var coinUnit = '$';
var sign = "\-";
//json排序
var descByPrice = function(x,y) {
    var price = 'last';
    return (parseFloat(x[price]) > parseFloat(y[price]) ? -1 : 1);
}
var descByVol = function(x,y) {
    var vol = 'volume';
    return (parseFloat(x[vol]) > parseFloat(y[vol]) ? -1 : 1);
}

//交易所网址
var exchangeSite = [
    {name: "Acx", site: "https://acx.io/"},
    {name: "Allcoin", site: "https://allcoin.com/"},
    {name: "Bigone", site: "https://big.one/"},
    {name: "Binance", site: "https://www.binance.com/"},
    {name: "Bitbay", site: "https://bitbay.net/"},
    {name: "Bitfinex", site: "https://www.bitfinex.com/"},
    {name: "Bitflyer", site: "https://bitflyer.jp/"},
    {name: "Bithumb", site: "https://www.bithumb.com/"},
    {name: "Bitmex", site: "https://www.bitmex.com/"},
    {name: "Bitstamp", site: "https://www.bitstamp.net/"},
    {name: "Bittrex", site: "https://www.bittrex.com/"},
    {name: "Bitz", site: "https://www.bit-z.com/"},
    {name: "Btcbox", site: "https://www.btcbox.co.jp/"},
    {name: "Ccex", site: "https://c-cex.com/"},
    {name: "Cexio", site: "https://cex.io/"},
    {name: "Coincheck", site: "https://coincheck.com/"},
    {name: "Coinegg", site: "https://www.coinegg.com/"},
    {name: "Coinone", site: "https://coinone.co.kr/"},
    {name: "Exmo", site: "https://exmo.com/"},
    {name: "Fisco", site: "https://fcce.jp/"},
    {name: "Gateio", site: "https://gate.io/"},
    {name: "Gdax", site: "https://www.gdax.com/"},
    {name: "Gemini", site: "https://gemini.com/"},
    {name: "Getbtc", site: "https://getbtc.org/"},
    {name: "Hitbtc", site: "https://hitbtc.com/"},
    {name: "Itbit", site: "https://www.itbit.com/"},
    {name: "Korbit", site: "https://www.korbit.co.kr/"},
    {name: "Kraken", site: "https://www.kraken.com/"},
    {name: "Lakebtc", site: "https://www.lakebtc.com/"},
    {name: "Liqui", site: "https://liqui.io/"},
    {name: "Livecoin", site: "https://www.livecoin.net/"},
    {name: "Neraex", site: "https://neraex.com/"},
    {name: "Okcoin", site: "https://www.okcoin.cn/"},
    {name: "Okex", site: "https://www.okex.com/"},
    {name: "Poloniex", site: "https://www.poloniex.com/"},
    {name: "Wex", site: "https://wex.nz/"},
    {name: "Yobit", site: "https://yobit.net/"},
    {name: "Zaif", site: "https://zaif.jp/"},
    {name: "Zb", site: "https://www.zb.com/"}
];


//交易所跳转链接
function setExchangeLink() {
    var length = exchangeSite.length;
    for (var i = 0; i < length; i++) {
        var elem = "#currency_Table span." + exchangeSite[i].name;
        if($(elem).get(0)) {
            $(elem).siblings('a').attr({target: '_blank', title: exchangeSite[i].name, href: exchangeSite[i].site});
        } else continue;
    }
}

//最小数
var getMinNum = function(arr){
    var len = arr.length;
    var minNum = arr[0];
    for(var i = 0;i < len; i++){
        if(arr[i] < minNum)
            minNum = arr[i];
    }
    return minNum;
}

//数组最大数
var getMaxNum = function(arr){
    var len = arr.length;
    var maxNum = arr[0];
    for(var i = 0;i < len; i++){
        if(arr[i] > maxNum)
            maxNum = arr[i];
    }
    return maxNum;
}

//显示自选菜单及表格
function displayOptionMenu(){
    $("#coinTableDiv").hide();
    $("#optionalTableDiv").show();
    $("#coinRecentList li").removeClass('active');
    $("#coinOptional").addClass('active');
}
//显示货币表格及菜单
function displayCoinMenu(){
    $("#optionalTableDiv").hide();
    $("#coinTableDiv").css('display','block');
    $("#coinOptional").removeClass('active');
}

//svg价格曲线
function priceNum(priceArr){
    var str = [];
    if(!priceArr){
        return false;
    }else{
        var len = priceArr.length;
        var max = getMaxNum(priceArr);
        var min = getMinNum(priceArr);
        for(var i = 0;i < len;i++){
            str.push((96/len) * (i + 1));
            if(max == min){
                str.push(12);
            }else{
                str.push((max - priceArr[i]) * (24 /(max - min)));
            }
        }
    }
    //console.log(str);
    return str.join(' ');
}

//根据自选列表生成表格
function setOptionalTableArea(data){
    var $optional_Table = $("#optional_Table");
    $optional_Table.children('tbody').empty();
    data.forEach(function(item,index){
        var increaseColor, fontClass = "";
        if (item.increase > 0) {
            increaseColor = 'rgb(92, 184, 92)';
            fontClass = 'icon-shangsheng4';
        } else if (item.increase < 0) {
            increaseColor = 'rgb(204, 0, 0)';
            fontClass = 'icon-xiajiang1';
        } else increaseColor = '#000';
        var elemData = '<tr><td><i class=\"coin-icon ' + item.currency + '\"></i>' + item.currency + '(' + item.exchange + ')</td>';
        console.log(elemData);
        elemData += '<td>' + tableTd2(item.last) + '</td><td>-</td>' + '<td>' + tableTd2(item.high) + '</td>';
        elemData += '<td>' + tableTd2(item.low) + '</td>';
        elemData += '</td><td style="color:' + increaseColor + '">' + percentNum(item.increase) + '<i class="iconfont ' + fontClass + '" style=\"color:' + increaseColor + '"></i>' + '</td>';
        elemData += '<td>' + tableTd(item.volume) + '</td>';
        elemData += priceNum(item.trend)?'<td><svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\'><polyline points=\'' + priceNum(item.trend) + '\' style="fill:none;stroke:#71BEF4;stroke-width:2"></polyline></svg></td>':'<td>-</td>';
        elemData += '<td><a target="_blank" title="' + item.currency + ' kline" href="/kline?exchange=' + item.exchange + '&coin=' + item.currency + '"><i class="iconfont icon-tubiaozhexiantu klineGraph"></i></a></td></tr>';
        $optional_Table.children('tbody').append(elemData);
    })
}

//根据货币生成表格
function setTable(coin) {
    $.ajax({
        async: true,
        url: CONFIG.URL + 'currency/',
        type: 'GET',
        data: {
            currency: coin
        },
        success: function (data) {
            if (data) {
                data = JSON.parse(data);
                data = data.sort(descByVol);
                var compare_price = parseFloat(data[0].last);
                $("#currency_Table tbody").empty();
                table1.clear().destroy();
                //debugger;
                var len = data.length;
                function setValue(i){
                    var datas = data[i];
                    var price = (parseFloat(datas.last) - compare_price).toFixed(4);
                    var color = (price < 0) ? 'rgb(204, 0, 0)' : 'rgb(92, 184, 92)';
                    var increaseColor, fontClass = "";
                    if (datas.increase > 0) {
                        increaseColor = 'rgb(92, 184, 92)';
                        fontClass = 'icon-shangsheng4';
                    } else if (datas.increase < 0) {
                        increaseColor = 'rgb(204, 0, 0)';
                        fontClass = 'icon-xiajiang1';
                    } else increaseColor = '#000';
                    if (coin.indexOf('/') != -1) {
                        var time = datas.timestamp?getDateLineTime(new Date(parseInt(datas.timestamp) * 1000)):'-';
                        price = (price > 0) ? ('+' + price) : (price);
                        var str = "<tr><td>" + "<span class='exchange-icon " + datas.name + "\'></span><a href = 'javascript:' data-href='index.html?exchange=" + datas.name + "#exchange\'>" + datas.name + "</a></td>";
                        str += "<td>" + time + "</td><td>" + tableTd(datas.last) + "</td>";
                        str += "<td style=\"color:" + color + "\">" + price + "</td><td>" + tableTd(datas.high) + "</td><td>" + tableTd(datas.low) + "</td><td style='color:" + increaseColor + "'>" + percentNum(datas.increase) + "<i class='iconfont " + fontClass + "' style='color:" + increaseColor + "'></i>" + "</td><td>" + tableTd(datas.volume) + "</td>";
                        str += priceNum(datas.trend)?"<td><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"><polyline points=\"" + priceNum(datas.trend) + "\" style='fill:none;stroke:#71BEF4;stroke-width:2'></polyline></svg></td>":"<td>-</td>";
                        str += "<td><a target='_blank' title='" + coin + " kline' href='/kline?exchange=" + datas.name + "&coin=" + coin + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>"
                    } else {
                        var time = datas.timestamp?getDateLineTime(new Date(parseInt(datas.timestamp) * 1000)):'-';
                        price = (price > 0) ? (coinUnit + '+' + price) : (coinUnit + price);
                        var str = "<tr><td>" + "<span class='exchange-icon " + datas.name + "\'></span><a href = 'javascript:' data-href='index.html?exchange=" + datas.name + "#exchange\'>" + datas.name + "</a></td>";
                        str += "<td>" + time + "</td>";
                        str += "<td>" + tableTd2(datas.last) + "</td><td style=\"color:" + color + "\">" + price + "</td><td>" + tableTd2(datas.high) + "</td><td>" + tableTd2(datas.low) + "</td><td style='color:" + increaseColor + "'>" + percentNum(datas.increase) + "<i class='iconfont " + fontClass + "' style='color:" + increaseColor + "'></i>" + "</td><td>" + tableTd(datas.volume) + "</td>";
                        str += priceNum(datas.trend)?"<td><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"><polyline points=\"" + priceNum(datas.trend) + "\" style='fill:none;stroke:#71BEF4;stroke-width:2'></polyline></svg></td>":"<td>-</td>";
                        str += "<td><a target='_blank' title='" + coin + " kline' href='/kline?exchange=" + datas.name + "&coin=" + coin + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>";
                    }
                    $("#currency_Table tbody").append(str);
                    setExchangeLink();
                    //$("#currency_Table .exchange-icon").each(function(){
                    //    $(this).css('background-image',"url(images/exchange/" + $(this).attr('data-img') + ".ico");
                    //})
                }

                for (var i = 0; i < len; i++){
                    setValue(i);
                }

                table1 = $("#currency_Table").DataTable({
                    "lengthChange": false,
                    "order": [[ 7, 'desc' ]],
                    "searching": false,
                    "paging": true,
                    "pageLength": 15,
                    "columnDefs": [
                        { "orderable": false, "targets": [9,8,1] }
                    ]
                });
                judgeCoinList(coin);
                $("#loading_coin").hide();
                $("#coinTableDiv").show();

            } else {
                $('#error_modal').modal('toggle');
            }
            //$(".pagination").hide();
        },
        error: function () {
            $('#error_modal').modal('toggle');
            $(".pagination").hide();
        }
    })
}

//根据自选列表生成表格
function setOptionalTable(marketArr){
    var data = [
        {"BTC": "Bitfinex"},{"BCH": "Bitfinex"}
    ];
    data = JSON.stringify(data);
    $.ajax({
        url: CONFIG.URL + 'currency/single/',
        type: 'POST',
        data: {
            pairs: data
        },
        success: function(data) {
            console.log(data);
        }
    })
}

//生成more交易所列表函数
function setCurrenecyList(data){
    var $top_nav_list = $("#top_nav_list");
    var $letter_list = $("#letter_list");
    var $num_list = $("#num_list .currency_list");
    var len = data.length;
    var firstLetter = data[0][0];
    var startCode = data[0].charCodeAt(0);
    console.log(data[0]);
    var j = -1;
    if(startCode > 47&&startCode < 58){
        $num_list.append('<li>' + data[0] + '</li>');
    }else{
        var letter = data[0];
        var str = '<li><a href="javascript:" data-href=\"#' + letter[0] +  '\">' + letter[0]+ '</a></li>';
        $top_nav_list.append(str);
        firstLetter = letter;
        var str2 = '<div class="currency-list-area currencyList"><a id=\"' + firstLetter[0] + '\"></a>';
        str2 += '<span class="list-head">' + firstLetter[0] + '</span><ul class="currency_list">';
        str2 += '</ul><div class="clear"></div></div></div>';
        $letter_list.append(str2);
        $("#letter_list .currencyList").eq(0).children('ul').append('<li>' + data[0] + '</li>');
        j += 1;
    }

    for(var i = 1;i < len; i++){
        var letter = data[i];
        if(letter.charCodeAt(0) > 64&& letter.charCodeAt(0) < 91){
            if(letter[0].toUpperCase() != data[i - 1][0].toUpperCase()){
                var str = '<li><a href="javascript:" data-href=\"#' + letter[0] +  '\">' + letter[0]+ '</a></li>';
                $top_nav_list.append(str);
                firstLetter = letter;
                var str2 = '<div class="currency-list-area currencyList"><a id=\"' + firstLetter[0] + '\"></a>';
                str2 += '<span class="list-head">' + firstLetter[0] + '</span><ul class="currency_list">';
                str2 += '</ul><div class="clear"></div></div></div>';
                $letter_list.append(str2);
                j += 1;
            }
            $("#letter_list .currencyList").eq(j).children('ul').append('<li>' + data[i] + '</li>');
        }else if (letter.charCodeAt(0) > 96&& letter.charCodeAt(0) < 123){
            $("#" + letter[0].toUpperCase()).siblings('ul').append('<li>' + data[i] + '</li>');
        }
        else{
            $num_list.append('<li>' + data[i] + '</li>');
        }
    }
}

//生成more exchange下的下拉列表函数
function setExchangeAllList(data){
    var $top_nav_list = $("#nav_list");
    var $letter_list = $("#exchange_letter_list");
    var $num_list = $("#exchange_num_list .currency_list");
    var len = data.length;
    var firstLetter = data[0][0];
    var startCode = data[0].charCodeAt(0);
   // console.log(data);
    var j = -1;
    if(startCode > 47&&startCode < 58){
        $num_list.append('<li>' + data[0] + '</li>');
    }else{
        var letter = data[0];
        var str = '<li><a href="javascript:" data-href=\"#' + letter[0] +  '2\">' + letter[0]+ '</a></li>';
        $top_nav_list.append(str);
        firstLetter = letter;
        var str2 = '<div class="currency-list-area currencyList"><a id=\"' + firstLetter[0] + '2\"></a>';
        str2 += '<span class="list-head">' + firstLetter[0] + '</span><ul class="currency_list">';
        str2 += '</ul><div class="clear"></div></div></div>';
        $letter_list.append(str2);
        $("#exchange_letter_list .currencyList").eq(0).children('ul').append('<li>' + data[0] + '</li>');
        j += 1;
    }

    var state = false;
    for(var i = 1;i < len; i++){
        var letter = data[i];
        if(letter.charCodeAt(0) > 64&& letter.charCodeAt(0) < 91){
            if(letter[0].toUpperCase() != data[i - 1][0].toUpperCase()){
                var str = '<li><a href="javascript:" data-href=\"#' + letter[0] +  '2\">' + letter[0]+ '</a></li>';
                $top_nav_list.append(str);
                firstLetter = letter;
                var str2 = '<div class="currency-list-area currencyList"><a id=\"' + firstLetter[0] + '2\"></a>';
                str2 += '<span class="list-head">' + firstLetter[0] + '</span><ul class="currency_list">';
                str2 += '</ul><div class="clear"></div></div></div>';
                $letter_list.append(str2);
                j += 1;
            }
            $("#exchange_letter_list .currencyList").eq(j).children('ul').append('<li>' + data[i] + '</li>');
        }else if (letter.charCodeAt(0) > 96&& letter.charCodeAt(0) < 123){
            $("#" + letter[0].toUpperCase() + "2").siblings('ul').append('<li>' + data[i] + '</li>');
        }
        else{
            $num_list.append('<li>' + data[i] + '</li>');
            state = true;
        }
    }
    if(!state){
        $(".num-link,#exchange_num_list").hide();
    }else{
        $(".num-link,#exchange_num_list").show();
    }
}

//新增货币选择项时判断是否与已有的货币列表重复
function judgeCoinList(coin){
    var $coin_list = $("#coinRecentList li");
    var state = false;
    var coinIndex = 0;
    $coin_list.each(function(index,elem){
        if($(this).html() == coin){
            $(this).addClass('active').siblings().removeClass('active');
            state = true;
            coinIndex = index;
            return false;
        }
        coinIndex = index;
    })
    if(!state){
        $("#coinRecentList").append('<li>' + coin + '</li>');
        $("#coinRecentList li").last().addClass('active').siblings().removeClass('active');
    }
}

//新增交易所选择项时判断是否与已有的交易所列表重复
function judgeExchangeList(exchange){
    var $exchange_list = $("#ExchangeRecentList li");
    var state = false;
    var exchangeIndex = 0;
    $exchange_list.each(function(index,elem){
        if($(this).html() == exchange){
            $(this).addClass('active').siblings().removeClass('active');
            state = true;
            exchangeIndex = index;
            return false;
        }
        exchangeIndex = index;
    })
    if(!state){
        $("#ExchangeRecentList").append('<li>' + exchange + '</li>');
        $("#ExchangeRecentList li").last().addClass('active').siblings().removeClass('active');
    }
}

//获取某交易所所有币种信息,然后生成表格
function setTableByExchange(exchange){
    $.ajax({
        url: CONFIG.URL + 'exchange/',
        type: 'GET',
        data: {
            exchange: exchange
        },
        success: function(data){
            if(!data||!data.length){
                $('#error_modal').modal('toggle');
            }else{
                data = JSON.parse(data);
                $("#exchange_Table tbody").empty();
                table2.clear().destroy();
                var increaseColor,fontClass;
                for (var key in data) {
                    var datas = data[key];
                    if (datas.increase > 0) {
                        increaseColor = 'rgb(92, 184, 92)';
                        fontClass = 'icon-shangsheng3';
                    } else if (datas.increase < 0) {
                        increaseColor = 'rgb(204, 0, 0)';
                        fontClass = 'icon-xiajiang1';
                    } else {
                        increaseColor = '#333';
                        fontClass = "";
                    }
                    var className = 'coin-icon ';
                    if(key.indexOf('/') != -1){
                        var time = datas.timestamp?getDateLineTime(new Date(datas.timestamp * 1000)):'-';
                        var str = "<tr><td>" + "<i class=\'coin-icon " + key.slice(0,key.indexOf('/'))  + "\'></i>" + key + "</td>";
                        str += "<td>" + time + "</td>";
                        str += "<td>" + tableTd(datas.last) + "</td>";
                        str += "<td>" + tableTd(datas.bid) + "</td>" + "<td>" + tableTd(datas.ask) + "</td>";
                        str += "<td>" + tableTd(datas.high) + "</td><td>" + tableTd(datas.low) + "</td>";
                        str += "<td style='color:" + increaseColor + "\'>" + percentNum(datas.increase) + "<i class='iconfont " + fontClass + "' style='color:" + increaseColor + "'></i>" + "</td><td>" + tableTd(datas.volume) + "</td>";
                        str += "<td><a target='_blank' title='" + key + " kline' href='/kline?exchange=" + exchange + "&coin=" + key + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>";
                    }else {
                        var time = datas.timestamp?getDateLineTime(new Date(datas.timestamp * 1000)):'-';
                        var str = "<tr><td>" + "<i class=\'coin-icon " + key + "\'></i>" + key + "</td>";
                        str += "<td>" + time + "</td>";
                        str += "<td>" + tableTd2(datas.last) + "</td>";
                        str += "<td>" + tableTd2(datas.bid) + "</td>" + "<td>" + tableTd2(datas.ask) + "</td>";
                        str += "<td>" + tableTd2(datas.high) + "</td><td>" + tableTd2(datas.low) + "</td>";
                        str += "<td style='color:" + increaseColor + "\'>" + percentNum(datas.increase) + "<i class='iconfont " + fontClass + "' style='color:" + increaseColor + "'></i>" + "</td><td>" + tableTd(datas.volume) + "</td>";
                        str += "<td><a target='_blank' title='" + key + " kline' href='/kline?exchange=" + exchange + "&coin=" + key + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>";
                    }
                    $("#exchange_Table tbody").append(str);
                }

                $("#loading_exchange_coin").hide();
                $("#exchangeTableDiv").show();

                table2 = $exchange_table.DataTable({
                    "lengthChange": false,
                    "order": [[ 2, 'desc' ]],
                    "searching": false,
                    "pageLength": 15,
                    "columnDefs": [
                        { "orderable": false, "targets": [1,9] }
                    ]
                });
                judgeExchangeList(exchange);
            }
        }
    })
}

//跳转至kline iframe路径
function goKlineIframe(exchange,coin){
    $("#kline").attr('src','/kline?' + 'exchange=' + exchange + '&coin=' + coin);
}

//GBI指数绘图函数
function GBIdraw() {
    Chart2.defaults.global.animationSteps = 50;
    Chart2.defaults.global.tooltipYPadding = 18;
    Chart2.defaults.global.tooltipCornerRadius = 6;
    Chart2.defaults.global.tooltipTitleFontStyle = "normal";
    Chart2.defaults.global.tooltipFillColor = "rgba(0,0,0,0.8)";
    Chart2.defaults.global.animationEasing = "linear";
    Chart2.defaults.global.responsive = false;
    Chart2.defaults.global.scaleLineColor = "black";
    Chart2.defaults.global.scaleFontSize = document.body.clientWidth < 1210?12:14;
    $.ajax({
        url: CONFIG.URL + 'gbi/',
        type: 'GET',
        data: {
            time: Math.floor(new Date().getTime() / 1000) - 86400
        },
        success: function (data) {
            data = JSON.parse(data);
            var len = data.length;
            if (!data || !len) {
                console.log('cannot get GBI index data!')
                $('#error_modal').modal('toggle');
            } else {
                var time = [];
                var value = [];
                $(".GBI-index .index").html(data[len-1].gbi.toFixed(1));
                for (var i = len - 1; i >= 0; i -= 24) {
                    time.push(getDateMintime(new Date(data[i]._id * 1000)));
                    value.push(data[i].gbi.toFixed(2));
                }
                var data = {
                    labels: time.reverse(),
                    datasets: [
                        {
                            fillColor: "rgba(231,242,254,0.8)",
                            strokeColor: "rgba(54,101,152,1)",
                            pointColor: "#fff",
                            pointStrokeColor: "rgba(54,101,152,1)",
                            data: value.reverse()
                        }
                    ]
                };
            }
            var ctx = document.getElementById("canvas").getContext("2d");
            var LineChartDemo = new Chart2(ctx).Line(data, {
                pointDotRadius: 4,
                bezierCurve: true,
                scaleShowVerticalLines: false,
                scaleGridLineColor: "#eee"
            });
        },
        error: function () {
            $('#error_modal').modal('toggle');
        }
    })
}

//生成下拉菜单交易所列表
function setExchangeList(data){
    var len = data.length;
    var firstLetter = data[0][0];
    var startCode = data[0].charCodeAt(0);
   // console.log(data);
    var j = -1;
    if(startCode > 47&&startCode < 58){
        $num_list.append('<li>' + data[0] + '</li>');
    }else{
        var letter = data[0];
        firstLetter = letter;
        var str2 = '<div class="exchange-page">';
        str2 += '<span class="list-head" id = \"' + firstLetter[0] + '\">' + firstLetter[0] + '</span><ul class="exchange-List">';
        str2 += '</ul><div class="clear"></div></div></div>';
        $("#exchange1").append(str2);
        //var str = '<li><a href=\"?exchange=' + (data[0]) + '\">' + data[0] + '</a></li>';
        //$("#exchange1").eq(0).children('ul').append('<li><a href=\'?exchange=' + (data[0]) + '\'>' + data[0] + '</a></li>');
        var str = '<li>' + data[0] + '</li>';
        $("#exchange1").eq(0).children('ul').append('<li>' + data[0] + '</li>');
        j += 1;
    }

    var state = false;
    for(var i = 1;i < len; i++){
        var letter = data[i];
        if(letter.charCodeAt(0) > 64&& letter.charCodeAt(0) < 91){
            if(letter[0].toUpperCase() != data[i - 1][0].toUpperCase()){
                firstLetter = letter;
                var str2 = '<div class="exchange-page">';
                str2 += '<span class="list-head" id = \"' + firstLetter[0] + '\">' + firstLetter[0] + '</span><ul class="exchange-List">';
                str2 += '</ul><div class="clear"></div></div>';
                if(j < 7){
                    $("#exchange1").append(str2);
                }else{
                    $("#exchange2").append(str2);
                }
                j += 1;
            }
            if(j < 8){
                $("#exchange1 .exchange-page").eq(j).children('ul').append('<li>' + data[i] + '</li>');
            }else{
                $("#exchange2 .exchange-page").eq(j - 8).children('ul').append('<li>' + data[i] + '</li>');
            }

        }else if (letter.charCodeAt(0) > 96&& letter.charCodeAt(0) < 123){
            $("#" + letter[0].toUpperCase()).siblings('ul').append('<li>' + data[i] + '</li>');
        }
    }
}

//生成货币列表（取排行前8位）
function setCoinListMenu(data){
    var $showCoinList = $("#showCoinList");
    $showCoinList.empty();
    var len = data.length;
    for(var i = 0;i < 8; i++ ){
        $showCoinList.append('<li>' + data[i] + '<li>')
    }
}

//函数节流
function throttle(method,context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context);
    },100)
}

//json排序函数
var desc = function(x,y) {
    var price = 'last';
    var vol = 'volume';
    return (parseFloat(x[price]) > parseFloat(y[price]) ? -1 : 1);
    //return (parseFloat(y.last) * parseFloat(y.volume) ) - (parseFloat(x.last) * parseFloat(y.volume));
}

var asc = function(x,y){
    var name = 'name';
    return (x.toUpperCase() > y.toUpperCase()) ? 1: -1;
}

$(".disabled").click(function(event){
    event.preventDefault();
})
//
var exchangeSearch = document.getElementById("exchangeValue");
var $search_list = $(".search-list");

//搜索交易所函数
function searchExchange(){
    if(exchangeSearch.value) {
        $search_list.empty().show();
        $.ajax({
            url: CONFIG.URL + 'search/',
            type: 'GET',
            data: {
                search: exchangeSearch.value
            },
            success: function (data) {
                data = JSON.parse(data);
                console.log(data.length);
                if (!data || !data.length) {
                } else {
                    var len = data.length;
                    for (var i = 0; i < len; i++) {
                        $search_list.append('<li>' + data[i] + '</li>');
                    }
                }
            }
        })
    }
}

//生成货币列表
function createCoinList(exchange){
    $.ajax({
        url: CONFIG.URL + 'exchange/sorted/',
        data: {
            exchange: exchange
        },
        type: 'GET',
        success: function(data){
            data = JSON.parse(data);
            if(!data||!data.length){
                $('#error_modal').modal('toggle');
            }else{
                $(".min-line").addClass('active').siblings().removeClass('active');
                var len = data.length;
                var $showCoinList = $("#showCoinList");
                $showCoinList.html('');
                //debugger;
                for(var i = 0;i < len; i++ ){
                    if(i == 8){
                        break;
                    }
                    $showCoinList.append('<li>' + data[i].name + '</li>')
                }
                var goto_coin = select_coin;
                if(goto_coin != null){
                    var coin_index = false;
                    //debugger;
                    $("#showCoinList li").each(function(){
                        if($(this).html() == goto_coin) {
                            coin_index = $(this).index();
                            return false;
                        }
                    })
                    if(coin_index||coin_index===0) {
                        $("#showCoinList li").eq(coin_index).addClass('active').siblings().removeClass('active');
                    }else{
                        $("#showCoinList").append('<li>' + goto_coin+ '</li>');
                        $("#showCoinList li:last-child").text(goto_coin).addClass('active').siblings().removeClass('active');
                    }
                }else{
                    $showCoinList.children('li').eq(0).addClass('active');
                }

                var obj = getSelectValue();
                goKlineIframe(obj.exchange,obj.coin,obj.period);
                setDayCoinValue(data);
            }
        },
        error: function(){
            $('#error_modal').modal('toggle');
        }
    })
}

//生成交易所列表(1.0版本函数，已弃用)
function createExchangeList(url){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
            data = JSON.parse(data);
            if(!data||!data.length){
                $('#error_modal').modal('toggle');
            }else{
                var coin_list = document.getElementsByClassName("coin-list")[0];
                data = JSON.parse(data);
                //data.sort(asc);
                console.log(data);

                $(coin_list).empty();
                data.forEach(function(item,index){
                    var str = '<li>' + item + '</li>';
                    $(coin_list).append(str);
                })
                $(".coin-list li").eq(0).addClass('active');

                var $prev = $("#prev_btn");
                var $next = $("#next_btn");
                coin_list.style.marginTop = 0;
                $next.unbind('click').click(function(){
                    var margin = parseFloat(coin_list.style.marginTop);
                    if(-margin < $(coin_list).height() - 560) {
                        coin_list.style.marginTop = margin - 480 + 'px';
                    }
                })
                $prev.unbind('click').click(function(){
                    var margin = parseFloat(coin_list.style.marginTop);
                    if(margin) {
                        coin_list.style.marginTop = margin + 480 + 'px';
                    }
                })
                createCoinList(data[0]);
                console.log(data[0]);
                //getDayCoinValue(data[0]);
            }
        }
    })
}

//默认echarts loading参数 已弃用
var defaultConfig = {
    text: 'loading',
    //color: '#c23531',
    textColor: '#fff',
   // maskColor: 'rgba(19, 26, 29, 0.8)',
    maskColor: 'rgba(46, 51, 53, 1)',
    zlevel: 0
}

//获取选中的交易货币、交易所、K线图类型
function getSelectValue() {
    var exchange = $("#exchangeList .active").text();
    var coin = $("#coinList .active").text();
    return {
        exchange: exchange,
        coin: coin
    }
}

//显示货币价格
function setDayCoinValue(data) {
    var coin = getSelectValue().coin;
    var increase;
    var len = data.length;
    for(var i = 0;i < len;i++){
        var datas = data[i];
        if(datas.name == coin) {
            if (datas.popen != null) {
                var $i = $(".coin-new-price").children('i');
                increase = (parseFloat((datas.last - datas.popen) / datas.popen * 100)).toFixed(3);
                if (increase < 0) {
                    $("#rise").text((increase) + '%');
                    $(".coin-new-price,.coin-rise").css("color", "#f76161");
                    $i.addClass('icon-decline').removeClass('icon-shangsheng');
                } else if(increase >= 0){
                    $("#rise").text('+' + (increase) + '%');
                    $(".coin-new-price,.coin-rise").css("color", "#5cb85c");
                    $i.removeClass('icon-decline').addClass('icon-shangsheng');
                }else{
                    $("#rise").text('No Data');
                }
            } else {
                $("#rise").empty();
            }
            if(coin.indexOf('/') != -1) {
                $("#new_price").text(parseFloat(datas.last).toFixed(3));
                $("#lowest_price").text(datas.low ? parseFloat(datas.low).toFixed(3) : '-');
                $("#highest_price").text(datas.high ? parseFloat(datas.high).toFixed(3) : '-');
            }else{
                $("#new_price").text('$' + parseFloat(datas.last).toFixed(3));
                $("#lowest_price").text('$' + (datas.low ? parseFloat(datas.low).toFixed(3) : '-'));
                $("#highest_price").text('$' + (datas.high ? parseFloat(datas.high).toFixed(3) : '-'));
            }
            $("#volume").text(parseFloat(datas.volume).toFixed(3));
            break;
        }
    }

}

//异步显示货币价格
function getDayCoinValue(exchange) {
    var coin = getSelectValue().coin;
    $.ajax({
        url: CONFIG.URL + '/exchange/sorted/',
        type: 'GET',
        data: {
            exchange: exchange
        },
        error: function(){
            $(".coin-type .coin-price").html('No Data');
            return false;
        },
        success: function (data) {
            data = JSON.parse(data);
            if(!data){
                $(".coin-type .coin-price").html('No Data');
                return false;
            }
            var len = data.length;
            var i = 0;
            for(i = 0;i < len; i++) {
                if(data[i].name == coin) break;
            }

            var datas = data[i];
            var increase;
            if(datas.popen != null) {
                var $i = $(".coin-new-price").children('i');
                increase = (parseFloat((datas.last - datas.popen) / datas.popen * 100)).toFixed(3);
                if (increase < 0) {
                    $("#rise").text((increase) + '%');
                    $(".coin-new-price,.coin-rise").css("color","#f76161");
                    $i.addClass('icon-decline').removeClass('icon-shangsheng');
                } else if((increase >= 0)){
                    $("#rise").text('+' + (increase) + '%');
                    $(".coin-new-price,.coin-rise").css("color","#5cb85c");
                    $i.removeClass('icon-decline').addClass('icon-shangsheng');
                }else{
                    $("#rise").text('No Data');
                }
            }else{
                $("#rise").empty();
            }
            if(coin.indexOf('/') != -1) {
                $("#new_price").text(parseFloat(datas.last).toFixed(3));
                $("#lowest_price").text(datas.low ? parseFloat(datas.low).toFixed(3) : '-');
                $("#highest_price").text(datas.high ? parseFloat(datas.high).toFixed(3) : '-');
            }else{
                $("#new_price").text('$' + parseFloat(datas.last).toFixed(3));
                $("#lowest_price").text('$' + (datas.low ? parseFloat(datas.low).toFixed(3) : '-'));
                $("#highest_price").text('$' + (datas.high ? parseFloat(datas.high).toFixed(3) : '-'));
            }
            $("#volume").text(parseFloat(datas.volume).toFixed(3));
        }
    })
}

//时间戳转换
function dateChange(now){
    //var year = now.getFullYear();
    var mon = now.getMonth();
    var day = now.getDate();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var date = "";
    if (mon < 9) {
        date += '0';
    }
    date +=(mon + 1);
    date += '/';
    if (day < 10) {
        date += '0';
    }
    date += day;
    date += ' ';
    if(hh < 10)
        date += '0';
    date += hh;
    date += ':';
    if(mm < 10) date += '0';
    date += mm;
    return date;
}
//

var quot_graph = document.getElementById('main');
var kline_graph = document.getElementById('kmain');

//echarts分时图配置参数
var option = {
    backgroundColor: '#ffffff',
    //color: ['#5FA1E3'],
    color: ['rgb(54,101,152)'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: 'rgb(242,242,240)',
        borderColor: 'rgb(54,101,152)',
        borderWidth: 1,
        textStyle: {
            color: '#333'
        }
    },
    xAxis : [{
        axisLine: {
            lineStyle: {
                type: 'solid',
                color: '#6F6F6F' //x轴线的颜色
            }
        },
        nameTextStyle: {
            color: '#6F6F6F'//x轴线名称颜色
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#6F6F6F'
            }
        },
        type : 'category',
        data : [],
        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis : [{
        type : 'value',
        axisLine: {
            lineStyle: {
                color: '#6F6F6F',//x轴线的颜色
                type: 'solid'
            }
        },
        position: 'right',
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#6F6F6F'
            }
        },
        nameTextStyle: {
            color: '#6F6F6F'//x轴线名称颜色
        }
    }],
    grid: {
        left: (document.body.clientWidth < 768)?10:50,
        right: (document.body.clientWidth < 768)?45:50,
        bottom: 80
    },
    dataZoom: [{
        type: 'inside',
        start: 98,
        end: 100
    }, {
        //start: 99,
        //end: 100,
        textStyle: {
            color: '#8392A5'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        dataBackground: {
            areaStyle: {
                color: '#8392A5'
            },
            lineStyle: {
                opacity: 0.8,
                color: '#8392A5'
            }
        },
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series : [{
        name:'price',
        symbol:'image://images/icon/circle.png',
        showSymbol: false,
        symbolSize: 6,
        type:'line',
        smooth:true,
        data:[],
        areaStyle: {
            normal: {
                //color: '#D8E8F8'
                color: '#e7f2fe'
            }
        }
    }]
};

// k-line graph echarts OPTION 已弃用
var option2 = {
    //backgroundColor: '#232323',
    backgroundColor: '#2e3335',
    //color: '#121A1D',
    color:['#fff','#ffff00','#884898','#00b642'],
    legend: {
        align: 'left',
        top: 15,
        left: (document.body.clientWidth < 768)?10:50,
        data: ['min K', 'MA5', 'MA10', 'MA20', 'MA30'],
        inactiveColor: '#777',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,1)',
        axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
                color: '#6F6F6F',//竖线
                width: 2,
                opacity: 1
            },
            textStyle: {
                lineHeight: 1.2
            }
        },
        textStyle: {
            color: ['#333','#333','#333','#333','#333','#333','#333','#333'],
            lineHeight: 1.2
        }
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLine: { lineStyle: { color: '#6F6F6F' } }
    },
    yAxis: {
        position: 'right',
        scale: true,
        axisLine: { lineStyle: { color: '#6F6F6F' } },//y
        splitLine: { show: false }
    },
    grid: {
        left: (document.body.clientWidth < 768)?10:50,
        right: (document.body.clientWidth < 768)?45:50,
        bottom: 80
    },
    animation: false
};

//1.0版k线图数据转换（保留函数，已弃用）
function klineValue(data,period){
    var date = new Date();
    var timestamp = [];
    var price = [];
    var openprice = [];
    var closeprice = [];
    var highprice = [];
    var lowprice = [];
    var timeX = [];
    openprice.push(parseFloat(data[0][1]));

    var data_length = data.length;
    var lasttime = data[data_length - 1][0];
    var firsttime = data[0][0];
    //timeX.push(firsttime);
    var high;
    var low;
    var j = 1;
    var state = false;
    for (var time = firsttime + period;time < lasttime + period;time+=period){
        //debugger;
        state = false;
        high = parseFloat(data[j][1]);
        low =  parseFloat(data[j][1]);
        for(var i = j;i < data_length;i++){
            if(parseFloat(data[i - 1][1]) >= high){
                high = parseFloat(data[i - 1][1]);
            }
            if(parseFloat(data[i - 1][1]) < low){
                low = parseFloat(data[i - 1][1]);
            }
            if(data[i][0] > time){
                j = i;
                if(!timeX.length){
                    timeX.push(data[i - 1][0]);
                }
                else if(timeX[timeX.length - 1] != data[i - 1][0] ){
                    closeprice.push(parseFloat(data[i-1][1]));
                    openprice.push(parseFloat(data[i][1]));
                    timeX.push(data[i - 1][0]);
                    state = true;
                }
                break;
            }
        }
        if (state) {
            highprice.push(high);
            lowprice.push(low);
        }
    }
    timeX.shift();
    timeX.pop();
    timeX.push(data[data_length - 1][0]);
    closeprice.push(parseFloat(data[data_length - 1][1]));
    return {
        time: timeX,
        open: openprice,
        close: closeprice,
        high: highprice,
        low: lowprice
    }
}

//当增长率获取不到时计算增幅 已弃用
function getIncrease(data){
    var len = data.length;
    if(!len||!data){
        return false;
    }else{
        //var price = data[len - 1][1]?data[len - 1][1]:$("#new_price").text();
        var price = $("#new_price").text()?$("#new_price").text():data[len - 1][1];
        var increase;
        for(var i = len - 1;i >= 0;i--){
            if(new Date(data[len - 1][0] * 1000).getDate() != (new Date(data[i][0] * 1000).getDate())){
                increase = ((price - data[i + 1][1]) / data[i + 1][1]);
                break;
            }
        }
        if(!increase)
            return false;
        else return (increase * 100).toFixed(3);
    }
}
var myChart;
//本地时区与UTC时区差距
var gapTime = gapTimeStamp();

// web1.0 echarts 分时图绘图函数 已弃用
function quotGraph(exchange_name,coin_name){
    //debugger;
    $('#kmain').hide();
    $("#main").show();
    // 使用刚指定的配置项和数据显示图表。
    myChart = echarts.init(quot_graph);
    myChart.setOption(option);
    window.onresize = function () {
        //重置容器高
        myChart.resize();
        GBIChart.resize();
        setHTMLFontSize();
    };
    myChart.showLoading(defaultConfig);
    var coinData;

    $.ajax({
            async: true,
            url: CONFIG.URL+ 'k3/',
            type: 'GET',
            data: {
                exchange: exchange_name,
                currency: coin_name,
                time: (new Date().getTime() - 864000000 + gapTime)/1000,
                period: 'min'
            }
        })
        .done(function(data) {
            if (data.length) {
                coinData = JSON.parse(data);
                var datax = [];
                var datay = [];
                var length = coinData.length;

                for (var i = 0; i < length; i = i + 1) {
                    datax.push(dateChange(new Date(coinData[i]._id * 1000 - gapTime)));
                    datay.push(parseFloat(coinData[i].datas[0]).toFixed(4));
                }
                var minNum = datay.getMinNum();
                var l = datax.length;
                myChart.hideLoading();
                // console.log(minNum);
                myChart.setOption({
                    xAxis: [{
                        data: datax
                    }],
                    yAxis: [{
                        min: function(value) {
                            return value.min - 20;
                        }
                    }],
                    series: [{
                        name: coin_name + ' price',
                        data: datay
                    }]
                })
            }else{
                $('#error_modal').modal('toggle');
                //clearInterval(clear);
                myChart.hideLoading();
                myChart.dispose(quot_graph);
            }
        })
        .fail(function(){
            $('#error_modal').modal('toggle');
            //clearInterval(clear);
            myChart.hideLoading();
            myChart.dispose(quot_graph);
            return false;
        })
}

////MA5、10、30计算
function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += parseFloat(data[i - j][1]);
        }
        result.push((sum / dayCount).toFixed(4));
    }
    return result;
}


var myChart2;
//
//web1.0 echarts k线图绘图函数 已弃用
function klineGraph(exchange_name,coin_name,time){
    myChart2 = echarts.init(kline_graph);
    myChart2.setOption(option2);
    window.onresize = function () {
        //重置容器高
        myChart2.resize();
        GBIChart.resize();
        setHTMLFontSize();
    };
    myChart2.showLoading(defaultConfig);
    var graph_type;
    var space_time = 10;
    var period = '15mins';
    var start = 5;

    switch(time){
        case 60: {
            graph_type = 'min K';
            period = 'min';
            start = 99;
            break;
        }
        case 300: {
            graph_type = '5min K';
            period = '5mins';
            start = 96;
            break;
        }
        case 900: {
            graph_type = '15min K';
            period = '15mins';
            start = 95;
            break;
        }
        case 1800: {
            graph_type = '30min K';
            period = '30mins';
            start = 80;
            break;
        }
        case 3600: {
            graph_type = '1hour K';
            period = 'hour';
            start = 50;
            break;
        }
        case 86400: {
            graph_type = 'day K';
            space_time = 30;
            period = 'day';
            start = 0;
            break;
        }
        case 86400 * 7: {
            graph_type = 'week K';
            space_time = 30 * 7;
            period = 'week';
            start = 0;
            break;
        }
        case 86400 * 31: {
            graph_type = 'month K';
            space_time = 30 * 31;
            period = 'mon';
            start = 0;
            break;
        }
        default: {
            graph_type = 'day K';
            space_time = 20;
            period = '15mins';
            start = 0;
            break;
        }
    }

    $.ajax({
            url: CONFIG.URL + 'k2/',
            data: {
                exchange: exchange_name,
                currency: coin_name,
                //time: (new Date().getTime() - 864000000 * space_time)/1000,
                time: (new Date().getTime() - 86400000 * space_time + gapTime)/1000,
                period: period
            },

            success: function(data){
                data = JSON.parse(data);
                if(!data.length){
                    $('#error_modal').modal('toggle');
                    myChart2.hideLoading();
                    myChart2.dispose(kline_graph);
                    return false;
                }
                if(!$("#rise").text()){
                    //var increase = getIncrease(data);
                    var increase = parseFloat(data[data.length - 1].increase * 100).toFixed(4);
                    var $i = $(".coin-new-price").children('i');
                    if (increase < 0) {
                        $("#rise").text((increase) + '%');
                        $(".coin-new-price,.coin-rise").css("color","#f76161");
                        $i.addClass('icon-decline').removeClass('icon-shangsheng');
                    } else {
                        $("#rise").text('+' + (increase) + '%');
                        $(".coin-new-price,.coin-rise").css("color", "#5cb85c");
                        $i.removeClass('icon-decline').addClass('icon-shangsheng');
                    }
                }
                var obj = klineValue(data,time);
                var dates = data.map(function(item){
                    return dateChange(new Date(item.timestamp * 1000 - gapTime));
                })

                function getdatas(){
                    var datas = [];
                    for(var i = 0;i < data.length;i++){
                        datas.push([parseFloat(data[i].popen).toFixed(4),parseFloat(data[i].pclose).toFixed(4),parseFloat(data[i].low).toFixed(4),parseFloat(data[i].high).toFixed(4)]);
                    }
                    return datas;
                }
                var lineData = getdatas();
                //console.log(lineData);
                var jin = calculateMA(5, lineData);
                //console.log(jin);
                //console.log(dates);
                var legend = ['MA5', 'MA10', 'MA20', 'MA30'];
                legend.unshift(graph_type);
                myChart2.hideLoading();
                myChart2.setOption({
                    legend: {
                        data: legend
                    },
                    xAxis: {
                        data: dates
                    },
                    dataZoom: [{
                        start: start,
                        end: 100,
                        textStyle: {
                            color: '#8392A5'
                        },
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        dataBackground: {
                            areaStyle: {
                                color: '#8392A5'
                            },
                            lineStyle: {
                                opacity: 0.8,
                                color: '#8392A5'
                            }
                        },
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0,0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }, {
                        type: 'inside',
                        start: start,
                        end: 100
                    }],
                    series: [
                        {
                            type: 'candlestick',
                            name: graph_type,
                            data: lineData,
                            itemStyle: {
                                normal: {
                                    color: '#0CF49B',
                                    color0: '#FD1050',
                                    borderColor: '#0CF49B',
                                    borderColor0: '#FD1050'
                                }
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5, lineData),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    color: "#fff"
                                }
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: calculateMA(10, lineData),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    color: "#ffff00"
                                }
                            }
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            data: calculateMA(20, lineData),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    color: "#884898"
                                }
                            }
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: calculateMA(30, lineData),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    color: "#00b642"
                                }
                            }
                        }
                    ]
                })
            }
        })
        .fail(function(){
            $('#error_modal').modal('toggle');
            myChart2.hideLoading();
            myChart2.dispose(kline_graph);
        })
}

//设置自选列表
function setCoinList(coin,exchange,selectPosition,index){
    //var position1 =
    var content = '<li data-index=' + index + '><span class=' + coin + ' data-position=' + selectPosition + ' data-coin=' + coin + ' data-exchange=' + exchange + '></span>';
    content += '<a href="javascript:">' + coin + '(' + exchange + ')' + '</a>';
    content +=  '<i class="iconfont icon-cha closeOptional"></i>' + '</li>';
    console.log(content);
    $(".select-market-list").append(content);
}

//根据本地cookie设置自选列表
function setCoinListByCookie(coin,exchange,index){
    //var position1 =
    var content = '<li' + ' data-index=' + index +'><span class=' + coin  + ' data-coin=' + coin + ' data-exchange=' + exchange + '></span>';
    content += '<a href="javascript:">' + coin + '(' + exchange + ')' + '</a>';
    content +=  '<i class="iconfont icon-cha closeOptional"></i>' + '</li>';
    console.log(content);
    $(".select-market-list").append(content);
}

