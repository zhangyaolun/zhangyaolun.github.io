new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        headerName:'快报列表',
        newsList:[]
    },
    filters: {

    },
    mounted: function () {
        FastClick.attach(document.body);
        var _this = this;
        commentJs.homeHader('快报列表');
        commentJs.kefuLogo('kefu_logo');
        setTimeout(function () {_this.getInfo();},10);
        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
        getInfo: function (id)  {//首页数据
            var _this = this;
            var sucNew = function (data) {
                _this.newsList = [];
                if(data.result && data.result.length>0){
                    var _neww = [];
                    data.result.forEach(function (v,k) {
                        if(v.isOpen){
                            v.createTimeVal =  new Date(v.createTime);
                            _this.newsList.push(v);
                        }
                    })
                    sort(_this.newsList);
                    function sort(arr){
                        for(var j=0;j<arr.length-1;j++){
                            for(var i=0;i<arr.length-1-j;i++){
                                if(arr[i].createTimeVal<arr[i+1].createTimeVal){
                                    var temp = arr[i];
                                    arr[i] = arr[i+1];
                                    arr[i+1] = temp;
                                }
                            }
                        }
                    }
                }
            }
            o.homeNews(11,sucNew);
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
    }
})