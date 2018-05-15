new Vue({
    el: '#app',
    data: {
        preLoading:true,
        itemList:['默认排序','领取量从高到低','领取量从低到高'],
        status:[2,0,1],// 降序传0 升序传1 默认传2
        vocherStatus:0,
        vList:true,
        product: [],
        page: 1,
        count: 10,
        datas:{
            "id":""
        }
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
        var _this = this;
        window.addEventListener('scroll', _this.handleScroll);
        setTimeout(function () {
            _this.oListData();
        }, 10);
    },
    methods: {
        oListData:function(){//主菜单列表
            var _this = this;
            _this.preLoading = true;
            if(_this.page == 1){_this.product = [];}
            var suc = function (data){
                if(data.result.list.length>0){
                    _this.vList = true;
                    data.result.list.forEach(function (v, k) {
                        _this.product.push(v);
                    })
                }else{
                    if(_this.page == 1){ _this.vList = false;}
                }
               _this.preLoading = false;
            }
            o.userCouponCenter(_this.status[_this.vocherStatus],_this.page, _this.count, suc);
        },
        itemListClick: function (index){//点击选择tab
            var _this = this;
            _this.vocherStatus = index;
            _this.page = 1;
             _this.preLoading = true;
            setTimeout(function () {
                _this.oListData();
            }, 10);
        },
        oCouponClick: function (id){//优惠券领取
            var _this = this;
            _this.datas.id = id;
            var suc = function (data) {
                data.result.length != 0?commentJs.toastTitle('领取成功',''):commentJs.toastTitle('领取失败','forbidden');
            }
            o.userCouponGet(_this.datas, suc);
        },
        oCouponAllClick: function (){//优惠券一键领取
            var _this = this;
            var _id = '';
            _this.product.forEach(function (v, k) {
                _id += v.id+',';
            })
            _id = _id.substring(0,_id.length-1);
            _this.datas.id = _id;
            var suc = function (data) {
                data.result.length != 0?commentJs.toastTitle('领取成功',''):commentJs.toastTitle('领取失败','forbidden');
            }
            o.userCouponGet(_this.datas, suc);
        },
        handleScroll: function () {
            var _this = this;
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.page++;
                setTimeout(function () {_this.oListData();}, 10);
            }
        },
    }


})