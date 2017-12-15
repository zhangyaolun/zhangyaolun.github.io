<template>
  <div>
    <div class="login">
      <img @click="gotoHome()" src="../../images/logo.png" alt="" class="logo">
      <div class="login-style clear">
        <img src="../../images/account.png" alt="" class="left">
        <input type="number" placeholder="请输入手机号" class="left" ref="input1" oninput="if(value.length>11)value=value.slice(0,11)">
      </div>
      <div class="login-style clear">
        <img src="../../images/password.png" alt="" class="left">
        <input type="password" placeholder="请输入密码" class="left" ref="input2">
      </div>
      <div class="login-Land" v-on:click="loginLand">登录</div>
      <div class="login-bot clear">
        <router-link :to="{path: '/register',query: {title:'快速注册'}}" class="register left bot">快速注册</router-link>
        <router-link :to="{path: '/register',query: {title:'找回密码'}}" class="forget right bot">忘记密码</router-link>
      </div>
      <success-tips :successText="successText" v-if="showTips==true" :type="0" v-on:closeTip="closeTip">
      </success-tips>
    </div>
  </div>
</template>
<script>
  import {login} from 'src/service/getData'
  import { Indicator } from 'mint-ui'
  import successTips from 'src/components/common/success-tips'
  import {setStore,getStore} from '../../config/mUtils'
  import {mapState, mapMutations} from 'vuex'

  export default {

    data(){
      return{
        successText:'设置成功',
        showTips:false,
      }
    },
    created(){

    },
    mounted(){

    },

    components:{
      successTips
    },

    computed:{

    },

    methods:{
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      loginLand(){
        let phone = this.$refs.input1.value,
            pass = this.$refs.input2.value;
        if(phone == ''){
          this.successText='请输入手机号';
          this.showTips=true;
          return ;
        }
        if(! /^1[3|4|5|7|8]\d{9}$/.test(phone)){
            this.successText='手机格式不正确';
            this.showTips=true;
            return ;
        }
        if(pass == ''){
          this.successText='请输入密码';
          this.showTips=true;
          return ;
        }
        if(pass.length<6||pass.length>16){
          this.successText='请输入6-16位登录密码';
          this.showTips=true;
          return ;
        }
        /*Indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
        })*/
        login(phone,pass).then(res => {
          console.log(res);
          if(res){
            Indicator.close();
            setStore('login-phone',JSON.stringify(res.result))
            let path;
            console.log(getStore('path'))
            if(getStore('path') != '/login'){
              path = {path: getStore('path')}
            }else{
              path = {path: '/userCenter'}
            }
            this.$router.push(path);
          }
        })


      },
      closeTip(){
        this.showTips=false;
      },
      gotoHome(){
        this.$router.push({path:"/home"})
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .login{
    width:100%;
    height:33.35rem;
    background: url("../../images/bg.png") no-repeat;
    text-align: center;
    .logo{
      width:4rem;
      height:3rem;
      margin:3.75rem 0 2rem 0;
    }
    .login-style{
      width:14rem;
      font-size:.8rem;
      color: #f8b2c5;
      margin-left:2.5rem;
      border-bottom: 1px solid #f8b2c5;
      padding:.8rem 0 .3rem 0;
      img{
        width:1rem;
        height:1rem;
        margin-right:.5rem;
        margin-top:.3rem;
      }
      input{
        outline: none;
        width:12.5rem;
        height:1.5rem;
        color: #f8b4ca;
        background: rgba(0,0,0,0);
      }
      ::-webkit-input-placeholder {
        color: #f8b4ca;
      }
      :-moz-placeholder {
        color: #f8b4ca;
      }
      ::-moz-placeholder {
        color: #f8b4ca;
      }
      :-ms-input-placeholder {
        color: #f8b4ca;
      }
    }
    .login-Land{
      width:14rem;
      height:2rem;
      line-height:1.9rem;
      margin:1.45rem 0 .75rem 0;
      box-sizing: border-box;
      margin-left:2.5rem;
      background: #ff6b9a;
      font-size: .9rem;
      color: #f8b4ca;
      border:1px solid #f8b4ca;
    }
    .login-bot{
      font-size: .7rem;
      margin:0 2.5rem;
      .bot{
        color: #f8b4ca;
      }
    }
  }



</style>
