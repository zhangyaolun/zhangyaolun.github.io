new Vue({
    el: '#app',
    data: {
        couponVesselFalg: true,//优惠券
        couponVessel_fa: false,//优惠券后退
        MapCh_falg: true,//地址管理
        MapCh_fa: false,//地址管理后退
        MapNew_falg: true,//新建地址
        MapNew_fa: false,//新建地址后退
        invoiceFalg: true,//发票信息选择
        invoice_fa: false,//发票信息后退
        paymentFalg: true,//支付方式
        payment_fa: false,//支付方式后退
        invoiceNoneed: ['不需要开发票', '需要开发票'],//发票信息选择
        invoiceIndex: 0,//发票信息选择下标
        incrementRadio: ['增值税普通发票', '增值税专用发票'],//增值税专用发票选择
        incrementIndex: 0,//增值税专用发票选择下标
        selList: ['个人', '企业'],//企业选择
        invoiceTitle:'不需要开发票',//发票结果显示
        selListIndex: 0,//个人企业选择下标
        dialogWrapper:false,//弹出没有收货地址
        submitColor:false,//改变按钮颜色
        containerList:[],//商品信息列表
        orderAllPayment:0,//总合计金额
        oDatas:{//订单信息查询
            "addressId": null,
            "invoice":null,
            "buyerRemark":null,
            "couponId": null,
            "count": 0,
            "linkId": null,
            "preview": false,
            "subType": "Carog"
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
            'province':'',
            'city':'',
            'area':'',
            'address':'',
            'defaults':false,
        },
        invoicesDate:{//发票专用信息
            "address": "",//收票人详细地址
            "bankAccount": "",//开户银行
            "bankAccountNumber": "",//银行账户
            "companyName": "",//单位名称
            "content": "明细",//发票内容
            "invoiceType": 0,//发票类型(1:个人,2:企业,3:增值税专用发票)
            "registeredAddress": "",//注册地址
            "registrationPhone": "",//注册电话
            "taxpayerid": "",//纳税人识别码
            "userName": "",//收票人姓名
            "userPhone": "",//收票人手机
            "userProvince": "输入收票人省份"//收票人省份
        },
        invoicesOrdDate:{//发票普通信息
            "headinfo": "",//发票抬头
            "content": "明细",//发票内容
            "invoiceType": 0,//发票类型(1:个人,2:企业,3:增值税专用发票)
            "taxid": "",//税号
        },
        invoicesDateFalg:false,//专用发票判断
        invoicesCityFalg:false,//发票收货地址颜色
        product: [],//收货地址列表
        page: 1,//地址页数
        count: 10,
        couponProduct: [],//优惠券数据列表
        couponPage: 1,//优惠券页数
        couponCount: 10,
        couponProductFalg:true,//有无优惠劵列表显示
        couponProductTrueBtn:-1,//优惠劵订单选择切换
        couponTitle:'',
        couponPriceTrue:0,//优惠券选中价格
        couponFalg:1,//有无优惠劵 订单 显示结果
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
        invoicesDate:{
            handler: function (val, oldVal){
                var _this = this;
                (val.companyName != '' && val.taxpayerid != '' && val.registeredAddress != '' && val.registrationPhone != ''&& val.bankAccount != ''&& val.bankAccountNumber != '' && val.content != '' && val.userName != '' && val.userPhone != ''&& val.userProvince != ''&& val.address != '')?_this.invoicesDateFalg = true:_this.invoicesDateFalg = false;
            },
            deep:true
        },
    },
    filters: {
        currency: function (value) {
            return (parseFloat(value)/100).toFixed(2);
        },
        oPriceCurrency: function (value) {
            return (parseFloat(value)/100).toFixed(0);
        },
        oTimeCurrency: function (value) {
            return commentJs.dataFormat(value);
        },

    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.appShowhide('app');
        commentJs.downMenuSpot('header', 1);
        commentJs.toastLoading('购物车数据读取中...');
        commentJs.headerFooter(2);
        var _this = this;
        if(sessionStorage.getItem('orderNum') == 1){
            _this.oDatas.subType = commentJs.getUrlKey('subType') || null;
            if(!_this.oDatas.subType) return;
            if(_this.oDatas.subType == 'SKU'){
                _this.oDatas.linkId = commentJs.getUrlKey('linkId') || null;
                _this.oDatas.count = commentJs.getUrlKey('count') || 1;
            }
            setTimeout(function () {
                _this.oDefaultAddress();
            }, 10);
        }else {
            _this.preLoading = false;
        }
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
                console.log(data)
                var _list = data.result.list;
                if(data.result.list.length>0){
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
                console.log(data)
                var _order = data.result.order;
                var _childOrders = data.result.childOrders;
                var _parentOrder = data.result.parentOrder;
                if(_order != null){
                    _this.containerList[0] = {'sellerName':_order.seller.sellerName,'orderList':[],'freightPrice':_order.freightPrice,'orderPayment':_order.orderPayment,'sellerId':_order.sellerId,'sellerBuyerRemark':''}
                    _this.orderAllPayment = _order.orderPayment;
                    // _this.orderAllPayment = 200;
                    _order.orderProduct.forEach(function (v,k) {
                        _this.containerList[0].orderList.push(v);
                    })
                }else{
                    _childOrders.forEach(function (v,k) {
                        _this.containerList[k] = {'sellerName':v.seller.sellerName,'orderList':[],'freightPrice':v.freightPrice,'orderPayment':v.orderPayment,'sellerId':v.sellerId,'sellerBuyerRemark':''}
                        v.orderProduct.forEach(function (n,m) {
                            _this.containerList[k].orderList.push(n);
                        })
                    })
                    _this.orderAllPayment = _parentOrder.orderPayment;
                }
                _this.couponVesselSeach();
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
        couponVesselClick: function () {//优惠券点击
            this.couponVesselFalg = false;
            this.couponVessel_fa = true;
        },
        couponVesselFaClick: function () {//优惠券后退
            this.couponVesselFalg = true;
        },
        couponProductBtn: function (k) {//优惠券点击
            var _this = this;
            _this.couponProductTrueBtn = k;
            if(k < 0){
                _this.couponTitle = '不使用优惠券';
                _this.couponFalg = 1;
                _this.oDatas.couponId = null;
                _this.orderAllPayment = parseFloat(_this.orderAllPayment) + parseFloat(_this.couponPriceTrue);
                _this.couponPriceTrue = 0;
            }else{
                _this.couponPriceTrue = _this.couponProduct[k].couponDto.quota;
                _this.oDatas.couponId = _this.couponProduct[k].couponDto.id;
                _this.orderAllPayment = _this.orderAllPayment - _this.couponPriceTrue;
                _this.couponFalg = 3;
            }
            _this.couponVesselFalg = true;
        },
        couponVesselSeach: function () {//优惠券查询
            var _this = this;
            if((_this.containerList[0].orderList == undefined) && (_this.containerList[0].orderList.length == 0)){return;}
           console.log(_this.containerList[0])
            var suc = function (data) {
                var _nymPa = 0;
                if(data.result.pages == 1){
                    var sucs = function (datas) {
                        datas.result.list.forEach(function (v, k) {
                            if(v.couponStatus == 0){
                                var avc = commentJs.userCouponFormat(v.couponDto.effectiveTime);
                                if(avc != 0){
                                    (_this.orderAllPayment <= v.couponDto.limitPay)?(v.limitPayFalg = 1,_nymPa++):v.limitPayFalg = 0;
                                    _this.couponProduct.push(v);
                                }
                            }
                            _this.couponPage++;
                        })
                    }
                    o.userCoupon(0,_this.couponPage, 10,sucs);
                }else{
                    for(var i=1;i< data.result.pages;i++){
                        var sucs = function (datas) {
                            datas.result.list.forEach(function (v, k) {
                                if(v.couponStatus == 0){
                                    var avc = commentJs.userCouponFormat(v.couponDto.effectiveTime);
                                    if(avc != 0){
                                        (_this.orderAllPayment <= v.couponDto.limitPay)?(v.limitPayFalg = 1,_nymPa++):v.limitPayFalg = 0;
                                        _this.couponProduct.push(v);
                                    }
                                }
                                _this.couponPage++;
                            })
                        }
                        o.userCoupon(0,_this.couponPage, 10,sucs);
                    }
                }
                if(_nymPa != 0){
                    _this.couponTitle = _nymPa + '个可用';
                    _this.couponFalg = 2;
                }else{
                    _this.couponTitle = '无可用优惠券';
                    _this.couponFalg = 1;
                }
            }
            o.userCoupon(0,_this.couponPage, 10,suc);
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
            this.MapNew_falg = false;
            this.MapNew_fa = true;
        },
        MapNewBack: function () {//新建地址后退
            var _this = this;
            _this.oDatasAddress.receiverName == ''?_this.dialogWrapper = true:_this.MapNew_falg = true;
        },
        invoiceClick: function () {//发票信息
            this.invoiceFalg = false;
            this.invoice_fa = true;
        },
        falseClick: function () {//发票信息关闭
            this.invoiceFalg = true;
        },
        paymentClick: function () {//支付方式
            this.paymentFalg = false;
            this.payment_fa = true;
        },
        paymentBackClick: function () {//支付方式闭
            this.paymentFalg = true;
        },
        invoiceNoClick: function (k) {//需要与不需要发票选择
            var _this = this;
            _this.invoiceIndex = k;
            if(_this.invoiceIndex == 1){
                var _invoiceDatas = localStorage.getItem('invoiceDatas');
                var _invoicesOrdDate = localStorage.getItem('invoicesOrdDate');
                if(_invoiceDatas){
                    _invoiceDatas = JSON.parse(_invoiceDatas);
                    _this.invoicesDate.companyName = _invoiceDatas.companyName;
                    _this.invoicesDate.taxpayerid = _invoiceDatas.taxpayerid;
                    _this.invoicesDate.registeredAddress = _invoiceDatas.registeredAddress;
                    _this.invoicesDate.registrationPhone = _invoiceDatas.registrationPhone;
                    _this.invoicesDate.bankAccount = _invoiceDatas.bankAccount;
                    _this.invoicesDate.bankAccountNumber = _invoiceDatas.bankAccountNumber;
                    _this.invoicesDate.userName = _invoiceDatas.userName;
                    _this.invoicesDate.userPhone = _invoiceDatas.userPhone;
                    _this.invoicesDate.userProvince = _invoiceDatas.userProvince;
                    _this.invoicesDate.address = _invoiceDatas.address;
                }
                if(_invoicesOrdDate){
                    _invoicesOrdDate = JSON.parse(_invoicesOrdDate);
                    _this.invoicesOrdDate.headinfo = _invoicesOrdDate.headinfo;
                    _this.invoicesOrdDate.taxid = _invoicesOrdDate.taxid;
                    _this.invoicesOrdDate.content = _invoicesOrdDate.content;
                }
            }
        },
        incremRadioClick: function (k) {//发票选择
            this.incrementIndex = k;
        },
        selListClick: function (k) {//企业选择
            this.selListIndex = k;
        },
        invoiceBtnClick: function (k) {//发票选择确定
            var _this = this;
            if(_this.invoiceIndex == 0){
                _this.invoiceTitle = '不需要开发票';
                _this.invoicesDate.invoiceType = 0;
                _this.invoicesOrdDate.invoiceType = 0;
            }else{
                if(_this.incrementIndex == 0){//增值税 普通和专用
                    if(_this.selListIndex == 0){//个人
                        _this.invoicesOrdDate.invoiceType = 1;
                        _this.invoiceTitle = '普通发票 个人 '+_this.invoicesOrdDate.content;
                    }else{
                        if(!commentJs.checkNotEmpty(_this.invoicesOrdDate.headinfo)){
                            commentJs.toastTitle('输入企业发票抬头','forbidden');
                            return;
                        }
                        if(!commentJs.checkNotEmpty(_this.invoicesOrdDate.taxid)){
                            commentJs.toastTitle('输入企业税号','forbidden');
                            return;
                        }
                        _this.invoicesOrdDate.invoiceType = 2;
                        _this.invoiceTitle = '普通发票 '+_this.invoicesOrdDate.headinfo+' '+_this.invoicesOrdDate.content;
                    }
                    _this.invoicesDate.invoiceType = 0;
                    localStorage.setItem('invoicesOrdDate',JSON.stringify(_this.invoicesOrdDate));
                }else{
                    if(!_this.invoicesDateFalg){
                        commentJs.toastTitle('输入发票信息','forbidden');
                        return;
                    }else{
                        console.log(_this.invoicesDate)
                        if(!commentJs.checkPhone(_this.invoicesDate.registrationPhone) && !commentJs.checkFixedPhone(_this.invoicesDate.registrationPhone)){
                            commentJs.toastTitle('注册电话输入有误','forbidden');
                            return;
                        }
                        if(!commentJs.checkPhone(_this.invoicesDate.userPhone) && !commentJs.checkFixedPhone(_this.invoicesDate.userPhone)){
                            commentJs.toastTitle('手机号输入有误','forbidden');
                            return;
                        }
                    }
                    _this.invoicesDate.invoiceType = 3;
                    _this.invoicesOrdDate.invoiceType = 0;
                    _this.invoiceTitle = '增值税发票 '+_this.invoicesDate.companyName+' '+_this.invoicesDate.content;
                }
                localStorage.setItem('invoiceDatas',JSON.stringify(_this.invoicesDate));
            }
            _this.invoiceFalg = true;
        },
        MapCityClick: function () {//新增地址城市选择
            var _this = this;
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
        invoicesCityClick: function () {//发票城市选择
            var _this = this;
            commentJs.areaSelected({
                success: function (data) {
                    _this.invoicesCityFalg = true;
                    _this.invoicesDate.userProvince = data.area_info;
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
            _this.oListData();
        },
        submit_click: function (){//地址提交
            var _this = this;
            _this.oUseAddAddress();
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
            _this.preLoading = true;
            _this.oDatas.preview = true;
            if(_this.invoicesDate.invoiceType != 0){
                _this.oDatas.invoice = _this.invoicesDate;
            }else if(_this.invoicesOrdDate.invoiceType != 0){
                if(_this.invoicesOrdDate.invoiceType == 1){
                    _this.oDatas.invoice = {"invoiceType":_this.invoicesOrdDate.invoiceType,"content":_this.invoicesOrdDate.content};
                }else{
                    _this.oDatas.invoice = _this.invoicesOrdDate;
                }
            }else{
                _this.oDatas.invoice = null;
            }

            if(_this.containerList.length>1){
                _this.oDatas.buyerRemark = {};
                _this.containerList.forEach(function (v,k) {
                    if(v.sellerBuyerRemark != '') {
                        _this.oDatas.buyerRemark[v.sellerId] = v.sellerBuyerRemark;
                    }
                })
            }else{
                if(_this.containerList[0].sellerBuyerRemark == '') {
                    _this.oDatas.buyerRemark = null;
                }else{
                    _this.oDatas.buyerRemark[_this.containerList[0].sellerId] = _this.containerList[0].sellerBuyerRemark;
                }
            }
            console.log(_this.oDatas)
            if(sessionStorage.getItem('orderNum') != 1){
                return;
            }
            var suc = function (data) {
                var _order = data.result.order;
                var _parentOrder = data.result.parentOrder;
                commentJs.shopcarAll();
                console.log(data)
                sessionStorage.setItem('orderNum',2);
                if(_order != null){
                    window.location.href = 'payOrder.html?orderNumber='+_order.orderNumber+'&orderPayment='+_order.orderPayment;
                }else{
                    window.location.href = 'payOrder.html?orderNumber='+_parentOrder.orderNumber+'&orderPayment='+_parentOrder.orderPayment;
                }
                _this.preLoading = false;
            }
            o.shopSubOrder(_this.oDatas, suc);
        }
    }

})