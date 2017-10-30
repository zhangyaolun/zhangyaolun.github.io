document.getElementsByTagName("body")[0].setAttribute("style","display:block");
$(function() {
	var o = {
		init:function(){
			FastClick.attach(document.body);
			if(!getCookie('userName')){
				window.location.href = 'login.html';
			}
			var currPage = 1;
			setTimeout(function(){
				o.oDate(currPage);
			},100)
		},
		oDate:function(aPage){
			var suc = function(res){
				var oAttr = [];
				var oResult = '',
					oHtml = res.result.result;
				if(oHtml.length == 0){
					$('.consume_item').attr('type','1');
	            	$('.consume_item').append('<li class="bottom_load">暂无记录</li>');
	            	return ;
	            }else{
					oAttr.push(res.result.result);
	            	aPage++;
	            	var num = res.result.totalPages;
			        for(var i=aPage;i<=num;i++){
			        	console.log(i)
			           	var data = {
							'currPage':i
						}
					    $.ajax({
				       		url : '/shop-account/findAll',
					        data :data,
					        type : 'POST',
					        async : false,
					        success : function(data){
					        	if(data.httpCode == 200){
						           oAttr.push(data.result.result);
					        	}
					        }
					    });       		
					}
			        var moreAttr=[];
					for(var s = 0;s < oAttr.length; s++){
						for(var j = 0;j < oAttr[s].length; j++){
							moreAttr.push(oAttr[s][j]);
						}
					}
					for(var i=0;i<moreAttr.length;i++){
						var typeAttr = ['循环充值','代理商充值','充值赠送'];
						oResult += '<li class="clear"><span class="left">￥'+(moreAttr[i].rechargeChange/100).toFixed(2)+'</span><i>&emsp;&emsp;'+typeAttr[moreAttr[i].type]+'</i><em class="right">'+moreAttr[i].createTime+'</em></li>'
					}
					$('.consume_item').append(oResult);
	            }
			}
			var data = {
				'currPage':aPage
			}
			console.log(data)
			$('.consume_item').attr('type',aPage)
			doAjax('/shop-account/findAll',data,suc);
		}
	}
	o.init();
});