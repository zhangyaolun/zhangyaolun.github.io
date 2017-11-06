document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		var data = JSON.parse(getParameter('result').replace(/'/g, '"'));
		if(data.pic.split(',').length >= 2){
			$('.shop_img').attr("src",data.pic.split(',')[0]) 
		}else{
			$('.shop_img').attr("src",data.pic);  
		}
		$('.pay_shop .shop_title').html(data.shopName);			
		$('.pay_shop .emStyle').html(getParameter('num'));			
		$('.pay_shop .over').css('width',getParameter('num')*12+'px');			
		$('.shop_order em').html(data.address);	
		$('.price_n').html((data.discountRate*10).toFixed(1));	
		o.click(data.id,(data.discountRate));
	},
	ajsxData:function(userShopId,rate){
		var data = {
			'openid':sessionStorage.getItem('openId'),
			'total':($('.pri_input input').val()*100).toFixed(0),
			'userShopId':userShopId,
			'rate':rate,
			'actualPay':($('.fexed_left i').attr('pay')*100).toFixed(0),
			'actualScore':0,			
			'noPrePay':($('#name_priceNon').val()*100).toFixed(0)||0			
		}
		if($('.code_display').css('display') == 'inline-block'){
			if($('.order_bot .bot_image').hasClass('two')){
				data.actualScore = $('.order_bot .order_code').html();
			}
		} 
		var suc = function(data){   
			setCookie('payMent','1');
			if(data.result.payType == 2){
				window.location.href = 'payment.html?result='+getParameter('result')+'&num='+getParameter('num')+'&payNumber=1'+'&orderPayId='+data.result.orderId+'&userShopId='+userShopId+'&channel='+getParameter('channel');
			}else{
				WeixinJSBridge.invoke('getBrandWCPayRequest',{"appId" : data.result.appId,"timeStamp" : data.result.timeStamp, "nonceStr" : data.result.nonceStr, "package" : data.result. packagee,"signType" : "MD5", "paySign" : data.result.paySign },function(res){
		            if(res.err_msg == "get_brand_wcpay_request:ok"){  
		            	window.location.href = 'payment.html?result='+getParameter('result')+'&num='+getParameter('num')+'&payMoney='+data.result.actual_pay+'&totalMoney='+data.result.total+'&orderPayId='+data.result.orderId+'&userShopId='+userShopId+'&channel='+getParameter('channel')+'&payNumber=2';
		            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
		               
		            }else{
		               alert(res.err_msg);
		               alert("支付失败");  
		            }  
				})
			}
		}
		doPost('/pay/weiToPay',data,suc);
	},
	click:function(userShopId,rate){
		$('.orderp_left').on('click',function(){
			$('.pri_input input').focus();
		})
		$('#priceNon').on('click',function(){
			if($('#priceNon').is(':checked')){
				$('.priceNon_name').show();
				$('#name_priceNon').focus();
			}else{
				$('.priceNon_name').hide();
				$('#name_priceNon').val('');
			}
		})
		$('.pri_input input').bind('input propertychange',function(){
			if($('.pri_input input').val() == ''){
				$('.code_display').hide();
				$('.payMent').hide();
				$('.pri_input input').val('');
				$('.fexed_left .payCont').html('0.00');
				return;
			}else{
				if(parseFloat($('#name_priceNon').val()) > parseFloat($('.pri_input input').val())){
					$('#name_priceNon').val('');
				}
				if(parseInt($('.pri_input input').val()) > 9999){ 
					o.alertData('超过最大限额');
					return;
				}
				var isNum= /(^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$)/;
				
				if(isNum.test($('.pri_input input').val())){
					$('.pri_input input').attr('otype',$('.pri_input input').val())
				}else{
					$('.pri_input input').val($('.pri_input input').attr('otype'))
				}
				var priceNum = $('#name_priceNon').val()||0,
					priceDate = (parseFloat($('.pri_input input').val())-parseFloat(priceNum))*rate
				if(priceDate == 0){
					o.comData(0);
					o.hidehtml(parseFloat($('#name_priceNon').val()));
				}else{
					o.comData(priceDate+parseFloat(priceNum));
					o.hidehtml(priceDate);
				}
			}
			$('.fexed_left i').attr('pay',priceDate);
		})
		
		$('#name_priceNon').bind('input propertychange',function(){
			if($('.pri_input input').val() == ''){o.alertTwo('请确认付款总额',rate);return;}
			if($('#name_priceNon').val() == ''){
				$('#name_priceNon').val('');
				o.comData($('.pri_input input').val()*rate);
				o.hidehtml($('.pri_input input').val()*rate);
			}else{
				if(parseFloat($('#name_priceNon').val()) > parseFloat($('.pri_input input').val())){
					o.alertTwo('请确认优惠金额',rate);
					return;
				}
				if(parseInt($('#name_priceNon').val()) > 9999){ 
					o.alertTwo('超过最大限额',rate);
					return;
				}
				var isNum= /(^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$)/;
				if(isNum.test($('#name_priceNon').val())){
					$('#name_priceNon').attr('otype',$('#name_priceNon').val())
				}else{
					$('#name_priceNon').val($('#name_priceNon').attr('otype'))
				}
				var priceOne = $('.pri_input input').val(),
					priceTwo =(parseFloat(priceOne)-parseFloat($('#name_priceNon').val()))*rate; 
				if(priceTwo == 0){
					o.comData(0);
					o.hidehtml(parseFloat($('#name_priceNon').val()));
				}else{
					o.comData(priceTwo+parseFloat($('#name_priceNon').val()));
					o.hidehtml(priceTwo);
				}
				$('.fexed_left i').attr('pay',priceTwo);
			}
		})
		
		
		$('.fexed_right').on('click',function(){
			if($('.alertTan').css('display') == 'block')return;
			if($('.fexed_right').hasClass('oneClick'))return;
			if($('.pri_input input').val() == ''){
				o.alertData('请输入付款总额');
				return;
			}
			if($('.pri_input input').val() <= 0){
				o.alertData('请输入付款总额');
				return;
			}
			$('.fexed_right').addClass('oneClick');
			o.ajsxData(userShopId,rate);
		});
		$('.order_bot img').on('click',function(){
			var payCont = 0;
			if($('#name_priceNon').val() == ''){
				payCont = parseFloat($('.pri_input input').val()*rate);
			}else{
				payCont = (parseFloat($('.pri_input input').val()) - parseFloat($('#name_priceNon').val()))*rate;
			}
			if(!$('.order_bot img').hasClass('two')){
				$('.order_bot img').addClass('two');
				$('.order_bot img').attr('src','../img/mapNew2.png');
				var contt;
				if($('#name_priceNon').val() !=''){
					contt = (parseFloat($('#name_priceNon').val())+parseFloat(payCont)-$('.order_bot .order_pay').html()).toFixed(2)
				}else{
					contt = (parseFloat(priceTwo)-$('.order_bot .order_pay').html()).toFixed(2)
				}
				$('.fexed_left .payCont').html(contt);
				$('.fexed_left .payMent').show();
				$('.fexed_left .payMent').html('(折后价:￥'+payCont.toFixed(2)+')');
			}else{
				$('.order_bot img').removeClass('two');
				$('.order_bot img').attr('src','../img/mapNew1.png');
				$('.fexed_left .payCont').html(payCont.toFixed(2));
				$('.fexed_left .payMent').hide();
			}
		});
	},
	comData:function(payMoney){
		var data = {
			'userInfoId':sessionStorage.getItem('openId'),
			'payMoney': (payMoney*100).toFixed(0)
		}
		 $.ajax({
	        url : '/pay/comScore',
	        data :data,
	        type : 'POST',
	        dataType : 'json',
	        async : false,
	        success : function(data){
	        	if(data.httpCode==200){
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
						$('.order_bot .order_code').html(0);
						$('.order_bot .order_pay').html(0);
					}
		        }
	        	if(data.httpCode==500){
	        		o.alertData('输入付款金额格式有误');
		        }
	        }
	    });
	},
	ajaxDate:function(){//用户
		var suc = function(data){
			$('.order_bot .code_cont').html(data.result.score);
		}
		var data = {
			'openid':sessionStorage.getItem('openId')
		}
		doPost('/user/info',data,suc);
	},
	alertData:function(data){//用户
		$('.alertTan').show();
		$('.alertTan').html(data);
		setTimeout(function(){
			$('.alertTan').hide();
			$('.pri_input input').val('');
			$('.code_display').hide();
			$('.payMent').hide();
			$('.fexed_left .payCont').html('0.00');
		},3000)
	},
	alertTwo:function(data,rate){//不折算
		$('.alertTan').show();
		$('.alertTan').html(data);
		setTimeout(function(){
			$('#name_priceNon').val('');
			if($('.pri_input input').val() != ''){
				o.comData(parseFloat($('.pri_input input').val()*rate));
				o.hidehtml(parseFloat($('.pri_input input').val()*rate));
			}
		},1000)
		setTimeout(function(){
			$('.alertTan').hide();
		},3000)
	},
	hidehtml:function(priceTwo){
		if($('.code_display').css('display') == 'inline-block'){
			if($('.order_bot .bot_image').hasClass('one')){
				var cont=0;
				if($('#name_priceNon').val()){
					cont = (parseFloat($('#name_priceNon').val())+parseFloat(priceTwo)-$('.order_bot .order_pay').html()).toFixed(2)
				}else{
					cont = (parseFloat(priceTwo)-$('.order_bot .order_pay').html()).toFixed(2)
				}
				$('.fexed_left .payCont').html(cont);
				$('.fexed_left .payMent').show();
				$('.fexed_left .payMent').html('(折后价:￥'+priceTwo.toFixed(2)+')');
			}else{
				$('.fexed_left .payMent').hide();
				$('.fexed_left .payCont').html(priceTwo.toFixed(2));
			}
		}else{
			$('.fexed_left .payMent').hide();
			$('.fexed_left .payCont').html(priceTwo.toFixed(2));
		}
	}
	
}
o.init();