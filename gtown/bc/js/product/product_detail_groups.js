new Vue({
    el: '#list',
    data: {
        searchBarFixed: false,
        miaoshaShow: false, //秒杀显示
        favorateFalg: false, //收藏与否
        preToast: false, //收藏弹框
        headerTabShow: true,
        detailSpec: true, //底部弹框
        preLoading: true,
        swiperList: [], //轮播
        detailList: {}, //商品信息
        goods_hair_info: {}, //送货地址
        goods_num: 1, //购买数量
        shopCode: false, //二维码
        Codeimages: '', //商品二维码
        common_price: '' //商城价与秒杀价
    },
    computed: {
        fenqi_price: function () {
            var common_fenqi = 12,
                price_product = '';
            this.detailList.promotion_price ? price_product = this.detailList.promotion_price : price_product = this.detailList.goods_price;
            var num = price_product / 12;
            num == 'NaN' || num == 'Infinity' ? num = '0.00' : num = num.toFixed(2);
            return num;
        }
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        var groups_id = commentJs.getUrlKey('groups_id'),
            goods_id = commentJs.getUrlKey('goods_id');
        commentJs.staticSearch(2);
        commentJs.appShowhide('list');
        commentJs.toastLoading('加载中...');
        commentJs.fnTimeCountDown();
        //window.addEventListener('scroll', this.handleScroll);
        setTimeout(function () {
            _this.oListData(goods_id, groups_id);
        }, 10);
    },
    filters: {
        goods_spec: function (value) {
            return value ? value.replace(':', ' ') : '默认';
        },
        spec_name: function (value) {
            var a = '';
            if (value != 'undefined') {
                for (var key in value) {
                    a = value[key]; //获取对应的value值
                }
            }
            return a;
        },
        common_fenqi: function (value) { //分期数
            if (value != 'undefined') {
                return 12;
            }
        },
        common_price: function (value) { //商城价与秒杀价
            return this.detailList.promotion_price ? this.detailList.promotion_price : this.detailList.goods_price;
        }
    },
    methods: {
        oListData: function (goods_id, groups_id) { //主菜单列表
            var _this = this;
            var suc = function (data) {
                console.log(data)
                _this.detailList = data.data.goods_info;
                _this.goods_hair_info = data.data.goods_hair_info;
                _this.swiperList = data.data.goods_image.split(',');
                _this.detailList.promotion_price ? _this.common_price = _this.detailList.promotion_price : _this.common_price = _this.detailList.goods_price;
                setTimeout(function () {
                    _this.preLoading = false;
                    var mySwiper = new Swiper('.swiper-container', {
                        loop: true,
                        pagination: '.swiper-pagination'
                    });
                }, 10);
            }
            o.groupsGoodsDetail(goods_id, groups_id, suc);
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
        favorateFun: function () { //收藏
            var _this = this;
            _this.favorateFalg = !_this.favorateFalg;
            _this.preToast = true;
            var fun = function () {
                _this.preToast = false;
            }
            _this.favorateFalg ? commentJs.toastTitle('weui-toast', '收藏成功', fun) : commentJs.toastTitle('weui-toast', '已取消收藏', fun);
        },
        reduceChang: function (items, newindex, oldindex) {
            var _this = this;
            if (_this.goods_num < 2) return;
            _this.goods_num--;
        },
        plusChang: function (items, newindex, oldindex) {
            var _this = this;
            _this.goods_num++;
        },
        addCart: function () { //加入购物车
            this.detailSpec = true;
            commentJs.shopFly();
        },
        codeClick: function (goods_id) { //二维码
            var _this = this;
            var codesuc = function (data) {
                _this.Codeimages = data.data.imgurl;
                _this.shopCode = true;
            }
            o.GoodsCodeDetail(commentJs.getUrlKey('goods_id'), codesuc);
        },
        shopCodeNone: function () { //二维码隐藏
            this.shopCode = false;
        },
        MapCityClick: function () { //地址选择
            var _this = this;
            commentJs.areaSelected({
                hideThirdLevel: true,
                success: function (data) {
                    _this.goods_hair_info.area_name = data.area_info;
                }
            });
        }
    }

})