
(function() {
	Date.prototype.Format = function(fmt) {
	    var o = {
	        "M+" : this.getMonth()+1,                 
	        "d+" : this.getDate(),                   
	        "h+" : this.getHours(),                  
	        "m+" : this.getMinutes(),                 
	        "s+" : this.getSeconds(),                 
	        "q+" : Math.floor((this.getMonth()+3)/3), 
	        "S"  : this.getMilliseconds()             
	    };
	    if(/(y+)/.test(fmt))
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	    for(var k in o)
	        if(new RegExp("("+ k +")").test(fmt))
	    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	    return fmt;
	}
})();
function doAjax(url,data,callback){
    $.ajax({
        url : url,
        data :data,
        type : 'POST',
        dataType : 'json',
        async : false,
        success : succFun
    });
    function succFun(datas) {
        if(datas.httpCode==999){
			
        }
        if(datas.httpCode==500){
            alert(datas.message);
        }
        if(datas.httpCode==200){
            callback(datas);
        }if(datas.httpCode==201){
            setLoginState(false)
        }
    }
}
//检查密码码是否符合要求
function checkPassword(str) {
    var reg = /^.{6,12}$/;
    if (!reg.test(str)) {
        return false;
    }
    return true;
}

//检查是否为空
function checkNotEmpty(str) {
    if (str != null && str.length > 0&&str!='')
        return true;
    return false;
}

//检查是否为数字
function checkNumber(str) {
    var reg = /^\d*$/;
    if (!reg.test(str)) {
        alert("请输入数字");
        return false;
    }
    return true;
}
function getParameter(param)
{
    var query = decodeURI(window.location.search);//获取URL地址中？后的所有字符
    var iLen = param.length;//获取你的参数名称长度
    var iStart = query.indexOf(param);//获取你该参数名称的其实索引
    if (iStart == -1)//-1为没有该参数
        return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);//获取第二个参数的其实索引
    if (iEnd == -1)//只有一个参数
        return query.substring(iStart);//获取单个参数的参数值
    return query.substring(iStart, iEnd);//获取第二个参数的值
}
function setCookie(name,value)
{
var Days = 60;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}