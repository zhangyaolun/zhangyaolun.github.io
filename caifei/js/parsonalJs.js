document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
		init:function(){
			FastClick.attach(document.body);
			sessionStorage.setItem('openId',getParameter('openId'));
			o.ajaxDate();
			var aPage = 1,cPage = 1;
			o.subReferences(aPage);
			o.oClick();
		},
		ajaxDate:function(){//用户
			var suc = function(data){
				console.log(data)
				$('.per_image').attr('src',data.result.headimgurl);
				$('.per_image').attr('oid',data.result.id);
				$('.per_top span').html(data.result.nickname);
				$('.bor_list span').html(data.result.score);
				if(data.result.type == 2){
					$('.per_code').show();
					o.aClick();
				}
				if(data.result.isShop){
					$('.item_login').show();
				}
			}
			var data = {
				'openid':getParameter('openId')
			}
			doPost('/user/info',data,suc);
		},
		subReferences:function(aPage){//粉丝
			var suc = function(data){
				console.log(data)
				var oAttr = [];
				if(data.result.result == ''){
					return;
				}else{
					$('.per_bot .per_num .last_img').css('margin-top','5%');
					oAttr.push(data.result.result);
			        aPage++;
			        var num = data.result.totalPages;
			        for(var i=aPage;i<=num;i++){
			           	var data = {
							'userId':$('.per_image').attr('oid'),
							'currPage':i,
							'pageSize':20
						}
					    $.ajax({
				       		url : '/user/subReferences',
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
					var result = '',oResult = '',moreAttr=[];
					for(var s = 0;s < oAttr.length; s++){
						for(var j = 0;j < oAttr[s].length; j++){
							moreAttr.push(oAttr[s][j]);
						}
					}
					$('.per_num em').html(moreAttr.length);
					for(var x=0,a=moreAttr.length;x<a;x++){
						if(x>23){
							oResult += '<li><img src="'+moreAttr[x].headimgurl+'"/><div class="last_title">'+moreAttr[x].nickname+'</div></li>'
						}else{
							result += '<li><img src="'+moreAttr[x].headimgurl+'"/><div class="last_title">'+moreAttr[x].nickname+'</div></li>'
							if(x == 23){
								if(moreAttr.length > 24){
									result += '<li class="lastImg_more"><img src="../img/add_img.png"/></li>'
								}
							}
						}
					}
					$('.last_img').html('');
					$('.last_img').append(result);
					o.dClick(oResult);
				}
				
			}
			var data = {
				'userId':$('.per_image').attr('oid'),
				'currPage':aPage,
				'pageSize':20
			}
			doPost('/user/subReferences',data,suc);
		},
		oClick:function(){//记录
			$('.item_history').on('click',function(){
				window.location.href = 'consume.html?openId='+getParameter('openId');
			});
			$('.bor_list').on('click',function(){
				window.location.href = 'shopCode.html?userId='+$('.per_image').attr('oid');
			});
			$('.item_login').on('click',function(){
				window.location.href = '../html_pt/login.html';
			});
		},
		dClick:function(data){//粉丝
			$('.last_img .lastImg_more').bind('click',function(){
				$('.lastImg_more').hide();
				$('.last_img').append(data);
			});
		},
		aClick:function(){//我的推广员
			$('.per_code').bind('click',function(){
				window.location.href = 'perMend.html?openId='+getParameter('openId')+'&oid='+$('.per_image').attr('oid');
			});
		}
		
	}
	o.init();
