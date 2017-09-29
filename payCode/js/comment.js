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