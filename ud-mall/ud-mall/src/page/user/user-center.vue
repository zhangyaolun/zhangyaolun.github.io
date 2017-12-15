<template>
  <div>
    <div class="main-view">
      <div class="top-view">
        <router-link :to="{path:'/personal',query: {title:'个人信息'}}" class="user-icon">
          <img class="bg-img" :src="getImgPath(userImg,oUserImg)"/>
        </router-link>
        <div class="user-name" >
            <span class="tx" v-if="islogin==true">{{loginName}}</span>
            <router-link :to="{path: '/login'}" class="tx" v-if="islogin==false">登录/注册</router-link>
        </div>
        <div class="user-info">
          <router-link :to="{path:'/user-collection'}"  class="info-item">
            <!--<span class="topSpan">{{userInfoSubTitle[0]}}</span>-->
            <span>{{userInfoTitle[0]}}</span>
          </router-link>
          <div class="line"></div>
          <section class="info-item" @click="myWalletClick()">
            <!--<span class="topSpan">{{userInfoSubTitle[1]}}</span>-->
            <span>{{userInfoTitle[1]}}</span>
          </section>
          <div class="line"></div>
          <section  @click="myWalletClick()" class="info-item">
            <!--<span class="topSpan">{{userInfoSubTitle[2]}}</span>-->
            <span>{{userInfoTitle[2]}}</span>
          </section>
        </div>
      </div>
      <div class="order-view">
        <router-link :to="{path:'/my-order',query:{orderType:0}}"  class="order-top">
          <span class="order-span-1">全部订单</span>
          <span class="order-span-2">查看全部订单 ></span>
        </router-link >
        <div class="order-item-list">
          <router-link :to="{path:'/my-order',query:{orderType:index+1}}" v-for="(title,index) in orderItemTitle" class="order-item">
              <img :src="orderItemImg[index]"/>
              <span>{{title}}</span>
          </router-link>
        </div>
      </div>
    </div>

    <footer-view :checkedNum="checkedNum">
    </footer-view>
  </div>
</template>
<script>
  import footerView from '../../components/footer/footGuide'
  import orderImg1 from '../../images/order-item-icon-1.png'
  import orderImg2 from '../../images/order-item-icon-2.png'
  import orderImg3 from '../../images/order-item-icon-3.png'
  import orderImg4 from '../../images/order-item-icon-4.png'
  import userImg from  '../../images/comment-default-icon.png'
  import {getImgPath} from 'src/components/common/mixin'
  import {getStore} from '../../config/mUtils'


  export default {
    data(){
      return {
        checkedNum:3,
        islogin:false,
        userInfoTitle:['我的收藏','我的福利券','账户余额'],
        userInfoSubTitle:['','',''],
        orderItemTitle:['待付款','待发货','待收货','待评价'],
        orderItemImg:[orderImg1,orderImg2,orderImg3,orderImg4],
        loginName:'',
        userImg:'',
        oUserImg:userImg
      }
    },
    created(){
      let data = JSON.parse(getStore('login-phone'));
      console.log(data)
      if(data){
        this.islogin = true;
        this.loginName = data.name || data.mobile
        this.userImg = data.userImage;
      }
    },
    mounted(){

    },
    mixins: [getImgPath],

    components: {
      footerView
    },

    computed: {},

    methods: {
      myWalletClick(){
        //{path: '/welfare',query: {title:'福利卡信息',welfarenum:'1'}}未绑定福利卡跳转
        let path= {path:'/myWallet',query: {title:'我的钱包'}}
        this.$router.push(path)
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

  .main-view{

    height:100%;
    width: 100%;
  }
  .top-view{
    width: 100%;
    height:9.25rem;
    background-image: url('../../images/user-top-bg.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    .user-icon{
      width:3.4rem;
      height:3.4rem;
      position: absolute;
      margin-left: -1.7rem;
      margin-top:0.75rem;
      left: 50%;
      .bg-img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name{
      position: absolute;
      width:50%;
      margin-left:25%;
      margin-top:4.65rem;
      height: 1.5rem;
      text-align: center;
      .tx{
        font-size: .75rem;
        color:#ffffff;
      }
    }
    .user-info{
      width: 100%;
      height: 2.6rem;
      display: inline-block;
      margin-top: 6.65rem;
      position: relative;
      border-top:1px solid #ff8998;
      font-size:0;
      .info-item{
        text-align: center;
        display: inline-block;
        width: 33.1%;
        height:2.6rem;
        line-height: 2.6rem;
        vertical-align:middle;
        span{
          height: 1rem;
          font-size: 0.75rem;
          display: block;
          color:#ffffff;
        }
        .topSpan{
          margin-top: .3rem;
          font-weight:bold;
        }
      }
      .line{
        width: .35%;
        height: 1.2rem;
        background: #ff8998;
        display: inline-block;
        vertical-align:middle;
      }

    }
  }
  .order-view{
    background-color: #fff;
  }
  .order-top{
    display: block;
    width:100%;
    height:1.75rem;
    border-bottom: 1px solid #f7f7f7;
    .order-span-1{
      font-size:.65rem;
      display: inline-block;
      line-height: 1.75rem;
      margin-left: 2.6%;
      color: #4c4c4c;
    }
    .order-span-2{
      font-size:.6rem;
      display: inline-block;
      line-height: 1.75rem;
      float: right;
      color: #b2b2b2;
      margin-right: 2.6%;
    }
  }
  .order-item-list{
    display: flex;
  }
  .order-item{
    width:25%;
    text-align: center;
    color:#000;
    img{
      margin: .8rem auto auto auto;
      width: 1.25rem;
      height: auto;
      display: block;
    }
    span{
      display: block;
      font-size:.65rem;
      margin-top: .3rem;
      margin-bottom: .65rem;
    }
  }

</style>
