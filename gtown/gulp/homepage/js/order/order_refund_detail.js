new Vue({
    el: '#app',
    data: {
        oMitemList: {},//订单数据
        defaultList:'退款原因',
        defaultd:'退款编号',
        title:'退款信息',
        src:'../../images/daifa.png'
    },
    filters: {
        orderStatus: function (value) {// ['','等待卖家审核','卖家审核通过','卖家审核通过','卖家审核通过','卖家审核未通过','卖家审核通过'];
            var _attr = ['','等待卖家审核','等待卖家审核','等待卖家审核','已完成','退货/款失败','退货/款失败'];
            return value?_attr[value]:'';
        },
        orderSta: function (value) {
            var _attr = ['','','','等待平台审核','平台审核通过','','平台审核不通过'];
            return value?_attr[value]:'';
        },
        currency: function (value) {
            return parseFloat(value)+'积分';
        },
        time: function (value) {
            return value?value.split(' ')[0]:'';
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        var oData = sessionStorage.getItem('refundlist');
        if (!oData) return;
        _this.oMitemList = JSON.parse(oData);
        _this.oMitemList.refundNumber == 4?_this.src='../../images/wanchengtuikuan.png':_this.src='../../images/chuli.png';
        console.log(_this.oMitemList)
        if(_this.oMitemList.refundType == 2){
            commentJs.homeHader('退货详情');
            _this.defaultList = '退款原因';
            _this.defaultd = '退款编号';
            _this.title = '退款信息';
        }else{
            commentJs.homeHader('退款详情');
            _this.defaultList = '退货原因';
            _this.defaultd = '退货编号';
            _this.title = '退款信息';
        }
    },
    methods: {

    }


})
