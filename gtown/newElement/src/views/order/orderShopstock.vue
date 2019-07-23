<template>
  <div class="dashboard-container">
  	
    <input-agg :seachlist="seach" @inputaggValue="inputaggval"></input-agg>
    
    <div class="lineBtn clear">
			<el-button type="primary" class="pan-btn tiffany-btn mt15 mleft10 left" @click="moreModClick(3)">批量代发</el-button>
			<el-button type="primary" class="pan-btn tiffany-btn mt15 left" @click="exportExcelClick()">订单导出</el-button>
			<el-button type="primary" class="pan-btn tiffany-btn mt15 left" @click="moreModClick(7)">批量换货</el-button>
			<el-button type="primary" class="pan-btn tiffany-btn mt15 left" @click="moreModClick(8)">等待备货</el-button>
    	<el-button type="primary" class="pan-btn tiffany-btn mleft0 mt15 right" @click="moreExecl()">全部导出</el-button>
			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0 mt15 right" @click="seachClick()">搜索</el-button>
  	</div>
    
    <div class="tableEl">
    	<el-table ref="table" border stripe :data="tableData" style="width: 99.99%;text-align: center;" v-loading="!paginationFalg" empty-text='暂无数据' size="medium" @selection-change="handleSelectionChange">
    		<el-table-column type="index" fixed="left" :index="indexMethod"  v-if="paginationFalg"></el-table-column>
    		<el-table-column type="selection" width="55" fixed="left" v-if="paginationFalg"></el-table-column>
		    <el-table-column v-for="(item,index) in tableColumn" :label="item.label" :prop="item.prop" :key="index" :render-header="labelHead" :show-overflow-tooltip="true" v-if="paginationFalg"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="100" v-if="paginationFalg">
		      <template slot-scope="scope">
			      	<el-button class='cancel-btn' size="mini" plain round type="info" @click="modClickSee(scope.row)">库存查看</el-button>
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
import { searchStockExOrderByPro,modOrderDetail } from '@/service/getData'
import { parseTime,excelHost } from '@/utils/index'
import BackToTop from '@/components/BackToTop'
import inputAgg from '@/components/seachCondition/inputAgg'

