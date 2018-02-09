/*
 * International Telephone Input v11.0.4
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],function(b){a(b,window,document)}):"object"==typeof module&&module.exports?module.exports=a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c,d){"use strict";function e(b,c){this.a=a(b),this.b=a.extend({},h,c),this.ns="."+f+g++,this.d=Boolean(b.setSelectionRange),this.e=Boolean(a(b).attr("placeholder"))}var f="intlTelInput",g=1,h={allowDropdown:!0,autoHideDialCode:!0,autoPlaceholder:"polite",customPlaceholder:null,dropdownContainer:"",excludeCountries:[],formatOnDisplay:!0,geoIpLookup:null,initialCountry:"",nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",preferredCountries:["us","gb"],separateDialCode:!1,utilsScript:""},i={b:38,c:40,d:13,e:27,f:43,A:65,Z:90,j:32,k:9},j=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"];a(b).on("load",function(){a.fn[f].windowLoaded=!0}),e.prototype={_a:function(){return this.b.nationalMode&&(this.b.autoHideDialCode=!1),this.b.separateDialCode&&(this.b.autoHideDialCode=this.b.nationalMode=!1),this.g=/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this.g&&(a("body").addClass("iti-mobile"),this.b.dropdownContainer||(this.b.dropdownContainer="body")),this.h=new a.Deferred,this.i=new a.Deferred,this.s={},this._b(),this._f(),this._h(),this._i(),this._i2(),[this.h,this.i]},_b:function(){this._d(),this._d2(),this._e()},_c:function(a,b,c){b in this.q||(this.q[b]=[]);var d=c||0;this.q[b][d]=a},_c2:function(b,c){var d;for(d=0;d<b.length;d++)b[d]=b[d].toLowerCase();for(this.p=[],d=0;d<k.length;d++)c(a.inArray(k[d].iso2,b))&&this.p.push(k[d])},_d:function(){this.b.onlyCountries.length?this._c2(this.b.onlyCountries,function(a){return a>-1}):this.b.excludeCountries.length?this._c2(this.b.excludeCountries,function(a){return a==-1}):this.p=k},_d2:function(){this.q={};for(var a=0;a<this.p.length;a++){var b=this.p[a];if(this._c(b.iso2,b.dialCode,b.priority),b.areaCodes)for(var c=0;c<b.areaCodes.length;c++)this._c(b.iso2,b.dialCode+b.areaCodes[c])}},_e:function(){this.preferredCountries=[];for(var a=0;a<this.b.preferredCountries.length;a++){var b=this.b.preferredCountries[a].toLowerCase(),c=this._y(b,!1,!0);c&&this.preferredCountries.push(c)}},_f:function(){this.a.attr("autocomplete","off");var b="intl-tel-input";this.b.allowDropdown&&(b+=" allow-dropdown"),this.b.separateDialCode&&(b+=" separate-dial-code"),this.a.wrap(a("<div>",{"class":b})),this.k=a("<div>",{"class":"flag-container"}).insertBefore(this.a);var c=a("<div>",{"class":"selected-flag"});c.appendTo(this.k),this.l=a("<div>",{"class":"iti-flag"}).appendTo(c),this.b.separateDialCode&&(this.t=a("<div>",{"class":"selected-dial-code"}).appendTo(c)),this.b.allowDropdown?(c.attr("tabindex","0"),a("<div>",{"class":"iti-arrow"}).appendTo(c),this.m=a("<ul>",{"class":"country-list hide"}),this.preferredCountries.length&&(this._g(this.preferredCountries,"preferred"),a("<li>",{"class":"divider"}).appendTo(this.m)),this._g(this.p,""),this.o=this.m.children(".country"),this.b.dropdownContainer?this.dropdown=a("<div>",{"class":"intl-tel-input iti-container"}).append(this.m):this.m.appendTo(this.k)):this.o=a()},_g:function(a,b){for(var c="",d=0;d<a.length;d++){var e=a[d];c+="<li class='country "+b+"' data-dial-code='"+e.dialCode+"' data-country-code='"+e.iso2+"'>",c+="<div class='flag-box'><div class='iti-flag "+e.iso2+"'></div></div>",c+="<span class='country-name'>"+e.name+"</span>",c+="<span class='dial-code'>+"+e.dialCode+"</span>",c+="</li>"}this.m.append(c)},_h:function(){var a=this.a.val();this._af(a)&&!this._isRegionlessNanp(a)?this._v(a):"auto"!==this.b.initialCountry&&(this.b.initialCountry?this._z(this.b.initialCountry.toLowerCase()):(this.j=this.preferredCountries.length?this.preferredCountries[0].iso2:this.p[0].iso2,a||this._z(this.j)),a||this.b.nationalMode||this.b.autoHideDialCode||this.b.separateDialCode||this.a.val("+"+this.s.dialCode)),a&&this._u(a)},_i:function(){this._j(),this.b.autoHideDialCode&&this._l(),this.b.allowDropdown&&this._i1()},_i1:function(){var a=this,b=this.a.closest("label");b.length&&b.on("click"+this.ns,function(b){a.m.hasClass("hide")?a.a.focus():b.preventDefault()});var c=this.l.parent();c.on("click"+this.ns,function(b){!a.m.hasClass("hide")||a.a.prop("disabled")||a.a.prop("readonly")||a._n()}),this.k.on("keydown"+a.ns,function(b){var c=a.m.hasClass("hide");!c||b.which!=i.b&&b.which!=i.c&&b.which!=i.j&&b.which!=i.d||(b.preventDefault(),b.stopPropagation(),a._n()),b.which==i.k&&a._ac()})},_i2:function(){var c=this;this.b.utilsScript?a.fn[f].windowLoaded?a.fn[f].loadUtils(this.b.utilsScript,this.i):a(b).on("load",function(){a.fn[f].loadUtils(c.b.utilsScript,c.i)}):this.i.resolve(),"auto"===this.b.initialCountry?this._i3():this.h.resolve()},_i3:function(){a.fn[f].autoCountry?this.handleAutoCountry():a.fn[f].startedLoadingAutoCountry||(a.fn[f].startedLoadingAutoCountry=!0,"function"==typeof this.b.geoIpLookup&&this.b.geoIpLookup(function(b){a.fn[f].autoCountry=b.toLowerCase(),setTimeout(function(){a(".intl-tel-input input").intlTelInput("handleAutoCountry")})}))},_j:function(){var a=this;this.a.on("keyup"+this.ns,function(){a._v(a.a.val())&&a._triggerCountryChange()}),this.a.on("cut"+this.ns+" paste"+this.ns,function(){setTimeout(function(){a._v(a.a.val())&&a._triggerCountryChange()})})},_j2:function(a){var b=this.a.attr("maxlength");return b&&a.length>b?a.substr(0,b):a},_l:function(){var b=this;this.a.on("mousedown"+this.ns,function(a){b.a.is(":focus")||b.a.val()||(a.preventDefault(),b.a.focus())}),this.a.on("focus"+this.ns,function(a){b.a.val()||b.a.prop("readonly")||!b.s.dialCode||(b.a.val("+"+b.s.dialCode),b.a.one("keypress.plus"+b.ns,function(a){a.which==i.f&&b.a.val("")}),setTimeout(function(){var a=b.a[0];if(b.d){var c=b.a.val().length;a.setSelectionRange(c,c)}}))});var c=this.a.prop("form");c&&a(c).on("submit"+this.ns,function(){b._removeEmptyDialCode()}),this.a.on("blur"+this.ns,function(){b._removeEmptyDialCode()})},_removeEmptyDialCode:function(){var a=this.a.val(),b="+"==a.charAt(0);if(b){var c=this._m(a);c&&this.s.dialCode!=c||this.a.val("")}this.a.off("keypress.plus"+this.ns)},_m:function(a){return a.replace(/\D/g,"")},_n:function(){this._o();var a=this.m.children(".active");a.length&&(this._x(a),this._ad(a)),this._p(),this.l.children(".iti-arrow").addClass("up")},_o:function(){var c=this;if(this.b.dropdownContainer&&this.dropdown.appendTo(this.b.dropdownContainer),this.n=this.m.removeClass("hide").outerHeight(),!this.g){var d=this.a.offset(),e=d.top,f=a(b).scrollTop(),g=e+this.a.outerHeight()+this.n<f+a(b).height(),h=e-this.n>f;if(this.m.toggleClass("dropup",!g&&h),this.b.dropdownContainer){var i=!g&&h?0:this.a.innerHeight();this.dropdown.css({top:e+i,left:d.left}),a(b).on("scroll"+this.ns,function(){c._ac()})}}},_p:function(){var b=this;this.m.on("mouseover"+this.ns,".country",function(c){b._x(a(this))}),this.m.on("click"+this.ns,".country",function(c){b._ab(a(this))});var d=!0;a("html").on("click"+this.ns,function(a){d||b._ac(),d=!1});var e="",f=null;a(c).on("keydown"+this.ns,function(a){a.preventDefault(),a.which==i.b||a.which==i.c?b._q(a.which):a.which==i.d?b._r():a.which==i.e?b._ac():(a.which>=i.A&&a.which<=i.Z||a.which==i.j)&&(f&&clearTimeout(f),e+=String.fromCharCode(a.which),b._s(e),f=setTimeout(function(){e=""},1e3))})},_q:function(a){var b=this.m.children(".highlight").first(),c=a==i.b?b.prev():b.next();c.length&&(c.hasClass("divider")&&(c=a==i.b?c.prev():c.next()),this._x(c),this._ad(c))},_r:function(){var a=this.m.children(".highlight").first();a.length&&this._ab(a)},_s:function(a){for(var b=0;b<this.p.length;b++)if(this._t(this.p[b].name,a)){var c=this.m.children("[data-country-code="+this.p[b].iso2+"]").not(".preferred");this._x(c),this._ad(c,!0);break}},_t:function(a,b){return a.substr(0,b.length).toUpperCase()==b},_u:function(a){if(this.b.formatOnDisplay&&b.intlTelInputUtils&&this.s){var c=this.b.separateDialCode||!this.b.nationalMode&&"+"==a.charAt(0)?intlTelInputUtils.numberFormat.INTERNATIONAL:intlTelInputUtils.numberFormat.NATIONAL;a=intlTelInputUtils.formatNumber(a,this.s.iso2,c)}a=this._ah(a),this.a.val(a)},_v:function(b){b&&this.b.nationalMode&&"1"==this.s.dialCode&&"+"!=b.charAt(0)&&("1"!=b.charAt(0)&&(b="1"+b),b="+"+b);var c=this._af(b),d=null,e=this._m(b);if(c){var f=this.q[this._m(c)],g=a.inArray(this.s.iso2,f)>-1,h="+1"==c&&e.length>=4,i="1"==this.s.dialCode;if((!i||!this._isRegionlessNanp(e))&&(!g||h))for(var j=0;j<f.length;j++)if(f[j]){d=f[j];break}}else"+"==b.charAt(0)&&e.length?d="":b&&"+"!=b||(d=this.j);return null!==d&&this._z(d)},_isRegionlessNanp:function(b){var c=this._m(b);if("1"==c.charAt(0)){var d=c.substr(1,3);return a.inArray(d,j)>-1}return!1},_x:function(a){this.o.removeClass("highlight"),a.addClass("highlight")},_y:function(a,b,c){for(var d=b?k:this.p,e=0;e<d.length;e++)if(d[e].iso2==a)return d[e];if(c)return null;throw new Error("No country data for '"+a+"'")},_z:function(a){var b=this.s.iso2?this.s:{};this.s=a?this._y(a,!1,!1):{},this.s.iso2&&(this.j=this.s.iso2),this.l.attr("class","iti-flag "+a);var c=a?this.s.name+": +"+this.s.dialCode:"Unknown";if(this.l.parent().attr("title",c),this.b.separateDialCode){var d=this.s.dialCode?"+"+this.s.dialCode:"",e=this.a.parent();b.dialCode&&e.removeClass("iti-sdc-"+(b.dialCode.length+1)),d&&e.addClass("iti-sdc-"+d.length),this.t.text(d)}return this._aa(),this.o.removeClass("active"),a&&this.o.find(".iti-flag."+a).first().closest(".country").addClass("active"),b.iso2!==a},_aa:function(){var a="aggressive"===this.b.autoPlaceholder||!this.e&&(this.b.autoPlaceholder===!0||"polite"===this.b.autoPlaceholder);if(b.intlTelInputUtils&&a){var c=intlTelInputUtils.numberType[this.b.placeholderNumberType],d=this.s.iso2?intlTelInputUtils.getExampleNumber(this.s.iso2,this.b.nationalMode,c):"";d=this._ah(d),"function"==typeof this.b.customPlaceholder&&(d=this.b.customPlaceholder(d,this.s)),this.a.attr("placeholder",d)}},_ab:function(a){var b=this._z(a.attr("data-country-code"));if(this._ac(),this._ae(a.attr("data-dial-code"),!0),this.a.focus(),this.d){var c=this.a.val().length;this.a[0].setSelectionRange(c,c)}b&&this._triggerCountryChange()},_ac:function(){this.m.addClass("hide"),this.l.children(".iti-arrow").removeClass("up"),a(c).off(this.ns),a("html").off(this.ns),this.m.off(this.ns),this.b.dropdownContainer&&(this.g||a(b).off("scroll"+this.ns),this.dropdown.detach())},_ad:function(a,b){var c=this.m,d=c.height(),e=c.offset().top,f=e+d,g=a.outerHeight(),h=a.offset().top,i=h+g,j=h-e+c.scrollTop(),k=d/2-g/2;if(h<e)b&&(j-=k),c.scrollTop(j);else if(i>f){b&&(j+=k);var l=d-g;c.scrollTop(j-l)}},_ae:function(a,b){var c,d=this.a.val();if(a="+"+a,"+"==d.charAt(0)){var e=this._af(d);c=e?d.replace(e,a):a}else{if(this.b.nationalMode||this.b.separateDialCode)return;if(d)c=a+d;else{if(!b&&this.b.autoHideDialCode)return;c=a}}this.a.val(c)},_af:function(b){var c="";if("+"==b.charAt(0))for(var d="",e=0;e<b.length;e++){var f=b.charAt(e);if(a.isNumeric(f)&&(d+=f,this.q[d]&&(c=b.substr(0,e+1)),4==d.length))break}return c},_ag:function(){var b,c=a.trim(this.a.val()),d=this.s.dialCode,e=this._m(c),f="1"==e.charAt(0)?e:"1"+e;return b=this.b.separateDialCode?"+"+d:"+"!=c.charAt(0)&&"1"!=c.charAt(0)&&d&&"1"==d.charAt(0)&&4==d.length&&d!=f.substr(0,4)?d.substr(1):"",b+c},_ah:function(a){if(this.b.separateDialCode){var b=this._af(a);if(b){null!==this.s.areaCodes&&(b="+"+this.s.dialCode);var c=" "===a[b.length]||"-"===a[b.length]?b.length+1:b.length;a=a.substr(c)}}return this._j2(a)},_triggerCountryChange:function(){this.a.trigger("countrychange",this.s)},handleAutoCountry:function(){"auto"===this.b.initialCountry&&(this.j=a.fn[f].autoCountry,this.a.val()||this.setCountry(this.j),this.h.resolve())},handleUtils:function(){b.intlTelInputUtils&&(this.a.val()&&this._u(this.a.val()),this._aa()),this.i.resolve()},destroy:function(){if(this.allowDropdown&&(this._ac(),this.l.parent().off(this.ns),this.a.closest("label").off(this.ns)),this.b.autoHideDialCode){var b=this.a.prop("form");b&&a(b).off(this.ns)}this.a.off(this.ns);var c=this.a.parent();c.before(this.a).remove()},getExtension:function(){return b.intlTelInputUtils?intlTelInputUtils.getExtension(this._ag(),this.s.iso2):""},getNumber:function(a){return b.intlTelInputUtils?intlTelInputUtils.formatNumber(this._ag(),this.s.iso2,a):""},getNumberType:function(){return b.intlTelInputUtils?intlTelInputUtils.getNumberType(this._ag(),this.s.iso2):-99},getSelectedCountryData:function(){return this.s},getValidationError:function(){return b.intlTelInputUtils?intlTelInputUtils.getValidationError(this._ag(),this.s.iso2):-99},isValidNumber:function(){var c=a.trim(this._ag()),d=this.b.nationalMode?this.s.iso2:"";return b.intlTelInputUtils?intlTelInputUtils.isValidNumber(c,d):null},setCountry:function(a){a=a.toLowerCase(),this.l.hasClass(a)||(this._z(a),this._ae(this.s.dialCode,!1),this._triggerCountryChange())},setNumber:function(a){var b=this._v(a);this._u(a),b&&this._triggerCountryChange()}},a.fn[f]=function(b){var c=arguments;if(b===d||"object"==typeof b){var g=[];return this.each(function(){if(!a.data(this,"plugin_"+f)){var c=new e(this,b),d=c._a();g.push(d[0]),g.push(d[1]),a.data(this,"plugin_"+f,c)}}),a.when.apply(null,g)}if("string"==typeof b&&"_"!==b[0]){var h;return this.each(function(){var d=a.data(this,"plugin_"+f);d instanceof e&&"function"==typeof d[b]&&(h=d[b].apply(d,Array.prototype.slice.call(c,1))),"destroy"===b&&a.data(this,"plugin_"+f,null)}),h!==d?h:this}},a.fn[f].getCountryData=function(){return k},a.fn[f].loadUtils=function(b,c){a.fn[f].loadedUtilsScript?c&&c.resolve():(a.fn[f].loadedUtilsScript=!0,a.ajax({type:"GET",url:b,complete:function(){a(".intl-tel-input input").intlTelInput("handleUtils")},dataType:"script",cache:!0}))},a.fn[f].defaults=h,a.fn[f].version="11.0.4";for(var k=[["Afghanistan (‫افغانستان‬‎)","af","93"],["Albania (Shqipëri)","al","355"],["Algeria (‫الجزائر‬‎)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (Հայաստան)","am","374"],["Aruba","aw","297"],["Australia","au","61",0],["Austria (Österreich)","at","43"],["Azerbaijan (Azərbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (‫البحرين‬‎)","bh","973"],["Bangladesh (বাংলাদেশ)","bd","880"],["Barbados","bb","1246"],["Belarus (Беларусь)","by","375"],["Belgium (België)","be","32"],["Belize","bz","501"],["Benin (Bénin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (འབྲུག)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Босна и Херцеговина)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (България)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (កម្ពុជា)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic (République centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (中国)","cn","86"],["Christmas Island","cx","61",2],["Cocos (Keeling) Islands","cc","61",1],["Colombia","co","57"],["Comoros (‫جزر القمر‬‎)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus (Κύπρος)","cy","357"],["Czech Republic (Česká republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (República Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (‫مصر‬‎)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (Føroyar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358",0],["France","fr","33"],["French Guiana (Guyane française)","gf","594"],["French Polynesia (Polynésie française)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (საქართველო)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Ελλάδα)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guernsey","gg","44",1],["Guinea (Guinée)","gn","224"],["Guinea-Bissau (Guiné Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (香港)","hk","852"],["Hungary (Magyarország)","hu","36"],["Iceland (Ísland)","is","354"],["India (भारत)","in","91"],["Indonesia","id","62"],["Iran (‫ایران‬‎)","ir","98"],["Iraq (‫العراق‬‎)","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2],["Israel (‫ישראל‬‎)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1876"],["Japan (日本)","jp","81"],["Jersey","je","44",3],["Jordan (‫الأردن‬‎)","jo","962"],["Kazakhstan (Казахстан)","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kosovo","xk","383"],["Kuwait (‫الكويت‬‎)","kw","965"],["Kyrgyzstan (Кыргызстан)","kg","996"],["Laos (ລາວ)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (‫لبنان‬‎)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (‫ليبيا‬‎)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (澳門)","mo","853"],["Macedonia (FYROM) (Македонија)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (‫موريتانيا‬‎)","mr","222"],["Mauritius (Moris)","mu","230"],["Mayotte","yt","262",1],["Mexico (México)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (Монгол)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (‫المغرب‬‎)","ma","212",0],["Mozambique (Moçambique)","mz","258"],["Myanmar (Burma) (မြန်မာ)","mm","95"],["Namibia (Namibië)","na","264"],["Nauru","nr","674"],["Nepal (नेपाल)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-Calédonie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (조선 민주주의 인민 공화국)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47",0],["Oman (‫عُمان‬‎)","om","968"],["Pakistan (‫پاکستان‬‎)","pk","92"],["Palau","pw","680"],["Palestine (‫فلسطين‬‎)","ps","970"],["Panama (Panamá)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Perú)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (‫قطر‬‎)","qa","974"],["Réunion (La Réunion)","re","262",0],["Romania (România)","ro","40"],["Russia (Россия)","ru","7",0],["Rwanda","rw","250"],["Saint Barthélemy (Saint-Barthélemy)","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie française))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé and Príncipe (São Tomé e Príncipe)","st","239"],["Saudi Arabia (‫المملكة العربية السعودية‬‎)","sa","966"],["Senegal (Sénégal)","sn","221"],["Serbia (Србија)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (대한민국)","kr","82"],["South Sudan (‫جنوب السودان‬‎)","ss","211"],["Spain (España)","es","34"],["Sri Lanka (ශ්‍රී ලංකාව)","lk","94"],["Sudan (‫السودان‬‎)","sd","249"],["Suriname","sr","597"],["Svalbard and Jan Mayen","sj","47",1],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (‫سوريا‬‎)","sy","963"],["Taiwan (台灣)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (ไทย)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (‫تونس‬‎)","tn","216"],["Turkey (Türkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (Україна)","ua","380"],["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (Oʻzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Città del Vaticano)","va","39",1],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna","wf","681"],["Western Sahara (‫الصحراء الغربية‬‎)","eh","212",1],["Yemen (‫اليمن‬‎)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["Åland Islands","ax","358",1]],l=0;l<k.length;l++){var m=k[l];k[l]={name:m[0],iso2:m[1],dialCode:m[2],priority:m[3]||0,areaCodes:m[4]||null}}});

/**
 * Created by jin on 2017/11/30 0030.
 */

 //国家选择
