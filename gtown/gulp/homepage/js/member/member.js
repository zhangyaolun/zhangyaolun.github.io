new Vue({
    el: '#app',
    data: {
        orderList: [{"name":"待付款","num":0},{"name":"待发货","num":0},{"name":"待收货","num":0},{"name":"退款/退货","num":0} ],
        loginName:'',//点击登录
        loginNameFalg:false,
        albumpic_big:'',
        newsList:[],
        orderintegral:0,
        loginFalg:false
    },
    computed: {},
    filters: {
    },
    mounted: function () {
        FastClick.attach(document.body);
        var _this = this;
        commentJs.headerFooter(4);
        _this.albumpic_big = sessionStorage.getItem('logo') || '../../images/logo_b.png';
        setTimeout(function () {_this.orderNum();commentJs.shopcarAll();},200);
        setInterval('commentJs.AutoScrolls("scroll-mmnews")', 2500);
        var loginName = sessionStorage.getItem('userName');
        _this.loginName=loginName;
        !loginName?_this.loginFalg=true:_this.loginFalg=false;
        commentJs.kefuLogo('kefu_logo');
    },

    methods: {//头部显示
        // 查看订单
        skewOrder: function (index) {
            index == 3?window.location.href = '../order/order_refund_list.html':window.location.href = '../order/order_list.html?title=' + index;
        },
        // 登录
        loginClick: function () {
            return;
            window.location.href = '../login/login.html';
        },
        // 收藏
        favorites_btn: function () {
            window.location.href = './favorites.html';
        },
        // 个人设置
        personal_logo: function () {
            if(!this.loginName)return;
            window.location.href = './member_personal.html';
        },
        // 足迹
        zuji_btn: function () {
            window.location.href = './footprint.html';
        },
        // 管理收货地址
        mangerAddress: function () {
            window.location.href = '../map/map_list.html';
        },
        orderNum: function () {// 查询各个订单数量
            var _this = this;
            var userId = sessionStorage.getItem('userId');
            if(!userId)return;
            var sucs = function (data) {
                var _data = data.result;
                _this.orderList[0].num = _data.Submit;
                _this.orderList[1].num = _data.Pay;
                _this.orderList[2].num = _data.Delivering;
            }
            o.userOrderCount(sucs);
            var sucNew = function (data) {
                _this.newsList = [];
                if(data.result && data.result.length>0){
                    data.result.forEach(function (v,k) {
                        if(v.isOpen){
                            _this.newsList.push(v);
                        }
                    })
                }
            }
            o.homeNews(22,sucNew);
        },
    }
})
