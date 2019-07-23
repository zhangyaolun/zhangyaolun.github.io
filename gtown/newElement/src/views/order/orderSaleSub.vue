<template>
  <div class="dashboard-container">
  	
    <input-agg :seachlist="seach" @inputaggValue="inputaggval"></input-agg>
    
    <div class="lineBtn clear">
			<el-button type="primary" class="pan-btn tiffany-btn mt15 mleft10 left" @click="moreModClick()">批量退款</el-button>
    	<el-button type="primary" class="pan-btn tiffany-btn mleft0 mt15 left" @click="moreExecl()">全部导出</el-button>
			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0 mt15 right" @click="seachClick()">搜索</el-button>
  	</div>
    
    <div class="tableEl">
    	<el-table border stripe :data="tableData" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium" @selection-change="handleSelectionChange">
    		<el-table-column type="index" fixed="left" :index="indexMethod"  v-if="paginationFalg"></el-table-column>
    		<el-table-column type="selection" width="55" :selectable="selectablecolumn" fixed="left"  v-if="paginationFalg"></el-table-column>
    		
		    <el-table-column v-for="(item,index) in tableColumn" :label="item.label" :prop="item.prop" :key="index" :render-header="labelHead" :show-overflow-tooltip="true" v-if="paginationFalg"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="100" v-if="paginationFalg">
		      <template slot-scope="scope">
			      	<el-button class='cancel-btn' size="mini" plain round type="info" @click="modClick(scope.row)" :class="[scope.row.showReMoney?'inlineblock':'hide']">已退款</el-button>
			      	<el-button class='cancel-btn hide' size="mini" plain round type="info">跳转库存查看</el-button> <!--点击sku编号-->
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
import { searchDetailViewList,modOrderDetail } from '@/service/getData'
import { parseTime,excelHost } from '@/utils/index'
import BackToTop from '@/components/BackToTop'
import inputAgg from '@/components/seachCondition/inputAgg'