$("#phone,#loginPhone,#resetPhone").intlTelInput({
    autoHideDialCode: true,
    initialCountry: "cn",
    //preferredCountries: ['cn','us','au','ca','jp','hk','gb','mo','ru']
    preferredCountries: ['cn','kr','jp','us','gb','hk','mo','ru']
});

//语言选择
function translateW(str1,str2){
    return location.href.indexOf('cn.html')!=-1?str1:str2;
}

var timeid=setTimeout('window.s&&window.s.next()',1500);
$('#login-entry,#phone-login-entry,.btn.btn-register').on('click',function(e){
    $('.collapse').collapse('hide');
    $(".reset-success").hide();
    $('#loginForm').show().siblings('form').hide();
    $('#loginBtn').addClass('active').show().siblings('span').removeClass('active').siblings('#resetTitleSpan').hide();
    $('#navSignUp').removeClass('selected');
    $('#navLogin').addClass('selected');
    $('.login-sign-pad').css('display','block');
    $('.login-sign-mask').css('display','block');
    if(window.s&&(window.s.current==1&&flag)){

        window.s.next();
    }else {
        clearTimeout(timeid);
    }
    $('html,body').css({
        "height":"100%","width": "100%","overflow":"hidden"
    });
})
$('.login-sign-mask .shut').on('click',function(){
    $('.login-sign-pad').css('display','none');
    $('html,body').css({'height':'auto','overflow':'auto'});
    $('.login-sign-mask').css('display','none');
    window.s&&window.s.next();
    $('.login-sign-mask input:not([type=button])').val('');
    $('.form-main-title span').html('Welcome back');
    $('.error-info').hide();
})
function loginUserJudge(){
    if(CookieUtil.getCookie('loginName')&&CookieUtil.getCookie('token')){
        $("#error_modal").modal('toggle');
        setTimeout(function(){
            location.href = 'index.html';
        },1500);
    }
}
var $navSignUp = $("#navSignUp");
var $navLogin = $("#navLogin");
var $loginBtn = $("#loginBtn");
var $signUpBtn = $("#signUpBtn,#signUpBtn1");
var $loginForm = $("#loginForm");
var $signUpForm = $("#signUpForm");
var $signup = $(".signup-btn");

