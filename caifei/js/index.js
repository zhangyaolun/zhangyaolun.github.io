
var o = {
	init:function(){
		FastClick.attach(document.body);
		$(window).scrollTop(0);
		var geolocation = new qq.maps.Geolocation();
		var options = {timeout: 9000};
		geolocation.getLocation(showPosition, showErr, options);
		/*geolocation.getIpLocation(showPosition, showErr);*/
		console.log('position');
		function showPosition(position){
			console.log(position);
			var currPage = 1,order = '',type = '';
			o.moreData(position.lng,position.lat,currPage,order,type,0,$('.nearbyBox input').val());
			o.click(position.lng,position.lat);
		}
		function showErr(){
			geolocation.getLocation(showPosition, showErr, options);
		}
		
	},
	moreData:function(x,y,currPage,order,type,oName){
		var result='';
		var data = {
			'x':x,
			'y':y,
			'radius':3,
			'currPage':currPage,
			'pageSize':10,
			'order':order,
			'type':type
		}
		console.log(data)
		var urlDate = ['/shop/geo/withInRadius','/shop/search'],
			oUrl = urlDate[0];
		
		if(oName != ''){
			data.shopName = oName;
			oUrl = urlDate[1];
		}
		var sucess = function(data){
			console.log(data)
			var result='',oData = data.result;
			if(oData.result.length == 0){
				$('.nearbyMain').append('<li class="detailColor item bottom_load">暂无数据</li>');
            	return ;
			}
            for(var i = 0; i < oData.result.length; i++){
            	var num = oData.result[i].distance*1000;
                result +=   '<li class="clear detailColor" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"><div class="main_left left "><img src="'+oData.result[i].pic+'" alt="" /></div><div class="main_right left"><div class="mr_top clear"><span class="left">'+oData.result[i].shopName+'</span><div class="bg right"><div class="over" style="width:'+oData.result[i].averageScore.toFixed(1)*0.12+'rem"></div></div></div><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><span class="right">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="mr_price"><span class="priceNew">折扣：<em>'+(oData.result[i].discountRate*100).toFixed(0)+'折</em></span></div></div></li>';
            }
            $('.bottom_load').remove();
            $('.nearbyMain').append(result);
    		
            if(data.result.pageNo == data.result.totalPages){
            	$('.nearbyMain').append('<li class="detailColor item bottom_load">暂无数据</li>');
            	return ;
            }else{
            	if($(window).scrollTop() > 0){
            		$('.nearbyMain').append('<li class="detailColor item bottom_load">加载中...</li>');
            	}
            } 
            
           if($('.nearbyMain').hasClass('one')){
           		return ;
           }else{
               	$('.nearbyMain').addClass('one');
               	o.moreLoad(x,y,currPage,order,type,oData.totalPages,oName);
           }
		}
		doPost(oUrl,data,sucess);
		
		
	},
	moreLoad:function(x,y,currPage,order,type,totalPages,oName){	
		$(window).scroll(function(){
			if ($(window).scrollTop() != '0'){
				$('.back').show();
			}else{
				$('.back').hide();
			}
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		
		　　if(scrollTop + windowHeight == scrollHeight){
			   currPage++;
		　　　 o.moreData(x,y,currPage,order,type,totalPages,oName);
		　　}
		});	
	    
	},
	click:function(x,y){
		/*回到顶部*/
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').hide();
		})
		/*去地图*/
		$('.mapImg').on('click',function(){
			window.location.href = 'map.html?index='+x+'|'+y;
		})
		/*个人*/
		$('.nearbyBox .seachImg').on('click',function(){
			var oOder = ['',0,1];
			for(var i=0;i<3;i++){
				if($('.nearbyNav li').eq(i).hasClass('navStyle')){
					$(window).scrollTop(0);
					$('.nearbyMain').removeClass('one');
					$('.dropload-down').remove();
					$('.nearbyMain').html('');
					$('.back').css('display','none');
					o.moreData(x,y,1,oOder[i],'',$('.nearbyBox input').val());
				}
			}
			/*window.location.href = 'personal.html';*/
		})
		
		/*点击li查看详情*/
		$('.nearbyMain').on('click','li',function(){
			console.log($(this).attr('data'))
			window.location.href = 'details.html?result='+$(this).attr('data')+'&mayself='+x+'|'+y;
		})
		/*筛选*/
		$('.nav_click').on('click',function(){
			$('.listItem').css('display')=='none'?$('.listItem').css('display','block'):$('.listItem').css('display','none');
		})
		/*最受欢迎*/
		$('.navtTwo').on('click',function(){
			conmmont();
			$(this).addClass('navStyle');
			o.moreData(x,y,1,1,0,$('.nearbyBox input').val());
		})
		/*距离最近*/
		$('.navtTree').on('click',function(){
			conmmont();
			$(this).addClass('navStyle');
			o.moreData(x,y,1,0,0,$('.nearbyBox input').val());
		})
		/*综合*/
		$('.navtFrist').on('click',function(){
			conmmont();
			$(this).addClass('navStyle');
			o.moreData(x,y,1,0,0,$('.nearbyBox input').val());
		})
		/*筛选*/
		$('.listItem').on('click','li',function(){
			var index = $(this).index(),
				oAttr = ['',0,1,2,3],
				oOder = ['',0,1];
			for(var i=0;i<3;i++){
				if($('.nearbyNav li').eq(i).hasClass('navStyle')){
					$(window).scrollTop(0);
					$('.nearbyMain').removeClass('one');
					$('.dropload-down').remove();
					$('.nearbyMain').html('');
					$('.back').css('display','none');
					o.moreData(x,y,1,oOder[i],oAttr[index],$('.nearbyBox input').val());
				}
			}
			$('.listItem').css('display')=='none'?$('.listItem').css('display','block'):$('.listItem').css('display','none');
		})
		function conmmont(){
			$(window).scrollTop(0);
			$('.nearbyMain').removeClass('one');
			$('.dropload-down').remove();
			$('.nearbyMain').html('');
			$('.back').hide();
			$('.nearbyNav').children("li").removeClass('navStyle');			
		}
	}
}
o.init();

			
	