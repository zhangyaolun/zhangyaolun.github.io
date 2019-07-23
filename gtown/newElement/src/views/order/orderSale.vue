<template>
  <div class="dashboard-container">
  	
    <input-agg :seachlist="seach" @inputaggValue="inputaggval"></input-agg>
    
    <div class="lineBtn clear">
			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0 right" @click="seachClick()">搜索</el-button>
  	</div>
    
    <div class="tableEl">
    	<el-table border :data="tableData" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium" :row-class-name="tableRowClassName" @row-dblclick="dblclick">
    		<el-table-column type="index" fixed="left" :index="indexMethod"></el-table-column>
		    <el-table-column v-for="(item,index) in tableColumn" :label="item.label" :prop="item.prop" :key="index" :render-header="labelHead" :show-overflow-tooltip="true" v-if="paginationFalg"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="170" v-if="paginationFalg">
		      <template slot-scope="scope">
			      	<el-button class='cancel-btn' size="mini" plain round type="info" @click="modClick(scope.row)" v-if="scope.row.orderStatus < 1">异常查看</el-button>
			      	<el-button class='cancel-btn' size="mini" plain round type="danger" @click="modClick(scope.row)">取消</el-button>
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
		  <el-card class="box-card" v-for="(item,index) in tablelist" :key="index" :class="[index?'mt40':'']">
			  <div slot="header" class="clearfix"><span>{{item.name}}</span></div>
			  <div class="text item">
			    <el-table border stripe :data="item.list" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium">
				    <el-table-column v-for="(items,indexs) in item.tablelistwout" :label="items.label" :prop="items.prop" :key="indexs" v-if="item.showhide" show-overflow-tooltip></el-table-column>
				    </el-table-column>
			   	</el-table>
			  </div>
			</el-card>
		</el-dialog>
		
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import { searchOrderByPro,cancelOrder,detailListByOrderId } from '@/service/getData'
import { parseTime } from '@/utils/index'
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
	  		'orderStatus',
	  		'phone',
	  		'consignee',
	  		'trackingNumber',
	  		'carrier',
	  		'picker'
	  	],//查询条件显示
	  	seachData:{
	  		'channelOrderNo':'', //渠道订单编号
				'channelCode':'', //销售渠道
				'carrier':'', //快递公司
				'trackingNumber':'', //快递单号
				'orderNo':'', //OMS订单号
				'orderStatus':'9999', //订单状态
				'consignee':'', //收货人
				'phone':'', //电话联系方式
				'stime':'', //开始时间
				'etime':'', //结束时间
				'currentPage':1
	  	},//查询请求条件
	  	tableData:[],//请求的数据
	  	tableColumn:[
	  		{label:'逾期倒计时',prop:'overdue'},
	  		{label:'销售渠道',prop:'channelName'},
	  		{label:'渠道订单号',prop:'channelOrderNo'},
	  		{label:'OMS订单号',prop:'orderNo'},
	  		{label:'订单状态',prop:'orderStatusValue'},
	  		{label:'收货人',prop:'consignee'},
	  		{label:'联系电话',prop:'phone'},
	  		{label:'收货地址',prop:'address'},
	  		{label:'商品总价',prop:'productTotalVal'},
	  		{label:'折扣',prop:'orderRate'},
	  		{label:'是否退换货',prop:'isReVal'},
	  		{label:'支付方式',prop:'payType'},
	  		{label:'导单时间',prop:'createTimeVal'}
	  	],//查询数据展示
	  	orderStatusList:[],//订单状态
	  	tablelist:[
	  		{
	  			name:'订单明细',
	  			list:[],
	  			tablelistwout:[
			  		{label:'渠道商品编号',prop:'channelSkuCode'},
			  		{label:'商品SKU编号',prop:'skuCode'},
			  		{label:'商品名称',prop:'productName'},
			  		{label:'产品经理',prop:'productManager'},
			  		{label:'商品单价',prop:'priceVal'},
			  		{label:'数量',prop:'num'},
			  		{label:'合计价格',prop:'totalPriceVal'}
			  	],
			  	showhide:false
	  		},
	  		{
	  			name:'物流明细',
	  			list:[],
	  			tablelistwout:[
	  				{label:'快递单号',prop:'trackingNumber'},
			  		{label:'仓库',prop:'warehouseCode'},
			  		{label:'出库时间',prop:'shipmentDateVal'},
			  		{label:'快递公司',prop:'carrier'}
			  	],
			  	showhide:false
	  		}
	  	]
	  }
	},
	components: { inputAgg,BackToTop },
	mounted(){
    this.orderStatusList = JSON.parse(sessionStorage.getItem('orderStatus'));
		this.dataInfo();
	},
  methods: {
  	dialogClose(){//详情关闭
  		this.dialogVisible = false;
  	}, 
  	dblclick(row, event){//表单双击
  		let _this = this;
  		detailListByOrderId({id:row.id}).then(response => {
				if(response){
					let _res = response.result;
					_this.tablelist[0].list = [];
					_this.tablelist[1].list = [];
					_this.tablelist[0].showhide = false;
					_this.tablelist[1].showhide = false;
					if(_res.listDetail && (_res.listDetail.length>0)){//订单明细
						_res.listDetail.forEach((v,k)=>{
							v.price != null?v.priceVal=(v.price/100).toFixed(2):v.priceVal='0.00';
							v.totalPrice != null?v.totalPriceVal=(v.totalPrice/100).toFixed(2):v.totalPriceVal='0.00';
		  				_this.tablelist[0].list.push(v);
			  		})
						_this.tablelist[0].showhide = true;
					}
					if(_res.listwout && (_res.listwout.length>0)){//物流明细
						_res.listwout.forEach((v,k)=>{
							v.shipmentDate?v.shipmentDateVal=parseTime(v.shipmentDate):v.shipmentDateVal='';
		  				_this.tablelist[1].list.push(v);
			  		})
						_this.tablelist[1].showhide = true;
					}
  				_this.dialogVisible = true;
				}
      })
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
  		searchOrderByPro(_this.seachData).then(response => {
  			_this.tableData = [];
				if(response && (response.result.reslutList.length>0)){
					response.result.reslutList.forEach((v,k)=>{
						v.isRe?v.isReVal='是':v.isReVal='否';
						v.createTime?v.createTimeVal=parseTime(v.createTime):v.createTimeVal='';
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
  		_this.msgAlert('确定取消此订单?').then(() => {
	  		cancelOrder({orderId:row.id}).then(response => {
		  			if(response){
		  				_this.resAlert(response.msg).then(()=>{
  							_this.dataInfo();
	      			});
		  			}
			    })
	  	}).catch(error => {})
  	},
  	tableRowClassName({row, rowIndex}){//异常订单显示
  		if (row.orderStatus < 1) {
          return 'warning-row';
      }
  		return '';
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
		   	column.minWidth = 15*(Max[0])<100?120:15*(Max[0]);
		 		return h('div',{class:'table-head',style:{width:'100%'}},[column.label])
  		}
  	}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