var action = queryParams('action');
if(action == 'signup'){
    signUp();
}

//注册
var $phone = $("#phone");
var $password = $("#password");
var $confirmPass = $("#confirmPass");
var $getCodeBtn = $("#get-register-code");
var $phoneErr = $("#phoneErr");
var $passwordErr = $("#passwordErr");
var $confirmPassErr = $("#confirmPassErr");
var $register = $("#register");
var $codeErr = $("#codeErr");
var $policies = $("#policies");
var $emailErr=$('#emailErr')
var codeLength = 4;

//登录
var $loginPhone = $("#loginPhone");
var $loginPass = $("#loginPass");
var $login = $("#login");
var $loginPhoneErr = $("#loginPhoneErr");
var $loginErr = $("#loginErr");

//登录信息判断
function loginPhoneJudeg(){
    if($loginPhone.val()=="") {
        $loginPhoneErr.show();
        return false;
    }
    else {
        $loginPhoneErr.hide();
        return true;
    }
}
//登录密码判断
function loginPassJudge(){
    if($loginPass.val().match(/[\u4e00-\u9fa5]/)){
        $loginErr.html(location.href.indexOf('cn.html')!==-1?'密码不能包含中文！':'Password can not contain Chinese!').show();
        return false;
    } else if($loginPass.val().length < 6){
        $loginErr.html(location.href.indexOf('cn.html')!==-1?'密码不能少于5位！':'Password length can not be less than 5 digits!').show();
        return false;
    } else {
        $loginErr.hide();
        return true;
    }
}
// 验证码判断
function codeJudge($elem){
    if($elem.val()==""||!$elem.val().match(/^\d{4}$/)){
        $elem.siblings('.error-info').html(location.href.indexOf('cn.html')!==-1?'验证码不正确！':'Verifcation code format is incorrect!').show();
        return false;
    }else{
        $elem.siblings('.error-info').hide();
        return true;
    }
}
//手机号码判断
function phoneJudge($elem){
    // if($elem.val()==""||$elem.val().length != 11||!$elem.val().match(/^-?[1-9]\d*$/)) {
    //     $elem.parent().siblings('.error-info').html(translateW('手机号码格式不正确！','The phone formate is incorrect!')).show();
    //     $elem.siblings('.error-info').show();
    //     return true;
    // }
    // else {
    //     $elem.parent().siblings('.error-info').hide();
    //     $elem.siblings('.error-info').hide();
    //     return true;
    // }
    return true;
}

