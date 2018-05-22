<template>
	<div>
		<input type="text" name="search" value="" placeholder="请输入搜索的店铺名称"  v-model='inputvalue'/>
		<!--<ul v-infinite-scroll="oneMore"
		  infinite-scroll-disabled="loading"
		  infinite-scroll-distance="10">
		  <li v-for="(item,i) in shopOneList" @click="navClick(i)" class="clear">
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
		   <!--<li v-for="n in 20" class="clear">
		  	<div class="main_left left">
		  		<img :src="images" alt="" class=""/>
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
		  			<i>{{n}}</i>
		  		</div>
		  	</div>
		  </li>
		</ul>-->
		<mt-tab-container v-model="selected">
		 <mt-tab-container-item id="1">
		    <mt-cell v-for="(n,i) in shopOneList">
		    	<div @click="navClick(i)">
		    		<div class="main_left left">
				  		<img :src="n.pic" alt="" class=""/>
				  	</div>
				  	<div class="main_right left">
				  		<div class="mr_top ">
				  			<span class=" mr_title">{{n.shopName}}</span>
				  		</div>
				  		<div class="mr_center clear">
				  			<span class="marght left">
				  				综合评价：<em class="emStyle">{{n.averageScore}}</em>
				  			</span>
				  			<span class="right">1.23<em>km</em></span>
				  		</div>
				  		<div class="mr_price">
				  			<span class="priceNew">折扣：<em>{{n.discountRate}}</em>折</span>
				  			<i>{{n.remarks}}</i>
				  		</div>
				  	</div>
		    	</div>
	    	</mt-cell>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <mt-cell v-for="(n,i) in shopTwoList">
			    <div @click="navClick(i)">
		    		<div class="main_left left">
				  		<img :src="n.pic" alt="" class=""/>
				  	</div>
				  	<div class="main_right left">
				  		<div class="mr_top ">
				  			<span class=" mr_title">{{n.shopName}}</span>
				  		</div>
				  		<div class="mr_center clear">
				  			<span class="marght left">
				  				综合评价：<em class="emStyle">{{n.averageScore}}</em>
				  			</span>
				  			<span class="right">1.23<em>km</em></span>
				  		</div>
				  		<div class="mr_price">
				  			<span class="priceNew">折扣：<em>{{n.discountRate}}</em>折</span>
				  			<i>{{n.remarks}}</i>
				  		</div>
				  	</div>
		    	</div>
		    	</mt-cell>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <mt-cell v-for="n in 6" >
			    <div class="main_left left">
				  		<img :src="images" alt="" class=""/>
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
				  			<i>{{n}}</i>
				  		</div>
				  	</div>
		    	</mt-cell>
		  </mt-tab-container-item>
		  </mt-tab-container>
	</div>
</template>

<script>
  import {indexShopHtml} from 'src/service/getData'
  import { InfiniteScroll  } from 'mint-ui'
  import ct12 from '../../images/ct12.png'
  import ct11 from '../../images/ct11.png'
  import ct10 from '../../images/ct10.png'
  import { Indicator  } from 'mint-ui'
  import Bus from '../../config/eventbus.min.js';
  export default {
    data(){
      return {
      	inputvalue:'',
      	images:ct12,
        allLoaded:true,
        shopOneList:[],
        shopTwoList:[],
        imagesList:[ct12,ct11,ct10],
        loading:false,
        x:121.473701,
        y:31.230416,
        radius:100,
        currPage:0,
        pageSize:10,
        order:0,
        type:'',
        shopName:'',
        selected:''
      }
    },
    mounted(){
    	/*Indicator.open({//出现加载中
			spinnerType: 'fading-circle'
		});
		this.ohtmlDate();*/
				let seAttr = ['1','2','3']
	        	this.selected = seAttr[0];
	        	this.ohtmlDate();
    },
    props: ['ashopEmpty'],
    created(){
     	/*Bus.addEventListener("changedit",this.dataHtml);*/
    },
    watch: {
        inputvalue(val) {
            this.$emit('services-change', val);
        },
        ashopEmpty(val) {
        	let seAttr = ['1','2','3']
        	this.selected = seAttr[val];
        	this.images = this.imagesList[val];
        	this.ohtmlDate();
        },
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
      	this.order = data.target;
      	this.shopOneList = [];
      	/*this.ohtmlDate();*/
      },
      getSrcList(data){
      	console.log(data)
      },
      navClick(index){
      	console.log(index)
      	let path;
      	if(this.selected == 1){
      		path = {path: '/destail',query: {title:JSON.stringify(this.shopOneList[index])}};
      	}else{
      		path = {path: '/destail',query:{title:JSON.stringify(this.shopTwoList[index])}};
      	}
        this.$router.push(path);
      },
      oneMore(){
  		if(!this.loading){
      		let oPage = this.currPage;
      		oPage++;
      		this.currPage = oPage;
      		/*this.ohtmlDate();*/
      	}  
	  },
	  ohtmlDate(){
	  	if(this.selected == 1){
	  		setTimeout(()=>{
		     this.shopOneList = [{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万0'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万1'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万2'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万3'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万4'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万5'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万6'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万7'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万8'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万9'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万10'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万11'}]
		},1000)
	  	}else{
	  		setTimeout(()=>{
		     this.shopTwoList = [{pic:'http://images2017.cnblogs.com/news/24442/201711/24442-20171114102854156-1802163706.gif',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万0'},{pic:'http://images2017.cnblogs.com/news/24442/201711/24442-20171114102854156-1802163706.gif',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万1'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万2'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万3'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万4'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万5'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万6'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万7'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万8'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万9'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万10'},{pic:'https://gold-cdn.xitu.io/v3/static/img/frontend.2ee7fa7.png',shopName:'事实上',averageScore:4.2,discountRate:0.8,remarks:'撒千万千万11'}]
		},1000)
	  	}
	    
	  	
	  	/*indexShopHtml(this.x,this.y,this.radius,this.currPage,this.pageSize,this.order,this.type,this.shopName).then(res => {
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
	  }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  	ul{
		 font-size:.15rem;
	     @include box;	
	         height: 8rem;
    overflow: auto;
  	   li{
  	   	 background:$fc;
   	     padding: 2% 2% 1%;
  	   	 margin:1.5% 0;
  	   	 @include wh(100%,auto);	
  	   	 .main_left{
  	   	 	@include wh(28%,100%);	
  	   	 	img{
	  	   	 	@include wh(32%,auto);	
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
</style>