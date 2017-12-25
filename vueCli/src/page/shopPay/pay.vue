<template>
    <div class="main-pay">
    	
	    <div class="clear pay_li">
		  	<div class="main_left left">
		  		<img :src="pic" alt="" class=""/>
		  	</div>
		  	<div class="main_right left">
		  		<div class="mr_top ">
		  			<span class=" mr_title">{{main_title}}</span>
		  		</div>
		  		<div class="mr_center clear">
		  			<span class="marght left">
		  				综合评价：<em class="emStyle">{{emStyle}}</em>
		  			</span>
		  		</div>
		  		<div class="mr_price">
		  			<span class="priceNew">折扣：<em>{{price_code}}</em>折</span>
		  		</div>
		  	</div>
		</div>
		
		<div class="order_price clear">
			<div class="orderp_left left"> 
				<div class="pri_title">
					折扣金额
				</div>
				<div class="pri_input">
					<em>￥</em><input :type="inputType" name="" id="" value="" placeholder="询问服务员后输入" v-model='message' min-value='0.00' max-value='99999.99' />
				</div>
			</div>
			<div class="pri_name left">
				<div class="pri_title ">
					当前折扣
				</div>
				<span class="emStyle"><em class="price_n">{{price_code}}</em>折</span>
			</div>
		</div>
		
		<div class="order_priceNon">
			<div class="priceNon_name ">
				<span>不打折金额：<em>￥</em></span>
				<input :type="inputType" name="" id="name_priceNon" placeholder="询问服务员后输入" v-model='noMessage' min-value='0.00' max-value='99999.99' >
			</div>
		</div>
		
		<div class="order_fexed clear">
			<div class="fexed_right right" @click="handleClick">
				确认付款
			</div>
			<div class="fexed_left right">
				实付金额：<em>￥</em><i pay="" class="pay"><span class="payCont">{{payCont}}</span><span class="payMent" v-show='oMent'>{{payMent}}</span></i>
			</div>
		</div>
		
    </div>
</template>

