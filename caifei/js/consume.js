document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		var currPage = 1;
		setTimeout(function(){
			o.moreAjax(currPage);
		},100)
		setTimeout(function(){
			o.moreDate();
		},200)
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').css('display','none');
		})
	},
	moreDate:function(){
		$(window).scroll(function(){
			if ($(window).scrollTop() != '0'){
				$('.back').css('display','block');
			}else{
				$('.back').css('display','none');
			}
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		    if($('.consume_item .bottom_load').html() == '暂无消费记录'){
            	return ;
			}
		　　if(scrollTop + windowHeight == scrollHeight){
				var typeAttr = $('.consume_item').attr('type');
			    typeAttr++;
		　　　  o.moreAjax(typeAttr);
		　　}
		});	
	},
	moreAjax:function(currPage){
		var data = {
			'openid':getParameter('openId'),
			'currPage':currPage,
			'pageSize':10
		}
		$('.consume_item').attr('type',currPage);
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
	        		if(data.result.result.length == 0){
		            	$('.consume_item').append('<li class="detailColor item bottom_load">暂无消费记录</li>');
		            	return ;
		            }
	        		for(var i = 0; i <data.result.result.length; i++){
	                    result += '<li class="detailColor"><div class="clear title"><span class="left">'+data.result.result[i].userShopName+'</span><i style="color:#ff6585;margin-left:.1rem">'+(data.result.result[i].rate*10).toFixed(1)+'折</i></span><em class="right">￥'+((data.result.result[i].actualPay)/100).toFixed(2)+'</em></div><div class="clear last"><span class="left">'+data.result.result[i].createTime+'</span></div></li>';
                    
	                }
	        		$('.bottom_load').remove();
		            $('.consume_item').append(result);
	        	}
	        }
	    })
	},
}
o.init();