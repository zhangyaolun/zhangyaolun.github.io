<template>
	<div class="selectBox">
		<span class="center selectName">{{seachLists.name}}</span>
		<el-select v-model="seachList.value" filterable  placeholder="请选择(可搜索)">
		    <el-option
		      v-for="(item,k) in options"
		      :key="k"
		      :label="item.value"
		      :value="item.key">
		    </el-option>
		</el-select>
	</div>
</template>

<script>
import { channelList,searchBrand,findUser,searchSupplier } from '@/service/getData'
export default {
  data() {
    return {
    	options: [],
	    seachLists: {name:'',value:''}
    }
  },
  props: ['author','seachList'],//String Number Boolean Array Object
  props: {
	  author: Array,
	  seachList: Object
  },
  watch:{
  	seachList:{
        handler:function(val,oldval){
        	this.$emit('seachListEvent', val);
        },
        deep:true
    },
  },
  mounted(){
  	let _this = this;
  	this.author.forEach((v,k)=>{
		_this.options.push(v);
	})
  	if(_this.seachList.type == 'channelCode'){
  		_this.channelCodeData();
  	}
  	if(_this.seachList.type == 'brandId'){
  		_this.brandIdData();
  	}
  	if(_this.seachList.type == 'productManagerId'){
  		_this.productManagerIdData();
  	}
  	if(_this.seachList.type == 'supplierId'){
  		_this.supplierIdData();
  	}
  	this.seachLists.name = this.seachList.name;
  	this.seachLists.value = this.seachList.value;
  },
  methods: {
    channelCodeData() {//销售渠道
      let _this = this;
      channelList().then(response => {
		if(response && (response.result.length>0)){
			_this.options = [];
			_this.options[0] = {key:'',value:'全部'};
			response.result.forEach((v,k)=>{
				v.key = v.channelCode;
				v.value = v.channelName;
  				_this.options.push(v);
	  		})
		}
      })
    },
    brandIdData() {//品牌
      let _this = this;
	    searchBrand({brandName:''}).then(response => {
			if(response && (response.result.length>0)){
				_this.options = [];
				_this.options[0] = {key:'',value:'全部'};
				response.result.forEach((v,k)=>{
					v.key = v.id + v.brandName;
					v.value = v.brandName;
	  				_this.options.push(v);
		  		})
			}
	    })
    },
    productManagerIdData() {//产品经理
      let _this = this;
	    findUser({type:'2'}).then(response => {
			if(response && (response.result.length>0)){
				_this.options = [];
				_this.options[0] = {key:'',value:'全部'};
				response.result.forEach((v,k)=>{
					v.key = v.id;
					v.value = v.userName;
	  				_this.options.push(v);
		  		})
			}
	    })
    },
    supplierIdData() {//供应商
      let _this = this;
	    searchSupplier().then(response => {
			if(response && (response.result.length>0)){
				_this.options = [];
				_this.options[0] = {key:'',value:'全部'};
				response.result.forEach((v,k)=>{
					v.key = v.id;
					v.value = v.name;
	  				_this.options.push(v);
		  		})
			}
	    })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.selectBox{
	white-space: nowrap;
	display: inline-block;
	float: left;
	width: 30%;
	.selectName{
		width: 30%;
	    font-size: 14px;
	    color: #fff;
	    height: 36px;
	    line-height: 36px;
	    float: left;
	    background: #ccc;
	    display: inline-block;
	    border-radius: 4px;
	    border-top-left-radius: 20px;
	    border-bottom-right-radius: 20px;
	}
	.el-select--medium{
		width: 70%;
		box-sizing: border-box;
	}
}
</style>
