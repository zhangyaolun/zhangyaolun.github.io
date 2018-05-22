<template>
    <header id='head_top'>
          <section id="back" @click="$router.go(-1)">
            <img src="../../images/back.png">
          </section>
          <span class="title" v-if="headTitle">{{headTitle}}</span>
          <section id="home" @click="gotoHome()">
            <img src="../../images/home.png">
          </section>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{
            }
        },
        mounted(){

        },
        props: ['headTitle'],
        computed: {

        },
        methods: {
          gotoHome(){
            this.$router.push('/home');
          }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #head_top{
        background-image: url('../../images/header-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 2rem;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 2rem);
        font-size:0;
    }
    #back,#home{
      position: relative;
      height:100%;
      margin-left:2%;
      float:left;
      img{
        display:block;
        @include wh(auto, 100%);
      }
    }
    #home{
      float:right;
      margin-right:2%;
    }
    .title{
      position: absolute;
      width: 50%;
      left: 50%;
      margin-left: -25%;
      display:inline-block;
      height:2rem;
      line-height:2rem;
      vertical-align:middle;
      text-align:center;
      font-size:.8rem;
      color:#ffffff;
    }

</style>
