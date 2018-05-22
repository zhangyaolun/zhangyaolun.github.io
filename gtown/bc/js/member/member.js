new Vue({
    el: '#app',
    data: {
        orderList: ['待付款', '待发货', '待收货', '退款/退货'],
        scroTitle: false,
        loginName:'',//点击登录
        loginNameFalg:false,
        shopCollNum:-1,//商品收藏
        sellCollNum:-1,//店铺收藏
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.downMenuSpot('transparent', 2);
        commentJs.homeHader();
        var _this = this;
        commentJs.headerFooter(3);
        if(sessionStorage.getItem("a")){
            _this.shopCollNum = commentJs.getCookie('shopCollNum') || 0;
            _this.sellCollNum = commentJs.getCookie('sellCollNum') || 0;
        }else {
            _this.collection();
            sessionStorage.setItem("a","1");
        }
        var loginName = commentJs.getCookie('userName');
        var userId = commentJs.getCookie('userId');
        loginName?(_this.loginName=loginName,_this.loginNameFalg =true):(_this.loginName='点击登录',_this.loginNameFalg=false);
        if(userId.split('|')[1] == 'false'){
            var suc = function (data) {
                var _userId = userId.split('|')[0] + '|' + true;
                commentJs.setCookie('userId',_userId,1);
            }
            o.userSign(suc);
        }
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
            index == 3?window.location.href = '../order/order_refund_list.html':window.location.href = '../order/order_list.html?title=' + index;
        },
        // 奖励金
        rewardClick: function () {
            window.location.href = 'reward.html';
        },
        // 积分
        integralClick: function () {
            window.location.href = 'integral.html';
        },
        // 点击登录
        loginClick: function () {
            var _this = this;
            console.log(_this.loginNameFalg)
            _this.loginNameFalg?window.location.href = 'usercenter.html':window.location.href = '../login/login.html';
        },
        // 管理收货地址
        mangerAddress: function () {
            window.location.href = '../map/map_list.html';
        },
        // 查询商品收藏与店铺收藏数量
        collection: function () {
            var _this = this;
            var suc = function (data){
                _this.shopCollNum = data.result.total;
                commentJs.setCookie('shopCollNum',_this.shopCollNum,1);
            }
            o.collectionList(1,1,10,suc);
            var sucs = function (data){
                _this.sellCollNum = data.result.total;
                commentJs.setCookie('sellCollNum',_this.sellCollNum,1);
            }
            o.collectionList(2,1,10,sucs);
        },
    }
})