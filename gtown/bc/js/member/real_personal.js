new Vue({
    el: '#app',
    data: {
        userIntro: [{'name': '用户名称', 'title': 'v10088'}, {'name': '手机号码','title': ''}, {'name': '绑定邮箱', 'title': ''}, {'name': '所在地区', 'title': ''},],//账号信息
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.downMenuSpot('transparent', 5);
        commentJs.appShowhide('app');
    },

    methods: {
        // 查看订单
        skewOrder: function (index) {
            console.log(index)
            window.location.href = '../order/order_list.html?title=' + index;
        },
        // 管理收货地址
        mangerAddress: function () {
            window.location.href = '../map/map_list.html';
        },
        // 设置
        setMember: function () {

        },
    }


})