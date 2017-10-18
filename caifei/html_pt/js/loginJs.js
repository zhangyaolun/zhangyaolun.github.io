document.getElementsByTagName("body")[0].setAttribute("style","display:block");
var o = {
	init:function(){
		FastClick.attach(document.body);
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
		var num = 0,numAttr = ['img/logo_1.jpg','img/logo_2.jpg','img/logo_3.jpg']
		$('.login_logo').on('click',function(){
			if(num == 3){
				num = 0;
			}
			$('.login_logo').attr('src',numAttr[num]);
			num++;
		})
	},
	moreAjax:function(userName,pwd){
		var suc = function(data){
			console.log(data);
			if(data.result == 1){
				window.location.href = 'index.html';
			}else if(data.result == 2){
				$('#title').html('账号不存在');
			}else if(data.result == 3){
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