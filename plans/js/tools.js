var api_domain = 'http://testvenuesapi.g-town.com.cn/';
//var api_domain = 'http://local.phalcon.com';
$.tools = {
	latlong : null,
    ajaxFlag:true,
    canLoad:true,
    loading:function(){
        var html = '<div class="spinner">\
          <div class="bounce1"></div>\
          <div class="bounce2"></div>\
          <div class="bounce3"></div>\
        </div>';

        return html;
    },
    loadData:function(ele,url,params,callback,async){
    	if(async==-1)
    		async = false;
    	else
    		async =true;
        var _this = this;
        console.log(async);
        if(!_this.latlong){
        	
        }

        if(1==1)
        {
            var post = params ? params : {};
            if (typeof(Storage) !== "undefined") {
            params.latlong = localStorage.getItem("latlong");
            if(params.latlong==null){
            	params.latlong  = "1,1";
            }
            }
            
            var ops = {
                    url:url,
                    type:'post',
                    dataType:'jsonp',
                    jsonp : "callback",
                    async:async,
                    cache:false,
                    beforeSend:function(){
                        if(ele !== '')
                        {
                            $('#' + ele).append(_this.loading());
                        }
                        _this.ajaxFlag = false;
                    },
                    success:function(res){
                        $('.spinner').remove();
                        callback(res);
                        _this.ajaxFlag = true;
                    },
                 
                };

            if(post.length != 0)
            {
                ops = $.extend(ops,{data:post})
            }

            $.ajax(ops);
        }
    },
    initPage:function(callback){
        var _this = this;

        //var params = (location.href.split('#')[0]).replace(/(.*\/)*([^.]+).*/ig,"$2") + '.html';

        // if($.inArray(params, ['pay.html','calendars.html','detail.html']) !== -1)
        // {
            $.ajax({
                url:api_domain + '/venuesbasic/jsapiconfig',
                dataType:'json',
                crossDomain:true,
                xhrFields: {
                   withCredentials: true
                },
                data:{
                    current_url:location.href.split('#')[0]
                },
                dataType:'jsonp',
                jsonp : "callback",
                cache:false,
                success:function(res){
                    if(res.status.code == 200)
                    {
                        var obj = {
                            debug:false,
                            jsApiList:['openLocation','chooseWXPay','getLocation','hideAllNonBaseMenuItem']
                        };

                        wx.config($.extend(res.result,obj));
                        wx.ready(function(){
                            wx.error(function(res){
                                alert(res.errMsg);
                                console.log(res.errMsg);
                            });
                          
                           
                            wx.hideAllNonBaseMenuItem();
                            wx.getLocation({
                                success: function (res) {
                                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                    var speed = res.speed; // 速度，以米/每秒计
                                    var accuracy = res.accuracy; // 位置精度
                                    _this.latlong = longitude+","+latitude;
                                    if (typeof(Storage) !== "undefined") {
                                    localStorage.latlong =  longitude+","+latitude;
                                    }
                                    
                                },
                                cancel: function (res) {
                                    alert('用户拒绝授权获取地理位置');
                                },
                                fail:function(res){
                                	//alert(res.errMsg);
                                }
                            });
                            callback();
                           
                        });
                       
                    }else if(res.status.code == 400){
                        location.href = api_domain+"/venuesbasic/weixinoauth";
                    }else{
                        alert(res.status.msg);
                    }
                }
            });

        // }else{
        //     callback();
        // }
    },
    hash2obj:function(str){
        if(typeof(str) == 'undefined')
        {
            return {};
        }

        var arr = str.split('&');
        var obj = {};

        $.each(arr,function(k,v){
            var d = v.split('=');
            obj[d[0]] = d[1];
        });

        return obj;
    },
    getCookie: function() {
        var cookie_str = document.cookie;
        var cookie_obj = {};

        var c_arr = cookie_str.split(';');

        for (var i = 0, len = c_arr.length; i < len; i++) {
            var a = c_arr[i].split('=');

            cookie_obj[$.trim(a[0])] = a[1];
        }

        return cookie_obj;
    },
    setCookie: function(key, val, expire, domain) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expire * 24 * 60 * 60 * 1000);
        document.cookie = key + '=' + escape(val) + ((expire == null) ? "" : ";expires=" + exp.toGMTString()) + (domain == null ? '' : '; domain=.' + domain + ';path=/');
    },
    mainBottomNav:function(active){
        var html = template.compile('<div class="bottom-nav"><ul><% for(var i=0;i<list.length;i++){ %><li <% if(i == active){%>class="active"<% } %>><a href="<%=list[i].url%>"><span class="iconfont icon-<%=list[i].icon%>"></span><%=list[i].text%></a></li><% } %></ul></div>');

        var render = html({list:[{
                url:'/index.html',
                icon:'venues',
                text:'场馆'
            },{
                url:'/match.html',
                icon:'saishi',
                text:'赛事'
            },{
                url:'/recharge12.html',
                icon:'coupon',
                text:'充值'
            },{
                url:'/exercise.html',
                icon:'jianshen',
                text:'健身'
            },{
                url:'/my.html',
                icon:'wo',
                text:'我的'
            }],
            active:active
        });

        return render;
    },
    tempBillList:function(data){
        var html = template.compile('<ul class="bill-list ex-list">\
            <% for(var i=0;i<list.length;i++){ %>\
            <li>\
                <a href="/coach.html#cid=<%=list[i].id%>">\
                    <div class="pic">\
                        <img src="<%=list[i].photo%>" data-uri="<%=list[i].photo%>"/>\
                    </div>\
                    <div class="info">\
                        <h5 class="t2 c7"><%=list[i].name%> <span>\
                        <% if(list[i].gender == 0){ %>保密<% }else if(list[i].gender == 1){ %>男<% }else{ %>女<% } %>\
                        </span></h5>\
                        <p class="num"> <span class="count" style="color: #ff6257;"><% for(var t=0,tlen=list[i].score;t<tlen;t++){ %><span class="iconfont icon-wujiaoxing"></span><%}%></span> <%=list[i].score%></p>\
                        <p class="tags"><% for(var x=0;x<list[i].tags.length;x++){ %><span><%=list[i].tags[x]%></span><% } %></p>\
        		<% for(var z=0;z<list[i].gyms.length;z++){ %>\
                <p><span class="iconfont icon-pinpai"></span><%=list[i].gyms[z].brand_name%>：<%=list[i].gyms[z].name%></p>\
                <% } %>\
                    </div>\
                </a>\
            </li>\
            <% } %>\
        </ul>\
        <% if(index){ %>\
        <div class="txt-center" style="padding:1rem 0;">\
            <button class="btn btn-normal btn-style-3" id="get_more" data-type="1">查看更多</button>\
        </div>\
        <% } %>');

        var render = html(data);

        return render;
    },
    tempBillList2:function(data){
        var html = template.compile('<ul class="bill-list ex-shop">\
            <% for(var i=0;i<list.length;i++){ %>\
            <li>\
                <a href="/gym.html#gid=<%=list[i].jq_id%>">\
                    <div class="pic">\
                        <img src="<%=list[i].photo%>" data-uri="<%=list[i].photo%>"/>\
                    </div>\
                    <div class="info">\
                        <h5 class="t2 c7"><%=list[i].brand_name%></h5>\
                        <p><%=list[i].address%></p>\
                        <span class="distance" style="display:none"><%=list[i].distance%></span>\
                    </div>\
                </a>\
            </li>\
            <% } %>\
        </ul>\
        <% if(index){ %>\
        <div class="txt-center" style="padding:1rem 0;">\
            <button class="btn btn-normal btn-style-3" id="get_more" data-type="2">查看更多</button>\
        </div>\
        <% } %>');

        var render = html(data);

        return render;
    },
    navTemp:function(data){
        var html = template.compile('<div class="top-nav sticky-top">\
            <ul style="overflow:hidden">\
                <% for(var i=0,len=list.length;i<len;i++){ %>\
                <li class="col col-<%=12/len%>" data-param="<%=list[i].param%>" id="ex_<%=i%>">\
                    <a href="javascript:void(0);"><span class="cl-txt"><%=list[i].name%></span> <span class="iconfont icon-jiantou"></span></a>\
                    <ul class="sec-nav" data-id="ex_<%=i%>">\
                        <% for(var j=0,len2=list[i].data.length;j<len2;j++){ %>\
                        <% if(!/区域/i.test(list[i].name)){ %>\
                        <% if(/排序/i.test(list[i].name)){ %>\
                        <li data-type="<%=(j+1)%>"><a href="javascript:;"><%=list[i].data[j]%></a></li>\
                        <% }else{ %>\
                        <li data-type="<%=list[i].data[j]%>"><a href="javascript:;"><%=list[i].data[j]%></a></li>\
                        <% } %>\
                        <% }else{ %>\
                        <li data-type="<%=list[i].data[j].region_id%>"><a href="javascript:;"><%=list[i].data[j].region_name%></a></li>\
                        <% } %>\
                        <% } %>\
                    </ul>\
                </li>\
                <% } %>\
            </ul>\
        </div>');
        console.log(data)
        var render = html(data);

        return render;
    },
    dateNavTemp:function(data){
        var html = template.compile('<div class="top-nav<%=className%>">\
            <ul style="overflow:hidden">\
                <% for(var i=0,len=list.length;i<len;i++){ %>\
                <li<% if(i == 0){%> class="active"<% } %><% if(list[i].date){ %> data-date="<%=list[i].date%>"<% } %><% if(list[i].id){ %> id="<%=list[i].id%>"<% } %>>\
                    <a href="javascript:void(0);"><span class="cl-txt"><%==list[i].name%></span></a>\
                    <%if(list[i].booked){%><span class="dot"></span><%}%>\
                </li>\
                <% } %>\
            </ul>\
        </div>');

        var render = html(data);

        return render;
    },
    drawBooked:function(res){
        var result   = res.result;
        var nav      = result.nav;
        var order    = result.schedule_list;
        var re_order = {
            use:[],
            nouse:[]
        };

        $.each(order,function(k,v){
            if(v.status == 1)
            {
                re_order.nouse.push(v);
            }else{
                re_order.use.push(v);
            }
        });

        var html = template('booked_temp',{'list':re_order,'length':order.length});

        $('#booked_list').append(html);
    },
    loadGetMore:function(ele,url,params,init){
        var _this = this;
        $.tools.loadData(ele,url,params,function(res){
            if(res.status.code == 200)
            {
                if(res.result.length != 0){
                    if(init)
                    {
                        $('.wrapper').show();
                    }

                    $('.spinner').remove();

                    var result = res.result;

                    if(result.list.length != 0)
                    {
                        if(params.type == 1)
                        {
                            var list = [{
                                name:'健身目的',
                                data:result.tags,
                                param:'tags'
                            },{
                                name:'门店区域',
                                data:result.region_list,
                                param:'region_id'
                            },{
                                name:'排序',
                                data:['距离','评价'],
                                param:'order'
                            }];

                            var html      = $.tools.navTemp({'list':list});
                            var bill_list = $.tools.tempBillList({'list':result.list,'index':false});

                        }else{
                            var list = [{
                                name:'门店区域',
                                data:result.region_list,
                                param:'region_id'
                            },{
                                name:'排序',
                                data:['距离','评价'],
                                param:'order'
                            }];

                            var html      = $.tools.navTemp({'list':list});
                            var bill_list = $.tools.tempBillList2({'list':result.list,'index':false});
                        }

                        $('#list').append(bill_list);

                        if(init)
                        {
                            $('#header').append(html);
                        }
                    }else{
                        _this.canLoad = false;
                        $('#list').append('<p class="txt-center">没有更多了</p>');
                    }

                    window.params.offset = window.params.offset + result.list.length;
                }else{
                    if(init)
                    {
                        alert('当前页面不可用');
                    }else{
                        $('#list').append('<p class="txt-center">没有了</p>');
                    }
                }
            }else{
                alert(res.status.msg);
            }
        });
    },
    loadChickens:function(init,params,type){
        var ele = 'wrapper';
        if(!init)
        {
            $('#list').empty();
            ele = 'list';
        }
        $.tools.loadData(ele,api_domain + '/gym/coacherecommend',params,function(res){
            if(res.status.code == 200)
            {
                if(res.result.length != 0){
                    var result = res.result;
                    var bill_temp = $.tools.tempBillList({'list':result.coache_list,'index':true});

                    if(init)
                    {
                        var html = $.tools.mainBottomNav(3);
                        $('.wrapper').show();
                        $('#footer').append(html);
                        var padding_t = $('#header').height();
                        var padding_b = $('#footer ul').height();
                        $('#content').css({
                            'padding':padding_t + 'px 0 '+padding_b+'px 0'
                        });
                        if(params.city_name)
                        $('#city_name').text(params.city_name).data('id',0);
                        else{
                        	  $('#city_name').text('全国').data('id',0);
                        }
                    }
                    if(type==0)
                    	$('#list').html(bill_temp);
                    else
                    $('#list').append(bill_temp);
                }else{
                    alert('当前页面不可用');
                }
            }else{
                alert(res.status.msg);
            }
        },-1);
    },
    loadShop:function(params){
        $('#list').empty();

        $.tools.loadData('list',api_domain + '/gym/gymrecommend',params,function(res){
            if(res.status.code == 200)
            {
                if(res.result.length != 0){
                    var result = res.result;
                    var bill_temp = $.tools.tempBillList2({'list':result.gym_list,'index':true});

                    $('#list').html(bill_temp);
                }else{
                    alert('当前页面不可用');
                }
            }else{
                alert(res.status.msg);
            }
        },-1);
    },
    drawNav:function(data,is_show){
        var date = (data[3].name).replace(/<p>[\u4e00-\u9fa5]+<\/p>/,'');

        date = (new Date()).getFullYear() + '-' + date;

        var picker = {
            name:'更多日期',
            id:'date_picker',
            date:date
        };

        data.push(picker);

        var html = $.tools.dateNavTemp({'list':data,'className':' cal-nav'});

        $('#header').append(html);
    }
    
    
};

var dynamicLoading = {
		  css: function(path){
		 if(!path || path.length === 0){
		  throw new Error('argument "path" is required !');
		 }
		 var head = document.getElementsByTagName('head')[0];
		    var link = document.createElement('link');
		    link.href = path;
		    link.rel = 'stylesheet';
		    link.type = 'text/css';
		    head.appendChild(link);
		  },
		  js: function(path){
		 if(!path || path.length === 0){
		  throw new Error('argument "path" is required !');
		 }
		 var head = document.getElementsByTagName('head')[0];
		    var script = document.createElement('script');
		    script.src = path;
		    script.type = 'text/javascript';
		    head.appendChild(script);
		  }
		}


	dynamicLoading.css("css/sweet-alert.css");
	dynamicLoading.js("js/sweet-alert.js");
	
	window.alert=function(msg){
		sweetAlert(msg, "", "warning");
	}
	

