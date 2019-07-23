<template>
	<div class="inputAggBox plr pRl">
		<section v-if="inputFalg.channelOrderNoFlag" class="inputBox">
			<md-input name="title" placeholder="输入渠道订单编号" v-model="dataVal.channelOrderNo">渠道订单编号</md-input>
		</section>
		<section v-if="inputFalg.orderNoFlag" class="inputBox">
			<md-input name="title" placeholder="输入OMS订单编号" v-model="dataVal.orderNo">OMS订单编号</md-input>
		</section>
		<section v-if="inputFalg.phoneFlag" class="inputBox">
			<md-input type = 'tel' name="title" placeholder="输入联系电话" v-model="dataVal.phone">联系电话</md-input>
		</section>
		<section v-if="inputFalg.consigneeFlag" class="inputBox">
			<md-input name="title" placeholder="输入收货人" v-model="dataVal.consignee">收货人</md-input>
		</section>
		<section v-if="inputFalg.trackingNumberFlag" class="inputBox">
			<md-input name="title" placeholder="输入快递单号" v-model="dataVal.trackingNumber">快递单号</md-input>
		</section>
		<section v-if="inputFalg.skuCodeFlag" class="inputBox">
			<md-input name="title" placeholder="输入SKU商品编号" v-model="dataVal.skuCode">SKU商品编号</md-input>
		</section>
		<section v-if="inputFalg.purchaseNoFlag" class="inputBox">
			<md-input name="title" placeholder="输入采购单号" v-model="dataVal.purchaseNo">采购单号</md-input>
		</section>
		<section v-if="inputFalg.productNameFlag" class="inputBox">
			<md-input name="title" placeholder="输入商品名称" v-model="dataVal.productName">商品名称</md-input>
		</section>
		
		<section v-if="inputFalg.orderStatusFlag" class="inputBox clear">
			<select-seach :author="orderStatusList" :seachList='dataVal.orderStatus' @seachListEvent='orderStatusValue'></select-seach>
		</section>
		<section v-if="inputFalg.carrierFlag" class="inputBox clear">
			<select-seach :author="carrierList" :seachList='dataVal.carrier' @seachListEvent='carrierValue'></select-seach>
		</section>
		<section v-if="inputFalg.channelCodeFlag" class="inputBox clear">
			<select-seach :author="channelCodeList" :seachList='dataVal.channelCode' @seachListEvent='channelCodeValue'></select-seach>
		</section>
		<section v-if="inputFalg.orderFieldFlag" class="inputBox clear">
			<select-seach :author="orderFieldList" :seachList='dataVal.orderField' @seachListEvent='orderFieldValue'></select-seach>
		</section>
		<section v-if="inputFalg.isBhFlag" class="inputBox clear">
			<select-seach :author="isBhList" :seachList='dataVal.isBh' @seachListEvent='isBhValue'></select-seach>
		</section>
		<section v-if="inputFalg.brandIdFlag" class="inputBox clear">
			<select-seach :author="brandIdList" :seachList='dataVal.brandId' @seachListEvent='brandIdValue'></select-seach>
		</section>
		<section v-if="inputFalg.consigneeFlag" class="inputBox clear">
			<select-seach :author="productManagerIdList" :seachList='dataVal.productManagerId' @seachListEvent='productManagerIdValue'></select-seach>
		</section>
		<section v-if="inputFalg.supplierIdFlag" class="inputBox clear">
			<select-seach :author="supplierIdList" :seachList='dataVal.supplierId' @seachListEvent='supplierIdValue'></select-seach>
		</section>
		<section v-if="inputFalg.pickerFlag" class="inputBox clear">
			<picker-input @pickerEvent='pickerValue' :seachList='dataVal.picker'></picker-input>
		</section>
	</div>
</template>

<script>
import { parseTime } from '@/utils/index'
import MdInput from '@/components/MDinput'
import selectSeach from '@/components/seachCondition/select'
import pickerInput from '@/components/seachCondition/picker'

