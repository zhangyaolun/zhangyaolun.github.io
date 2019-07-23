var commonScript = {
	/*ajax*/
   doPost:function(url, data, callback) {
     var $ = window.jquery || layui.jquery;
    $.ajax({
      url: url,
      data:JSON.stringify(data),
      type: 'POST',
      contentType: "application/json",
      async: false,
      success: succFun
    });

    function succFun(datas) {
      if (datas.httpCode == 999) {

      }
      if (datas.httpCode >= 500) {
        window.location.href = '404.html';
        if (datas.httpCode == 503) {
          alert('系统忙，请稍后再试...')
        }
      }

      if (datas.httpCode == 400) {
        // callerror(datas);
      }
      if (datas.httpCode == 200) {
        callback(datas);
      }
      if (datas.httpCode == 201) {
        // setLoginState(false)
      }
    }
  },
   doGet:function(url, data, callback) {
       var $ = window.jquery || layui.jquery;
    $.ajax({
    url: url,
    data: data,
    type: 'GET',
    dataType: 'json',
    async: false,
    success: succFun
    });

  function succFun(datas) {
    if (datas.httpCode == 999) {

    }
    if (datas.httpCode >= 500) {
      window.location.href = '404.html';
      if (datas.httpCode == 503) {
        alert('系统忙，请稍后再试...')
      }
    }

    if (datas.httpCode == 400) {
      // callerror(datas);
    }
    if (datas.httpCode == 200) {
      callback(datas);
    }
    if (datas.httpCode == 201) {
      // setLoginState(false)
    }
  }
},

	/*app显示,进入页面显示结构*/
	appShowhide: function (obj) {
        var $ = window.jquery || layui.jquery;
		$('#' + obj).removeClass('hide');
		$('#pageLoading').hide();
	},
  /*获取url字段*/
  getParameter:function(param) {
  var query = decodeURI(window.location.search); //获取URL地址中？后的所有字符
  if(query == '') {
    return ''
  } else {
    var iLen = param.length; //获取你的参数名称长度
    var iStart = query.indexOf(param); //获取你该参数名称的其实索引
    if(iStart == -1) //-1为没有该参数
      return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart); //获取第二个参数的其实索引
    if(iEnd == -1) //只有一个参数
      return query.substring(iStart); //获取单个参数的参数值
    return query.substring(iStart, iEnd); //获取第二个参数的值
  }

},

  // 中国标准时间转换为日期格式
  changedate:function(time, format) {
  if (time == "" || time == null) {
    return ""
  }
  var t = new Date(time);
  var tf = function (i) { return (i < 10 ? '0' : '') + i };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }

  })
},
// 中国标准时间转换为日期格式结束

//   时间放入选择器
  slicedate:function(data) {
  if (data == "" || data == null) {
    return ""
  }
  var time = [];
  var yyyy = data.slice(0, 4);
  var MM = String(parseInt(data.slice(4, 6)) - 1);
  var dd = data.slice(6, 8);
  var hh = data.slice(8, 10);
  var mm = data.slice(10, 12);
  var ss = data.slice(12, 14);
  time.push(yyyy, MM, dd, hh, mm, ss);
  return time;
},

  // 深度拷贝
  deepCopy:function(p, c) {
    var c = c || [];
    if (p != null) {
      for (var i in p) {
        if (p.hasOwnProperty(i)) {
          if (typeof p[i] === 'object') {
            c[i] = (Object.prototype.toString.call(p[i]) === Object) ? {} : [];
            this.deepCopy(p[i], c[i]);
          } else {
            c[i] = p[i];
          }
        }
      }
    }
    return c;
  },

  selected: function (item,lists) {
    var _this = this;
    if (lists && lists.length > 0) {
      lists.forEach(function (_, i) {
        if (item.id !== _.id) {
          if (_.active) {
            _.active = false
          }
        }
      });
    }
  },

