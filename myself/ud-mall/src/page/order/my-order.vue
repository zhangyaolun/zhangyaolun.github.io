<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="main-view">
      <div class="top-tab"  ref="tabref">
        <section @click="changeTab(index)" v-for="(title,index) in tabTitleList" class="tab-item">
          <span :class="{'active':selectedIndex==index}">{{title}}</span>
        </section>
      </div>

      <div :class="[{'bggray':hasOrder==true},'order-view']" v-bind:style="cheight">
        <div v-for="(order,index) in orderList" class="order-list" v-if="hasOrder==true"  v-load-more="loadMoreData">
          <div class="order-item">
            <router-link :to="{path:'/order-detail',query:{orderId:order.id}}" class="order-item-top">
              <span class="shop-title">订单：{{order.orderNo}}</span>
              <span class="order-status">{{getOrderStatus(order.status)}}</span>
            </router-link>
            <div class="order-product-list">
              <div class="order-product-item" v-for="(product,index) in order.itemList">
                <img class="product-img" :src="getImgPath(product.productImage,defaultOrderImg)"/>
                <div class="product-tips">
                  <span class="product-title">{{product.productName}}</span>
                  <span class="product-category">{{product.productDesc}}</span>
                </div>

                <div class="product-info">
                  <span class="price">￥{{product.salePrice}}</span>
                  <span class="oprice">￥{{product.sourcePrice}}</span>
                  <span class="count">x{{product.productNum}}</span>
                </div>
              </div>
            </div>
            <div class="order-detail-info">
              <span>共{{order.itemList.length}}件商品 合计：￥{{order.productPrice}}（含运费￥{{order.freightPrice}}）</span>
            </div>
            <div class="order-operating"  v-if="order.status!=2">
              <section @click="deleteOrder(0,order.id)" class="normal" v-if="order.status==1">
                <span>取消订单</span>
              </section>
              <section @click="deleteOrder(-1,order.id)" class="normal" v-if="order.status==9||order.status==8">
                <span>删除订单</span>
              </section>
              <section class="pay" v-if="order.status==1">
                <span>付款</span>
              </section>
              <router-link :to="{path:'/logistics',query:{orderId:0}}" class="normal" v-if="order.status==5||order.status==8">
                <span>查看物流</span>
              </router-link >
              <router-link :to="{path:'/add-comment',query:{orderId:order.id,proId:setIdList(order.itemList),proImgs:setImageList(order.itemList),proName:setNameList(order.itemList)}}" class="pay" v-if="order.status==8">
                <span>评价</span>
              </router-link>
              <section class="pay" v-if="order.status==5">
                <span>确认收货</span>
              </section>
            </div>
          </div>
          <div class="line-view">
          </div>
        </div>
        <div class="order-empty" v-if="hasOrder==false">
          <img src="../../images/order-empty-icon.png"/>
          <span>您还没有相关订单</span>
        </div>
      </div>
    </div>
    <alert-tips :alertText="alertText" v-on:confrimTip="confrim" v-on:cancelTip="cancel" v-if="alertShow==true">
    </alert-tips>
   </div>
  </template>

