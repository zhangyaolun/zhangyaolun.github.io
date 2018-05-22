<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="myWallet">
      <div class="myWallet-main" v-for="(main,i) in mainList">
        <div class="myWallet-top clear" :class="[main.isTwo?'isTwo':'isOne']">
          <div class="myWallet-name left">{{main.myWalletName}}</div>
          <div class="myWallet-mon right">{{main.myWalletMon | codeFilters}}</div>
        </div>
        <div class="myWallet-bot clear">
          <div class="recharge left" v-for="(bot,j) in main.botList">
            <img v-bind:src="bot.myWalletImg" alt="">
            <span @click="botTitle(i,j)">{{bot.botTitle}}</span>
          </div>
        </div>
      </div>
     <div class="myWallet-cont clear" v-for="cont in contList">
       <div class="cont-left left">{{cont.contTitle}}</div>
       <img v-bind:src="cont.contImg" alt="" class="right">
     </div>
    </div>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import zhankai from '../../images/zhankai2.png'
  import recharge from '../../images/recharge.png'
  import recharge2 from '../../images/recharge2.png'
  import recharge3 from '../../images/recharge3.png'
  import recharge4 from '../../images/recharge4.png'

  export default {

    data(){
      return{
        headTitle: "",
        contList:[
          {
            contTitle:'设置支付密码',
            contImg:zhankai
          },
          {
            contTitle:'找回支付密码',
            contImg:zhankai
          }
        ],
        mainList:[
          {
            myWalletName:'账户余额',
            myWalletMon:12356.12,
            isTwo:false,
            botList:[
              {
                myWalletImg:recharge,
                botTitle:'充值'
              },
              {
                myWalletImg:recharge2,
                botTitle:'提现'
              }
            ]
          },
          {
            myWalletName:'福利卡余额',
            myWalletMon:12356.12,
            isTwo:true,
            botList:[
              {
                myWalletImg:recharge3,
                botTitle:'绑定福利卡'
              },
              {
                myWalletImg:recharge4,
                botTitle:'申请额度'
              }
            ]
          }
        ]
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
    },
    mounted(){

    },

    filters:{
      codeFilters:function (value) {
        return '￥'+parseFloat(value).toFixed(2);
      }
    },

    components:{
      headerTop
    },

    computed:{

    },

    methods:{
      botTitle(one,two){
          console.log(one+'|'+two)
        if(two == '1'){
          let path= {path: '/welfare',query: {title:'福利卡信息',welfarenum:'1'}}
          this.$router.push(path)
        }
        if(two == '0'){
          let path= {path: '/welfare',query: {title:'福利卡绑定',welfarenum:'0'}}
          this.$router.push(path)
        }
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .myWallet{
    padding-top:2rem;
    .myWallet-main{
      .myWallet-top{
        width:100%;
        height:5.5rem;
        background: #fe2772;
        padding:.7rem;
        .myWallet-name{
          width:100%;
          height:2rem;
          color: #fff;
          font-size: .75rem;
          font-weight: 600;
        }
        .myWallet-mon{
          color: #fff;
        }
      }
      .myWallet-bot{
        width:100%;
        height:2rem;
        margin-bottom: .5rem;
        background: url("../../images/recharge-bg.png") no-repeat;
        background-size: 100% 2rem;
        .recharge{
          width:50%;
          height:2rem;
          line-height: 2rem;
          font-size: .75rem;
          color: #4c4c4c;
          text-align: center;
          img{
            width:1.3rem;
            height:1rem;
            vertical-align: top;
            margin-top:.5rem;
          }
        }
       }
      .isOne{
        border-top:1px solid #ff87a9;
      }
      .isTwo{
        background: #e89d36;
      }
    }
    .myWallet-cont{
      width:100%;
      height:2rem;
      line-height:2rem;
      font-size: .75rem;
      color: #4c4c4c;
      background: #fff;
      padding: 0 .5rem;
      border-bottom: 1px solid #e5e5e5;
      img{
        width:.6rem;
        height:1rem;
        vertical-align: top;
        margin-top:.5rem;
      }
    }
  }

</style>
