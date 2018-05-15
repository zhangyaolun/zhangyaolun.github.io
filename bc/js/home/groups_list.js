new Vue({
    el: '#app',
    data: {
        oBackTopFixed: false,
        preLoading: true,
        dataFalg: false, //下方提示
        swiperActive: 0, //nav切换
        swiperList: [{
            'cat_id': '0',
            'cat_name': '全部'
        }, {
            'cat_id': '1',
            'cat_name': '智能家电'
        }, {
            'cat_id': '94',
            'cat_name': '智酷数码'
        }, {
            'cat_id': '463',
            'cat_name': '家居百货'
        }], //nav切换
        groupsData: [], //品牌
    },
    filters: {
        common_fenqi: function(value) { //分期数
            if(value != 'undefined') {
                return(value / 12).toFixed(2);
            }
        }
    },
    mounted: function() {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.appShowhide('app');
        commentJs.BackToTop('fix-block-r');
        window.addEventListener('scroll', this.handleScroll);
        commentJs.toastLoading('数据读取中...');
        setTimeout(function() {
            _this.getInfo(0);
        }, 10);
    },

    methods: {
        getInfo: function(index) {
            var _this = this;
            _this.groupsData = [];
            var suc = function(data) {
                _this.groupsData = data.data.goods;
                _this.preLoading = false;
                _this.dataFalg = true;
            }
            o.groupsGoods(index, suc);
        },
        swiperClick: function(index) { //点击nav
            var _this = this;
            _this.swiperActive = index;
            _this.preLoading = true;
            setTimeout(function() {
                _this.getInfo(index);
            }, 10);
        },
        oBackTop: function() { //回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function() {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        }
    }
})