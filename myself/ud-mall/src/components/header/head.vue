
<template>
    <header id='head_top' ref="head">
    <div class="search">
        <div class="search-view" type="text">
          <img class="search-icon" src="../../images/search.png"/>
          <input class="search-input" type="search" placeholder="请输入您要搜索的商品"  @click="inputCilck()"/>
        </div>
    </div>
         <img class="kefu-icon" src="../../images/kefu.png"/>

    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{
            }
        },
        created(){

        },
        mounted(){
          this.$emit('increment',this.$refs.head.getBoundingClientRect().height);
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
          inputCilck(){
            let path = {path: '/inputSeach'}
            this.$router.push(path);
          },

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
    .search{
      display:inline-block;
      vertical-align:middle;
      width:80%;
      height:100%;
      margin-left:5%;
      overflow:hidden;
      text-align:center;
    }
    .search-view{
      position: relative;
      background-color: #d53f69;
      vertical-align:middle;
      width:100%;
      height:60%;
      border-radius:4px;
     top:20%;
      text-align:center;
      .search-icon{
          display:inline-block;
          vertical-align:middle;
          height:50%;
          width:auto;
      }
      .search-input{
        margin-left:2%;
        display:inline-block;
        vertical-align:middle;
        background: transparent;
        color:#ffffff;
        width:60%;
        height:100%;
        font-size:0.6rem;
      }
    }
    .kefu-view{
      display:inline-block;
      vertical-align:middle;
      float:right;
      height:100%;
      text-align:center;
    }
    .kefu-icon{
      display:inline-block;
      vertical-align:middle;
      margin:auto auto auto 5%;
      height:50%;
      width:auto;
      clear:both;
    }
</style>
