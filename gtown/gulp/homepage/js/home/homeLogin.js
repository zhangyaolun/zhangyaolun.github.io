new Vue({
    el: '#app',
    data: {
        preLoading:true,
    },
    mounted: function () {
        commentJs.toastLoading('登录中...');
        var codeLogin = commentJs.getUrlKey('code');
        var shaUserId = commentJs.getUrlKey('shaUserId');
        commentJs.removeCookie('userId');
        commentJs.removeCookie('userName');
        if(shaUserId){
            sessionStorage.setItem('shaUserId',shaUserId);
        }
        if(!codeLogin){
            var oUrl = sessionStorage.getItem('oUrl');
            var redirect_urls= encodeURIComponent("http://e-shop.ecache.com.cn/page/home/home.html");
            if(oUrl){redirect_urls = oUrl}
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c5b3aa7c89e87ad&redirect_uri='+redirect_urls+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
        }

    },

    methods: {

    }
})
