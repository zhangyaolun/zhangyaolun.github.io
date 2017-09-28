var o = {
	init:function(){
		FastClick.attach(document.body);
		var currPage = 1;
		o.moreAjax(currPage);
		o.moreDate(currPage);
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').css('display','none');
		})
	},
	moreDate:function(currPage){
		$(window).scroll(function(){
			if ($(window).scrollTop() != '0'){
				$('.back').css('display','block');
			}else{
				$('.back').css('display','none');
			}
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		   if($('.consume_item .bottom_load').html() == '暂无消费记录')return;
		　　if(scrollTop + windowHeight == scrollHeight){
			   currPage++;
		　　　 o.moreAjax(currPage);
		　　}
		});	
	},
	moreAjax:function(currPage){
		var data = {
			'openid':sessionStorage.getItem('openId'),
			'currPage':currPage,
			'pageSize':10
		}
		console.log(data)
		$.ajax({
	        url :'/user/payHistory',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	console.log(data);
	        	if(data.httpCode == 200){
	        		var result = '';
	        		if(data.result.result.length == 0  &&  $('.consume_item li').length > 10){
		            	$('.consume_item').append('<li class="detailColor item bottom_load">暂无消费记录</li>');
		            	return ;
		            }
	        		for(var i = 0; i <data.result.result.length; i++){
	                    result += '<li class="detailColor"><div class="clear title"><span class="left">'+data.result.result[i].userShopName+'<i style="color:#ff6585;margin-left:.1rem">'+(data.result.result[i].rate*10)+'折</i></span><em class="right">￥'+((data.result.result[i].actualPay)/100).toFixed(2)+'</em></div><div class="clear last"><span class="left">'+data.result.result[i].createTime+'</span></div></li>';
                    
	               }
	        		
	        		$('.bottom_load').remove();
		            $('.consume_item').append(result);
		            
		            if(data.result.pageNo == data.result.totalPages &&  $('.consume_item li').length > 10){
		            	$('.consume_item').append('<li class="detailColor item bottom_load">暂无消费记录</li>');
		            	return ;
		            }else{
					　　if($(window).scrollTop() > 0){
						  $('.consume_item').append('<li class="detailColor item bottom_load">加载中...</li>');
					　　}
		            }
	        	}
	        }
	    })
	},
}
o.init();