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
        elemData += '<td><a target="_blank" title="' + item.currency + ' kline" href="/chart?exchange=' + item.exchange + '&coin=' + item.currency + '"><i class="iconfont icon-tubiaozhexiantu klineGraph"></i></a></td></tr>';
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
                        str += "<td><a target='_blank' title='" + coin + " kline' href='/chart?exchange=" + datas.name + "&coin=" + coin + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>"
                    } else {
                        var time = datas.timestamp?getDateLineTime(new Date(parseInt(datas.timestamp) * 1000)):'-';
                        price = (price > 0) ? (coinUnit + '+' + price) : (coinUnit + price);
                        var str = "<tr><td>" + "<span class='exchange-icon " + datas.name + "\'></span><a href = 'javascript:' data-href='index.html?exchange=" + datas.name + "#exchange\'>" + datas.name + "</a></td>";
                        str += "<td>" + time + "</td>";
                        str += "<td>" + tableTd2(datas.last) + "</td><td style=\"color:" + color + "\">" + price + "</td><td>" + tableTd2(datas.high) + "</td><td>" + tableTd2(datas.low) + "</td><td style='color:" + increaseColor + "'>" + percentNum(datas.increase) + "<i class='iconfont " + fontClass + "' style='color:" + increaseColor + "'></i>" + "</td><td>" + tableTd(datas.volume) + "</td>";
                        str += priceNum(datas.trend)?"<td><svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"><polyline points=\"" + priceNum(datas.trend) + "\" style='fill:none;stroke:#71BEF4;stroke-width:2'></polyline></svg></td>":"<td>-</td>";
                        str += "<td><a target='_blank' title='" + coin + " kline' href='/chart?exchange=" + datas.name + "&coin=" + coin + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>";
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
                        //str += "<td>" + tableTd(datas.bid) + "</td>" + "<td>" + tableTd(datas.ask) + "</td>";
                        str += "<td>" + tableTd(datas.high) + "</td><td>" + tableTd(datas.low) + "</td>";
                        str += "<td style='color:" + increaseColor + "\'>" + percentNum(datas.increase) + "<i class='iconfont " + fontClass + "' style='color:" + increaseColor + "'></i>" + "</td><td>" + tableTd(datas.volume) + "</td>";
                        str += "<td><a target='_blank' title='" + key + " kline' href='/chart?exchange=" + exchange + "&coin=" + key + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>";
                    }else {
                        var time = datas.timestamp?getDateLineTime(new Date(datas.timestamp * 1000)):'-';
                        var str = "<tr><td>" + "<i class=\'coin-icon " + key + "\'></i>" + key + "</td>";
                        str += "<td>" + time + "</td>";
                        str += "<td>" + tableTd2(datas.last) + "</td>";
                       // str += "<td>" + tableTd2(datas.bid) + "</td>" + "<td>" + tableTd2(datas.ask) + "</td>";
                        str += "<td>" + tableTd2(datas.high) + "</td><td>" + tableTd2(datas.low) + "</td>";
                        str += "<td style='color:" + increaseColor + "\'>" + percentNum(datas.increase) + "<i class='iconfont " + fontClass + "' style='color:" + increaseColor + "'></i>" + "</td><td>" + tableTd(datas.volume) + "</td>";
                        str += "<td><a target='_blank' title='" + key + " kline' href='/chart?exchange=" + exchange + "&coin=" + key + "'><i class='iconfont icon-tubiaozhexiantu klineGraph'></i></a></td></tr>";
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
                        { "orderable": false, "targets": [1,7] }
                    ]
                });
                judgeExchangeList(exchange);
            }
        }
    })
}