export default {
  data() {
	  return {
	  	paginationFalg:false,//分页显示
	  	totalCount:0,//总数
	  	seach:['channelOrderNo','channelCode','orderNo','orderStatus','skuCode','purchaseNo','phone','consignee','productName','picker'
	  	],//查询条件显示
	  	seachData:{
	  		'channelOrderNo':'', //渠道订单编号
				'channelCode':'', //销售渠道
				'orderNo':'', //OMS订单号
				'orderStatus':'9999', //订单状态
				'skuCode':'', //SKU商品编号
				'purchaseNo':'', //采购单号
				'phone':'', //电话联系方式
				'consignee':'', //收货人
				'productName':'', //商品名称
				'stime':'', //开始时间
				'etime':'', //结束时间
				'currentPage':1
	  	},//查询请求条件
	  	seachOdata:{},//查询请求条件备份
	  	tableData:[],//请求返回的数据
	  	tableColumn:[
	  		{label:'销售渠道',prop:'channelName'},
	  		{label:'渠道订单号',prop:'channelOrderNo'},
	  		{label:'商品SKU',prop:'skuCode'},
	  		{label:'商品名称',prop:'productName'},
	  		{label:'渠道商品编号',prop:'channelSkuCode'},
	  		{label:'OMS订单号',prop:'orderNo'},
	  		{label:'订单状态',prop:'o_orderStatusVal'},
	  		{label:'收货人',prop:'consignee'},
	  		{label:'联系电话',prop:'phone'},
	  		{label:'省',prop:'province'},
	  		{label:'市',prop:'city'},
	  		{label:'区',prop:'area'},
	  		{label:'地址',prop:'address'},
	  		{label:'子订单编号',prop:'orderDetailNo'},
	  		{label:'采购单号',prop:'stockingCode'},
	  		{label:'子采购单号',prop:'purchaseNo'},
	  		{label:'产品经理',prop:'productManager'},
	  		{label:'子订单状态',prop:'od_orderStatusVal'},
	  		{label:'订单类型',prop:'orderTypeVal'},
	  		{label:'单价',prop:'priceVal'},
	  		{label:'数量',prop:'num'},
	  		{label:'退货数',prop:'reNum'},
	  		{label:'税率',prop:'orderRate'},
	  		{label:'商品总价',prop:'totalPriceVal'},
	  		{label:'商品序列号',prop:'serialNumber'},
	  		{label:'是否赠品',prop:'isGiftVal'},
	  		{label:'是否已退款',prop:'reMoneyVal'},
	  		{label:'仓库编号',prop:'warehouseCode'},
	  		{label:'快递公司',prop:'carrier'},
	  		{label:'快递单号',prop:'trackingNumber'},
	  		{label:'重量',prop:'weight'},
	  		{label:'发货日期',prop:'shipmentTimeVal'},
	  		{label:'发货数量',prop:'itemCount'},
	  		{label:'是否3C产品',prop:'is3cVal'},
	  		{label:'导单时间',prop:'channelOrderCreateTimeVal'}
	  	],//查询数据展示
	  	orderStatusList:[],//订单状态
	  	modOrderData:{'ids':'','pros':'','modType':6},//操作退款请求数据
	  }
	},
	components: { inputAgg,BackToTop },
	mounted(){
    this.orderStatusList = JSON.parse(sessionStorage.getItem('orderStatus'));
    this.seachOdata = JSON.parse(JSON.stringify(this.seachData));
		this.dataInfo();
	},
  methods: {
  	selectablecolumn(row,index){//表格勾选是否显示
  		if(row.showReMoney)return true;
  		return false;
  	},
  	indexMethod(index){//表格显示数字
  		return index+1;
  	},
  	handleSelectionChange(val) {//表格选择（勾选）
	    this.multipleSelection = val;
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
  	dataInfo(){//数据请求
  		let _this = this,TypeAttr = ['','实物订单','虚拟商品订单']
  		searchDetailViewList(_this.seachOdata).then(response => {
  			_this.tableData = [];
				if(response && (response.result.reslutList.length>0)){
					response.result.reslutList.forEach((v,k)=>{
						v.showReMoney = false;
						v.channelOrderCreateTime?v.channelOrderCreateTimeVal=parseTime(v.channelOrderCreateTime):v.channelOrderCreateTimeVal='';
						v.shipmentTime?v.shipmentTimeVal=parseTime(v.shipmentTime):v.shipmentTimeVal='';
						v.price != null?v.priceVal=(v.price/100).toFixed(2):v.priceVal='0.00';
						v.totalPrice != null?v.totalPriceVal=(v.totalPrice/100).toFixed(2):v.totalPriceVal='0.00';
						v.isGiftVal = v.isGift?'是':'否';
						v.reMoneyVal = v.reMoney?'是':'否';
						v.is3cVal = v.is3c?'是':'否';
						v.orderTypeVal = TypeAttr[v.orderType];
						if(v.od_orderStatus == '390' && !v.reMoney){v.showReMoney = true;}
						_this.orderStatusList.forEach((vv,kk)=>{
			     		if(v.o_orderStatus == vv.key){
			     			v.o_orderStatusVal = vv.value;
			     		}
			     		if(v.od_orderStatus == vv.key){
			     			v.od_orderStatusVal = vv.value;
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
  		this.seachData.orderNo = val.orderNo;   
  		this.seachData.orderStatus = val.orderStatus.value;   
  		this.seachData.skuCode = val.skuCode;   
  		this.seachData.phone = val.phone;   
  		this.seachData.consignee = val.consignee;   
  		this.seachData.productName = val.productName;   
  		this.seachData.stime = val.picker.minval;   
  		this.seachData.etime = val.picker.maxval;   
  	},
  	moreModClick(){//批量退款
  		let _this = this;
	    if(_this.multipleSelection.length == 0){
	    	_this.$message({message: '请选择订单',type: 'warning'});
	    }else{
	    	_this.modOrderData.ids = '';
	    	_this.modOrderData.pros = '';
	    	_this.multipleSelection.forEach((v,k) => {
	    		_this.modOrderData.ids += v.detail_id+',';
	    		_this.modOrderData.pros += '1'+',';
	    	})
	    	_this.modOrderData.ids = _this.modOrderData.ids.substr(0, _this.modOrderData.ids.length - 1);
	    	_this.modOrderData.pros = _this.modOrderData.pros.substr(0, _this.modOrderData.pros.length - 1);
	    	_this.modOrderFun();
	    }
  	},
  	modClick(row){//订单操作已退款
  		this.modOrderData.ids = row.detail_id;
  		this.modOrderData.pros = '1';
  		this.modOrderFun();
  	},
  	modOrderFun(){//操作已退款接口
  		let _this = this;
  		_this.msgAlert().then(() => {
	  		modOrderDetail(_this.modOrderData).then(response => {
		  			if(response){
		  				_this.resAlert(response.msg).then(()=>{
  							_this.dataInfo();
	      			});
		  			}
			    })
	  	}).catch(error => {})
  	},
  	moreExecl(){//全部导出
  		let _this = this;
  		_this.msgAlert().then(() => {
  			let url = "/orders/aLLExcelDetailViewList?channelOrderNo="+_this.seachOdata.channelOrderNo+"&channelCode="+_this.seachOdata.channelCode+"&orderNo="+_this.seachOdata.orderNo+"&orderStatus="+_this.seachOdata.orderStatus+"&skuCode="+_this.seachOdata.skuCode+"&purchaseNo="+_this.seachOdata.purchaseNo+"&phone="+_this.seachOdata.phone+"&consignee="+_this.seachOdata.consignee+"&productName="+_this.seachOdata.productName+"&stime="+_this.seachOdata.stime+"&etime="+_this.seachOdata.etime+"&currentPage="+_this.seachOdata.currentPage
  		excelHost(url);
	  	}).catch(error => {})
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