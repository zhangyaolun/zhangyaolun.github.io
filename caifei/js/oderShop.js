var o = {
	init:function(){
		FastClick.attach(document.body);
		var data = JSON.parse(getParameter('result').replace(/'/g, '"'));
		console.log(data)
		$('.order_title img').attr("src",data.pic);			
		$('.title_top span').html(data.shopName);			
		$('.title_num em').html(getParameter('num'));			
		$('.over').css('width',$('.title_num em').html()*12/100+'rem');			
		$('.price_n').html((data.discountRate*10)+'折');	
		o.click(data.id,data.discountRate.toFixed(2));
	},
	ajsxData:function(userShopId,rate){
		
		var data = {
			'openid':sessionStorage.getItem('openId'),
			'total':$('.pri_input input').val()*100,
			'userShopId':userShopId,
			'rate':rate,
			'actualPay':$('.fexed_left i').html()*100
		}
		console.log(data)
		var suc = function(data){
			console.log(data)
			WeixinJSBridge.invoke('getBrandWCPayRequest',{
  		 "appId" : data.result.appId,"timeStamp" : data.result.timeStamp, "nonceStr" : data.result.nonceStr, "package" : data.result. packagee,"signType" : "MD5", "paySign" : data.result.paySign 
   			},function(res){
	            if(res.err_msg == "get_brand_wcpay_request:ok"){  
	            	window.location.href = 'payment.html?result='+getParameter('result')+'&num='+getParameter('num')+'&payMoney='+data.result.actual_pay+'&totalMoney='+data.result.total+'&orderPayId='+data.result.orderId+'&userShopId='+userShopId+'&channel='+getParameter('channel');
	            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
	                /*alert("用户取消支付!"); */ 
	            }else{
	               alert(res.err_msg);
	               alert("支付失败");  
	            }  
			})
		}
		doPost('/pay/weiToPay',data,suc);
	},
	click:function(userShopId,rate){
		$('.pri_input input').bind('input propertychange',function(){
			if(parseInt($('.pri_input input').val()) > 9999){ 
				alert('请输入10000元以下的金额');
				$('.pri_input input').val('');
				return;
			}
			if( ! /^-?\d+\.?\d{0,2}$/.test($('.pri_input input').val())){ 
				var s = $('.pri_input input').val();
				$('.pri_input input').val(s.substring(0,s.length-1));
			}
			if( ! /^-?\d+\.?\d{0,2}$/.test($('.pri_input input').val())){ 
				var s = $('.pri_input input').val();
				$('.pri_input input').val(s.substring(0,s.length-1));
			}
			$('.fexed_left i').html(($('.pri_input input').val()*rate).toFixed(2))
		})
		$('.fexed_right').on('click',function(){
			if($('.pri_input input').val() == ''){
				alert('请输入付款金额');
				return;
			}
			if($('.fexed_left i').html() == 0){
				alert('请确认消费金额');
				return;
			}
			o.ajsxData(userShopId,rate);
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