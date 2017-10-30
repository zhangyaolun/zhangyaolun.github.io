document.getElementsByTagName("body")[0].setAttribute("style","display:block");
$(function() {
	var o = {
		init:function(){
			FastClick.attach(document.body);
			if(!getCookie('userName')){
				window.location.href = 'login.html';
			}
			var myDate = new Date().Format("yyyy-MM-dd");
			$('.comment_data i').html(myDate);
			var months = 1,
				currPage = 1;
			 setTimeout(function(){
				o.oDate(months,currPage);
			},100)
			  setTimeout(function(){
				o.moreDate(months,currPage);
			},200)
			setTimeout(function(){
				o.clickDate();
			},200)
		},
		oDate:function(months,currPage){
			var suc = function(res){
				console.log(res)
				$('.comment_zhekou .rateDate').html((res.result.rate*10).toFixed(1));
				$('.comment_body .colorFont').html('￥'+res.result.remainingAmount.toFixed(2));
				$('.comment_today i').html('￥'+res.result.todayAmount.toFixed(2));
				$('.comment_qiantian i').html('￥'+res.result.yesterdayAmount.toFixed(2));
				var oResult = '',
					oHtml = res.result.details;
				if(oHtml.length == 0){
	            	$('.index_comment ul').attr('type','1');
	            	$('.index_comment ul').append('<li class="detailColor item bottom_load">暂无记录</li>');
	            	return ;
	            }
				for(var i=0;i<oHtml.length;i++){
					oResult += '<li class="index_flex"><span>'+oHtml[i].total.toFixed(2)+'</span><span>'+oHtml[i].deduction.toFixed(2)+'</span><span>'+oHtml[i].date+'</span></li>'
				}
				$('.index_comment ul').append(oResult);
			}
			var data = {
				'months':months,
				'currPage':currPage,
				'pageSize':10
			}
			var oType = currPage+'|'+months;
		    $('.index_comment').attr('type',oType);
			console.log(data)
			doAjax('/shop-account/query',data,suc);
		},
		clickDate:function(){
			/*切换查询时间*/
			$('.comment_time span').on('click',function(){
				var time_index = $(this).index(),
					time_attr = ['1','3','6',];
				$('.index_comment ul').attr('type','0');
				$('.comment_time span').removeClass('code_active').eq(time_index-1).addClass('code_active');
				$('.index_comment ul').html('');
				o.oDate(time_attr[time_index-1],1);
			})
			/*点击返回*/
			$('.back').on('click',function(){
				$(window).scrollTop(0);
				$('.back').css('display','none');
			})
			/*点击重置密码*/
			$('.forgetDiv').on('click',function(){
				window.location.href = 'forget.html';
			})
			/*点击店员管理*/
			$('.ClerkDiv').on('click',function(){
				window.location.href = 'shopClerk.html';
			})
			/*点击充值记录*/
			$('.chongDiv').on('click',function(){
				window.location.href = 'shopPay.html';
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
				if($('.index_comment ul').attr('type') == 1){
	            	return ;
				}
			　　if(scrollTop + windowHeight == scrollHeight){
				  var oType = $('.index_comment').attr('type').split('|');
				  var page = oType[0];
				  page++;
				  o.oDate(oType[1],page);
			　　}
			});	
		}
	}
	o.init();
});