//注册时的密码以及找回密码判断
function passwordJudge($elem){
    if($elem.val()==""||$elem.val().length < 6) {
        $elem.siblings('.error-info').html(location.href.indexOf('cn.html')!==-1?'密码至少五位数！':'password must be longer than 5 digits!').show();
        return false;
    }
    else if($elem.val().match(/[\u4e00-\u9fa5]/)) {
        $elem.siblings('.error-info').html(location.href.indexOf('cn.html')!==-1?'密码不能包含汉字！':'password is forbidden to include Chinese!').show();
        return false;
    }
    else {
        $elem.siblings('.error-info').hide();
        return true;
    }
}
// 邮箱验证
function mailJudge(){
    return true;
    //if(!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test($('#email').val()))){
    //    $("#emailErr").html(translateW('邮箱格式不正确！','Please enter correct email address!')).show();
    //    return false;
    //}else{
    //    return true;
    //}
}
//注册时判断两个密码是否合法
function confirmPassJudge(){
    if($confirmPass.val()==""||$confirmPass.val()!=$password.val()) {
        $confirmPassErr.html(location.href.indexOf('cn.html')!==-1?'密码不一致！':'The password is inconsistent twice!').show();
        return false;
    }
    else {
        $confirmPassErr.hide();
        return true;
    }
}
function resetConfirmPassJudge(){
    var $resetConfirmPass = $("#resetConfirmPass");
    var $resetPassword = $("#resetPassword");
    if($resetConfirmPass.val() == ""||$resetPassword.val() != $resetConfirmPass.val()) {
        $("#resetConfirmPassErr").html(location.href.indexOf('cn.html')!==-1?'密码不一致！':'The password is inconsistent twice!').show();
        return false;
    }
    else {
        $("#resetConfirmPassErr").hide();
        return true;
    }
}
// 注册3阶段校验
$('#password,#confirmPass').on('keyup input change blur',function(){
    $('#passwordErr,#confirmPassErr').hide();
    if(passwordJudge($password)&&confirmPassJudge()){
        $register.removeAttr('disabled');
    }else {
        $register.attr('disabled','disabled');
    }
})

