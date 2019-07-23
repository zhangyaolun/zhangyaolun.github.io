new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        curFalg: 1,//实物订单与虚拟订单切换
        M_X_falg: false,//头部实物订单与虚拟订单 内容切换
        oMtabList: ['全部订单', '待付款', '待发货', '待收货'],
        oMtabFlag: 0,//实物tab切换
        oMitemList: [],//实物订单数据
        order_none: false,//实物订单 有无数据
        oFitemList: [],//虚拟订单数据
        orderF_none: false,//虚拟订单 有无数据
        preLoading: true,
        oXtabList: [],
        oXtabFlag: 0,//虚拟tab切换
        odatas:{
            "orderState":null,
            "fictitious":false,
            "keyword":""
        },
        page: 1,//地址页数
        count: 10,
        odatasState:[0,'Submit','Pay','Delivering'],
        dialogWrapper:false,
        oid:'',
        delData:{id:'',i:''},
        diaTitle:'确认删除吗？',
        falgDel:false

    },
    computed: {},
    filters: {
        orderCurrency: function (value) {
            var _attr = {'Submit':'待付款','Pay':'待发货','Delivering':'待收货','Reject':'退货','Refund':'退款','Cancel':'已取消','Received':'已完成'};
            return value?_attr[value]:'';
        },
        currency: function (value) {
            return value?'¥'+(parseInt(value)/100).toFixed(2):'¥0.00';
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.homeHader('我的订单','../member/member.html');
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        var oAttr = commentJs.getUrlKey('title');
        oAttr == 0 ? (_this.oMtabFlag = 1,_this.odatas.orderState = 'Submit') : (oAttr == 1 ? (_this.oMtabFlag = 2,_this.odatas.orderState = 'Pay') : oAttr == 2 ? (_this.oMtabFlag = 3,_this.odatas.orderState = 'Delivering') : '');

        var fictitiousType = commentJs.getUrlKey('fictitiousType') || null;
        var curFalgType = sessionStorage.getItem('curFalg') || 1;
        if((fictitiousType != null && fictitiousType != 'null') || curFalgType==2){
            _this.curFalg = 2;
            _this.odatas.fictitious=true;
            _this.M_X_falg = true;
        }

        setTimeout(function () {
            _this.oListData();
        }, 10);
        window.addEventListener('scroll', _this.handleScroll);
    },

    methods: {
        headerTab: function (index) {//头部实物订单与虚拟订单切换
            var _this = this;
            if(index == _this.curFalg){return;}
            _this.curFalg = index;
            index==1?_this.odatas.fictitious=false:_this.odatas.fictitious=true;
            _this.M_X_falg = !_this.M_X_falg;
            _this.page = 1;
            _this.odatas.keyword = "";
            _this.preLoading = true;
            _this.oMitemList = [];
            setTimeout(function () {
                _this.oListData();
            }, 10);
        },
        oMtabClick: function (k) {//实物tab切换
            var _this = this;
                _this.oMtabFlag = k;
            k==0?_this.odatas.orderState = null:_this.odatas.orderState = _this.odatasState[k];
            _this.page = 1;
            _this.oListData();
        },
        oListData: function () {//数据列表
            var _this = this;
            _this.preLoading = true;
            var _keyword = _this.odatas.keyword;
            if(_this.oMtabFlag == 0 && _this.curFalg == 1){
                _this.odatas = {"fictitious":false,"keyword":_keyword};
            }else if(_this.oXtabFlag == 0 && _this.curFalg == 2){
                _this.preLoading = false;
                _this.odatas = {"fictitious":true,"keyword":_keyword,"orderState":""}
            }
            var suc = function (data) {
                if(_this.page == 1 && _this.curFalg == 1){_this.oMitemList = [];}
                if(data.result.list.length>0){
                    $('body').removeClass('bgf');
                    _this.order_none = false;
                    _this.orderF_none = false;
                    data.result.list.forEach(function (v, k) {
                        if(v.orderProduct.length != 0 && v.seller){
                            //计算商品总数
                            var _num = 0;
                           v.orderProduct.forEach(function (n, m) {
                               _num += parseInt(n.count);
                           });
                           v.oNum = _num;
                           _this.oMitemList.push(v);
                        }
                    });
                    if(_this.oMitemList == ''){_this.order_none = true;_this.orderF_none = true;}
                }else{
                    $('body').addClass('bgf');
                    if(_this.page == 1){_this.order_none = true;_this.orderF_none = true;}
                }
                _this.preLoading = false;
            }
            o.userOrder(_this.page,_this.count,_this.odatas, suc);
        },
        confirmOrder: function (id) {//确认收货
            var _this = this;
            var suc = function (data) {
                _this.page = 1;
                commentJs.toastTitle('收货成功','');
                setTimeout(function () {_this.oListData();}, 10);
            }
            o.userOrderConfirm(id,suc);
        },
        payOrder:function(orderNumber){
            var _this = this;
            var sucsss = function (data){
                var _res = data.result;
                _this.preLoading = false;
                WeixinJSBridge.invoke('getBrandWCPayRequest',{"appId" : _res.appId,"timeStamp" : _res.timeStamp, "nonceStr" : _res.nonceStr, "package": _res.package,"signType" : "MD5", "paySign" : _res.paySign },function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                        window.location.href = '../shop/payOrder.html?orderNumber='+orderNumber+'&fictitiousType=1';
                    }else if(res.err_msg == "get_brand_wcpay_request:cancel"){

                    }else{
                        window.location.href = '../shop/payOrder.html?orderNumber='+orderNumber+'&fictitiousType=0';
                    }

                })
            }
            o.wxpayorderNumber(orderNumber, sucsss);
        },
        order_Confirm: function (id,i) {//确认收货
            var _this = this;
            _this.delData.id = id;
            _this.delData.i = i;
            _this.diaTitle = '您是否已收到此订单商品吗？';
            _this.dialogWrapper = true;
        },
        order_Delid: function (id,i) {//取消订单
            var _this = this;
            _this.delData.id = id;
            _this.delData.i = i;
            _this.diaTitle = '确认取消吗？';
            _this.dialogWrapper = true;
        },
        btnMoreDel: function (id,i) {//删除
            var _this = this;
            _this.delData.id = id;
            _this.delData.i = i;
            _this.diaTitle = '确认删除吗？';
            _this.dialogWrapper = true;
        },
        btnCancel: function () {//删除取消
            this.dialogWrapper = false;
            this.falgDel = false;
        },
        order_Delete: function () {//订单删除
            var _this = this;
            if(_this.falgDel)return;
            _this.falgDel = true;
            _this.dialogWrapper = false;
            setTimeout(function () {
                if(_this.diaTitle == '确认删除吗？'){
                    var suc = function (data) {
                        _this.falgDel =false;
                        commentJs.toastTitle('删除成功','');
                        _this.oMitemList.splice(_this.delData.i, 1);
                        //setTimeout(function () {_this.oListData();}, 10);
                    }
                    o.userOrderDelete(_this.delData.id,suc);
                }else if(_this.diaTitle == '您是否已收到此订单商品吗？'){
                    var suc = function (data) {
                        _this.page = 1;
                        commentJs.toastTitle('收货成功','');
                        setTimeout(function () {_this.falgDel =false;_this.oListData();}, 10);
                    }
                    o.userOrderConfirm(_this.delData.id,suc);
                }else if(_this.diaTitle == '确认取消吗？'){
                    var suc = function (data) {
                        _this.page = 1;
                        commentJs.toastTitle('取消成功','');
                        setTimeout(function () {_this.falgDel =false;_this.oListData();}, 10);
                    }
                    o.userOrderCancel(_this.delData.id,suc);
                }
            },10)
        },
        oXtabClick: function (k) {//虚拟订单 tab点击
            var _this = this;
            _this.oXtabFlag = k;
            k==0?_this.orderF_none=false:_this.orderF_none=true;
            _this.page = 1;
            _this.oListData();
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            if (($(window).height() + $(document).scrollTop()) == $(document).height()) {
                _this.page++;
                _this.oListData();
            }
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        },
    }


})
