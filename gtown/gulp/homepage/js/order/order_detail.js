new Vue({
    el: '#app',
    data: {
        curFalg: 1,//实物订单与虚拟订单切换
        M_X_falg: false,//头部实物订单与虚拟订单 内容切换
        oMtabList: ['全部', '代付款', '待发货', '待收货'],
        oMtabFlag: 0,//实物tab切换
        oMitemList: {},//订单数据
        preLoading: true,
        oXtabList: ['全部', '代付款', '待使用'],
        invoiceTitle:'不需要开发票',//发票结果显示
        odatas:{
            "keyword":"",
            "fictitious":false
        },
        page: 1,//地址页数
        count: 20,
        orderStateImg:'../../images/daifa.png',
        endTime: '',
        fictitiousFalg:true,
        dialogWrapper:false
    },
    computed: {},
    filters: {
        orderCurrency: function (value) {
            var _attr = {'Submit':'待付款','Pay':'待发货','Delivering':'待收货','Reject':'退货','Refund':'退款','Cancel':'已取消','Received':'已完成'};
            return value?_attr[value]:'';
        },
        currency: function (value) {
            return value?(parseInt(value)/100).toFixed(2)+'元':'0.00';
        },
        dataFormatcurrency: function (value) {
            return value?commentJs.dataFormat(value, 1):'';
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.homeHader('订单详情');
        sessionStorage.removeItem('refund');
        commentJs.toastLoading('加载中...');
        var _orderNumber = commentJs.getUrlKey('orderNumber'),
            _fictitious = commentJs.getUrlKey('fictitious');

        if(_orderNumber && _fictitious){
            _this.odatas.fictitious = _fictitious;
            _this.odatas.keyword = _orderNumber;
            setTimeout(function () {
                _this.oListData();
            }, 10);
        }else{
            _this.preLoading = false;
        }
    },

    methods: {
        oListData: function () {//数据列表
            var _this = this;
            _this.preLoading = true;
            var suc = function (data) {
                if(data.result.list.length > 0){
                    data.result.list.forEach(function (v, k) {
                        if(v.orderProduct.length != 0 && k==0){
                            //计算商品总数
                            var _num = 0;
                            var _attr = {
                                'Refund':'../../images/chuli.png',//退货
                                'Reject':'../../images/chuli.png',//退款
                                'Submit':'../../images/daishouhuo.png',//待付款
                                'Pay':'../../images/daifa.png',//待发货
                                'Delivering':'../../images/daishouhuo.png',//待收货
                                'Received':'../../images/yiwancheng.png',//已完成
                                'Cancel':'../../images/daishouhuo.png',//已取消
                            },_attrTitle = {
                                'Cancel':'已取消',
                                'Pay':'退款',
                                'Received':'退货',
                                'Refund':'退款中',
                                'Reject':'退货中',
                                'RefundSuccess':'退款完成',
                                'RejectSuccess':'退货完成',
                                'RefundFail':'退款失败',
                                'RejectFail':'退货失败'
                            };
                            _this.curFalg = 1;
                            v.fictitious?(_this.curFalg = 0,sessionStorage.setItem('curFalg',2),_this.fictitiousFalg = false):(_this.curFalg = 1,sessionStorage.setItem('curFalg',1),_this.fictitiousFalg = true);


                            _this.orderStateImg = _attr[v.orderState];
                            v.orderProduct.forEach(function (n, m) {
                                if(n.productStatus == 'RefundSuccess' || n.productStatus == 'RejectSuccess'|| n.productStatus == 'RefundFail'|| n.productStatus == 'RejectFail' || n.productStatus == 'Refund'|| n.productStatus == 'Reject'){
                                    n.refundTitleNum = 2;
                                }else{
                                    n.refundTitleNum = 1;
                                }
                                console.log(n.refundTitleNum)
                                n.refundTitle = '';
                                _num += parseInt(n.count);
                                n.rate = (parseInt(n.count)*parseInt(n.price)/parseInt(v.productTotalPrice))*v.orderPayment;
                                n.payType = v.payType;
                                if(v.orderState == 'Pay' && !n.productStatus){
                                    n.refundTitle = _attrTitle[v.orderState];
                                }else{
                                    n.refundTitle = _attrTitle[n.productStatus];
                                }
                                v.orderState == 'Received'?n.refundType=2:n.refundType=1;
                            });
                            v.oNum = _num;
                            _this.oMitemList = v;
                        }
                    if(_this.endTime){
                        var funTime = function(){
                            _this.confirmOrder();
                        }
                        commentJs.fnTimeCountDown(_this.endTime,funTime);
                    }
                    _this.preLoading = false;
                })
                }
            }
            o.userOrder(_this.page,_this.count,_this.odatas, suc);
        },
        btnMoreDel: function () {//确定或取消
            this.dialogWrapper = true;
        },
        btnCancel: function () {//取消
            this.dialogWrapper = false;
        },
        confirmOrder: function () {//确认收货
            var _this = this;
            _this.dialogWrapper = false;
            var suc = function (data) {
                commentJs.toastTitle('收货成功','');
                setTimeout(function () {_this.oListData();}, 10);
            }
            o.userOrderConfirm(_this.oMitemList.id,suc);
        },
        DownShelfClick: function (id,status) {//商品下架处理跳转
            var _this = this;
            if(!_this.fictitiousFalg)return;
            if(status == 'OnShelf'){
                window.location.href = '../product/product_detail.html?goods_id='+id;
            }else{
                window.location.href = '../member/shopLower.html';
            }
        },
        oXtabClick: function (item) {//退款跳转
            if(item.refundTitle != '退款' && item.refundTitle != '退货')return;
            sessionStorage.setItem('refund',JSON.stringify(item));
            window.location.href = 'order_refund.html?uid='+this.oMitemList.userId;
        },
    }


})