// 验证码输入判断
// $code.keyup(function(){
//     this.value=this.value.replace(/\D/g,'');
//     if($code.val().length>4){
//         $code.val($code.val().slice(0));
//     }else if($code.val().length==4){
//         $('#btn-next').removeAttr('disabled');
//     }else {
//          $('#btn-next').attr('disabled','disabled');
//     }
// })
$loginPhone.keyup(function(){
    this.value=this.value.replace(/\D/g,'');
    if($('#loginPhone').val().length>11){
        $('#loginPhone').val($('#loginPhone').val().slice(0,11));
    }
})
$("#resetPhone").keyup(function(){
    this.value=this.value.replace(/\D/g,'');
})
$('#resetCode').keyup(function(){
    this.value=this.value.replace(/\D/g,'');
    this.value=this.value.slice(0, 4);
})

// 登陆表单逻辑（加）
$('#loginPhone,#loginPass').on('keyup blur focus',function(){
    if($.trim($('#loginPhone').val()).length!=0&&$('#loginPass').val().length>=6){
        $('#login').removeAttr('disabled');
    }else {
        $('#login').attr('disabled','disabled');
    }
})

//注册以及找回密码时的号码判断
$phone.blur(function(){
    phoneJudge($phone);
});
$phone.focus(function(){
    $phoneErr.hide();
})
$("#resetPhone").blur(function(){
    phoneJudge($(this));
}).focus(function(){
    $(this).siblings('.error-info').hide();
})


//注册以及找回密码时的密码判断
$password.blur(function(){
    passwordJudge($password);
    confirmPassJudge();
});
$password.focus(function(){
    $passwordErr.hide();
})
$("#resetPassword").blur(function(){
    passwordJudge($(this));
    confirmPassJudge();
}).focus(function(){
    $(this).siblings('.error-info').hide();
})

// 注册以及找回密码时确认密码
$confirmPass.get(0).oninput = function(){
    confirmPassJudge();
}
$confirmPass.focus(function(){
    $confirmPassErr.hide();
})
$confirmPass.blur(function(){
    confirmPassJudge();
})
$("#resetConfirmPass").focus(function(){
    $(this).siblings('.error-info').hide();
}).get(0).oninput = function(){
    resetConfirmPassJudge();
}
$("#resetConfirmPass").blur(function(){
    resetConfirmPassJudge();
})


function fetCountry(index){
    //国家区号
    var $selected_flag = $(".selected-flag").eq(index);
    var countryIndex = $selected_flag.attr('title').indexOf('+');
    var country = $selected_flag.attr('title').slice(countryIndex + 1);
    return country;
}

