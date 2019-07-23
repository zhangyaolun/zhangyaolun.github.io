<template>
  <div class="dashboard-container">
  	
    <input-agg :seachlist="seach" @inputaggValue="inputaggval"></input-agg>
    
    <div class="lineBtn clear">
			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0 right" @click="seachClick()">搜索</el-button>
  	</div>
    
    <div class="tableEl">
    	<el-table border :data="tableData" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium">
    		<el-table-column type="index" fixed="left" :index="indexMethod"></el-table-column>
		    <el-table-column v-for="(item,index) in tableColumn" :label="item.label" :prop="item.prop" :key="index" :render-header="labelHead" :show-overflow-tooltip="true" v-if="paginationFalg"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="170" v-if="paginationFalg">
		      <template slot-scope="scope">
			      	<el-button class='cancel-btn' size="mini" plain round type="info" @click.stop="modClick(scope.row)">修改商品渠道编号</el-button>
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
    
    <!--详情-->
    <el-dialog
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="dialogClose" class="mb40">
		  <el-card class="box-card">
			  <div class="text item">
			    <el-table border stripe :data="detailList" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium">
			    	<el-table-column prop="channelName" label="销售渠道" min-width="200px"></el-table-column>
			    	<el-table-column prop="channelOrderNo" label="渠道订单编号" min-width="400px"></el-table-column>
			    	<el-table-column prop="orderNo" label="OMS订单编号" min-width="300px"></el-table-column>
			    	<el-table-column prop="productTotal" label="订单总价" min-width="100px"></el-table-column>
			    	<el-table-column prop="createTimeVal" label="订单创建时间" min-width="200px"></el-table-column>
			   	</el-table>
			  </div>
			</el-card>
		  <el-card class="box-card mt40">
			  <div class="text item">
			    <el-table border stripe :data="tablelist" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium">
				    <el-table-column prop="channelSkuCode" label="渠道商品编号" min-width="200px"></el-table-column>
				    <el-table-column label="商品SKU编号" width="180">
		      		<template slot-scope="scope">
				      	<template v-if="scope.row.edit">
			            <el-input class="edit-input" size="small" v-model="scope.row.taxRate"></el-input>
			          </template>
			        	<span v-else>{{ scope.row.taxRate }}</span>
			        </template>
			      </el-table-column>
			    	<el-table-column prop="productName" label="商品名称" min-width="300px"></el-table-column>
			    	<el-table-column prop="productManager" label="产品经理" min-width="100px"></el-table-column>
			    	<el-table-column prop="priceVal" label="商品单价" min-width="200px"></el-table-column>
			   	</el-table>
			   	<div class="center w100 mt40">
			   		<el-button type="success" plain @click="confirmEdit()" size="small" icon="el-icon-circle-check-outline">确定</el-button>
			  	</div>
			  </div>
			</el-card>
		</el-dialog>
		
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import { searchSkuExOrderByPro,detailListByOrderId,modOrderDetail } from '@/service/getData'
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
	  	seach:[
	  		'channelOrderNo',
	  		'channelCode',
	  		'orderNo',
	  		'phone',
	  		'consignee',
	  		'picker'
	  	],//查询条件显示
	  	seachData:{
	  		'channelOrderNo':'', //渠道订单编号
				'channelCode':'', //销售渠道
				'orderNo':'', //OMS订单号
				'consignee':'', //收货人
				'phone':'', //电话联系方式
				'stime':'', //开始时间
				'etime':'', //结束时间
				'currentPage':1
	  	},//查询请求条件
	  	tableData:[],//请求的数据
	  	tableColumn:[
	  		{label:'销售渠道',prop:'channelName'},
	  		{label:'渠道订单号',prop:'channelOrderNo'},
	  		{label:'OMS订单号',prop:'orderNo'},
	  		{label:'异常类型',prop:'orderStatusValue'},
	  		{label:'收货人',prop:'consignee'},
	  		{label:'联系电话',prop:'phone'},
	  		{label:'收货地址',prop:'address'},
	  		{label:'商品总价',prop:'productTotalVal'},
	  		{label:'是否退换货',prop:'isReVal'},
	  		{label:'导单时间',prop:'createTimeVal'}
	  	],//查询数据展示
	  	orderStatusList:[],//订单状态
	  	detailList:[],//选中的订单数据
	  	tablelist:[],//点击修改的接收数据
	  	modOrderData:{'ids':'','pros':'','modType':1},//操作修改请求数据
	  }
	},
	components: { inputAgg,BackToTop },
	mounted(){
    this.orderStatusList = JSON.parse(sessionStorage.getItem('orderStatus'));
		this.dataInfo();
	},
  methods: {
  	confirmEdit(){//操作确定
  		let _this = this;
  		let _falg = true;
    	_this.modOrderData.ids = '';
    	_this.modOrderData.pros = '';
    	_this.tablelist.forEach((v,k) => {
    		if(!checkNotEmpty(v.taxRate)){
    			_falg = false;
    		}else{
	    		_this.modOrderData.ids += v.id+',';
	    		_this.modOrderData.pros += v.taxRate +',';
    		}
    	})
    	if(!_falg){_this.$message({message: '请输入商品SKU编号',type: 'warning'});return;};
    	_this.modOrderData.ids = _this.modOrderData.ids.substr(0, _this.modOrderData.ids.length - 1);
    	_this.modOrderData.pros = _this.modOrderData.pros.substr(0, _this.modOrderData.pros.length - 1);
  		_this.msgAlert().then(() => {
	  		modOrderDetail(_this.modOrderData).then(response => {
	  			if(response){
	  				_this.resAlert(response.msg).then(()=>{
							_this.dialogVisible = false;
      			});
	  			}
			  })
	  	}).catch(error => {})
  	},
  	dialogClose(){//详情关闭
  		this.dialogVisible = false;
  	}, 
  	seachClick(){//搜索
  		this.dataInfo();
  	},
  	handleCurrentChange(val) {//页数
	    this.seachData.currentPage = val;
		  this.dataInfo();
	  },
  	dataInfo(){//数据请求
  		let _this = this;
  		searchSkuExOrderByPro(_this.seachData).then(response => {
  			_this.tableData = [];
				if(response && (response.result.reslutList.length>0)){
					response.result.reslutList.forEach((v,k)=>{
						v.isRe?v.isReVal='是':v.isReVal='否';
						v.channelOrderCreateTime?v.createTimeVal=parseTime(v.channelOrderCreateTime):v.createTimeVal='';
						v.productTotal != null?v.productTotalVal=(v.productTotal/100).toFixed(2):v.productTotalVal='0.00';
						_this.orderStatusList.forEach((vv,kk)=>{
			     		if(v.orderStatus == vv.key){
			     			v.orderStatusValue = vv.value;
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
  	inputaggval(val){//条件输入
  		this.seachData.channelOrderNo = val.channelOrderNo;
  		this.seachData.channelCode = val.channelCode.value;   
  		this.seachData.carrier = val.carrier.value=='全部'?'':val.carrier.value;   
  		this.seachData.trackingNumber = val.trackingNumber;   
  		this.seachData.orderNo = val.orderNo;   
  		this.seachData.orderStatus = val.orderStatus.value;   
  		this.seachData.consignee = val.consignee;   
  		this.seachData.phone = val.phone;   
  		this.seachData.stime = val.picker.minval;   
  		this.seachData.etime = val.picker.maxval;   
  		this.seachData.currentPage = 1;   
  	},
  	modClick(row){//订单取消
  		let _this = this;
  		_this.detailList[0] = JSON.parse(JSON.stringify(row));
  		detailListByOrderId({id:row.id}).then(response => {
				if(response){
					_this.tablelist = [];
					let _res = response.result;
					if(_res.listDetail && (_res.listDetail.length>0)){//订单明细
						_res.listDetail.forEach((v,k)=>{
							v.edit = true;
							v.skuhtml = '';
							v.price != null?v.priceVal=(v.price/100).toFixed(2):v.priceVal='0.00';
		  				_this.tablelist.push(v);
			  		})
					}
  				_this.dialogVisible = true;
				}
      })
  	},
  	indexMethod(index){//表格显示数字
  		return index+1;
  	},
  	labelHead(h,{column,index}){//设置表格列宽
  		let _this = this;
  		let fontAttr = [],_length = 0,reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/),val='';
  		if(_this.tableData.length != 0 && _this.paginationFalg){
  			_this.tableData.forEach((v,k)=>{
	  			val = v[column.property];
	  			val?_length=val.toString().length:_length = 0;
	    		if (reg.test(val)){_length=_length*0.7}
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
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
