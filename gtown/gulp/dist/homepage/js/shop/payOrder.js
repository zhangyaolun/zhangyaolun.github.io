new Vue({el:"#app",data:{preLoading:!0,title:"支付成功!",sucimg:"../../images/chenggong@2x.png",orderNumber:null,fictitiousType:null},computed:{},mounted:function(){FastClick.attach(document.body),commentJs.homeHader("支付"),commentJs.toastLoading("数据读取中...");var e=this;e.orderNumber=commentJs.getUrlKey("orderNumber")||null,e.fictitiousType=commentJs.getUrlKey("fictitiousType")||null,e.orderNumber&&(1==e.fictitiousType?(e.title="支付成功!",e.sucimg="../../images/chenggong@2x.png"):(e.title="支付失败!",e.sucimg="../../images/shibai.png"),setTimeout(function(){e.preLoading=!1},800))},filters:{currency:function(e){return(parseFloat(e)/100).toFixed(2)+"元"}},methods:{submit_able:function(){window.location.href="../home/home.html"},parClick:function(e){window.location.href="../order/order_list.html?title=4"}}});