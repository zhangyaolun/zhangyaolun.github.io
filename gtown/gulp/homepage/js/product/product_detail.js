new Vue({
    el: '#list',
    data: {
        //审批状态 1.审核通过2.审核未通过3.审核中4.已上架5.已下架6.待发布7.违规商品8.外部导入数据 ,
        searchBarFixed: false,
        codeBarFixed: false,//底层
        codeBarFixedc: false,//二维码
        codeBarFixedf: false,//分享
        codeBarFixedj:false,
        header_navFalg:0,
        shopCarNum:0,//购物车数量
        shopCarFalg:false,
        miaoshaShow: false,//秒杀显示
        favorateFalg: false,//收藏与否
        headerTabShow: true,
        detailSpec: true,//底部弹框
        preLoading: true,
        swiperList: [],//轮播
        detailList: {},//商品信息
        goods_hair_info: {},//送货地址
        common_price: '',//商城价与秒杀价
        miaosha_start_time: '',//秒杀商品还未开始时间显示
        descriptionImage:'',//spu选择显示的图片
        area_name:'',//城市地址
        sellerName:'',//店铺名称
        skuCombinationDescription:'',//已选规格
        buyBtnNum:1,//加入购物车及选择规格判断
        seachTitle:'',
        datas:{
            "count": 1,
            "skuId": "",
        },
        spuName:'',//规格显示
        shopSave:{
            "collectType": "1",
            "collectId": 1
        },//收藏
        miaosha_end_time:'',//秒杀结束时间
        shopData:{
            name:'',
            img:'',
            price:'',
            stock:'',
            setStock:0
        },
        stockFalg:false,//有货
        subFalg:true,//确定
        stockFalg2:true,
        fictitiousType:null,//1虚拟商品类型(1:视频卡,2:手机充值) ,
        miaoshafictitiousType:false,
        addShopGoodsNum:0,//购物车该商品数量
        addShopGoodsFalg:true,
        shopLowerFalg:false,//已下架处理
        qrcodeImg:'',//二维码图片
        codeData:{
            shareUserId:null,//分享人ID
            receiveUserId:null,//被分享人ID
            productId:null,//分享的产品ID
            productLink:null,//分享的产品链接
        }
    },
    computed: {
        fenqi_price: function () {
            var common_fenqi = 12, price_product = '';
            this.detailList.promotion_price ? price_product = this.detailList.promotion_price : price_product = this.detailList.goods_price;
            var num = price_product / 12;
            num == 'NaN' || num == 'Infinity' ? num = '0.00' : num = num.toFixed(2);
            return num;
        }
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        var _code = commentJs.getUrlKey('code') || '';
        if(!_code && !sessionStorage.getItem('userId'))return;
        if(_code){
            var func = function () {
                _this.onefun();
            }
            commentJs.automaticLogin(_code,func);
        }else{
            _this.onefun();
        }

        window.addEventListener('scroll', _this.handleScroll);
    },
    filters: {
        priceTofixed: function (value) {//价格显示
            return value?(parseInt(value)/100).toFixed(2):'0.00';
        },
        priceTofixeds: function (value) {//价格显示
            return value?(parseInt(value)/100).toFixed(2):'0.00';
        },
        common_stock: function (value) {//运费显示
            return (value>0 || value!='')?'有货':'无货';
        },
        volume: function (value) {//运费显示
            return value?value:0;
        },
    },
    methods: {
        onefun:function(){
            var _this = this;
            setTimeout(function () {
                _this.area_name = sessionStorage.getItem('cityName') || '上海浦东城区政立路';
                _this.shopCarNum = commentJs.getCookie('shopNum');
                _this.shopCarNum>0?_this.shopCarFalg=true:_this.shopCarFalg=false;
                var miaoshaid = commentJs.getUrlKey('spikeProductId'),
                    goods_id = commentJs.getUrlKey('goods_id');
                var _binding = commentJs.getUrlKey('binding') || null;
                if(_binding){
                    _this.codeData.shareUserId = _binding;
                    _this.codeData.receiveUserId = sessionStorage.getItem('userId')?sessionStorage.getItem('userId').split('|')[2]:null
                    _this.codeData.productId = goods_id?goods_id:miaoshaid?miaoshaid:null;
                    _this.codeData.productLink = window.location.href;
                    _this.wxbinding();
                }
                commentJs.toastLoading('加载中...');
                _this.seachTitle = commentJs.gethotNew();
                setTimeout(function () {
                    _this.oBackTop();
                    _this.spikeoListData(miaoshaid);
                    _this.oListData(goods_id);
                }, 10);
            },200)
        },
        wxbinding:function () {//分享绑定
            var _this = this;
            var sucs = function (data){

            }
            o.wxBinding(_this.codeData,sucs);
        },
        codeclick:function () {//二维码点击
            var _this = this;
            _this.codeBarFixedf = false;
            _this.qrcodeImg = 'http://e-shop.ecache.com.cn/productInfo/shareImg/'+_this.datas.skuId+'/'+sessionStorage.getItem('userId').split('|')[0];
            _this.codeBarFixed = true;
            _this.codeBarFixedc = true;
            commentJs.stop();
        },
        codeclickf:function () {//分享点击
            var _this = this;
            _this.codeBarFixedf = true;
            _this.codeBarFixed = true;
            _this.codeBarFixedc = false;
            commentJs.stop();
        },
        btnClose:function () {//二维码点击关闭
            this.codeBarFixed = false;
            this.codeBarFixedc = false;
            this.codeBarFixedf = false;
            this.codeBarFixedj = false;
            commentJs.move();
        },
        codeclickff:function () {//弹出分享点击
            this.codeBarFixed = false;
            this.codeBarFixedc = false;
            this.codeBarFixedf = false;
            this.codeBarFixedj = true;
            commentJs.stop();
        },
        inputblur:function () {//框子失去焦点
            var _this = this;
            if(!( /^[1-9]\d*$/.test(_this.datas.count))){
                _this.datas.count = 1;
            }
        },
        inputChange:function () {//输入框子
            var _this = this;
            if(!( /^[1-9]\d*$/.test(_this.datas.count))){
                _this.datas.count = _this.datas.count.substring(0,_this.datas.count.length-1);
            }else{
                if(_this.buyBtnNum == 1){
                    if(_this.shopData.stock>=256 && _this.datas.count!=1){
                        if((parseFloat(_this.datas.count)+ parseFloat(_this.addShopGoodsNum)) > parseFloat(_this.shopData.stock)){
                            _this.datas.count = 256 - _this.addShopGoodsNum ;
                        }
                    }else{
                        if((parseFloat(_this.datas.count)+parseFloat(_this.addShopGoodsNum)) > parseFloat(_this.shopData.stock) && _this.datas.count!=1){
                            _this.datas.count = (_this.shopData.stock-_this.addShopGoodsNum)<=0?1:(_this.shopData.stock-_this.addShopGoodsNum);
                        }
                    }
                }else{
                    if(_this.datas.count>parseFloat(_this.shopData.stock) || _this.datas.count>256){
                        _this.shopData.stock>=256?_this.datas.count = 256:_this.datas.count = _this.shopData.stock;
                    }
                }
            }
        },
        addGoods:function(goods_id,skuid){//查询购物车该商品数量
            if(goods_id == 'null' || !goods_id )return;
            if(skuid == 'null' || !skuid )return;
            var _this = this;
            _this.addShopGoodsNum = 0;
            var sucs = function (data) {
                data.result.forEach(function (v,k) {
                    v.cargoList.forEach(function (n,m) {
                        if(n.sku.id == skuid){
                            _this.addShopGoodsNum = n.count;
                            return;
                        }
                    })
                })
            }
            o.shopcarAll(sucs);
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        oListData: function (goods_id) {//普通商品主菜单列表
            if(goods_id == 'null' || !goods_id )return;
            var _this = this;
            var suc = function (data) {//fictitiousType (integer, optional): 虚拟商品类型(1:视频卡,2:手机充值) ,
                if(data.httpCode == 200){
                    var _result = data.result;
                    _this.detailList = _result;
                    _this.descriptionImage = _this.detailList.spuList[0].spuAttrList[0].descriptionImage;
                    _this.shopSave.collectId =_this.detailList.id;
                    _this.shopData.name =_this.detailList.name;
                    _this.shopData.img =_this.detailList.mainPic;
                    _this.shopData.price =_this.detailList.price;
                    (_this.shopData.stock>0 || _this.shopData.stock!='')?(_this.stockFalg2=true,_this.stockFalg=true):(_this.stockFalg2=false,_this.stockFalg=false);
                    _this.skuCombinationDescription = '';
                    _this.detailList.spuList.forEach(function (v,k) {
                        _this.skuCombinationDescription += v.titile+': '+v.spuAttrList[0].description+' ';
                        v.spuAttrList[0].defaults = true;
                    })
                   　_this.collSeach();
                    _this.detailList.spuList.forEach(function (v,k) {
                        _this.spuName += v.titile+' '
                    })
                    if(_this.detailList.fictitious && _this.detailList.fictitiousType == 1){
                        _this.stockFalg2 = false;
                        _this.stockFalg = true;
                        _this.miaoshafictitiousType = true;
                        _this.fictitiousType = _this.detailList.fictitiousType;
                    }else{
                        commentJs.addFootprintSave(goods_id);
                    }
                    _this.miaoshaShow = false;
                    var _a = [];
                    _a[0] = _result.mainPic;
                    _this.swiperList = _this.swiperList.concat(_a);
                    if(_result.pics && _result.pics.replace(/\[|]/g, "").length>0){
                        _this.swiperList = _this.swiperList.concat(_result.pics.replace(/\[|]/g, "").split(","))
                    }
                    if(_this.detailList.seller){
                        _this.sellerName = _this.detailList.seller.shopName;
                    }
                    _this.spuAttrClick(0,0);
                    commentJs.onMenuShareDetail(_result.name,_result.mainPic,1,goods_id);
                    setTimeout(function () {
                        var mySwiper = new Swiper('.swiper-container', {loop: true, pagination: '.swiper-pagination',paginationType : 'fraction',});
                        _this.preLoading = false;
                        _this.shopLowerFalg = false;
                    }, 10);
                }else{
                    _this.preLoading = false;
                    _this.shopLowerFalg = true;
                }
            }
            //o.productDetailIds(suc);
            o.productDetailId(goods_id,suc);
        },
        spikeoListData:function (id) {//秒杀商品查询
            if(id == 'null' || !id )return;
            var _this = this;
            var suc = function (data) {
                if(data.httpCode == 200){
                    var _result = data.result;
                    _this.detailList = _result;
                    _this.shopSave.collectId = _result.id;
                    _this.datas.skuId = _result.id;
                    _this.sellerName = _this.detailList.productInfo.shopName;
                    _this.shopData.name =_this.detailList.productInfo.name;
                    _this.shopData.img =_this.detailList.productInfo.mainPic;
                    _this.shopData.price =_this.detailList.activityPrice;
                    _this.shopData.stock =_this.detailList.activityStock;
                    _this.stockFalg2 = false;
                    _this.shopData.stock == 0?_this.stockFalg = false:_this.stockFalg = true;
                    _this.miaoshafictitiousType = true;
                    _this.skuCombinationDescription = _this.detailList.productInfo.skuName;
                    _this.collSeach();
                    var _time = commentJs.getUrlKey('time');
                    commentJs.onMenuShareDetail(_this.shopData.name,_this.shopData.img,2,id,_time);
                    if(_time){
                        var _timeAttr = _time.split('|');
                        var now = new Date().getTime(),
                            endDate = _timeAttr[1];
                        _this.miaoshaShow = true;
                        if(parseInt(endDate) < now){
                            _this.stockFalg2 = false;
                            _this.stockFalg = false;
                            commentJs.toastTitle('限时活动已结束','forbidden');
                        }else{
                            _this.miaosha_start_time = endDate;
                            _this.miaosha_end_time = parseInt(_timeAttr[1]);
                            setTimeout(function () {
                                commentJs.fnTimeCountDown();
                            },10)
                        }
                    }
                    var _a = [];
                    _a[0] = _result.productInfo.mainPic;
                    _this.swiperList = _a;
                    if(_result.productInfo.pics && _result.productInfo.pics.replace(/\[|]/g, "").length>0){
                        _this.swiperList = _this.swiperList.concat(_result.productInfo.pics.replace(/\[|]/g, "").split(","))
                    }
                    setTimeout(function () {
                        var mySwiper = new Swiper('.swiper-container', {loop: true, pagination: '.swiper-pagination',paginationType : 'fraction',});
                        _this.preLoading = false;
                        _this.shopLowerFalg = false;
                    }, 10);
                }else{
                    _this.preLoading = false;
                    _this.shopLowerFalg = true;
                }
            }
            // .spikeActivityDetails(suc);
            o.spikeActivityDetail(id,suc);
        },
        handleScroll: function () {
            var _this = this;
            $(window).scroll(function(){
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                scrollTop > 550 ? (_this.searchBarFixed = true,_this.headerTabShow = false,_this.header_navFalg = 1) : (_this.headerTabShow = true,_this.searchBarFixed = false);
                if(scrollTop>(scrollHeight-900)){
                    _this.searchBarFixed = true;
                    _this.headerTabShow = false;
                    _this.header_navFalg = 2;
                }
                if(scrollTop<100){
                    _this.searchBarFixed = false;
                    _this.headerTabShow = true;
                }
            });

        },
        buyBtn: function (i,k) { //点击买 1加入购物车 2购买选择
            this.buyBtnNum = i;
            if(!this.stockFalg2 && !this.stockFalg)return;
            if(this.miaoshaShow && i==1)return;
            if(this.fictitiousType && i==1)return;
            this.addCart();
        },
        detailClose: function (e) { //买弹出 点击关闭
            this.detailSpec = true;
        },
        favorateFun: function () {//收藏
            var _this = this;
            if(!_this.favorateFalg){
                var sucs = function (data) {
                    _this.favorateFalg = true;
                    commentJs.toastTitle('收藏成功','');
                    sessionStorage.removeItem("a");
                }
                o.collectionSave(_this.shopSave,sucs);
            }else{
                var suc = function (data) {
                    _this.favorateFalg = false;
                    commentJs.toastTitle('已取消收藏','');
                    sessionStorage.removeItem("a");
                }
                o.collectionDelete(_this.shopSave,suc);
            }
            commentJs.shopCollNum();
        },
        reduceChang: function () {
            var _this = this;
            if (_this.datas.count <= 1) return;
            _this.datas.count--;
        },
        plusChang: function () {
            var _this = this;
            _this.datas.count++;
            if(_this.buyBtnNum == 1){
                if( ((_this.datas.count+_this.addShopGoodsNum) > _this.shopData.stock || (_this.datas.count+_this.addShopGoodsNum) > 256) && _this.datas.count!=1 ){
                    _this.datas.count = (_this.shopData.stock-_this.addShopGoodsNum)<=0?1:_this.shopData.stock>=256?256-_this.addShopGoodsNum:(_this.shopData.stock-_this.addShopGoodsNum);
                    commentJs.toastTitle('数量超出范围','forbidden');
                    return;
                }
            }else{
                if(_this.shopData.stock>=256){
                    if(_this.datas.count>256){
                        _this.datas.count = 256;
                        commentJs.toastTitle('数量超出范围','forbidden');
                        return;
                    }
                }else{
                    if(_this.datas.count>_this.shopData.stock){
                        _this.datas.count = _this.shopData.stock;
                        commentJs.toastTitle('数量超出范围','forbidden');
                        return;
                    }
                }
            }
        },
        addCart: function () {//加入购物车    1加入购物车 2购买选择
            var _this = this,_falg = false;
            if(!_this.subFalg){return;}
            if(_this.buyBtnNum == 1){
                if(_this.shopData.setStock<=0){commentJs.toastTitle('数量超出范围','forbidden');return;}
                _this.detailList.spuList.forEach(function (v,k) {
                    v.spuAttrList.forEach(function (n,m) {
                        if(n.defaults){
                            _falg = true;
                            return;
                        }
                    })
                })
                if(_falg){
                    var shopcarsuc= function (data) {
                        _this.shopCarNum = parseInt(_this.shopCarNum)+parseInt(_this.datas.count);
                        commentJs.shopcarAll();
                        _this.shopCarFalg = true;
                        _this.shopData.setStock--;
                        _this.addShopGoodsNum++;
                        commentJs.toastTitle('加入购物车成功','');
                        _this.detailSpec = true;
                        commentJs.shopFly();
                    }
                    o.shopcarAdd(_this.datas.skuId,_this.datas.count,shopcarsuc)
                }else{
                    commentJs.toastTitle('请选择规格','forbidden');
                }
            }else{
                _this.payCart();
            }
        },
        MapCityClick: function () {//地址选择
            var _this = this;
            commentJs.areaSelected({
                hideThirdLevel: true,
                success: function (data) {
                    _this.area_name = data.area_info;
                }
            });
        },
        spuAttrClick: function (newIndex,oldIndex) {//spu选择
            var _this = this,_spuTrue = '';
            _this.detailList.spuList[oldIndex].spuAttrList.forEach(function (v,k) {
                v.defaults = false;
            })
            _this.detailList.spuList[oldIndex].spuAttrList[newIndex].defaults  = !_this.detailList.spuList[oldIndex].spuAttrList[newIndex].defaults;
            _this.detailList.spuList.forEach(function (v,k) {
                v.spuAttrList.forEach(function (n,m) {
                    if(n.defaults){
                        _spuTrue+=n.id+','
                    }
                })
            })
            _spuTrue = _spuTrue.substring(0,_spuTrue.length-1);
            _spuTrue = '['+_spuTrue+']';
            _this.detailList.skuList.forEach(function (v,k) {
                if(v.skuCombination == _spuTrue){
                    _this.datas.skuId = v.id;
                    v.skuCombinationImage?_this.shopData.img = v.skuCombinationImage:_this.shopData.img =_this.detailList.mainPic;
                    _this.shopData.price = v.price;
                    _this.shopData.stock = v.stock;
                    _this.addGoods(v.productId,v.id);
                }else{
                    _this.shopData.stock = 0;
                }
            });
            _this.shopData.setStock = _this.shopData.stock>=256?256 - _this.addShopGoodsNum:_this.shopData.stock - _this.addShopGoodsNum;
            _this.shopData.stock>0 || _this.shopData.stock!=''?(_this.subFalg=true,_this.stockFalg2=true,_this.stockFalg=true):(_this.subFalg=false,_this.stockFalg2=false,_this.stockFalg=false);
            _this.datas.count = 1;
            if(_this.detailList.fictitious && _this.detailList.fictitiousType == 1){
                _this.stockFalg2 = false;
            }
        },
        collSeach: function () {//查询是否收藏商品
            var _this = this;
            var suc = function (data) {
                _this.favorateFalg = data.result;
            }
            o.collectionSeach(_this.shopSave,suc);
        },
        payCart: function () {//立即购买
            var _this = this,type = '';
            if(!_this.datas.skuId){
                commentJs.toastTitle('选择 '+_this.spuName,'forbidden');
                return;
            }
            _this.miaoshaShow?type='&orderType=Spike':'';
            _this.fictitiousType==1?type='&orderType=Fictitious&fictitiousType=1':'';
            sessionStorage.setItem('orderNum',1);
            window.location.href = '../shop/shopOrder.html?subType=SKU'+type+'&linkId='+_this.datas.skuId+'&count='+_this.datas.count+type;
            }
    }

})
