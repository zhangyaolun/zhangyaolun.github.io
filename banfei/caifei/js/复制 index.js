
var o = {
	init:function(){
		FastClick.attach(document.body);
		$(window).scrollTop(0);
		var geolocation = new qq.maps.Geolocation();
		var options = {timeout: 9000};
		geolocation.getIpLocation(showPosition, showErr);
		function showPosition(position){
			var currPage = 1,order = '',type = '';
			o.moreData(position.lng,position.lat,currPage,order,type,0,$('.nearbyBox input').val());
			o.click(position.lng,position.lat);
		}
		function showErr(){
			
		}
		$(window).scroll(function(){
			if ($(window).scrollTop() != '0'){
				$('.back').show();
			}else{
				$('.back').hide();
			}
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		
		　　/*if(scrollTop + windowHeight == scrollHeight){
			   currPage++;
			   
		　　　 o.moreAjax(id,currPage);
		　　}*/
		});	
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
		
		var urlDate = ['/shop/geo/withInRadius','/shop/search'],
			oUrl = urlDate[0];
		
		if(oName != ''){
			data.shopName = oName;
			oUrl = urlDate[1];
		}
		var sucess = function(data){
			console.log(data)
			var result='',oData = data.result;
            for(var i = 1; i < oData.result.length; i++){
            	var num = oData.result[i].distance*1000;
                result +=   '<li class="clear detailColor" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"><div class="main_left left "><img src="'+oData.result[i].pic+'" alt="" /></div><div class="main_right left"><div class="mr_top clear"><span class="left">'+oData.result[i].shopName+'</span><div class="bg right"><div class="over" style="width:.516rem"></div></div></div><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore+'</em></span><span class="right">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="mr_price"><span class="priceNew">折扣：<em>'+oData.result[i].discountRate.toFixed(2)*100+'折</em></span></div></div></li>';
            }
            $('.nearbyMain').append(result);
            
           if($('.nearbyMain').hasClass('one')){
           		return ;
           }else{
               	$('.nearbyMain').addClass('one');
               	o.moreLoad(x,y,currPage,order,type,oData.totalPages,oName);
           }
		}
		doPost(oUrl,data,sucess);
		
		/*$.ajax({
	        url : oUrl,
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	console.log(data);
	        	if(data.httpCode == 200){
	        	}
	        }
	   });*/
	},
	moreLoad:function(x,y,currPage,order,type,totalPages,oName){	
	    $('.more').dropload({
	        scrollArea : window,
	        domDown: {
	          domNoData: '<div class="dropload-noData"><span>暂无数据</span></div>'
	        },
	        loadDownFn : function(me){
	        	if(currPage > totalPages){
                     me.$domDown.html(me.opts.domDown.domNoData);
	            	return;
                }
	        	currPage++;
	        	if($('.nearbyMain li').length <= currPage*10){
	        		o.moreData(x,y,currPage,order,type,oName);
	        		me.resetload();
	        	}
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

			
	