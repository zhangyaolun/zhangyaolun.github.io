$(function() {
	var o = {
		init:function(){
			FastClick.attach(document.body);
			var myDate = new Date().Format("yyyy-MM-dd");
			$('.comment_data i').html(myDate);
			var months = 1,
				currPage = 1;
			o.oDate(months,currPage);
			o.moreDate(months,currPage);
			o.clickDate();
		},
		oDate:function(months,currPage){
			var suc = function(res){
				console.log(res)
				$('.rateDate').html(res.result.rate);
				$('.colorFont').html('￥'+res.result.remainingAmount.toFixed(2));
				var oResult = '',
					oHtml = res.result.details;
				if(oHtml.length == 0){
	            	$('.index_comment ul').attr('type','1');
	            	return ;
	            }
				for(var i=0;i<oHtml.length;i++){
					oResult += '<li class="index_flex"><span>'+oHtml[i].total.toFixed(2)+'</span><span>'+oHtml[i].deduction.toFixed(2)+'</span><span>'+oHtml[i].date+'</span></li>'
				}
				if(oHtml.length == 0 && $('.index_comment ul li').length>10){
	            	$('.index_comment ul').append('<li class="detailColor item bottom_load">暂无记录</li>');
	            	return ;
	            }
				$('.index_comment ul').append(oResult);
			}
			var data = {
				'months':months,
				'currPage':currPage,
				'pageSize':10
			}
			console.log(data)
			doAjax('/shop-account/query',data,suc);
		},
		clickDate:function(){
			/*切换查询时间*/
			$('.comment_time span').on('click',function(){
				var time_index = $(this).index(),
					time_attr = ['1','3','6',];
				$('.comment_time span').removeClass('code_active').eq(time_index-1).addClass('code_active');
				$('.index_comment ul').html('');
				o.oDate(time_attr[time_index-1],1);
			})
			/*点击返回*/
			$('.back').on('click',function(){
				$(window).scrollTop(0);
				$('.back').css('display','none');
			})
		},
		moreDate:function(months,currPage){
			$(window).scroll(function(){
				if ($(window).scrollTop() != '0'){
					$('.back').css('display','block');
				}else{
					$('.back').css('display','none');
				}
			　　var scrollTop = $(this).scrollTop();
			　　var scrollHeight = $(document).height();
			　　var windowHeight = $(this).height();
				if($('.index_comment ul').attr('type') == '1'){
	            	return ;
				}
			　　if(scrollTop + windowHeight == scrollHeight){
				  currPage++;
				  o.oDate(months,currPage);
			　　}
			});	
		}
	}
	o.init();
});