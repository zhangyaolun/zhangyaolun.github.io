<template>
  <div class="dashboard-container">
  	
    <input-agg :seachlist="seach" @inputaggValue="inputaggval"></input-agg>
    
    <div class="lineBtn clear">
			<el-button type="primary" class="pan-btn tiffany-btn mleft10 mt15 left" @click="moreModClick()">批量上传商品费率</el-button>
			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0 mt15 right" @click="seachClick()">搜索</el-button>
  	</div>
    
    <div class="tableEl">
    	<el-table border stripe :data="tableData" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium">
    		<el-table-column type="index" fixed="left" :index="indexMethod"  v-if="paginationFalg"></el-table-column>
    		
		    <el-table-column v-for="(item,index) in tableColumn" :label="item.label" :prop="item.prop" :key="index" :render-header="labelHead" :show-overflow-tooltip="true" v-if="paginationFalg"></el-table-column>
		    <el-table-column fixed="right" label="操作" width="100" v-if="paginationFalg">
		      <template slot-scope="scope">
			      	<el-button class='cancel-btn' size="mini" plain round type="info" @click="modClick(scope.row)">修改费率</el-button>
		      </template>
		    </el-table-column>
	   	</el-table>
    </div>
    
    <!--详情-->
    <el-dialog
		  :visible.sync="dialogVisible"
		  width="30%"
		  title="修改费率"
		  :before-close="dialogClose" class="mb40">
		  <el-card class="box-card">
			  <div class="text item modOld">
			    <el-table border stripe :data="modOldSeachData" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium">
				    <el-table-column v-for="(item,index) in modOldColumn" :label="item.label" :prop="item.prop" :key="index" show-overflow-tooltip width="200"></el-table-column>
				    <el-table-column label="费率" width="110" fixed="right">
		      		<template slot-scope="scope">
				      	<template v-if="scope.row.edit">
			            <el-input class="edit-input" size="small" v-model="scope.row.orderModRate"><template slot="append">%</template></el-input>
			          </template>
			        	<span v-else>{{ scope.row.orderModRate }}</span>
			        </template>
			      </el-table-column>
			      <el-table-column label="操作" width="200" fixed="right">
			        <template slot-scope="scope">
			        	<el-button type="success" plain size="small" icon="el-icon-circle-check-outline" @click="modOldEdit(scope.row)" v-if="scope.row.edit">确定</el-button>
	          		<el-button class='cancel-btn' plain size="small" icon="el-icon-refresh" type="warning" @click="modOldFalseEdit(scope.row)" v-if="scope.row.edit">取消</el-button>
	          		<el-button v-if="!scope.row.edit" type="info" plain @click='modOld(scope.row)' size="small" icon="el-icon-edit">编辑</el-button>
			        </template>
			      </el-table-column>
			   	</el-table>
			  </div>
			</el-card>
			<el-card class="box-card mt40">
			  <div class="text item modOld">
			    <el-table border stripe :data="modNewSeachData" style="width: 99.99%;text-align: center;" empty-text='暂无数据' size="medium" show-overflow-tooltip>
				    <el-table-column label="渠道商品编号" prop="channelSkuCode" min-width="120px"></el-table-column>
				    <el-table-column label="商品SKU编号" prop="skuCode" min-width="120px"></el-table-column>
				    <el-table-column label="商品名称" prop="productName" min-width="400px"></el-table-column>
				    <el-table-column label="产品经理" prop="productManager" min-width="100px"></el-table-column>
				    <el-table-column label="商品单价" prop="priceVal" min-width="100px"></el-table-column>
				    <el-table-column label="费率" width="110" fixed="right">
		      		<template slot-scope="scope">
			            <el-input class="edit-input" size="small" v-model="scope.row.orderModRate"><template slot="append">%</template></el-input>
			        </template>
			      </el-table-column>
			   	</el-table>
			  </div>
			  <div class="center w100 mt40">
			  	<el-button type="success" plain size="small" icon="el-icon-circle-check-outline" @click="modNewEdit">确定</el-button>
			  </div>
			</el-card>
		</el-dialog>
    
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
import { searchRateExOrderByPro,modOrderDetail,modOrder,detailListByOrderId } from '@/service/getData'
import { parseTime } from '@/utils/index'
import { checkNotEmpty } from '@/utils/validate'
import BackToTop from '@/components/BackToTop'
import inputAgg from '@/components/seachCondition/inputAgg'

