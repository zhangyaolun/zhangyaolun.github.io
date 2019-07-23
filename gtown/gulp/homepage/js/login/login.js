new Vue({
    el: '#app',
    data: {
        preLoading: false,
        loginname: false,
        passname: false,
        login_data:{
            'username': '',
            'password':'',
            'loginAccountType':'1'
        },
        submitHtml:'登&nbsp;&nbsp;&nbsp;&nbsp;录'
    },
    mounted: function () {
        FastClick.attach(document.body);
    },
    methods: {
        focuslogin: function () {//失去焦点清除消失
            this.loginname = true;
        },
        blurlogin: function () {//获取焦点清除显示
            this.loginname = false;
        },
        clear_btn_click: function () {//清空输入框的值
            this.loginValue = '';
            $('#userName').focus();
        },
        pass_text_click: function () {//密码显示与隐藏
            this.passname = !this.passname;
        },
        submit: function () {
            var _this = this;
            $.validator.setDefaults({
                submitHandler: function (form) {
                    _this.preLoading = true;
                    commentJs.toastLoading('登录中...');
                    var suc = function (data) {
                        var userId = data.msg + '|'  + data.result.isSign;
                        commentJs.setCookie('userName',data.result.username,1);
                        commentJs.setCookie('userId',userId,1);
                        window.history.back();
                    }
                    o.login(_this.login_data,suc);
                }
            });
            var validator = $('.form-login').validate({
                errorElement: "em",
                messages: {
                    username: {
                        required: "用户名不能为空",
                        minlength: "用户名的最小长度为2"
                    },
                    password: {
                        required: "密码不能为空",
                        minlength: "密码长度不能少于6个字符",
                        maxlength: "密码长度不能超过16个字符"
                    }
                }
            });
        },
    }
})