<script>
  import headerTop from 'src/components/header/inside-head'
  import alertTips from 'src/components/common/alert-tips'
  import {findOrderList,changeOrderStatus} from 'src/service/getData'
  import {getImgPath,loadMore} from 'src/components/common/mixin'
  import defaultOrderImg from '../../images/order-default.png'
  export default {
    data(){
      return {
        headTitle: "我的订单",
        tabTitleList:['全部','待付款','待发货','待收货','待评价'],
        tabStatusList:['待支付','待发货','待收货','待评价','完成'],
        selectedIndex:0,
        alertText:"",
        alertShow:false,
        cheight:{
          height:'auto'
        },
        hasOrder:true,
        orderStatus:1,
        checkedOrder:[0],
        orderList:[],
        currentPage:1,
        proTotalPage:0,
        currentOrderTabStatus:0,
        isloading:false,
        alertStatus:0,
        delOrderId:'',
        defaultOrderImg:defaultOrderImg,
      }
    },
    created(){
      this.selectedIndex=this.$route.query.orderType;
      if(this.selectedIndex==0||this.selectedIndex==1||this.selectedIndex==2){
        this.currentOrderTabStatus=this.selectedIndex;
      }else if(this.selectedIndex==3){
        this.currentOrderTabStatus=5;
      }else if(this.selectedIndex==4){
        this.currentOrderTabStatus=8;
      }
    },
    mounted(){
      this.cheight.height=document.body.clientHeight-this.$refs.tabref.offsetHeight*2+'px';

      this.getOrderList(this.currentPage,'',this.currentOrderTabStatus);
    },
    mixins: [loadMore,getImgPath],
    components: {
      headerTop,
      alertTips
    },

    computed: {},

    methods: {
      changeTab(index){
        this.selectedIndex=index;
        if(index==0||index==1||index==2){
          this.currentOrderTabStatus=index;
        }else if(index==3){
          this.currentOrderTabStatus=5;
        }else if(index==4){
          this.currentOrderTabStatus=8;
        }
        this.orderList=[];
        this.getOrderList(this.currentPage,'',this.currentOrderTabStatus);
      },
      deleteOrder(status,orderId){
        this.alertStatus=status;
        this.delOrderId=orderId;
        if(status==-1){
          this.alertText="确认删除订单？";
        }else if(status==0){
          this.alertText="确认取消订单？";
        }
        this.alertShow=true;
      }
      ,
      confrim(){
        this.delOrder(this.delOrderId,this.alertStatus);

      }
      ,
      cancel(){
        this.alertShow=false;
      },
      getOrderStatus(status){
        if(status==1){
          return '待支付';
        }else if(status==2){
          return '待发货';
        }else if(status==5){
          return '待收货';
        }else if(status==8){
          return '待评价';
        }else if(status==9){
          return '完成';
        }
      },
      getOrderList(page,orderNo,status){
        findOrderList(page,orderNo, status).then(res => {
          if(res){
            this.currentPage=res.result.currentPage;
            this.proTotalPage=res.result.totalPage;
            this.orderList = this.orderList.concat(res.result.reslutList);
          }
        });
      },
      delOrder(id,status){
        changeOrderStatus(id,status).then(res => {
          if(res){
            this.alertShow=false;
            this.getOrderList(this.currentPage,'',this.currentOrderTabStatus);
          }
        });
      },
      async loadMoreData(){
        if(this.isloading||this.currentPage>=this.proTotalPage){
          return;
        }
        this.isloading=true;
        this.currentPage=this.currentPage+1;
        this.getOrderList(this.currentPage,'',this.currentOrderTabStatus);
      },
      setImageList(obj){
        let images=[];
        for(var i=0;i<obj.length;i++){
          images.push(obj[i].productImage);
        }
        return images;
      },
      setIdList(obj){
        let ids=[];
        for(var i=0;i<obj.length;i++){
          ids.push(obj[i].productId);
        }
        console.log(ids)
        return ids;
      },
      setNameList(obj){
        let names=[];
        for(var i=0;i<obj.length;i++){
          names.push(obj[i].productName);
        }
        return names;
      },
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .main-view{
    position: relative;
    top:2rem;
    width:100%;
    height:100%;
    font-size:0;
  }
  .order-view{
    width: 100%;
    height:100%;
    background-color: #ffffff;
  }
  .bggray{
    background: #f4f4f4;
  }
  .top-tab{
    height:2rem;
    width:100%;
    border-bottom:.025rem solid #e5e5e5;
    background-color:#ffffff;
    .tab-item{
      display: inline-block;
      width:20%;
      height:2rem;
      text-align: center;
      span{
        display: inline-block;
        width: auto;
        height: 2rem;
        line-height: 2rem;
        font-size: .65rem;
      }
      .active{
        color:#ea4473;
        border-bottom: .075rem solid #ea4473;
      }
    }
  }
  .order-list{
    background: #ffffff;
  }
  .order-item-top{
    display: block;
    height:1.75rem;
    width: 100%;
    .radio-unchecked{
      margin-left: .5rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url("../../images/Unchecked.png") no-repeat ;
      background-size:1rem 1rem;
      vertical-align: middle;
    }
    .shop-title{
      display: inline-block;
      vertical-align: middle;
      margin-left: .5rem;
      font-size: .6rem;
      line-height: 1.75rem;
      color: #4c4c4c;
    }
    .order-status{
      font-size: .6rem;
      line-height: 1.75rem;
      float: right;
      color: #ea4f0d;
      margin-right: .5rem;
    }
  }
  .order-product-list{
    background-color:#f7f7f7;
    .order-product-item{
      width:100%;
      height:3.95rem;
      .product-img{
        margin-top: .3rem;
        margin-left: .5rem;
        width: 3.45rem;
        vertical-align: top;
        height:auto;
      }
      .product-tips{
        width:55%;
        display: inline-block;
      }
      .product-title{
        margin-top: .3rem;
        margin-left: .5rem;
        display: inline-block;
        vertical-align: top;
        width:100%;
        font-size: .6rem;
        color: #4c4c4c;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .product-category{
        display: block;
        margin-top: .3rem;
        margin-left: .5rem;
        font-size: .55rem;
        color: #999999;
      }
      .product-info{
        display: inline-block;
        float: right;
        height:3.95rem;
        text-align: right;
        width:20%;
        .price{
          display:block;
          margin-top: .3rem;
          margin-right: .3rem;
          font-size:.55rem;
          color:#4c4c4c;
        }
        .oprice{
          display:block;
          margin-right: .3rem;
          font-size:.65rem;
          color:#979797;
          text-decoration:line-through ;
        }
        .count{
          display:block;
          margin-right: .3rem;
          font-size:.65rem;
          color:#979797;
        }
      }
    }
  }
  .order-detail-info{
    width: 100%;
    height:1.75rem;
    text-align: right;
    border-bottom:1px solid #e5e5e5;
    span{
      line-height: 1.75rem;
      font-size: 0.55rem;
      color: #4c4c4c;
    }
  }
  .order-operating{
    width: 100%;
    height:1.75rem;
    text-align: right;
    .normal{
      margin-top: .275rem;
      margin-right: .5rem;
      display: inline-block;
      border:1px solid #e5e5e5;
      width: 18%;
      height: 1.2rem;
      border-radius: 2rem;
      text-align:center;
      span{
        display: block;
        font-size: .6rem;
        color: #4c4c4c;
        line-height: 1.2rem;
        height: 1.2rem;
      }
    }
    .pay{
      margin-right: .5rem;
      margin-top: .275rem;
      display: inline-block;
      border:1px solid #ea4f0d;
      width: 18%;
      height: 1.2rem;
      border-radius: 2rem;
      text-align:center;
      span{
        display: block;
        font-size: .6rem;
        color: #ea4f0d;
        height: 1.2rem;
        line-height: 1.2rem;
      }
    }
  }
  .line-view{
    height:.375rem;
    width:100%;
    background: #f4f4f4;
  }
  .order-empty{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width:100%;
    margin:6.35rem auto auto auto;
    span{
      display: block;
      font-size: 0.75rem;
      color: #999999;
    }
  }


</style>
