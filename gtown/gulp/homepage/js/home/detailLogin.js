new Vue({
    el: '#app',
    data: {
        preLoading:true,
    },
    mounted: function () {
        commentJs.toastLoading('登录中...');
        var codeLogin = commentJs.getUrlKey('code');
        var goods_id = commentJs.getUrlKey('goods_id');
        var shaUserId = commentJs.getUrlKey('shaUserId');
        var spikeProductId = commentJs.getUrlKey('spikeProductId');
        var time = commentJs.getUrlKey('time');
        var _binding = commentJs.getUrlKey('binding');
        commentJs.removeCookie('userId');
        commentJs.removeCookie('userName');
        if(shaUserId){
            sessionStorage.setItem('shaUserId',shaUserId);
        }

        if(!codeLogin){
            var oUrl = sessionStorage.getItem('oUrl');
            if(goods_id){
                var redirect_urls= encodeURIComponent("http://e-shop.ecache.com.cn/page/product/product_detail.html?goods_id="+goods_id+'&binding=' + _binding);
            }else if(spikeProductId){
                var redirect_urls= encodeURIComponent("http://e-shop.ecache.com.cn/page/product/product_detail.html?spikeProductId="+spikeProductId+'&binding=' + _binding+'&time=' + time);
            }
            if(oUrl){redirect_urls = oUrl}
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c5b3aa7c89e87ad&redirect_uri='+redirect_urls+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
        }

    },

    methods: {

    }
})
