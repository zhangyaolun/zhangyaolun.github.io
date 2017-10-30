document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
		if(getCookie('userName')){
			$('#userName').val(getCookie('userName'));
			$('#pwd').val(getCookie('pwd'));
		}
		o.moreClick();
	},
	moreClick:function(){
		$('.lg_login').on('click',function(){
			$('#title').html('');
			var userName = $('#userName').val(),
				pwd = $('#pwd').val();
			if(!checkNotEmpty(userName)){
				$('#title').html('请输入您的账号');
				return ;
			}
			if(!checkNotEmpty(pwd)){
				$('#title').html('请输入您的密码');
				return ;
			}
			if(!checkPassword(pwd)){
				$('#title').html('请输入6-12位密码');
				return ;
			}
			$('#title').html('')
			o.moreAjax(userName,pwd);
		})
	},
	moreAjax:function(userName,pwd){
		var suc = function(data){
			console.log(data);
			if(data.result.result == 1){
				setCookie('userName',userName)
				setCookie('loginDto',data.result.loginDto.id)
				setCookie('id',data.result.shopDto.id)
				setCookie('pwd',pwd)
				window.location.href = 'index.html';
			}else if(data.result.result == 2){
				$('#title').html('账号不存在');
			}else if(data.result.result == 3){
				$('#title').html('密码错误');
			}
		}
		var data = {
			'loginName':userName,
			'password':pwd
		}
		doAjax('/shop-account/login',data,suc);
	},
}
o.init();