export default {
  data() {
	  return {
	  	multipleSelectionAll: [],   // 所有选中的数据包含跨页数据
      multipleSelection: [],   // 当前页选中的数据
　　         idKey: 'detail_id', // 标识列表数据中每一行的唯一键的名称(需要按自己的数据改一下)
	  	paginationFalg:false,//分页显示
	  	totalCount:0,//总数
	  	seach:['channelOrderNo','orderNo','skuCode','orderField','isBh','phone',
	  	'brandId','productManagerId',	'channelCode','supplierId','consignee','productName','picker'
	  	],//查询条件显示
	  	seachData:{
	  		channelOrderNo:'', //渠道订单编号
				channelCode:'', //销售渠道
				orderNo:'', //OMS订单号
				isBh:'false', //是否备货
				skuCode:'', //SKU商品编号
				orderField:0, //排序
				brandId:'', //品牌
				productManagerId:'', //产品经理
				supplierId:'', //供应商
				phone:'', //电话联系方式
				consignee:'', //收货人
				productName:'', //商品名称
				stime:'', //开始时间
				etime:'', //结束时间
				currentPage:1
	  	},//查询请求条件
	  	seachOdata:{},//查询请求条件备份
	  	tableData:[],//请求返回的数据
	  	tableColumn:[
	  		{label:'SKU商品编号',prop:'skuCode'},
	  		{label:'商品名称',prop:'productName'},
	  		{label:'销售渠道',prop:'channelName'},
	  		{label:'渠道订单号',prop:'channelOrderNo'},
	  		{label:'收货人',prop:'consignee'},
	  		{label:'联系电话',prop:'phone'},
	  		{label:'地址',prop:'address'},
	  		{label:'产品经理',prop:'productManager'},
	  		{label:'订单价格	',prop:'totalPriceVal'},
	  		{label:'数量	',prop:'num'},
	  		{label:'导单时间',prop:'createTimeVal'}
	  	],//查询数据展示
	  	orderStatusList:[],//订单状态
	  	multipleSelection:[],//勾选数据
	  	modOrderData:{'ids':'','pros':'','modType':3},//操作退款请求数据
	  }
	},
	components: { inputAgg,BackToTop },
	mounted(){
    this.orderStatusList = JSON.parse(sessionStorage.getItem('orderStatus'));
    this.seachOdata = JSON.parse(JSON.stringify(this.seachData));
		this.dataInfo();
	},
  methods: {
  	modClickSee(row){//库存查看
  		let _this = this;
	    
  	},
  	moreModClick(index){//批量代发 代发3    换货7    备货8
  		let _this = this;
	    if(_this.multipleSelection.length == 0){
	    	_this.$message({message: '请选择订单',type: 'warning'});
	    }else{
	    	_this.idsFun();
	    	_this.modOrderData.modType = index;
	    	_this.msgAlert().then(() => {
	  		modOrderDetail(_this.modOrderData).then(response => {
			  			if(response){
			  				if(index == 3){
			  					response.msg = '订单代发成功';
			  				}else if(index == 7){
			  					response.msg = '换货成功';
			  				}
			  				_this.resAlert(response.msg).then(()=>{
			  					_this.multipleSelection = [];
			  					_this.multipleSelectionAll = [];
	  							_this.dataInfo();
		      			});
			  			}
				    })
		  	}).catch(error => {})
	    }
  	},
  	exportExcelClick(){//订单导出
  		let _this = this;
	    if(_this.multipleSelection.length == 0){
	    	_this.$message({message: '请选择订单',type: 'warning'});
	    }else{
	    	_this.idsFun();
	  		_this.msgAlert().then(() => {
	  		  let url = "/orders/exportExcelByStockEx?id="+_this.modOrderData.ids;
	  		  excelHost(url);
	  		  _this.multipleSelection = [];
			  	_this.multipleSelectionAll = [];
		  	}).catch(error => {})
	    }
  	},
  	idsFun(){//勾选的ids
  		let _this = this;
  		_this.modOrderData.ids = '';
  		_this.modOrderData.pros = '';
  		let oAttr = [..._this.multipleSelectionAll,..._this.multipleSelection];
  		if(oAttr && (oAttr.length>0)){
				oAttr.forEach((v,k)=>{
					_this.modOrderData.ids += v.detail_id +',';
	    		_this.modOrderData.pros += '1'+',';
	    	})
	    	_this.modOrderData.ids = _this.modOrderData.ids.substr(0, _this.modOrderData.ids.length - 1);
	    	_this.modOrderData.pros = _this.modOrderData.pros.substr(0, _this.modOrderData.pros.length - 1);
	  	}
  	},
  	indexMethod(index){//表格显示数字
  		return index+1;
  	},
  	handleSelectionChange(val) {//表格选择（勾选）
  		let _this = this;
  		_this.multipleSelection = val;
	  },
  	seachClick(){//搜索
  		this.seachOdata = JSON.parse(JSON.stringify(this.seachData));
  		this.seachOdata.currentPage = 1;   
  		this.dataInfo();
  	},
  	handleCurrentChange(val) {//页数
	    this.seachOdata.currentPage = val;
	    this.changePageCoreRecordData();
		  this.dataInfo();
	  },
  	dataInfo(){//数据请求
  		let _this = this;
  		searchStockExOrderByPro(_this.seachOdata).then(response => {
  			_this.tableData = [];
				if(response && (response.result.reslutList.length>0)){
					response.result.reslutList.forEach((v,k)=>{
						v.createTime?v.createTimeVal=parseTime(v.createTime):v.createTimeVal='';
						v.totalPrice != null?v.totalPriceVal=(v.totalPrice/100).toFixed(2):v.totalPriceVal='0.00';
						_this.tableData.push(v);
		  		})
					setTimeout(()=>{_this.setSelectRow();}, 200)
					_this.paginationFalg = true;
					_this.totalCount = response.result.totalCount;
				}else{
					_this.paginationFalg = false;
				}
      })
  	},
  	setSelectRow() {
  		let _this = this;
	    if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {return;}
	    let idKey = this.idKey;
	    let selectAllIds = [];
	    this.multipleSelectionAll.forEach(row=>{
	        selectAllIds.push(row[idKey]);
	    })
	    this.$refs.table.clearSelection();
	    this.tableData.forEach((v,k)=>{
        if (selectAllIds.indexOf(_this.tableData[k][idKey]) >= 0) {
            _this.$refs.table.toggleRowSelection(_this.tableData[k], true);
        }
	    })
		} ,
		// 记忆选择核心方法
		changePageCoreRecordData () {
		    let idKey = this.idKey;
		    let that = this;
		    if (this.multipleSelectionAll.length <= 0) {
		        this.multipleSelectionAll = this.multipleSelection;
		        return;
		    }
		    // 总选择里面的key集合
		    let selectAllIds = [];
		    this.multipleSelectionAll.forEach(row=>{
		        selectAllIds.push(row[idKey]);
		    })
		    let selectIds = []
		    // 获取当前页选中的id
		    this.multipleSelection.forEach(row=>{
		        selectIds.push(row[idKey]);
		        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
		        if (selectAllIds.indexOf(row[idKey]) < 0) {
		            that.multipleSelectionAll.push(row);
		        }
		    })
		    let noSelectIds = [];
		    // 得到当前页没有选中的id
		    this.tableData.forEach(row=>{
		        if (selectIds.indexOf(row[idKey]) < 0) {
		            noSelectIds.push(row[idKey]);
		        }
		    })
		    noSelectIds.forEach(id=>{
		        if (selectAllIds.indexOf(id) >= 0) {
		            for(let i = 0; i< that.multipleSelectionAll.length; i ++) {
		                if (that.multipleSelectionAll[i][idKey] == id) {
		                    // 如果总选择中有未被选中的，那么就删除这条
		                    that.multipleSelectionAll.splice(i, 1);
		                    break;
		                }
		            }
		        }
		    })
		},
  	inputaggval(val){//条件输入
  		this.seachData.channelOrderNo = val.channelOrderNo;
  		this.seachData.channelCode = val.channelCode.value;    
  		this.seachData.orderNo = val.orderNo;   
  		this.seachData.isBh = val.isBh.value;   
  		this.seachData.orderField = val.orderField.value;   
  		this.seachData.productManagerId = val.productManagerId.value;   
  		this.seachData.supplierId = val.supplierId.value;   
  		this.seachData.brandId = val.brandId.value?val.brandId.value.split('|')[0]:'';   
  		this.seachData.skuCode = val.skuCode;   
  		this.seachData.phone = val.phone;   
  		this.seachData.consignee = val.consignee;   
  		this.seachData.productName = val.productName;   
  		this.seachData.stime = val.picker.minval;   
  		this.seachData.etime = val.picker.maxval;   
  	},
  	moreExecl(){//全部导出
  		let _this = this;
  		_this.msgAlert().then(() => {
  			let url = "/orders/aLLExcelDetailViewList?channelOrderNo="+_this.seachOdata.channelOrderNo+"&channelCode="+_this.seachOdata.channelCode+"&orderNo="+_this.seachOdata.orderNo+"&isBh="+_this.seachOdata.isBh+"&orderField="+_this.seachOdata.orderField+"&productManagerId="+_this.seachOdata.productManagerId+"&supplierId="+_this.seachOdata.supplierId+"&brandId="+_this.seachOdata.brandId+"&skuCode="+_this.seachOdata.skuCode+"&phone="+_this.seachOdata.phone+"&consignee="+_this.seachOdata.consignee+"&productName="+_this.seachOdata.productName+"&stime="+_this.seachOdata.stime+"&etime="+_this.seachOdata.etime+"&currentPage="+_this.seachOdata.currentPage
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
	    		if (reg.test(val)){_length=parseInt(_length*0.9)}
	  			fontAttr.push(_length);
	  		})
	  		let Max = fontAttr.sort((a,b)=>{return b-a});
	  		column.minWidth = 17*(Max[0])<100?120:17*(Max[0]);
		 		return h('div',{class:'table-head',style:{width:'100%'}},[column.label])
  		}
  	}
	}
}
</script>