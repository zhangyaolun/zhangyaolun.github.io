$(function() {
	var o = {
		init:function(){
			FastClick.attach(document.body);
			if(!getCookie('userName')){
				window.location.href = 'login.html';
			}
			setTimeout(function(){
				o.oDate();
			},100)
		},
		oDate:function(){
			var suc = function(res){
				var oResult = '';
				if(res.result.length == 0){
					$('.consume_item').attr('type','1');
	            	$('.consume_item').append('<li class="bottom_load">暂无记录</li>');
	            	return ;
	            }else{
					for(var i=0;i<res.result.length;i++){
						var typeAttr = ['循环充值','代理商充值','充值赠送'];
						oResult += '<li class=""><span class="">￥'+(res.result[i].rechargeChange/100).toFixed(2)+'</span><i>'+typeAttr[res.result[i].type]+'</i><em class="">'+res.result[i].createTime+'</em></li>'
					}
					$('.consume_item').append(oResult);
	            }
			}
			doAjax('/shop-account/findAll','',suc);
		}
	}
	o.init();
});