document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		var currPage = 1;
		setTimeout(function(){
			o.moreAjax(currPage);
		},100)
		setTimeout(function(){
			o.moreDate();
		},200)
		$('.back').on('click',function(){
			$(window).scrollTop(0);
			$('.back').css('display','none');
		})
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
		    if($('.consume_item').attr('oPage') == 1){
            	return ;
			}
		　　if(scrollTop + windowHeight == scrollHeight){
			  var typeAttr = $('.consume_item').attr('type');
			  typeAttr++;
		　　　 o.moreAjax(typeAttr);
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
		var oType = currPage;
		$('.consume_item').attr('type',oType);
		$.ajax({
	        url :'/user/scoreHistory',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	if(data.httpCode == 200){
	        		var result = '';
	        		if(data.result.result.length == 0){
	        			$('.consume_item').attr('oPage',1);
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
		            if(data.result.pageNo == data.result.totalPages ){
		            	$('.consume_item').attr('oPage',1);
		            	return ;
		            }
	        	}
	        }
	    })
	},
}
o.init();