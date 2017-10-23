document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		$(window).scrollTop(0);
		sessionStorage.setItem('openId',getParameter('openId'));
		var position = JSON.parse(sessionStorage.getItem('position'));
		setTimeout(function(){
			if(!position){
				$('.moreDate div').css('width','60%');
				$('.moreDate div').css('left','20%');
				$('.moreDate').show();
				$('.moreDate img').hide();
        		$('.moreDate span').html('请检查是否开启微信定位授权');
			}
		},15000)
		if(!position){
			window.addEventListener('message', function(event) {
				if($('.nearbyMain li').eq(0).html() == '暂无数据')return;
			    // 接收位置信息
			    var position = event.data; 
			    if(sessionStorage.getItem('position'))return;
			    if(position  && position.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
	                sessionStorage.setItem('position',JSON.stringify(position));
	                $('.moreDate').hide();
	                $('.nearbyMain').html('');
	                var currPage = 1,order = '',type = '';
					o.moreData(position.lng,position.lat,currPage,order,type,0,$('.nearbyBox input').val());
					o.moreLoad(position.lng,position.lat,currPage,order,type,0,$('.nearbyBox input').val());
					o.click(position.lng,position.lat);
	            } else { 
	            	$('.moreDate img').hide();
	            	$('.moreDate span').html('定位失败');
	            }
			    console.log(position);      
			}, false); 
		}else{    
			$('.moreDate').hide();
			var currPage = 1,order = '',type = '';
			o.moreData(position.lng,position.lat,currPage,order,type,0,$('.nearbyBox input').val());
			o.moreLoad(position.lng,position.lat,currPage,order,type,0,$('.nearbyBox input').val());
			o.click(position.lng,position.lat);
		}
	},
	moreData:function(x,y,currPage,order,type,oName){
		var result='';
		var data = {
			'x':x,
			'y':y,
			'radius':100,
			'currPage':currPage,
			'pageSize':10,
			'order':order,
			'type':type
		}
		var oType = x+'|'+y+'|'+currPage+'|'+order+'|'+type+'|'+oName;
		$('.nearbyMain').attr('type',oType);
		var urlDate = ['/shop/geo/withInRadius','/shop/search'],
			oUrl = urlDate[0];
		
		if(oName != ''){
			data.shopName = oName;
			data.radius = '';
			oUrl = urlDate[1];
		}
		console.log(data)
		var sucess = function(data){
			console.log(data)
			var result='',oData = data.result;
			if(currPage == 1){$('.nearbyMain').html('');}
			if(oData.result.length == 0){
				$('.nearbyMain').append('<li class="detailColor item bottom_load">暂无数据</li>');
            	return ;
			}
            for(var i = 0; i < oData.result.length; i++){
                result +=   '<li class="clear detailColor" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"><div class="main_left left "><img src="'+oData.result[i].pic+'" alt="" /></div><div class="main_right left"><div class="mr_top clear"><span class="left mr_title">'+oData.result[i].shopName+'</span></div><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><span class="left">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span><div class="bg right"><div class="over" style="width:'+oData.result[i].averageScore.toFixed(1)*12+'px"></div></div></div><div class="mr_price"><span class="priceNew">折扣：<em>'+(oData.result[i].discountRate*10)+'折</em></span></div></div></li>';
            }
            $('.bottom_load').remove();
            $('.nearbyMain').append(result);
    		
            if(data.result.pageNo == data.result.totalPages &&  $('.nearbyMain li').length > 4){
            	$('.nearbyMain').append('<li class="detailColor item bottom_load">暂无数据</li>');
            	return ;
            }else{
            	if($(window).scrollTop() > 0){
            		$('.nearbyMain').append('<li class="detailColor item bottom_load">加载中...</li>');
            	}
            } 
             var scrollTop = $(this).scrollTop();
		　　 var scrollHeight = $(document).height();
		　　 var windowHeight = $(this).height();
		
		　　 if(scrollTop + windowHeight < scrollHeight){
				$('.nearbyMain .bottom_load').remove();
			}
		}
		doPost(oUrl,data,sucess);
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
			if($('.nearbyMain .bottom_load').html() == '暂无数据'){
            	return ;
			}
		　　if(scrollTop + windowHeight == scrollHeight){
			   currPage++;
			   var typeAttr = $('.nearbyMain').attr('type').split('|'); 
		　　　 o.moreData(typeAttr[0],typeAttr[1],currPage,typeAttr[3],typeAttr[4],typeAttr[5]);
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
			$('.listItem').css('display','none');
			var oOder = ['',0,1];
			for(var i=0;i<3;i++){
				if($('.nearbyNav li').eq(i).hasClass('navStyle')){
					$(window).scrollTop(0);
					$('.nearbyMain').removeClass('one');
					$('.dropload-down').remove();
					$('.nearbyMain').html('');
					$('.back').css('display','none');
					var oType = '';
					for(var s=0;s<$('.listItem li').length;s++){
						console.log($('.listItem li').eq(s).css('color'))
						if($('.listItem li').eq(s).css('color') == 'rgb(0, 0, 0)'){
							s == 0?oType = '':oType = s-1;
						}
					}
					o.moreData(x,y,1,oOder[i],oType,$('.nearbyBox input').val());
				}
			}
		})
		
		/*点击li查看详情*/
		$('.nearbyMain').on('click','li',function(){
			if($(this).attr('data')){
				window.location.href = 'details.html?result='+$(this).attr('data')+'&mayself='+x+'|'+y;
			}else{
				return;
			}
		})
		/*筛选*/
		$('.navtLast').on('click',function(){
			$('.listItem').css('display')=='none'?$('.listItem').css('display','block'):$('.listItem').css('display','none');
		})
		/*最受欢迎*/
		$('.navtTwo').on('click',function(){
			conmmont();
			$(this).addClass('navStyle');
			var oType = '';
			for(var s=0;s<$('.listItem li').length;s++){
				console.log($('.listItem li').eq(s).css('color'))
				if($('.listItem li').eq(s).css('color') == 'rgb(0, 0, 0)'){
					s == 0?oType = '':oType = s-1;
				}
			}
			o.moreData(x,y,1,1,oType,$('.nearbyBox input').val());
		})
		/*距离最近*/
		$('.navtTree').on('click',function(){
			conmmont();
			$(this).addClass('navStyle');
			var oType = '';
			for(var s=0;s<$('.listItem li').length;s++){
				console.log($('.listItem li').eq(s).css('color'))
				if($('.listItem li').eq(s).css('color') == 'rgb(0, 0, 0)'){
					s == 0?oType = '':oType = s-1;
				}
			}
			o.moreData(x,y,1,0,oType,$('.nearbyBox input').val());
		})
		/*综合*/
		$('.navtFrist').on('click',function(){
			conmmont();
			$(this).addClass('navStyle');
			var oType = '';
			for(var s=0;s<$('.listItem li').length;s++){
				console.log($('.listItem li').eq(s).css('color'))
				if($('.listItem li').eq(s).css('color') == 'rgb(0, 0, 0)'){
					s == 0?oType = '':oType = s-1;
				}
			}
			o.moreData(x,y,1,'',oType,$('.nearbyBox input').val());
		})
		/*筛选*/
		$('.listItem').on('click','li',function(){
			var index = $(this).index(),
				oAttr = ['',0,1,2,3,4],
				oOder = [0,1];
			$('.listItem li').css('color','#777').eq(index).css('color','#000');
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
		})
		function conmmont(){
			$('.listItem').css('display','none');
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

			
	