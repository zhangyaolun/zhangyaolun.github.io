var o = {
	init:function(){
		document.getElementsByTagName("body")[0].setAttribute("style","display:block");
		var open = getParameter('openId');
		if(open){
			$('.img_myself').attr('src','/user/qrcode?openid='+open);	
		}else{
			$('.img_myself').attr('src','../img/open.jpg');	
		}
		var data = {
			'openid':getParameter('openId')
		}
		var suc = function(data){
			o.moreDate(data.result.appId,data.result.timeStamp,data.result.nonceStr,data.result.signature);
		}
		doPost('/consumption/createShareSign',data,suc);
	},
	moreDate:function(app,time,nonc,sign){
		console.log(app,time,nonc,sign)
		 wx.config({
			    appId: app, // 必填，公众号的唯一标识
			    timestamp: time, // 必填，生成签名的时间戳
			    nonceStr: nonc, // 必填，生成签名的随机串
			    signature: sign,// 必填，签名，见附录1
			    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function(){
				   wx.onMenuShareTimeline({
				    title: '伴飞共享卡上线了!', // 分享标题
				    link: 'http://www.banfeikeji.com/html/shopMend.html?openId='+getParameter('openId'), 
				    imgUrl: 'http://md-pay-image.oss-cn-hangzhou.aliyuncs.com/logo.jpg', // 分享图标
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
				wx.onMenuShareAppMessage({
				    title: '伴飞共享卡上线了', // 分享标题
				    desc: '一起分享，一起打折。', // 分享描述
				    link: 'http://www.banfeikeji.com/html/shopMend.html?openId='+getParameter('openId'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl: 'http://md-pay-image.oss-cn-hangzhou.aliyuncs.com/logo.jpg', // 分享图标
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
			});
	}
}
o.init();