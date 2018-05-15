new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading:true,
        swiperList:[],//轮播
        swiperBottomList:[{'src':'../../images/new_icon/zheng.png','title':'正品行货'},{'src':'../../images/new_icon/lian.png','title':'全国联保'},{'src':'../../images/new_icon/you.png','title':'全场包邮'},{'src':'../../images/new_icon/fenqi.png','title':'免费分期'}],//轮播图下
        tcNavList:[{'href':'brand_list.html','title':'品牌专区'},{'href':'seckill_list.html','title':'秒杀风暴'},{'href':'groups_list.html','title':'伙拼成团'},{'href':'javascript:void(0)','title':'在线办卡'}],
        newsList:[],//快报
        mainListdate:[],//商品信息
        product: {},
        items: {}
    },
    filters: {
        goods_spec: function(v,h) {
            var num = h.goods_promotion_price/h.goods_fenqi_price;
            num=='NaN'?num='':num=num.toFixed(0);
            return num;
        }
    },
    mounted: function () {
        var _this = this
        FastClick.attach(document.body);
        commentJs.onMenuShare();
        return;
        commentJs.homeHader();
        commentJs.headerFooter(0);
        setInterval('commentJs.AutoScroll("scroll-news")', 2500);
        commentJs.BackToTop('fix-block-r');
        window.addEventListener('scroll', this.handleScroll);
        commentJs.toastLoading('加载中...');
        commentJs.shopcarAll();
        setTimeout(function () {_this.getInfo();},10);
        //强制让内容超过
        $('#main').css("height",window.innerHeight+100);
        window.scrollTo(0, 1);
//重置成新高度
        $("#main").css("height",window.innerHeight);
//非常重要，用于兼容不同机型，防止浏览器窗口移动
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },

    methods: {
        getInfo: function ()  {//首页数据
            var _this = this;
            var suc = function (data) {
                console.log(data)
                _this.swiperList = data.data.module_data[0].slider_list.item;
                _this.mainListdate = data.data.module_data;
                _this.mainListdate.shift();
                _this.preLoading = false;
                setTimeout(function(){
                    var mySwiper = new Swiper('.swiper-container1', {autoplay: 3000,loop: true,pagination: '.swiper-pagination1'});
                },200);
            }
            o.homeGetDate(suc);
            var sucNew = function (data) {
                _this.newsList = data.data.items;
            }
            o.homeNews(sucNew);
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        }
    }
})