
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				result = read(cookie, value);
				break;
			}

			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
	
	
    // author: meizz
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function(fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds()          //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }
	$.fn.scrollUnique = function() {
	    return $(this).each(function() {
	        var eventType = 'mousewheel';
	        if (document.mozHidden !== undefined) {
	            eventType = 'DOMMouseScroll';
	        }
	        $(this).on(eventType, function(event) {
	            // 一些数据
	            var scrollTop = this.scrollTop,
	                scrollHeight = this.scrollHeight,
	                height = this.clientHeight;
	
	            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        
	
	            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
	                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
	                this.scrollTop = delta > 0? 0: scrollHeight;
	                // 向上滚 || 向下滚
	                event.preventDefault();
	            }        
	        });
	    });	
	};
	$.fn.extend({
	   insertContent : function(myValue, t) {
		   var $t = $(this)[0];
		   if (document.selection) { // ie
		    this.focus();
		    var sel = document.selection.createRange();
		    sel.text = myValue;
		    this.focus();
		    sel.moveStart('character', -l);
		    var wee = sel.text.length;
		    if (arguments.length == 2) {
		    var l = $t.value.length;
		    sel.moveEnd("character", wee + t);
		    t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart( "character", wee - t - myValue.length);
		    sel.select();
		    }
		   } else if ($t.selectionStart
		    || $t.selectionStart == '0') {
		    var startPos = $t.selectionStart;
		    var endPos = $t.selectionEnd;
		    var scrollTop = $t.scrollTop;
		    $t.value = $t.value.substring(0, startPos)
		     + myValue
		     + $t.value.substring(endPos,$t.value.length);
		    this.focus();
		    $t.selectionStart = startPos + myValue.length;
		    $t.selectionEnd = startPos + myValue.length;
		    $t.scrollTop = scrollTop;
		    if (arguments.length == 2) {
		    $t.setSelectionRange(startPos - t,
		     $t.selectionEnd + t);
		    this.focus();
		    }
		   } else {
		    this.value += myValue;
		    this.focus();
		   }
	   }
	})
}));
/*日期*/
function DateFormat(create_time){
	var date1 = new Date(create_time),
		date2 = new Date();
	var s1 = date1.getTime(),s2 = date2.getTime();
	var total = parseInt((s2 - s1)/1000/60/60);
	return total+"H";
}



//日期格式
function odateFormat(create_time){
	var date1 = new Date(create_time).Format("yyyy-MM-dd hh:mm:ss");
	return date1;
}





/*检查是否登录*/
function judgeLogin(){
	var suc = function(data){
		if(!data.result)window.location.href = '../login_login.html';
	}
	doPost('/isLogged','',suc);
}
/*退出登录*/
function outLogin(){
	$('.login_out').bind('click',function(){
		var suc = function(data){
			if(data.result){window.location.href = '../login_login.html';$.cookie("username",'')}
		}
		doPost('/logout','',suc);
	})
}

/*去掉所有空格*/
function outReplace(str){
	if(str){
		if(str.replace){
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}else{
			return str; 
		}
	}else{
		 return ''; 
	}
}

