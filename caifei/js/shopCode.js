document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		var currPage = 1;
		o.moreAjax(currPage);
		o.moreDate(currPage);
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').css('display','none');
		})
	},
	moreDate:function(currPage){
		$(window).scroll(function(){
			if ($(window).scrollTop() != '0'){
				$('.back').css('display','block');
			}else{
				$('.back').css('display','none');
			}
		　　var scrollTop = $(this).scrollTop();
		　　var scrollHeight = $(document).height();
		　　var windowHeight = $(this).height();
		    if($('.consume_item .bottom_load').html() == '暂无积分变动记录'){
            	return ;
			}
		　　if(scrollTop + windowHeight == scrollHeight){
			   currPage++;
		　　　 o.moreAjax(currPage);
		　　}
		});	
	},
	moreAjax:function(currPage){
		var data = {
			'userId':getParameter('userId'),
			'months':3,
			'currPage':currPage,
			'pageSize':20
		}
		console.log(data)
		$.ajax({
	        url :'/user/scoreHistory',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	console.log(data);
	        	if(data.httpCode == 200){
	        		var result = '';
	        		if(data.result.result.length == 0){
		            	$('.consume_item').append('<li class="detailColor item bottom_load">暂无积分变动记录</li>');
		            	return ;
		            }
	        		for(var i = 0; i <data.result.result.length; i++){
	        			if(data.result.result[i].scoreChange > 0){
	        				result += '<li class="detailColor">积分变动: <span class="emStyle"> +'+data.result.result[i].scoreChange+'分</span><div class="title"><span>'+data.result.result[i].reason+'</span></div><div class="clear last"><span class="left">'+data.result.result[i].createTime+'</span></div></li>';
	        			}else{
	        				result += '<li class="detailColor">积分变动: <span class="emStyle">'+data.result.result[i].scoreChange+'分</span><div class="title"><span>'+data.result.result[i].reason+'</span></div><div class="clear last"><span class="left">'+data.result.result[i].createTime+'</span></div></li>';
	        			}
	               }
	        		
	        		$('.bottom_load').remove();
		            $('.consume_item').append(result);
		            
		            if(data.result.pageNo == data.result.totalPages &&  $('.consume_item li').length > 10){
		            	$('.consume_item').append('<li class="detailColor item bottom_load">暂无积分变动记录</li>');
		            	return ;
		            }else{
					　　if($(window).scrollTop() > 0){
						  $('.consume_item').append('<li class="detailColor item bottom_load">加载中...</li>');
					　　}
		            }
	        	}
	        }
	    })
	},
}
o.init();