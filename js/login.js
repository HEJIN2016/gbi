/**
 * Created by jin on 2017/11/30 0030.
 */
//判断是否已有用户登录
function loginUserJudge(){
    if(CookieUtil.getCookie('loginName')&&CookieUtil.getCookie('token')){
        $("#error_modal").modal('toggle');
        setTimeout(function(){
            location.href = 'index.html';
        },1500);
    }
}

function translateW(str1,str2){
    return location.href.indexOf('cn.html')!=-1?str1:str2;
}

//注册
var $phone = $("#phone");
var $password = $("#password");
var $confirmPass = $("#confirmPass");
var $getCodeBtn = $("#getCodeBtn");
var $code = $("#code");
var $phoneErr = $("#phoneErr");
var $passwordErr = $("#passwordErr");
var $confirmPassErr = $("#confirmPassErr");
var $register = $("#register");
var $codeErr = $("#codeErr");
var $policies = $("#policies");
var codeLength = 4;

//登录
var $loginPhone = $("#loginPhone");
var $loginPass = $("#loginPass");
var $login = $("#login");
var $loginPhoneErr = $("#loginPhoneErr");
var $loginErr = $("#loginErr");

//登录信息判断
function loginPhoneJudeg(){
    if($loginPhone.val()==""||$loginPhone.val().length != 11||!$loginPhone.val().match(/^-?[1-9]\d*$/)) {
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
        $loginErr.html('Password can not contain Chinese').show();
        return false;
    } else if($loginPass.val().length < 6){
        $loginErr.html('Password length can not be less than 5 digits').show();
        return false;
    } else {
        $loginErr.hide();
        return true;
    }
}

//手机号码判断
function phoneJudge($elem){
    console.log($elem.val().length);
    if($elem.val()==""||$elem.val().length != 11||!$elem.val().match(/^-?[1-9]\d*$/)) {
        $elem.parent('.intl-tel-input').siblings('.error-info').show();
        return false;
    }
    else {
        $elem.parent('.intl-tel-input').siblings('.error-info').hide();
        return true;
    }
}

//注册时的密码以及找回密码判断
function passwordJudge($elem){
    if($elem.val()==""||$elem.val().length < 6) {
        $elem.siblings('.error-info').html('password must be longer than 5 digits').show();
        return false;
    }
    else if($elem.val().match(/[\u4e00-\u9fa5]/)) {
        $elem.siblings('.error-info').html('password is forbidden to include Chinese').show();
        return false;
    }
    else {
        $elem.siblings('.error-info').hide();
        return true;
    }
}

//注册时判断两个密码是否合法
function confirmPassJudge(){
    if($confirmPass.val()==""||$confirmPass.val()!=$password.val()) {
        $confirmPassErr.html('The password is inconsistent twice').show();
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
        $("#resetConfirmPassErr").html('The password is inconsistent twice').show();
        return false;
    }
    else {
        $("#resetConfirmPassErr").hide();
        return true;
    }
}

//验证码判断
function codeJudge($elem){
    if($elem.val()==""||!$elem.val().match(/^\d{4}$/)){
        $elem.siblings('.error-info').html('Phone identifying code format is incorrect!').show();
        return false;
    }else{
        $elem.siblings('.error-info').hide();
        return true;
    }
}
//判断是否选择用户协议
function policiesJudge(){
    if($("#checkBox").get(0).checked){
        $policies.hide();
        return true;
    }else{
        $policies.show();
    }
}

//强制输入数字
$phone.keyup(function(){
    this.value=this.value.replace(/\D/g,'');
})
$code.keyup(function(){
    this.value=this.value.replace(/\D/g,'');
})
$loginPhone.keyup(function(){
    this.value=this.value.replace(/\D/g,'');
})
$("#resetPhone,#resetCode").keyup(function(){
    this.value=this.value.replace(/\D/g,'');
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
});
$password.focus(function(){
    $passwordErr.hide();
})
$("#resetPassword").blur(function(){
    passwordJudge($(this));
}).focus(function(){
    $(this).siblings('.error-info').hide();
})

//注册以及找回密码时确认密码
$confirmPass.get(0).oninput = function(){
    confirmPassJudge();
}
$confirmPass.focus(function(){
    $confirmPassErr.hide();
})
$("#resetConfirmPass").focus(function(){
    $(this).siblings('.error-info').hide();
}).get(0).oninput = function(){
    resetConfirmPassJudge();
}

