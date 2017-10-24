var o = {
	init:function(){
		FastClick.attach(document.body);
		$('.clerkTop img').attr('src','/shop/shopstaff-qrcode/'+getCookie('id'));
		o.clerkClick();
		o.oDate();
	},
	clerkClick:function(months,currPage){
		$('.clerkItem').on('click','em',function(){
			var item_index = $(this).index(),
				data =$(this).parent().parent().find('.clerkTitle').html(),
				name = $(this).context.innerText,
				oid = $(this).parent().attr('oid'),
				index = $(this).parent().attr('index');
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
			console.log(name)
			if(name == '店长'){
				var suc = function(data){
					if(data.result){
						setCookie('userInfoId',$('.ButTrue').attr('oid'));
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
					setCookie('getMsgId1',$('.ButTrue').attr('oid'));
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
					setCookie('getMsgId2',$('.ButTrue').attr('oid'));
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
							'shopId':'86f53a0142824ded8c4c5d938a5ce19b'
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
		console.log(moreAttr)
		for(var s = 0;s< moreAttr.length; s++){
			if(moreAttr[s].id == getCookie('userInfoId')){
				oHtml+='<li class="clear"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'"</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">店长</em></div></li>'
			}else if(moreAttr[s].id == getCookie('getMsgId1')){
				oHtml+='<li class="clear"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'"</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">店员</em></div></li>'
			}else if(moreAttr[s].id == getCookie('getMsgId2')){
				oHtml+='<li class="clear"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'"</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">收银员</em></div></li>'
			}else{
				oHtml+='<li class="clear"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'"</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em>店长</em><em>店员</em><em class="borderNone">收银员</em></div></li>'
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
						setCookie('userInfoId','');
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
					setCookie('getMsgId1','');
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
					setCookie('getMsgId2','');
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
	}
}
o.init();