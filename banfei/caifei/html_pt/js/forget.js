var o = {
	init:function(){
		FastClick.attach(document.body);
		o.divClick();
	},
	oNclick:function(passOld){
		if(!checkPassword(passOld)){
			$('#title').html('请输入6-12位密码');
			return false;
		}
		return true;
	},
	divClick:function(){
		$('.reg_button').on('click',function(){
			$('#title').html('');
			var passOld = $('#passOld').val(),
				pass = $('#pass').val(),
				word = $('#word').val();
			if(!checkNotEmpty(passOld)){
				$('#title').html('请输入原始密码');
				return ;
			}
			if(!o.oNclick(passOld))return ;
			if(!checkNotEmpty(passOld)){
				$('#title').html('请输入新密码');
				return ;
			}
			if(!o.oNclick(pass))return ;
			if(!checkNotEmpty(word)){
				$('#title').html('请再次确认新密码');
				return ;
			}
			if(!o.oNclick(word))return ;
			if(passOld != getCookie('pwd')){
				$('#title').html('原始密码输入有误');
				return ;
			}
			if(pass != word){
				$('#title').html('两次密码输入不一致');
				return ;
			}
			$('#title').html('');
			var suc = function(data){
				if(data.result == 1){
					setCookie('pwd',word);
					window.location.href = 'index.html';
				}else if(data.result == 0){
					$('#title').html('修改密码失败');
				}
			}
			var data = {
				'id':getCookie('loginDto'),
				'pwd':getCookie('pwd'),
				'newpwd':pass
			}
			doAjax('/shop-account/resetpwd',data,suc);
		})
	}
}
o.init();