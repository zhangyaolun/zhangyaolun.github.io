var o = {
	init:function(){
		$('.per_myself').attr('src','/user/promoter-qrcode?openid='+getParameter('openId'));
		var aPage = 1,oPage = 1;
		o.subShops(oPage);
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
							'userId':getParameter('oid'),
							'currPage':i,
							'pageSize':20
						}
					    $.ajax({
				       		url : '/user/subPromoters',
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
						if(x>13){
							oResult += '<li><img src="'+moreAttr[x].headimgurl+'"/><div class="last_title">'+moreAttr[x].nickname+'</div></li>'
						}else{
							result += '<li><img src="'+moreAttr[x].headimgurl+'"/><div class="last_title">'+moreAttr[x].nickname+'</div></li>'
							if(x == 13){
								if(moreAttr.length > 14){
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
				'userId':getParameter('oid'),
				'currPage':aPage,
				'pageSize':20
			}
			doPost('/user/subPromoters',data,suc);
	},
	subShops:function(aPage){//店铺
		var suc = function(data){
			console.log(data)
			var oAttr = [];
			if(data.result.result == ''){
				return;
			}else{
				$('.per_bot .per_last .last_item').css('margin-top','5%');
				oAttr.push(data.result.result);
				console.log(oAttr)
		        aPage++;
		        var num = data.result.totalPages;
		         for(var i=aPage;i<=num;i++){
		           	var data = {
						'userId':getParameter('oid'),
						'currPage':i,
						'pageSize':20
					}
				    $.ajax({
			       		url : '/user/subShops',
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
				$('.per_last em').html(moreAttr.length);
				for(var x=0,a=moreAttr.length;x<a;x++){
					if(x>12){/*'+moreAttr[x].shopName+'*/
						oResult += '<li><img src="'+moreAttr[x].shopPic+'"/><div class="last_title"></div></li>'
					}else{
						result += '<li><img src="'+moreAttr[x].shopPic+'"/><div class="last_title"></div></li>'
						if(x == 12){
							if(moreAttr.length > 13){
								result += '<li class="lastImg_more"><img src="../img/add_img.png" style="border-radius: 50%;height: 70%"/></li>'
							}
						}
					}
				}
				$('.last_item').html('');
				$('.last_item').append(result);
				o.zClick(oResult);
			}
		}
		var data = {
			'userId':getParameter('oid'),
			'currPage':aPage,
			'pageSize':20
		}
		doPost('/user/subShops',data,suc);
	},
	dClick:function(data){
		$('.last_img .lastImg_more').bind('click',function(){
			$('.last_img .lastImg_more').hide();
			$('.last_img').append(data);
		});
	},
	zClick:function(data){//店铺
		$('.last_item .lastImg_more').bind('click',function(){
			$('.last_item .lastImg_more').hide();
			$('.last_item').append(data);
		});
	}
}
o.init();




