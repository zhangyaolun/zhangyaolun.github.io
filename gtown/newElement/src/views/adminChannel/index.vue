<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
	    <el-row class="panel-group pz" :gutter="40">
	    	
	    	<div class="navList clear">
	    		<select-seach :author="seach" :seachList='seachList' @seachListEvent='seachValue'></select-seach>
	    		<div class="clear right lineBtn">
	    			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0" @click="seachClick()">搜索</el-button>
				  	<el-button type="info" icon="el-icon-edit" class="pan-btn yellow-btn mleft0" @click="resetForm('ruleForm')">新增</el-button>
				  	<el-button type="danger" icon="el-icon-delete" class="pan-btn pink-btn mleft0" @click="channelDel">删除</el-button>
			  	</div>
	    	</div>
		    <el-table ref="multipleTable" border stripe :data="tableData" style="width: 100%;margin: 20px 0 40px 0;text-align: center;" @selection-change="handleSelectionChange" empty-text='暂无数据'>
			    <el-table-column type="selection" width="55">
			    </el-table-column>
			    <el-table-column label="渠道编号">
			      <template slot-scope="scope">{{ scope.row.channelCode }}</template>
			    </el-table-column>
			    <el-table-column prop="channelName" label="渠道名称" min-width="200px">
			    </el-table-column>
			    <el-table-column label="渠道类型">
			    	<template slot-scope="scope">{{ scope.row.channelType | channelTypeName}}</template>
			    </el-table-column>
			    <el-table-column label="订单审核">
			    	<template slot-scope="scope">{{ scope.row.orderEnable | channelEnableName}}</template>
			    </el-table-column>
			    <el-table-column label="经营类型">
			    	<template slot-scope="scope">{{ scope.row.managementType | managementName}}</template>
			    </el-table-column>
			    <el-table-column prop="priority" label="发货优先级">
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button type="text" size="small" @click='modClick(scope)'>编辑</el-button>
			      </template>
			    </el-table-column>
		   	</el-table>
		   	
		    <el-dialog title="渠道信息" :visible.sync="dialogTableVisible" style="margin-bottom: 50px;">
		      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="w100 demo-ruleForm clear">
		      	<div class="left w50">
		      		<el-form-item label="渠道编号" prop="channelCode">
						    <el-input v-model="ruleForm.channelCode" :disabled="codeDisabled" placeholder="请输入渠道编号"></el-input>
						  </el-form-item>
						  <el-form-item label="渠道名称" prop="channelName">
						    <el-input v-model="ruleForm.channelName" placeholder="请输入渠道名称"></el-input>
						  </el-form-item>
						  <el-form-item label="渠道类型" prop="channelType">
						    <el-select v-model="ruleForm.channelType">
						      <el-option label="分期" value="1"></el-option>
						      <el-option label="集采" value="2"></el-option>
						      <el-option label="积分" value="3"></el-option>
						      <el-option label="员工福利" value="4"></el-option>
						      <el-option label="其他" value="5"></el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item label="经营类型" prop="managementType">
						    <el-select v-model="ruleForm.managementType">
						      <el-option label="供货" value="1"></el-option>
						      <el-option label="入驻" value="2"></el-option>
						      <el-option label="自营" value="3"></el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item label="订单审核" prop="orderEnable">
						    <el-radio-group v-model="ruleForm.orderEnable">
							    <el-radio :label="1">是</el-radio>
							    <el-radio :label="0">否</el-radio>
							  </el-radio-group>
						  </el-form-item>
		      	</div>
		      	<div class="right w50">
							  <el-form-item label="发货优先级" prop="priority">
							    <el-input v-model="ruleForm.priority" placeholder="请输入发货优先级"></el-input>
							  </el-form-item>
							  <el-form-item label="发货周期" prop="shipDate">
							    <el-input v-model="ruleForm.shipDate" placeholder="请输入发货周期,单位：天，如：1"></el-input>
							  </el-form-item>
							  <el-form-item label="商品匹配规则" prop="matchStrategy">
							    <el-select v-model="ruleForm.matchStrategy">
							      <el-option label="SKU匹配" value="0"></el-option>
							      <el-option label="SPU+属性匹配" value="1"></el-option>
							    </el-select>
							  </el-form-item>
							   <el-form-item label="虚拟商品是否直接发货" prop="fictitiousIsDeliver">
							    <el-radio-group v-model="ruleForm.fictitiousIsDeliver">
								    <el-radio :label="true">是</el-radio>
								    <el-radio :label="false">否</el-radio>
								  </el-radio-group>
							  </el-form-item>
		      	</div>
		      	<div class="w100Over checkboxlogistics">
		      			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							  <div style="margin: 15px 0;"></div>
							  <el-checkbox-group v-model="ruleForm.logistics" @change="handleCheckedCitiesChange">
							    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
							  </el-checkbox-group>
						</div>
		      	<div class="w100Over center">
			      	<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
		      	</div>
					</el-form>
		    </el-dialog>
		    
		    <el-tooltip placement="top" content="回到顶部">
		      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
		    </el-tooltip>
		    
		  </el-row>
	  </div>
  </div>
