new Vue({
    el: '#app',
    data: {
        type:'',
        detailContent: '',
        preLoading:true
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        var _this = this;
        commentJs.toastLoading('加载中...');
        setTimeout(function () {_this.getInfo();},10);
    },

    methods: {
        getInfo: function ()  {
            var _this = this;
            var sucNew = function (data) {
                _this.preLoading = false;
            }
            o.homeNews(11,sucNew);
        },
    }


})