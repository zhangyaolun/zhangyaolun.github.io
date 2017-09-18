window.onload=function(){
    if(document.body.scrollTop>0){
        window.scrollTo(0,-1);
        document.body.scrollTop=0;
    }
    window.scrollTo(0,-1);
    document.body.scrollTop=0;
}
var o = {
	init:function(){
		FastClick.attach(document.body);
		$('.bot_Nav').on('click','span',function(){
			var index = $(this).index();
			$('.bot_Nav span').removeClass('stypeSpan').eq(index).addClass('stypeSpan');
			if(index == 0){
				$('.bot_one').show();
				$('.bot_deatil').hide()
			}else{
				$('.bot_one').hide();
				$('.bot_deatil').show()
			}
		})
		var data = JSON.parse(getParameter('result').replace(/'/g, '"'));
		console.log(data)
		$('.detailImg img').attr("src",data.pic);			
		$('.detailImg span').html(data.shopName);			
		$('.map_left span').html(data.shopName);			
		$('.map_left').attr('type',data.latitude+'|'+data.longitude+'|'+data.distance+'|'+data.address+'|'+data.shopName+'|'+data.address+'|'+data.mobile);			
		$('.map_left em').html(data.address);			
		$('.main_price em').html((data.discountRate*100).toFixed(0));	
		$('.address span').html(data.address);	
		$('.phone span').html(data.mobile);	
		var currPage = 1;
		o.moreDate(data.id,currPage);
		o.moreAjax(data.id,currPage);
		o.click(getParameter('mayself'));
	},
	moreDate:function(id,currPage){
		$(window).scroll(function(){
			if ($(window).scrollTop() != '0'){
				$('.back').css('display','block');
			}else{
				$('.back').css('display','none');
			}
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		
		　　if(scrollTop + windowHeight == scrollHeight){
			   currPage++;
		　　　 o.moreAjax(id,currPage);
		　　}
		});	
	},
	moreAjax:function(id,currPage){
		var data = {
			'shopId':'7b942ce200ae46d480aa752e1824e288',
			'currPage':currPage,
			'pageSize':10
		}
		console.log(data)
		$.ajax({
	        url :'/comment/findByShop',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	console.log(data);
	        	if(data.httpCode == 200){
	        		var result = '',oResult = '',num=0;
	        		$('.moreNumber').html(data.result.totalCount);	
	        		if(data.result.result.length == 0){
		            	$('.bot_evaluate').append('<li class="detailColor item bottom_load">暂无评论</li>');
		            	return ;
		            }
	        		for(var i = 0; i < data.result.result.length; i++){
	        			num = parseFloat(data.result.result[i].score) + parseFloat(num);
	                    result += '<li class="detailColor item"><div class="evaluate_img clear"><img src="'+data.result.result[i].userIcon+'" alt="" class="left"/><div class="left evaluate_top"><div class="ri_name">'+data.result.result[i].nickName+'</div><div class="ri_date clear"><div class="bg left"><div class="over" style="width:'+0.12*data.result.result[i].score+'rem"></div></div><div class="dateTime right">'+data.result.result[i].createTime+'</div></div></div></div><div class="evaluate_right"><p>'+data.result.result[i].content+'</p><div class="clear ri_image">';
	                    if(data.result.result[i].commentImages == ''){
	                    	oResult = '';
	                    }else{
	                    	
	                    }
		                	
		                result += oResult+ '</div><div class="ri_map"><img src="../img/icon2.png" alt="" /><span>'+$('.map_left em').html()+'</span></div></div></li>';
	                }
	        		
	        		if(!$('.number').hasClass('frist')){
	        			$('.number').addClass('frist');
	        			$('.number').html((num/data.result.totalCount*10).toFixed(1));
	        		}
	        		$('.bottom_load').remove();
		            $('.bot_evaluate').append(result);
		            if(data.result.pageNo == data.result.totalPages){
		            	$('.bot_evaluate').append('<li class="detailColor item bottom_load">暂无评论</li>');
		            	return ;
		            }else{
		            	if($(window).scrollTop() > 0){
		            		$('.bot_evaluate').append('<li class="detailColor item bottom_load">加载中...</li>');
		            	}
		            }
	        	}
	        }
	    })
	},
	click:function(mayself){
		/*跳转到地图*/
		$('.map_left').on('click',function(){	
			window.location.href = 'map.html?type='+$('.map_left').attr('type')+'&mayself='+mayself;
		})
		/*付款*/
		$('.buy_price').on('click',function(){
			window.location.href = 'orderShop.html?result='+getParameter('result')+'&num='+$('.number').html();
		})
		/*回到顶部*/
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').css('display','none');
		})
	}
}
o.init();