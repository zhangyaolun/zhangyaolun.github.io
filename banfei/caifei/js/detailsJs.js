
var o = {
	init:function(){
		FastClick.attach(document.body);
		$('.bot_Nav').on('click','span',function(){
			var index = $(this).index();
			$('.bot_Nav span').removeClass('stypeSpan').eq(index).addClass('stypeSpan');
			if(index == 0){
				if($('.moreNumber').html() == 0){
					$('.bot_one').show();
					$('.bot_deatil').hide();
				}else{
					$('.bot_one').show();
					$('.bot_deatil').hide();
				}
			}else{
				$('.bot_one').hide();
				$('.bot_deatil').show()
			}
		})
		var posi = JSON.parse(sessionStorage.getItem('position'));
		if(!posi){
			window.addEventListener('message', function(event) {
				var position = event.data; 
			    if(position  && position.module == 'geolocation') { 
					var oSelf = position.lng+'|'+position.lat;
					$('.map_left').attr('mapdate',oSelf);
	            }else { 
	            	o.locaSuccend();
	            }     
			}, false);
		}else{
			$('#geoPage').remove();
			var oSelf = posi.lng+'|'+posi.lat;
			$('.map_left').attr('mapdate',oSelf);
		}
		if(getParameter('result')){
			var data = JSON.parse(getParameter('result').replace(/'/g, '"'));
			console.log(data)
			o.htmlDate(data);
		}else if(getParameter('shopId')){
			sessionStorage.setItem('openId',getParameter('openId'));
			$.ajax({
		        url : '/shop/shopId/'+getParameter('shopId'),
		        data :null,
		        type : 'POST',
		        dataType : 'json',
		        async : false,
		        success : function(data){
		        	var data = data.result;
		        	o.htmlDate(data);
		        }
		    });
		}else{
			sessionStorage.setItem('openId',getParameter('openId'));
			var dataa = {
				'openid':getParameter('openId')
			}
			var sucess = function(data){
				var data = data.result;
				o.htmlDate(data);
			}
			doPost('/shop/bindedShop',dataa,sucess);
		}
	},
	locaSuccend:function(){
		var locaSuc = function(data){
			var oSelf = data.result.x+'|'+data.result.y;
			$('.map_left').attr('mapdate',oSelf);
		}
		var loca = {
			'openid':getParameter('openId')
		}
		doPost('/user/location',loca,locaSuc);
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
			if($('.bot_evaluate .bottom_load').html() == '暂无评论'){
            	return ;
            }
		　　if(scrollTop + windowHeight == scrollHeight){
			  var typeAttr = $('.bot_evaluate').attr('type').split('|');
			  var oPage = typeAttr[1];
			  oPage++;
		　　　 o.moreAjax(typeAttr[0],oPage);
		　　}
		});	
	},
	htmlDate:function(data){
		if(data.detailPic.split(',').length >= 2){
			var detailPicAttr = data.detailPic.split(','),detailPicHtml='';
			for(var s=0;s<detailPicAttr.length;s++){
				detailPicHtml+='<li><img src="'+detailPicAttr[s]+'"/></li>'
			}
			$('.bot_deatil').html(detailPicHtml); 
		}else{
			$('.bot_deatil').html('<li><img src="'+data.detailPic+'"/></li>');
		}
		if(data.pic.split(',').length >= 2){
			var picAttr = data.pic.split(','),picHtml='';
			for(var p=0;p<picAttr.length;p++){
				picHtml+='<div class="swiper-slide"><img src="'+picAttr[p]+'" alt="" /></div>'
			}
			$('.swiper-wrapper').html(picHtml);
			var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    loop: true,
			    autoplay : 1500,
			    autoplayDisableOnInteraction : false,
			    pagination: '.swiper-pagination',
			    paginationClickable :true,
			 })    
		}else{
			$('.swiper-wrapper').html('<div class="swiper-slide"><img src="'+data.pic+'" alt="" /></div>');
			var mySwiper = new Swiper ('.swiper-container', {
				loop: false,
			 })     
		}	
		$('.detailMain .main_title').html(data.shopName);				
		$('.detailMain .emStyle').html(data.averageScore.toFixed(1));				
		$('.detailMain .over').css('width',data.averageScore.toFixed(1)*12+'px');
		$('.map_left').attr('type',data.latitude+'|'+data.longitude+'|'+data.distance+'|'+data.address+'|'+data.shopName+'|'+data.address+'|'+data.telephone);			
		$('.map_left .map_tit em').html(data.address);	
		$('.map_left .map_tel a').html(data.telephone);
		$('.main_price em').html((data.discountRate*10).toFixed(1));	
		$('.main_price .price_title').html(data.remarks);		
		var currPage = 1;
		 setTimeout(function(){
			o.moreAjax(data.id,currPage);
		},100)
		  setTimeout(function(){
			o.moreDate();
		},200)
		    setTimeout(function(){
			o.click('',data);
		},200)
	},
	moreAjax:function(id,currPage){
		var data = {
			'shopId':id,
			'currPage':currPage,
			'pageSize':10
		}
		var oType = id+'|'+currPage;
		$('.bot_evaluate').attr('type',oType);
		$.ajax({
	        url :'/comment/findByShop',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	if(data.httpCode == 200){
	        		var result = '',oResult = '',num=0;
	        		$('.moreNumber').html(data.result.totalCount);	
	        		if(data.result.result.length == 0){
	        			$('.bot_evaluate').append('<li class="detailColor item bottom_load">暂无评论</li>');
		            	return ;
		            }
	        		for(var i = 0; i < data.result.result.length; i++){
	                     result += '<li class="detailColor item clear"><img src="'+data.result.result[i].userIcon+'" alt="" class="evaluate_img left"><div class="evaluate_right left"><div class="ri_name">'+data.result.result[i].nickName+'</div><div class="ri_date"><div class="bg left"><div class="over" style="width:'+12*data.result.result[i].score+'px""></div></div><div class="dateTime right">'+data.result.result[i].createTime+'</div></div><span>'+data.result.result[i].content+'</span><div class="clear ri_image">';
	                    if(data.result.result[i].commentImages == ''){
	                    	oResult = '';
	                    }else{
	                    	oResult = '';
	                    	if(data.result.result[i].commentImages.indexOf(",")>0){
	                    		var imageAttr = data.result.result[i].commentImages.split(',');
		                    	for(var z = 0; z < imageAttr.length; z++){
		                    		oResult += '<img src="'+imageAttr[z]+'" alt="" class="left ri_image" pic="'+imageAttr+'" index="'+z+'"/>'
		                    	}
	                    	}else{
	                    		oResult = '<img src="'+data.result.result[i].commentImages+'" alt="" class="left ri_image" pic="'+data.result.result[i].commentImages+'" index="1"/>'
	                    	}
	                    }
		                result += oResult+ '</div></div></li>';
	                }
	        		$('.bottom_load').remove();
		            $('.bot_evaluate').append(result);
		            
		            if(data.result.pageNo == data.result.totalPages){
		            	$('.bot_evaluate').append('<li class="detailColor item bottom_load">暂无评论</li>');
		            	return ;
		            }
	        	}
	        }
	    })
	},
	click:function(mayself,data){
		$('.bot_evaluate ').bind('click','img',function(event){
        	if(event.target.classList.value == 'left ri_image'){
        		window.location.href = 'bigImage.html?pic='+event.target.attributes.pic.value+'&index='+event.target.attributes.index.value;
        	}
        })
		/*跳转到地图*/
		$('.map_tit').on('click',function(){	
			if($('.map_left').attr('mapdate') == '')return;
			if(mayself){
				window.location.href = 'map.html?type='+$('.map_left').attr('type')+'&mayself='+mayself;
			}else{
				if(!$('.map_left').attr('mapdate')){
					var oSelf = data.longitude+'|'+data.latitude;
					$('.map_left').attr('mapdate',oSelf);
				}
				window.location.href = 'map.html?type='+$('.map_left').attr('type')+'&mayself='+$('.map_left').attr('mapdate');
			}
		})
		/*电话*/
		$('.map_tel').on('click',function(){
			if(!$('.map_tel a').html())return;
			$('.map_tel a').attr('href','tel:'+$('.map_tel a').html());
		})
		/*付款*/
		$('.price_img').on('click',function(){
			if(getParameter('openId')){
				window.location.href = 'orderShop.html?result='+JSON.stringify(data).replace(/"([^"]*)"/g, "'$1'")+'&num='+$('.detailMain .emStyle').html()+'&channel='+getParameter('channel');
			}else{
				window.location.href = 'orderShop.html?result='+getParameter('result')+'&num='+$('.detailMain .emStyle').html();
			}
		})
		/*回到顶部*/
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').css('display','none');
		})
	}
}
o.init();