//登录
$("#loginForm").submit(function(event){
    event = event||window.event;
    event.preventDefault();
    if(loginPhoneJudeg()&&loginPassJudge()){
        $("#login").html(location.href.indexOf('cn.html')!==-1?'加载中...':'loading...').attr('disabled','disabled');
        var data = '{"phoneNumber":"'+'+'+ fetCountry(0) + $loginPhone.val() + '","password":' + '"' + new String(md5($loginPass.val())).toString() + '"' + '}';
        $.ajax({
            url: CONFIG.USERURL + 'userAction/loginCommit.Action',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            //headers: {'Authorization': 'token'},
            data:{
                "parms": data
            },
            dataType:'json',
            success: function(data){
                if(data.message == "OK"){
                    var result = JSON.parse(data.result);
                    var token_type = result.Tocken.p2pdata.token_type;
                    var token = result.Tocken.p2pdata.access_token;
                    if(!window.localStorage){
                        CookieUtil.setCookie("loginName",encryptByDES(result.Data.loginName),20);
                        CookieUtil.setCookie("nickName",encryptByDES(result.Data.nickname),20);
                        CookieUtil.setCookie("phoneNumber",encryptByDES(result.Data.phoneNumber),20);
                        CookieUtil.setCookie("token",encryptByDES(token),20);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type),20);
                        CookieUtil.setCookie("member_id",encryptByDES(result.Data.member_id.toString()),20);
                        CookieUtil.setCookie("optional",JSON.stringify(result.Optional));
                        CookieUtil.setCookie("balance",JSON.stringify(result.Date.balance));
                    } else{
                        localStorage.setItem('random',getRamNumber());
                        console.log(result.Data);
                        console.log(result);
                        CookieUtil.setCookie("loginName",encryptByDES(result.Data.loginName,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("token",encryptByDES(token,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("member_id",encryptByDES(result.Data.member_id.toString(),localStorage.getItem('random')),20);
                        CookieUtil.setCookie("optional",JSON.stringify(result.Optional));
                        CookieUtil.setCookie("nickName",encryptByDES(result.Data.nickname,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("phoneNumber",encryptByDES(result.Data.phoneNumber,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("balance",JSON.stringify(result.Date.balance));
                    }
                    if(location.href.indexOf('cn.html')!=-1)
                    {
                        if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
                            browser.versions.iPhone || browser.versions.iPad||$(window).width()<=768){
                            location.href='option.html';
                        }else {
                            location.href='option.html';
                        }

                    }else {
                        if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
                            browser.versions.iPhone || browser.versions.iPad||$(window).width()<=768){
                            location.href='option.html';
                        }else {
                            location.href='option.html';
                        }
                    }
                } else if(data.messageContent == "00004"||data.messageContent == "00012"){
                    $loginErr.html(location.href.indexOf('cn.html')!==-1?'手机号码未注册！':'The phone number is not registered!').show();
                    $("#login").html(translateW('登录','login')).removeAttr('disabled');
                    return false;
                } else if(data.messageContent == "000013"){
                    $loginErr.html(location.href.indexOf('cn.html')!==-1?'账户被锁定，请联系管理员！':'Your account has been locked, you can not log in, please contact your system administrator!').show();
                    $("#login").html(translateW('登录','login')).removeAttr('disabled');
                    return false;
                } else if(data.messageContent == "00014"){
                    $loginErr.html(location.href.indexOf('cn.html')!==-1?'密码输入次数超过五次，请找回密码！':'Enter incorrect password more than five times, please retrieve the password!').show();
                    $("#login").html(translateW('登录','login')).removeAttr('disabled');
                    return false;
                } else if(JSON.parse(data.messageContent).ERROR_00015=="00015"){
                    $loginErr.html((location.href.indexOf('cn.html')!==-1?'密码不正确，你还有':'The password is incorrect, you still have ') + JSON.parse(data.messageContent).hasErrorTimes + (location.href.indexOf('cn.html')!==-1?'次机会。如果你忘了密码，请重置它。':' chances. If you forgot your password, please retrieve it.')).show();
                    $("#login").html(translateW('登录','login')).removeAttr('disabled');
                    return false;
                } else {
                    //console.log(JSON.parse(data.messageContent));
                    $loginErr.html(location.href.indexOf('cn.html')!==-1?'登录失败，请重试！':'login failed,please try again!').show();
                    $("#login").html(translateW('登录','login')).removeAttr('disabled');
                }
            },
            error: function(err){
                console.log(err);
                $("#login").html(translateW('登录','login')).removeAttr('disabled');
                $loginErr.html(location.href.indexOf('cn.html')!==-1?'登录失败，请重试！':'login failed,please try again!').show();
            }
        })
    }
})
var timer;
//注册第一阶段获取验证码
function getCode(){
    $phoneErr.hide();
    if(phoneJudge($phone)){
        $getCodeBtn.attr('disabled','disabled');

        var data = '{"phoneNumber":"'+'+'+ fetCountry(1) + $phone.val() + '"}';
        $.ajax({
            url: CONFIG.USERURL + 'userAction/getVerifyCode.Action',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data:{
                "parms": data
            },
            success: function(data){
                if(data.message=='OK'){
                    $('.login-signup>form,.login-signup>div').hide();
                    $('.login-signup>form.signup-form-2').show()
                    return true;
                } else if(data.messageContent == "00007"){
                    $phoneErr.html(location.href.indexOf('cn.html')!==-1?'一分钟内只能发送一次验证码！':'Only 1 Verification code can be sent in 1 minute!').show();
                    $getCodeBtn.removeAttr('disabled')
                } else if(data.messageContent == "00017"){
                    $phoneErr.html(location.href.indexOf('cn.html')!==-1?'此号码已被注册！':'The current phone number has been registered!').show();
                } else if(data.messageContent == "00020") {
                    $phoneErr.html('The verification code has expired').show();
                } else{
                    $phoneErr.html(translateW('失败，请重试！','Failure,please retry!')).show();
                }
                clearInterval(timer);
                $getCodeBtn.val(translateW('下一步','Next')).removeAttr('disabled')
            },
            error: function(err){
                console.log(err);
                clearInterval(timer);
                $getCodeBtn.val(location.href.indexOf('cn.html')!==-1?'发送':'Send').removeAttr('disabled')
                $phoneErr.html(location.href.indexOf('cn.html')!==-1?'失败，请重试':'Failed, please try again later!').show();
            }
        })
    }else{
        return false;
    }
}

//找回密码时获取验证码
var resetTimer;
function getResetCode(){
    // debugger;
    var $resetGetCodeBtn = $("#resetGetCodeBtn");
    $resetGetCodeBtn.attr('disabled','disabled');
    if(phoneJudge($("#resetPhone"))){
        var time = 120;

        var data = '{"phoneNumber":"'+'+'+ fetCountry(2) + $("#resetPhone").val() + '"}';
        //data = JSON.stringify(data);
        $.ajax({
            url: CONFIG.USERURL + 'userAction/modifyPasswordVerifyCode.Action',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data:{
                "parms": data
            },
            success: function(data){
                $('.err-info').hide();
                if(data.message == "OK"){
                    resetTimer = setInterval(function(){
                        if(time != 0) {
                            time--;
                            $resetGetCodeBtn.val(time + 's');
                        }else{
                            $resetGetCodeBtn.val(location.href.indexOf('cn.html')!==-1?'发送':'Send').removeAttr('disabled').click(getResetCode);
                            clearInterval(resetTimer);
                        }
                    },1000);
                    // $resetGetCodeBtn.unbind('click').val(time + 's').attr('disabled','disabled');
                    $("#resetCodeErr").hide();
                    return true;
                }else if(data.messageContent == "000012"){
                    $("#resetPhoneErr").html(location.href.indexOf('cn.html')!==-1?'此号码已注册！':'This phone number is not registered yet!').show();
                }
                else if(data.messageContent == "00007"){
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'一分钟只能发送一次验证码！':'Only 1 Verification code can be sent in 1 minute!').show();
                } else if(data.messageContent == "00017"){
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'手机号码已被注册！':'The current phone number has been registered!').show();
                } else if(data.messageContent == "00020") {
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'验证码已过期！':'The Verification code has expired!').show();
                } else{
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'失败，请重试！':'Failed, please try again later!').show();
                }
                clearInterval(resetTimer);
                $resetGetCodeBtn.val(location.href.indexOf('cn.html')!==-1?'发送':'Send').removeAttr('disabled').click(getResetCode);
            },
            error: function(err){
                console.log(err);
                clearInterval(resetTimer);
                $resetGetCodeBtn.val(location.href.indexOf('cn.html')!==-1?'发送':'Send').removeAttr('disabled').click(getResetCode);
                $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'失败，请重试！':'Failed, please try again later!').show();
            }
        })
    }else{
        $resetGetCodeBtn.removeAttr('disabled');
        return false;
    }
}

