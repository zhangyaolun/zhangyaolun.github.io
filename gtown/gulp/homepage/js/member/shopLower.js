new Vue({
    el: '#app',
    data: {

    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.homeHader('商品详情');
        commentJs.kefuLogo('kefu_logo');
    },
})