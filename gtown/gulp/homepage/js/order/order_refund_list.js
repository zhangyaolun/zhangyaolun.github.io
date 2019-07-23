new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        curFalg: 1,//退款列表与退货列表切换
        order_none: true,//退款列表 有无数据
        oMitemList: [],//订单数据
        preLoading: true,
        page: 1,//页数
        count: 10,
        odatasState:[0,'Submit','Pay','Delivering']
    },
    filters: {
        orderStatus: function (value) {
            var _attr = ['','等待卖家审核','卖家审核通过','卖家审核通过','退货/款完成','卖家审核未通过','卖家审核通过'];
            return value?_attr[value]:'';
        },
        currency: function (value) {
            return parseFloat(value)+'积分';
        },
        dataFormatcurrency: function (value) {
            return value?commentJs.dataFormat(value, 1):'';
        },
        refundTypecurrency: function (value) {
            return value==2?'查看详情':'退款详情';
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        sessionStorage.removeItem('refundlist');
        commentJs.homeHader('退款/售后');
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        setTimeout(function () {
            _this.oListData();
        }, 10);
        window.addEventListener('scroll', _this.handleScroll);
    },

    methods: {
        oListData: function () {//数据列表
            var _this = this;
            _this.preLoading = true;
            var suc = function (data) {
                if(_this.page == 1){_this.oMitemList = [];}
                if(data.result.list.length>0){
                    data.result.list.forEach(function (v, k) {
                        if(v.seller){
                            _this.oMitemList.push(v);
                        }
                        _this.oMitemList.push(v);
                    });
                }else{
                    if(_this.page == 1){_this.order_none = true;}
                }
                console.log(_this.oMitemList)
                _this.preLoading = false;
            }
            o.refundOrder(_this.page,_this.count, suc);
        },
        oXtabClick: function (k) {//退款详情
            sessionStorage.setItem('refundlist',JSON.stringify(this.oMitemList[k]));
            window.location.href = 'order_refund_detail.html';
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
