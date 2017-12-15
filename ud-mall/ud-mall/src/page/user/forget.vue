<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="register-two">
      <div class="regTwo-top">
        <img v-bind:src="codeImg" alt="">
        <div>我们已发送了<em>验证码</em>到你的手机</div>
      </div>
      <div class="code">
        <span>验证码</span>
        <input type="number" placeholder="请输入短信验证码" class="inputNum" ref="input1" v-model="vcode" oninput="if(value.length>6)value=value.slice(0,6)">
        <em class="code-number" @click="phoneClick">{{codeNumber}}</em>
      </div>
      <div class="code">
        <span>密码</span>
        <input type="password" placeholder="请输入6-16位密码" class="inputPass" v-model="pwd" ref="input2" maxlength="16">
      </div>
      <section @click="gotoSkip()" class="algin-one">完成</section>
      <success-tips :successText="successText" v-if="showTips==true" :type="1" v-on:closeTip="closeTip">
      </success-tips>
    </div>

  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import code from '../../images/code-img.png'
  import successTips from 'src/components/common/success-tips'
  import {phoneMessage,passwordMessage,regsiterUserStep2,forgetPwdAchieveVCodes,forgetPwdStep2} from 'src/service/getData'

  export default {

    data(){
      return{
        headTitle: "",
        codeImg:code,
        codeNumber:60,
        phoneFalg:false,
        phoneNumber:'',
        successText:'发送成功',
        showTips:false,
        vcode:'',
        pwd:'',
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      this.phoneNumber = this.$route.query.phoneNumber;
      if(this.headTitle=='找回密码'){
        forgetPwdAchieveVCodes().then(res => {
        })
      }else{
        phoneMessage().then(res => {
        })
      }
      this.countDown();
    },
    mounted(){

    },

    filters:{

    },

    components:{
      headerTop,
      successTips
    },

    computed:{

    },

    methods:{
      gotoSkip(path){
        let message = this.$refs.input1.value,
          pass = this.$refs.input2.value;
        if(message == ''){
          this.successText='请输入短信验证码';
          this.showTips=true;
          return ;
        }
        if(pass == ''){
          this.successText='请输入6-16位密码';
          this.showTips=true;
          return ;
        }
        if(pass.length<6||pass.length>16){
          this.successText='请输入6-16位登录密码';
          this.showTips=true;
          return ;
        }
        if(this.headTitle == '快速注册'){
          regsiterUserStep2(this.vcode,this.pwd).then(res => {
            this.$router.push({path: '/home'})
          })
        }else{
          forgetPwdStep2(this.vcode,this.pwd).then(res => {
            if(res){
              this.$router.push({path: '/home'})
            }

          })
        }
        /*this.$router.push(path);*/
      },
      countDown (){

          let wait = 60,vm = this;
          function count() {
            if (wait == 0) {
              vm.codeNumber="重新发送";
              vm.phoneFalg = true;
              wait = 60;
            } else {
              vm.codeNumber= wait-- + 'S';
              setTimeout(function() {
                count();
              }, 1e3);
            }
          }count();

      },
      phoneClick(){
          if(!this.phoneFalg)return ;

        if(this.headTitle=='找回密码'){
            forgetPwdAchieveVCodes().then(res => {
          })
        }else{
            phoneMessage().then(res => {
          })
        }
        this.countDown();
      },
      closeTip(){
        this.showTips=false;
      }

    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  @import '../shop/conment';
  .register-two{
    padding-top:2rem;
    .regTwo-top{
      text-align: center;
      img{
        width: 2.25rem;
        height: 2.25rem;
        margin:1.75rem 0 .7rem 0;
      }
      div{
        font-size: .8rem;
        color: #808080;
        margin-bottom:1rem;
        em{
          color: #fe2772;
        }
      }
    }
    .code{
      margin-left:5%;
      height:2rem;
      line-height:2rem;
      border:1px solid #e5e5e5;
      background: #fff;
      margin-top:.5rem;
      padding-left: .5rem;
      font-size: .8rem;
      color: #4c4c4c;
      span{
        display: inline-block;
        width:3.2rem;
      }
      input{
        outline: none;
        color: #b2b2b2;
        font-size: .8rem;
        box-sizing: border-box;
        width:9rem;
        height:1.8rem;
        line-height:1.8rem;
      }
      ::-webkit-input-placeholder {
        color: #b2b2b2;
      }
      :-moz-placeholder {
        color: #b2b2b2;
      }
      ::-moz-placeholder {
        color: #b2b2b2;
      }
      :-ms-input-placeholder {
        color: #b2b2b2;
      }
      .code-number{
        display: inline-block;
        width:4.48rem;
        height:.9rem;
        text-align: center;
        line-height:1rem;
        border-left:1px solid #4c4c4c;
      }
      .inputPass{
        width:13.5rem;
      }
    }
    .algin-one{
      width:90%;
      margin:.5rem 0 0 5%;
    }
  }

</style>