/*ajax*/
function doPost(url,data,callback){
	if($('body .main-container').find('#loadgif').length > 0){
		$('body .main-container ').find('#loadgif').remove();
	}
	if(!$('body').hasClass('sidebar-close')){
		$('body .main-container').append('<p id="loadgif" style="width:99%;margin-left:1%;margin-left: 200px;background:rgba(255,255,255,.4);height:100%;position:fixed;top:0;left:0;z-index:99999999999999;"><img alt="加载中..." src="img/loading.gif" style="position:absolute;top:50%;left:30%;width:30px;height:30px;z-index:99999999999999;"/><span style="position:absolute;top:50.5%;left:35%;width:200px;height:30px;font-size:18px;z-index:99999999999999;">数据加载中，请稍等</span></p>');
	}else{
		$('body .main-container').append('<p id="loadgif" style="width:99%;margin-left:1%;background:rgba(255,255,255,.4);height:100%;position:fixed;top:0;left:0;z-index:99999999999999;"><img alt="加载中..." src="img/loading.gif" style="position:absolute;top:50%;left:40%;width:30px;height:30px;z-index:99999999999999;"/><span style="position:absolute;top:50.5%;left:45%;width:200px;height:30px;font-size:18px;z-index:99999999999999;">数据加载中，请稍等</span></p>');
	}
	$("#loadgif").scrollUnique();
    $.ajax({
        url : url,
        data :data,
        type : 'POST',
        dataType : 'json',
        async : false,
        success : succFun
    });
    function succFun(datas) {
    	setTimeout(function(){
    		$('body .main-container').find('#loadgif').remove();
    	},300)
        if(datas.httpCode==999){

        }
        if(datas.httpCode==500){
            xcsoft.error(datas.msg,1500);
            if($('.main-content').find('.examineIndex').length > 0){
				$('.main-content').find('.examineIndex').remove();
			}
        }
        if(datas.httpCode==400){
            xcsoft.error(datas.msg,1500);
            if($('.main-content').find('.examineIndex').length > 0){
				$('.main-content').find('.examineIndex').remove();
			}
        }
        if(datas.httpCode==200){
            callback(datas);
        }
    }
}
/*获取url字段*/
function getParameter(param){
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
/*弹框提示*/
function xcsoftTitle(){
	xcsoft.tipsCss = {
		height: '44px',
		fontSize: '16px'
	};
	xcsoft.tipsHide=xcsoft.tipsShow=100;
}

/*检查是否为空*/
function checkNotEmpty(str) {
	str = outReplace(str);
    if (str != null && str.length > 0 && str!=''){
    	return true;
    }
    return false;
}

/*检查邮箱*/
function checkEmail(str) {
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
    if(!reg.test(str)){
　　　　 return false;
　　 }else{
　　　　return true;
　　 }
}

/*检查开始时间和结束时间差*/
function checkTime(star,end){
	var date1 = new Date(star),
		date2 = new Date(end);
	var s1 = date1.getTime(),s2 = date2.getTime();
	var total = parseInt((s2 - s1)/1000/60/60/24);
	if(total >= 31){
		return false;
	}else{
		return true;
	}
}

/*数据处理*/
function checkValue(val){
	if(!checkNotEmpty(val)){
		return '';
	}else{
		return val;
	}
}


/*金钱检测*/
//金额后比前大
function checkNotAB(A,B) {
	$("."+A).on('blur',function(){
		var Aval = $("."+A).val();
		if(Aval == '')return;
		if(!checkNotMoney(Aval)){$("."+A).val('');return;}
		if(parseFloat($("."+A).val()) >= parseFloat($("."+B).val())){xcsoftTitle();
    	xcsoft.error('最小金额输入有误，请查看。',1300);}
	})
	$("."+B).on('blur',function(){
		var Bval = $("."+B).val();
		if(Bval == '')return;
		if(!checkNotMoney(Bval)){$("."+B).val('');return;}
		if(parseFloat($("."+A).val()) >= parseFloat($("."+B).val())){xcsoftTitle();
    	xcsoft.error('最大金额输入有误，请查看。',1300);}
	})
}
function checkNotMoney(money) {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
 	if (reg.test(money)) {
      return true;
	}else{
		xcsoftTitle();
    	xcsoft.error('金额格式输入有误，请查看。',1300);
      return false;
 	};
}

/*手机号*/
function checkNotPhone(value){
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)) && !(/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value))){
       return "不是完整的11位手机号或者固定电话，固定电话如：区号+号码";
    }else{
       return true;
    };
}



/*提示*/
function titleXcsoft(result){
	xcsoftTitle();
	if(result){
		xcsoft.success('修改成功',1000);
	}else{
		xcsoft.error('修改失败',1000);
	}
}
var runTooltips = function() {
	if($(".tooltips").length) {
		$('.tooltips').tooltip();
	}
};

function datetimepickerData(){
	$.fn.datetimepicker.dates['zh-CN'] = {  
            days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
            daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
            daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
            months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
            monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
            meridiem:    ["上午", "下午"],  
            //suffix:      ["st", "nd", "rd", "th"],  
            today:       "今天"  
    };
}

