new Vue({
    el: '#app',
    data: {
        oBackTopFixed: false,
        preLoading:true,
        reward_order:[{
            'time':'2018-04-11 16:49:20',
            'type':'购物',
            'num':'DD-10011-6-102-20180411164920-0001',
            'price':'88.00'
        }]
    },
    computed: {},
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.appShowhide('app');
        commentJs.downMenuSpot('transparent', 2);
        commentJs.toastLoading('加载中...');
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(function () {_this.preLoading=false;},1000);
    },

    methods: {
        // 查看订单
        skewOrder: function (index) {
            console.log(index)
            window.location.href = '../order/order_list.html?title=' + index;
        },
        // 优惠券
        skewCoupon: function () {

        },
        // 管理收货地址
        mangerAddress: function () {
            window.location.href = '../map/map_list.html';
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        }
    }


})