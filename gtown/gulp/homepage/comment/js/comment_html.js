
var commentJs = {
    /*头部*/
    homeHader: function (title,type){
        var _href = type?type:'javascript:history.go(-1)';

        $('#header').html('<div class="header-wrap homehederbfg">\n' +
            '                <div class="header-l">\n' +
            '                    <a href="'+_href+'"> <i class="back back2"></i> </a>\n' +
            '                </div>\n' +
            '                <div class="header-title">\n' +
            '                    <h1 class="whiteSpace">'+title+'</h1>\n' +
            '                </div>\n' +
            '            </div>');
    },
    kefuLogo:function (kefu_logo_div) {//客服
        $("."+kefu_logo_div).unbind('click').on('click',function () {
            window.location.href = '../member/customer.html'
        })
    },
    /*尾部*/
    headerFooter: function (index) {
        var data = [
            {url: '../member/customer.html', src: '../../images/k_f.png', title: '客户必读'},
            {url: '', src: '../../images/icon-index-active.png', title: '首页'},
            {url: '../product/product_list.html', src: '../../images/icon-class-active.png', title: '分类'},
            {url: '../shop/shopCar.html', src: '../../images/icon-cart-active.png', title: '购物车'},
            {url: '../member/member.html', src: '../../images/icon-mine-active.png', title: '我的'}
        ], oHtml = '<ul>';
        data[1].url = '../home/home.html?'+sessionStorage.getItem('codeLogin');
        data.forEach(function (v, k) {
            if(index == k){
                oHtml += '<li class="active"><a href="' + v.url + '"><i class="icon"></i><h3>' + v.title + '</h3></a></li>';
            }else{
                if(k == 3){
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
    /*弹框显示 如：收藏成功&取消收藏 forbidden*/
    toastTitle: function (title,type,duration) {
        if($('body .weui-toast').length>0) return;
        $.toast(title, type);
    },
    /*弹框显示 如：加载*/
    showLoading: function (title) {
        $.showLoading(title);
    },
    hideLoading: function () {
        $.hideLoading();
    },
    /*弹框显示顶部 success  error warning警告*/
    toastToptip: function (title,type,duration) {
        if($('body .weui-toptips').length>0) return;
        var dura = duration || 2000;
        $.toptip(title,2000,type);
        setTimeout(function () {
            $('body .weui-toptips').remove();
        },dura);
    },
    /*弹框 确定还是取消*/
    simpleDialogWrapper: function (title,btnTrue,btnCancel) {
        $('.simple-dialog-wrapper').html('');
        var _ohtml = '<div class="s-dialog-mask"></div><div style="left: 50%; top: 50%; margin-left: -111px;" class="s-dialog-wrapper s-dialog-skin-red"><div class="s-dialog-content">'+title+'</div><div class="s-dialog-btn-wapper"><a href="javascript:void(0)" class="s-dialog-btn-ok btnTrue">确定</a><a href="javascript:void(0)" class="s-dialog-btn-cancel btnCancel" >取消</a></div></div>'
        $('.simple-dialog-wrapper').html(_ohtml);
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
    /*快报滚动*/
    AutoScrolls: function (obj) {
        $('#'+obj).find("ul:first").animate({marginTop: "-48px"},500,function() {
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
            beforeSend: function(request) {
                if(url.indexOf('/wx/userInfo') == -1 && url.indexOf('.json') == -1){
                    var _userId = sessionStorage.getItem('userId');
                    if(_userId){
                        request.setRequestHeader("token", _userId.split('|')[0]);
                    }
                    var shaUserId = sessionStorage.getItem('shaUserId');
                    if(shaUserId){
                        request.setRequestHeader("shaUserId", shaUserId);
                    }
                }
            },
            success: succFun,
            error:function (data) {
                commentJs.toastToptip('信息错误，请重试','error');
            }
        });

        function succFun(datas) {
            if (datas.httpCode == 200) {
                callback(datas);
            }else if (datas.status == 200) {
                callback(datas);
            }else if (datas.httpCode == 410) {
                if(datas.msg == '该商品已下架'){
                    callback(datas);
                }else{
                    commentJs.toastToptip(datas.msg,'error');
                }
            }else{
                if(url == '/order/subOrder'){
                    sessionStorage.setItem('orderNum',1);
                }
                if(url != '/userSign/'){
                    commentJs.toastToptip(datas.msg,'error');
                }

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
            beforeSend: function(request) {
                if(url.indexOf('/wx/userInfo') == -1 && url.indexOf('.json') == -1){
                    var _userId = sessionStorage.getItem('userId');
                    if(_userId){
                        request.setRequestHeader("token", _userId.split('|')[0]);
                    }
                    var shaUserId = sessionStorage.getItem('shaUserId');
                    if(shaUserId){
                        request.setRequestHeader("shaUserId", shaUserId);
                    }
                }
            },
            async: false,
            //headers: {'USER_TOKEN': '0000'},
            success: succFun,
            error:function (data) {
                commentJs.toastToptip('信息错误，请重试','error');
            }
        });

        function succFun(datas) {
            if (datas.httpCode == 200) {
                callback(datas);
            }else if (datas.status == 200) {
                callback(datas);
            }else if (datas.httpCode == 410) {
                if(datas.msg == '该商品已下架'){
                    callback(datas);
                }else{
                    commentJs.toastToptip(datas.msg,'error');
                }
            }else{
                if(url == '/order/subOrder'){
                    sessionStorage.setItem('orderNum',1);
                }
                commentJs.toastToptip(datas.msg,'error');
            }
        }
    },
    /*图片上传请求*/
    doPostImages: function (formdata, callback) {
        $.ajax({
            url:'/userSetting/upload',
            type: 'post',
            data: formdata,
            enctype:"multipart/form-data",
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function (request) {
                if(url.indexOf('/wx/userInfo') == -1 && url.indexOf('.json') == -1){
                    var _userId = sessionStorage.getItem('userId');
                    if(_userId){
                        request.setRequestHeader("token", _userId.split('|')[0]);
                    }
                    var shaUserId = sessionStorage.getItem('shaUserId');
                    if(shaUserId){
                        request.setRequestHeader("shaUserId", shaUserId);
                    }
                }
                commentJs.showLoading('上传中...');
            },
            success: function (data) {
                commentJs.hideLoading();
                if (data.httpCode == 200) {
                    callback(data);
                }else{
                    commentJs.toastToptip(data.msg,'error');
                }
            },
            error: function () {
                commentJs.hideLoading();
                commentJs.toastToptip('上传失败，请重新上传','error');
            },
            complete: function () {
                commentJs.hideLoading();
            }
        });
    },
    //商品分享
    onMenuShareAll: function () {
        console.log('000')
        var latitude = ''; // 纬度，浮点数，范围为90 ~ -90
        var longitude = ''; // 经度，浮点数，范围为180 ~ -180。
        var _userId=sessionStorage.getItem('userId');
        var wurl = 'http://kaixinzyw.vicp.net/page/home/homeLogin.html?shaUserId='+_userId.split('|')[2];
        var suc = function (data) {
            var _res = data.result;
            var shareData={title:'海牙湾商城',link:wurl,imgUrl:''};
            wx.config({
                debug: false,
                appId: _res.appId, // 必填，公众号的唯一标识
                timestamp:  _res.timestamp, // 必填，生成签名的时间戳
                nonceStr:  _res.nonceStr, // 必填，生成签名的随机串
                signature:  _res.signature,// 必填，签名，见附录1
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
                    title: '海牙湾商城', // 分享标题
                    desc: shareData.title, // 分享描述
                    link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareData.imgUrl, // 分享图标
                });
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var datas={location:"",key:"D7BBZ-HERW6-V26SZ-M35SP-5XPBT-LSFOD",get_poi:0};
                        datas.location = latitude + ',' + longitude;
                        if(!latitude && !longitude){ return;}
                        var url="http://apis.map.qq.com/ws/geocoder/v1/?";
                        datas.output="jsonp";
                        $.ajax({
                            type: "get",
                            dataType: 'jsonp',
                            data: datas,
                            jsonp: "callback",
                            jsonpCallback: "QQmap",
                            url: url,
                            success: function (json) {
                                var cityName = json.result.ad_info.city;
                                sessionStorage.setItem('cityName',cityName);
                            }
                        })
                    },
                });
            });
        }
        var _data = {url:location.href};
        _data.url = location.href
        o.userRewardShare(_data,suc);
    },
    //商品详情分享
    onMenuShareDetail: function (titsles,imgSrc,type,ids,time) {
        var wurl = 'http://e-shop.ecache.com.cn:80/page/home/detailLogin.html';
        var userId=sessionStorage.getItem('userId')?sessionStorage.getItem('userId').split('|')[2]:'';
        if(type == 1){
            wurl = wurl + '?binding='+userId+'&goods_id='+ids
        }else if(type == 2){
            wurl = wurl + '?binding='+userId+'&spikeProductId='+ids+'&time='+time
        }
        var shareData={title:titsles,link:wurl,imgUrl:imgSrc};
        var suc = function (data) {
            var _res = data.result;
            wx.config({
                appId: _res.appId, // 必填，公众号的唯一标识
                timestamp:  _res.timestamp, // 必填，生成签名的时间戳
                nonceStr:  _res.nonceStr, // 必填，生成签名的随机串
                signature:  _res.signature,// 必填，签名，见附录1
                jsApiList: ['getLocation','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
                // wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                //     wx.updateAppMessageShareData({
                //         title: '严选商城', // 分享标题
                //         desc: shareData.title, // 分享描述
                //         link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                //         imgUrl: shareData.imgUrl, // 分享图标
                //         success: function () {
                //             // 设置成功
                //             alert('分享给朋友')
                //         }
                //     });
                //     wx.updateTimelineShareData({
                //         title: '严选商城', // 分享标题
                //         link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                //         imgUrl: shareData.imgUrl, // 分享图标
                //         success: function () {
                //             // 设置成功
                //             alert('分享给朋友圈')
                //         }
                //     });
                // });
            wx.ready(function(){
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: shareData.title, // 分享标题
                    link: shareData.link,
                    imgUrl: shareData.imgUrl, // 分享图标
                });
                //分享到朋友
                wx.onMenuShareAppMessage({
                    title: '严选商城', // 分享标题
                    desc: shareData.title, // 分享描述
                    link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareData.imgUrl, // 分享图标
                });
            });
        }
        var _data = {url:''};
        _data.url = window.location.href;
        o.userRewardShare(_data,suc);
    },
    //城市地址选择
    areaSelected: function(options) {
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
        var AressID = '';
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
                + '<div class="header-wrap homehederbfg center">'
                + '<div class="header-l"><a href="javascript:void(0);"><i class="back back2"></i></a></div>'
                + '<div class="header-title">'
                + '<h1>选择地区</h1>'
                + '</div>'
                + '<div class="header-r"><a href="javascript:void(0);"><i class="close"></i></a></div>'
                + '</div>'
                + '</div>'
                + '<div class="nctouch-main-layout">'
                + '<div class="nctouch-single-nav">'
                + '<ul id="filtrate_ul" class="area">'
                + '<li class="selected"><a href="javascript:void(0);" pid="0">一级地区</a></li>'
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
            $('.pre-loading').css('display','block');
            $.ajax({//获取区域列表
                type:'get',
                url:'/zone/'+ASID,
                dataType:'json',
                async:true,
                beforeSend: function (request) {
                    var _userId = sessionStorage.getItem('userId');
                    if(_userId){
                        request.setRequestHeader("token", _userId.split('|')[0]);
                    }
                },
                success:function(result){
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
                        area_li += '<li><a href="javascript:void(0);" data-id="' + data[i].zoneId + '" data-name="' + data[i].name + '"><h4>' + data[i].name + '</h4><span class="arrow-r"></span> </a></li>';
                    }
                    $('#areaSelected').find(".nctouch-default-list").html(area_li);
        /*            if (typeof(myScrollArea) == 'undefined') {
                        myScrollArea = new IScroll('#areaSelected .nctouch-main-layout-a', { mouseWheel: true, click: true });
                    } else {
                        myScrollArea.destroy();
                        myScrollArea = new IScroll('#areaSelected .nctouch-main-layout-a', { mouseWheel: true, click: true });
                    }*/
                    //setTimeout(function () {

                        $('.pre-loading').css('display','none');
                   //  },1000)
                }
            });
            return false;
        }

        function _bindEvent() {
            /*$('#areaSelected').find('.nctouch-default-list').off('click', 'li > a');*/
            var onceClick = true;
            $('#areaSelected').find('.nctouch-default-list').unbind('click').on('click', 'li > a', function(){

                if (onceClick === false) {
                    return false;
                }
                ASID = $(this).attr('data-id');
                eval("ASID_"+ASDEEP+"=$(this).attr('data-name')");
                ASNAME = $(this).attr('data-name');
                ASINFO += ASNAME + ' ';
                AressID += ASID + ' ';
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
           /* $('#areaSelected').find('#filtrate_ul').off('click', 'li > a');*/
            $('#areaSelected').find('#filtrate_ul').unbind('click').on('click', 'li > a', function(){
                if ($(this).parent().index() >= $('#areaSelected').find('#filtrate_ul').find('.selected').index()) {
                    return false;
                }
                ASID = $(this).attr('pid');
                ASNAME = $(this).attr('data-name');
                ASDEEP = $(this).parent().index();
                ASINFO = '';
                AressID = '';
                for (var i=0; i<$('#areaSelected').find('#filtrate_ul').find('a').length; i++) {
                    if (i < ASDEEP) {
                        ASINFO += $('#areaSelected').find('#filtrate_ul').find('a').eq(i).attr('data-name') + ' ';
                        AressID += $('#areaSelected').find('#filtrate_ul').find('a').eq(i).attr('data-id') + ' ';
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
            var data = {area_id:ASID,area_id_1:ASID_1,area_id_2:ASID_2,area_id_3:ASID_3,area_name:ASNAME,area_info:ASINFO,area_all_id:AressID};
            data.area_all_id = data.area_all_id.substring(0,data.area_all_id.length-1);
            data.area_info = data.area_info.substring(0,data.area_info.length-1);
            options.success.call('success', data);
            if (!ASINIT) {
                $('#areaSelected').find('.nctouch-full-mask').addClass('right').removeClass('left');
            }
            return false;
        }

        function _close() {
            /*$('#areaSelected').find('.header-l').off('click', 'a');*/
            $('#areaSelected').find('.header-l').unbind('click').on('click', 'a',function(){
                $('#areaSelected').find('.nctouch-full-mask').addClass('right').removeClass('left');
            });
            return false;
        }
        _init();
    },
    //时间秒杀
    fnTimeCountDown:function(d,funTime){
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
                    endDate = _d;
                var dur = (endDate - now.getTime()) / 1000 , mss = endDate - now.getTime() ;
                if(endDate < now){return pms;}
                if(mss > 0){
                    pms.sec = f.zero(dur % 60);
                    pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                    pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                    pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400))) : "00";
                }else {
                    pms.day=pms.hour=pms.mini=pms.sec="00";
                }
                return pms;
            },
            ui: function(){
                var tTimeout = setTimeout(f.ui, 1000);
                if(o.sec){
                    $(".fnTimeCountDown .sec").html(f.dv().sec);
                    if(f.dv().day == '00'&&f.dv().hour == '00'&&f.dv().mini == '00'&&f.dv().sec == '00'){
                        if(funTime){
                            funTime();
                        }
                        clearTimeout(tTimeout);
                    }
                }
                if(o.mini){ $(".fnTimeCountDown .mini").html(f.dv().mini);}
                if(o.hour){ $(".fnTimeCountDown .hour").html(f.dv().hour);}
                if(o.day){ $(".fnTimeCountDown .day").html(f.dv().day);}
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
    //检测手机号
    checkPhone:function (str){
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(str))){
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
    //检测QQ号
    checkFixedQq:function (str){
        if(!(/^\d{5,10}$/.test(str))){
            return false;
        }
        return true;
    },
    //检测邮箱
    checkEmail:function (str){
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(!reg.test(str)){
            return false;
        }else{
            return true;
        }
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
    },
    //日期转换
    dataFormat:function (value,index) {
        var fmt = "yyyy-MM-dd ";//hh:mm:ss
        if(index == 1){
            fmt = "yyyy-MM-dd hh:mm:ss";
        }
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
    //去重
    arrayTemp: function (array) {
        var temp = [];
        var index = [];
        var l = array.length;
        for(var i = 0; i < l; i++) {
            for(var j = i + 1; j < l; j++){
                if (array[i] === array[j]){
                    i++;
                    j = i;
                }
            }
            temp.push(array[i]);
            index.push(i);
        }
        return temp;
    },
    //商品收藏
    shopCollNum: function () {
        var suc = function (data) {
            var _num = 0;

            data.result.list.forEach(function (v,k) {
                _num ++
            })
            commentJs.setCookie('shopCollNum',_num,1);
        }
        o.collectionList(1,1,100000000,suc);
    },
    //自动登录
    automaticLogin: function (codeLogin,fun) {
        if(codeLogin && !sessionStorage.getItem('userName')){
            var sucuserInfo = function (data) {
                var _res = data.result;
                var userId = data.msg + '|'  + _res.isSign+'|'+_res.id;
                sessionStorage.setItem('userName',_res.nickname,1);
                sessionStorage.setItem('userId',userId);
                var _logo = _res.logo?_res.logo:'';
                sessionStorage.setItem('logo',_logo);
                var url = location.search;
                var urlCo = parseInt(url.indexOf('?'))+parseInt(1);
                sessionStorage.setItem('codeLogin',url.substring(urlCo,url.length));
                if(fun){
                    fun();
                }
            }
            o.userInfo(codeLogin,sucuserInfo);
        }
    },
    //获取地理位置
    getLocation: function () {
        /*/page/product/product_detail.html?goods_id=f51eb4caab694fbb8c34ba381c113d28&shaUserId=933ef5ce726243ec94286f53095ab1c5*/
    },
    /***滑动限制***/
    stop: function () {
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
    /***取消滑动限制***/
    move: function () {
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
    },
    //添加足迹
    addFootprintSave: function (linkid) {
        var data = {
            "linkType":"1",
            "linkId":linkid
        }
        var sucuserInfo = function (data) {}
        o.footprintSave(data,sucuserInfo);
    },
    gethotNew:function(title){//获取热搜
        var _tit = title;
        var sucNew = function (data) {
            if(data.result && data.result.length>0){
                data.result.forEach(function (v,k) {
                    if(v.isOpen && k==0){
                        _tit = v.title;
                    }
                })
            }
        }
        o.homeNews(31,sucNew);
        return _tit;
    },
    imgError:function(){//图片加载失败
        document.addEventListener("error", function (e) {
            var elem = e.target;
            if (elem.tagName.toLowerCase() == "img") {
                elem.src = "../img/img.jpg";
            }
        }, true);
    }
}

