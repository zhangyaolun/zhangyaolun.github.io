var o = {
	init:function(){
		FastClick.attach(document.body);
		$('.clerkTop img').attr('src','/shop/shopstaff-qrcode/'+getCookie('id'));
		o.clerkClick();
		
		o.mobile();
	},
	clerkClick:function(event,obj){// 点击弹层
		$('.clerkItem').on('click','em',function(){
			var item_index = $(this).index(),
				data =$(this).parent().parent().find('.clerkTitle').html(),
				name = $(this).context.innerText,
				oid = $(this).parent().attr('oid'),
				index = $(this).parent().attr('index');
			$('.clerkItem li').siblings('.selected').removeClass('selected');
			$('.ButTrue').attr('index',index);
			$('.ButTrue').attr('oid',oid);
			if($(this).hasClass('clerkActive')){
				o.quxiaoData(data,name)
			}else{
				o.alertData(data,name)
			}
		})
	},
	alertData:function(data,name){//弹出提示
		$('.alertBox').show();
		$('.alertTan .alertTitle').html('您是否设置 ' +data +' 为 '+ name);
		$('.ButFalse').on('click',function(){
			$('.alertBox').hide();
		})
		$('.ButTrue').on('click',function(){
			if(name == '店长'){
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
			}else if(name == '店员'){
				var suc = function(data){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em class="borderNone clerkActive">'+name+'</em>');
					$('.alertBox').hide();
				}
				var data = {
					'getMsgId1':$('.ButTrue').attr('oid')
				}
				doAjax('/shop/bindUser/bindMsg1',data,suc);
			}else if(name == '收银员'){
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
		})
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
		console.log(oAttr)
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
		$('.alertTan .alertTitle').html('您是否取消 ' +data +' 为 '+ name);
		$('.ButFalse').on('click',function(){
			$('.alertBox').hide();
		})
		$('.ButTrue').on('click',function(){
			console.log(name)
			if(name == '店长'){
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
			}else if(name == '店员'){
				var suc = function(data){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em>店长</em><em>店员</em><em class="borderNone">收银员</em>');
					$('.alertBox').hide();
				}
				var data = {
					'getMsgId1':''
				}
				doAjax('/shop/bindUser/bindMsg1',data,suc);
			}else if(name == '收银员'){
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
		})
	},
	mobile:function(){
		 $('.list-li').on('swipeleft', function(event) {
		    event.preventDefault();
		    $(this).addClass('selected').siblings('.list-li').removeClass('selected');
		    $(this).find('.btn').on('click', function(event) {
		    	var userId = $(this).find('.btn').context.attributes.aid.value,
		    		_this = $(this);
		      event.preventDefault();
		      var suc = function(data){
					if(data.result){
					 _this.parent(".list-li").animate({
				        height: 0,
				        width: 0},
				        300, function() {
			        		$(this).remove();
				      });
					}
				}
				var data = {
					'userInfoId':userId
				}
				doAjax('/shop/bindUser/delUser',data,suc);
		    });
		  });
		  $('.list-li').on('swiperight', function(event) {
		    event.preventDefault();
		    $(this).removeClass('selected');
		  });
	}
}
o.init();