function fetCountry(index){
    //国家区号
    var $selected_flag = $(".selected-flag").eq(index);
    var countryIndex = $selected_flag.attr('title').indexOf('+');
    var country = $selected_flag.attr('title').slice(countryIndex + 1);
    return country;
}

$("#loginPhone,#phone,#resetPhone").change(function(){
    phoneJudge($(this));
});

//登录
$("#loginForm").submit(function(event){
    var $loginLoading = $("#loginLoading");
    event = event||window.event;
    event.preventDefault();
    if(loginPhoneJudeg()&&loginPassJudge()){
        $("#login").html('loading').attr('disabled','disabled');
        $loginLoading.show();
        var data = '{"phoneNumber":'  + fetCountry(0) + $loginPhone.val() + ',"password":' + '"' + new String(md5($loginPass.val())).toString() + '"' + '}';
        $.ajax({
            url: CONFIG.USERURL + 'userAction/loginCommit.Action',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            //headers: {'Authorization': 'token'},
            data:{
                "parms": data
            },
            success: function(data){
                if(data.message == "OK"){
                    var result = JSON.parse(data.result);
                    var token_type = result.Tocken.p2pdata.token_type;
                    var token = result.Tocken.p2pdata.access_token;
                    if(!window.localStorage){
                        CookieUtil.setCookie("loginName",encryptByDES(result.Data.loginName),1);
                        CookieUtil.setCookie("token",encryptByDES(token),1);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type),1);
                        CookieUtil.setCookie("member_id",encryptByDES(result.Data.member_id.toString()),1);
                        CookieUtil.setCookie("optional",JSON.stringify(result.Optional),1);
                        CookieUtil.setCookie("balance",JSON.stringify(result.Data.balance),1);
                    } else{
                        localStorage.setItem('random',getRamNumber());
                        console.log(result.Data);
                        console.log(result);
                        CookieUtil.setCookie("loginName",encryptByDES(result.Data.loginName,localStorage.getItem('random')),1);
                        CookieUtil.setCookie("token",encryptByDES(token,localStorage.getItem('random')),1);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type,localStorage.getItem('random')),1);
                        CookieUtil.setCookie("member_id",encryptByDES(result.Data.member_id.toString(),localStorage.getItem('random')),1);
                        CookieUtil.setCookie("optional",JSON.stringify(result.Optional),1);
                        CookieUtil.setCookie("balance",JSON.stringify(result.Data.balance),1);
                    }
                    if(queryParams('from') == 'option') {
                        location.href = "option.html";
                    } else {
                        location.href = "option.html";
                    }
                } else if(data.messageContent == "00004"||data.messageContent == "00012"){
                    $loginErr.html('The phone number is not registered').show();
                    $("#login").html('login').removeAttr('disabled');
                    $loginLoading.hide();
                    return false;
                } else if(data.messageContent == "00013"){
                    $loginErr.html('Your account has been locked, you can not log in, please contact your system administrator').show();
                    $("#login").html('login').removeAttr('disabled');
                    $loginLoading.hide();
                    return false;
                } else if(data.messageContent == "00014"){
                    $loginErr.html('Enter incorrect password more than five times, please retrieve the password').show();
                    $("#login").html('login').removeAttr('disabled');
                    $loginLoading.hide();
                    return false;
                } else if(JSON.parse(data.messageContent).ERROR_00015=="00015"){
                    $loginErr.html('The password is incorrect, you still have ' + JSON.parse(data.messageContent).hasErrorTimes + ' chances. If you forgot your password, please retrieve it').show();
                    $("#login").html('login').removeAttr('disabled');
                    $loginLoading.hide();
                    return false;
                } else {
                    //console.log(JSON.parse(data.messageContent));
                    $loginErr.html('login failed,please try again!').show();
                    $loginLoading.hide();
                    $("#login").html('login').removeAttr('disabled');
                }
            },
            error: function(err){
                console.log(err);
                $("#login").html('login').removeAttr('disabled');
                $loginLoading.hide();
                $loginErr.html('login failed,please try again!').show();
            }
        })
    }
})
var timer;
//注册时获取验证码
function getCode(){
    if(phoneJudge($phone)&&passwordJudge($password)&&confirmPassJudge()){
        $getCodeBtn.attr('disabled','disabled').unbind('click');
        var time = 120;
        timer = setInterval(function(){
            if(time != 0) {
                time--;
                $getCodeBtn.val(time + 's effective');
            }else{
                $getCodeBtn.val('Get identifying code').removeAttr('disabled').click(getCode);
                clearInterval(timer);
            }
        },1000);
        var data = '{"phoneNumber":' + fetCountry(1) + $phone.val() + '}';
        //data = JSON.stringify(data);
        $.ajax({
            url: CONFIG.USERURL + 'userAction/getVerifyCode.Action',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data:{
                "parms": data
            },
            success: function(data){
                if(data.message == "OK"){
                    $getCodeBtn.val(time + 's effective');
                    $codeErr.hide();
                    return true;
                } else if(data.messageContent == "00007"){
                    $codeErr.html('Only 1 verification code can be sent in 1 minute').show();
                } else if(data.messageContent == "00017"){
                    $codeErr.html('The current phone number has been registered').show();
                } else if(data.messageContent == "00020") {
                    $codeErr.html('The verification code has expired').show();
                } else{
                    $codeErr.html('Failed, please try again later').show();
                }
                clearInterval(timer);
                $getCodeBtn.val('Get identifying code').removeAttr('disabled').click(getCode);
            },
            error: function(err){
                console.log(err);
                clearInterval(timer);
                $getCodeBtn.val('Get identifying code').removeAttr('disabled').click(getCode);
                $codeErr.html('Failed, please try again later!').show();
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
    if(phoneJudge($("#resetPhone"))&&passwordJudge($("#resetPhone"))&&resetConfirmPassJudge()){
        var time = 120;
        resetTimer = setInterval(function(){
            if(time != 0) {
                time--;
                $resetGetCodeBtn.val(time + 's effective');
            }else{
                $resetGetCodeBtn.val('Get identifying code').removeAttr('disabled').click(getResetCode);
                clearInterval(resetTimer);
            }
        },1000);
        var data = '{"phoneNumber":' + fetCountry(2) + $("#resetPhone").val() + '}';
        //data = JSON.stringify(data);
        $.ajax({
            url: CONFIG.USERURL + 'userAction/modifyPasswordVerifyCode.Action',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data:{
                "parms": data
            },
            success: function(data){
                if(data.message == "OK"){
                    $resetGetCodeBtn.unbind('click').val(time + 's effective').attr('disabled','disabled');
                    $("#resetCodeErr").hide();
                    return true;
                } else if(data.messageContent == "00007"){
                    $("#resetCodeErr").html('Only 1 verification code can be sent in 1 minute').show();
                } else if(data.messageContent == "00017"){
                    $("#resetCodeErr").html('The current phone number has been registered').show();
                } else if(data.messageContent == "00020") {
                    $("#resetCodeErr").html('The verification code has expired').show();
                } else{
                    $("#resetCodeErr").html('Failed, please try again later').show();
                }
                clearInterval(resetTimer);
                $resetGetCodeBtn.val('Get identifying code').removeAttr('disabled').click(getResetCode);
            },
            error: function(err){
                console.log(err);
                clearInterval(resetTimer);
                $resetGetCodeBtn.val('Get identifying code').removeAttr('disabled').click(getResetCode);
                $("#resetCodeErr").html('Failed, please try again later!').show();
            }
        })
    }else{
        return false;
    }
}

//获取注册验证码
$getCodeBtn.click(getCode);

//获取找回密码验证码
$("#resetGetCodeBtn").click(getResetCode);

$("#signUpForm").submit(function(event){
    event.preventDefault();
    register();
});
$("#resetUpForm").submit(function(event){
    event.preventDefault();
    resetPass();
})

//注册
function register() {
    if(timer) {
        clearInterval(timer);
        $getCodeBtn.val('Get identifying code').removeAttr('disabled').click(getCode);
    }
    if(phoneJudge($phone)&&passwordJudge($password)&&confirmPassJudge()&&codeJudge($code)&&policiesJudge()){
        $register.html('loading...').attr('disabled','disabled');
        var data = '{"phoneNumber":'  + fetCountry(1) + $phone.val() + ',"password":' + '"' + new String(md5($password.val())).toString() + '"' + ',"verifyCode":' + $code.val() + '}';
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
                        CookieUtil.setCookie("loginName",encryptByDES(result.data.loginName),1);
                        CookieUtil.setCookie("token",encryptByDES(token),1);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type),1);
                        CookieUtil.setCookie("member_id",encryptByDES(result.data.memember_id.toString()),1);
                        CookieUtil.setCookie("optional",encryptByDES(JSON.stringify({optional: []})),1);
                        CookieUtil.setCookie("balance",JSON.stringify(result.data.balance),1);
                    } else{
                        console.log(result);
                        result.Data = result.data;
                        localStorage.setItem('random',getRamNumber());
                       // result.data = JSON.parse(result.data);
                        console.log(result.data.member_id);
                        console.log(result.data.member_id.toString());
                        CookieUtil.setCookie("loginName",encryptByDES(result.data.loginName,localStorage.getItem('random')),1);
                        CookieUtil.setCookie("token",encryptByDES(token,localStorage.getItem('random')),1);
                        CookieUtil.setCookie("token_type",encryptByDES(token_type,localStorage.getItem('random')),1);
                        CookieUtil.setCookie("member_id",encryptByDES(result.data.member_id.toString(),localStorage.getItem('random')),1);
                        CookieUtil.setCookie("optional",encryptByDES(JSON.stringify({optional: []}),localStorage.getItem('random')),1);
                        CookieUtil.setCookie("balance",JSON.stringify(result.data.balance),1);
                    }
                    if(queryParams('from') == 'option') {
                        location.href = "option.html";
                    } else {
                        location.href = "option.html";
                    }
                } else if(data.messageContent == "00005"){
                    $codeErr.html('Verification code is incorrect, please try again').show();
                } else if(data.messageContent == "00008"){
                    $codeErr.html('Verification code is invalid, please try again').show();
                } else if(data.messageContent == "00012"){
                    $codeErr.html('This phone number is not registered yet').show();
                } else if(data.messageContent == "00019"){
                    $codeErr.html('Incorrect verification code, please try again').show();
                } else if(data.messageContent == "00020"){
                    $codeErr.html('The verification code has expired, please try again').show();
                } else{
                    $codeErr.html('Error, please try again').show();
                }
                $register.html('Register').removeAttr('disabled');
                return false;
            },
            error: function(err){
                console.log(err);
                $codeErr.html('Error, please try again!').show();
            }
        })
        //$register.html('loading …').attr('disabled','disabled');
    }
}