//获取注册验证码
$getCodeBtn.click(getCode);

//获取找回密码验证码
$("#resetGetCodeBtn").click(getResetCode);

$("#signUpForm").submit(function(event){
    event.preventDefault();
    // if(phoneJudge($phone)){

    $('#get-register-code').trigger('click');
    // }
});
$('.signup-form-3').submit(function(e){
    e.preventDefault();
    $register.trigger('click');
})
$('.signup-form-2').submit(function(e){
    e.preventDefault();
    $('#btn-next').trigger('click');
})
$("#resetUpForm").submit(function(event){
    event.preventDefault();
    resetPass();
})


//注册第三阶段
$('#register').on('click',register);
function register() {
    // if(timer) {
    //     clearInterval(timer);
    //     $getCodeBtn.val(location.href.indexOf('cn.html')!==-1?'发送':'Send').removeAttr('disabled').click(getCode)
    // }
    if(passwordJudge($password)&&confirmPassJudge()&&mailJudge()){
        $register.html('loading …').attr('disabled','disabled');
        var data = '{"phoneNumber":"'+'+'+ fetCountry(1) + $phone.val() + '","password":' + '"' + new String(md5($password.val())).toString() + '"' + ',"verifyCode":' + getVCode() +'"}';
        $.ajax({
            url:  CONFIG.USERURL + 'userAction/register.Action',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            data: {
                "parms": data
            },
            success: function(data){
                if(data.message == "OK"){
                    var result = JSON.parse(data.result);
                    var token_type = result.Tocken.p2pdata.token_type;
                    var token = result.Tocken.p2pdata.access_token;
                    if(!window.localStorage){
                        CookieUtil.setCookie("loginName",encryptByDES(result.Data.loginName),20);
                        CookieUtil.setCookie("nickName",encryptByDES(result.Data.nickname),20);
                        CookieUtil.setCookie("phoneNumber",encryptByDES(result.Data.phoneNumber),20);
                        CookieUtil.setCookie("token",encryptByDES(token),20);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type),20);
                        CookieUtil.setCookie("member_id",encryptByDES(result.Data.memember_id.toString()),20);
                        CookieUtil.setCookie("btnAddress",encryptByDES(result.Data.btnaddress.toString()),20);
                        CookieUtil.setCookie("emailAddress",encryptByDES(result.Data.emailAddress.toString()),20);
                    } else{
                        localStorage.setItem('random',getRamNumber());
                        CookieUtil.setCookie("loginName",encryptByDES(result.Data.loginName,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("phoneNumber",encryptByDES(result.Data.phoneNumber,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("token",encryptByDES(token,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("nickName",encryptByDES(result.Data.nickname,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type,localStorage.getItem('random')),20);
                        CookieUtil.setCookie("member_id",encryptByDES(result.Data.member_id.toString(),localStorage.getItem('random')),20);
                        CookieUtil.setCookie("btnAddress",encryptByDES(result.Data.btnaddress.toString(),localStorage.getItem('random')),20);
                        CookieUtil.setCookie("emailAddress",encryptByDES(result.Data.emailAddress.toString(),localStorage.getItem('random')),20);
                    }
                    location.href=location.origin+location.pathname;
                } else if(data.messageContent == "00019"){
                    $emailErr.html(location.href.indexOf('cn.html')!==-1?'验证码不正确，请重试！':'Verification code is incorrect, please try again!').show();
                } else if(data.messageContent == "00020"){
                    $emailErr.html(location.href.indexOf('cn.html')!==-1?'验证码过期，请重试！':'The Verification code has expired, please try again!').show();
                } else{
                    $emailErr.html(location.href.indexOf('cn.html')!==-1?'错误，请重试！':'Error, please try again!').show();
                }
                $register.html('Done').removeAttr('disabled');
                return false;
            },
            error: function(err){
                console.log(err);
                $emailErr.html(location.href.indexOf('cn.html')!==-1?'错误，请重试！':'Error, please try again!').show();
            }
        })
        //$register.html('loading …').attr('disabled','disabled');
    }
}

//找回密码
function resetPass() {
    if(resetTimer) {
        clearInterval(resetTimer);
        $("#resetGetCodeBtn").val(location.href.indexOf('cn.html')!==-1?'发送':'Send').removeAttr('disabled').click(getResetCode);
    }
    if(phoneJudge($("#resetPhone"))&&passwordJudge($("#resetPassword"))&&resetConfirmPassJudge()&&codeJudge($("#resetCode"))){
        $("#reset").html(translateW('加载中...','loading …')).attr('disabled','disabled');
        var data = '{"phoneNumber":"'+'+'+ fetCountry(2) + $("#resetPhone").val() + '","password":' + '"' + new String(md5($("#resetPassword").val())).toString() + '"' + ',"verifyCode":' + $("#resetCode").val() + '}';
        $.ajax({
            url:  CONFIG.USERURL + 'userAction/commitNewPassword.Action',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            data: {
                "parms": data
            },
            success: function(data){
                if(data.message == "OK"){
                    $("#resetUpForm,#resetTitleSpan").hide();
                    $(".reset-success").show();
                    setTimeout(function(){
                        location.href=location.href;
                    },2000)
                } else if(data.messageContent == "00005"){
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'验证码不正确，请重试！':'Verification code is incorrect, please try again!').show();
                } else if(data.messageContent == "00008"){
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'验证码无效，请重试！':'Verification code is invalid, please try again!').show();
                } else if(data.messageContent == "00012"){
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'手机号码未注册！':'This phone number is not registered yet!').show();
                } else if(data.messageContent == "00019"){
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'验证码不正确，请重试！':'Incorrect Verification code, please try again!').show();
                } else if(data.messageContent == "00020"){
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'验证码已过期！':'The Verification code has expired, please try again!').show();
                } else{
                    $("#resetCodeErr").html(location.href.indexOf('cn.html')!==-1?'错误，请重试！':'Error, please try again!').show();
                }
                $("#reset").html(translateW('完成','Done')).removeAttr('disabled');
                return false;
            },
            error: function(err){
                console.log(err);
                $("#resetCodeErr").html(translateW('错误，请重试！','Error, please try again!')).show();
            }
        })
    }
}
// 注册阶段2逻辑
// function verifyJudge(){
//     $codeErr.hide();
//     if(/^\d{4}$/.test(getVCode())){
//         $codeErr.html(location.href.indexOf('cn.html')!==-1?'验证码不正确，请重试':'Verification code is incorrect, please try again').show();
//         return false
//     }else {
//         return true
//     }

