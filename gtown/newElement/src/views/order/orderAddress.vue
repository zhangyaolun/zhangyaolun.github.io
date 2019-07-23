<template>
  <div class="dashboard-container">
  	
    <input-agg :seachlist="seach" @inputaggValue="inputaggval"></input-agg>
    
    <div class="lineBtn clear">
			<el-button type="primary" class="pan-btn tiffany-btn mt15 mleft10 left" @click="moreModClick()">批量上传收货地址</el-button>
			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0 mt15 right" @click="seachClick()">搜索</el-button>
  	</div>
    
    <div class="tableEl">
    	<el-table border stripe :data="tableData" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium">
    		<el-table-column type="index" fixed="left" :index="indexMethod" v-if="paginationFalg"></el-table-column>
		    <el-table-column v-for="(item,index) in tableColumn" :label="item.label" :prop="item.prop" :key="index" :render-header="labelHead" show-overflow-tooltip v-if="paginationFalg"></el-table-column>
		    
    		<el-table-column label="收货人" width="150" v-if="paginationFalg">
      		<template slot-scope="scope">
		      	<template v-if="scope.row.edit">
	            <el-input class="edit-input" size="small" v-model="scope.row.consignee"></el-input>
	          </template>
	        	<span v-else>{{ scope.row.consignee }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="联系电话" width="180" v-if="paginationFalg">
      		<template slot-scope="scope">
		      	<template v-if="scope.row.edit">
	            <el-input class="edit-input" size="small" v-model="scope.row.phone" max-length='11'></el-input>
	          </template>
	        	<span v-else>{{ scope.row.phone }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="地址" width="300" v-if="paginationFalg">
      		<template slot-scope="scope">
		      	<template v-if="scope.row.edit">
	            <el-input class="edit-input" size="small" v-model="scope.row.address"></el-input>
	          </template>
	        	<span v-else>{{ scope.row.address }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="省" width="110" v-if="paginationFalg">
      		<template slot-scope="scope">
		      	<template v-if="scope.row.edit">
	            <el-input class="edit-input" size="small" v-model="scope.row.province"></el-input>
	          </template>
	        	<span v-else>{{ scope.row.province }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="市" width="110" v-if="paginationFalg">
      		<template slot-scope="scope">
		      	<template v-if="scope.row.edit">
	            <el-input class="edit-input" size="small" v-model="scope.row.city"></el-input>
	          </template>
	        	<span v-else>{{ scope.row.city }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="区" width="110" v-if="paginationFalg">
      		<template slot-scope="scope">
		      	<template v-if="scope.row.edit">
	            <el-input class="edit-input" size="small" v-model="scope.row.area"></el-input>
	          </template>
	        	<span v-else>{{ scope.row.area }}</span>
	        </template>
	      </el-table-column>
		    <el-table-column fixed="right" label="操作" width="180" v-if="paginationFalg">
		      <template slot-scope="scope">
		      	<el-button v-if="scope.row.edit" type="success" plain @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
          		<el-button v-if="scope.row.edit" class='cancel-btn' plain size="small" icon="el-icon-refresh" type="warning" @click="confirmCancel(scope.row)">取消</el-button>
          		<el-button v-if="!scope.row.edit" type="info" plain @click='modClick(scope.row)' size="small" icon="el-icon-edit">编辑</el-button>
		      </template>
		    </el-table-column>
	   	</el-table>
    </div>
    
     <!--分页-->
    <el-pagination
    	v-if="paginationFalg"
    	background
    	class='center'
      @current-change="handleCurrentChange"
      :current-page="seachData.currentPage"
      :page-size="50"
      layout="total, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
		
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import { searchAddressExOrderByPro,modOrder } from '@/service/getData'
import { parseTime } from '@/utils/index'
import { checkNotEmpty } from '@/utils/validate'
import BackToTop from '@/components/BackToTop'
import inputAgg from '@/components/seachCondition/inputAgg'

export default {
  data() {
	  return {
	  	dialogVisible:false,//订单详情
	  	paginationFalg:false,//分页显示
	  	totalCount:0,//总数
	  	seach:['channelOrderNo','channelCode','orderNo','phone','consignee','picker'
	  	],//查询条件显示
	  	seachData:{
	  		'channelOrderNo':'', //渠道订单编号
	  		'channelCode':'', //上架渠道
				'orderNo':'', //OMS订单号
				'phone':'', //电话联系方式
				'consignee':'', //收货人
				'stime':'', //开始时间
				'etime':'', //结束时间
				'currentPage':1
	  	},//查询请求条件
	  	seachOdata:{},//查询请求条件备份
	  	tableData:[],//请求返回的数据
	  	tableColumn:[
	  		{label:'销售渠道',prop:'channelName'},
	  		{label:'渠道订单编号',prop:'channelOrderNo'},
	  		{label:'OMS订单编号',prop:'orderNo'},
	  		{label:'订单状态',prop:'orderStatusVal'},
	  		{label:'商品总价',prop:'totalPriceVal'},
	  		{label:'导单时间',prop:'channelOrderCreateTimeVal'},
	  		{label:'是否换货',prop:'isReVal'}
	  	],//查询数据展示
	  	orderStatusList:[],//订单状态
	  	oldTrData:{},//点击编辑原数据
	  }
	},
	components: { inputAgg,BackToTop },
	mounted(){
    this.orderStatusList = JSON.parse(sessionStorage.getItem('orderStatus'));
    this.seachOdata = JSON.parse(JSON.stringify(this.seachData));
		this.dataInfo();
	},
  methods: {
  	modClick(row){//操作编辑
  		this.oldTrData = JSON.parse(JSON.stringify(row));
  		row.edit = !row.edit;
  	},
  	confirmEdit(row){//操作确定
  		let _this = this;
  		let _data = {
  			id:row.id,
  			consignee:row.consignee,
  			phone:row.phone,
  			address:row.address,
  			province:row.province,
  			city:row.city,
  			area:row.area
  		}
  		_this.msgAlert().then(() => {
	  		modOrder(_data).then(response => {
		  			if(response){
		  				_this.resAlert(response.msg).then(()=>{
  							_this.dataInfo();
	      			});
		  			}
			    })
	  	}).catch(error => {})
  	},
  	confirmCancel(row){//操作取消
  		row.consignee	= this.oldTrData.consignee;
  		row.phone	= this.oldTrData.phone;
  		row.address	= this.oldTrData.address;
  		row.province	= this.oldTrData.province;
  		row.city	= this.oldTrData.city;
  		row.area	= this.oldTrData.area;
  		row.edit = !row.edit;
  	},
  	dataInfo(){//数据请求
  		let _this = this;
  		searchAddressExOrderByPro(_this.seachOdata).then(response => {
  			_this.tableData = [];
				if(response && (response.result.reslutList.length>0)){
					response.result.reslutList.forEach((v,k)=>{
						v.edit = false;
						v.channelOrderCreateTime?v.channelOrderCreateTimeVal=parseTime(v.channelOrderCreateTime):v.channelOrderCreateTimeVal='';
						v.shipmentTime?v.shipmentTimeVal=parseTime(v.shipmentTime):v.shipmentTimeVal='';
						v.totalPrice != null?v.totalPriceVal=(v.totalPrice/100).toFixed(2):v.totalPriceVal='0.00';
						v.isReVal = v.isRe?'是':'否';
						_this.orderStatusList.forEach((vv,kk)=>{
			     		if(v.orderStatus == vv.key){
			     			v.orderStatusVal = vv.value;
			     		}
			  		})
	  				_this.tableData.push(v);
		  		})
					_this.paginationFalg = true;
					_this.totalCount = response.result.totalCount;
				}else{
					_this.paginationFalg = false;
				}
      })
  	},
  	indexMethod(index){//表格显示数字
  		return index+1;
  	},
  	seachClick(){//搜索
  		this.seachOdata = JSON.parse(JSON.stringify(this.seachData));
  		this.seachData.currentPage = 1;   
  		this.dataInfo();
  	},
  	handleCurrentChange(val) {//页数
	    this.seachData.currentPage = val;
		  this.dataInfo();
	  },
  	inputaggval(val){//条件输入
  		this.seachData.channelOrderNo = val.channelOrderNo;
  		this.seachData.channelCode = val.channelCode.value;    
  		this.seachData.orderNo = val.orderNo;   
  		this.seachData.phone = val.phone;   
  		this.seachData.consignee = val.consignee;   
  		this.seachData.stime = val.picker.minval;   
  		this.seachData.etime = val.picker.maxval;   
  	},
  	moreModClick(){//批量退款
  		let _this = this;
	   
  	},
  	labelHead(h,{column,index}){//设置表格列宽
  		let _this = this;
  		let fontAttr = [],_length = 0,reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/),val='';
  		if(_this.tableData.length != 0 && _this.paginationFalg){
  			_this.tableData.forEach((v,k)=>{
	  			val = v[column.property];
	  			val?_length=val.toString().length:_length = 0;
	    		if (reg.test(val)){_length=_length*0.7}
	    		if(column.property == 'channelOrderCreateTimeVal'){_length = 10;}
	  			fontAttr.push(_length);
	  		})
	  		let Max = fontAttr.sort((a,b)=>{return b-a});
	  		column.minWidth = 18*(Max[0])<100?120:18*(Max[0]);
		 		return h('div',{class:'table-head',style:{width:'100%'}},[column.label])
  		}
  	}
	}
}
</script>