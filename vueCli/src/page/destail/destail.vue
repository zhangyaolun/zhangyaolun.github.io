<template>
    <div class="main-view">
	    <mt-swipe :auto="2000">
		  <mt-swipe-item v-for='item in swiperList'><img :src="item"/></mt-swipe-item>
		</mt-swipe>
		<div class="detailMain">
			<span class="main_title">{{main_title}}</span>
			<div class="mr_center clear">
				<span class="marght left">综合评价：<em class="emStyle">{{emStyle}}</em></span>
			</div>
			<div class="main_price clear">
				<span class="price_code left"><em>{{price_code}}</em>折</span>
				<span class="price_title left">{{price_title}}</span>
				<mt-button type="primary"  @click.native="handleClick" class="price_pay right">付款</mt-button>
			</div>
		</div>
    </div>
</template>

<script>
  import {indexShopHtml} from 'src/service/getData'
  
  export default {
    data(){
      return {
        swiperList:[],
        shopOneList:'',
        main_title:'',
        emStyle:'',
        price_code:'',
        price_title:'',
      }
    },
    mounted(){
    	let name = this.$route.query.title;
    	this.dataHtml(name);
    },
    watch: {
      
    },
    beforeRouteEnter(to, from, next) {
	    console.log(to, from, next);
	    if(from.name=='page2'){
	        to.meta.isBack=true;
	    }
	    next();
	},
    filters:{
      currency:function (value) {
        return parseFloat(value).toFixed(2);
      },
      priceCurrency:function (value) {
        return parseFloat(value*10).toFixed(1);
      },
      imageCurrency:function (value) {
        return parseFloat(value*10).toFixed(1);
      }
    },
    methods: {
      dataHtml(data){
      	let oData = JSON.parse(data);
      	this.shopOneList = data;
      	if(oData.pic.split(',').length){
      		this.swiperList = oData.pic.split(',');
      	}else{
      		this.swiperList.push(oData.pic);
      	}
      	this.main_title = oData.shopName;
      	this.emStyle = oData.averageScore.toFixed(1);
      	this.price_code = (oData.discountRate*10).toFixed(1);
      	this.price_title = oData.remarks;
      },
      handleClick(){
      	let path;
      	path = {path: '/pay',query: {title:this.shopOneList}};
        this.$router.push(path);
      }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .main-view {
  	@include box;
  	.mint-swipe{
	    height: 2.4rem;
  		img{
  			@include wh(100%,auto);	
  		}
  	}
  	.detailMain{
  		@include box;
  		font-size: .15rem;
 		padding: 1% 2%;
 		background:$fc;
  		.main_title{
  			font-size: .18rem;
  		}
  		.mr_center{
	  		font-size: .14rem;
			color: #666;
			padding: 2% 0;
			border-bottom: 1px solid #ccc;
			.emStyle{@include emS;}
		}
		.main_price{
 			font-size: .14rem;
 			color: #666;
 			padding-top: 5%;
 			white-space: nowrap;
 			.price_code{
 				@include pNew;
 				em{font-size: .4rem;}
 			}
 			.price_title{
 				margin:7.5% 0 0 2%;
 			}
 		}
 		.price_pay{
 			padding: 0 10% 0;
 			margin-top: 2%;
 		}
  	}
  	
  }
</style>