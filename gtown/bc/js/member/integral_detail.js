new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading:true,
        page:1,
        count:10,
        itemList:[],//积分列表
    },
    computed: {},
    filters: {
        oChangeType: function (value) {//积分显示增加或减少
            return value == 1?'+':'-';
        },
        oCreateTime: function (value) {//积分时间
            var oTime = commentJs.dataFormat(value);
            return oTime;
        }
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.downMenuSpot('transparent', 2);
        commentJs.BackToTop('fix-block-r');
        commentJs.appShowhide('app');
        window.addEventListener('scroll', this.handleScroll);
        var _this = this;
        setTimeout(function () {_this.oDataList();}, 10);
    },

    methods: {//头部显示
        oDataList:function () {//积分列表
            var _this = this;
            var suc = function (data) {
                if(data.result.list.length>=0){
                    _this.itemList = data.result.list;
                }else{
                    //暂无积分
                }
                _this.preLoading = false;
            }
            o.userPointRecord(_this.page,_this.count,suc);
        },
        handleScroll: function () {
            var _this = this;
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.page++;
                _this.oData(_this.page,_this.count);
            }
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }


})