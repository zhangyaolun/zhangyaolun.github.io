new Vue({
    el: '#app',
    data: {
        headertitle:'退款申请',
        oData:{},//商品数据
        listtitle:[
            {name:'我不想买了',select:true},
            {name:'信息填写错误，重新拍',select:false},
            {name:'买多了/买错了',select:false},
            {name:'其他原因',select:false}
        ],
        datas:{
            userId:'',
            orderId:'',
            productId:'',
            refundType:1,//退款或者退货(1:退款;2:退货) ,
            sellerId:'',
            applyRewardRmb:0.00,//奖励金
            applyRefundRmb:0,//退款金额
            count:1,//退款数量
            refundReason:'我不想买了',//退货说明
            skuId:'',
            payType:''
        },
        rate:0,//比例
        productStatus:'',//退款状态 Refund 退款 Reject 退货
        active:false,//提交按钮判断
    },
    filters: {
        currency: function (value) {
            return value?(parseInt(value)/100).toFixed(2)+'元':'0.00';
        },
        createTime: function (value) {
            return value?value.split(' ')[0]:'';
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        var _data = sessionStorage.getItem('refund') || '';
        _this.datas.userId = commentJs.getUrlKey('uid');
        commentJs.kefuLogo('kefu_logo');
        if(!_data && _this.datas.userId)return;
        _this.oData = JSON.parse(_data);
        console.log(_this.oData )
        _this.oData.refundType==1?commentJs.homeHader('退款申请'):commentJs.homeHader('退货申请');
        _this.datas.count = _this.oData.count;
        _this.datas.orderId = _this.oData.orderId;
        _this.datas.productId = _this.oData.productId;
        _this.datas.skuId = _this.oData.skuId;
        _this.datas.refundType = _this.oData.refundType;
        _this.datas.sellerId = _this.oData.sellerId;
        _this.datas.payType = _this.oData.payType;
        _this.productStatus = _this.oData.productStatus;
        _this.datas.applyRefundRmb = _this.oData.rate;
        (_this.productStatus == 'Refund' || _this.productStatus == 'Reject')?_this.active = true:_this.active = false;
    },

    methods: {
        oReduceClick: function (i) {//原因选择
            var _this = this;
            _this.listtitle.forEach(function (v,k) {
                v.select=false;
                _this.datas.refundReason='';
            })
            _this.listtitle.forEach(function (v,k) {
                if(i==k){
                    v.select=true;
                    _this.datas.refundReason=v.name;
                }
            })
        },
        submintClick: function () {//提交
            var _this = this;
            if(_this.active){
                return;
            }
            var _fundRmb = JSON.parse(JSON.stringify(_this.datas));

            var suc = function (data) {
                _this.oData.refundType == 1?_this.oData.productStatus='Refund':_this.oData.productStatus='Reject';
                sessionStorage.removeItem('refund');
                sessionStorage.setItem('refund',JSON.stringify(_this.oData));
                commentJs.toastTitle('提交成功','');
                setTimeout(function () {
                   window.location.href = 'order_refund_list.html';
                },1500)
            }
            o.refundApply(_fundRmb, suc);
        },
    }


})