var datetimePicker = function() {
	datetimepickerData();
	/*点击新增*/  
	$('#qBeginTime').datetimepicker({  
		minView: "month",
		language:"zh-CN",
	    todayBtn : "linked",  
	    format: 'yyyy-mm-dd',
	    autoclose : true,  
	    todayHighlight : true,  
	    endDate : new Date()  
	}).on('changeDate',function(e){  
	    var startTime = e.date;  
	    $('#qEndTime').datetimepicker('setStartDate',startTime);  
	});  
	//结束时间：  
	$('#qEndTime').datetimepicker({  
		minView: "month",
		language:"zh-CN",
	    todayBtn : "linked",  
	    format: 'yyyy-mm-dd',
	    autoclose : true,  
	    todayHighlight : true,  
	    endDate : new Date()  
	}).on('changeDate',function(e){  
	    var endTime = e.date;  
	    $('#qBeginTime').datetimepicker('setEndDate',endTime);  
	});
};
/*弹框显示*/
function showData(da){
	$("."+da).show().addClass("animated flipInX").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass("animated flipInX");
	});
	$("."+da).scrollUnique();
}
function showlideInLeft(da){
	$("."+da).show().addClass("animated slideInLeft").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass("animated slideInLeft");
	});
	$("."+da).scrollUnique();
}
//点击删除,表格删除
function tableDelete(objMore,objMain,objDel){
	xcsoftTitle();
	$("."+objMore).on('click',function(){
		var _checked = $("."+objMore).is(':checked');
		$("."+objMain +" tbody input[name='test']").each(function(k,v) { 
            v.checked = _checked;
        }); 
	})
	if(objDel != ''){
		//删除
		$("."+objDel).on('click',function(){
			if($("."+objMain +" tbody").find("tr").length == 0)return;
			var falg = false;
			$("."+objMain +" tbody input[name='test']:checked").each(function() { 
	            n = $(this).parents("tr").index(); 
	            falg = true;
	            $("."+objMain +" tbody").find("tr:eq("+n+")").remove();  
	        });  
			if(!falg)xcsoft.error('请选择删除的数据',1000);
		})
	}
}
/*弹框全选*/
function butTable_more(objClick,objTab){
	$("."+objClick).on('click',function(){
		var _checked;
		if($("."+objClick).attr('btnChecked') != 'false'){
			_checked=true;
			$("."+objClick).attr('btnChecked','false');
		}else{
			_checked=false;
			$("."+objClick).attr('btnChecked','true');
		}
		$("#"+objTab +" input[name='checkName']").each(function(k,v) { 
            v.checked = _checked;
        }); 
	})
}
/*查询经理*/
function manager_Name(){
	var channal_html = '<option value=""><font style="vertical-align: inherit;">全部</font></option><option value="1"><font style="vertical-align: inherit;">missy</font></option><option value="2"><font style="vertical-align: inherit;">lucy</font></option><option value="3"><font style="vertical-align: inherit;">sara</font></option>'
	$('.manager_id').html(channal_html);
}
/*订单状态*/
function orderStatus_Name(num){
	var _result = JSONparse($.cookie("orderStatus"));
	if(_result){
		var channal_html='<option value="9999"><font style="vertical-align: inherit;">全部</font></option>';
		for(var r=0;r<_result.length;r++){
			if(num){
				if(_result[r].key >= 0){
					channal_html+='<option value="'+_result[r].key+'"><font style="vertical-align: inherit;">'+_result[r].value+'</font></option>'
				}
			}else{
				channal_html+='<option value="'+_result[r].key+'"><font style="vertical-align: inherit;">'+_result[r].value+'</font></option>'
			}
		}
		$('.order_status').html(channal_html);
	}
}
/*订单状态返回值*/
function orderStatus_data(dataStatus){
	var _result = JSONparse($.cookie("orderStatus"));
	for(var i=0;i<_result.length;i++){
		if(_result[i].key == dataStatus.toString()){
			return _result[i].value;
		}
	}
}
/*查询渠道*/
function channelList(index){
	var channal_html='';
	var searchConsuc = function(data){
		if(data.result){
			index == 1?channal_html='<option value="">请选择渠道</option>':channal_html='<option value="">全部</option>';
			for(var r=0;r<data.result.length;r++){
				channal_html+='<option value="'+data.result[r].channelCode+'">'+data.result[r].channelName+'</option>'
			}
			$('.channal_id').html(channal_html)
		}
	}
	doPost('/channel/channelList','',searchConsuc);
}
/*查询分类*/
function searchCategoryByLevel(level,channelCode,search){
	var searchConsuc = function(data){
		search(data);
	}
	var odata = {
		'level':level,
		'channelCode':channelCode
	}
	doPost('/category/searchCategoryByLevel',odata,searchConsuc);
}
//分类
function ByLevelcategory_id(index){
	var ByLevelSuc = function(data){
		if(data.result){
			var channal_html = '';
			if(index == 1){
				channal_html = '<option value="">请选择分类</option>'
			}
			for(var r=0;r<data.result.length;r++){
				var categoryCode = '';
				data.result[r].categoryCode == null?categoryCode='':categoryCode=data.result[r].categoryCode;
				channal_html+='<option value="'+categoryCode+'-'+data.result[r].categoryName+'-'+JSONstringify(data.result[r].salesAttributeValue)+'-'+JSONstringify(data.result[r].waresAttributeValue)+'">'+data.result[r].categoryName+'</option>'
			}
			$(".category_id").html(channal_html);
		}
	}
	searchCategoryByLevel(1,'',ByLevelSuc);
}