// }
// 注册第二阶段逻辑
$('#btn-next').on('click',function(){

    var data = '{"phoneNumber":"'+'+'+ fetCountry(1) + $("#phone").val() +'","verifyCode":' + getVCode() + '}';
    $.ajax({
        url:  CONFIG.USERURL + 'userAction/validateSMSValid.Action',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        data: {
            "parms": data
        },
        success: function(data){
            if(data.message == "OK"){
                $('.login-signup>form,.login-signup>div').hide();
                $('.login-signup>form.signup-form-3').show()

            } else if(data.messageContent == "00005"){
                $codeErr.html(location.href.indexOf('cn.html')!==-1?'验证码不正确，请重试！':'Verification code is incorrect, please try again!').show();
            } else if(data.messageContent == "00008"){
                $codeErr.html(location.href.indexOf('cn.html')!==-1?'验证码无效，请重试！':'Verification code is invalid, please try again!').show();
            }  else if(data.messageContent == "00019"){
                $codeErr.html(location.href.indexOf('cn.html')!==-1?'验证码不正确，请重试！':'Incorrect Verification code, please try again!').show();
            } else if(data.messageContent == "00020"){
                $codeErr.html(location.href.indexOf('cn.html')!==-1?'验证码已过期！':'The Verification code has expired, please try again!').show();
            } else{
                $codeErr.html(location.href.indexOf('cn.html')!==-1?'错误，请重试！':'Error, please try again!').show();
            }
            $("#resetCodeErr").html(translateW('下一步','Next')).removeAttr('disabled');
            return false;
        },
        error: function(err){
            console.log(err);
            $codeErr.html('Error, please try again!').show();
        }
    })

})

$('#phone').on('keyup focus',function(){
    if($.trim($phone.val())!=''){
        $getCodeBtn.removeAttr('disabled');
    }else {
        $getCodeBtn.attr('disabled','disabled');
    }
})
$('#resetPhone,#resetPassword,#resetCode,#resetConfirmPass').on('keyup focus',function(){
    if($.trim($('#resetPhone').val()).length!=0&&$('#resetPassword').val().length>=6&&$('#resetCode').val().length==4&&$('#resetConfirmPass').val()==$('#resetPassword').val()){
        $('#reset').removeAttr('disabled');
    }else {
        $('#reset').attr('disabled','disabled');
    }
})
// $('#code-1,#code-2,#code-3,#code-4').on('click',function(){
//     $('.mask-input')
// })

$("#password,#confirmPass,#resetPassword,#resetConfirmPass").focus(function(){
    $(this).siblings('.error-info').hide();
})

//set cookie

function getRamNumber(){
    var result='';
    for(var i=0;i<16;i++){
        result+=Math.floor(Math.random()*16).toString(16);//获取0-15并通过toString转16进制
    }
//默认字母小写，手动转大写
    return result.toUpperCase();//另toLowerCase()转小写
}


function login(){
    $(".reset-success").hide();
    $loginForm.show().siblings('form').hide();
    $('.error-info').hide();
    $('.login-sign-mask input[type=text],.login-sign-mask input[type=password]').val('');
    $('.form-container .form-main-title span').html(location.href.indexOf('cn.html')!==-1?'欢迎回来':'Welcome back')
}
function signUp(){
    $(".reset-success").hide();
    $('.signup-form-1').show().siblings('form').hide();
    $('.error-info').hide();
    $('.login-sign-mask input[type=password],.login-sign-mask input[type=text]').val('');
    $('.login-sign-mask .form-container .form-main-title span').html(location.href.indexOf('cn.html')!==-1?'创建你的账户':'Set up your account')
}

//点击忘记密码？
$("#forgetPass").click(function(){
    $("#resetUpForm").show().siblings('form').hide();
    $("#resetTitleSpan").show().addClass('active').siblings().hide();
    $navLogin.removeClass('selected');
    $navSignUp.removeClass('selected');
    $('.error-info').hide();
    $('.login-sign-mask input[type=text],.login-sign-mask input[type=password]').val('');
    $('.form-container>p').html(location.href.indexOf('cn.html')!==-1?"重置密码":"Change Password")
    $('.form-container .form-main-title span').html(location.href.indexOf('cn.html')!==-1?"重置密码":"Change Password")
})
$loginBtn.click(login);
$('#loginBtn1,#loginBtn2').on('click',login)
$signUpBtn.click(signUp);
$navLogin.click(login);
$navSignUp.click(signUp);

// 验证码插件
$(function(){
    // 取得整个验证码
    function getVCode(){
        return $('#code-1').html()+$('#code-2').html()+$('#code-3').html()+$('#code-4').html();
    }
    function translateKey(code){
        if(code<=57){
            return code-48;
        }else {
            return code-96;
        }
    }
    // 限制输入逻辑
    $(window).on('keypress keydown',function(e){
        var code = e.keyCode||e.which;
        if(code.which==8&&$('.signup-form-2').css('display')=='block'){
            return e.preventDefault();
        }
    })
    $(window).on('keyup',function(e){
        var code = e.keyCode||e.which;
        var currentCode = getVCode();
        if($('.signup-form-2').css('display')!='none'){
            if((code>=96&&code<=105)||(code>=48&&code<=57)){
                if(currentCode.length>=4){
                }else {
                    $('#code-'+(currentCode.length+1)).html(translateKey(e.which))
                }
            }else if(code==8){
                if(currentCode.length!=0){
                    $('#code-' + currentCode.length).html('');
                }
            }else if(code==108||code==13){
                $('#btn-next').trigger('click');
            }
        }
        if(getVCode().length==4){
            $('#btn-next').removeAttr('disabled');
        }else {
            $('#btn-next').attr('disabled','disabled');
        }
    })
    window.getVCode = getVCode;
})



/*md5*/
function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }
    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    function md5_WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}
