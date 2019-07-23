var URL = http.urls;
var content = new Vue({
    el : "#login" ,
    data : {
        remember : false
    } ,
    mounted : function () {
        var form = layui.form;
        var $ = layui.jquery;
        var that = this;

        var loginInfo = localStorage.getItem("loginInfo");
        if( loginInfo != null ) {
            loginInfo = JSON.parse( loginInfo );
            $(".user").val( loginInfo.user );
            $(".pwd").val( loginInfo.pwd );
            $(".remember").get(0).checked = true;
        }

        form.render("checkbox");
        form.on("checkbox(remember)",function ( data ) {
            var checked = data.elem.checked;

            that.remember = checked;
        })
        this.remember = $(".remember").get(0).checked;
    } ,
    methods : {
        keyLogin : function ( evt ) {
            if( evt.keyCode == 13 ) {
                this.submit();
            }
        } ,
        /*
        *   去除记住密码
        * */
        changeAccount : function () {
            var layer = layui.layer,
                $ = layui.jquery,
                that = this;
            var form = layui.form;
            var user = $(".user"),
                pwd = $(".pwd");

            if( user.val() == "" ) {
                if( this.remember ) {
                    this.remember = false;
                    $("input[lay-filter=remember]").get(0).checked = false;
                }
                form.render("checkbox");
                pwd.val("");
                //console.log("清除密码")
            } else {

                //console.log("保留密码")
            };
        } ,
        submit : function () {
            var layer = layui.layer,
                $ = layui.jquery,
                that = this;

            var user = $(".user"),pwd = $(".pwd");

            if( user.val() == "" ) {
                layer.alert("请填写账号");
                return;
            }
            if( pwd.val() == "" ) {
                layer.alert("请填写密码");
                return;
            }

            if( this.remember ) {
                var data = {
                    user : $(".user").val() ,
                    pwd : $(".pwd").val() ,
                }
                localStorage.setItem( "loginInfo" , JSON.stringify( data ) );
            } else {
                localStorage.removeItem( "loginInfo" );
            }
            var params = {
                account : user.val() ,
                password : pwd.val()
            }
            var index = layer.load( 1 );
            http.Post( URL.login , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            sessionStorage.setItem("userInfo" , JSON.stringify( result ));
                            layer.msg("登录成功",{ time : 2000 },function () {
                                // if( Boolean( result.bankTaxInfoApprovalState ) && Boolean( result.companyBaseInfoApprovalState ) &&  Boolean( result.shopManagementInfoApprovalState ) /*&& Boolean( result.payStatus )*/ ) {
                                //     location.href = "./index.html?_=" + Date.now();
                                // } else {
                                //     location.href = "./enter.html?_=" + Date.now();
                                // }
                                location.href = "./index.html?_=" + Date.now();
                            })

                            break;
                        default :
                            layer.msg( data.msg );

                    }
                } catch ( e ) {
                    console.error("ERROR : " ,  e );
                }
                layer.close( index );
            })
        } ,
    }
})