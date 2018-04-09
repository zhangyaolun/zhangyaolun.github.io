var commentJs = {
    /*首页头部*/
    homeHader: function (){
    $('.head-fixed').html('<div class="head-ser"><div class="logo"><img src="../../images/logo.png" alt="" class="site_logo"></div><a href="../search.html" class="header-inps"><i class="icon"></i><span class="search-input" id="keyword">仅支持建行信用卡客户分期购买</span><div class="submit-btn">搜索</div></a></div>');
    },
    /*尾部*/
    headerFooter: function (index) {
        var data = [
            {url: '../home/home.html', src: '../../images/icon-index-active.png', title: '首页'},
            {url: '../product/product_list.html', src: '../../images/icon-class-active.png', title: '分类'},
            {url: '../shop/shopCar.html', src: '../../images/icon-cart-active.png', title: '购物车'},
            {url: '../member/member.html', src: '../../images/icon-mine-active.png', title: '我的'},
            {url: '../service/service.html', src: '../../images/footer5.png', title: '客服'}
        ], oHtml = '<ul>';
        data.forEach(function (v, k) {
            index == k ? oHtml += '<li class="active"><a href="' + v.url + '"><i class="icon"></i><h3>' + v.title + '</h3></a></li>' : oHtml += '<li><a href="' + v.url + '"><i class="icon"></i><h3>' + v.title + '</h3></a></li>';
        });
        $('.footer').html(oHtml + '</ul>');
    },
    /*搜索显示静态输入框*/
    staticSearch: function (index) {
        $('#header').html('<div class="header-wrap"><div class="header-l"> <a href="javascript:history.go(-1)"> <i class="back"></i> </a> </div><div class="header-inp clearfix"> <i class="icon"></i> <span class="search-input" id="keyword">请输入关键字</span></div><div class="header-r"><a href="../product/product_list.html" class="categroy"><i></i> </a><a id="header-nav" href="javascript:void(0);"><i class="more"></i><sup></sup></a> </div></div>');
        index == 1 ? $('#header .categroy').hide() : $('#header .categroy').show();
        commentJs.downMenuSpot('header');
        $('.search-input').html(commentJs.getUrlKey('title') || '请输入关键字');
        //跳转到搜索
        $('.header-inp').unbind('click').on('click', function () {
            window.location.href = '../../page/search.html';
        });
    },
    /*点击三个点，显示下拉列表菜单
     * 传入父元素class名,index(1为购物车使用 2为我的商城 3我的收藏 4秒杀)
     * */
    downMenuSpot: function (obj, index) {
        $("." + obj + " .nctouch-nav-layout").remove();
        var oData = [
            {hrefUrl: '../home/home.html', classIcon: 'home', title: '首页'},
            {hrefUrl: '../shop/shopCar.html', classIcon: 'cart', title: '购物车'},
            {hrefUrl: '../member/member.html', classIcon: 'member', title: '我的商城'},
            {hrefUrl: '../service/service.html', classIcon: 'message', title: '客服'}
        ], oHtml = '<div class="nctouch-nav-layout "><div class="nctouch-nav-menu"> <span class="arrow"></span><ul>';
        if (index == 1) {
            oData[1] = {hrefUrl: '../search.html', classIcon: 'search', title: '搜索'}
        } else if (index == 2) {
            oData[1] = {hrefUrl: '../search.html', classIcon: 'search', title: '搜索'}
            oData[2] = {hrefUrl: '../shop/shopCar.html', classIcon: 'cart', title: '购物车'}
        } else if (index == 3) {
            oData = [
                {hrefUrl: '../home/home.html', classIcon: 'home', title: '首页'},
                {hrefUrl: '../search.html', classIcon: 'search', title: '搜索'},
                {hrefUrl: '../service/service.html', classIcon: 'message', title: '客服'}
            ]
        }else if (index == 4) {
            oData.splice(1, 0, {hrefUrl: '../search.html', classIcon: 'search', title: '搜索'});
        }
        oData.forEach(function (v, k) {
            oHtml += '<li><a href="' + v.hrefUrl + '"><i class="' + v.classIcon + '"></i>' + v.title + '</a></li>';
        });
        $("." + obj).append(oHtml + '</ul></div></div>');
        //点击显示列表菜单
        $('#header-nav').unbind('click').on('click', function () {
            commentJs.showhide('nctouch-nav-layout');
        });
        //点击空白隐藏列表菜单
        $('.nctouch-nav-layout').unbind('click').on('click', function () {
            commentJs.showhide('nctouch-nav-layout');
        });
    },
    /*真实搜索框 header*/
    tureSearch: function () {
        $('#header').html('<div class="header-wrap"><div class="header-l"><a href="javascript:history.go(-1)"><i class="back"></i></a></div><div class="header-inp clearfix header-inp-ser"><div class="goods-class"><span>宝贝</span><i class="icon-drapdown"></i></div><ul class="goods-class-sel hide"><li class="active search_kind"><i class="icon"></i><span>宝贝</span></li><li class="search_kind"><i class="icon"></i><span>店铺</span></li></ul><input type="text" class="search-input" value="" id="keyword" placeholder="请输入搜索关键词" maxlength="50" autocomplete="on" autofocus=""><span class="input-del"></span></div><div class="header-r"><a id="header-nav" href="javascript:void(0);" class="search-btn">搜索</a></div></div>');
        //跳转到搜索
        $('.goods-class').unbind('click').on('click', function () {
            commentJs.showhide('goods-class-sel');
        });
        //点击选择 选择值 （宝贝/店铺） 0宝贝 1店铺
        $('.goods-class-sel li').unbind('click').on('click', function () {
            ;
            var _index = $(this).index();
            _index == 0 ? $('.goods-class span').html('宝贝') : $('.goods-class span').html('店铺');
            commentJs.showhide('goods-class-sel');
        });
        //跳转到搜索
        $('.search-btn').unbind('click').on('click', function () {
            var _val = $('#keyword').val();
            $('.goods-class span').html() == '宝贝' ? window.location.href = '../page/product/product_item.html?title=' + _val : window.location.href = '../../page/search.html?title=' + _val;
        });
    },
    /*筛选点击*/
    animationLeft: function (options) {
        var defaults = {
            valve: '.animation-left',          // 动作触发
            wrapper: '.nctouch-full-mask',    // 动作块
            scroll: '',     // 滚动块，为空不触发滚动
            openCallback: "" //显示内容触发事件
        }
        var options = $.extend({}, defaults, options);

        function _init() {
            $(options.valve).click(function () {
                options.openCallback && options.openCallback();
                $(options.wrapper).removeClass('hide').removeClass('right').addClass('left');

                /*if (options.scroll != '') {
                    if (typeof(myScrollAnimationLeft) == 'undefined') {
                        if (typeof(IScroll) == 'undefined') {
                            $.ajax({
                                url: WapSiteUrl+'/js/iscroll.js',
                                dataType: "script",
                                async: false
                            });
                        }
                        myScrollAnimationLeft = new IScroll(options.scroll, { mouseWheel: true, click: true });
                    } else {
                        myScrollAnimationLeft.refresh();
                    }
                }*/
            });
            $(options.wrapper).on('click', '.header-l > a', function () {
                $(options.wrapper).addClass('right').removeClass('left');
            });
            $(document).on("click", "#ldg_lockmask", function () {
                $(options.wrapper).addClass('right').removeClass('left');
                $(this).remove();
            });
        }

        _init();
    },
    /*回到顶部*/
    BackToTop: function (obj) {
        $('.' + obj).html('<a href="javascript:void(0);" class="gotop-btn gotop" id="goTopBtn"><i></i></a>');
    },
    /*弹框显示 如：收藏成功&取消收藏*/
    toastTitle: function (obj,title,fun,duration) {
        var dura = duration || 1500;
        $('.' + obj).html('<i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast_content">'+title+'</p>');
        setTimeout(function () {fun();},dura);
    },
    /*弹框显示 如：收藏成功&取消收藏*/
    toastLoading: function (title) {
        $('.pre-loading').html('<div class="pre-block"><div class="spinner"><i></i></div>'+title+'</div>');
    },
    /*app显示,进入页面显示结构*/
    appShowhide: function (obj) {
        $('#' + obj).removeClass('hide');
    },
    /*显示或隐藏*/
    showhide: function (obj) {
        $('.' + obj).hasClass('show') ? ($('.' + obj).removeClass('show'), $('.' + obj).addClass('hide')) : ($('.' + obj).removeClass('hide'), $('.' + obj).addClass('show'));
    },
    /*获取url参数值*/
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    },
    /*快报滚动*/
    AutoScroll: function (obj) {
    $('#'+obj).find("ul:first").animate({
            marginTop: "-24px"
        },
        500,
        function() {
            $(this).css({
                marginTop: "0px"
            }).find("li:first").appendTo(this);
        });
    },
    /*ajax请求*/
    doPost: function (url, data, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            /*data :data,
            type : 'POST',*/
            dataType: 'json',
            async: false,
            success: succFun
        });

        function succFun(datas) {
            if (datas.httpCode == 999) {

            }
            if (datas.httpCode == 500) {
                callback(datas);
            }
            if (datas.x == 400) {
                callerror(datas);
            }
            if (datas.status == 200) {
                callback(datas);
            }
            if (datas.httpCode == 201) {
                setLoginState(false)
            }
        }
    },
    /*ajax请求*/
    doPostPost: function (url, data, callback) {
        $.ajax({
            url: url,
            data :data,
            type : 'POST',
            async: false,
            success: succFun
        });

        function succFun(datas) {
            if (datas.httpCode == 999) {

            }
            if (datas.httpCode == 500) {
                callback(datas);
            }
            if (datas.x == 400) {
                callerror(datas);
            }
            if (datas.status == 200) {
                callback(datas);
            }
            if (datas.httpCode == 201) {
                setLoginState(false)
            }
        }
    },
    areaSelected: function(options) {//城市地址选择
        console.log(options)
        var defaults = {
            success : function(data){},
            hideThirdLevel: false
        }
        var options = $.extend({}, defaults, options);
        var ASID = 0;
        var ASID_1 = 0;
        var ASID_2 = 0;
        var ASID_3 = 0;
        var ASNAME = '';
        var ASINFO = '';
        var ASDEEP = 1;
        var ASINIT = true;
        function _init() {
            if ($('#areaSelected').length > 0) {
                $('#areaSelected').remove();
            }
            var thirdLevelHtml = options.hideThirdLevel ? "" : '<li><a href="javascript:void(0);" >三级地区</a></li>';
            var html = '<div id="areaSelected">'
                + '<div class="nctouch-full-mask left">'
                + '<div class="nctouch-full-mask-bg"></div>'
                + '<div class="nctouch-full-mask-block">'
                + '<div class="header">'
                + '<div class="header-wrap">'
                + '<div class="header-l"><a href="javascript:void(0);"><i class="back"></i></a></div>'
                + '<div class="header-title">'
                + '<h1>选择地区</h1>'
                + '</div>'
                + '<div class="header-r"><a href="javascript:void(0);"><i class="close"></i></a></div>'
                + '</div>'
                + '</div>'
                + '<div class="nctouch-main-layout">'
                + '<div class="nctouch-single-nav">'
                + '<ul id="filtrate_ul" class="area">'
                + '<li class="selected"><a href="javascript:void(0);">一级地区</a></li>'
                + '<li><a href="javascript:void(0);" >二级地区</a></li>'
                + thirdLevelHtml
                + '</ul>'
                + '</div>'
                + '<div class="nctouch-main-layout-a"><ul class="nctouch-default-list"></ul></div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
            $('body').append(html);
            _getAreaList();
            _bindEvent();
            _close();
        }

        function _getAreaList() {
            $.ajax({//获取区域列表
                type:'get',
                url:'http://paycenter.g-town.com.cn//index.php?ctl=Base_District&met=district&typ=json&pid='+ASID,
                dataType:'json',
                async:false,
                success:function(result){
                    console.log(result)
                    if (result.data.items.length == 0) {
                        _finish();
                        return false;
                    }
                    if (ASINIT) {
                        ASINIT = false
                    } else {
                        ASDEEP++;
                    }
                    $('#areaSelected').find('#filtrate_ul').find('li').eq(ASDEEP-1).addClass('selected').siblings().removeClass('selected');

                    var data = result.data;
                    var area_li = '';
                    for(var i=0;i<data.items.length;i++){
                        area_li += '<li><a href="javascript:void(0);" data-id="' + data.items[i].district_id + '" data-name="' + data.items[i].district_name + '"><h4>' + data.items[i].district_name + '</h4><span class="arrow-r"></span> </a></li>';
                    }
                    $('#areaSelected').find(".nctouch-default-list").html(area_li);
                    if (typeof(myScrollArea) == 'undefined') {
                        myScrollArea = new IScroll('#areaSelected .nctouch-main-layout-a', { mouseWheel: true, click: true });
                    } else {
                        myScrollArea.destroy();
                        myScrollArea = new IScroll('#areaSelected .nctouch-main-layout-a', { mouseWheel: true, click: true });
                    }
                }
            });
            return false;
        }

        function _bindEvent() {
            $('#areaSelected').find('.nctouch-default-list').off('click', 'li > a');
            var onceClick = true;
            $('#areaSelected').find('.nctouch-default-list').on('click', 'li > a', function(){

                if (onceClick === false) {
                    return false;
                }

                ASID = $(this).attr('data-id');
                eval("ASID_"+ASDEEP+"=$(this).attr('data-id')");
                ASNAME = $(this).attr('data-name');
                ASINFO += ASNAME + ' ';
                var _li = $('#areaSelected').find('#filtrate_ul').find('li').eq(ASDEEP);
                _li.prev().find('a').attr({'data-id':ASID, 'data-name':ASNAME}).html(ASNAME);
                if (options.hideThirdLevel && ASDEEP == 2) {
                    _finish();
                    onceClick = false;
                    return false;
                }
                if (ASDEEP == 3) {
                    _finish();
                    onceClick = false;
                    return false;
                }
                _getAreaList();
            });
            $('#areaSelected').find('#filtrate_ul').off('click', 'li > a');
            $('#areaSelected').find('#filtrate_ul').on('click', 'li > a', function(){
                if ($(this).parent().index() >= $('#areaSelected').find('#filtrate_ul').find('.selected').index()) {
                    return false;
                }
                ASID = $(this).parent().prev().find('a').attr('data-id');
                ASNAME = $(this).parent().prev().find('a').attr('data-name');
                ASDEEP = $(this).parent().index();
                ASINFO = '';
                for (var i=0; i<$('#areaSelected').find('#filtrate_ul').find('a').length; i++) {
                    if (i < ASDEEP) {
                        ASINFO += $('#areaSelected').find('#filtrate_ul').find('a').eq(i).attr('data-name') + ' ';
                    } else {
                        var text = '';
                        switch (i) {
                            case 0:
                                text = '一级地区'
                                break;
                            case 1:
                                text = '二级地区'
                                break;
                            case 2:
                                text = '三级地区';
                                break;
                        }
                        $('#areaSelected').find('#filtrate_ul').find('a').eq(i).html(text);
                    }
                }
                _getAreaList();
            });
        }

        function _finish() {
            var data = {area_id:ASID,area_id_1:ASID_1,area_id_2:ASID_2,area_id_3:ASID_3,area_name:ASNAME,area_info:ASINFO};
            options.success.call('success', data);
            if (!ASINIT) {
                $('#areaSelected').find('.nctouch-full-mask').addClass('right').removeClass('left');
            }
            return false;
        }

        function _close() {
            $('#areaSelected').find('.header-l').off('click', 'a');
            $('#areaSelected').find('.header-l').on('click', 'a',function(){
                $('#areaSelected').find('.nctouch-full-mask').addClass('right').removeClass('left');
            });
            return false;
        }
        _init();
    },
    //时间秒杀
    fnTimeCountDown:function(d){
        var $this = $(".fnTimeCountDown");
        var o = {

            sec: $this.find(".sec"),
            mini: $this.find(".mini"),
            hour: $this.find(".hour"),
            day: $this.find(".day")

        };
        var f = {
            zero: function(n){

                var _n = parseInt(n, 10);//解析字符串,返回整数
                if(_n > 0){
                    if(_n <= 9){
                        _n = "0" + _n
                        //_n = _n
                    }
                    return String(_n);
                }else{
                    return "00";
                }
            },
            dv: function(){
                var _d = $this.data("end") || d,pms = {
                    sec: "00",
                    mini: "00",
                    hour: "00",
                    day: "00"
                };
                if(!_d){
                    pms.day=pms.hour=pms.mini=pms.sec="00";
                    return pms;
                }
                var now = new Date(),
                    endDate = new Date(Date.parse(_d.replace(/-/g, "/")));
                var dur = (endDate - now.getTime()) / 1000 , mss = endDate - now.getTime() ;
                if(endDate < now){return pms;}
                if(mss > 0)
                {
                    pms.sec = f.zero(dur % 60);
                    pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                    pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                    pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400))) : "00";
                }
                else
                {
                    pms.day=pms.hour=pms.mini=pms.sec="00";
                }
                return pms;
            },
            ui: function(){
                if(o.sec){
                    o.sec.html(f.dv().sec);
                }
                if(o.mini){
                    o.mini.html(f.dv().mini);
                }
                if(o.hour){
                    o.hour.html(f.dv().hour);
                }
                if(o.day){
                    o.day.html(f.dv().day);
                }
                setTimeout(f.ui, 1);
            }
        };
        f.ui();
    },
    //商品飞入动效果
    shopFly:function () {
        var flay = $('<img src="'+$('#Fly_images').attr('src')+'" style="width: 3rem;height: 3rem;display: inline-block;border-radius: 50%;z-index: 999999999"/>');
        var height = window.screen.height,
            height2 = $('.nctouch-bottom-mask-block').css('height'),
            width = window.screen.width;
        height2 = height2.substring(0,height2.length-2);
        flay.fly({
            start:{
                left: 30,
                top: (height - parseInt(height2)),
            },
            end:{
                left: width/3,
                top: height-20,
                width: 2,
                height: 2
            },
            onEnd:function(){
                flay.fadeOut('slow',function(){
                    $(this).remove();
                })
            }
        })
    }
}


