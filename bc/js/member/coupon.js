new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading:true,
        itemList:['全部','未使用','已使用','已失效'],
        status:[-1,0,2,3],//优惠券状态 -1全部 0未使用 1锁定 2已使用  3已失效
        vocherStatus:0,
        vList:true,
        product: [],
        page: 1,
        count: 10,
    },
    computed: {
    },
    filters: {
        oTimeCurrency: function (value) {
            return commentJs.dataFormat(value);
        },
        priceCurrency: function (value) {
            return (parseFloat(value)/100).toFixed(2);
        },
        oPriceCurrency: function (value) {
            return (parseFloat(value)/100).toFixed(0);
        }
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.downMenuSpot('favheader', 4);
        commentJs.toastLoading('加载中...');
        commentJs.appShowhide('app');
        commentJs.BackToTop('fix-block-r');
        var _this = this;
        window.addEventListener('scroll', _this.handleScroll);
        setTimeout(function () {
            _this.oListData();
        }, 10);
    },
    methods: {
        oListData:function(){//主菜单列表
            var _this = this;
            if(_this.page == 1){_this.product = [];}
            var suc = function (data){
                if(data.result.list.length>0){
                    if(_this.vocherStatus == 0){
                        data.result.list.forEach(function (v, k) {
                            if(v.couponStatus != 1){
                                _this.product.push(v);
                                var avc = commentJs.userCouponFormat(v.couponDto.effectiveTime);
                                if(avc == 0){
                                    v.couponStatus = 1;
                                    v.couponDto.couponIcon = 0;
                                }
                            }
                        })
                        _this.vList = true;
                    }else if(_this.vocherStatus == 1){
                        data.result.list.forEach(function (v, k) {
                            if(v.couponStatus == 0){
                                v.couponDto.couponIcon = 1;
                                var avc = commentJs.userCouponFormat(v.couponDto.effectiveTime);
                                if(avc != 0){
                                    _this.product.push(v);
                                }
                            }
                        })
                        _this.vList = true;
                    }else if(_this.vocherStatus == 2){
                        data.result.list.forEach(function (v, k) {
                            if(v.couponStatus == 2){
                                v.couponDto.couponIcon = 1;
                                _this.product.push(v);
                            }
                        })
                        _this.vList = true;
                    }
                }else{
                    if(_this.page == 1){ _this.vList = false;}
                }
                if(_this.product.length == 0){_this.vList = false;}
               _this.preLoading = false;
            }
            o.userCoupon(_this.status[_this.vocherStatus],_this.page, _this.count, suc);
        },
        itemClick: function (index){//点击选择tab
            var _this = this;
            _this.vocherStatus = index;
            _this.page = 1;
            _this.preLoading = true;
            if(index == 3){
                var _this = this;
                _this.product = [];
                var suc = function (data){
                    if(data.result.list.length>0){
                        data.result.list.forEach(function (v, k) {
                            if(v.couponStatus != 1){
                                var avc = commentJs.userCouponFormat(v.couponDto.effectiveTime);
                                if(avc == 0){
                                    v.couponDto.couponIcon = 0;
                                    _this.product.push(v);
                                    v.couponStatus = 1;
                                }
                            }
                        })
                        if(_this.product.length>0){
                            _this.vList = true;
                        }else{
                            if(_this.page == 1){ _this.vList = false;}
                        }
                    }else{
                        if(_this.page == 1){ _this.vList = false;}
                    }
                    _this.preLoading = false;
                }
                o.userCoupon(_this.status[0],_this.page, _this.count, suc);
            }else{
                _this.oListData();
            }
        },
        handleScroll: function () {
            var _this = this;
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.page++;
                _this.oListData();
            }
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
    }


})