<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="shoppar-main">
      <div class="shoppar-top">
        <div class="shoptop-num">订单编号:<span>{{shopparNum}}</span></div>
        <div class="shoptop-mon">订单金额:<span>{{placesubMoney | currency}}</span></div>
      </div>
      <div class="shoppar-center" v-for="(item,j) in shopparList">
        <div class="center-top">{{item.centerName}}</div>
        <div class="center-name clear" v-for="(items,i) in item.centerList">
          <img v-bind:src="items.centerImg" alt="">
          <em>{{items.centerName}}</em>
          <span :class="{ desable: items.isdesable,selected:items.isselected,checked:items.ischecked}" class="right" @click="changChecke(items,i,j)"></span>
        </div>
      </div>
      <div class="place-submit clear">
        <div class="placesub-left left">
          <span>实付款:</span>
          <em>{{placesubMoney | currency}}</em>
        </div>
        <section class="placesub-right right" @click="shopSuccessClick" :to="{path: '/shopSuccess',query: {title:'支付成功'}}">去支付</section>
      </div>
      <!--<scetion @click="gotoSkip({path: '/shopSuccess',query: {title:'支付成功'}})"></scetion>-->
    </div>
    <success-tips :successText="successText" v-if="showTips==true" :type="0" v-on:closeTip="closeTip">
    </success-tips>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import successTips from 'src/components/common/success-tips'
  import icono1 from '../../images/icono1.png';
  import icono2 from '../../images/icono2.png';
  import icono3 from '../../images/icono3.png';
  import icono4 from '../../images/icono4.png';

  export default {

    data(){
      return{
        headTitle: "",
        placesubMoney:'',
        shopparNum:'',
        typeShop:'',
        successText:'请选择支付方式',
        showTips:false,
        shopparList:[
          {
            centerName:'选择折扣方式',
            centerList:[
              {
                  centerImg:icono4,
                  centerName:'福利卡支付',
                  isdesable:false,
                  isselected:false,
                  ischecked:true
              },
              {
                centerImg:icono3,
                centerName:'余额支付',
                isdesable:false,
                isselected:false,
                ischecked:true
              }
            ]
          },
          {
            centerName:'选择支付方式',
            centerList:[
              {
                centerImg:icono2,
                centerName:'微信支付',
                isdesable:false,
                isselected:false,
                ischecked:true
              },
              {
                centerImg:icono1,
                centerName:'支付宝支付',
                isdesable:false,
                isselected:false,
                ischecked:true
              }
            ]
          }
        ]
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      this.shopparNum = this.$route.query.orderNo;
      this.placesubMoney = this.$route.query.payPrice;
    },


    mounted(){

    },

    filters:{
      mapFilter:function (value) {
        return value.substring(0,3)+'****'+value.substring(7,value.length);
      },
      currency:function (value) {
        return '￥'+parseFloat(value).toFixed(2);
      },
      freightCurrency:function (value) {
        return value+'元';
      }
    },

    components:{
      headerTop,
      successTips
    },

    computed:{

    },

    methods:{
      changChecke(items,i,j){
        let vm = this;
        vm.shopparList.forEach((v,k)=>{
          v.centerList.forEach((m,n)=>{
            m.isselected = false
          })
        })
        items.isselected = true;
        if(j == 0){
          i == 0?vm.typeShop=0:vm.typeShop=1;
        }else{
          i == 0?vm.typeShop=2:vm.typeShop=3;
        }
      },
      shopSuccessClick(){
      let arr = ['福利卡支付','余额支付','微信支付','支付宝支付'],
          path = '';
      if(this.typeShop===''){
        this.showTips=true;
        return ;
      }

        path = {path: '/shopSuccess',query: {title:'支付成功',orderId:this.$route.query.orderId,userDeliveryId:this.$route.query.userDeliveryId,userDeliveryDetail:this.$route.query.userDeliveryDetail}}

       /*this.$router.push(path);*/
      },
      closeTip(){
        this.showTips=false;
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  @import 'conment.css';
  em{font-style: normal;}
  .shoppar-main{
    padding-top:2rem;
    font-size: .65rem;
    color: #4c4c4c;
    .shoppar-top{
      background: #fff;
      height:3rem;
      padding:0 .5rem;
      line-height:1.5rem;
     span{
        margin-left:.3rem;
      }
      .shoptop-mon span{
          color: #f23030;
      }
    }

    .desable{
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url("../../images/shopdesable.png") no-repeat ;
      background-size:1rem 1rem;
      vertical-align: middle;
    }
    .shoppar-center{
      margin-top: .5rem;
      background: #fff;
      .center-top{
        height:1.5rem;
        line-height: 1.5rem;
        color: #808080;
        padding-left: .5rem;
      }
      .center-name{
        height: 2.1rem;
        line-height:2rem;
        padding-left: .5rem;
        border-bottom:1px solid #eff1f4;
        img{
          width:1.2rem;
          height:1.2rem;
          vertical-align: middle;
        }
        span{
          margin: .5rem .5rem 0 0;
        }
      }
    }
  }

  .place-submit{
    position: absolute;
    bottom:0.05rem;
    left:0;
    width:100%;
    height:2rem;
    line-height:2rem;
    box-sizing: border-box;
    background: #fff;
    border-top:1px solid #eff1f4;
    .placesub-left{
      color: #333;
      font-size: .7rem;
      margin-left:6rem;
      em{
        color: #df463a;
      }
    }
    .placesub-right{
      width:5rem;
      height:2rem;
      font-size: .8rem;
      text-align: center;
      background: #f23030;
      color: #fff;
    }
  }

</style>
