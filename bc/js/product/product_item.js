new Vue({
    el: '#list',
    data: {
        oBackTopFixed: false,
        preLoading: true,
        goodsShow: false,//上架时间选择显示与隐藏
        norecordShow: true,//商品内容显示与隐藏
        browseMode_falg: true,//显示商品样式
        current_falg: true,//条件选择显示选中
        goodsIndex: 0,//上架时间 价格 排序 选择
        goodsType: ['促销', '正常'],//商品类型
        goodsTypeIndex: 1,//商品类型选择
        goodsList: ['上架时间', '价格从高到低', '价格从低到高'],
        goodsValue: '上架时间',
        itemList: [],//商品信息
        page: 1,//页数
        count:10,//条数
        datas:{
            "equalFields":{"categoryId":"333"},
            "orderByName":"onShelfTime",
            "isDesc":true,
            "rangeName":"price",
            "rangeMin":null,
            "rangeMax":null,
            "like":{"name":null}
        }//请求参数
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

        },
        priceTofixed: function (value) {
            return value?(parseInt(value)/100).toFixed(2):'';
        }
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        commentJs.staticSearch(2, 0);
        commentJs.BackToTop('fix-block-r');
        window.addEventListener('scroll', this.handleScroll);
        var _this = this;
            _title = commentJs.getUrlKey('title') || null;
            _title?_title='%'+_title+'%':_title=null;
        _this.datas.like.name = _title;
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
                _this.goodsShow = false;
                $("body").append("<div  style=\" cursor:pointer;\" id=\"ldg_lockmask\"></div>");
            }
        });

    },

    methods: {
        oData: function (page , count) {//请求数据
            var _this = this;
            var callback = function (data) {
                var _list = data.result.list;
                if(page == 1){
                    _this.itemList = [];
                }
                if(_list.length>0){
                    _this.norecordShow = true;
                    _list.forEach(function (v, k) {_this.itemList.push(v);})
                }else{
                    if(page == 1){
                        _this.norecordShow = false;
                    }
                }
                _this.preLoading = false;
            }
            o.productInfo( page, count, _this.datas, callback);
        },
        goodsSort: function () {//显示/隐藏上架时间选择
            this.goodsShow = !this.goodsShow;
            this.current_falg = true;
        },
        init_get_list: function (index) {//上架时间选择
            var _this = this;
            _this.page = 1;
            _this.goodsIndex = index;
            if(_this.goodsList[index] == _this.goodsValue){return;}
            if(index == 0){
                _this.datas.orderByName = "onShelfTime";
                _this.datas.isDesc = true;
            }else if(index == 1){
                _this.datas.orderByName = "price";
                _this.datas.isDesc = true;
            }else{
                _this.datas.orderByName = "price";
                _this.datas.isDesc = false;
            }
            _this.oData(_this.page,_this.count);
            _this.goodsValue = _this.goodsList[index];
            _this.goodsShow = false;
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.page++;
                _this.oData(_this.page,_this.count);
            }
        },
        browseMode: function () {//list变换显示方式
            this.browseMode_falg = !this.browseMode_falg;
            this.goodsShow = false;
        },
        browseVolume: function () {//排序跟销量切换
            var _this = this;
            _this.datas.orderByName = "salesVolume";
            _this.oData(_this.page,_this.count);
            this.current_falg = false;
            this.goodsShow = false;
        },
        goodsTypeClick:function () {//商品类型切换
            this.goodsTypeIndex == 0?this.goodsTypeIndex = 1:this.goodsTypeIndex = 0;
        },
        searchSubmit:function () {//筛选点击
            var _this = this;
            _this.page = 1;
            _this.oData(_this.page,_this.count);

        },
        resetClick:function () {//重置点击
            this.datas.rangeMin = null;
            this.datas.rangeMax = null;
        }
    }


})