/*查询下级分类*/
function findByParentId(parentId,search){
	var searchConsuc = function(data){
		search(data);
	}
	var odata = {
		'parentId':parentId
	}
	doPost('/category/findByParentId',odata,searchConsuc);
}
/*查询品牌*/
function searchBrand(otype,brand_id){
	var searchConsuc = function(data){
		$("."+brand_id).html('');
		var chan_html = '';
		if(data.result){
			if(otype == 1){
				chan_html = '';
			}else{
				chan_html = '<option value="">全部</option>';
			}
			var _result=data.result;
			for(var r=0;r<_result.length;r++){
				chan_html+='<option value="'+_result[r].id+'|'+_result[r].brandName+'">'+_result[r].brandName+'</option>'
			}
			$("."+brand_id).html(chan_html);
		}
	}
	var odata = {
		'brandName':''
	}
	doPost('/brand/searchBrand',odata,searchConsuc);
}

/*查询供应商*/
function sendBusiness(type){
	var searchConsuc = function(data){
		if(data.result){
			var channal_html='';
			if(type == 2){
				channal_html='<option value="">请选择供应商</option>';
			}
			for(var r=0;r<data.result.length;r++){
				channal_html+='<option value="'+data.result[r].id+'">'+data.result[r].name+'</option>'
			}
			$('.sendBusiness').html(channal_html);
		}
	}
	doPost('/brand/searchSupplier','',searchConsuc);
}

/*进度条*/

function wrapperLoading(){
	if($('body .wrapperA').length > 0){
		$('body .wrapperA').remove();
	}
	$('body').append('<div class="wrapperA" style="width:100%;background:rgba(255,255,255,.5);height:100%;position:fixed;top:0;left:0;z-index:99999999999999999;"><div class="load-bar"><div class="load-bar-inner" data-loading="0"><span id="counter">0%</span></div></div><div style="position:fixed;left: 40%;top: 50%;z-index:99999999999999999;"><h1>上传中，请等待...</h1></div></div>');
	$(".wrapperA").scrollUnique();
	var currentS = 0;
	var current = 0;
	var intervalA = setInterval(incrementS,1000);
	function incrementS(){
		currentS++;
		if(currentS == 1){current = 10;}
		if(currentS == 3){current = 25;}
		if(currentS == 6){current = 45;}
		if(currentS == 9){current = 60;}
		if(currentS == 11){current = 70;}
		if(currentS == 13){current = 85;}
		if(currentS == 15){current = 100;}
		$('#counter').html(current+'%'); 
		$('.wrapperA .load-bar-inner').css('width',current+'%');
	    if(current <= 96 ){
	       $('.wrapperA #counter').css('left',(parseInt(current)+ parseInt(0)) +'%');
	    }
		if(currentS == 15){
			clearInterval(intervalA);
			xcsoft.success('文件上传成功',1500);
			$('body .wrapperA').remove();
			return;
		}
	}
}




