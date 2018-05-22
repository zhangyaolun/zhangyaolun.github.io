var Login = function() {
	var runLoginValidator = function() {
		var form = $('.form-login');
		var errorHandler = $('.errorHandler');
		$('.form-login input').on('focus',function(){
			errorHandler.hide();
		})
		$.validator.setDefaults({
		    submitHandler: function() {
		        if($('.btn_submit').html() == '登录中...')return;
				$('.form-login input').attr('disabled','true');
				$('.btn_submit').attr('disabled','true');
				$('.btn_submit').html('登录中...');
				var data = {
					'username':$('#userName').val(),
					'password':$('#password').val(),
					'rememberMe':'true'
				}
				$.ajax({  
	                type: "POST",  
	                url:"/login",  
	                data:data,
	                async: false,  
	                error: function(request) {  
	                    errorHandler.html('登录失败,请重新登录.');
	                   	errorHandler.show();
	                    $('.form-login input').removeAttr('disabled');
						$('.btn_submit').removeAttr('disabled');
						$('.btn_submit').html('<span>登录</span> <i class="fa fa-arrow-circle-right"></i>');
	                },  
	                success: function(data) {
	                	if(!data.result){
	                		errorHandler.html(data.msg);
	                   		errorHandler.show();
	                   		$('.form-login input').removeAttr('disabled');
							$('.btn_submit').removeAttr('disabled');
							$('.btn_submit').html('<span>登录</span> <i class="fa fa-arrow-circle-right"></i>');
	                	}else{
	                		$.cookie("username", $('#userName').val());
	                		$.cookie("userOmsId", $('#userName').val());
	                		window.location = 'index.html';
	                	}
	                }  
	            });
		     
		    }
		});
		var validator = $('.form-login').validate({
			errorPlacement: function(error, element) {
				$( element )
					.closest( "form" )
						.find( "label[for='" + element.attr( "id" ) + "']" )
							.append( error );
			},
			errorElement: "span",
			messages: {
				username : {  
                    required: "用户名不能为空",
                	minlength: "用户名的最小长度为2"
                },  
                password : {  
                    required: "密码不能为空",
	                minlength: "密码长度不能少于6个字符",
	                maxlength: "密码长度不能超过16个字符"
                } 
			}
		});
	};
	return {
		init : function() {
			runLoginValidator();
		}
	};
}();