export default {
  data() {
    return {
    	orderStatusList:[],//订单状态list
    	carrierList:[],//快递公司list
    	channelCodeList:[],//销售渠道list
    	orderFieldList:[{key:'0',value:'时间'},{key:'1',value:'品牌'},{key:'2',value:'产品经理'}],//排序list
    	isBhList:[{key:'false',value:'不备货'},{key:'true',value:'等待备货'}],//备货list
    	brandIdList:[],//品牌list
    	productManagerIdList:[],//产品经理list
    	supplierIdList:[],//供应商list
    	inputFalg: {
    		channelOrderNoFlag:false,//渠道订单编号
    		orderNoFlag:false,//OMS订单编号
    		phoneFlag:false,//联系电话
    		consigneeFlag:false,//收货人
    		trackingNumberFlag:false,//快递单号
    		orderStatusFlag:false,//订单状态
    		carrierFlag:false,//快递公司
    		channelCodeFlag:false,//销售渠道
    		pickerFlag:false,//导单时间
    		skuCodeFlag:false,//SKU商品编号
    		purchaseNoFlag:false,//采购单号
    		productNameFlag:false,//商品名称
    		orderFieldFlag:false,//排序
    		isBhFlag:false,//备货
    		brandIdFlag:false,//品牌
    		productManagerIdFlag:false,//产品经理
    		supplierIdFlag:false,//供应商
    	},
	    dataVal: {
	    	channelOrderNo:'',//渠道订单编号
	    	orderNo:'',//OMS订单编号
	    	phone:'',//联系电话
	    	consignee:'',//OMS订单编号
	    	trackingNumber:'',//快递单号
	    	skuCode:'',// SKU商品编号
	    	purchaseNo:'',// 采购单号
	    	productName:'',// 商品名称
	    	orderStatus:{name:'订单状态',value:'9999',type:''},// 订单状态
	    	carrier:{name:'快递公司',value:'全部',type:''},// 快递公司
	    	channelCode:{name:'销售渠道',value:'',type:'channelCode'},// 销售渠道
	    	orderField:{name:'排序',value:'0',type:'orderField'},// 排序
	    	isBh:{name:'备货',value:'false',type:'isBh'},// 备货
	    	brandId:{name:'品牌',value:'',type:'brandId'},// 品牌
	    	productManagerId:{name:'产品经理',value:'',type:'productManagerId'},// 产品经理
	    	supplierId:{name:'供应商',value:'',type:'supplierId'},// 供应商
	    	picker:{name:'导单时间',minval:'',maxval:''},// 导单时间
	    }
    }
  },
  components: { MdInput,selectSeach,pickerInput },
  props: ['seachlist'],//String Number Boolean Array Object
  props: {
	  seachlist: Array
  },
  watch:{
  	dataVal:{
        handler:function(val,oldval){
        	this.$emit('inputaggValue', val);
        },
        deep:true
    },
  },
  mounted(){
  	let _this = this;
  	if(_this.seachlist && _this.seachlist.length>0){
  		_this.seachlist.forEach((v,k)=>{
  			if(v == 'channelOrderNo'){_this.inputFalg.channelOrderNoFlag = true;}
  			if(v == 'orderNo'){_this.inputFalg.orderNoFlag = true;}
  			if(v == 'phone'){_this.inputFalg.phoneFlag = true;}
  			if(v == 'consignee'){_this.inputFalg.consigneeFlag = true;}
  			if(v == 'trackingNumber'){_this.inputFalg.trackingNumberFlag = true;}
  			if(v == 'skuCode'){_this.inputFalg.skuCodeFlag = true;}
  			if(v == 'purchaseNo'){_this.inputFalg.purchaseNoFlag = true;}
  			if(v == 'productName'){_this.inputFalg.productNameFlag = true;}
  			
  			if(v == 'orderStatus'){_this.inputFalg.orderStatusFlag = true;_this.orderStatusData();}
  			if(v == 'carrier'){_this.inputFalg.carrierFlag = true;_this.carrierData();}
  			if(v == 'channelCode'){_this.inputFalg.channelCodeFlag = true;}
  			if(v == 'orderField'){_this.inputFalg.orderFieldFlag = true;}
  			if(v == 'isBh'){_this.inputFalg.isBhFlag = true;}
  			if(v == 'brandId'){_this.inputFalg.brandIdFlag = true;}
  			if(v == 'productManagerId'){_this.inputFalg.productManagerIdFlag = true;}
  			if(v == 'supplierId'){_this.inputFalg.supplierIdFlag = true;}
  			if(v == 'picker'){_this.inputFalg.pickerFlag = true;}
  		})
  	}
  },
  methods: {
    orderStatusValue(val) {//订单状态返回值
	  this.dataVal.orderStatus.value = val.value;
	},
	orderStatusData() {//订单状态请求
      let _this = this;
      let _orderStatus = sessionStorage.getItem('orderStatus');
     	_orderStatus = JSON.parse(_orderStatus);
     	_this.orderStatusList = [];
     	_this.orderStatusList[0] = {key:'9999',value:'全部'};
     	_orderStatus.forEach((v,k)=>{
  			_this.orderStatusList.push(v);
  		})
    },
	carrierValue(val) {//快递公司
	  this.dataVal.carrier.value = val.value;
	},
	carrierData() {//快递公司请求
      let _this = this;
      let carrierdata = ['全部','虚拟发货','顺丰','EMS','申通','圆通','中通','百世汇通','韵达','宅急送','天天','安能','京东','德邦','全峰','快捷','速尔快递','国通快递','万象','邮政包裹/平邮','联邦','苏宁快递','新邦','中铁物流','中铁快运','优速','跨越'];
 	  _this.carrierList = [];
 	  carrierdata.forEach((v,k)=>{
		_this.carrierList[k] = {key:v,value:v};
	  })
    },
    orderFieldValue(val) {//排序
	  this.dataVal.orderField.value = val.value;
	},
	isBhValue(val) {//是否备货
	  this.dataVal.isBh.value = val.value;
	},
	brandIdValue(val) {//品牌选择值
	  this.dataVal.brandId.value = val.value;
	},
	productManagerIdValue(val) {//产品经理
	  this.dataVal.productManagerId.value = val.value;
	},
    channelCodeValue(val) {//销售渠道
	  this.dataVal.channelCode.value = val.value;
	},
	supplierIdValue(val) {//供应商
	  this.dataVal.supplierId.value = val.value;
	},
	pickerValue(val) {//时间
	 let _this = this;
	 if(val){
	 	val[0]?_this.dataVal.picker.minval = parseTime(val[0],'{y}-{m}-{d}'):_this.dataVal.picker.minval='';
	 	val[1]?_this.dataVal.picker.maxval = parseTime(val[1],'{y}-{m}-{d}'):_this.dataVal.picker.maxval='';
	 }else{
	 	_this.dataVal.picker.minval='';
	 	_this.dataVal.picker.maxval='';
	 }
	},
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.inputAggBox{
	display: inline-block;
	width: 100%;
	.inputBox{
		display: inline-block !important;
	    margin: 10px 10px 0;
	    width: 22.8%;
	    box-sizing: border-box;
	    .material-input__component{
	    	width: 100%;
	    }
	}
	.selectBox{
		width: 100%;
	}
}
</style>
