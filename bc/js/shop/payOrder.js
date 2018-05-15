new Vue({
    el: '#app',
    data: {
        preLoading: true,
        paytype:[{'src':'','title':'支付宝'},{'src':'','title':'微信'}],//支付方式选择
        parIndex:0,//支付方式下标
        orderPayNumber:null,
        orderNumber:null,
        orderPayment :null,
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.appShowhide('app');
        commentJs.downMenuSpot('header', 1);
        commentJs.toastLoading('数据读取中...');
        var _this = this;
        _this.orderNumber = commentJs.getUrlKey('orderNumber') || null;
        _this.orderPayment  = commentJs.getUrlKey('orderPayment') || null;
        if(!_this.orderNumber) return;
        if(!_this.orderPayment) return;
        setTimeout(function () {
            _this.preLoading = false;
            //_this.oListData();
        }, 800);
    },
    filters: {
        currency: function (value) {
            return (parseFloat(value)/100).toFixed(2);
        }
    },
    methods: {
        oListData: function () { //主菜单列表
            var _this = this;
            var suc = function (data) {
                _this.shopList = data.data.items;
            }
            commentJs.doPost('../../json/shopCar.json', '', suc);
        },
        parClick: function (k) {//支付方式选择
            this.parIndex = k;
        }
    }
})