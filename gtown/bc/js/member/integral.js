new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading:true,
        page:1,
        count:10,
        userPointPoint:0,//总积分
        itemListFalg:true,//积分列表数据读取中
        oPointList:[],//积分列表
        userPointActivity:false,//积分活动
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
        commentJs.BackToTop('fix-block-r');
        commentJs.toastLoading('加载中...');
        commentJs.downMenuSpot('transparent', 2);
        commentJs.appShowhide('app');
        var _this = this;
        window.addEventListener('scroll', _this.handleScroll);
        setTimeout(function () {_this.oData();_this.oDataList();}, 10);
    },

    methods: {//头部显示
        oData:function () {//总积分
            var _this = this;
            var callback = function (data) {
                _this.userPointPoint = data.result;
                _this.preLoading = false;
            }
            o.userPoint(callback);
        },
        oDataList:function () {//积分列表
            var _this = this;
            var suc = function (data) {
                if(data.result.list.length>=0){
                    _this.oPointList = data.result.list;
                }else{
                    //暂无积分
                }
                _this.itemListFalg = false;
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
        },
        oPointActivity: function () {//积分活动
            this.userPointActivity = true;
        },
        oPointActFalg: function () {//积分活动隐藏
            this.userPointActivity = false;
        }
    }


})