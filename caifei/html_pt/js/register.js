
$(function() {
	var o = {
		init:function(){
			FastClick.attach(document.body);
			o.clickDate();
		},
		clickDate:function(){
			$('.reg_button').on('click',function(){
				console.log($('#checkedInput').is(':checked'))
				$('#title').html('');
				var userName = $('.register_name input').val(),
					pass = $('.register_pass input').val(),
					word = $('.register_word input').val(),
					mobile = $('.register_mobile input').val();
				if(!checkNotEmpty(userName)){
					$('#title').html('请输入您的账号');
					return ;
				}
				if(!checkNotEmpty(pass)){
					$('#title').html('请设置您的密码');
					return ;
				}
				if(!checkPassword(pass)){
					$('#title').html('请输入6-12位密码');
					return ;
				}
				if(!checkNotEmpty(word)){
					$('#title').html('请再次输入您的密码');
					return ;
				}
				if(!checkPassword(word)){
					$('#title').html('请输入6-12位密码');
					return ;
				}
				if(pass != word){
					$('#title').html('两次输入密码不一致');
					return ;
				}
				if(!checkNotEmpty(mobile)){
					$('#title').html('请输入您的注册码');
					return ;
				}
				if(!$('#checkedInput').is(':checked')){
					$('#title').html('请您同意免责条款');
					return ;
				}
				$('#title').html('');
				o.moreAjax(userName,pass,mobile);
			})
			$('.register_checkbox label').on('click',function(){
				$('.moreDate').show();
			})
			$('.del').on('click',function(){
				$('.moreDate').hide();
			})
		},
		moreAjax:function(userName,pwd,registerCode){
			var suc = function(data){
				console.log(data);
				if(data.result == 1){
					window.location.href = 'index.html';
				}else{
					var oAttr = ['用户名重复','注册码不存在','注册码已使用'];
					$('#title').html(oAttr[data.result-2]);
				}
			}
			var data = {
				'loginName':userName,
				'password':pwd,
				'registerCode':registerCode
			}
			doAjax('/shop-account/register',data,suc);
		}
	}
	o.init();
});