var o = {
	init:function(){
		if(!getCookie('agentPwd')){
			window.location.href = 'loginpc.html';
		}
		if(getParameter('result') != 1){
			var data = JSON.parse(getParameter('result')),oHtml='';
			for(var i = 0; i < data.length; i++){
				oHtml+='<option value="'+data[i].id+'">'+data[i].shopName+'</option>'
			}
			$("select#status").append(oHtml);
		}
		var currPage = 1,months = 1;
		$('.comment_select').attr('currPage',currPage);
		$('.comment_select').attr('months',months);
		o.ajaxData();
		o.indexClick();
	},
	ajaxData:function(){
		var suc = function(res){
		console.log(res)
		var oResult = '',
			oHtml = res.result.details;
			$('.ht_shows i').html(oHtml.totalPages);
			$('.ht_shows input').val(oHtml.pageNo);
			$('.bili em').html(oHtml.pageNo);
			oHtml.totalPages == 0?$('.bili i').html(1):$('.bili i').html(oHtml.totalPages);
			if(oHtml.length == 0){
            	return ;
            }
			for(var i=0;i<oHtml.result.length;i++){
				if(i%2 ==0){
					oResult +='<li class="index_list list_active"><span>'+oHtml[i].shopName+'</span><span>'+oHtml.result[i].income+'</span><span>'+oHtml.result[i].time+'</span></li>'
				}else{
					oResult +='<li class="index_list"><span>'+oHtml.result[i].shopName+'</span><span>'+oHtml.result[i].income+'</span><span>'+oHtml.result[i].time+'</span></li>'
				}
			}
			$('.item').html(oResult);
		}
		var data = {
			'months':$('.comment_select').attr('months'),
			'currPage':$('.comment_select').attr('currPage'),
			'pageSize':10,
			'shopId':$('.comment_select').attr('data'),
			'agentId':getCookie('agentId')
		}
		console.log(data)
		doAjax('/agent/query',data,suc);
	},
	indexClick:function(currPage,months){
		$("select#status").change(function(){
		     console.log($(this).val());
		     $('.comment_select').attr('data',$(this).val());
		     o.ajaxData();
		});
		$(".last span").on('click',function(){//修改密码
		     window.location.href = 'forgetPc.html?name='+getParameter('name');
		});
		$(".comment_time li").on('click',function(){
			var index = $(this).index();
			if(index == 0)return;
		    $(".comment_time li").removeClass('code_active').eq(index).addClass('code_active');
		    activeColor();
		    o.ajaxData();
		});
		$(".first").on('click',function(){//首页
			$('.comment_select').attr('currPage',1);
		    o.ajaxData();
		});
		$(".chooselast").on('click',function(){//尾页
			$('.comment_select').attr('currPage',$('.bili i').html());
		    o.ajaxData();
		});
		$(".prev").on('click',function(){//上一页
			if($('.bili i').html() == $('.bili em').html())return;
			var i = $('.bili em').html(),
				s = parseInt(i)-parseInt(1);
			$('.comment_select').attr('currPage',s);
		    o.ajaxData();
		});
		$(".next").on('click',function(){//下一页
			if($('.bili i').html() == $('.bili em').html())return;
			var a = $('.bili em').html(),
				b = parseInt(a)+parseInt(1);
			$('.comment_select').attr('currPage',b);
		    o.ajaxData();
		});
		$(".ht_shows button").on('click',function(){//跳第几页
			if($('.bili i').html() == $('.bili em').html())return;
			$('.comment_select').attr('currPage',$(".ht_shows button").val());
		    o.ajaxData();
		});
		$(".ht_shows input").bind('input propertychange',function(){//跳第几页
			if($(".ht_shows input").val()>$('.bili i').html()){
				$(".ht_shows input").val('1');
				alert('超出查询页数');
			}
		});
		function activeColor(){
			for(var s=0;s<4;s++){
				if($(".comment_time li").eq(s).hasClass('code_active')){
					var timeAttr = ['0','1','3','6'];
					$('.comment_select').attr('months',timeAttr[s]);
					return ;
				}
			}
		}
	}
}
o.init();