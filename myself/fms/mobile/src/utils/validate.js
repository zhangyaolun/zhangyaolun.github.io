export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

// 是否合法IP地址
export function validateIP(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的IP地址'));
        } else {
            callback();
        }
    }
}

// 是否手机号码或者固话
export function validatePhoneTwo(rule, value, callback) {
    const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
    
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的电话号码或者固话号码'));
        } else {
            callback();
        }
    }
}

// 是否固话
export function validateTelphone(rule, value, callback) {
    const reg = /0\d{2}-\d{7,8}/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'));
        } else {
            callback();
        }
    }
}

// 是否手机号码
export function validatePhone(rule, value, callback) {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    }
}

// 是否身份证号码
export function validateIdNo(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    }
}

// 是否邮箱
export function validateEMail(rule, value, callback) {
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱地址'));
        } else {
            callback();
        }
    }
}

// 合法uri
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

// 验证内容是否英文数字以及下划线
export function isPassword(rule, value, callback) {
    const reg = /^[_a-zA-Z0-9]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('密码仅由英文字母，数字以及下划线组成'));
        } else {
            callback();
        }
    }
}


// 验证小数
export function checkFloat(rule, value, callback) {
    if (value == 0)
        callback(new Error('请输入正确价格，仅支持一位小数'));
    const reg = /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,1}$)/;
    if (!reg.test(value)) {
        callback(new Error('请输入正确价格，仅支持一位小数'));
    } else {
        callback();
    }
}

// 验证是否整数
export function isInteger(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    if (!Number(value)) {
        callback(new Error('请输入正整数'));
    } else {
        const re = /^[0-9]*[1-9][0-9]*$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
            callback(new Error('请输入正整数'));
        } else {
            callback();
        }
    }
}


// textArea换行符转<br/>
export function encodeTextAreaString(str) {
    if (!str) return ''
    const reg = new RegExp("\n", "g");
    str = str.replace(reg, "<br/>");
    return str;
}

// <br/> 转 textArea换行符
export function decodeTextAreaString(str) {
    if (!str) return ''
    const reg = new RegExp("<br/>", "g")
    str = str.replace(reg, "\n")
    return str
}