//找回密码
function resetPass() {
    if(resetTimer) {
        clearInterval(resetTimer);
        $("#resetGetCodeBtn").val('Get identifying code').removeAttr('disabled').click(getResetCode);
    }
    if(phoneJudge($("#resetPhone"))&&passwordJudge($("#resetPassword"))&&resetConfirmPassJudge()&&codeJudge($("#resetCode"))){
        $("#reset").html('loading...').attr('disabled','disabled');
        var data = '{"phoneNumber":'  + fetCountry(2) + $("#resetPhone").val() + ',"password":' + '"' + new String(md5($("#resetPassword").val())).toString() + '"' + ',"verifyCode":' + $("#resetCode").val() + '}';
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
                } else if(data.messageContent == "00005"){
                    $("#resetCodeErr").html('Verification code is incorrect, please try again').show();
                } else if(data.messageContent == "00008"){
                    $("#resetCodeErr").html('Verification code is invalid, please try again').show();
                } else if(data.messageContent == "00012"){
                    $("#resetCodeErr").html('This phone number is not registered yet').show();
                } else if(data.messageContent == "00019"){
                    $("#resetCodeErr").html('Incorrect verification code, please try again').show();
                } else if(data.messageContent == "00020"){
                    $("#resetCodeErr").html('The verification code has expired, please try again').show();
                } else{
                    $("#resetCodeErr").html('Error, please try again').show();
                }
                $("#resetCodeErr").html('Reset Password').removeAttr('disabled');
                return false;
            },
            error: function(err){
                console.log(err);
                $("#resetCodeErr").html('Error, please try again!').show();
            }
        })
        //$register.html('loading...').attr('disabled','disabled');
    }
}

$code.get(0).oninput = function(){
    if($code.val().length == 4){
        $register.removeAttr('disabled');
    }
}
$("#resetCode").get(0).oninput = function(){
    if($(this).val().length == 4){
        $("#reset").removeAttr('disabled');
    }
}

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

