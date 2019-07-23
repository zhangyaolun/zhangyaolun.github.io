/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  return str.trim() != '';
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 去空*/
export function outReplace(str) {
  	if(str){
		if(str.replace){
			return str.replace(/\s+/g, "");
		}else{
			return str; 
		}
	}else{
		 return ''; 
	}
}

/*检查是否为空*/
export function checkNotEmpty(str) {
	str = outReplace(str);
    if (str != null && str.length > 0 && str!=''){
    	return true;
    }
    return false;
}


/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/*金钱价格*/
export const checkPrice = (value) => {
	let sNum = value.toString(); //先转换成字符串类型
    value = sNum.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符    
    value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的   
    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
    if(value.indexOf(".")< 0 && value !=""){ 
       value = parseFloat(value);  
    }
    return value;
};

/* 手机号(form提交验证)*/
export const checkPhone = (rule, value, callback) => {
	let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
	if(!value){
		callback();
	}else{
		if (value != '' && !mobile.test(value)){
	    	return callback(new Error('手机号码输入有误,可不填'));
	    }
	}
};

/* 商品数量(form提交验证   大于0)*/
export const checkCount = (rule, value, callback) => {
	let reg = /^\+?[1-9]\d*$/;
	if(!value){
		callback();
	}else{
		if (value != '' && !reg.test(value)){
	    	return callback(new Error('商品数量必须大于0,可不填'));
	    }
	}
};

