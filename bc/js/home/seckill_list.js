new Vue({
    el: '#list',
    data: {
        preToast:false,
        preLoading:true,
        seckill_index:0,//正在秒杀与即将开抢切换
        SeckillList:[],//正在秒杀商品数据
        soonSeckillList:[],//即将秒杀商品数据
    },
    computed: {},
    mounted: function() {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.downMenuSpot('favheader', 4);
        commentJs.toastLoading('加载中...');
        window.addEventListener('scroll', this.handleScroll);
        commentJs.fnTimeCountDown();
        setTimeout(function () {_this.oListData();},10);
    },
    filters: {
        miaosha_fenqi_price: function(v) {
            return (v/12).toFixed(2);
        }
    },
    methods: {
        oListData:function(){//主菜单列表
            var _this = this;
            var sucSeckill = function (data) {
                console.log(data)
                _this.SeckillList = data.data.items[0];
                _this.soonSeckillList = data.data.items[1];
                _this.preLoading = false;
            }
            o.seckillGoods(sucSeckill);
        },
        handleScroll: function ()  {
            /*let _this = this;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let offsetTop = document.querySelector('#product_detail_html').offsetTop;
            scrollTop > (offsetTop / 2) ? _this.searchBarFixed = true : (_this.searchBarFixed = false);
            scrollTop > 620 ? _this.headerTabShow = false : _this.headerTabShow = true;*/
        },
        week_change_list: function (index) { //点击tab切换
            this.seckill_index = index;
        }
    }

})