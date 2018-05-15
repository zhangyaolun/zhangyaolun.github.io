new Vue({
    el: '#list',
    data: {
        searchBarFixed: false,
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
        shopCode: false,//二维码
        Codeimages: '',//商品二维码
        common_price: '',//商城价与秒杀价
        miaoshaTime: false,//秒杀商品还未开始
        miaosha_start_time: '',//秒杀商品还未开始时间显示
        miaoshaTitle: false,
        descriptionImage:'',//spu选择显示的图片
        area_name:'',//城市地址
        sellerName:'',
        datas:{
            "count": 1,
            "skuId": "",
        },
        spuName:'',//规格显示
        shopSave:{
            "collectType": "1",
            "collectId": 1
        },//收藏
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
        _this.shopCarNum = commentJs.getCookie('shopNum');
        _this.shopCarNum>0?_this.shopCarFalg=true:_this.shopCarFalg=false;
        var miaoshaid = commentJs.getUrlKey('miaoshaid'),
            goods_id = commentJs.getUrlKey('goods_id');
        commentJs.staticSearch(2);
        commentJs.appShowhide('list');
        commentJs.toastLoading('加载中...');
        commentJs.fnTimeCountDown();
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(function () {
            _this.oListData(goods_id, miaoshaid);
        }, 10);
    },
    filters: {
        priceTofixed: function (value) {//价格显示
            return value?(parseInt(value)/100).toFixed(2):'';
        },
        freightPrice: function (value) {//运费显示
            return (value>0 || value!='')?'运费 '+(parseInt(value)/100).toFixed(2)+'元':'免运费';
        },
        common_fenqi: function (value) {//分期数
            if (value != 'undefined') {
                return 12;
            }
        },
        common_price: function (value) {//商城价与秒杀价
            return this.detailList.promotion_price ? this.detailList.promotion_price : this.detailList.goods_price;
        },
        common_stock: function (value) {//运费显示
            return (value>0 || value!='')?'有货':'无货';
        },
    },
    methods: {
        oListData: function (goods_id, miaoshaid) {//主菜单列表
            var _this = this;
            var suc = function (data) {
                console.log(data);
                var _result = data.result;
                _this.detailList = _result;
                _this.descriptionImage = _this.detailList.spuList[0].spuAttrList[0].descriptionImage;
                _this.shopSave.collectId =_this.detailList.id;
                _this.collSeach();
                _this.detailList.spuList.forEach(function (v,k) {
                    _this.spuName = v.titile+' '
                })
                if(miaoshaid){
                    _this.miaoshaTime = true;
                    _this.miaosha_start_time = '';
                    _this.miaoshaShow = true;
                    _this.miaoshaTitle = true;
                }else{
                    _this.miaoshaTitle = false;
                    _this.miaoshaTime = false;
                    _this.miaoshaShow = false;
                }

                if(_result.pics){
                    _this.swiperList = _result.pics.split(',');
                    setTimeout(function () {
                        _this.preLoading = false;
                        var mySwiper = new Swiper('.swiper-container', {loop: true, pagination: '.swiper-pagination'});
                    }, 10);
                }
                _this.sellerName = _this.detailList.seller.sellerName;
                setTimeout(function () {
                    _this.preLoading = false;
                }, 10);

            }
            o.productDetailId(goods_id,suc);
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var offsetTop = document.querySelector('#product_detail_html').offsetTop;
            scrollTop > (offsetTop / 2) ? _this.searchBarFixed = true : (_this.searchBarFixed = false);
            scrollTop > 620 ? _this.headerTabShow = false : _this.headerTabShow = true;
        },
        buyBtn: function (e) { //点击买
            this.detailSpec = false;
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
        },
        reduceChang: function () {
            var _this = this;
            if (_this.datas.count == 1) return;
            _this.datas.count--;
        },
        plusChang: function () {
            var _this = this;
            _this.datas.count++;
        },
        addCart: function () {//加入购物车
            var _this = this,_falg = false;
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
                    commentJs.setCookie('shopNum',_this.shopCarNum,1)
                    _this.shopCarFalg = true;
                    commentJs.toastTitle('加入购物车成功','');
                    _this.detailSpec = true;
                    commentJs.shopFly();
                }
                o.shopcarAdd(_this.datas.skuId,_this.datas.count,shopcarsuc)
            }else{
                commentJs.toastTitle('选择 '+_this.spuName,'forbidden');
            }
        },
        codeClick: function (goods_id) {//二维码
            console.log('000')
            commentJs.removeCookie('shopNum');
            var _this = this;
            var codesuc = function (data) {
                _this.Codeimages = data.data.imgurl;
                _this.shopCode = true;
            }
            o.GoodsCodeDetail(commentJs.getUrlKey('goods_id'), codesuc);
        },
        shopCodeNone: function () {//二维码隐藏
            this.shopCode = false;
        },
        MapCityClick: function () {//地址选择
            var _this = this;
            commentJs.areaSelected({
                hideThirdLevel: true,
                success: function (data) {
                    console.log(data)
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
                    if(n.defaults ){
                        _spuTrue += n.id+','
                    }
                })
            })
            _spuTrue = _spuTrue.substring(0,_spuTrue.length-1);
            _spuTrue = '['+_spuTrue+']';
            _this.detailList.skuList.forEach(function (v,k) {
                if(v.skuCombination == _spuTrue){
                    _this.datas.skuId = v.id;
                }
            })
        },
        collSeach: function () {//查询是否收藏商品
            var _this = this;
            var suc = function (data) {
                _this.favorateFalg = data.result;
            }
            o.collectionSeach(_this.shopSave,suc);
        },
        payCart: function () {//立即购买
            var _this = this;
            if(!_this.datas.skuId){
                commentJs.toastTitle('选择 '+_this.spuName,'forbidden');
                return;
            }
            sessionStorage.setItem('orderNum',1);
            window.location.href = '../shop/shopOrder.html?subType=SKU'+'&linkId='+_this.datas.skuId+'&count='+_this.datas.count;

        },
    }

})