// 分类树结构数据获取
  classifyData:function () {
    var res = function (data) {
      doGet('/productInfo/queryCategoryInfo', '', res);
    };
  },

  // 设置
  // 基础设置
  getSettingBase:function(res){
    this.doGet('/settingsInfo/querySettingsBaseInfo', '', res);
  },
  // 获取地区
  getArea:function(res){
    this.doGet('/settingsInfo/queryZoneInfo', '', res);
  },
  // 查询敏感词
  getSensitiveWord:function(index,count,res){
    this.doGet('/settingsInfo/querySensitiveWordInfo/'+index+'/'+count, '', res);


  },
  // api设置
  getSettingApi:function(res){
    this.doGet('/settingsInfo/querySettingsApiInfo', '', res);
  },

  // 获取快递公司
  getExpress:function(index,count,res){
    this.doGet('/settingsInfo/queryExpressInfo/'+index+'/'+count, '', res);
  },
  // 页面导航设置
  getNavigation:function(index,count,res){
    this.doGet('/settingsInfo/queryNavigationInfo/'+index+'/'+count, '', res);
  },
// 查询管理员信息
  getAdmin:function(res){
    this.doGet('/settingsInfo/queryAdministratorInfo', '', res);
  },
  // 获取权限组管理
  getPower:function(index,count,res){
    this.doGet('/settingsInfo/queryPurviewGroupInfo/'+index+'/'+count, '', res);
  },
// 获取操作日志信息
  getLogInfo:function (pagenum,pagecount,name,startTime,endTime,data,res) {
  this.doGet('/settingsInfo/queryOperationLogInfo/'+pagenum+'/'+pagecount+'/'+name+'/'+startTime+'/'+endTime, '', res);
  },
  // 获取分站管理
  getSubtation:function(res){
    this.doGet('/settingsInfo/querySubstationInfo', '', res);

  },


  // 设置结束
  // 商品
  // 查询商品列表
   getProduct:function (pagenum,pagecount,commodityName,shopName,brandsId,status,approvalType,categoryLev,start,end,data,res) {
     this.doGet('/productInfo/queryProductPageInfo/'+pagenum+'/'+pagecount+'/'+commodityName+'/'+shopName+'/'+brandsId+'/'+status+'/'+approvalType+'/'+categoryLev+'/'+start+'/'+end, data,res);
   },
  getProductSet:function(res){
    this.doGet('/productInfo/queryProductSettingsInfo','',res)
  },
//查询分类
  getClassigfy:function (res) {
    this.doGet('/productInfo/queryCategoryInfo', '', res);
  },
  //查询品牌
  getBrand:function (pagenum,pagecount,name,categoryId,examineState,data,res) {
  this.doGet('/productInfo/queryBrandInfo/'+pagenum+'/'+pagecount+'/'+name+'/'+categoryId+'/'+examineState, data,res);
},
  // 查询类型
  getType:function (pagenum,pagecount,res) {
     this.doGet('/productInfo/queryTypeInfo/'+pagenum+'/'+pagecount, '', res);
  },
  // 查询规格
  getSpec:function (res) {
     this.doGet('/productInfo/querySpecificationInfo', '', res);
  },
  // // 查询推荐
  // getRcommand:function (res) {
  //   this.doGet('/productInfo/queryCategoryInfo', '', res);
  // },
// 商品结束

  // 会员
  // 查询会员信息
getMember:function (pagenum,pagecount,memberId,name,start,end,data,res) {
  this.doGet('/memberInfo/queryMemberInfoInfo/'+pagenum+'/'+pagecount+'/'+memberId+'/'+name+'/'+start+'/'+end, data, res);
},

  // 会员结束
// 店铺
//   查询店铺设置
  getSetShop:function(res){
    this.doGet('/shopInfo/queryShopSettingsInfo','',res)
  },
//   查询店铺管理
  getShopManger:function(pagenum,pagecount,shopkeeperUsername,shopName,shopType,current,data,res){
    this.doGet('/shopInfo/queryShopShopManagementInfoInfo/'+pagenum+'/'+pagecount+'/'+shopkeeperUsername +'/'+shopName +'/'+shopType +'/'+current , data, res);
  },
  // 查询经营类目
  getShopCategoryApplyInfo:function(pagenum,pagecount,shopkeeperUsername,shopName,openState,data,res){
    this.doGet('/shopInfo/queryShopCategoryApplyInfo/'+pagenum+'/'+pagecount+'/'+shopkeeperUsername +'/'+shopName  +'/'+openState , data, res);
  },
  // 查询自营店铺信息
