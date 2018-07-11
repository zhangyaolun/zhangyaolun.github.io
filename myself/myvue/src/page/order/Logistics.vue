<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="main-view">
      <div class="logi-top-view">
        <img class="product-img" src="../../images/logi-icon.png"/>
        <div class="logi-info">
          <div><span class="title">物流状态</span><span class="status">运输中</span></div>
          <span class="subtitle">承运来运：京东快递</span>
          <span class="subtitle">运单编号：12345678</span>
          <span class="subtitle">官方电话：12345678</span>
        </div>
      </div>
      <div class="logi-detail-view">
        <div class="logi-detail-list">
          <div class="logi-item" v-for="(title,index) in logiInfo">
            <div class="logi-line">
              <img class="logi-icon" :src="index==0?currentLogi:oldLogi">
            <div class="logi-detail">
              <span :class="{'heightlight':index==0}">{{title}}</span>
              <span :class="[{'heightlight':index==0},'mt02']">2017-06-17 11:11:11</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  </template>

<script>
  import headerTop from 'src/components/header/inside-head'
  import currentLogi from  '../../images/current-icon.png'
  import oldLogi from  '../../images/old-icon.png'
  export default {
    data(){
      return {
        headTitle: "查看物流",
        logiInfo:["已签收","已送出","已揽件"],
        currentLogi:currentLogi,
        oldLogi:oldLogi,
      }
    },
    created(){

    },
    mounted(){
      //this.cheight.height=document.body.clientHeight-this.$refs.tabref.offsetHeight*2+'px';
    },

    components: {
      headerTop,
      currentLogi
    },

    computed: {},

    methods: {

    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .main-view {
    position: relative;
    top: 2rem;
    width: 100%;
    height: 100%;
    font-size: 0;
    .logi-top-view{
      width: 100%;
      height:4.35rem;
      background: #ffffff;
      border-bottom: 1px solid #e5e5e5;
      .product-img{
        margin-left: .5rem;
        margin-top: .5rem;
        width: 2.75rem;
        height:auto;
      }
      .logi-info{
        display: inline-block;
        margin-left: .5rem;
        margin-top: .5rem;
        .title{
          font-size: .6rem;
          color: #4c4c4c;
        }
        .status{
          font-size: .6rem;
          color: #00a248;
          margin-left: .5rem;
        }
        .subtitle{
          display: block;
          font-size: .5rem;
          color: #999999;
        }
      }
    }
    .logi-detail-view{
      clear: both;
      margin-top: .5rem;
      width: 100%;
      background:#ffffff;
      min-height:10rem;
      .logi-detail-list{
        padding-left:.5rem;
        padding-right:.5rem;
        .logi-item{
          .logi-line{
            border-left: .07rem solid #e5e5e5;
            height:100%;
            margin-left: 1rem;
          }
          .logi-detail{
            margin-left: 1.5rem;
            width: 90%;
            display: inline-block;
            padding-top: .3rem;
            padding-bottom: .3rem;
            border-bottom:1px solid #e5e5e5;
            span{
              display: block;
              font-size: .6rem;
              color: #999999;
            }
            .heightlight{
              color:#00a248;
            }
            .mt02{
              margin-top: .2rem;
            }
          }

        }
        .logi-icon{
          width: .7rem;
          height: auto;
          position: absolute;
          margin-left: -.35rem;
          margin-top: .35rem;
        }

      }
    }
  }



</style>
