<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="register">
      <div  class="phone"><input type="number" placeholder="请输入手机号" ref="input1" oninput="if(value.length>11)value=value.slice(0,11)"></div>
      <div class="service" v-if="isregister">
        <span :class="[ isservice? 'selected' : 'checked']" @click="clickregister"></span>
        <span>同意<em>《xxxxx服务条款》</em></span>
      </div>
      <div class="forget" v-if="isforget">
        <input type="text" placeholder="请输入验证码" ref="input2">
        <div class="forget-code"><img v-bind:src="codeImg" alt="" @click="imgClick"></div>
      </div>
      <section @click="gotoSkip()" class="algin-one">下一步</section>
      <success-tips :successText="successText" v-if="showTips==true" :type="0" v-on:closeTip="closeTip">
      </success-tips>
    </div>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import successTips from 'src/components/common/success-tips'
  import icono1 from '../../images/icono1.png';
  import icono2 from '../../images/icono2.png';
  import icono3 from '../../images/icono3.png';
  import icono4 from '../../images/icono4.png';
  import code from '../../images/code.png';
  import {regsiterUserStep1,forgetPwdStep1} from 'src/service/getData';
  export default {

    data(){
      return{
        headTitle: "",
        isregister:true,
        isforget:false,
        isservice:false,
        codeImg:'/api/verify-code/110/40',
        successText:'',
        showTips:false

      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      if(this.headTitle == '快速注册'){
          this.isregister = true;
          this.isforget = false;
      }else{
        this.isregister = false;
        this.isforget = true;
      }
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
      clickregister(){
          this.isservice = !this.isservice;
      },
      gotoSkip(path){
        let phone = this.$refs.input1.value;
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
        if(this.headTitle == '快速注册'){
          if(!this.isservice){
            this.successText='是否同意服务条款';
            this.showTips=true;
            return ;
          }
          regsiterUserStep1(phone).then(res => {
            if(res){
              path = {path: '/forget', query: {title: '快速注册', phoneNumber: phone}}
              this.$router.push(path)
            }
          });
        }else{
          let code = this.$refs.input2.value;
          if(code == ''){
            this.successText='请输入验证码';
            this.showTips=true;
            return ;
          }
          forgetPwdStep1(phone,code).then(res => {
            if(res){
              path= {path: '/forget',query: {title:'找回密码',phoneNumber:phone}}
              this.$router.push(path)
            }
          });
        }
      },
      closeTip(){
        this.showTips=false;
      },
      imgClick(){
        this.codeImg = '/api/verify-code/110/40?rand='+Math.random();
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  @import '../shop/conment';

  .checked{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url("../../images/Unchecked.png") no-repeat ;
    background-size:1rem 1rem;
    vertical-align: bottom;
  }
  .selected{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url("../../images/sever.png") no-repeat ;
    background-size:1rem 1rem;
    vertical-align: bottom;
  }
  .register{
    padding-top: 2rem;
    margin-left:5%;
    input{
      width:100%;
      height:1.9rem;
      outline: none;
      color: #ccc;
      padding-left: .5rem;
      font-size: .75rem;
    }
    ::-webkit-input-placeholder {
      color: #ccc;
    }
    :-moz-placeholder {
      color: #ccc;
    }
    ::-moz-placeholder {
      color: #ccc;
    }
    :-ms-input-placeholder {
      color: #ccc;
    }
    .phone{
      width:95%;
      height:2rem;
      margin-top: 1.25rem;
      border:1px solid #e5e5e5;
    }
    .forget{
      width:95%;
      height:2rem;
      margin:.5rem 0;
      position: relative;
      border:1px solid #e5e5e5;
      .forget-code{
        position: absolute;
        right:0;
        top:0;
        width:23%;
        height:1rem;
        margin:.4rem .5rem 0 0;
        border-left: 1px solid #e5e5e5;
        img{
          position: absolute;
          right:-.1rem;
          top:-.14rem;
          width:3.4rem;
          height:1.4rem;
          margin-left:.5rem;
        }
      }
    }
    .service{
      width:95%;
      height:2rem;
      font-size:.75rem;
      margin-top:.7rem;
      span{
        color: #999;
      }
      em{
        color: #fe2772;
      }
    }
   /* .algin-one{
      display: block;
      width:95%;
      height:2rem;
      line-height:2rem;
      text-align: center;
      background: #eee;
      font-size: .8rem;
      color: #999;
    }*/
  }

</style>
