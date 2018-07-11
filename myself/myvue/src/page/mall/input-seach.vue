
<template>

  <div>

    <header id='head_top' ref="head">
      <section id="back" @click="$router.go(-1)">
        <img src="../../images/back.png">
      </section>
      <div class="search">
        <div class="search-view" type="text">
          <img class="search-icon" src="../../images/search.png"/>
          <input class="search-input"  type="search" placeholder="请输入您要搜索的商品" @keyup="show($event)" v-model="message" autofocus/>
        </div>
      </div>
    </header>

  </div>
</template>
<script>
  import Bus from '../../config/eventbus.min.js'

  export default {
    data(){
      return {
        message:''
      }
    },
    created(){


    },


    mounted(){

    },
    components: {

    },
    computed: {},

    methods: {
      show(ev){
        if(ev.keyCode == 13){
          let path = {path: '/mall-product-list',query: {cateCode:'',malltitle:this.message,cateCode:'',sCateCode:'',catTitle:'分类'}}
          this.message = '';
          this.$router.push(path);
        }
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
  .search{
    display:inline-block;
    vertical-align:middle;
    width:70%;
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
      outline: none;
      border:none;
    }
  }
</style>
