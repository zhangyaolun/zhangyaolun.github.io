var o = {
	init:function(){
		FastClick.attach(document.body);
		var data = JSON.parse(getParameter('result').replace(/'/g, '"'));
		console.log(data)
		$('.order_title img').attr("src",data.pic);			
		$('.title_top span').html(data.shopName);			
		$('.title_num em').html(getParameter('num'));			
		$('.over').css('width',$('.title_num em').html()*12/100+'rem');			
		$('.price_n').html((data.discountRate*100).toFixed(0)+'折');			
		
		o.click();
	},
	ajsxData:function(){
		var data = {
			'openid':'123456',
			'orderPayId':'01b09837ef2f41c682837939cc8414f8',
			'userShopId':'000da97724a14313a35bce3eccf64851',
			'score':10,//评分
			'content':10//内容
		}
		console.log(data)
		$.ajax({
	        url :'/comment/submit',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	
	        	console.log(data)
	        }
	    })
	},
	click:function(){
		$('.pri_input input').on('blur',function(){
			console.log('8888888')
			$('.fexed_left i').html(($('.pri_input input').val()*1).toFixed(2))
		})
		$('.fexed_right').on('click',function(){
			window.location.href = 'payment.html?result='+getParameter('result')+'&num='+getParameter('num');
			
			
			
			
		});
		$('.bot_image').on('click',function(){
			if($('.bot_image').hasClass('one')){
				$('.bot_image').removeClass('one');
				$('.bot_image').attr('src','../img/mapNew1.png');
			}else{
				$('.bot_image').addClass('one');
				$('.bot_image').attr('src','../img/mapNew2.png');
			}
		});
	}
}
o.init();