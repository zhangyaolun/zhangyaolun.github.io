var o = {
	init:function(){
		FastClick.attach(document.body);
		/*if(!getCookie('userName')){
			window.location.href = 'login.html';
		}
		$('.clerkTop img').attr('src','/shop/shopstaff-qrcode/'+getCookie('id'));*/
		o.mobile();
	},
	clerkClick:function(event,obj){// 点击弹层
		var data = event.target.parentNode.previousSibling.innerHTML,
			name = event.target.innerText,
			oid = obj.attributes.oid.value,
			index = obj.attributes.index.value;
		$('.ButTrue').attr('index',index);
		$('.ButTrue').attr('oid',oid);
		$('.ButTrue').attr('name',name);
		if(event.target.className == 'borderNone clerkActive'){
			$('.ButTrue').attr('oNum',1);
			o.quxiaoData(data,name)
		}else{
			$('.ButTrue').attr('oNum',2);
			o.alertData(data,name)
		}
	},
	clerkNode:function(){//设置职务
		if($('.ButTrue').attr('name') == '店长'){
			var suc = function(data){
				if(data.result){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em class="borderNone clerkActive">'+name+'</em>');
					$('.alertBox').hide();
				}
			}
			var data = {
				'userInfoId':$('.ButTrue').attr('oid')
			}
			doAjax('/shop/bindUser/bindUser',data,suc);
		}else if($('.ButTrue').attr('name') == '店员'){
			var suc = function(data){
				window.location.reload();
				$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em class="borderNone clerkActive">'+name+'</em>');
				$('.alertBox').hide();
			}
			var data = {
				'getMsgId1':$('.ButTrue').attr('oid')
			}
			doAjax('/shop/bindUser/bindMsg1',data,suc);
		}else if($('.ButTrue').attr('name') == '收银员'){
			var suc = function(data){
				window.location.reload();
				$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em class="borderNone clerkActive">'+name+'</em>');
				$('.alertBox').hide();
			}
			var data = {
				'getMsgId2':$('.ButTrue').attr('oid')
			}
			doAjax('/shop/bindUser/bindMsg2',data,suc);
		}
	},
	alertData:function(data,name){//弹出提示
		$('.alertBox').show();
		$('.alertTan .alertTitle').html('&nbsp;&nbsp;您是否设置 ' +data +' 为 '+ name);
	},
	oDate:function(){
		var oAttr = [];
    	var currPage=1;
	    var data = {
			'currPage':currPage
		}
		$.ajax({
	        url : '/shop-account/searchUserList',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	if(data.httpCode == 200){
		           oAttr.push(data.result.result);
		           currPage++;
		           var num = data.result.totalPages;
		           for(var i=currPage;i<=num;i++){
			           	var data = {
							'currPage':i,
						}
					    $.ajax({
				       		url : '/shop-account/searchUserList',
					        data :data,
					        type : 'POST',
					        async : false,
					        success : function(data){
					        	if(data.httpCode == 200){
						           oAttr.push(data.result.result);
					        	}
					        }
					    });       		
					}
	        	}
	        }
	    });
	    o.htmlData(oAttr);
	},
	htmlData:function(oAttr){
		var oHtml = '',moreAttr=[];
		for(var i = 0;i < oAttr.length; i++){
			for(var j = 0;j < oAttr[i].length; j++){
				moreAttr.push(oAttr[i][j]);
			}
		}
		for(var s = 0;s< moreAttr.length; s++){
			if(moreAttr[s].jiaose == 1){
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">店长</em></div><div class="btn" aid="'+moreAttr[s].id+'">删除</div></li>'
			}else if(moreAttr[s].jiaose == 2){
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">店员</em></div><div class="btn" aid="'+moreAttr[s].id+'">删除</div></li>'
			}else if(moreAttr[s].jiaose == 3){
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">收银员</em></div><div class="btn" aid="'+moreAttr[s].id+'">删除</div></li>'
			}else{
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em>店长</em><em>店员</em><em class="borderNone">收银员</em></div><div class="btn" aid="'+moreAttr[s].id+'">删除</div></li>'
			}
		}
		$('.clerkItem').html(oHtml);
	},
	quxiaoData:function(data,name){
		$('.alertBox').show();
		$('.alertTan .alertTitle').html('&nbsp;&nbsp;您是否取消 ' +data +' 为 '+ name);
	},
	delData:function(event,obj){//删除
		var suc = function(data){
			if(data.result){
				obj.remove();
			}
		}
		var data = {
			'userInfoId':event.target.attributes.aid.value
		}
		doAjax('/shop/bindUser/delUser',data,suc);
	},
	quxiaoClick:function(){
		if($('.ButTrue').attr('name') == '店长'){
			var suc = function(data){
				if(data.result){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em>店长</em><em>店员</em><em class="borderNone">收银员</em>');
					$('.alertBox').hide();
				}
			}
			var data = {
				'userInfoId':''
			}
			doAjax('/shop/bindUser/bindUser',data,suc);
		}else if($('.ButTrue').attr('name') == '店员'){
			var suc = function(data){
				window.location.reload();
				$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em>店长</em><em>店员</em><em class="borderNone">收银员</em>');
				$('.alertBox').hide();
			}
			var data = {
				'getMsgId1':''
			}
			doAjax('/shop/bindUser/bindMsg1',data,suc);
		}else if($('.ButTrue').attr('name') == '收银员'){
			var suc = function(data){
				window.location.reload();
				$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em>店长</em><em>店员</em><em class="borderNone">收银员</em>');
				$('.alertBox').hide();
			}
			var data = {
				'getMsgId2':''
			}
			doAjax('/shop/bindUser/bindMsg2',data,suc);
		}
	},
	touchDate:function(){
		var initX; //触摸位置
	    var moveX; //滑动时的位置
	    var X = 0; //移动距离
	    var objX = 0; //目标对象位置
	    var num = 0;
	    window.addEventListener('touchstart', function(event) {
	        event.preventDefault();
	        console.log(event)
	        num++;
	        $('.clerkTop span').html(num);
	        var obj = event.target.parentNode;
	        if (event.target.tagName == "EM") {
	        	$('.list-li').css('-webkit-transform','translateX(0px)');
                $('.list-li').css('-ms-transform','translateX(0px)');
	        	o.clerkClick(event,obj);
	        	return;
	        }
	        if (event.target.innerHTML == "删除") {
	        	o.delData(event,obj);
	        	return;
	        }
	        if (event.target.innerHTML == "取消") {
	        	$('.alertBox').hide();
	        	return;
	        }
	        if (event.target.innerHTML == "确定") {
	        	$('.ButTrue').attr('oNum') == 1?o.quxiaoClick():o.clerkNode();
	        	return;
	        }
	        if (obj.className == "clear list-li") {
	            initX = event.targetTouches[0].pageX;
	            objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
	        }
	        if (objX == 0) {
	            window.addEventListener('touchmove', function(event) {
	                event.preventDefault();
	                $('.list-li').css('-webkit-transform','translateX(0px)');
	                $('.list-li').css('-ms-transform','translateX(0px)');
	                var obj = event.target.parentNode;
	                if (obj.className == "clear list-li") {
	                    moveX = event.targetTouches[0].pageX;
	                    X = moveX - initX;
	                    if (X >= 0) {
	                        obj.style.WebkitTransform = "translateX(" + 0 + "px)";
	                        obj.style.MsTransform = "translateX(" + 0 + "px)";
	                    } else if (X < 0) {
	                        var l = Math.abs(X);
	                        obj.style.WebkitTransform = "translateX(" + -l + "px)";
	                        obj.style.MsTransform = "translateX(" + -l + "px)";
	                        if (l > 100) {
	                            l = 100;
	                            obj.style.WebkitTransform = "translateX(" + -l + "px)";
	                            obj.style.MsTransform = "translateX(" + -l + "px)";
	                        }
	                    }
	                }
	            });
	        } else if (objX < 0) {
	            window.addEventListener('touchmove', function(event) {
	                event.preventDefault();
	                var obj = event.target.parentNode;
	                if (obj.className == "clear list-li") {
	                    moveX = event.targetTouches[0].pageX;
	                    X = moveX - initX;
	                    if (X >= 0) {
	                        var r = -100 + Math.abs(X);
	                        obj.style.WebkitTransform = "translateX(" + r + "px)";
	                        obj.style.MsTransform = "translateX(" + r + "px)";
	                        if (r > 0) {
	                            r = 0;
	                            obj.style.WebkitTransform = "translateX(" + r + "px)";
	                            obj.style.MsTransform = "translateX(" + r + "px)";
	                        }
	                    } else { //向左滑动
	                        obj.style.WebkitTransform = "translateX(" + -100 + "px)";
	                        obj.style.MsTransform = "translateX(" + -100 + "px)";
	                    }
	                }
	            });
	        }
	
	    })
	    window.addEventListener('touchend', function(event) {
	        event.preventDefault();
	        var obj = event.target.parentNode;
	        if (obj.className == "clear list-li") {
	            objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
	            if (objX > -100) {
	                obj.style.WebkitTransform = "translateX(" + 0 + "px)";
	                obj.style.MsTransform = "translateX(" + 0 + "px)";
	                objX = 0;
	            } else {
	                obj.style.WebkitTransform = "translateX(" + -100 + "px)";
	                obj.style.MsTransform = "translateX(" + -100 + "px)";
	                objX = -100;
	            }
	        }
	    })
	},
	mobile:function(){
		 $('.list-li').on('swipeleft', function(event) {
		    event.preventDefault();
		    /* Act on the event */
		    $(this).addClass('selected').siblings('.list-li').removeClass('selected');
		    $(this).find('.btn').on('click', function(event) {
		      event.preventDefault();
		      /* Act on the event */
		      $(this).parent(".list-li").animate({
		        height: 0,
		        width: 0},
		        300, function() {
		        /* stuff to do after animation is complete */
		        $(this).remove();
		      });
		    });
		  });
		  $('.list-li').on('swiperight', function(event) {
		    event.preventDefault();
		    /* Act on the event */
		    $(this).removeClass('selected');
		  });
			}
}
o.init();