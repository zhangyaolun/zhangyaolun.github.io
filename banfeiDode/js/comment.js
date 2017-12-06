
/*置顶*/
function scrolltopBack(obj){
   obj.bind('click',function(){
		$('body,html').animate({scrollTop:0},400);
		obj.hide();
		return false; 
	})
}

/*检查Android或ios*/
function isAndIsiOS(){
	var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid){
		return 1;
	}else{
		return 2;
	}
}

/*获取url中的值*/
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

/*生成32位数*/
function getNum(){  
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];  
    var nums="";  
    for(var i=0;i<32;i++){  
        var id = parseInt(Math.random()*61);  
        nums+=chars[id];  
    }  
    return nums;  
}  


/*数据请求*/
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
        if(datas.status==999){

        }
        if(datas.status==500){
            alert(datas.message);
        }
        if(datas.status==200){
            callback(datas);
        }if(datas.status==201){
            setLoginState(false)
        }
    }
}
/* <a class="btn-right" href="javascript:;"><img src="img/icon1.png"/></a>*/
function showLoginDialog(data){
    var a='<p class="header"><a class="btn-left" href="javascript:;"><img src="img/head_1.png"/></a><img src="img/head_2.png" class="headerImg"/></p>';
    $("body").append(a);
}

/*弹层*/
;(function($,window,document,undefined){
   //默认参数
    var PARAMS;
    var DEFAULTPARAMS = { Title: "标题", Content: "",BtnL:"确定",BtnR:"取消" , FunL: new Object, FunR: new Object };
    $.DialogByZ = {
        //弹出提示框
        Alert: function (params) {
            Show(params,"Alert");
        },
        //弹出确认框
        Confirm: function (params) { Show(params,"Confirm"); },
        //自动显示弹框
        Autofade: function (params) { Show(params,"Autofade") },
        //关闭弹出框
        Close: function () {
            $(".zbox-popup,.zbox-popup-backdrop").remove();
        },
        //加载图形
        Loading:function(Url){
        	loadBox(Url)
        }

    };
        //初始化参数
    function Init(params) {
        if (params != undefined && params != null) {
            PARAMS = $.extend({},DEFAULTPARAMS, params);
        }
    };
    function loadBox(Url){
    	var url=Url;
    	var dislogContainer=$('<div class="zbox-popup" style="display: block;"><img  id="zchange" src="'+url+'"></div>');
    	var blackFilter=$('<div class="zbox-popup-backdrop" style="display: block;"></div>');
    	setTimeout(function(){
    	  		 $(".zbox-popup").addClass('zbox-popup-in');
    	  		 $(".zbox-popup-backdrop").addClass('zbox-active');
    	  	},30)
    	//$("body").append(blackFilter);
    	$("body").append(dislogContainer);
    }
    function Show(params, caller){
    	  Init(params);
    	  var dislogContainer;
    	  var dialogInner;
    	  var dialogBtn;
    	  var blackFilter=$('<div class="zbox-popup-backdrop" style="display: block;"></div>');
    	  if(caller=='Autofade'){
    	  	 dislogContainer=$('<div class="zbox-toast-container"><div class="zbox-toast-message">'
    	  	 +PARAMS.Content+'</div></div>');
    	  	 $("body").append(dislogContainer);
    	  	 setTimeout(function(){
    	  		 $(".zbox-toast-container").addClass('zbox-active');
    	  	},30)
    	  	 setTimeout(function(){
    	  	 	  $(".zbox-toast-container").remove();
    	  	 },1500)
    	  }else{
    	  	dislogContainer=$('<div class="zbox-popup" style="display: block;"></div>');
    	  	dialogInner=$('<div class="zbox-popup-inner"><div class="zbox-popup-title">'+PARAMS.Title+'</div><div class="zbox-popup-text">'+PARAMS.Content+'</div></div>');
    	  	dialogBtn=$('<div class="zbox-popup-buttons"><span class="zbox-popup-button" index="0">'+PARAMS.BtnL+'</span></div>');
    	  	if(caller=='Confirm'){
    	  		dialogBtn.append($('<span class="zbox-popup-button R" index="1">'+PARAMS.BtnR+'</span>')); 
    	  	}
    	  	dislogContainer.append(dialogInner);
    	  	dislogContainer.append(dialogBtn);
    	  	setTimeout(function(){
    	  		 $(".zbox-popup").addClass('zbox-popup-in');
    	  		 $(".zbox-popup-backdrop").addClass('zbox-active');
    	  	},10)
    	  	$("body").append(blackFilter);
    	    $("body").append(dislogContainer);
    	    
    	  	$(".zbox-popup-button").click(function(){
    	  		 var indexs=$(this).attr('index');
    	  		 if(indexs==0){
    	  		 	//左侧按钮
    	  		 	if($.isFunction(PARAMS.FunL)){
    	  		 		    PARAMS.FunL();
			    	}else{
			    			$.DialogByZ.Close(); 
			    	}
    	  		 }else{
    	  		 	//右侧按钮 
    	  		 	if($.isFunction(PARAMS.FunR)){
    	  		 		    PARAMS.FunR();
			    	}else{
			    			$.DialogByZ.Close(); 
			    	}
    	  		 }
    	  		 return false;
    	  	})
    	  	 
    	  }
    	  //	  
    }
})(jQuery,window,document);