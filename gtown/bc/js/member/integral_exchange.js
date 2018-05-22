new Vue({
    el: '#app',
    data: {
        orderList: ['待付款', '待发货', '待收货', '退款/退货'],
        scroTitle: false
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.downMenuSpot('transparent', 2);
        commentJs.appShowhide('app');
        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {//头部显示
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 50 ? _this.scroTitle = true : _this.scroTitle = false;
        },
        // 查看订单
        skewOrder: function (index) {
            console.log(index)
            window.location.href = '../order/order_list.html?title=' + index;
        },
        // 优惠券
        reward_detail: function () {
            window.location.href = 'reward_detail.html';
        },
        // 粉丝团
        skewLover: function () {

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