//跳转至kline iframe路径
function goKlineIframe(exchange,coin){
    $("#kline").attr('src','/chart?' + 'exchange=' + exchange + '&coin=' + coin);
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

var myChart;
//本地时区与UTC时区差距
var gapTime = gapTimeStamp();

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

//dataTable插件生成的两个表格
var $currency_Table = $("#currency_Table");
var $exchange_table = $("#exchange_Table");
var table1 = $currency_Table.DataTable({
    "searching": false,
    "paging": false
});
var table2 = $exchange_table.DataTable({
    "searching": false,
    "paging": false
});

//给每一个自选菜单列表的交易对都加上序号
$(".list li").each(function(index,elem){
    $(this).attr("data-index",index);
})

$(function() {
    var $html = $("html");
    var $follow_List = $(".follow-list");

    var loginState = loginJudge();//判断是否有用户登录

    //若没有用户登陆则不允许添加自选
    if(!loginState) {
        $(".login-judge").show();
        $(".list li").addClass('disabled');
    } else {
        $(".login-judge").hide();
        $(".list li").removeClass('disabled');
        var loginUser = new User(loginState.loginName,loginState.member_id);
        console.log(loginUser);

        var optionalData = loginUser.getOptionalData();//获取自选交易对的数据
        if(optionalData.length == 0){
        } else {
            optionalData.forEach(function(item,index){
                setCoinListByCookie(item.currency,item.exchange,item.sortNo);
                $(".list li").each(function(index,elem){
                    if($(this).attr("data-index") == item.sortNo){
                        $(this).addClass('selected');
                    }
                })
            })
        }

        //若有用户登录，则在点击自选材单时在顶部菜单栏显示自选货币交易对
        function clickCoinElem(){
            var loginState = loginJudge();
            if(!loginState) {
                $(".login-judge").show();
                $(".list li").addClass('disabled');
                return false;
            } else if(!$(this).hasClass('selected')){
                var coin = $(this).parent('ul').siblings('span').attr('id');
                var exchange = $(this).children('a').html();
                var indexA = $(this).parents('.tab-coin-list').index();
                var indexB = $(this).index();
                var index = $(this).attr("data-index");
                setCoinList(coin,exchange,indexA + '-' + indexB,index);
                $(this).addClass('selected');
            } else {
                return false;
            }
        }
        $("#select_modal").on('click','.tab-coin-list .list li',clickCoinElem);

        //注销时清除自选信息
        $("#logout").click(function(){
            logout();
            loginJudge();
            displayCoinMenu();
            setTable('BTC');
            $("#optional_Table").children('tbody').empty();
            $(".select-market-list").empty();
            $(".login-judge").show();
            $(".list li").removeClass('selected').addClass('disabled').unbind('click');
        });

        //点击删除时删除自选的交易对
        $html.on('click','.closeOptional',function(){
            $(this).parent('li').remove();
            if($(this).siblings('span').attr('data-position')) {
                var position = $(this).siblings('span').attr('data-position').split('-');
                var indexA = parseInt(position[0]);
                var indexB = parseInt(position[1]);
                console.log(indexA);
                console.log(indexB);
                $(".tab-coin-list").eq(indexA).find('li').eq(indexB).removeClass('selected');
            } else {
                var liIndex = $(this).parent('li').attr("data-index");
                $(".list li").each(function(index,item){
                    if($(this).attr("data-index") == liIndex){
                        $(this).removeClass('selected');
                    }
                })
            }
            //$(this).
        })

        //点击清空时清空选择的交易对
        $("#empty").click(function(){
            $(".select-market-list").empty();
            $(".list li").removeClass('selected');
        })

        //点击保存时保存交易对信息至服务器,然后显示自选列表
        $("#save").click(function(){
            if(!$(".select-market-list li").length){
                //$(".select-market").append('You have not chosen any options yet!');
                $("#select_modal").modal('toggle');
                loginUser.addOptionalList([]);
                return false;
            } else{
                var obj = [];
                $(".select-market-list li").each(function(index,elem){
                    var coin = $(this).children('span').attr('data-coin');
                    var exchange = $(this).children('span').attr('data-exchange');
                    obj.push({
                        currency: coin,
                        exchange: exchange,
                        sortNo: $(this).attr("data-index")
                    });
                })
                $("#loading_coin").show();
                loginUser.addOptionalList(obj);
                $("#select_modal").modal('toggle');
                return true;
            }
        })
    }

    //点击自选时显示自选模态框
    $("#coinOptional").click(function(){
        $("#select_modal").modal('toggle');
        displayOptionMenu();
        if(loginJudge()) {
            if(!$(".select-market-list li").length){
                //$(".select-market").append('You have not chosen any options yet!');
                return false;
            } else{
                var obj = [];
                $(".select-market-list li").each(function(index,elem){
                    var coin = $(this).children('span').attr('data-coin');
                    var exchange = $(this).children('span').attr('data-exchange');
                    obj.push({
                        currency: coin,
                        exchange: exchange,
                        sortNo: $(this).attr("data-index")
                    });
                })
                $("#loading_coin").show();
                optionDataChange(obj);
                return true;
            }
        }
    })

    //$follow_List.show();

    //生成第一个货币表格
    $("#loading_coin").show();
    $("#coinTableDiv").hide();
    setTable('BTC');

    //生成第一个交易所下的币种表格
    $("#loading_exchange_coin").show();
    $("#exchangeTableDiv").hide();
    setTableByExchange('Bitfinex');

    //异步生成所有币种列表
    $.ajax({
        url: CONFIG.URL + 'currency/all/',
        type: 'GET',
        success: function(data){
            data = JSON.parse(data);
            if(!data||!data.length){
                $('#error_modal').modal('toggle');
            }else{
                //console.log(data.length)
                data.sort();
                $("#area4").html(data.length);
                //console.log(data);
                setCurrenecyList(data);
            }
        }
    })

    //异步生成所有交易所列表
    var $exchange_table = $("#exchange_Table");
    $.ajax({
        url: CONFIG.URL + 'exchange/all/sorted/',
        type: 'GET',
        success: function(data){
            if(!data||!data.length){
                $('#error_modal').modal('toggle');
            }else{
                data = JSON.parse(data);
                data = data.sort();
                $("#area1").html(data.length);
                setExchangeAllList(data);
            }
        },
        fail: function(){
            $('#error_modal').modal('toggle');
        }
    })

    //点击more货币按钮
    var state = true;
    var $iconDown = $("#iconDown");
    var $iconUp = $("#iconUp");
    var $currencyList = $(".currency-list");
    var exchangeState = true;
    var $iconDown2 = $("#iconDown2");
    var $iconUp2 = $("#iconUp2");
    var $ExchangeList = $(".exchange-list");

    //点击moreCoin生成货币列表的下拉菜单
    $("#moreCoin").click(function(event){
        if(state) {
            $iconDown.hide();
            $iconUp.show();
            $currencyList.slideDown();
            state = false;
        }else{
            $iconUp.hide();
            $currencyList.slideUp();
            $iconDown.show();
            state = true;
        }
        event = event||window.event;
        event.stopPropagation();
    })

    //点击moreExchangeCoin生成交易所列表的下拉菜单
    $("#moreExchangeCoin").click(function(event){
        if(exchangeState) {
            $iconDown2.hide();
            $iconUp2.show();
            $ExchangeList.slideDown();
            exchangeState = false;
        }else{
            $iconUp2.hide();
            $ExchangeList.slideUp();
            $iconDown2.show();
            exchangeState = true;
        }
        event = event||window.event;
        event.stopPropagation();
    })

    //点击货币下拉菜单字母导航栏
    $html.on('click','#top_nav_list a',function(event){
        $(".currency-list").show();
        event = event||window.event;
        event.stopPropagation();
        var $par = $(this).parents('.exchangeListBox');
        var $linkElem = $($(this).attr('data-href'));
        $par.animate({
            scrollTop:  ($linkElem.offset().top - $par.offset().top + $par.scrollTop())
        },800)
    })

    //点击交易所下拉菜单字母导航栏
    $html.on('click','#nav_list a',function(event){
        $(".exchange-list").show();
        event = event||window.event;
        event.stopPropagation();
        var $par = $(this).parents('.exchangeListBox');
        var $linkElem = $($(this).attr('data-href'));
        $par.animate({
            scrollTop:  ($linkElem.offset().top - $par.offset().top + $par.scrollTop())
        },800)
    })

    //点击下拉菜单中的货币
    $html.on('click','.currency-list .currencyList li',function(){
        $("#loading_coin").show();
        $("#coinTableDiv").hide();
        displayCoinMenu();
        setTable($(this).html());
    })

    //点击下拉菜单中的交易所
    $html.on('click','.exchange-list .currencyList li',function(){
        $("#loading_exchange_coin").show();
        $("#exchangeTableDiv").hide();
        setTableByExchange($(this).html());
    })

    //点击document下拉菜单淡出
    $(document).click(function(){
        $iconUp.hide();
        //$currencyList.hide('400');
        $currencyList.slideUp();
        $iconDown.show();
        state = true;
        $iconUp2.hide();
        //$ExchangeList.hide('600');
        $ExchangeList.slideUp();
        $iconDown2.show();
        exchangeState = true;
    })

    //$(".footer-time").html(getDateDaytime(new Date()));
    //GBIdraw();

    //GBI指数图渐变色
    var color = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(124,181,236,0.8)'
        }, {
            offset: 0.5, color: 'rgba(124,181,236,0.4)'
        }, {
            offset: 1, color: 'rgba(124,181,236,0)'
        }]
    };

    var color2 = {
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
    };

    //绘制GBI指数图
    var option3 = indexOption();
    var GBIChart = echarts.init(document.getElementById('GBI'));
    GBIChart.setOption(option3);
    GBIChart.showLoading();
    GBIGrapth(GBIChart,color);

    //点击默认的货币列表
    $html.on('click','#coinRecentList li',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        $("#loading_coin").show();
        $("#coinTableDiv").hide();
        displayCoinMenu();
        setTable($(this).html());
    })

    //点击默认的交易所列表
    $html.on('click','#ExchangeRecentList li',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
        $("#loading_exchange_coin").show();
        $("#exchangeTableDiv").hide();
        setTableByExchange($(this).html());
    })

    //搜索框输入时搜索交易所
