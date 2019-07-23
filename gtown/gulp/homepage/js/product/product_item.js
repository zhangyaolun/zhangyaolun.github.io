new Vue({
    el: '#list',
    data: {
        oBackTopFixed: false,
        preLoading: true,
        browseMode_falg: true,//显示商品样式
        norecordShow: true,//商品内容显示与隐藏
        current_falg: true,
        goodsIndex: 0,//上架时间 价格 排序 选择
        goodsType: ['正常'],//商品类型
        goodsTypeIndex: 0,//商品类型选择
        goodsValue: '按价格',
        nav_li_one:true,//价格图标切换
        nav_li_icon:false,//价格图标
        itemList: [],//商品信息
        page: 1,//页数
        count:10,//条数
        datas:{
            "equalFields":{"categoryId":null},
            "orderByName":"price",
            "greaterOrEqualFields":{"minPrice":null},
            "lessOrEqualFields":{"maxPrice":null},
            "isDesc":true,
            "rangeName":"price",
            "rangeMin":null,
            "rangeMax":null,
            "like":{"name":null,"categoryLev":null}
        },//请求参数
        inputSeach:'',
        seachTitle:'',
        listNode:false
    },
    computed: {},
    watch: {
        datas:{//监听价格区间不能输入负数
            handler:function(newValue){
                var _this = this;
                if(newValue.rangeMin<0){_this.datas.rangeMin = null;}
                if(newValue.rangeMax<0){_this.datas.rangeMin = null;}
            },
            deep: true
        }
    },
    filters: {
        number: function (value) {
            return value?value:0;
        },
        priceTofixed: function (value) {
            return value?(parseInt(value)).toFixed(0):'0';
        },
        priceTofixeds: function (value) {
            return value?(parseInt(value)/100).toFixed(2):'0.00';
        }
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        commentJs.shopcarAll();
        commentJs.BackToTop('fix-block-r');
        var _this = this;
            _title = commentJs.getUrlKey('title') || null,
            _my = commentJs.getUrlKey('my') || null,
            _lev = commentJs.getUrlKey('lev') || null,
            _catId = commentJs.getUrlKey('cat_id') || null;
            _title?_this.datas.like.name='%'+_title+'%':_this.datas.like.name=null;

        _this.seachTitle = commentJs.gethotNew('');
        _this.inputSeach = _title;
        if(_lev != null && _lev != 'null'){
            _this.datas.equalFields.categoryId = null;
            _this.datas.like.categoryLev = _lev + '%';
        }else{
            _this.datas.equalFields.categoryId = _catId;
        }



       var _sellerId = commentJs.getUrlKey('sellerId');
        if(_sellerId && _sellerId!='null'){
            _this.datas.equalFields.sellerId = _sellerId;
        }
        if(_my){
            var suctotal = function (data) {
                if(data.result){
                    var _tol = data.result.total.integral;
                    if(_tol>0){
                        _this.datas.greaterOrEqualFields.minPrice = 1;
                        _this.datas.lessOrEqualFields.maxPrice = _tol;
                    }else{
                        _this.datas.greaterOrEqualFields.minPrice = null;
                        _this.datas.lessOrEqualFields.maxPrice = null;
                    }
                }
            }
            o.getUserIntegral(suctotal);
        }
        setTimeout(function () {
            _this.oData(_this.page,_this.count);
        }, 10);

        /*筛选显示、隐藏*/
        commentJs.animationLeft({
            valve: "#search_adv",
            wrapper: ".nctouch-full-mask",
            scroll: "#list-items-scroll",
            openCallback: function () {
                $(".JS-search").css("z-index", 1999);
                $("body").append("<div  style=\" cursor:pointer;\" id=\"ldg_lockmask\"></div>");
            }
        });
        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
        sub:function () {
            this.inputSeach?this.datas.like.name='%'+this.inputSeach+'%':this.datas.like.name=null;
            this.oData(1,10);
        },
        footClick: function (aid) {
            window.location.href = "./product_detail.html?goods_id=" + aid;
        },
        oData: function (page , count) {//请求数据
            var _this = this;
            var callback = function (data) {
                _this.listNode = false;
                var _list = data.result.list;
                if(page == 1){
                    _this.itemList = [];
                }
                if(_list.length>0){
                    $('body').removeClass('bgf');
                    _this.norecordShow = true;
                    _list.forEach(function (v, k) {
                        if(v.fictitiousType != 2){
                            _this.itemList.push(v);
                        }
                    })
                    if(_this.itemList.length == 0){
                        _this.norecordShow = false;
                    }
                }else{
                    $('body').addClass('bgf');
                    if(page == 1){
                        _this.norecordShow = false;
                    }else{
                        if(page > 1){
                            _this.listNode = true;
                        }
                    }
                }
                _this.preLoading = false;
            }
            o.productInfo( page, count, _this.datas, callback);
        },
        goodsSort: function () {//显示/隐藏价格
            var _this = this;
            if(this.nav_li_one){
                this.nav_li_icon = !this.nav_li_icon;
            }else{
                this.nav_li_one = true;
                this.current_falg = true;
            }
            !this.nav_li_icon?this.datas.isDesc=true:this.datas.isDesc=false;
            this.page = 1;
            this.datas.orderByName = "price";
            _this.datas.rangeName = "price";
            setTimeout(function () {
                _this.oData(1,10);
            }, 10);
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
            if (($(window).height() + $(document).scrollTop()) == $(document).height()) {
                _this.page++;
                setTimeout(function () {
                    _this.oData(_this.page,_this.count);
                }, 10);
            }
        },
        browseMode: function () {//list变换显示方式
            this.browseMode_falg = !this.browseMode_falg;
        },
        browseVolume: function () {//排序跟销量切换
            var _this = this;
            _this.nav_li_one = false;
            _this.page = 1;
            _this.datas.isDesc=true;
            _this.datas.orderByName = "salesVolume";
            _this.datas.rangeName = "salesVolume";
            setTimeout(function () {
                _this.oData(_this.page,_this.count);
            }, 10);
            _this.current_falg = false;
        },
        goodsTypeClick:function () {//商品类型切换
            this.goodsTypeIndex == 0?this.goodsTypeIndex = 1:this.goodsTypeIndex = 0;
        },
        searchSubmit:function () {//筛选点击
            var _this = this;
            _this.page = 1;
            setTimeout(function () {
                _this.oData(_this.page,_this.count);
            }, 10);

        },
        resetClick:function () {//重置点击
            this.datas.rangeMin = null;
            this.datas.rangeMax = null;
        }
    }


})
