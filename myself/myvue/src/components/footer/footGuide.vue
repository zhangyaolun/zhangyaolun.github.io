<template>
    <section id='foot_guide'>
        <section v-for="(title,index) in tabTitle" @click="gotoSkip(index)" class="guide_item">
        	<img class="icon_style" :src="selected==index?tabActiveImg[index]:tabImg[index]"/>
          <span :class="{'active':selected==index}">{{title}}</span>
        </section>
    </section>
</template>

<script>
  import indexImg from '../../images/index.png'
  import shopImg from '../../images/shop.png'
  import cartImg from '../../images/cart.png'
  import userImg from '../../images/user.png'
  import indexActiveImg from '../../images/indexActive.png'
  import shopActiveImg from '../../images/shopActive.png'
  import cartActiveImg from '../../images/cartActive.png'
  import userActiveImg from '../../images/userActive.png'
    export default {
    	data(){
            return{
              tabTitle:['首页','商城','购物车','我的'],
              tabImg:[indexImg,shopImg,cartImg,userImg],
              tabActiveImg:[indexActiveImg,shopActiveImg,cartActiveImg,userActiveImg],
              path:[{path:'/home'},{path:'/mall'},{path:'/shopCar'},{path:'/userCenter'}],
              selected:0,
            }
        },
        created(){
          this.selected=this.checkedNum;
        },
        props: ['checkedNum'],
        mounted(){

        },
        computed: {
        },
        methods: {
        	gotoSkip(index){
        		this.$router.push(this.path[index])
        	}
        },

    }

</script>

    <style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
    @include bis('../../images/foot-bg.png')
        background:#fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 2rem);
        display: flex;
        border-top: 1px solid #e5e5e5;
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