<script>
  import {indexShopHtml} from 'src/service/getData'
  import indexList from './mount'
  import { Toast } from 'mint-ui'
  
  export default {
    data(){
      return {
        main_title:'',
        emStyle:'',
        price_code:'',
        pic:'',
        message:'',
        oMessage:'',
        noMessage:'',
        oNoMessage:'',
        payCont:'0.00',
        payMent:'(折后价:￥0.00)',
        oMent:false,
        inputType:'number'
      }
    },
    mounted(){
    	let name = this.$route.query.title;
    	this.dataHtml(name);
    },
    /*computed: {
	    payCont: function () {
	      let autoPay = (parseFloat(this.oMessage)*this.price_code/10).toFixed(2);
	      return autoPay;
	    }
    },*/
    beforeRouteEnter(to, from, next) {
	    console.log(to, from, next);
	    if(from.name=='page2'){
	        to.meta.isBack=true;
	    }
	    next();
	},
    watch: {
      message:function(val){
      	/*val == ''?this.oMessage = '0.00':this.oMessage = val;*/
      	this.inputType = 'text';
      	if(val == '')this.oMessage = '';
      	if(val>0){
      		let value = val;
		    value = value.replace(/[^\d.]/g,"")
		             .replace(/\.{2,}/g,".")
		             .replace(".","$#$").replace(/\./g,"").replace("$#$",".")
		             .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数 
		    if(value.indexOf(".") < 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
		        if(value.substr(0,1) == '0' && value.length == 2){  
		            value = value.substr(1,value.length);      
		        }  
		    }
		    this.message = value.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		    this.oMessage = this.message;
      	}else{
      		this.message = this.oMessage;
      	}
      	if(val){
      		this.oMent = true;
	      	if(this.noMessage){
	      		let autoPay = (val*this.price_code/10).toFixed(2);
      			this.payMent = '(折后价:￥'+autoPay+')';
      			this.payCont = (parseFloat(autoPay) +parseFloat(this.noMessage)).toFixed(2);
      		}else{
      			this.oMent = false;
      			this.payCont = (val*this.price_code/10).toFixed(2);
      		}
      	}else{
      		this.oMent = false;
      		if(this.noMessage){
      			this.payCont = parseFloat(this.noMessage).toFixed(2);
      		}else{
      			this.payCont = '0.00';
      		}
      	}
      },
      noMessage:function(val){
      	this.inputType = 'text';
      	if(val == '')this.noMessage = '';
      	if(val>0){
      		let value = val;
		    value = value.replace(/[^\d.]/g,"")
		             .replace(/\.{2,}/g,".")
		             .replace(".","$#$").replace(/\./g,"").replace("$#$",".")
		             .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数 
		    if(value.indexOf(".") < 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
		        if(value.substr(0,1) == '0' && value.length == 2){  
		            value = value.substr(1,value.length);      
		        }  
		    }
		    this.noMessage = value.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		    this.oNoMessage = this.noMessage;
      	}else{
      		this.noMessage = this.oNoMessage;
      	}
      	val?this.oMent = true:this.oMent = false;
      	if(this.message){
      		let autoPay = (this.message*this.price_code/10).toFixed(2);
  			this.payMent = '(折后价:￥'+autoPay+')';
  			if(this.oMent){
  				this.payCont = (parseFloat(autoPay) +parseFloat(val)).toFixed(2);
  			}else{
  				this.payCont = parseFloat(autoPay).toFixed(2);
  			}
  		}else{
  			this.oMent = false;
  			this.payCont = (this.message*this.price_code/10).toFixed(2);
  		}
      }
    },
    filters:{
    },
    methods: {
      dataHtml(data){
      	let oData = JSON.parse(data);
      	console.log(oData)
      	if(oData.pic.split(',').length){
      		this.pic = oData.pic.split(',')[0];
      	}else{
      		this.pic= oData.pic;
      	}
      	this.main_title = oData.shopName;
      	this.emStyle = oData.averageScore.toFixed(1);
      	this.price_code = (oData.discountRate*10).toFixed(1);
      },
      handleClick(){
      	console.log('888888')
      }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .main-pay {
  	@include box;
  	
  	.pay_li{
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
  	
  	.order_price{
  		font-size: .12rem;
	    width: 100%;
	    padding: 2% 2% 1.2%;
	    margin: 1.5% 0;
	    box-sizing: border-box;
	    background:$fc;
	    .orderp_left {
		    width: 70%;
		    box-sizing: border-box;
		    border-right: 1px solid #dedede;
		    .pri_title {
			    font-size: .18rem;
			    color: #000;
			    margin-bottom: 2%;
			}
			.pri_input {
				font-size: .16rem;
			    white-space: nowrap;
			    padding-top: 3%;
			    input{
			    	font-size: .16rem;
			    }
			}
		}
		.pri_name{
 			font-size: .12rem;
 			color: #666;
 			text-align: center;
 			.pri_title {
			    font-size: .18rem;
			    color: #000;
			    margin-bottom: 2%;
			}
 			.price_n{
 				padding-top: 10%;
 				@include pNew;
 				font-size: .18rem;
 			}
 		}
  	}
  	
  	.order_priceNon{
		font-size: .14rem;
		background:$fc;
		padding: 3% 2%;
	}
	
	.order_fexed {
	    width: 100%;
	    margin-top: 1%;
	    background:$fc;
	    font-size: .14rem;
	    height: 40px;
	    line-height: 40px;
	    color: #666;
	    em,span{@include pNew;}
	    .payCont{font-size: .2rem;}
	    .payMent{font-size: .14rem;}
	    .fexed_right {
		    width: 28%;
		    text-align: center;
		    background-color: #ffb600;
		    color: #fff;
		    margin-left: 1%;
		}
	}
	
  }
</style>