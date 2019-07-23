new Vue({
    el: '#list',
    data: {
        preToast:false,
        preLoading:false,
        seckill_index:0,
        SeckillList:[],
        soonSeckillList:[],
        Seckillfalg:true,
        soonSecfalg:true,
        divFalg:false,
    },
    computed: {},
    mounted: function() {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.homeHader('限时特惠');
        commentJs.toastLoading('加载中...');
        window.addEventListener('scroll', this.handleScroll);
        setTimeout(function () {_this.oListData();},100);
    },
    filters: {
        price: function(value) {
            return value?'¥'+(parseInt(value)/100).toFixed(2):'0.00';
        },
        originalprice: function(value) {
            return value?'¥'+(parseInt(value)/100).toFixed(2):'0.00';
        },
        time: function(v) {
            return v?commentJs.dataFormat(v,1):'';
        }
    },
    methods: {
        product_click: function (id,sale_count)  {
            if(sale_count <= 0)return;
            window.location.href = '../product/product_detail.html?spikeProductId='+id+'&time='+this.SeckillList.beginTimeStamp+'|'+this.SeckillList.endTimeStamp;
        },
        oListData:function(){//主菜单列表
            var _this = this;
            var sucSeckill = function (data) {
                if(data.result && data.result.length>0){
                    var _res = data.result;
                    var now = new Date().getTime(),
                        endDate = _res[0].beginTimeStamp;

                    if(endDate <= now){
                        _this.SeckillList = _res[0];
                        _this.product(_this.SeckillList.id);
                        if(_res[1]){
                            _this.soonSeckillList = _res[1];
                            _this.soonSecfalg = true;
                        }else {
                            _this.soonSecfalg = false;
                        }
                    }else{
                        _this.Seckillfalg = false;
                        _this.soonSeckillList = _res[0];
                        _this.soonSecfalg = true;
                    }
                }else{
                    _this.soonSecfalg = false;
                    _this.Seckillfalg = false;
                }
                if(_this.SeckillList.length==0 || !_this.soonSeckillList.id || _this.divFalg){
                    $('body').addClass('bgf');
                }else{
                    $('body').removeClass('bgf');
                }
                commentJs.fnTimeCountDown(_this.SeckillList.endTimeStamp);
            }
            o.spikeactivityList(sucSeckill);
        },
        product:function (id,index) {
            if(!id)return;
            var _this = this;
            var ProductList = function (data) {
                if(data.result && data.result.length>0){
                    $('body').removeClass('bgf');
                    if(index == 1){
                        _this.soonSeckillList.rule = [];
                            data.result.forEach(function (v,k) {
                            _this.soonSeckillList.rule.push(v);
                        })
                    }else{
                        _this.SeckillList.rule = [];
                        data.result.forEach(function (v,k) {
                            if(v.salesVolume){
                                v.pro_bg = (v.activityStock/(v.activityStock+v.salesVolume))*100
                            }else{
                                v.pro_bg = 100
                            }
                            v.sale_count = v.activityStock;
                            _this.SeckillList.rule.push(v);
                        })
                    }
                }else{
                    $('body').addClass('bgf');
                }
                _this.preLoading = false;
            }
            o.spikeProductList(id,ProductList);
        },
        handleScroll: function ()  {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var offsetTop = document.querySelector('#product_detail_html').offsetTop;
            scrollTop > 620 ? _this.headerTabShow = false : _this.headerTabShow = true;
        },
        week_change_list: function (index) {
            var _this = this;
            _this.seckill_index = index;
            if(_this.SeckillList.length==0 || !_this.soonSeckillList.id || _this.divFalg){
                $('body').addClass('bgf');
            }else{
                $('body').removeClass('bgf');
            }
            index == 0?_this.product(_this.SeckillList.id,index):_this.product(_this.soonSeckillList.id,index);
        }
    }

})
