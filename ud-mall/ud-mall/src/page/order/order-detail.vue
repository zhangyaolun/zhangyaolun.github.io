<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="main-view" >
      <div class="address-info-view">
        <img class="ad-img" src="../../images/address-icon.png"/>
        <div class="address-info">
          <div class="user-info">
            <span class="user-name">收件人：{{name}}</span>
            <span class="user-phone">{{moblie}}</span>
          </div>
          <span class="user-address">收货地址：{{mainList.userDeliveryDetail | filter}}</span>
        </div>
      </div>
      <div class="order-item">
        <router-link :to="{path:'/order-detail',query:{orderId:0}}" class="order-item-top">
          <span class="shop-title">{{type}}</span>
          <span class="order-status"></span>
        </router-link>
        <div class="order-product-list">
          <div class="order-product-item" v-for="items in mainList.itemList"  @click.stop="gotoSkip({path: '/product-detail',query:{proId:items.id}})">
            <img class="product-img" :src="getImgPath(items.productImage)"/>
            <div class="product-tips">
              <span class="product-title">{{items.productName}}</span>
            </div>

            <div class="product-info">
              <span class="price">￥{{items.salePrice}}</span>
              <span class="oprice">￥{{items.sourcePrice}}</span>
              <span class="count">x{{items.productNum}}</span>
            </div>
          </div>
          <div class="pay-view" v-if="payShow">
            <section class="pay">
              <span>付款</span>
            </section>
          </div>
          <div class="product-price-view">
            <div>
              <span class="tips">商品价格</span>
              <span class="value">￥{{this.mainList.productPrice | currency}}</span>
            </div>
            <div class="mt02">
              <span class="tips">运费（快递）</span>
              <span class="value">￥0.00</span>
            </div>
            <div class="mt02">
              <span class="price-total-tips">订单总价</span>
              <span class="price-total-value">￥{{this.mainList.productPrice | currency}}</span>
            </div>
            <div class="mt02">
              <span class="tips">福利卡</span>
              <span class="value">- ￥0.00</span>
            </div>
          </div>
          <div class="price-view">
            <span class="price-total-tips">实付款</span>
            <span class="price-total-value">￥{{this.mainList.payPrice | currency}}</span>
        </div>
        </div>
      </div>
      <div class="order-number-view">
        <span>订单编号：{{this.mainList.orderNo}}</span>
        <span>支付宝交易单号：212321312321321321</span>
        <span>创建时间：{{createTime}}</span>
        <span>付款时间：</span>
      </div>
      <div class="contact-kf-view">
        <div>
          <img src="../../images/kf-icon.png"/>
          <span>联系客服</span>
        </div>
      </div>
    </div>
   </div>
  </template>

<script>
  import headerTop from 'src/components/header/inside-head'
  import {getImgPath} from 'src/components/common/mixin'
  import {findOrderId,searchUserDeliveryAddress,findByCode} from 'src/service/getData'

  export default {
    data(){
      return {
        headTitle: "订单详情",
        orderList:'',
        name:'',
        moblie:'',
        type:'',//商品 京东 校派
        address:'',
        mainList:'',
        payShow:false,
        createTime:''
      }
    },
    created(){
      this.getOrderId(this.$route.query.orderId)

    },
    mounted(){
      //this.cheight.height=document.body.clientHeight-this.$refs.tabref.offsetHeight*2+'px';

    },
    filters:{
      filter(value){
          if(value) return value.split('|').join('')
      },
      currency:function (value) {
        return parseFloat(value).toFixed(2);
      }
    },
    components: {
      headerTop,
    },

    computed: {},
    mixins: [getImgPath],
    methods: {
      getOrderId(id){
        findOrderId(id).then(res => {
          if(res){
            this.mainList=res.result;
            this.orderList=res.result.itemList;
            this.address=this.mainList.userDeliveryDetail
            if(this.mainList.status == 1) this.payShow = true;
            this.getShopMap(this.mainList.userDeliveryId)
            this.createTime = new Date(this.mainList.createTime).Format("yyyy-MM-dd hh:mm:ss");
          }
        });
      },
      getShopMap(id){
        searchUserDeliveryAddress().then(res => {
          if(res){
            res.result.forEach((v,k)=>{
                if(v.id == id){
                  this.name = v.name;
                  this.moblie = v.moblie;
                }
            })
          }
        });
      },
      gotoSkip(path){
        this.$router.push(path);
      }

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
    .address-info-view{
      width: 100%;
      height: 3.35rem;
      background: #ffffff;
      .ad-img{
        margin-left: .5rem;
        width: .9rem;
        height: auto;
        vertical-align: middle;
      }
      .address-info{
        vertical-align: middle;
        margin-left: .5rem;
        display: inline-block;
        width: 89.55%;
        height:3.35rem;
        span{
          display: inline-block;
          font-size: .65rem;
          color: #4c4c4c;
        }
        .user-name{
          margin-top: .3rem;
          width: 50%;
        }
        .user-phone{
          width: 50%;
          text-align: right;
          padding-right: .5rem;
        }
        .user-address{
          margin-top: .3rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .order-item-top{
      margin-top: .5rem;
      display: block;
      height:1.75rem;
      width: 100%;
      background:#ffffff;
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
    .pay-view{
      width: 100%;
      height:2rem;
      text-align:right;
      .pay{
        margin-top: .4rem;
        margin-right: .5rem;
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
    .product-price-view {
      background: #ffffff;
      width: 100%;

      padding: .5rem;

  .price-total {

  }

  .tips {
    font-size: .5rem;
    color: #b3b3b3;
  }

  .value {
    float: right;
    font-size: .5rem;
    color: #b3b3b3;
  }

  .price-total-tips {
    font-size: .6rem;
    color: #4c4c4c;
  }

  .price-total-value {
    float: right;
    font-size: .6rem;
    color: #4c4c4c;
  }

  .mt02 {
    margin-top: .2rem;
  }

  }
  .price-view{
    border-top:1px solid #e5e5e5;
    width: 100%;
    height: 2rem;
    background: #ffffff;
    padding:.5rem;
  .price-total-tips {
    font-size: .6rem;
    color: #4c4c4c;
  }
  .price-total-value {
    float: right;
    font-size: .6rem;
    color: #f60025;
  }
  }
  }
    .order-number-view{
      width:100%;
      background: #ffffff;
      margin-top: .375rem;
      padding-left:.5rem;
      padding-top:.2rem;
      padding-bottom:.85rem;
      span{
        margin-top: .1rem;
        display: block;
        font-size: .5rem;
        color: #b3b3b3;
      }
    }
    .contact-kf-view{
      border-top:1px solid #e5e5e5;
      width: 100%;
      background: #ffffff;
      height: 1.65rem;
      text-align:center;
      img{
        vertical-align: middle;
        height: 1.05rem;
        width: auto;
      }
      span{
        margin-left: .2rem;
        vertical-align: middle;
        display: inline-block;
        line-height: 1.65rem;
        font-size: .65rem;
        color: #4c4c4c;
      }
    }
  }



</style>