getShopSelf:function(pagenum,pagecount,shopkeeperUsername,shopName,data,res){
  this.doGet('/shopInfo/queryShopSelfsupportShopInfo/'+pagenum+'/'+pagecount+'/'+shopkeeperUsername +'/'+shopName, data, res);
},

//   店铺结束

  // 交易
  // 查询订单信息
getOrderInfo:function (pagenum,pagecount,isVirtualOrder,orderState,orderNumber,buyerUsername,telephone,shopName,payorderNumber,start,end,data,res) {
  this.doGet('/transactionInfo/queryTransactionOrdersInfo/'+pagenum+'/'+pagecount+'/'+isVirtualOrder+'/'+orderState+'/'+orderNumber+'/'+buyerUsername+'/'+telephone+'/'+shopName+'/'+payorderNumber+'/'+start+'/'+end, data, res);
},
  // 查询退货退款信息
  getOrderReturn:function (pagenum,pagecount,isDealOver,refundType,commodityName,start,end,data,res) {
    this.doGet('/transactionInfo/queryTransactionRefundInfo/'+pagenum+'/'+pagecount+'/'+isDealOver+'/'+refundType+'/'+commodityName+'/'+start+'/'+end, data, res);
  },
  // 查询奖励金明细
  getReward:function (pagenum,pagecount,userName,orderNumber,data,res) {
    this.doGet('/transactionInfo/queryTransactionRewardDetailInfo/'+pagenum+'/'+pagecount+'/'+userName+'/'+orderNumber, data, res);
  },
  // 交易结束
  
  // 促销
  // 查询促销设置
getPromotionSetting:function (res) {
    this.doGet('/promotionInfo/queryPromotionSettingsInfo','',res)
},
  // 查询平台优惠券
getPlatformCoupon:function (pagenum,pagecount,couponType,couponState,couponName,data,res) {
    this.doGet('/promotionInfo/queryPromotionPlatformCouponInfo/'+pagenum+'/'+pagecount+'/'+couponType+'/'+couponState+'/'+couponName, data, res)
  
},
  // 查询店铺代金券
  getShopVoucher:function (pagenum,pagecount,voucherState,voucherName,shopName,data,res) {
    this.doGet('/promotionInfo/queryPromotionShopVoucherInfo/'+pagenum+'/'+pagecount+'/'+voucherState+'/'+voucherName+'/'+shopName, data, res)
  },
  // 查询礼品列表
getPromotionGift:function (pagenum,pagecount,couponType,data,res) {
this.doGet('/promotionInfo/queryPromotionGiftInfo/'+pagenum+'/'+pagecount+'/'+couponType,data,res)
},
  // 查询兑换列表
  getExchangeGift:function (pagenum,pagecount,exchangeNumber,memberName,data,res) {
    this.doGet('/promotionInfo/queryPromotionExchangeInfo/'+pagenum+'/'+pagecount+'/'+exchangeNumber+'/'+memberName,data,res)
  },
  // 查询秒杀活动
getKillActivity:function (pagenum,pagecount,activityState,activityName,data,res) {
  this.doGet('/promotionInfo/queryPromotionSecondKillingActivityInfo/'+pagenum+'/'+pagecount+'/'+activityState+'/'+activityName,data,res)
},
// 查询拼团管理
getPromotionGroup:function (pagenum,pagecount,grouppatchingState,activityCommodityCode,activityCommodityName,start,end,data,res) {
  this.doGet('/promotionInfo/queryPromotionGrouppatchingInfo/'+pagenum+'/'+pagecount+'/'+grouppatchingState+'/'+activityCommodityCode+'/'+activityCommodityName+'/'+start+'/'+end,data,res)
},

  // 促销结束
  
  
  // 查询快报
getNews:function (pagenum,pagecount,newsCategory,data,res) {
  this.doGet('/mobileInfo/queryMobileFastnewsInfo/'+pagenum+'/'+pagecount+'/'+newsCategory,data,res)
},
// 查询商品销售管理
  getProductSales:function (pagenum,pagecount,commodityName,shopName,brandsId,status,approvalType,categoryLev,start,end,data,res) {
    this.doGet('/reportInfo/queryProductSalesDetailInfo/'+pagenum+'/'+pagecount+'/'+commodityName+'/'+shopName+'/'+brandsId+'/'+status+'/'+approvalType+'/'+categoryLev+'/'+start+'/'+end, data,res);
  },
};



