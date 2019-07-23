new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        oid:'',
        headerName:'',
        detailContent:'',
        insertTime:'',
        title:''
    },
    filters: {

    },
    mounted: function () {
        FastClick.attach(document.body);
        var _this = this;
        commentJs.homeHader('快报信息');
        _this.oid = commentJs.getUrlKey('list');
        commentJs.kefuLogo('kefu_logo');
        if(!_this.oid){return;}
        setTimeout(function () {_this.getInfo();},10);
        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
        getInfo: function ()  {
            var _this = this;
            var sucNew = function (data) {
                _this.newsList = [];
                if(data.result && data.result.length>0){
                    data.result.forEach(function (v,k) {
                        if(v.id == _this.oid){
                            _this.detailContent = v.detailContent;
                            _this.insertTime = v.createTime;
                            _this.title = v.title;
                        }
                    })
                }
            }
            o.homeNews(11,sucNew);
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        },
        oBackTop: function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
    }
})
