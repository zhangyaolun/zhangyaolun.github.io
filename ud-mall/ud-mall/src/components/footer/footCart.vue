<template>
    <section id='foot_guide'>
        <div class="cell">
          <section @click="addCollection()" class="guide_item">
              <img class="icon_style" src="../../images/collection.png"/>
              <span>收藏</span>
          </section>
          <section @click="gotoCar()" class="guide_item">
              <img class="icon_style" src="../../images/cart.png"/>
              <span>购物车</span>
          </section>
        </div>
        <div @click="addCart()" class="cell">
            <div class="add-cart">
              <span>加入购物车</span>
            </div>
        </div>
        <div class="cell">
            <div @click="buy()" class="buy">
               <span>立即购买</span>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        created(){

        },
        mounted(){

        },
        computed: {
        },
        methods: {
        	gotoSkip(path){
        		this.$router.push(path)
        	},
          buy(){
            this.$emit('buy');
          },
          gotoCar(){
            this.$emit('gotoCar');
          },
          addCart(){
            this.$emit('addCart');
          },
          addCollection(){
            this.$emit('addCollection');
          }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
        @include bis('../../images/foot-bg.png')
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 2rem);
        display: flex;
    }
    .cell{
      flex: 1;
      display: flex;
    }
    .add-cart{
      text-align:center;
      display:inline-block;
      width:100%;
      background:#f1a138;
      font-size:.7rem;
      line-height:1.95rem;
      span{
        color:#ffffff;
      }
    }
    .buy{
      text-align:center;
      display:inline-block;
      width:100%;
      background:#de463a;
      font-size:.7rem;
      line-height:1.95rem;
      span{
        color:#ffffff;
      }
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		  .icon_style{
			  @include wh(1rem, 1rem);
			  margin-bottom: 0rem;
			  margin-top: .2rem;
			  fill: #ccc;
		  }
		  span{
			  @include sc(.45rem, #666);
		  }
		  .active{
        color:#ea4473;
		  }
    }

</style>
