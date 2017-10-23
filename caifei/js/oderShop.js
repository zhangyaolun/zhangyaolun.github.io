document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		$('.pri_input input').bind('input propertychange',function(){
			if($('.pri_input input').val() == ''){
				$('.pri_input input').css('font-size',' 1.1rem');
				$('.order_price .pri_input').css('padding-top',' 3%');
				$('.code_display').hide();
				$('.payMent').hide();
				$('.fexed_left .payCont').html('0.00');
				return;
			}else{
				$('.pri_input input').css('font-size',' 2rem');
				$('.order_price .pri_input').css('padding-top','0');
			}
		})
		return;
		FastClick.attach(document.body);
		var data = JSON.parse(getParameter('result').replace(/'/g, '"'));
		console.log(data)
		console.log(getParameter('num'))
		$('.shop_img').attr("src",data.pic);			
		$('.pay_shop .shop_title').html(data.shopName);			
		$('.pay_shop .emStyle').html(getParameter('num'));			
		$('.pay_shop .over').css('width',getParameter('num')*12+'px');			
		$('.shop_order em').html(data.address);	
		$('.price_n').html((data.discountRate*10));	
		o.click(data.id,(data.discountRate).toFixed(1));
		o.ajaxDate();
	},
	ajsxData:function(userShopId,rate){
		var data = {
			'openid':sessionStorage.getItem('openId'),
			'total':($('.pri_input input').val()*100).toFixed(0),
			'userShopId':userShopId,
			'rate':rate,
			'actualPay':($('.fexed_left i').attr('pay')*100).toFixed(0),
			'actualScore':0			
		}
		if($('.code_display').css('display') == 'inline-block'){
			if($('.order_bot .bot_image').hasClass('two')){
				data.actualScore = $('.order_bot .order_code').html();
			}
		} 
		console.log(data)
		var suc = function(data){         
			if(data.result.payType == 2){
				window.location.href = 'payment.html?result='+getParameter('result')+'&num='+getParameter('num')+'&payNumber=1'+'&orderPayId='+data.result.orderId+'&userShopId='+userShopId+'&channel='+getParameter('channel');
			}else{
				WeixinJSBridge.invoke('getBrandWCPayRequest',{
  		 "appId" : data.result.appId,"timeStamp" : data.result.timeStamp, "nonceStr" : data.result.nonceStr, "package" : data.result. packagee,"signType" : "MD5", "paySign" : data.result.paySign 
   			},function(res){
	            if(res.err_msg == "get_brand_wcpay_request:ok"){  
	            	window.location.href = 'payment.html?result='+getParameter('result')+'&num='+getParameter('num')+'&payMoney='+data.result.actual_pay+'&totalMoney='+data.result.total+'&orderPayId='+data.result.orderId+'&userShopId='+userShopId+'&channel='+getParameter('channel')+'&payNumber=2';
	            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
	                /*alert("用户取消支付!"); */ 
	            }else{
	               alert(res.err_msg);
	               alert("支付失败");  
	            }  
			})
			}
			console.log(data)
			
		}
		doPost('/pay/weiToPay',data,suc);
	},
	click:function(userShopId,rate){
		$('.pri_input input').bind('input propertychange',function(){
			if($('.pri_input input').val() == ''){
				$('.pri_input input').css('font-size',' 1.1rem');
				$('.order_price .pri_input').css('padding-top',' 3%');
				$('.code_display').hide();
				$('.payMent').hide();
				$('.fexed_left .payCont').html('0.00');
				return;
			}else{
				o.comData(($('.pri_input input').val()*rate).toFixed(2));
				$('.pri_input input').css('font-size',' 2rem');
				$('.order_price .pri_input').css('padding-top','0');
			}
			if(parseInt($('.pri_input input').val()) > 9999){ 
				$('.alertTan').show();
				setTimeout(function(){
					$('.alertTan').hide();
					$('.pri_input input').val('');
					$('.pri_input input').css('font-size',' 1.1rem');
					$('.code_display').hide();
					$('.payMent').hide();
					$('.fexed_left .payCont').html('0.00');
				},3000)
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
			$('.fexed_left i').attr('pay',($('.pri_input input').val()*rate).toFixed(2));
			if($('.code_display').css('display') == 'inline-block'){
				if($('.order_bot .bot_image').hasClass('one')){
					$('.fexed_left .payCont').html((($('.pri_input input').val()*rate).toFixed(2)-$('.order_bot .order_pay').html()).toFixed(2));
					$('.fexed_left .payMent').show();
					$('.fexed_left .payMent').html('(折后价:￥'+($('.pri_input input').val()*rate).toFixed(2)+')');
				}else{
					$('.fexed_left .payMent').hide();
					$('.fexed_left .payCont').html(($('.pri_input input').val()*rate).toFixed(2));
				}
			}else{
				$('.fexed_left .payMent').hide();
				$('.fexed_left .payCont').html(($('.pri_input input').val()*rate).toFixed(2));
			}
		})
		$('.fexed_right').on('click',function(){
			if($('.pri_input input').val() == ''){
				alert('请输入付款金额');
				return;
			}
			o.ajsxData(userShopId,rate);
		});
		$('.order_bot img').on('click',function(){
			if(!$('.order_bot img').hasClass('two')){
				$('.order_bot img').addClass('two');
				$('.order_bot img').attr('src','../img/mapNew2.png');
				$('.fexed_left .payCont').html((($('.pri_input input').val()*rate).toFixed(2)-$('.order_bot .order_pay').html()).toFixed(2));
				$('.fexed_left .payMent').show();
				$('.fexed_left .payMent').html('(折后价:￥'+($('.pri_input input').val()*rate).toFixed(2)+')');
			}else{
				$('.order_bot img').removeClass('two');
				$('.order_bot img').attr('src','../img/mapNew1.png');
				$('.fexed_left .payCont').html(($('.pri_input input').val()*rate).toFixed(2));
				$('.fexed_left .payMent').hide();
			}
		});
	},
	comData:function(payMoney){
		var data = {
			'userInfoId':sessionStorage.getItem('openId'),
			'payMoney': (payMoney*100).toFixed(0)
		}
		console.log(data)
		var suc = function(data){
			console.log(data)
			if(data.result > 0){
				$('.code_display').css('display','inline-block');
				if(!$('.order_bot img').hasClass('two')){
					$('.order_bot img').addClass('two');
					$('.order_bot img').attr('src','../img/mapNew2.png');
				}
				$('.order_bot .order_code').html(data.result);
				$('.order_bot .order_pay').html(data.result/100);
			}else{
				$('.code_display').hide();
			}
		}
		doPost('/pay/comScore',data,suc);
	},
	ajaxDate:function(){//用户
		var suc = function(data){
			console.log(data)
			$('.order_bot .code_cont').html(data.result.score);
		}
		var data = {
			'openid':sessionStorage.getItem('openId')
		}
		doPost('/user/info',data,suc);
	}
	
}
o.init();