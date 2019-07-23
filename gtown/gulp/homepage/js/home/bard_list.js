new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading:true,
        brandlist:[],
        brandData:[
            {index:'01',title:'PHILIPS'},
            {index:'02',title:'Braun'},
            {index:'03',title:'Delonghi'},
            {index:'04',title:'ECOVACS'},
            {index:'05',title:'Midea'},
            {index:'06',title:'Miji'},
            {index:'07',title:'FUJIFILM'},
            {index:'08',title:'CJJI'},
            {index:'09',title:'Emporio Armani'},
            {index:'10',title:'Bose'},
            {index:'11',title:'JBL'},
            {index:'12',title:'kindke'},
            {index:'13',title:'双立人'},
            {index:'14',title:'小米'},
            {index:'15',title:'3M'},
        ],//品牌
    },
    filters: {

    },
    mounted: function () {
        var _this = this
        FastClick.attach(document.body);
        commentJs.homeHader('品牌专区');
        commentJs.BackToTop('fix-block-r');
        window.addEventListener('scroll', this.handleScroll);
        commentJs.toastLoading('品牌数据读取中...');
        setTimeout(function () {_this.getInfo();},10);
    },

    methods: {
        getInfo: function ()  {
            var _this = this;
            var suc = function (data) {
                if(data.result){
                    if(data.result.list && data.result.list.length>0){
                        data.result.list.forEach(function (v,k) {
                            _this.brandlist.push(v);
                        })
                    }
                }
                _this.preLoading = false;
            }
            o.brandlist(suc);
        },
        brandlistClick: function (index) {
            var _this = this;
            window.location.href = '../product/product_item.html?title='+_this.brandlist[index].name;
        },
        oBackTop: function () {
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
