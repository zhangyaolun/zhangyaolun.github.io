new Vue({
    el: '#app',
    data: {
        MapCh_falg: true,//地址管理
        MapCh_fa: false,//地址管理后退
        MapNew_falg: true,//新建地址
        MapNew_fa: false,//新建地址后退
        dialogWrapper:false,//弹出没有收货地址
        submitColor:false,//改变按钮颜色
        containerList:[],//商品信息列表
        orderAllPayment:0,//总合计金额
        oDatas:{//订单信息查询
            "activityId": null, //活动ID存放(如:团购活动,参团订单需要在这里存放参团的活动ID) ,
            "addressId": null, // 订单地址信息 ,
            "invoice":null, //发票信息 ,
            "buyerRemark":null, //商品备注信息,key:商家ID,value:商家备注
            "couponId": null, //优惠券ID
            "count": 0,
            "fictitiousType":null,//虚拟商品类型(1:视频卡,2:手机充值) ,
            "orderType": "Ordinary", //订单类型(Ordinary:普通订单,GroupBuy:团购订单,Spike:秒杀订单,Fictitious:虚拟商品订单) ,
            "linkId": null, //提交ID(商品提交类型发送的为SKU的ID,如果是团购订单,提交团购商品的ID)
            "preview": false, //是否为订单预览,结算为false,提交为true
            "subType": "Carog" // 提交类型(SKU:商品提交,Carog:购物车提交) ,
        },
        oDatasAddress:{//订单选中的收货地址显示
            'receiverName':'',
            'telephone':'',
            'province':'',
            'city':'',
            'area':'',
            'address':'',
            'id':''
        },
        submitDate:{//保存地址信息
            'receiverName':'',
            'telephone':'',
            'aliasName':'',
            'province':'',
            'city':'',
            'area':'',
            'address':'',
            'defaults':false,
        },
        product: [],//收货地址列表
        page: 1,//地址页数
        count: 10,
        couponPriceTrue:0,//积分抵扣
        orderintegral:0,//积分
        couponPriceTrueFalg:false,//提交订单
    },
    computed: {
        mapAddress:function () {
            var _this = this;
            if(_this.submitDate.province!=''){
                return _this.submitDate.province+' '+_this.submitDate.city+' '+_this.submitDate.area;
            }
        }
    },
    watch:{
        submitDate:{
            handler: function (val, oldVal){
                var _this = this;
                (val.receiverName != '' && val.telephone != '' && val.province != '' && val.city != ''&& val.area != ''&& val.address != '')?_this.submitColor = true:_this.submitColor = false;
            },
            deep:true
        },
    },
    filters: {
        currency: function (value) {
            return value?(parseInt(value)/100).toFixed(2)+'元':'0.00';
        },
        currencys: function (value) {
            return value?(parseInt(value)/100).toFixed(2)+'元':'0.00';
        },
        oPriceCurrency: function (value) {
            return value?(parseInt(value)/100).toFixed(2)+'元':'0.00';
        },
        oTimeCurrency: function (value) {
            return commentJs.dataFormat(value);
        },
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.homeHader('确认订单');
        commentJs.toastLoading('购物车数据读取中...');
        var _this = this;
            _this.oDatas.subType = commentJs.getUrlKey('subType') || null;
            _this.oDatas.fictitiousType = commentJs.getUrlKey('fictitiousType') || null;
            _this.oDatas.orderType = commentJs.getUrlKey('orderType') || "Ordinary";
        if(sessionStorage.getItem('orderNum') != 1){
            return;
        }
        if(!_this.oDatas.subType) return;
        if(_this.oDatas.subType == 'SKU' || _this.oDatas.orderType == 'GroupBuy'){
            _this.oDatas.linkId = commentJs.getUrlKey('linkId') || null;
            _this.oDatas.count = commentJs.getUrlKey('count') || 1;
        }
        // var suc = function (data) {
        //     if(data.result){
        //         _this.orderintegral = data.result.total.integral;
        //     }
        // }
        // o.getUserIntegral(suc);
        _this.oDatas.subType = commentJs.getUrlKey('subType') || null;
        _this.oDatas.orderType = commentJs.getUrlKey('orderType') || "Ordinary";
        if(!_this.oDatas.subType) return;

        setTimeout(function () {
            _this.oDefaultAddress();
        }, 10);

    },
    methods: {
        oDefaultAddress: function () { //查询默认地址
            var _this = this;
            var suc = function (data) {
                if(data.result){
                    var _data = data.result;
                    _this.oAddressShow(_data);
                }else{
                    _this.oUseBuyerAddress();
                }
                _this.preLoading = false;
            }
            o.useDefaultAddress(suc);
        },
        oUseBuyerAddress: function () { //查询地址列表
            var _this = this;
            _this.preLoading = true;
            var suc = function (data) {
                var _list = data.result.list;
                if(data.result.list && data.result.list.length>0){
                    _this.oAddressShow(_list[0]);
                }else{
                    _this.dialogWrapper = true;
                    var btnTrue = function () {
                        _this.dialogWrapper = false;
                        _this.MapNew();
                    }
                    var btnCancel = function () {
                        window.history.back();
                    }
                    commentJs.simpleDialogWrapper('请添加地址',btnTrue,btnCancel);
                }
                _this.preLoading = false;
            }
            o.useBuyerAddress(_this.page, _this.count, suc);
        },
        oUseAddAddress: function () { //新建地址
            var _this = this;
            var suc = function (data) {
                _this.oAddressShow(data.result);
                _this.MapCh_falg = true;
                _this.MapNew_falg = true;
            }
            o.useAddAddress(_this.submitDate, suc);
        },
        oListData: function () {//订单信息查询
            var _this = this;
            var suc = function (data) {
                var _order = data.result.order;
                var _childOrders = data.result.childOrders;
                var _parentOrder = data.result.parentOrder;
                if(_order != null){
                    _this.containerList[0] = {'sellerName':_order.seller.shopName,'orderList':[],'freightPrice':_order.freightPrice,'orderPayment':_order.orderPayment,'sellerId':_order.sellerId,'sellerBuyerRemark':''}
                    _this.orderAllPayment = _order.orderPayment;
                    _order.orderProduct.forEach(function (v,k) {
                        _this.containerList[0].orderList.push(v);
                    })
                }else{
                    _this.orderAllPayment = 0;
                    _childOrders.forEach(function (v,k) {
                        _this.containerList[k] = {'sellerName':v.seller.shopName,'orderList':[],'freightPrice':v.freightPrice,'orderPayment':v.orderPayment,'sellerId':v.sellerId,'sellerBuyerRemark':''}
                        _this.orderAllPayment += v.orderPayment;
                        v.orderProduct.forEach(function (n,m) {
                            _this.containerList[k].orderList.push(n);
                        })
                    })
                }
                _this.couponPriceTrue = (_this.orderAllPayment).toFixed(0);
                _this.couponPriceTrueFalg = true;
                // if( _this.orderintegral>=_this.orderAllPayment){
                //     _this.couponPriceTrue = (_this.orderAllPayment).toFixed(0);
                //     _this.couponPriceTrueFalg = true;
                // }else{
                //     _this.couponPriceTrue = 0;
                //     _this.couponPriceTrueFalg = false;
                // }
                _this.preLoading = false;
            }
            o.shopSubOrder(_this.oDatas, suc);
        },
        MapChoice: function () {//点击地址，显示地址管理
            var _this = this;
            var suc = function (data) {
                if(_this.page == 1){_this.product = [];}
                data.result.list.forEach(function (v, k) {
                    _this.product.push(v);
                })
                _this.MapCh_falg = false;
                _this.MapCh_fa = true;
            }
            o.useBuyerAddress(_this.page, _this.count,suc);
        },
        oDatasAddressClick: function (i) {//地址管理列表选择收货地址
            var _this = this;
            _this.oAddressShow(_this.product[i]);
            _this.MapCh_falg = true;
        },
        MapBack: function () {//地址管理后退
            this.MapCh_falg = true;
        },
        MapNew: function () {//新建地址
            var _this = this;
            _this.MapNew_falg = false;
            _this.MapNew_fa = true;
            $("#sex").select({
                title: "选择标签",
                autoClose:true,
                items: ["无","家", "学校", "公司"],
                onClose: function(d) {
                    if(d.data.values == "无"){
                        _this.submitDate.aliasName = '';
                    }else{
                        _this.submitDate.aliasName = d.data.values;
                    }
                }
            });
        },
        MapNewBack: function () {//新建地址后退
            var _this = this;
            _this.oDatasAddress.receiverName == ''?_this.dialogWrapper = true:_this.MapNew_falg = true;
        },
        MapCityClick: function () {//新增地址城市选择
            var _this = this;
            console.log('090');
            commentJs.areaSelected({
                success: function (data) {
                    area_info = data.area_info;
                    _this.submitDate.province = data.area_id_1;
                    _this.submitDate.city = data.area_id_2;
                    _this.submitDate.area = data.area_id_3;
                    $('#varea_info').val(data.area_info);
                }
            });
        },
        oAddressShow:function (data) {//地址选中数据
            var _this = this;
            _this.oDatasAddress.receiverName = data.receiverName;
            _this.oDatasAddress.telephone = data.telephone;
            _this.oDatasAddress.province = data.province;
            _this.oDatasAddress.city = data.city;
            _this.oDatasAddress.area = data.area;
            _this.oDatasAddress.address = data.address;
            _this.oDatasAddress.id = data.id;
            _this.oDatas.addressId = data.id;
            if(sessionStorage.getItem('orderNum') == 1){
                setTimeout(function () {
                    _this.oListData();
                }, 10);
            }else {
                _this.preLoading = false;
            }
        },
        default_click: function (){//默认地址切换
            this.submitDate.defaults = !this.submitDate.defaults;
        },
        submit_click: function (){//地址提交
            var _this = this;
            if(_this.submitColor){
                var phone = _this.submitDate.telephone;
                if(!commentJs.checkPhone(phone) && !commentJs.checkFixedPhone(phone)){
                    commentJs.toastTitle('手机号输入有误','forbidden');
                    return;
                }
                var suc = function (data) {
                    if(data.result.list.length == 0){
                        _this.submitDate.defaults = true;
                        _this.oUseAddAddress();
                    }else{
                        _this.oUseAddAddress();
                    }
                }
                o.useBuyerAddress(1,10,suc);
            }
        },
        payOrderClick:function () {//提交订单  payOrder.html
            var _this = this;
            if(_this.preLoading)return;
            _this.preLoading = true;
            _this.oDatas.preview = true;
            if(!_this.couponPriceTrueFalg){return;}

            if(_this.containerList.length > 1){
                _this.oDatas.buyerRemark = {};
                _this.containerList.forEach(function (v,k) {
                    if(v.sellerBuyerRemark != '') {
                        _this.oDatas.buyerRemark[v.sellerId] = v.sellerBuyerRemark;
                    }
                })
                if(JSON.stringify(_this.oDatas.buyerRemark) == "{}"){
                    _this.oDatas.buyerRemark = null;
                }
            }else{
                if(_this.containerList[0].sellerBuyerRemark == '') {
                    _this.oDatas.buyerRemark = null;
                }else{
                    _this.oDatas.buyerRemark = {};
                    var _sellerId = _this.containerList[0].sellerId;
                    _this.oDatas.buyerRemark[_sellerId] = _this.containerList[0].sellerBuyerRemark;
                }
            }
            var suc = function (data) {
                var _order = data.result.order;
                var _parentOrder = data.result.parentOrder;
                commentJs.shopcarAll();
                if(_order != null){
                    _this.payM(_order.orderNumber,1);
                }else{
                    _this.payM(_parentOrder.orderNumber,2);
                }
            }
            o.shopSubOrder(_this.oDatas, suc);
        },
        payM:function (orderNumber) {
            var _this = this;
            var sucsss = function (data){
                var _res = data.result;
                WeixinJSBridge.invoke('getBrandWCPayRequest',{"appId" : _res.appId,"timeStamp" : _res.timeStamp, "nonceStr" : _res.nonceStr, "package" : _res.package,"signType" : "MD5", "paySign" : _res.paySign },function(res){
                    _this.preLoading = false;
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                        sessionStorage.setItem('orderNum',2);
                        window.location.href = 'payOrder.html?orderNumber='+orderNumber+'&fictitiousType=1';
                    }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                        if(_this.oDatas.subType=='Carog'){
                            sessionStorage.setItem('orderNum',2);
                            window.location.href = '../order/order_list.html?title=4';
                        }
                    }else{
                        sessionStorage.setItem('orderNum',2);
                        window.location.href = 'payOrder.html?orderNumber='+orderNumber+'&fictitiousType=0';
                    }
                })
            }
            o.wxpayorderNumber(orderNumber, sucsss);

        }
    }

})
