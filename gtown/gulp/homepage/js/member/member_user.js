new Vue({
    el: '#app',
    data: {
        userIntro: [],
        scroTitle: false,
        preLoading:true
    },
    computed: {},
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        commentJs.homeHader('设置');
        commentJs.kefuLogo('kefu_logo');
        //{'name': '帮助中心', 'src': './member_set.html?type=12'}, {'name': '关于我们','src': './member_set.html?type=13'}, {'name': '意见反馈','src': './member_set.html?type=14'}
        setTimeout(function () {_this.getInfo();},10);
    },
    methods: {
        getInfo: function ()  {
            var _this = this;
            var sucNew = function (data) {
                if(data.result && data.result.length>0){
                    data.result.forEach(function (v,k) {
                        if(v.isOpen){
                            _this.userIntro.push(v);
                        }
                    })
                }
                _this.preLoading = false;
            }
            o.homeNews(12,sucNew);
        },
    }
})