//		exchangeSearch.oninput = function(){
//			searchExchange();
//		}

    //关闭下载二维码按钮
    $("#close").click(function(){
        $(".code-area").hide();
    })

    var $split_line = $("#split_line");
    var $platform = $("#platform");

    //android ios选择
    $("#android").hover(function(){
        $split_line.css('left',0);
        $(this).css('opacity',1).siblings().css('opacity',0.6);
        $platform.html('Android');
        $(".top-area .after").css('opacity','0');
        $(".top-area ").css('background-image','url(images/back/banner.jpg)');
    })
    $("#ios").hover(function(){
        $split_line.css('left','128px');
        $(this).css('opacity',1).siblings().css('opacity',0.6);
        $platform.html('iOS');
        $(".top-area .after").css('opacity','0.6');
        $(".top-area ").css('background-image','url(images/back/index.jpg)');
    })

    //点击搜素框
    $("#exchangeValue").click(function(event){
        $(".search-area").show();
        event.stopPropagation();
    })

    //点击搜索按钮
    $("#searchBtn").click(function(){
        $(".search-area").show();
        event.stopPropagation();
    })

    //交易下拉框的mouseover动作
    $("#exchange_more").mouseover(function(event){
        $(this).siblings('.follow-list').stop().css({
            "display": "block",
            "height": "310px",
            "overflow-y": "auto",
            "padding-top": "10px"
        })
        event.stopPropagation();
    })

    //交易下拉框mouseover
    $("#exchangeList,.follow-list").mouseover(function(event){
        $(this).show();
        event.stopPropagation();
    })

    //mouseover到别的元素时隐藏下拉菜单
    $("body").mouseover(function(){
        $follow_List.stop().css({
            "height": 0,
            "overflow-y": "hidden",
            "padding-top": 0
        })
        $search_list.hide();
    })

    //搜索框hover显示搜索结果
    $(".search-area").mouseover(function(event){
        event = event||window.event;
        $search_list.show();
        event.stopPropagation();
    })

    //点击html里编写的默认的交易所列表
    $html.on('click','#exchangeList > ul > li',function(){
        createCoinList($(this).html());
        $(this).addClass('active').siblings().removeClass('active');
    })

    //点击下拉菜单里生成的交易所列表
    $html.on('click','#exchange_list li',function(){
        //debugger;
        var exchangeType = $(this).html();
        var index = false;
        createCoinList($(this).html());
        $("#showExchangeList li").each(function(){
            if($(this).html() == exchangeType) {
                index = $(this).index();
                return false;
            }
        })
        if(index||index===0) {
            $("#showExchangeList  li").eq(index).addClass('active').siblings().removeClass('active');
        }else{
            $("#showExchangeList").append('<li>' + exchangeType + '</li>');
            $("#showExchangeList  li:last-child").text(exchangeType).addClass('active').siblings().removeClass('active');
        }
        $("#exchange_list").hide('fast');
    })

    //点击搜索出的交易所
    $html.on('click','.search-list li',function(){
        $(".search-area").hide();
        var searchExchange = $(this).html();
        var index = false;
        createCoinList(searchExchange);
        $("#showExchangeList li").each(function(){
            if($(this).html() == searchExchange) {
                index = $(this).index();
                return false;
            }
        })
        if(index) {
            $("#showExchangeList li").eq(index).addClass('active').siblings().removeClass('active');
        }else{
            $("#showExchangeList").append('<li>' + searchExchange + '</li>');
            $("#showExchangeList li:last-child").text(searchExchange).addClass('active').siblings().removeClass('active');
        }
    })

    //点击生成的货币列表
    $html.on('click','#showCoinList li',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var obj = getSelectValue();
        getDayCoinValue(obj.exchange);
        goKlineIframe(obj.exchange,obj.coin);
    })

    //自选列表弹框菜单栏下拉菜单状态切换
    $html.on('click','.tab-coin-list span',function(){
        console.log($(this).siblings('.list').css('display'));
        if($(this).siblings('.list').css('display') != 'none'){
            $(this).siblings('a').removeClass('active');
        } else {
            $(this).siblings('a').addClass('active');
        }
        $(this).siblings('.list').stop().slideToggle();
    })
    $html.on('click','.collapse-handler',function(){
        if($(this).siblings('.list').css('display') != 'none'){
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
        $(this).siblings('.list').stop().slideToggle();
    })
})

$("#login_btn").click(function(){
    $("#select_modal").modal('toggle');
    loginEvent();
})
$("#sign_up").click(function(){
    $("#select_modal").modal('toggle');
    loginEvent();
    signUp();
})
