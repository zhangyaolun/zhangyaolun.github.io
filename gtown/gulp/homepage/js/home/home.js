new Vue({
    el: '#app',
    data: {
        oBackTopFixed:false,
        preLoading:true,
        swiperList:[],
        swiperBottomList:[],
        tcNavList:[],
        newsList:[],
        mainListdate:[],
        scoreActivityList:[],
        scoreList:[],
        scoreListindex:0,
        seachTitle:''
    },
    filters: {
        currency: function (value) {
            return value?'¥'+(parseFloat(value)/100).toFixed(2):'¥0.00';
        },
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        commentJs.removeCookie('userId');
        commentJs.removeCookie('userName');
        var _code = commentJs.getUrlKey('code') || '1';
        if(!_code && !sessionStorage.getItem('userId'))return;
        commentJs.automaticLogin(_code);
        commentJs.headerFooter(1);
        setInterval('commentJs.AutoScroll("scroll-news")', 2500);
        commentJs.BackToTop('fix-block-r');
        commentJs.shopcarAll();
        commentJs.kefuLogo('kefu_logo');
        _this.seachTitle = commentJs.gethotNew('加湿器 无线音箱 智能家电');
        setTimeout(function () {_this.getInfo();},10);
        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
        getInfo: function ()  {
            var _this = this;
            /*广告条：banner
            商城保障：shopPromise
            快捷导航：bannerNav
            爆款：baokuan
            优惠券：coupon
            模块引导图：templateImg
            商品2列表：listTwo
            商品3列表：listThree
            'scoreActivity','积分活动'
            'score','积分专区'*/
            var homeGetsuc = function (data) {
                var mainLi = {};
                _this.scoreList = [];
                data.result.forEach(function (v,k) {
                    mainLi = {'template':[],'list':[],'type':''};
                    if(v.group.linkType == 'banner' && (v.group.status == 1)){
                        if(!v.infos)return;
                        _this.swiperList = [];
                        v.infos.forEach(function (n,m) {
                            n.type == 'goods'?n.aHref = '../product/product_detail.html?goods_id='+n.linkId:n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                            _this.swiperList.push(n);
                        })
                    }else if(v.group.linkType == 'shopPromise' && (v.group.status == 1)){
                        if(!v.infos)return;
                        _this.swiperBottomList = [];
                        v.infos.forEach(function (n,m) {
                            n.type == 'goods'?n.aHref = 'javascript:void(0);':n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                            _this.swiperBottomList.push(n);
                        })
                    }else if(v.group.linkType == 'bannerNav' && (v.group.status == 1)){
                        if(!v.infos)return;
                        _this.tcNavList = [];
                        var NavList = {oClass:'',list:[]},oNum=0;
                        if(v.infos.length%3 == 0){
                            NavList.oClass = 'three';
                            v.infos.forEach(function (n,m) {
                                n.type == 'goods'?n.aHref = 'javascript:void(0);':n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                                if(m%3 == 0){
                                    NavList.list = v.infos.slice(oNum*3,3+oNum*3);
                                    _this.tcNavList.push(NavList);
                                    oNum++;
                                }
                            })
                        }else if(v.infos.length%4 == 0){
                            NavList.oClass = 'four';
                            v.infos.forEach(function (n,m) {
                                n.type == 'goods'?n.aHref = 'javascript:void(0);':n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                                if(m%4 == 0){
                                    NavList.list = v.infos.slice(oNum*4,4+oNum*4);
                                    _this.tcNavList.push(NavList);
                                    oNum++;
                                }
                            })
                        }else if(v.infos.length%5 == 0){
                            NavList.oClass = 'five';
                            v.infos.forEach(function (n,m) {
                                n.type == 'goods'?n.aHref = 'javascript:void(0);':n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                                if(m%5 == 0){
                                    NavList.list = v.infos.slice(oNum*5,5+oNum*5);
                                    _this.tcNavList.push(NavList);
                                    oNum++;
                                }
                            })
                        }
                    }else if(v.group.linkType == 'scoreActivity' && (v.group.status == 1)){
                        if(!v.infos)return;
                        _this.scoreActivityList = [];
                        v.infos.forEach(function (n,m) {
                            n.type == 'goods'?n.aHref = '../product/product_detail.html?goods_id='+n.linkId:n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                            _this.scoreActivityList.push(n);
                        })
                    }else if(v.group.linkType == 'score' && (v.group.status == 1)){
                        if(!v.infos)return;
                        v.infos.forEach(function (n,m) {
                            n.type == 'goods'?n.aHref = '../product/product_detail.html?goods_id='+n.linkId:n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                        })
                        _this.scoreList.push(v);
                    }else if(v.group.linkType == 'titleImg' && (v.group.status == 1)){
                        if(!v.infos)return;
                        v.infos.forEach(function (n,m) {
                            n.aHref = 'javascript:void(0);';
                            n.parentTitle = v.group.title;
                            n.parentType = v.group.linkType;
                            mainLi.template.push(n);
                        })
                    }else if(v.group.linkType == 'templateImg' && (v.group.status == 1)){
                        if(!v.infos)return;
                        v.infos.forEach(function (n,m) {
                            n.type == 'goods'?n.aHref = '../product/product_detail.html?goods_id='+n.linkId:n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                            n.parentTitle = v.group.title;
                            mainLi.template.push(n);
                        })
                    }else if(v.group.linkType == 'baokuan' && (v.group.status == 1)){
                        if(!v.infos)return;
                        v.infos.forEach(function (n,m) {
                            if(n.productPageDto && n.productPageDto != null && n.productPageDto != 'null'){
                                n.type == 'goods'?n.aHref = '../product/product_detail.html?goods_id='+n.linkId:n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                            }else{
                                n.aHref = '../member/shopLower.html';
                            }
                            n.oClass = 'baokuan';
                            mainLi.list.push(n);
                        })
                        mainLi.type = 'baokuan';
                    }else if(v.group.linkType == 'listTwo' && (v.group.status == 1)){
                        if(!v.infos)return;
                        v.infos.forEach(function (n,m) {
                            if(n.productPageDto && n.productPageDto != null && n.productPageDto != 'null'){
                                n.type == 'goods'?n.aHref = '../product/product_detail.html?goods_id='+n.linkId:n.type == 'url'?n.aHref = n.linkId:n.aHref = 'javascript:void(0);';
                            }else{
                                n.aHref = '../member/shopLower.html';
                            }
                            n.oClass = 'listTwo';
                            mainLi.list.push(n);
                        })
                    }else if(v.group.linkType == 'listThree' && (v.group.status == 1)){
                        if(!v.infos)return;
                        v.infos.forEach(function (n,m) {
                            if(n.productPageDto && n.productPageDto != null && n.productPageDto != 'null') {
                                n.type == 'goods' ? n.aHref = '../product/product_detail.html?goods_id=' + n.linkId : n.type == 'url' ? n.aHref = n.linkId : n.aHref = 'javascript:void(0);';
                            }else{
                                n.aHref = '../member/shopLower.html';
                            }
                            n.oClass = 'listThree';
                            mainLi.list.push(n);
                        })
                    }
                    if((mainLi.template.length>0) || (mainLi.list.length>0)){
                        _this.mainListdate[_this.mainListdate.length] = mainLi;
                    }
                })
                if(_this.mainListdate.length>0){
                    _this.mainListdate.forEach(function (v,k) {
                        if(v.list && v.list.length>0){
                            v.list.forEach(function (m,n) {
                                if(m.oClass == 'listThree'){
                                    (n+1)%3 == 0?m.borderNone = 'listThree borderNone':m.borderNone = 'listThree';
                                }
                                if(m.oClass == 'listTwo'){
                                    (n+1)%2 == 0?m.borderNone = 'listTwo borderNone':m.borderNone = 'listTwo';
                                }
                            })
                        }
                    })
                }
                if(_this.scoreList.length>0){
                    _this.scoreListindex = 0;
                }
                console.log(_this.scoreList)
                setTimeout(function(){
                    var mySwiper = new Swiper('.swiper-container1', {autoplay: 3000,loop: true,pagination: '.swiper-pagination1'});
                    _this.oBackTop();
                },20);
                _this.preLoading = false;
            }
            o.homeGetDate('admin',homeGetsuc);

            var sucNew = function (data) {
                _this.newsList = [];
                if(data.result && data.result.length>0){
                    data.result.forEach(function (v,k) {
                        if(v.isOpen){
                            _this.newsList.push(v);
                        }
                    })
                }
            }
            o.homeNews(11,sucNew);
        },
        oBackTop: function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        scoreListClick: function (i) {
            var _this = this;
            console.log(i)
            if(_this.scoreList.length>0){
                _this.scoreList.forEach(function (v,k) {
                    if(k==i){
                        console.log('0000');
                        v.group.scoreListindex = true;
                    }else{
                        v.group.scoreListindex = false;
                    }
                })
            }
        },
        shop_mod_container: function (aHref) {
            window.location.href = aHref;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
        }
    }
})
