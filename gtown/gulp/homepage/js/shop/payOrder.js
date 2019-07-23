new Vue({
    el: '#app',
    data: {
        preLoading: true,
        title:'支付成功!',
        sucimg:'../../images/chenggong@2x.png',
        orderNumber:null,
        fictitiousType:null,
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.homeHader('支付');
        commentJs.toastLoading('数据读取中...');
        var _this = this;
        _this.orderNumber = commentJs.getUrlKey('orderNumber') || null;
        _this.fictitiousType = commentJs.getUrlKey('fictitiousType') || null;
        if(!_this.orderNumber) return;

        if(_this.fictitiousType == 1){
            _this.title = '支付成功!';
            _this.sucimg = '../../images/chenggong@2x.png';

        }else{
            _this.title = '支付失败!';
            _this.sucimg = '../../images/shibai.png';
        }

        setTimeout(function () {
            _this.preLoading = false;
        }, 800);
    },
    filters: {
        currency: function (value) {
            return (parseFloat(value)/100).toFixed(2)+'元';
        }
    },
    methods: {
        submit_able: function () { //返回首页
            window.location.href = '../home/home.html';
        },
        parClick: function (k) {//查看订单
            window.location.href = '../order/order_list.html?title=4';
        },
    }
})
