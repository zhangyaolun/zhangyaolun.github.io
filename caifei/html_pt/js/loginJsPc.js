
function oNclick(){
	$('.title').html('');
	var userName = $('#userName').val(),
		pwd = $('#pwd').val();
	if(!checkNotEmpty(userName)){
		$('.userName h5').html('请输入您的账号');
		return ;
	}
	if(!checkNotEmpty(pwd)){
		$('.title').html('');
		$('.pwd h5').html('请输入您的密码');
		return ;
	}
	if(6>pwd.length||12<pwd.length){
		$('.pwd h5').html('请输入6-12位密码');
		return ;
	}
	$('.title').html('');
	var suc = function(data){
		console.log(data);
		if(data.result == 2){
			$('.pwd h5').html('账号不存在');
		}else if(data.result == 3){
			$('.pwd h5').html('密码错误');
		}else{
			setCookie('agentPwd',pwd);
			if(data.result){
				window.location.href = 'indexPc.html?name='+userName+'&result='+JSON.stringify(data.result);
			}else{
				window.location.href = 'indexPc.html?name='+userName+'&result=1';
			}
			
		}
	}
	var data = {
		'agentMobile':userName,
		'agentPwd':pwd
	}
	doAjax('/agent/login',data,suc);
}
function keyLogin(){
  if (event.keyCode==13)
     oNclick();
}
	