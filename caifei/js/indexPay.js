document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		$(window).scrollTop(0);
		sessionStorage.setItem('openId',getParameter('openId'));
		var position = JSON.parse(sessionStorage.getItem('position'));
		setTimeout(function(){
			var parse = JSON.parse(sessionStorage.getItem('position'));
			if(!parse){
				$('.moreDate div').css('width','60%');
				$('.moreDate div').css('left','20%');
				$('.moreDate').show();
				$('.moreDate img').hide();
        		$('.moreDate span').html('请检查是否开启微信定位授权');
			}
		},15000)
		if(!position){
			window.addEventListener('message', function(event) {
				if($('.payItem li').eq(0).html() == '暂无数据')return;
			    // 接收位置信息
			    var position = event.data; 
			    if(sessionStorage.getItem('position'))return;
			    if(position  && position.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
	                sessionStorage.setItem('position',JSON.stringify(position));
	                $('.moreDate').hide();
	                $('.payItem').html('');
	                var currPage = 1;
					o.moreData(position.lng,position.lat,currPage);
					o.moreLoad(position.lng,position.lat,currPage);
					o.click(position.lng,position.lat);
	            } else { 
	            	$('.moreDate img').hide();
	            	$('.moreDate span').html('定位失败');
	            }    
			}, false); 
		}else{    
			$('.moreDate').hide();
			var currPage = 1;
			o.moreData(position.lng,position.lat,currPage);
			o.moreLoad(position.lng,position.lat,currPage);
			o.click(position.lng,position.lat);
		}
	},
	moreData:function(x,y,currPage){
		var result='';
		var data = {
			'x':x,
			'y':y,
			'radius':100,
			'currPage':currPage,
			'pageSize':10,
			'order':0,
			'type':''
		}
		var oType = x+'|'+y;
		$('.payItem').attr('type',oType);
		console.log(data)
		var sucess = function(data){
			console.log(data)
			var result='',oData = data.result;
			if(currPage == 1){$('.payItem').html('');}
			if(oData.result.length == 0){
				$('.payItem').append('<li class="detailColor item bottom_load">暂无数据</li>');
            	return ;
			}
            for(var i = 0; i < oData.result.length; i++){
            	if(i == 0){
            		result +=  '<li class="detailColor"><div class="payItem_left"><img src="'+oData.result[i].pic+'" alt=""  result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/></div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><div class="bg right"><div class="over" style="width:'+oData.result[i].averageScore.toFixed(1)*12+'px"></div></div><span class="left pay_num">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10)+'</em>折</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;&nbsp;&nbsp;款</span></div></div></div></li>'
            	}else if(i%2 == 0){
            		result +=  '<li class="detailColor item_first marginLeft" ><div class="payItem_left"><img src="'+oData.result[i].pic+'" alt="" result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/></div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><span class="right pay_num" style="margin-left: 0;">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10)+'</em>折</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;款</span></div></div></div></li>'
            	}else{
            		result +=  '<li class="detailColor item_first marginright" ><div class="payItem_left"><img src="'+oData.result[i].pic+'" alt="" result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/></div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><span class="right pay_num" style="margin-left: 0;">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10)+'</em>折</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;款</span></div></div></div></li>'
            	}
                
            }
            $('.bottom_load').remove();
            $('.payItem').append(result);
    		
            if(data.result.pageNo == data.result.totalPages &&  $('.nearbyMain li').length > 4){
            	$('.payItem').append('<li class="detailColor item bottom_load">暂无数据</li>');
            	return ;
            }else{
            	if($(window).scrollTop() > 0){
            		$('.payItem').append('<li class="detailColor item bottom_load">加载中...</li>');
            	}
            } 
             var scrollTop = $(this).scrollTop();
		　　 var scrollHeight = $(document).height();
		　　 var windowHeight = $(this).height();
		
		　　 if(scrollTop + windowHeight < scrollHeight){
				$('.payItem .bottom_load').remove();
			}
		}
		doPost('/shop/geo/withInRadius',data,sucess);
	},
	moreLoad:function(x,y,currPage,order,type,oName){	
		$(window).scroll(function(){
			$('.listItem').css('display','none');
			if ($(window).scrollTop() != '0'){
				$('.back').show();
			}else{
				$('.back').hide();
			}
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
			if($('.payItem .bottom_load').html() == '暂无数据'){
            	return ;
			}
		　　if(scrollTop + windowHeight == scrollHeight){
			   currPage++;
			   var typeAttr = $('.payItem').attr('type').split('|'); 
		　　　 o.moreData(typeAttr[0],typeAttr[1],currPage);
		　　}
		});	
	    
	},
	click:function(x,y){
		/*回到顶部*/
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').hide();
		})
		/*点击li查看详情*/
		$('.price_img').on('click',function(){
			console.log($(this).attr('type'))
			window.location.href = 'orderShop.html?result='+$(this).attr('data')+'&num='+$(this).attr('type');
		})
		$('.payItem_left img').on('click',function(){
			window.location.href = 'details.html?result='+$(this).attr('result')+'&mayself='+x+'|'+y;
		})
	}
}
o.init();

			
	