document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		$(window).scrollTop(0);
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
		window.addEventListener('message', function(event) {
			if($('.payItem li').eq(0).html() == '暂无数据')return;
		    // 接收位置信息
		    var position = event.data; 
		    if(position  && position.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
                sessionStorage.setItem('position',JSON.stringify(position));
                $('.moreDate').hide();
                $('.payItem').html('');
                var currPage = 1;
                setTimeout(function(){
					o.moreData(position.lng,position.lat,currPage);
				},100)
                 setTimeout(function(){
					o.click(position.lng,position.lat);
				},120)
            } else { 
            	$('.moreDate img').hide();
            	$('.moreDate span').html('定位失败');
            }    
		}, false); 
		
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
		var sucess = function(data){
			$('.payItem').html('');
			var result='',oData = data.result;
			if(oData.result.length == 0){
				$('.payItem').html('<li class="detailColor item bottom_load">暂无数据</li>');
            	return ;
			}
            for(var i = 0; i < oData.result.length-1; i++){
            		if(i == 0){
            			if(oData.result[i].pic.split(',').length >= 2){
            				result +=  '<li class="detailColor"><div class="payItem_left"><img src="'+oData.result[i].pic.split(',')[0]+'" alt=""  result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" />'
            			}else{
            				result +=  '<li class="detailColor"><div class="payItem_left"><img src="'+oData.result[i].pic+'" alt=""  result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/>'
            			}
            		result += '</div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left" style="    width: 25%;">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><div class="bg right"><div class="over" style="width:'+oData.result[i].averageScore.toFixed(1)*12+'px"></div></div><span class="left pay_num">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10).toFixed(1)+'</em>折</span><span class="price_remarks ">'+oData.result[i].remarks+'</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;&nbsp;&nbsp;款</span></div></div></div></li>'
            	}else if(i%2 == 0){
            		if(oData.result[i].pic.split(',').length >= 2){
        				result +=  '<li class="detailColor item_first marginright"><div class="payItem_left"><img src="'+oData.result[i].pic.split(',')[0]+'" alt=""  result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/>'
        			}else{
        				result +=  '<li class="detailColor item_first marginright"><div class="payItem_left"><img src="'+oData.result[i].pic+'" alt=""  result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/>'
        			}
            		if(oData.result[i].remarks == ''){
        				result += '</div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><span class="right pay_num" style="margin-left: 0;">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10).toFixed(1)+'</em>折</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;款</span></div></div></div></li>' 
        			}else{
        				result += '</div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left">'+oData.result[i].remarks+'</span><span class="right pay_num" style="margin-left: 0;">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10).toFixed(1)+'</em>折</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;款</span></div></div></div></li>'  
        			}
        			
            	}else{
            		if(oData.result[i].pic.split(',')){
        				result +=  '<li class="detailColor item_first marginright"><div class="payItem_left"><img src="'+oData.result[i].pic.split(',')[0]+'" alt=""  result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/>'
        			}else{
        				result +=  '<li class="detailColor item_first marginright"><div class="payItem_left"><img src="'+oData.result[i].pic+'" alt=""  result="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'"/>'
        			}
            		if(oData.result[i].remarks == ''){
        				result += '</div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left">综合评价：<em class="emStyle">'+oData.result[i].averageScore.toFixed(1)+'</em></span><span class="right pay_num" style="margin-left: 0;">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10).toFixed(1)+'</em>折</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;款</span></div></div></div></li>'  
        			}else{
        				result += '</div><div class="payItem_right"><div class="detailMain detailColor"><span class="main_title">'+oData.result[i].shopName+'</span><div class="mr_center clear"><span class="marght left">'+oData.result[i].remarks+'</span><span class="right pay_num" style="margin-left: 0;">'+oData.result[i].distance.toFixed(2)+'<em>km</em></span></div><div class="main_price clear"><span class="price_code left"><em>'+(oData.result[i].discountRate*10).toFixed(1)+'</em>折</span><span class="price_img right" data="'+JSON.stringify(oData.result[i]).replace(/"([^"]*)"/g, "'$1'")+'" type="'+oData.result[i].averageScore.toFixed(1)+'">付&nbsp;&nbsp;款</span></div></div></div></li>'  
        			}
            	}
            }
            $('.bottom_load').remove();
            $('.payItem').html(result);
		}
		doPost('/shop/geo/withInRadius',data,sucess);
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
		$('.payItem_left img').bind('click',function(){
			window.location.href = 'details.html?result='+$(this).attr('result')+'&mayself='+x+'|'+y;
		})
	}
}
o.init();

			
	