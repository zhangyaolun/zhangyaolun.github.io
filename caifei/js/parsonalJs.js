document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
		init:function(){
			FastClick.attach(document.body);
			sessionStorage.setItem('openId',getParameter('openId'));
			o.ajaxDate();
			o.oClick();
		},
		ajaxDate:function(){
			var suc = function(data){
				$('.per_image').attr('src',data.result.headimgurl);
				if(data.result.score == ''){
					$('.main_num span').html('0');
				}else{
					$('.main_num span').html(data.result.score);
				}
				$('.per_last em').html(data.result.recommendedUsers.length);
				var result = '',oResult = '';
				for(var i=0,a=data.result.recommendedUsers.length;i<a;i++){
					if(i>8){
						oResult += '<li><img src="'+data.result.recommendedUsers[i].headimgurl+'"/><div class="last_title">'+data.result.recommendedUsers[i].nickname+'</div></li>'
					}else{
						result += '<li><img src="'+data.result.recommendedUsers[i].headimgurl+'"/><div class="last_title">'+data.result.recommendedUsers[i].nickname+'</div></li>'
						if(i == 8){
							if(data.result.recommendedUsers.length > 9){
								result += '<li class="lastImg_more"><img src="../img/add_img.png"/></li>'
							}
						}
					}
				}
				$('.last_img').html('');
				$('.last_img').append(result);
				o.dClick(oResult);
			}
			var data = {
				'openid':getParameter('openId')
			}
			doPost('/user/info',data,suc);
		},
		oClick:function(){
			$('.item_history').on('click',function(){
				window.location.href = 'consume.html?openId='+getParameter('openId');
			});
		},
		dClick:function(data){
			$('.last_img .lastImg_more').on('click',function(){
				$('.lastImg_more').hide();
				$('.last_img').append(data);
			});
		}
	}
	o.init();