//公共头部
Vue.component("app-header",{
    props : ["curr","isIndex"] ,
    data : function () {
        return {
            userInfo : {} ,
            origin : "http://" + location.host + "/modules"
            //curr : 0
        }
    } ,
    mounted : function () {
        var userInfo = sessionStorage.getItem("userInfo");
        if( userInfo != null ) {
            this.userInfo = JSON.parse(userInfo);
        } else {
            location.href = location.origin + "/modules/login.html";
        }
        //     if( !Boolean( this.userInfo.bankTaxInfoApprovalState ) && !Boolean( this.userInfo.companyBaseInfoApprovalState ) &&  !Boolean( this.userInfo.shopManagementInfoApprovalState ) ) {
        //         location.href = "./enter.html";
        //     }
        // } else {
            //location.href = location.origin + "/modules/login.html";
        //}
        var element = layui.element;
        element.render("nav");
    } ,
    methods : {
        logOut : function () {
            var layer = layui.layer,
                that = this;

            layer.confirm("确认退出?",{ icon : 3 }, function () {
                var logOut = layer.load(2);
                http.Get( http.urls.logout ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                layer.msg("退出成功",{ time : 2000 },function () {
                                    location.href = location.origin + "/modules/login.html";
                                });
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                    layer.close(logOut);
                });
            });

        } ,
        //更改密码
        modify : function () {
            var layer = layui.layer;
            var $ = layui.jquery;
            var that = this;

            layer.open({
                type : 1 ,
                title : "更改密码" ,
                area : ["400px","240px"] ,
                content : "<div class='layui-form' style='margin-top : 20px'>" +
                "  <div class=\"layui-form-item\">\n" +
                "    <label class=\"layui-form-label\">原密码:</label>\n" +
                "    <div class=\"layui-input-inline\">\n" +
            "             <input type=\"password\" maxlength='20' placeholder=\"请输入6-20位原密码\" autocomplete=\"off\" class=\"layui-input oldpass\">\n" +
                "    </div>\n" +
                "  </div>" +
                "  <div class=\"layui-form-item\">\n" +
                "    <label class=\"layui-form-label\">新密码:</label>\n" +
                "    <div class=\"layui-input-inline\">\n" +
                "             <input type=\"password\" maxlength='20' placeholder=\"请输入6-20位新密码\" autocomplete=\"off\" class=\"layui-input newpass\">\n" +
                "    </div>\n" +
                "  </div>" +
                // "  <div class=\"layui-form-item\">\n" +
                // "    <label class=\"layui-form-label\">确认新密码:</label>\n" +
                // "    <div class=\"layui-input-inline\">\n" +
                // "             <input type=\"password\" maxlength='20' placeholder=\"请输入6-20位确认新密码\" autocomplete=\"off\" class=\"layui-input newpass2\">\n" +
                // "    </div>\n" +
                // "  </div>" +
                "</div>" ,
                btn : ["确认","取消"] ,
                yes : function ( idx ) {
                    var oldpass = $(".oldpass").val();
                    var newpass = $(".newpass").val();
                    //var newpass2 = $(".newpass2").val();

                    if( oldpass.length < 6 ) {
                        layer.tips("请输入6-20位旧密码" , $(".oldpass") );
                        return;
                    }
                    if( newpass.length < 6 ) {
                        layer.tips("请输入6-20位新密码" , $(".newpass") );
                        return;
                    }
                    // if( newpass2.length < 6 ) {
                    //     layer.tips("请输入6-20位确认新密码" , $(".newpass2") );
                    //     return;
                    // }
                    if( oldpass == newpass ) {
                        layer.tips("新旧密码不可一样" , $(".newpass") );
                        return;
                    }
                    // if( newpass != newpass2 ) {
                    //     layer.tips("两次新密码输入不一致" , $(".newpass2") );
                    //     return;
                    // }
                    http.Post( http.urls.modifyPwd , { account : that.userInfo.account , password : oldpass , newPassword : newpass } ).done(function ( data ) {
                        try{
                            switch( data.httpCode ) {
                                case 200 :
                                    if( data.result ) {
                                        layer.msg( data.msg );
                                        layer.close( idx );
                                    }
                                    break;
                                default :
                                    layer.msg( data.msg );
                            }
                        } catch ( e ) {
                            console.error("error = " , e );
                        }
                    })

                }
            })
        }
    } ,
    template : "    <ul class=\"layui-nav layui-bg-green\">\n" +
    "        <li class=\"layui-nav-item\" :class=\"{ 'layui-this' : curr == 0 }\">\n" +
    "            <a :href=\"origin + '/index.html'\">首页</a>\n" +
    "        </li>\n" +
    "        <li class=\"layui-nav-item\" :class=\"{ 'layui-this' : curr == 1 }\">\n" +
    "            <a :href=\"origin + '/goods/index.html'\">商品</a>\n" +
    "        </li>\n" +
    "        <li class=\"layui-nav-item\" :class=\"{ 'layui-this' : curr == 2 }\">\n" +
    "            <a :href=\"origin + '/logistics/index.html'\">订单</a>\n" +
    "        </li>\n" +
    "        <li class=\"layui-nav-item\" :class=\"{ 'layui-this' : curr == 3 }\">\n" +
    "            <a :href=\"origin + '/promotion/index.html'\">促销</a>\n" +
    "        </li>\n" +
    // "        <li class=\"layui-nav-item\" v-bind:class=\"{ 'layui-this' : curr == 4 }\">\n" +
    // "            <a :href=\"origin + '/shop/index.html'\">店铺</a>\n" +
    // "        </li>\n" +
    // "        <li class=\"layui-nav-item\" v-bind:class=\"{ 'layui-this' : curr == 5 }\">\n" +
    // "            <a :href=\"origin + '/custom_service/index.html'\">售后服务</a>\n" +
    // "        </li>\n" +
    // "        <li class=\"layui-nav-item\" v-bind:class=\"{ 'layui-this' : curr == 6 }\">\n" +
    // "            <a :href=\"origin + '/account/index.html'\">帐号</a>\n" +
    // "        </li>\n" +
    "        <li class=\"layui-nav-item right\">\n" +
    "            <a href=\"javascript:void(0);\"><img src=\"http://t.cn/RCzsdCq\" class=\"layui-nav-img\">{{ userInfo.account }}</a>\n" +
    "            <dl class=\"layui-nav-child\">\n" +
    // "                <dd><a href=\"javascript:void(0);\">修改信息</a></dd>\n" +
    "                <dd @click='modify'><a href=\"javascript:void(0);\">更改密码</a></dd>\n" +
    "                <dd @click='logOut'><a href=\"javascript:void(0);\">退了</a></dd>\n" +
    "            </dl>\n" +
    "        </li>\n" +
    "    </ul>"
})

