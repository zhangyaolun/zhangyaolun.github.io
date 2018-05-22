var vm = new Vue({
    el: '#list',
    data: {
        oBackTopFixed: false,//回到顶部
        oHeaderFixed: false,//头部
        preLoading: true,//加载
        storeNav: [{'icon': '', 'title': '首页'}, {'icon': '', 'title': '全部商品'}, {
            'icon': '',
            'title': '上新'
        }, {'icon': '', 'title': '店铺活动'}],
        storeNavIndex: 0,
        storeHome: true,//店铺首页
        goodsAll: false,//全部商品
        goodsNew: false,//上新
        storeActivity: false,//活动
        current_falg: true,
        browseMode_falg: true,//全部商品排列
        goodsShow: false,//全部商品综合排序
        goodsIndex: 0,
        goodsList: ['综合排序', '价格从高到低', '价格从低到高', '人气排序'],
        goodsValue: '综合排序',
        itemList: [],//全部商品
        goodsfixed: false,//全部商品固定
    },
    computed: {},
    filters: {
        number: function (value) {
            if (vm.itemList) {
                return (vm.itemList[value].common_price / vm.itemList[value].common_fenqi_price).toFixed(0);
            }
        }
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        window.addEventListener('scroll', this.handleScroll);
        var _this = this;
        setTimeout(function () {
            _this.oData();
        }, 10);

        /*首页懒加载*/
        //commentJs.appLazyload();
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
    },

    methods: {
        oData: function () {
            var _this = this;
            var callback = function (data) {
                console.log(data)
                data.data.items.forEach(function (v, k) {
                    _this.itemList.push(v);
                })
                _this.preLoading = false;
            }
            o.productGoodsDetail('353', '1', callback);
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
            if (_this.storeNavIndex != 1) {
                scrollTop >= 240 ? _this.oHeaderFixed = true : _this.oHeaderFixed = false;
            } else {
                scrollTop >= 225 ? _this.goodsfixed = true : _this.goodsfixed = false;
            }
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.oData(_this.page++);
            }
        },
        goodsSort: function () {//显示/隐藏上架时间选择
            this.goodsShow ? this.goodsShow = false : this.goodsShow = true;
            this.current_falg = true;
        },
        browseVolume: function () {//排序跟销量切换
            this.current_falg = false;
        },
        browseMode: function () {//list变换显示方式
            this.browseMode_falg = !this.browseMode_falg;
        },
        storeNavClick: function (index) {//nav切换
            this.storeHome = false;
            this.goodsAll = false;
            this.goodsNew = false;
            this.storeActivity = false;
            if (index == 1) {
                this.goodsAll = true;
            } else if (index == 0) {
                this.storeHome = true;
            } else if (index == 2) {
                this.goodsNew = true;
            } else {
                this.storeActivity = true;
            }
            this.storeNavIndex = index;
        },
        layout: function () {//点击头部显示菜单
            console.log('11')
            commentJs.showhide('nctouch-nav-layout');
        },
    }
})