</template>

<script>
import { channelList,channelAddChannel,channelModChannel,channelDelChannel } from '@/service/getData'
import { checkPhone,checkCount,checkPrice } from '@/utils/validate'
import selectSeach from '@/components/seachCondition/select'
import BackToTop from '@/components/BackToTop'

export default {
  data() {
	  return {
	  	checkAll: false,
	    cities: ['虚拟发货','顺丰','EMS','申通','圆通','中通','百世汇通','韵达','宅急送','天天','安能','京东','德邦','全峰','快捷','速尔快递','国通快递','万象','邮政包裹/平邮','联邦','苏宁快递','新邦','中铁物流','中铁快运','优速','跨越'],
	    isIndeterminate: false,
	  	seach:[
		  	{key:'',value:'全部'},
		  	{key:'1',value:'分期'},
		  	{key:'2',value:'集采'},
		  	{key:'3',value:'积分'},
		  	{key:'4',value:'员工福利'},
		  	{key:'5',value:'其他'}
	  	],
	  	seachList:{name:'渠道',value:''},// 搜索框传入值
	  	oDataInfo:{
	  		channelType:''
	  	},//查询条件值
	    tableData: [],//查询数据
	    multipleSelection: [],//查询数据选择变更
	    dialogTableVisible: false,//新增弹框显示
	    addmodFalg:false,//添加与编辑判断   true新增
	    modId:'',//编辑数据id
	    codeDisabled:'',//渠道编号禁用
	    delData:{'idList':''},//删除提交的id
	    ruleForm: {
	    	channelCode:'',
	      channelName: '',
	      channelType: '1',
	      orderEnable: 0,
	      managementType: '1',
	      priority: '',
	      logistics: [],//物流
	      fictitiousIsDeliver: false,
	      shipDate: '',
	      matchStrategy: '0',
	    },
	    rules: {
	      channelCode: [{ required: true,message: '请输入渠道编号', trigger: 'change' }],
	      channelName: [{ required: true,message: '请输入渠道名称', trigger: 'change' }],
	      priority: [{ required: true,message: '请输入发货优先级', trigger: 'change' }],
	      shipDate: [{ required: true,message: '请输入发货周期', trigger: 'change' }],
	    },
	    channelAttr:['','分期','集采','积分','员工福利','其他'],
	    orderAttr:['否','是'],
	    managementAttr:['','供货','入驻','自营']
	  }
	},
  components: { BackToTop,selectSeach },
  filters:{
  	channelTypeName:function(v){
  		let channelAttr = ['','分期','集采','积分','员工福利','其他'];
  		return v?channelAttr[v]:'';
  	},
  	channelEnableName:function(v){
  		let orderAttr = ['否','是'];
  		return v?orderAttr[v]:'否';
  	},
  	managementName:function(v){
  		let managementAttr = ['','供货','入驻','自营'];
  		return v?managementAttr[v]:'';
  	},
  },
  created(){
  	this.dataInfo();
  },
  watch:{
  	ruleForm:{
        handler:function(val,oldval){
        	
        },
        deep:true
    },
  },
  methods: {
  	handleCheckAllChange(val) {
  		this.ruleForm.logistics = val ? this.cities : [];
      this.isIndeterminate = false;
	  },
	  handleCheckedCitiesChange(value) {
	  	let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	  },
  	dataInfo(){
  		let _this = this;
	  	channelList(_this.oDataInfo).then(response => {
	    		if(response.result){
	    			_this.tableData = [];
	    			response.result.forEach((v,k) => {
	    				_this.tableData.push(v);
	    			})
	    		}else{
	    			_this.tableData = [];
	    		}
	    })
  	},
  	seachValue(val) {//搜索框选择的值
  		this.oDataInfo.channelType = val.value;
	  },
	  seachClick(val) {//点击查询
  		this.dataInfo();
	  },
	  handleSelectionChange(val) {//表格选择（勾选）
	    this.multipleSelection = val;
	  },
	  channelDel() {//点击删除 
	  	let _this = this;
	    if(_this.multipleSelection.length == 0){
	    	_this.$message({message: '请选择您要删除的数据',type: 'warning'});
	    }else{
	    	_this.delData.idList = '';
	    	_this.multipleSelection.forEach((v,k) => {
	    		_this.delData.idList += v.id+',';
	    	})
	    	_this.delData.idList = _this.delData.idList.substr(0, _this.delData.idList.length - 1);
	    	_this.delAlert().then(data => {
	    		channelDelChannel(_this.delData).then(response => {
      			if(response){
      				_this.resAlert(response.msg).then(()=>{
	      				_this.dialogTableVisible = false;
  							_this.dataInfo();
	      			});
      			}
			    })
			  }).catch(error => {})
	    }
	  },
	  submitForm(formName) {//新增 编辑  提交确定
	  	let _this = this;
	    _this.$refs[formName].validate((valid) => {
	      if (valid) {
			  	_this.msgAlert().then(data => {
			  		_this.ruleForm.logistics = _this.ruleForm.logistics.join('|');
			  		if(_this.addmodFalg){//新增
		      		channelAddChannel(_this.ruleForm).then(response => {
		      			if(response){
		      				_this.resAlert(response.msg).then(()=>{
			      				_this.dialogTableVisible = false;
		  							_this.dataInfo();
			      			});
		      			}else{
		      				_this.ruleForm.logistics = _this.ruleForm.logistics.split('|');
		      			}
					    })
		      	}else{//编辑 
		      		channelModChannel(_this.ruleForm).then(response => {
		      			if(response){
		      				_this.resAlert(response.msg).then(()=>{
				      			_this.dialogTableVisible = false;
				      			_this.ruleForm.logistics = [];
			  						_this.dataInfo();
			      			});
		      			}else{
		      				_this.ruleForm.logistics = _this.ruleForm.logistics.split('|');
		      			}
					    })
		      	}
			  	}).catch(error => {})
	      } else {
	      	_this.$message({message: '请审核信息',type: 'warning'});
	        return false;
	      }
	    });
	  },
	  modClick(data) {//点击编辑
	  	let _this = this;
	  	let _row = data.row;
  		_this.addmodFalg = false;
  		_this.codeDisabled = true;
  		_this.ruleForm.id = _row.id;
  		_this.ruleForm.channelCode = _row.channelCode;
  		_this.ruleForm.channelName = _row.channelName;
  		_this.ruleForm.channelType = _row.channelType?_row.channelType+"":'1';
  		_this.ruleForm.matchStrategy = _row.matchStrategy?_row.matchStrategy+"":'0';
  		_this.ruleForm.managementType = _row.managementType?_row.managementType+"":'1';
  		_this.ruleForm.priority = _row.priority;
  		_this.ruleForm.orderEnable = _row.orderEnable;
  		_this.ruleForm.logistics = _row.logistics?_row.logistics.split('|'):[];
  		_this.ruleForm.fictitiousIsDeliver = _row.fictitiousIsDeliver;
  		_this.ruleForm.shipDate = _row.shipDate;
  		_this.dialogTableVisible = true;
	  },
	  resetForm(formName) {//点击新增
	  	let _this = this;
	    _this.addmodFalg = true;
  		_this.codeDisabled = false;
  		if(_this.$refs['ruleForm'] != undefined){
	  		_this.$refs['ruleForm'].resetFields();
	  	} 
	    delete _this.ruleForm.id;
	    _this.ruleForm.channelCode = '';
  		_this.ruleForm.channelName = '';
  		_this.ruleForm.channelType = '1';
  		_this.ruleForm.matchStrategy = '0';
  		_this.ruleForm.managementType = '1';
  		_this.ruleForm.priority = '';
  		_this.ruleForm.orderEnable = 0;
  		_this.ruleForm.logistics = [];
  		_this.ruleForm.fictitiousIsDeliver = false;
  		_this.ruleForm.shipDate = '';
	  	_this.dialogTableVisible = true;
	  }
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.selectBox{
	white-space: nowrap;
	display: inline-block;
	width: 30%;
	.selectName{
		width: 30%;
	    font-size: 14px;
	    color: #909399;
	    font-weight: 600;
	    display: inline-block;
	}
}
.navBtn{
	width: 30%;
}
.el-checkbox-group label{
	width:120px !important;
	text-align: left !important;
	margin: 0 !important;
}
.checkboxlogistics{
	border: 1px dashed #ccc;
  padding: 20px;
  margin-bottom: 40px;
}

</style>