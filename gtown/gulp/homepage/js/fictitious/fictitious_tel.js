new Vue({
    el: '#list',
    data: {
        datas:{
            "equalFields":{"fictitious":true,"fictitiousType":2}
        },
        preLoading:true,
        phone:'',
        phoneAtrr:[],
        btnTrue:false,//支付按钮
        btnFalg:false,//确认支付
        btnTanFalg:false,//弹框
        oMoneyFalg:false,//积分不足
        subDatas:{//订单信息查询
            "count": 1,
            "fictitiousType":2,//虚拟商品类型(1:视频卡,2:手机充值) ,
            "orderType": "Fictitious",
            "linkId": null, //提交ID(商品提交类型发送的为SKU的ID,如果是团购订单,提交团购商品的ID)
            "preview": true, //是否为订单预览,结算为false,提交为true
            "subType": "SKU", // 提交类型(SKU:商品提交,Carog:购物车提交) ,
            "phoneNumber":null
        },
        moneyPay:{
            id:'',//选中id
            newMoney:0,//当前积分
            selMoney:0,//选中积分
        }
    },
    watch:{
        phone:{
            handler: function (val, oldVal){
                var _this = this;
                if(val.length == 11){
                    if(commentJs.checkPhone(val)){
                        _this.phoneAtrr[0].oClassStyle = 'sur';
                        _this.moneyPay.selMoney = _this.phoneAtrr[0].price;
                        _this.moneyPay.id = _this.phoneAtrr[0].id;
                        _this.btnTrue = true;
                    }else{
                        _this.empty();
                        _this.btnTrue = false;
                    }
                }else{
                    _this.empty();
                    _this.btnTrue = false;
                }
            },
            deep:true
        },
    },
    mounted: function() {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.homeHader('手机充值');
        commentJs.kefuLogo('kefu_logo');
        commentJs.toastLoading('加载中...');
        setTimeout(function () {_this.oData();},10)
    },
    filters: {

    },
    methods: {
        oData: function () {//请求数据
            var _this = this;
            var callback = function (data) {
                var _list = data.result.list,_num=1;
                _this.phoneAtrr = [];
                if(_list.length>0){
                    _list.forEach(function (v, k) {
                        (k+1)%3==0?v.oClassStyle = 'ml':v.oClassStyle = '';
                        v.valuePay = v.price + '泰币';
                        v.namePrice = v.price/100 + '元';
                       _this.phoneAtrr.push(v);
                    })
                }
                _this.preLoading = false;
            }
            o.productInfo( 1, 1000, _this.datas, callback);
            var suctotal = function (data) {
                if(data.result){
                    var _tol = data.result.total.integral;
                    _tol>0?_this.moneyPay.newMoney = _tol:_this.moneyPay.newMoney = 0;
                }
            }
            o.getUserIntegral(suctotal);
        },
        phoneAtrrClick:function(item,i){//话费套餐选择
            var _this = this;
            if(!_this.btnTrue){return;}

            console.log(item)
            _this.phoneAtrr.forEach(function (v,k) {
                (k+1)%3==0?v.oClassStyle = 'ml':v.oClassStyle = '';
            })
            item.oClassStyle=='ml'?item.oClassStyle='ml sur':item.oClassStyle='sur';
            _this.moneyPay.selMoney = item.price;
            _this.moneyPay.id = item.id;
        },
        empty:function () {
            var _this = this;
            _this.phoneAtrr.forEach(function (v,k) {
                (k+1)%3==0?v.oClassStyle = 'ml':v.oClassStyle = '';
            })
        },
        buyClick:function(){//立即支付
            var _this = this;
            console.log(_this.moneyPay.selMoney)
            _this.moneyPay.newMoney>_this.moneyPay.selMoney?_this.oMoneyFalg=false:(_this.oMoneyFalg=true,_this.moneyPay.selMoney=0);
            var suc = function (data) {
                var detailList = data.result,_spuTrue='';
                detailList.spuList.forEach(function (v,k) {
                    v.spuAttrList.forEach(function (n,m) {
                        _spuTrue+=n.id+','
                    })
                })
                _spuTrue = _spuTrue.substring(0,_spuTrue.length-1);
                _spuTrue = '['+_spuTrue+']';
                detailList.skuList.forEach(function (v,k) {
                    if(v.skuCombination == _spuTrue){
                        _this.subDatas.linkId = v.id;
                    }
                });
                if(_this.btnTrue){_this.btnTanFalg = true;}
            }
            o.productDetailId(_this.moneyPay.id,suc);
        },
        nobuyClick:function(){//取消
            this.btnTanFalg = false;
        },
        btnFalgClick:function(){//确认充值
            var _this = this;
            _this.subDatas.phoneNumber = _this.phone;
            var suc = function (data) {
                var _order = data.result.order;
                if(_order != null){
                    _this.payM(_order.orderNumber);
                }
            }
            o.shopSubOrder(_this.subDatas, suc);
        },
        payM:function (orderNumber) {
            var _this = this;
            var sucss = function (data) {
                window.location.href = '../shop/payOrder.html?orderNumber='+orderNumber+'&orderPayment='+data.result.integral+'&transactionNo='+data.result.transactionNo+'&fictitiousType='+_this.subDatas.fictitiousType;
            }
            o.payNotifyTest(orderNumber, sucss);
        }
    }

})