
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

function doPost(url,data,callback){
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
function setCookie(name,value){
	var Days = 1;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}