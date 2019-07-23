new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading: true,
        odatas:{
            "keyword":"",
            "fictitious":false
        },
        logisticsId:'',
        waybill:'',
        img:'',
        wayName:'',
        resData:[],
        resDataFalg:false
    },
    filters: {
        time1: function (value) {
            return value?value.split(' ')[0]:'';
        },
        time2: function (value) {
            return value?value.split(' ')[1]:'';
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.homeHader('物流信息');
        commentJs.kefuLogo('kefu_logo');
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        _this.odatas.keyword = commentJs.getUrlKey('orderNumber');
        if(!_this.odatas.keyword){return;}
        setTimeout(function () {
            _this.oListData();
        }, 10);
        window.addEventListener('scroll', _this.handleScroll);
    },

    methods: {
        oListData: function () {//数据列表
            var _this = this;
            var suc = function (data) {
                if(data.result.list && data.result.list.length > 0){
                    var _li = data.result.list[0];
                    _this.logisticsId = _li.logisticsCode;
                    _this.img = _li.orderProduct[0].productLogo;
                    if( _this.logisticsId == null || _this.logisticsId == 'null'){
                        _this.preLoading = false;
                        return;
                    }
                    _this.waybill = _li.waybill;
                }
                var suscs = function (datass) {
                    _this.wayName = datass.result.name;
                }
                o.useBuyerexpress(_this.logisticsId, suscs);

                var susc = function (datas) {
                    var _datas = JSON.parse(datas.result);
                    _this.resData = [];
                    if(_datas.Traces && _datas.Traces.length>0){
                        _this.resDataFalg = true;
                        _datas.Traces.forEach(function (v,k) {
                            _this.resData.push(v)
                        })
                    }else{
                        _this.resDataFalg = false;
                    }

                    _this.preLoading = false;
                }
                o.getLogisticsInfo(_this.logisticsId,_this.waybill, susc);
            }
            o.userOrder(1,20,_this.odatas, suc);
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            if (($(window).height() + $(document).scrollTop()) == $(document).height()) {
                _this.page++;
                _this.oListData();
            }
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        },
    }


})