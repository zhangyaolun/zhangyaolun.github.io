new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        curFalg: 1,//实物订单与虚拟订单切换
        M_X_falg: false,//头部实物订单与虚拟订单 内容切换
        oMtabList: ['全部', '代付款', '待发货', '待收货'],
        oMtabFlag: 0,//实物tab切换
        order_none: false,//实物订单 有无数据
        oMitemList: [],//实物订单数据
        preLoading: true,
        oXtabList: ['全部', '代付款', '待使用'],
        oXtabFlag: 0,//虚拟tab切换
        odatas:{
            "orderState":null,
            "fictitious":false
        },
        page: 1,//地址页数
        count: 20,
        odatasState:[0,'Submit','Pay','Delivering']
    },
    computed: {},
    filters: {
        orderCurrency: function (value) {
            var _attr = {'Submit':'待付款','Pay':'待发货','Delivering':'待收货','Reject':'退款','Cancel':'已取消'};
            return value?_attr[value]:'';
        },
        currency: function (value) {
            return (parseFloat(value)/100).toFixed(2);
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.downMenuSpot('order_header', 2);
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        window.addEventListener('scroll', _this.handleScroll);
        var oAttr = commentJs.getUrlKey('title');
        oAttr == 0 ? (_this.oMtabFlag = 1,_this.odatas.orderState = 'Submit') : (oAttr == 1 ? (_this.oMtabFlag = 2,_this.odatas.orderState = 'Pay') : oAttr == 2 ? (_this.oMtabFlag = 3,_this.odatas.orderState = 'Delivering') : '');
        _this.preLoading = false;
        setTimeout(function () {
            _this.oListData();
        }, 10);
    },

    methods: {
        headerTab: function (index) {//头部实物订单与虚拟订单切换
            var _this = this;
            _this.curFalg = index;
            index==1?_this.odatas.fictitious=true:_this.odatas.fictitious=false;
            _this.M_X_falg = !_this.M_X_falg;
            _this.page = 1;
            setTimeout(function () {_this.oListData();}, 10);
        },
        oMtabClick: function (k) {//实物tab切换
            var _this = this;
                _this.oMtabFlag = k;
            k==0?_this.odatas.orderState = null:_this.odatas.orderState = _this.odatasState[k];
            _this.page == 1;
            setTimeout(function () {_this.oListData(); }, 10);
        },
        oListData: function () {//数据列表
            var _this = this;
            _this.preLoading = true;
            if(_this.oMtabFlag == 0 && _this.curFalg == 1){
                _this.odatas = {"fictitious":false}
            }else if(_this.oXtabFlag == 0 && _this.curFalg == 2){
                _this.odatas = {"fictitious":true}
            }
            var suc = function (data) {
                if(_this.page == 1){_this.oMitemList = [];}
                if(data.result.list.length>0){
                    _this.order_none = false;
                    data.result.list.forEach(function (v, k) {
                        if(v.orderProduct.length != 0){
                            //计算商品总数
                            var _num = 0;
                           v.orderProduct.forEach(function (n, m) {
                               _num += parseInt(n.count);
                           });
                           v.oNum = _num;
                           _this.oMitemList.push(v);
                        }
                    });
                }else{
                    if(_this.page == 1){_this.order_none = true;}
                }
                _this.preLoading = false;
            }
            o.userOrder(_this.page,_this.count,_this.odatas, suc);
        },
        payOrder: function (id) {//订单支付
            console.log(id);
        },
        order_Delid: function (id) {//取消订单
            console.log(id);
            var _this = this;
            var suc = function (data) {
                console.log(data);
                _this.page == 1;
                commentJs.toastTitle('删除成功','');
                setTimeout(function () {_this.oListData();}, 10);
            }
            o.userOrderCancel(id,suc);
        },
        order_Delete: function (id) {//订单删除
            console.log(id);
        },
        oXtabClick: function (k) {
            this.oXtabFlag = k;
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.page++;
                _this.oListData();
            }
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        },
    }


})