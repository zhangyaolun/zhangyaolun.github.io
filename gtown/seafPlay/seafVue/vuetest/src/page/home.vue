<template>
  <div>
   	<div class="swiper width bgf">
		<div class="swiperContent">
			<div class="swiper-container swiper-top-container swiper-container-new swiper-container-horizontal swiper-container-android swiper-container1">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in swiperList">
						<img :src="item.src">
					</div>
				</div>
				<div class="swiper-pagination swiper-pagination1"></div>
			</div>
		</div>
	</div>
	
	<div class="mint-cell">
		<div class="mint-cell-wrapper bgf">
			<div class="mint-cell-title">
				<img src="../images/qita2@2x.png" width="3" height="18" class="mr2"/>
				<span class="mint-cell-text fontWeight colorThree">充值专区</span>
			</div>
		</div>
	</div>
	
  </div>
</template>

<script>
  import haiyuguanggao2 from '../images/del/haiyuguanggao2@2x.png'
  import Swiper from '../../static/swiper.js'
  import getData from '../service/getData.js'
  require('../assets/swiper.min.css')
  export default {
    data(){
      return {
      	swiperList:[
      		{src:haiyuguanggao2},
      		{src:haiyuguanggao2},
      		{src:haiyuguanggao2}
      	],
      }
    },
    mounted(){
		var _this = this;
     	_this.swiper();
    },
    components: {
    },
    methods: {
		swiper(){
			var swiper = new Swiper('.swiper-container', {
				effect: 'coverflow',
				grabCursor: true,
				autoplay: true,
				autoplay: {
					disableOnInteraction: false,
				},
				loop: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				coverflowEffect: {
					rotate: 25,
					stretch: 0,
					depth: 80,
					modifier: 1,
					slideShadows: false
				},
				pagination: {
					el: '.swiper-pagination',
				}
			});
		}
      	
    },
  }

</script>

<style lang="scss" scoped>
 	.swiper{
 		padding:2% 0!important;
 		.swiper-container{
 			padding:0 2% 0 2%!important;
 			.swiper-slide img{
 				display:inline-block;
 				border:0;width:100%;
 				border-radius:.08rem;
 			}
 		}
 	}
	.navImg{height: 1.8rem;}
	.mint-tab-item{position: relative;}
	.mint-tab-item i{position:absolute;bottom:0;left:26%;width:48%;background:#32AAFF;height:.2rem;border-radius:10px}
	.input-wrapper{min-height: 2rem !important;line-height: 2rem;}
	.mint-cell-value>img{width: 1.2rem;}
	.home_mint_cell{padding: .2rem 0;}
	.home_mint_text{font-size: 1rem;}
	.home_mint_button{color: #32AAFF;border: 1px solid #32AAFF;padding: 0;height: 1.5rem;width: 4rem;line-height: 1.4rem;}
	.home_cell_wrapper{min-height: 1.9rem; margin-top: .2rem;line-height: 1.3rem;}
	   

</style>