/*stringify*/
function JSONstringify(data){
	return data.replace(/"([^"]*)"/g,"'$1'");
}
function JSONparse(data){
	return JSON.parse(data.replace(/'/g, '"'));
}
/*上架渠道显示*/
function JSONchannelList(channelList){
	var channal_html='',
		channelListAttr = channelList.split(',');
	for(var r=0;r<$('.channal_id option').length;r++){
		for(var n=0;n<channelListAttr.length;n++){
			if($('.channal_id option')[r].value == channelListAttr[n]){
				channal_html+=$('.channal_id option')[r].innerHTML+','
			}
		}
	}
	channal_html = channal_html.substr(0, channal_html.length - 1);
	return channal_html;
}
/*经理显示*/
function JSONmanager(channelList){
	var channal_html = ['','missy','lucy','sara']
	return channal_html[channelList];
}

function JSONfindUser(productManagerId,type){
	var findUserConsuc = function(data){
		if(data.result){
			var htmlAttr = ['','<option value="">全部</option>','<option value="" >请选择</option>','<option value="" >请选择用户</option>'];
			var _res = data.result,oHtml=htmlAttr[type];
			_res.forEach(function(v,k){
				var userName = v.userName || '';
				oHtml+='<option value="'+v.id+'">'+userName+'</option>'
			});
			$('.'+productManagerId).html(oHtml);
		}
	};
	doPost('/preSale/findUser','',findUserConsuc);
}








/*分类显示*/
function JSONcategory_id(channelList){
	var channal_html='';
	var ByLevelSuc = function(data){
		if(data.result){
			for(var r=0;r<data.result.length;r++){
				if(data.result[r].id == channelList){
					channal_html = data.result[r].categoryName;
				}
			}
		}
	}
	searchCategoryByLevel(1,'',ByLevelSuc);
	return channal_html;
}



//修改成功提示
function modReload(title){
	xcsoft.success(title,1500);
	setTimeout(function(){
		window.location.reload();
	},1000)
}


/*弹框确实或取消*/
function examIndexUp(title,examIndexfunc,index){
	if($('.main-content').find('.examineIndex').length > 0){
		$('.main-content').find('.examineIndex').remove();
	}
	var ohtml = '';
	if(index == 11){
		ohtml = '<div class="elasticDiv examineIndex"><div style="width:30%;position: absolute;left:0;right:0;top:0;bottom:0;margin: 15% auto 0;"><div class="panel panel-white"><div class="panel-heading"><div class="panel-tools"><a class="btn btn-md btn-link panel-close btn_exmineDiv_close" href="javascript:;"> <i class="fa fa-times"></i> </a></div></div><div class="panel-body" style=""><div class="col-sm-12" style="line-height:30px;margin-bottom: 50px;text-align: center;font-size: 16px;">'+title+'</div><div class="col-sm-12 center"><button type="button" class="btn btn-primary btn_exmines" style="padding: 6px 40px;">确定</button></div></div></div></div></div>'
	}else{
		ohtml = '<div class="elasticDiv examineIndex"><div style="width:30%;position: absolute;left:0;right:0;top:0;bottom:0;margin: 15% auto 0;"><div class="panel panel-white"><div class="panel-heading"><div class="panel-tools"><a class="btn btn-md btn-link panel-close btn_exmineDiv_close" href="javascript:;"> <i class="fa fa-times"></i> </a></div></div><div class="panel-body" style=""><div class="col-sm-12" style="line-height:30px;margin-bottom: 50px;text-align: center;font-size: 16px;">确定'+title+'？</div><div class="col-sm-12 center"><button type="button" class="btn btn-primary btn_exmines" style="padding: 6px 40px;">确定</button></div></div></div></div></div>'
	}
	
	$('.main-content').append(ohtml);
	$('.main-content .btn_exmineDiv_close').unbind('click').on('click',function(){
		$('.examineIndex').hide();
	})
	$('.main-content .btn_exmines').unbind('click').on('click',function(){
		if($('.btn_exmines').hasClass('clickActive'))return;
		$('.btn_exmines').addClass('clickActive');
		examIndexfunc();
	})
}


/*批量上传*/
function uploadFile(buttonchanSKU_newAdd,otype,back){
	$('.'+buttonchanSKU_newAdd).unbind('click').on('click',function(){
		$('.buttonchanSKU_inputFile').unbind('click').click();
		$('.buttonchanSKU_inputFile').unbind('change propertychange').on("change propertychange", function(){
			var	_this=$(this); 
			var name=_this.val().substring(_this.val().lastIndexOf("\\")+1,_this.val().length);
			var prefix=_this.val().substring(_this.val().lastIndexOf(".")+1,_this.val().length);
			if(!prefix){return false;}
		    if(prefix!='xlsx'&&prefix!='xls'&&prefix!='XLS'&&prefix!='XLSX'&&prefix!='xlsm'&&prefix!='xltx'){
		    	alert("只能上传EXCEL文件");
			    return false;
		    }
		    
		    var suc=function(url){
		    	if(otype == 23){
		    		back(url);
		    	}else{
		    		if(url.msg == '文件上传成功' ||url.msg == '文件上传解析修改成功'){
						if(otype == 20 || otype == 24){
						 	xcsoft.success('文件上传成功',1000);
							back(url);
					    }else{
					    	xcsoft.success('文件上传成功',1000);
					    }
					}else{
						xcsoft.error('文件上传失败',1000);
					}
		    	}
			}
		    ajaxFileUpload(_this,suc);
			function ajaxFileUpload(target,callback) {
				var pid=$(target).attr("id");
				$.ajaxFileUpload({
				    url : '/upload/file_excel', //用于文件上传的服务器端请求地址
				    secureuri : false, //一般设置为false
				    fileElementId : pid, //文件上传空间的id属性  <input type="file" id="file" name="file" />
				    type : 'post',
				    data:{'type':otype},
				    dataType : 'json', //返回值类型 一般设置为json
				    success : function(data) //服务器成功响应处理函数
				    {  
				     if(data.httpCode==200){
				        callback(data);
				      }else{
				      	xcsoft.error(data.msg,1000);
				      	
				      }
				    },
				    error : function(data)//服务器响应失败处理函数
				    {
				      alert("上传失败");
				    }
				})
				return false;
			}
		    console.log(name);
		})
	})
}
/*服务单文件上传*/
function uploadBeforeFile(buttonchanSKU_newAdd,ssuc){
	$('.'+buttonchanSKU_newAdd).unbind('click').on('click',function(){
		$('.buttonchanSKU_inputFile').unbind('click').click();
		$('.buttonchanSKU_inputFile').unbind('change propertychange').on("change propertychange", function(){
			var	_this=$(this),
				value = _this[0].value,
				index = value.lastIndexOf("\\"),
				oName = value.substring((index+1),value.length);
			if(!oName){oName = $('.buttonchanSKU_newAdd').html();}
			$('.buttonchanSKU_newAdd').html(oName);
			if(!value){return false;}
			var filesize = (_this[0].size / 1024).toFixed(2); 
			if(filesize >= 20480){
		    	alert("文件大小不能大于20M");
			    return false;
		    }
			var suc=function(url){
				ssuc(url);
			}
		    ajaxFileUpload(_this,suc);
			function ajaxFileUpload(target,callback) {
				var pid=$(target).attr("id");
				$.ajaxFileUpload({
				    url : '/upload/file', //用于文件上传的服务器端请求地址
				    secureuri : false, //一般设置为false
				    fileElementId : pid, //文件上传空间的id属性  <input type="file" id="file" name="file" />
				    type : 'post',
				    dataType : 'json', //返回值类型 一般设置为json
				    success : function(data) //服务器成功响应处理函数
				    {  
				     if(data.httpCode==200){
				        callback(data);
				      }else{
				      }
				    },
				    error : function(data)//服务器响应失败处理函数
				    {
				      alert("上传失败");
				    }
				})
				return false;
			}
		})
	})
	
}
