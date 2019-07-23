new Vue({
    el: '#app',
    data: {
        items:[
            {name:'全部',value:''},
            {name:'收入',value:''},
            {name:'支出',value:''},
            {name:'冻结',value:''}
        ],
        items_li:0,
        orderintegral:0,
        newsList:{}
    },
    computed: {},
    filters: {

    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.homeHader('我的积分');
        commentJs.kefuLogo('kefu_logo');
        var _this = this;
        setTimeout(function () {_this.getInfo();},10);
    },

    methods: {
        getInfo: function () {
            var _this = this;
            var suc = function (data) {
                if(data.result){
                    _this.orderintegral = data.result.total.integral;
                }
            }
            o.getUserIntegral(suc);
            var sucNew = function (data) {
                _this.newsList = {};
                if(data.result && data.result.length>0){
                    data.result.forEach(function (v,k) {
                        if(v.isOpen){
                            _this.newsList = v;
                            return;
                        }
                    })
                }
            }
            o.homeNews(23,sucNew);
        },
        bannerClick: function (i) {//广告点击
            var _this = this;
            if(_this.newsList.style == 1){
                window.open(_this.newsList.detailContent);
            }else{
                window.location.href = '../member/member_set.html?type=23';
            }
        },
    }
})
