<template>
	<div>
		<div class="search">
			<input type="text" name="search" value="" placeholder="请输入搜索的店铺名称" autofocus="autofocus" v-model='inputvalue' />
			<img :src="searchImg" alt="" class="seachImg"  @click='seachClick()'/>
		</div>
		<ul v-infinite-scroll="oneMore"
		  infinite-scroll-disabled="loading"
		  infinite-scroll-distance="10" v-show='falg'>
		  <!--<li v-for="(item,i) in shopOneList" @click="navClick(i)" class="clear">
		  	<div class="main_left left">
		  		<img :src="item.pic.split(',').length?item.pic.split(',')[0]:item.pic" alt="" class=""/>
		  	</div>
		  	<div class="main_right left">
		  		<div class="mr_top ">
		  			<span class=" mr_title">{{item.shopName}}</span>
		  		</div>
		  		<div class="mr_center clear">
		  			<span class="marght left">
		  				综合评价：<em class="emStyle">{{item.averageScore}}</em>
		  			</span>
		  			<span class="right">{{item.distance  | currency}}<em>km</em></span>
		  		</div>
		  		<div class="mr_price">
		  			<span class="priceNew">折扣：<em>{{item.discountRate  | priceCurrency}}</em>折</span>
		  			<i>{{item.remarks}}</i>
		  		</div>
		  	</div>
		  </li>-->
		  <li v-for="n in 20" class="clear">
		  	<div class="main_left left">
		  		<img src="../../images/ct12.png" alt="" class=""/>
		  	</div>
		  	<div class="main_right left">
		  		<div class="mr_top ">
		  			<span class=" mr_title">145632</span>
		  		</div>
		  		<div class="mr_center clear">
		  			<span class="marght left">
		  				综合评价：<em class="emStyle">4.5</em>
		  			</span>
		  			<span class="right">1.23<em>km</em></span>
		  		</div>
		  		<div class="mr_price">
		  			<span class="priceNew">折扣：<em>8.0</em>折</span>
		  			<i>5555555555</i>
		  		</div>
		  	</div>
		  </li>
		</ul>
	</div>
</template>

<script>
  import {indexShopHtml,indexShopsearch} from 'src/service/getData'
  import { InfiniteScroll,Indicator,Toast   } from 'mint-ui'
  import searchImg from '../../images/search.png'
  
  export default {
    data(){
      return {
       searchImg:searchImg,
       shopOneList:[],
       loading:false,
       inputvalue:'',
       x:121.473701,
       y:31.230416,
       radius:'',
       currPage:1,
       pageSize:10,
       order:0,
       type:'',
       falg:true,
      }
    },
    mounted(){
    	window.addEventListener('scroll', this.menu);
    	console.log(this.$store.state.count)
    },
    watch: {
    	inputvalue:function(val){
    		if(val == ''){
    			this.falg = false;
    			this.shopOneList = [];
    		}
    		this.$store.state.count = val
    	}
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
      seachClick(){
      	this.shopOneList = [];
      	if(this.inputvalue == ''){
      		this.falg = false;
      		let instance = Toast('请输入搜索的店铺名称');
			setTimeout(() => {
			  instance.close();
			}, 2000);
      	}else{
      		this.falg = true;
      		this.ohtmlDate();
      	}
      },
      oneMore(){
  		if(this.falg){
      		let oPage = this.currPage;
      		oPage++;
      		this.currPage = oPage;
      		this.ohtmlDate();
      	}  
	  },
	  ohtmlDate(){
	  	/*indexShopsearch(this.x,this.y,this.radius,this.currPage,this.pageSize,this.order,this.type,this.inputvalue).then(res => {
	        if(res){
	        	Indicator.close();
	        	for(let i=0;i<res.result.result.length;i++){
        			this.shopOneList.push(res.result.result[i]);
	        	}
	          	if(res.result.pageNo == res.result.totalPages){
        			this.loading = true;
	          	}
	        }
        });*/
	  },
      menu() {
	  }
      
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .search{
  	position: fixed;
  	top: 0;
  	left: 0;
  	@include box;
  	font-size: .14rem;
  	background-color: #fff;
  	margin-bottom: .5%;
  	input{
        width: 95%;
	    outline: none;
	    border: none;
	    border-radius: 1rem;
	    background-color: #e6e4e7;
	    color: #333;
	    margin: 1.5% 0 1.5% 2.5%;
	    padding: 2% 0 2% 4%;
  	}
  	.seachImg{
	    width: 25px;
	    position: fixed;
	    top: 1.2%;
	    right: 7%;
  	}   
  }
  ul{
  	 margin-top: 10% ;
	 font-size:.15rem;
     @include box;	
   li{
   	 background:$fc;
	 padding: 2% 2% 1%;
   	 margin:1.5% 0;
   	 @include wh(100%,auto);	
   	 .main_left{
   	 	@include wh(28%,100%);	
   	 	img{
  	   	 	@include wh(100%,auto);	
  	   	 }
   	 }
   	 .main_right{
   	 	@include wh(70%,auto);	
   	 	margin-left:2%;
   	 	margin-top:.5%;
		box-sizing: border-box;
 		.mr_top{
	        font-size: .15rem;
            width: 100%;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
	        span{font-weight: 600;}	
 		}
 		.mr_center{
 			font-size: .12rem;
 			color: #666;
 			padding: 1% 0;
 			.emStyle{@include emS;}
 		}
 		.mr_price{
 			font-size: .12rem;
 			color: #666;
 			.priceNew{
 				@include pNew;
 				em{font-size: .18rem;}
 			}
 		}
   	 }
   }
}
</style>