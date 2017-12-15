
<template>

  <div>
    <div class="empty-main">
      <img :src="emptyImg">
      <div class="empty-title">{{emptytitle}}</div>
      <router-link id="emptyclick" :to="{path: '/'}">
          {{emptyclick}}
      </router-link>
    </div>
  </div>
</template>
<script>
  import emptyImg from '../../images/shop-empty.png'
  export default {
    data(){
      return {
        emptytitle:'对不起，没有找到您要的商品',
        emptyclick:'去看看别的吧',
        emptyImg:emptyImg
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
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin.css';
  .empty-main{
    position: absolute;
    top:9rem;
    left:0;
    right:0;
    bottom: 0;
    text-align: center;
    color: #808080;
    font-size: .8rem;
    line-height: 2rem;
    img{
      width:4rem;
      height:4rem;
    }

  }
  #emptyclick{
    color: #ea4473;
    text-decoration: underline;
  }
</style>
