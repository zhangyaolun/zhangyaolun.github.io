new Vue({el:"#app",data:{MapCh_falg:!0,MapCh_fa:!1,MapNew_falg:!0,MapNew_fa:!1,dialogWrapper:!1,submitColor:!1,containerList:[],orderAllPayment:0,oDatas:{activityId:null,addressId:null,invoice:null,buyerRemark:null,couponId:null,count:0,fictitiousType:null,orderType:"Ordinary",linkId:null,preview:!1,subType:"Carog"},oDatasAddress:{receiverName:"",telephone:"",province:"",city:"",area:"",address:"",id:""},submitDate:{receiverName:"",telephone:"",aliasName:"",province:"",city:"",area:"",address:"",defaults:!1},product:[],page:1,count:10,couponPriceTrue:0,orderintegral:0,couponPriceTrueFalg:!1},computed:{mapAddress:function(){var e=this;if(""!=e.submitDate.province)return e.submitDate.province+" "+e.submitDate.city+" "+e.submitDate.area}},watch:{submitDate:{handler:function(e,r){""!=e.receiverName&&""!=e.telephone&&""!=e.province&&""!=e.city&&""!=e.area&&""!=e.address?this.submitColor=!0:this.submitColor=!1},deep:!0}},filters:{currency:function(e){return e?(parseInt(e)/100).toFixed(2)+"元":"0.00"},currencys:function(e){return e?(parseInt(e)/100).toFixed(2)+"元":"0.00"},oPriceCurrency:function(e){return e?(parseInt(e)/100).toFixed(2)+"元":"0.00"},oTimeCurrency:function(e){return commentJs.dataFormat(e)}},mounted:function(){FastClick.attach(document.body),commentJs.homeHader("确认订单"),commentJs.toastLoading("购物车数据读取中...");var e=this;e.oDatas.subType=commentJs.getUrlKey("subType")||null,e.oDatas.fictitiousType=commentJs.getUrlKey("fictitiousType")||null,e.oDatas.orderType=commentJs.getUrlKey("orderType")||"Ordinary",1==sessionStorage.getItem("orderNum")&&e.oDatas.subType&&("SKU"!=e.oDatas.subType&&"GroupBuy"!=e.oDatas.orderType||(e.oDatas.linkId=commentJs.getUrlKey("linkId")||null,e.oDatas.count=commentJs.getUrlKey("count")||1),e.oDatas.subType=commentJs.getUrlKey("subType")||null,e.oDatas.orderType=commentJs.getUrlKey("orderType")||"Ordinary",e.oDatas.subType&&setTimeout(function(){e.oDefaultAddress()},10))},methods:{oDefaultAddress:function(){var t=this;o.useDefaultAddress(function(e){if(e.result){var r=e.result;t.oAddressShow(r)}else t.oUseBuyerAddress();t.preLoading=!1})},oUseBuyerAddress:function(){var t=this;t.preLoading=!0;o.useBuyerAddress(t.page,t.count,function(e){var r=e.result.list;e.result.list&&0<e.result.list.length?t.oAddressShow(r[0]):(t.dialogWrapper=!0,commentJs.simpleDialogWrapper("请添加地址",function(){t.dialogWrapper=!1,t.MapNew()},function(){window.history.back()}));t.preLoading=!1})},oUseAddAddress:function(){var r=this;o.useAddAddress(r.submitDate,function(e){r.oAddressShow(e.result),r.MapCh_falg=!0,r.MapNew_falg=!0})},oListData:function(){var a=this;o.shopSubOrder(a.oDatas,function(e){var r=e.result.order,t=e.result.childOrders;e.result.parentOrder;null!=r?(a.containerList[0]={sellerName:r.seller.shopName,orderList:[],freightPrice:r.freightPrice,orderPayment:r.orderPayment,sellerId:r.sellerId,sellerBuyerRemark:""},a.orderAllPayment=r.orderPayment,r.orderProduct.forEach(function(e,r){a.containerList[0].orderList.push(e)})):(a.orderAllPayment=0,t.forEach(function(e,t){a.containerList[t]={sellerName:e.seller.shopName,orderList:[],freightPrice:e.freightPrice,orderPayment:e.orderPayment,sellerId:e.sellerId,sellerBuyerRemark:""},a.orderAllPayment+=e.orderPayment,e.orderProduct.forEach(function(e,r){a.containerList[t].orderList.push(e)})})),a.couponPriceTrue=a.orderAllPayment.toFixed(0),a.couponPriceTrueFalg=!0,a.preLoading=!1})},MapChoice:function(){var t=this;o.useBuyerAddress(t.page,t.count,function(e){1==t.page&&(t.product=[]),e.result.list.forEach(function(e,r){t.product.push(e)}),t.MapCh_falg=!1,t.MapCh_fa=!0})},oDatasAddressClick:function(e){var r=this;r.oAddressShow(r.product[e]),r.MapCh_falg=!0},MapBack:function(){this.MapCh_falg=!0},MapNew:function(){var r=this;r.MapNew_falg=!1,r.MapNew_fa=!0,$("#sex").select({title:"选择标签",autoClose:!0,items:["无","家","学校","公司"],onClose:function(e){"无"==e.data.values?r.submitDate.aliasName="":r.submitDate.aliasName=e.data.values}})},MapNewBack:function(){var e=this;""==e.oDatasAddress.receiverName?e.dialogWrapper=!0:e.MapNew_falg=!0},MapCityClick:function(){var r=this;console.log("090"),commentJs.areaSelected({success:function(e){area_info=e.area_info,r.submitDate.province=e.area_id_1,r.submitDate.city=e.area_id_2,r.submitDate.area=e.area_id_3,$("#varea_info").val(e.area_info)}})},oAddressShow:function(e){var r=this;r.oDatasAddress.receiverName=e.receiverName,r.oDatasAddress.telephone=e.telephone,r.oDatasAddress.province=e.province,r.oDatasAddress.city=e.city,r.oDatasAddress.area=e.area,r.oDatasAddress.address=e.address,r.oDatasAddress.id=e.id,r.oDatas.addressId=e.id,1==sessionStorage.getItem("orderNum")?setTimeout(function(){r.oListData()},10):r.preLoading=!1},default_click:function(){this.submitDate.defaults=!this.submitDate.defaults},submit_click:function(){var r=this;if(r.submitColor){var e=r.submitDate.telephone;if(!commentJs.checkPhone(e)&&!commentJs.checkFixedPhone(e))return void commentJs.toastTitle("手机号输入有误","forbidden");o.useBuyerAddress(1,10,function(e){0==e.result.list.length&&(r.submitDate.defaults=!0),r.oUseAddAddress()})}},payOrderClick:function(){var a=this;if(!a.preLoading&&(a.preLoading=!0,a.oDatas.preview=!0,a.couponPriceTrueFalg)){if(1<a.containerList.length)a.oDatas.buyerRemark={},a.containerList.forEach(function(e,r){""!=e.sellerBuyerRemark&&(a.oDatas.buyerRemark[e.sellerId]=e.sellerBuyerRemark)}),"{}"==JSON.stringify(a.oDatas.buyerRemark)&&(a.oDatas.buyerRemark=null);else if(""==a.containerList[0].sellerBuyerRemark)a.oDatas.buyerRemark=null;else{a.oDatas.buyerRemark={};var e=a.containerList[0].sellerId;a.oDatas.buyerRemark[e]=a.containerList[0].sellerBuyerRemark}o.shopSubOrder(a.oDatas,function(e){var r=e.result.order,t=e.result.parentOrder;commentJs.shopcarAll(),null!=r?a.payM(r.orderNumber,1):a.payM(t.orderNumber,2)})}},payM:function(t){var a=this;o.wxpayorderNumber(t,function(e){var r=e.result;WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:r.appId,timeStamp:r.timeStamp,nonceStr:r.nonceStr,package:r.package,signType:"MD5",paySign:r.paySign},function(e){a.preLoading=!1,"get_brand_wcpay_request:ok"==e.err_msg?(sessionStorage.setItem("orderNum",2),window.location.href="payOrder.html?orderNumber="+t+"&fictitiousType=1"):"get_brand_wcpay_request:cancel"==e.err_msg?"Carog"==a.oDatas.subType&&(sessionStorage.setItem("orderNum",2),window.location.href="../order/order_list.html?title=4"):(sessionStorage.setItem("orderNum",2),window.location.href="payOrder.html?orderNumber="+t+"&fictitiousType=0")})})}}});