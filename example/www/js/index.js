/**
 * Created by Administrator on 2016/10/27.
 */
(function($){
	$(function(){
		
	})
})(jQuery)
window.onload = function () {
    /*显示 加入数量*/
    var aShop = localStorage.getItem('shop'),
        oSattr = JSON.parse(aShop);
    if(aShop){
        flexBlack($(".footer i"));
    }
    var newNum = 0;
	    
    if(oSattr){
    	oSattr.forEach(function (v,k) {
	        newNum   += parseInt(v.num);
	    })
    }
    
    $(".footer i").html(newNum);
        /*轮换图 首页*/
    var mySwiperB = new Swiper ('.banner', {
        loop: true,
        pagination: '.swiper-pagination',
        autoplay: 2000,
        autoplayDisableOnInteraction:false,
    })
    /*页脚菜单交互*/
    $(".footer .foot-list li").on("singleTap",function () {
        var i = $(this).index();
        none($(".name"));
        none($(".ding"));
        none($(".youhui"));
        none($(".host"));
        i == 0 ? flexBlack($(".main")) : none($(".main"));
        i == 1 ? flexBlack($(".count")) : none($(".count"));
        i == 2 ? flexBlack($(".shop")) : none($(".shop"));
        i == 3 ? flexBlack($(".xiu")) : none($(".xiu"));
        i == 4 ? flexBlack($(".move")) : none($(".move"));
        $(".footer .foot-list li").removeClass("f-active").eq(i).addClass("f-active");
    })
    /*登录  注册 界面按钮交互*/
    $(".denglu .c-head .button-one")[0].addEventListener("touchstart", function () {
        flexBlack($(".zhuce"));
        none($(".denglu"));
    },false)
    $(".zhuce .c-head img:nth-of-type(1)")[0].addEventListener("touchstart", function () {
        flexBlack($(".denglu"));
        none($(".zhuce"));
    },false)

    /*登录后退*/
    $(".denglu .c-head img:nth-of-type(1)")[0].addEventListener("touchstart", function () {
        flexBlack($(".xiu"));
        none($(".denglu"));
    },false)

    /*注册后退*/
    $(".denglu .c-head .button-one")[0].addEventListener("touchstart", function () {
        flexBlack($(".zhuce"));
        none($(".denglu"));
        $('.input-name').val('');
        $('.input-word').val('');
        $('.input-pass').val('');
    },false)

    /*我的秀 登录注册进入*/
    $(".xiu .box-main p button:nth-of-type(1)")[0].addEventListener("touchstart", function () {
        flexBlack($(".denglu"));
        none($(".xiu"));
    },false)
    $(".xiu .box-main p button:nth-of-type(2)")[0].addEventListener("touchstart", function () {
        flexBlack($(".zhuce"));
        none($(".xiu"));
    },false)


    /*我的订单*/
    $(".xiu ul li").on("singleTap",function () {
        var i = $(this).index();
        $(".xiu").css({display:"none"});
        i == 0 ?  flexBlack($(".ding")) : none($(".ding"));
        i == 1 ?  flexBlack($(".youhui")) : none($(".youhui"));
        i == 2 ?  flexBlack($(".htory")) : none($(".htory"));
        i == 3 ?  flexBlack($(".but")) : none($(".but"));
    })
    /*我的优惠券*/
    $(".youhui div:nth-of-type(2) i").on("singleTap",function () {
        var i = $(this).index();
        $(".youhui div:nth-of-type(2) i").removeClass("iActive").eq(i).addClass("iActive");
        if(i == 0) $(".youhui ul p:nth-of-type(4) i").html("未使用");
        if(i == 1) $(".youhui ul p:nth-of-type(4) i").html("已使用");
        if(i == 2) $(".youhui ul p:nth-of-type(4) i").html("已过期");
        if(i == 3) $(".youhui ul p:nth-of-type(4) i").html("未激活");
    })

    /*后退 点击*/
    houTui($(".move .c-head img:nth-of-type(1)"),$(".xiu"),$(".move"),3);
    houTui($(".xiu .c-head img:nth-of-type(1)"),$(".shop"),$(".xiu"),2);
    houTui($(".shop .c-head img:nth-of-type(1)"),$(".count"),$(".shop"),1);
    houTui($(".count .c-head img:nth-of-type(1)"),$(".main"),$(".count"),0);

    function houTui(obj,b,c,d){
        obj[0].addEventListener("touchstart", function () {
            flexBlack(b);
            none(c);
            $(".footer .foot-list li").removeClass("f-active").eq(d).addClass("f-active");
        },false)
    }

    /*上拉加载*/
    var oScroll   = null,
        oPulldown = null,
        oPullup   = null;
    setTimeout(function () {
        oPulldown = $("#pulldown");
        oPullup = $("#pullup");
        oScroll = new iScroll('iscroll-main',{
            hScrollbar: false,
            vScrollbar: false,
            topOffset: oPulldown.height(),
            onScrollMove: function () {
                if(this.y > 5 && !oPulldown.hasClass("active")){
                    oPulldown.addClass("active").html("放开手刷新页面");
                    this.minScrollY = 0;
                }else if(this.y < 5 && oPulldown.hasClass("active")){
                    oPulldown.removeClass("active").html("下拉刷新");
                    this.minScrollY = -oPulldown.height();
                }else if(this.y < this.maxScrollY && !oPullup.hasClass("active")){
                    oPullup.addClass("active").html("放开手加载页面");
                }else if(this.y >= this.maxScrollY && oPullup.hasClass("active")){
                    oPullup.removeClass("active").html("上拉加载");
                }
            },
            onScrollEnd: function () {
                if(oPulldown.hasClass("active")){
                    oPulldown.html("Loading...");
                    if(num < 4){
                        pullDownData();
                    }else{
                        oPulldown.removeClass("active").html("暂无更新内容");
                        setTimeout(function () {
                            oScroll.refresh();
                        },300)
                    }
                }else if(oPullup.hasClass("active")){
                    oPullup.html("Loading...");
                    pullUpData();
                }
                /*打开详情页*/
                $(".main .main-list .main-li .ml-one").on("singleTap",function () {
                    window.location.href='index-jieshaoJ.html';
                    $(".footer .nav").css({display:"block",display:'flex'});
                    $(".footer .foot-list").css({display:"none"});
                })
            },
            onRefresh: function () {
                if(oPulldown.hasClass("active")){
                    oPulldown.removeClass("active").html("下拉刷新");
                }else if(oPullup.hasClass("active")){
                    oPullup.removeClass("active").html("上拉加载");
                }
                H = $(".main-list").height()+20;
            },
        })
        setTimeout(function () {
            $("#iscroll-main").css({left:0});
        },10)
    },100)
    var num = 1;
    function pullDownData(){
        num++;
        $.ajax({
            url:'https://s.m.taobao.com/search?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&m=api4h5&abtest=16&wlsort=16&style=list&closeModues=nav%2Cselecthot%2Conesearch&page='+ num +" ' ",
            async: true,
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                for(var i=0;i<data.listItem.length;i++){
                    $("#iscroll-main ul").prepend('<li class="main-li"><img src="'+ data.listItem[i].pic_path +' " alt="" class="ml-one"><span><i>'+ data.listItem[i].name +'</i><i>￥<em>'+ data.listItem[i].price +'</em> <em></em></i><i>'+ data.listItem[i].zkType+'</i></span><strong><img src="img/m-4.png" alt="" class="ml-two"></strong></li>');
                }
                oScroll.refresh();
            }
        });
    }
    function pullUpData(){
        num++;
        $.ajax({
            url:'https://s.m.taobao.com/search?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&m=api4h5&abtest=16&wlsort=16&style=list&closeModues=nav%2Cselecthot%2Conesearch&page='+ num +" ' ",
            async: true,
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function (data) {
                for(var i=0;i<data.listItem.length;i++){
                    $("#iscroll-main ul").append('<li class="main-li"><img src="'+ data.listItem[i].pic_path +' " alt="" class="ml-one"><span><i>'+ data.listItem[i].name +'</i><i>￥<em>'+ data.listItem[i].price +'</em> <em></em></i><i>'+ data.listItem[i].zkType+'</i></span><strong><img src="img/m-4.png" alt="" class="ml-two"></strong></li>');
                }
                oScroll.refresh();
            }
        });
    }


    /*详情后退首页*/
    $(".jie .c-head img:nth-of-type(1)").on("singleTap",function () {
        window.location.href='index-jieshaoJ.html';
        $(".footer .foot-list").css({display: 'inline-flex',display:'flex'});
        none($(".footer .nav"));
    })

    /*商品介绍更换*/
    $(".nav li").on("singleTap",function () {
        var i = $(this).index();
        $(".nav li").removeClass("f-active").eq(i).addClass("f-active");
        if(i == 0) window.location.href='index-jieshaoJ.html';
        if(i == 1) window.location.href='index-jieshaoX.html';
        if(i == 2) window.location.href='index-jieshaoS.html';
    })

    /*登录注册信息*/
    $(".zhuce .deng-btn").on("singleTap",function () {
        var
            oName = $(".input-name").val(),
            oWord = $(".input-word").val(),
            oPass = $(".input-pass").val();
            if(oName && oWord && oPass && (oWord == oPass)) {
					console.log("接口正在发送中请耐心等待。。。");
					$("#hide").css({display:"block"});
					$("#hide div").html("接口正在发送中请耐心等待。。。")
					
					$.ajax({
						type: "POST",
						url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
						data: {
							"status":"register",
							"userID":oName,
							"password":oPass,
						},
						success: function(data) {
							
							if(data ==0 ){
								$("#hide div").html("用户重命名");
								setTimeout(function(){
		    						$("#hide").css({display:"none"});
		    					},500)
							}else if(data == 1){
								$("#hide div").html("您已经注册成功");
								var userTmp = {
		    						userID:oName,
		    						loginTag:false
		    					}
								userTmp = JSON.stringify(userTmp);
	    						sessionStorage.setItem('userInfo',userTmp);
								setTimeout(function(){
		    						$("#hide").css({display:"none"});
		    						flexBlack($(".denglu"));
	           						 none($(".zhuce"));
		    					},500)
							}else if(data == 2){
								$("#hide div").html("数据库错误,请重新注册");
							}else{
								$("#hide div").html("未知错误,请重新注册");
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("XMLHttpRequest：====" + XMLHttpRequest);
		    				console.log("textStatus：=====" + textStatus);
		    				console.log("errorThrown：======" + errorThrown);
						}
					})

				}else{
					//错误判断以及提醒
				}
        /*localStorage.setItem(oName, oPass);
        if(oWord == oPass){
            $('.input-name').val('');
            $(".input-word").val('').css({boxShadow:"none"});
            $(".input-pass").val('').css({boxShadow:"none"});
            flexBlack($(".denglu"));
            none($(".zhuce"));
        }else{
            $(".input-word").css({boxShadow:"0 0 .01rem.01rem red"})
            $(".input-pass").css({boxShadow:"0 0 .01rem.01rem red"})
        }*/
    })

	    /*记住密码*/
	    var flag = true;
	    $(".check").on("singleTap",function () {
	        flag ? ($(".check").css({checked: "checked"}), flag = false) : ($(".check").css({checked: "true"}),flag = true);
	    })
    /*登录*/
    $(".denglu .deng-btn").on("singleTap",function () {
        var
            oDname = $('.name-deng').val(),
            oDpass = $('.pass-deng').val();
             /*if(!flag){
                $(".name-deng").val(oDname);
                $(".pass-deng").val(oDpass);
            }else {*/
                $(".name-deng").val('');
                $(".pass-deng").val('');
            /*}*/
            /*a = localStorage.getItem(oDname);*/
            var tag = true;
    		if( oDname && oDpass && tag){
    			//格式校验
    			$("#hide").css({display:"block"});
    			console.log("已经进来，等待发送！请耐心等待");
    			$("#hide div").html("等待发送！请耐心等待");
    			$.ajax({
	    			type:"POST",
	    			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
	    			data:{
	    				"status":"login",
	    				"userID":oDname,
	    				"password":oDpass
	    			},
	    			success:function(data){
	    				console.log("接口请求已经成功");
	    				if(data == 0){
	    					$("#hide div").html("用户账号不存在，请您注册");
	    						$("#hide").css({display:"none"});
	    						flexBlack($(".zhuce"));
           						 none($(".denglu"));
	    					var userTmp = {
	    						userID: oDname,
	    						loginTag:false
	    					}
	    					userTmp = JSON.stringify(userTmp);
	    					sessionStorage.setItem('userInfo',userTmp);
	    					location.href="#/tmp/myselfPage2";
	    				}else if(data == 2){
	    					$("#hide div").html("用户名密码不符");
	    					setTimeout(function(){
	    						$("#hide").css({display:"none"});
	    					},500)
	    				}else{
	    					console.log("success");
	    					var userTmp = {
	    						userID: oDname,
	    						loginTag:true
	    					}
	    					userTmp = JSON.stringify(userTmp);
	    					sessionStorage.setItem('userInfo',userTmp);
	    					$("#hide div").html("登陆成功");
	    					setTimeout(function(){
	    						$("#hide").css({display:"none"});
	    						flexBlack($(".xiu"));
           						 none($(".denglu"));
           						 none($(".move"));
           						 $(".footer .foot-list li").removeClass("f-active").eq(3).addClass("f-active");
           						 $(".box-main p em").html(oDname);
           						 $(".box-main p em").css({fontSize: '0.12rem'});
           						 $(".box-main p button").css({display:"none"});
           						 $(".move button").html("退出登录");
	    					},500)
	    				}
	    			},
	    			error:function(XMLHttpRequest, textStatus, errorThrown){
	    				console.log("XMLHttpRequest：====" + XMLHttpRequest);
	    				console.log("textStatus：=====" + textStatus);
	    				console.log("errorThrown：======" + errorThrown);
	    			}
	    			
	    		})
    		}else{
    			$("#hide div").html("请填写用户名或密码");
    			setTimeout(function(){
					$("#hide").css({display:"none"});
				},500)
    		}
       /* if(a == oDpass){
            if(!flag){
                $(".name-deng").val(oDname);
                $(".pass-deng").val(oDpass);
            }else {
                $(".name-deng").val('');
                $(".pass-deng").val('');
            }
            $(".xiu .box-main p em").html(oDname);
            $(".name-deng").css({boxShadow:"none"});
            $(".pass-deng").css({boxShadow:"none"});
            flexBlack($(".xiu"));
            none($(".denglu"));
        }else{
            $(".name-deng").css({boxShadow:"0 0 .01rem.01rem red"})
            $(".pass-deng").css({boxShadow:"0 0 .01rem.01rem red"})
        }*/
    })
    
    /*点击退出登录*/
   var flag = true;
    $(".move button").on("singleTap",function () {
    	
    	if(flag){
    		flexBlack($(".denglu"));
    		none($(".move"));
    		$(".box-main p button").css({display:"none"});
    		$(".move button").html("退出登录");
    		$(".box-main p em").css({fontSize: '0.12rem'});
    		flag = false;
    	}else{
    		$(".box-main p button").css({display:"block"});
    		$(".move button").html("登录");
    		$(".box-main p em").html("未知");
    		$(".box-main p em").css({fontSize: '0.22rem'});
    	}
    })
    
    $(".footer .foot-list li:nth-of-type(3)").on("singleTap",function () {
		
        /*购物车*/
        var oShop = localStorage.getItem('shop');
        if(oShop == "[]"){
            flexBlack( $(".kong"));
            none( $(".has"));
        }else{
            flexBlack( $(".has"));
            none( $(".kong"));
        }
		
        /*存入购物车*/
        var aShop = localStorage.getItem('shop'),
            oSattr = JSON.parse(aShop);
        var oHtml = '';

        for(var i=0;i<oSattr.length;i++){
            oHtml += '<li><img src="'+ oSattr[i].oSrc +'" alt=""><span><i>'+ oSattr[i].oName +'</i><i>单价：<b>￥</b><em>'+ oSattr[i].oPrice +'</em></i><i>数量：<em class="jian">-</em><input type="text" value="'+ oSattr[i].num +'"><em class="jia">+</em></i></span><strong><img src="img/shop.png" alt=""></strong></li>';
        }
        $('.has ul').html(oHtml);

        /*数量  总价*/
        var nPrice = 0,
            oNum = 0;
        oSattr.forEach(function (v,k) {
            nPrice += parseInt(v.oPrice)*v.num;
            oNum   += parseInt(v.num);
        })
        $(".has div span:nth-of-type(1) i").html(oNum);
        $(".has div span:nth-of-type(2) em").html(nPrice);
        $(".footer i").html(oNum);

        /*删除*/
        var oDle = $(".has ul");
        oDle.on('touchstart','strong', function (ev) {
            var aShop = localStorage.getItem('shop'),
                oSattr = JSON.parse(aShop);
            var
                ev = ev || window.event,
                oTarget = ev.srcElement || ev.target;
            oTarget.parentNode.parentNode.remove();
            oSattr.forEach(function (v,k) {
                if(v.oName == oTarget.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML){
                    oSattr.splice(k,1);
                }
            })
            if(oSattr.length == 0){
                flexBlack( $(".kong"));
                none( $(".has"));
                none( $(".footer i"));
            }
            localStorage.setItem('shop',JSON.stringify(oSattr));
            /*更新 数量  总价*/
            var newNum = 0,
                newPrice = 0;
            oSattr.forEach(function (v,k) {
                newPrice += parseInt(v.oPrice)*v.num;
                newNum   += parseInt(v.num);
             })
             $(".has div span:nth-of-type(1) i").html(newNum);
             $(".has div span:nth-of-type(2) em").html(newPrice);
             $(".footer i").html(newNum);
        })
        /*购物车  加 减 */
        $(".has ul li .jian").on("singleTap",function () {
            var aShop = localStorage.getItem('shop'),
                oSattr = JSON.parse(aShop);
            var
                ev      = ev || window.event,
                oTarget = ev.srcElement || ev.target,
                oVal    = oTarget.parentNode.childNodes[2].value;
            oSattr.forEach(function (v,k) {
                if(v.oName == oTarget.parentNode.parentNode.childNodes[0].innerHTML){
                    v.num--;
                    oVal--;
                    if(v.num == 0){
                        v.num = 1;
                        oVal  = 1;
                    }
                }
            })
            localStorage.setItem('shop',JSON.stringify(oSattr));
            /*更新 数量  总价*/
            var aShop = localStorage.getItem('shop'),
                oSattr = JSON.parse(aShop);
            var newNum = 0,
                newPrice = 0;
            oSattr.forEach(function (v,k) {
                newPrice += parseInt(v.oPrice)*v.num;
                newNum   += parseInt(v.num);
            })
            $(".has div span:nth-of-type(1) i").html(newNum);
            $(".has div span:nth-of-type(2) em").html(newPrice);
            oTarget.parentNode.childNodes[2].value = oVal;
            $(".footer i").html(newNum);
        })
        $(".has ul li .jia").on("singleTap",function () {
            var aShop = localStorage.getItem('shop'),
                oSattr = JSON.parse(aShop);
            var
                ev      = ev || window.event,
                oTarget = ev.srcElement || ev.target,
                oVal    = oTarget.parentNode.childNodes[2].value;
            oSattr.forEach(function (v,k) {
                if(v.oName == oTarget.parentNode.parentNode.childNodes[0].innerHTML){
                    v.num++;
                    oVal++;
                }
            })
            localStorage.setItem('shop',JSON.stringify(oSattr));
            /*更新 数量  总价*/
            var aShop = localStorage.getItem('shop'),
                oSattr = JSON.parse(aShop);

            var newNum = 0,
                newPrice = 0;
            oSattr.forEach(function (v,k) {
                newPrice += parseInt(v.oPrice)*v.num;
                newNum   += parseInt(v.num);
            })
            $(".has div span:nth-of-type(1) i").html(newNum);
            $(".has div span:nth-of-type(2) em").html(newPrice);
            oTarget.parentNode.childNodes[2].value = oVal;
            $(".footer i").html(newNum);
        })
    })


    /*存入购物信息*/
    var
        oList = $('.main-list ul');
    oList.on('touchstart','strong', function (ev) {
    	console.log(1)
        var
            ev = ev || window.event,
            oTarget = ev.srcElement || ev.target;
        /*加入信息*/
        var oShop = localStorage.getItem('shop');
        var btn = true;
        if(oShop == null){
            var sAttr = [];
        }else{
            sAttr = JSON.parse(oShop);
        }
        for(var i=0;i<sAttr.length;i++){
            if(oTarget.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML == sAttr[i].oName){
                sAttr[i].num ++;
                btn = false;
            }
        }
        if(btn){
            var oAttr = {
                oName :oTarget.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML,
                oPrice : oTarget.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].innerHTML,
                oSrc : oTarget.parentNode.parentNode.childNodes[0].getAttribute('src'),
                num : 1,
            }
            sAttr.push(oAttr);
        }
        localStorage.setItem('shop',JSON.stringify(sAttr));
        var newNum = 0;
        sAttr.forEach(function (v,k) {
            newNum   += parseInt(v.num);
        })
        $(".footer i").html(newNum);
    })

    /*购物车 空  去购物*/
    $(".kong img:nth-of-type(2)").on("singleTap",function () {
        flexBlack( $(".main"));
        none( $(".shop"));
    })
    /*加入购物车动效*/
    $(".main .main-list").click(function (ev) {
        var
            ev = ev || window.event,
            oTarget = ev.srcElement || ev.target;
        if(oTarget.nodeName == "IMG"){
            var oImg = oTarget.parentNode.parentNode.childNodes[0].getAttribute('src');
            var flay = $('<img src="'+oImg+'" class="img" />');
            flay.fly({
                start:{
                    left: ev.clientX,
                    top: ev.clientY,
                },
                end:{
                    left: $('.foot-list li:nth-of-type(3) span').offset().left,
                    top: $('.foot-list li:nth-of-type(3) span').offset().top,
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
    })



    function flexBlack(a){
        a.css({display:"block",dispaly:"flex"})
    }
    function none(a){
        a.css({display:"none"})
    }

}