new Vue({
    el : "#header"
})



//公共竖导航
Vue.component("col-nav" , {
    props : ["curr","nav"] ,
    mounted : function () {

    } ,
    template : "<nav id=\"nav\" class=\"left\">\n" +
                "    <a v-for=\"(item,index) in nav\" v-bind:class=\"{ 'curr' : curr == index }\" :href=\"item.linker\">{{ item.text }}</a>\n" +
                "</nav>"
})


//公共面包屑
Vue.component("app-crumbs" , {
    props : [] ,
    mounted : function () {

    } ,
    template : "<div class=\"content_body clearfix\">" +
                "    <span class=\"layui-breadcrumb\" lay-separator=\"-\">" +
                "    <a href=\"../index.html\">首页</a>" +
                "    <a href=\"./index.html\">帐号</a>" +
                "    <a><cite>子账号</cite></a>" +
                "    </span>" +
                "</div>"
})

//加载loading
Vue.component("app-loading", {
    props : [] ,
    mounted : function () {} ,
    template : "<div id=\"loading\"><i class=\"layui-icon layui-anim layui-anim-rotate layui-anim-loop\">&#xe63d;</i></div>"
})

//表单数据空
Vue.component("app-error", {
    props : ["msg"] ,
    mounted : function () {} ,
    template : "<div id=\"error\"><i class=\"layui-icon layui-icon-face-surprised\"></i><p v-if='msg'>{{ msg }}</p><p v-if='!msg'>暂无数据</p></div>"
})

