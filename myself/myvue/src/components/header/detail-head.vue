<template>
    <header id='head_top' ref="head">
          <section id="back" @click="$router.go(-1)">
            <img src="../../images/back.png">
          </section>
          <div class="top-tab">
            <section @click="changeTopIndex(index)"  v-for="(title, index) in list" :class=" [{'active':ind === index},{'ml20':0!= index},'tab-sec']">
            {{title}}
          </section>
          </div>
          <section id="home" @click="gotoHome()">
            <img src="../../images/home.png">
          </section>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Bus from '../../config/eventbus.min.js';

    export default {
    	data(){
            return{
              list: ['商品', '详情', '评价'],
              ind: 0
            }
        },
        created(){
          Bus.addEventListener("changeTopFunction",this.changeTab);
        },
        mounted(){
          this.$emit('increment',this.$refs.head.getBoundingClientRect().height);
        },
        computed: {
        },

        methods: {
          gotoHome(){
            this.$router.push('/home');
          },
          changeTopIndex(index){
            this.ind=index;
            Bus.dispatch("changePageFunction",index,false);
          },
          changeTab(obj){
            this.ind=obj.target;
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
    .top-tab{
      height:100%;
      position: absolute;
      width: 40%;
      left: 50%;
      margin-left: -20.5%;
      text-align:center;
      .tab-sec{
        width:20%;
        display:inline-block;
        line-height:1.2rem;
        text-align:center;
        margin:.4rem auto auto auto;
        @include sc(0.6rem, #ffffff);
      }
      .ml20{
        margin-left:10%;
      }
      .active{
        border-bottom:2px solid #ffffff;
      }
    }
</style>
