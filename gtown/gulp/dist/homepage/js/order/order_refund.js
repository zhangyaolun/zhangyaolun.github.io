new Vue({el:"#app",data:{headertitle:"退款申请",oData:{},listtitle:[{name:"我不想买了",select:!0},{name:"信息填写错误，重新拍",select:!1},{name:"买多了/买错了",select:!1},{name:"其他原因",select:!1}],datas:{userId:"",orderId:"",productId:"",refundType:1,sellerId:"",applyRewardRmb:0,applyRefundRmb:0,count:1,refundReason:"我不想买了",skuId:"",payType:""},rate:0,productStatus:"",active:!1},filters:{currency:function(t){return t?(parseInt(t)/100).toFixed(2)+"元":"0.00"},createTime:function(t){return t?t.split(" ")[0]:""}},mounted:function(){var t=this;FastClick.attach(document.body),commentJs.toastLoading("加载中...");var e=sessionStorage.getItem("refund")||"";t.datas.userId=commentJs.getUrlKey("uid"),commentJs.kefuLogo("kefu_logo"),!e&&t.datas.userId||(t.oData=JSON.parse(e),console.log(t.oData),1==t.oData.refundType?commentJs.homeHader("退款申请"):commentJs.homeHader("退货申请"),t.datas.count=t.oData.count,t.datas.orderId=t.oData.orderId,t.datas.productId=t.oData.productId,t.datas.skuId=t.oData.skuId,t.datas.refundType=t.oData.refundType,t.datas.sellerId=t.oData.sellerId,t.datas.payType=t.oData.payType,t.productStatus=t.oData.productStatus,t.datas.applyRefundRmb=t.oData.rate,"Refund"==t.productStatus||"Reject"==t.productStatus?t.active=!0:t.active=!1)},methods:{oReduceClick:function(a){var o=this;o.listtitle.forEach(function(t,e){t.select=!1,o.datas.refundReason=""}),o.listtitle.forEach(function(t,e){a==e&&(t.select=!0,o.datas.refundReason=t.name)})},submintClick:function(){var e=this;if(!e.active){var t=JSON.parse(JSON.stringify(e.datas));o.refundApply(t,function(t){1==e.oData.refundType?e.oData.productStatus="Refund":e.oData.productStatus="Reject",sessionStorage.removeItem("refund"),sessionStorage.setItem("refund",JSON.stringify(e.oData)),commentJs.toastTitle("提交成功",""),setTimeout(function(){window.location.href="order_refund_list.html"},1500)})}}}});