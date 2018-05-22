new Vue({
    el: '#app',
    data: {
        userIntro: [{'name': '信息设置', 'src': 'usercenter.html'}, {'name': '关于我们','src': 'javascript:void(0);'}, {'name': '安全退出', 'src': 'javascript:void(0);'}],//账号信息
        scroTitle: false
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.downMenuSpot('transparent', 3);
        commentJs.appShowhide('app');
    },

    methods: {
        // 退出登录
        loginOut: function (index) {
            if(index == 2){
                commentJs.removeCookie('userName');
                commentJs.removeCookie('userId');
                window.history.back();
            }
        },
    }


})