export default {
  data() {
	  return {
	  	dialogVisible:false,
	  	paginationFalg:false,//分页显示
	  	totalCount:0,//总数
	  	seach:['channelOrderNo','orderNo','phone','consignee','picker'
	  	],//查询条件显示
	  	seachData:{
	  		'channelOrderNo':'', //渠道订单编号
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
	  		{label:'渠道订单号',prop:'channelOrderNo'},
	  		{label:'OMS订单号',prop:'orderNo'},
	  		{label:'订单状态',prop:'o_orderStatusVal'},
	  		{label:'收货人',prop:'consignee'},
	  		{label:'联系电话',prop:'phone'},
	  		{label:'地址',prop:'address'},
	  		{label:'订单价格',prop:'orderTotalVal'},
	  		{label:'导单时间',prop:'channelOrderCreateTimeVal'},
	  		{label:'是否换货',prop:'isReVal'}
	  	],//查询数据展示
	  	orderStatusList:[],//订单状态
	  	modOldColumn:[
	  		{label:'销售渠道',prop:'channelName'},
	  		{label:'渠道订单号',prop:'channelOrderNo'},
	  		{label:'OMS订单号',prop:'orderNo'},
	  		{label:'订单价格',prop:'orderTotalVal'},
	  		{label:'订单创建时间',prop:'channelOrderCreateTimeVal'}
	  	],
	  	modOldSeachData:[],
	  	modNewSeachData:[],
	  	modOrderData:{'ids':'','pros':'','modType':1},//操作退款请求数据
	  }
	},
	components: { inputAgg,BackToTop },
	mounted(){
    this.orderStatusList = JSON.parse(sessionStorage.getItem('orderStatus'));
    this.seachOdata = JSON.parse(JSON.stringify(this.seachData));
		this.dataInfo();
	},
  methods: {
  	dataInfo(){//数据请求
  		let _this = this;
  		searchRateExOrderByPro(_this.seachOdata).then(response => {
  			_this.tableData = [];
				if(response && (response.result.reslutList.length>0)){
					response.result.reslutList.forEach((v,k)=>{
						v.channelOrderCreateTime?v.channelOrderCreateTimeVal=parseTime(v.channelOrderCreateTime):v.channelOrderCreateTimeVal='';
						v.orderTotal != null?v.orderTotalVal=(v.orderTotal/100).toFixed(2):v.orderTotalVal='0.00';
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
  	inputaggval(val){//条件输入
  		this.seachData.channelOrderNo = val.channelOrderNo; 
  		this.seachData.orderNo = val.orderNo;    
  		this.seachData.phone = val.phone;   
  		this.seachData.consignee = val.consignee;    
  		this.seachData.stime = val.picker.minval;   
  		this.seachData.etime = val.picker.maxval;   
  	},
  	moreModClick(){//批量上传商品费率
  		let _this = this;
	    
  	},
  	modClick(row){//订单操作修改费率
  		let _this = this;
  		//原订单
  		this.modOldSeachData = [];
  		let _row = JSON.parse(JSON.stringify(row));
  		_row.orderModRate = (_row.orderRate*100).toFixed(0);
  		_row.edit = true;
  		this.modOldSeachData.push(_row);
  		//子订单
  		detailListByOrderId({id:row.id}).then(response => {
  			_this.modNewSeachData = [];
				if(response && (response.result.listDetail.length>0)){
					response.result.listDetail.forEach((v,k)=>{
						v.orderModRate = '';
						v.price != null?v.priceVal=(v.price/100).toFixed(2):v.priceVal='0.00';
		  			_this.modNewSeachData.push(v);
			  	})
				}
      })
  		this.dialogVisible = true;
  	},
  	modNewEdit(){//子订单修改费率
  		let _this = this,falg=true;
  		_this.modOrderData.ids='';
  		_this.modOrderData.pros='';
  		_this.modNewSeachData.forEach((v,k)=>{
  			if(!checkNotEmpty(v.orderModRate)){
  				falg=false;
  			}else{
  				_this.modOrderData.ids += v.id+',';
  				_this.modOrderData.pros += (v.orderModRate/100).toFixed(2)+',';
  			}
  		})
  		if(!falg){this.$message({message: '请输入费率',type: 'warning'});return;}
  		_this.modOrderData.ids = _this.modOrderData.ids.substr(0, _this.modOrderData.ids.length - 1); 
			_this.modOrderData.pros = _this.modOrderData.pros.substr(0, _this.modOrderData.pros.length - 1); 
			_this.msgAlert().then(() => {
	  		modOrderDetail(_this.modOrderData).then(response => {
		  			if(response){
		  				_this.resAlert(response.msg).then(()=>{
		  					this.dataInfo();
	      			});
		  			}
			    })
	  	}).catch(error => {})
  	},
  	modOld(row){//订单修改费率编辑
  		row.orderModRate = (row.orderRate*100).toFixed(0);
  		row.edit = !row.edit
  	},
  	modOldEdit(row){//原订单修改费率确定
  		if(this.modOldSeachData[0].orderModRate == ''){
  			this.$message({message: '请输入费率',type: 'warning'});
  			return;
  		}
  		this.modOrderFun();
  	},
  	modOldFalseEdit(row){//原订单修改费率取消
  		row.orderModRate = row.orderRate*100 + '%';
  		row.edit = false;
  	},
  	modOrderFun(){//原订单修改费率
  		let _this = this;
  		let _data = {
  			id:_this.modOldSeachData[0].id,
  			orderRate:(_this.modOldSeachData[0].orderModRate/100).toFixed(2)
  		}
  		_this.msgAlert().then(() => {
	  		modOrder(_data).then(response => {
		  			if(response){
		  				_this.resAlert(response.msg).then(()=>{
		  					_this.modOldSeachData[0].orderRate = _data.orderRate;
		  					_this.modOldSeachData[0].orderModRate = _this.modOldSeachData[0].orderRate*100 + '%';
		  					_this.modOldTa(_data.id,_data.orderRate);
  							_this.modOldSeachData[0].edit = false;
	      			});
		  			}else{
		  				_this.modOldSeachData[0].edit = true;
		  				_this.modOldSeachData[0].orderModRate = (_this.modOldSeachData[0].orderRate*100).toFixed(0);
		  			}
			    })
	  	}).catch(error => {})
  	},
  	modOldTa(id,data){//原订单修改费率原数据更新
  		let _this = this;
  		_this.tableData.forEach((v,k)=>{
  			if(v.id == id){
  				v.orderRate = data;
  			}
  		})
  	},
  	dialogClose(){//详情关闭
  		this.dialogVisible = false;
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
  			console.log(fontAttr)
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