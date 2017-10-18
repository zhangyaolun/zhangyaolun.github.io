
var o = {
	init:function(){
		FastClick.attach(document.body);
		o.moreClick();
	},
	moreClick:function(){
		$('.reg_button').on('click',function(){
			$('#title').html('');
			var userName = $('.register_mobile input').val(),
				pwd = $('#pwd').val();
			if(!checkNotEmpty(userName)){
	    		$('#title').html('注意：请输入手机号');
	        	return ;
	    	}
	    	if(!/^1[3|4|5|7|8]\d{9}$/.test(userName)){
	    		$('#title').html('注意：手机号码格式输入有误');
	    		return ;
	    	}
			$('#title').html('')
		})
		
		/*发送验证码*/
		$('.btn_yzm').on('click',function(){
			if($(".btn_yzm").hasClass('lzs_cur'))return ;
			$(".btn_yzm").addClass('lzs_cur');
			countDown();
		})
		var wait=60;
	    function countDown(){
	        if (wait == 0) {
	            $(".btn_yzm").html("重新发送");
	            $(".btn_yzm").removeClass('lzs_cur')
	            wait = 60;
	        } else {
	            $(".btn_yzm").html( wait-- + 's');
	            setTimeout(function() {
	                countDown();
	            }, 1e3);
	        }
	    }
		
	},
	moreAjax:function(){
		var suc = function(data){
			console.log(data);
			
		}
		var data = {
			'loginName':'aaa',
			'password':'123456'
		}
		doAjax('/shop-account/login',data,suc);
	},
}
o.init();