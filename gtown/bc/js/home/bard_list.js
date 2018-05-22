new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading:true,
        brandlist:[],//品牌专区数据
        brandData:['01','02','03','04','05','05','07','08','09','10','11','12','13','14','15'],//品牌
    },
    filters: {

    },
    mounted: function () {
        var _this = this
        FastClick.attach(document.body);
        commentJs.BackToTop('fix-block-r');
        window.addEventListener('scroll', this.handleScroll);
        commentJs.toastLoading('品牌数据读取中...');
        setTimeout(function () {_this.getInfo();},10);
    },

    methods: {
        getInfo: function ()  {
            var _this = this;
            var suc = function (data) {
                console.log(data)
                _this.brandlist = data.data.items;
                _this.preLoading = false;
            }
            o.brandlist(suc);
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        }
    }
})