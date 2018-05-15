
var commentJs = {
    /*首页头部*/
    homeHader: function (){
    $('.head-fixed').html('<div class="head-ser"><div class="logo"><img src="../../images/logo.png" alt="" class="site_logo"></div><a href="../product/search.html" class="header-inps"><i class="icon"></i><span class="search-input" id="keyword">仅支持建行信用卡客户分期购买</span><div class="submit-btn">搜索</div></a></div>');
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
            if(index == k){
                oHtml += '<li class="active"><a href="' + v.url + '"><i class="icon"></i><h3>' + v.title + '</h3></a></li>';
            }else{
                if(k == 2){
                    var shopNum = commentJs.getCookie('shopNum');
                    if(shopNum>0){
                        oHtml += '<li style="position: relative;"><a href="' + v.url + '"><i class="icon"></i><h3>' + v.title + '</h3></a><span id="cart_count"><sup>'+ commentJs.getCookie('shopNum')+'</sup></span></li>';
                    }else{
                        oHtml += '<li><a href="' + v.url + '"><i class="icon"></i><h3>' + v.title + '</h3></a></li>';
                    }
                }else{
                    oHtml += '<li><a href="' + v.url + '"><i class="icon"></i><h3>' + v.title + '</h3></a></li>';
                }
            }
        });
        $('.footer').html(oHtml + '</ul>');
    },
    /*搜索显示静态输入框*/
    staticSearch: function (index,title) {
        var titleAttr = ['请输入关键字','搜本店'],oUrl = '../../page/product/search.html';
        $('#header').html('<div class="header-wrap"><div class="header-l"> <a href="javascript:history.go(-1)"> <i class="back"></i> </a> </div><div class="header-inp clearfix"> <i class="icon"></i> <span class="search-input" id="keyword">'+titleAttr[title]+'</span></div><div class="header-r"><a href="../product/product_list.html" class="categroy"><i></i> </a><a id="header-nav" href="javascript:void(0);"><i class="more"></i><sup></sup></a> </div></div>');
        index == 1 ? $('#header .categroy').hide() : $('#header .categroy').show();
        title == 1 ? oUrl = '../../page/product/search.html?store=1': $('.search-input').html(commentJs.getUrlKey('title') || '请输入关键字');
        commentJs.downMenuSpot('header');
        //跳转到搜索
        $('.header-inp').unbind('click').on('click', function () {
            window.location.href = oUrl;
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
            oData[1] = {hrefUrl: '../product/search.html', classIcon: 'search', title: '搜索'}
        } else if (index == 2) {
            oData[1] = {hrefUrl: '../product/search.html', classIcon: 'search', title: '搜索'}
            oData[2] = {hrefUrl: '../shop/shopCar.html', classIcon: 'cart', title: '购物车'}
        } else if (index == 3) {
            oData = [
                {hrefUrl: '../home/home.html', classIcon: 'home', title: '首页'},
                {hrefUrl: '../product/search.html', classIcon: 'search', title: '搜索'},
                {hrefUrl: '../service/service.html', classIcon: 'message', title: '客服'}
            ]
        }else if (index == 4) {
            oData.splice(1, 0, {hrefUrl: '../product/search.html', classIcon: 'search', title: '搜索'});
        }
        oData.forEach(function (v, k) {
            oHtml += '<li><a href="' + v.hrefUrl + '"><i class="' + v.classIcon + '"></i>' + v.title + '</a></li>';
        });
        $("." + obj).append(oHtml + '</ul></div></div>');
        //点击显示列表菜单
        $('#header-nav').unbind('click').on('click', function () {
            $('#sort_inner').removeClass('show');
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
            $('.goods-class span').html() == '宝贝' ? window.location.href = '../page/product/product_item.html?title=' + _val : window.location.href = '../../page/product/search.html?title=' + _val;
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
            });
            $(options.wrapper).on('click', '.header-l > a', function () {
                $(options.wrapper).addClass('right').removeClass('left');
            });
            $(document).on("click", "#ldg_lockmask", function () {
                $(options.wrapper).addClass('right').removeClass('left');
                $(this).remove();
            });
            $(document).on("click", "#searchSubmit", function () {
                $(options.wrapper).addClass('right').removeClass('left');
                $('#ldg_lockmask').remove();
            });
        }

        _init();
    },
    /*回到顶部*/
    BackToTop: function (obj) {
        $('.' + obj).html('<a href="javascript:void(0);" class="gotop-btn gotop" id="goTopBtn"><i></i></a>');
    },
    /*弹框显示 如：收藏成功&取消收藏*/
    toastTitle: function (title,type,duration) {
            var dura = duration || 2000;
        $.toast(title, type,2000);
        setTimeout(function () {
            $('body .weui-toast').remove();
        },dura);
    },
    /*弹框 确定还是取消*/
    simpleDialogWrapper: function (title,btnTrue,btnCancel) {
        $('.dialogWrapper').html('');
        var _ohtml = '<div class="s-dialog-mask"></div><div style="left: 50%; top: 50%; margin-left: -111px;" class="s-dialog-wrapper s-dialog-skin-red"><div class="s-dialog-content">'+title+'</div><div class="s-dialog-btn-wapper"><a href="javascript:void(0)" class="s-dialog-btn-ok btnTrue">确定</a><a href="javascript:void(0)" class="s-dialog-btn-cancel btnCancel" >取消</a></div></div>'
        $('.dialogWrapper').html(_ohtml);
        $('.btnTrue').unbind('click').on('click', function () {
            btnTrue();
        });
        $('.btnCancel').unbind('click').on('click', function () {
            btnCancel();
        });
    },
    /*加载Loading*/
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
        $('#'+obj).find("ul:first").animate({marginTop: "-24px"},500,function() {
            $(this).css({
                marginTop: "0px"
            }).find("li:first").appendTo(this);
        });
    },
    /*ajax请求*/
    doPostGet: function (url, data, callback) {
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
            if (datas.httpCode == 200) {
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
            data :JSON.stringify(data),
            type : 'POST',
            contentType: "application/json",
            async: false,
            //headers: {'USER_TOKEN': '0000'},
            success: succFun
        });

        function succFun(datas) {
            if (datas.httpCode == 999) {

            }
            if (datas.httpCode == 500) {
                callback(datas);
            }
            if (datas.httpCode == 400) {
                callerror(datas);
            }
            if (datas.httpCode == 401) {
                $('.pre-loading').removeClass('show');
                $('.pre-loading').addClass('hide');
                commentJs.toastTitle(datas.msg,'forbidden');
            }
            if (datas.httpCode == 200) {
                callback(datas);
            }
            if (datas.httpCode == 201) {
                setLoginState(false)
            }
        }
    },
    //商品分享
    onMenuShare: function () {
        var wurl = window.location.href;
        if( wurl.indexOf('?') < 0){
            wurl = wurl+'code=123';
        }else{
            wurl = wurl+'?code=123';
        }

        var shareData={title:'海牙湾商城龙卡专区',link:wurl,imgUrl:'https://shop.g-town.com.cn/images/new_icon/wx_logo.png'};
        var _result = '';
        var suc = function (datas) {
            console.log(datas);
            _result = datas.data;
        }


        commentJs.doPostGet('https://paycenter.g-town.com.cn//index.php?ctl=Index&met=jsconfig&typ=json&ua=wap&url=','',suc);


        wx.config({
            appId: _result.appId, // 必填，公众号的唯一标识
            timestamp:  _result.timestamp, // 必填，生成签名的时间戳
            nonceStr:  _result.nonceStr, // 必填，生成签名的随机串
            signature:  _result.signature,// 必填，签名，见附录1
            jsApiList: ['getLocation','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: shareData.title, // 分享标题
                link: shareData.link,
                imgUrl: shareData.imgUrl, // 分享图标
            });
            //分享到朋友
            wx.onMenuShareAppMessage({
                title: shareData.title, // 分享标题
                desc: shareData.title, // 分享描述
                link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareData.imgUrl, // 分享图标
            });
        });
    },
    //城市地址选择
    areaSelected: function(options) {
        var defaults = {
            success : function(data){},
            hideThirdLevel: false
        }
        var options = $.extend({}, defaults, options);
        var ASID = 1;
        var ASID_1 = 0;
        var ASID_2 = 0;
        var ASID_3 = 0;
        var ASNAME = '';
        var ASINFO = '';
        var ASDEEP = 1;
        var ASINIT = true;
        function _init() {
            if ($('#areaSelected').html() != '') {
                $('#areaSelected').html('');
            }
            var thirdLevelHtml = options.hideThirdLevel ? "" : '<li><a href="javascript:void(0);" >三级地区</a></li>';
            var html = '<div class="nctouch-full-mask left">'
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
                + '</div>';
            $('#areaSelected').html(html);
            _getAreaList();
            _bindEvent();
            _close();
        }

        function _getAreaList() {
            $.ajax({//获取区域列表
                type:'get',
                url:'/zone/'+ASID,
                dataType:'json',
                async:false,
                success:function(result){
                    console.log(result)
                    if (result.result.length == 0) {
                        _finish();
                        return false;
                    }
                    if (ASINIT) {
                        ASINIT = false
                    } else {
                        ASDEEP++;
                    }
                    $('#areaSelected').find('#filtrate_ul').find('li').eq(ASDEEP-1).addClass('selected').siblings().removeClass('selected');

                    var data = result.result;
                    var area_li = '';
                    for(var i=0;i<data.length;i++){
                        area_li += '<li><a href="javascript:void(0);" data-id="' + data[i].id + '" data-name="' + data[i].name + '"><h4>' + data[i].name + '</h4><span class="arrow-r"></span> </a></li>';
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
                eval("ASID_"+ASDEEP+"=$(this).attr('data-name')");
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
    },
    //懒加载
    appLazyload: function () {
        $("body img.imm").lazyload({effect: "fadeIn"});
    },
    //日期选择
    datetimePicker: function () {
        var calendar = new LCalendar();
        calendar.init({
            'trigger': '#datetime-picker', //标签id
            'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
            'minDate': 1930 + '-' + 1 + '-' + 1, //最小日期
            'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()) //最大日期
        });
    }
    ,
    //地址选择（信息设置）
    cityScs:function () {
        function getAddrsArrayById(id) {
            var results = [];
            if (addr_arr[id] != undefined)
                addr_arr[id].forEach(function(subArr) {
                    results.push({
                        key: subArr[0],
                        val: subArr[1]
                    });
                });
            else {
                return;
            }
            return results;
        }
        /**
         * 通过开始的key获取开始时应该选中开始数组中哪个元素
         *
         * @param {Array} StartArr
         * @param {Number|String} key
         * @return {Number}
         */
        function getStartIndexByKeyFromStartArr(startArr, key) {
            var result = 0;
            if (startArr != undefined)
                startArr.forEach(function(obj, index) {
                    if (obj.key == key) {
                        result = index;
                        return false;
                    }
                });
            return result;
        }

        //bind the click event for 'input' element
        $("#myAddrs").click(function() {
            var PROVINCES = [],
                startCities = [],
                startDists = [];
            //Province data，shall never change.
            addr_arr[0].forEach(function(prov) {
                PROVINCES.push({
                    key: prov[0],
                    val: prov[1]
                });
            });
            //init other data.
            var $input = $(this),
                dataKey = $input.attr("data-key"),
                provKey = 1, //default province 北京
                cityKey = 36, //default city 北京
                distKey = 37, //default district 北京东城区
                distStartIndex = 0, //default 0
                cityStartIndex = 0, //default 0
                provStartIndex = 0; //default 0

            if (dataKey != "" && dataKey != undefined) {
                var sArr = dataKey.split("-");
                if (sArr.length == 3) {
                    provKey = sArr[0];
                    cityKey = sArr[1];
                    distKey = sArr[2];

                } else if (sArr.length == 2) { //such as 台湾，香港 and the like.
                    provKey = sArr[0];
                    cityKey = sArr[1];
                }
                startCities = getAddrsArrayById(provKey);
                startDists = getAddrsArrayById(cityKey);
                provStartIndex = getStartIndexByKeyFromStartArr(PROVINCES, provKey);
                cityStartIndex = getStartIndexByKeyFromStartArr(startCities, cityKey);
                distStartIndex = getStartIndexByKeyFromStartArr(startDists, distKey);
            }
            var navArr = [{//3 scrollers, and the title and id will be as follows:
                title: "省",
                id: "scs_items_prov"
            }, {
                title: "市",
                id: "scs_items_city"
            }, {
                title: "区",
                id: "scs_items_dist"
            }];
            SCS.init({
                navArr: navArr,
                onOk: function(selectedKey, selectedValue) {
                    $input.val(selectedValue).attr("data-key", selectedKey);
                }
            });
            var distScroller = new SCS.scrollCascadeSelect({
                el: "#" + navArr[2].id,
                dataArr: startDists,
                startIndex: distStartIndex
            });
            var cityScroller = new SCS.scrollCascadeSelect({
                el: "#" + navArr[1].id,
                dataArr: startCities,
                startIndex: cityStartIndex,
                onChange: function(selectedItem, selectedIndex) {
                    distScroller.render(getAddrsArrayById(selectedItem.key), 0); //re-render distScroller when cityScroller change
                }
            });
            var provScroller = new SCS.scrollCascadeSelect({
                el: "#" + navArr[0].id,
                dataArr: PROVINCES,
                startIndex: provStartIndex,
                onChange: function(selectedItem, selectedIndex) { //re-render both cityScroller and distScroller when provScroller change
                    cityScroller.render(getAddrsArrayById(selectedItem.key), 0);
                    distScroller.render(getAddrsArrayById(cityScroller.getSelectedItem().key), 0);
                }
            });
        });
    },
    //检测手机号
    checkPhone:function (str){
        if(!(/^1[0-9]\d{9}$/.test(str))){
            return false;
        }
        return true;
    },
    //检测固定电话
    checkFixedPhone:function (str){
        if(!(/^0\d{2,3}-?\d{7,8}$/.test(str))){
            return false;
        }
        return true;
    },
    //日期转换
    dataFormat:function (value) {
        var fmt = "yyyy-MM-dd ";//hh:mm:ss
        var _data = new Date(value);
        var o = {
            "M+" : _data.getMonth()+1,                 //月份
            "d+" : _data.getDate(),                    //日
            "h+" : _data.getHours(),                   //小时
            "m+" : _data.getMinutes(),                 //分
            "s+" : _data.getSeconds()          //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (_data.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    },
    //优惠券过期
    userCouponFormat:function (value) {
        var _data = new Date();
        var _data2 = parseInt(value) - parseInt(_data.getTime());
        if(_data2>=0){
            return 1;
        }else{
            return 0;
        }
    },
    //检查是否为空
    checkNotEmpty:function (str) {
        str = commentJs.outReplace(str);
        if (str != null && str.length > 0 && str!=''){
            return true;
        }
        return false;
    },
    //去掉所有空格
    outReplace:function (str){
        if(str){
            if(str.replace){
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }else{
                return str;
            }
        }else{
            return '';
        }
    },
    /*设置cookie*/
    setCookie:function (name, value, iDay) {
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+ escape(value)+';expires='+oDate+";path=/";
    },
    /*获取cookie*/
    getCookie:function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');    //把cookie分割成组
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];                      //取得字符串
            while (c.charAt(0)==' ') {          //判断一下字符串有没有前导空格
                c = c.substring(1,c.length);      //有的话，从第二位开始取
            }
            if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name
                return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值
            }
        }
        return '';
    },
    /*删除cookie*/
    removeCookie:function (name) {
        commentJs.setCookie(name, "", -1);
    },
    //购物车数量
    shopcarAll: function () {
        var suc = function (data) {
            var _num = 0;
            data.result.forEach(function (v,k) {
                v.cargoList.forEach(function (n,m) {
                    _num += n.count;
                })
            })
            commentJs.setCookie('shopNum',_num,1);
        }
        o.shopcarAll(suc);
    },

}

