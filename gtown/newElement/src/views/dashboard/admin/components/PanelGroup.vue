<template>
  <el-row class="panel-group pz" :gutter="40">
  	<div class="clear lineBtn">
			<el-button type="danger" icon="el-icon-delete" class="pan-btn pink-btn right" @click="channelDel">删除</el-button>
  		<el-button type="info" icon="el-icon-edit" class="pan-btn yellow-btn right" @click="resetForm('ruleForm')">新增</el-button>
  	</div>
  	
    <el-table ref="multipleTable" border stripe :data="tableData3" style="width: 100%;margin: 20px 0 40px 0;text-align: center;" @selection-change="handleSelectionChange" empty-text='暂无数据'>
	    <el-table-column type="selection" width="55">
	    </el-table-column>
	    <el-table-column label="渠道编号">
	      <template slot-scope="scope">{{ scope.row.channelCode }}</template>
	    </el-table-column>
	    <el-table-column prop="channelName" label="渠道名称" min-width="200px">
	    </el-table-column>
	    <el-table-column prop="transmission" label="传输方式">
	    </el-table-column>
	    <el-table-column prop="filePrefix" label="文件前缀">
	    </el-table-column>
	    <el-table-column prop="route" label="获取路径">
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
    
    <el-dialog title="渠道订单信息" :visible.sync="dialogTableVisible" style="margin-bottom: 50px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="w100 demo-ruleForm clear">
      	<div class="left w50">
      		<el-form-item label="渠道编号" prop="channelCode" >
				    <el-input v-model="ruleForm.channelCode" :disabled="codeDisabled" placeholder="请输入渠道编号"></el-input>
				  </el-form-item>
				  <el-form-item label="渠道名称" prop="channelName">
				    <el-input v-model="ruleForm.channelName" placeholder="请输入渠道名称"></el-input>
				  </el-form-item>
				  <el-form-item label="传输方式" prop="transmission">
				    <el-select v-model="ruleForm.transmission">
				      <el-option label="execl" value="execl"></el-option>
				      <el-option label="txt" value="txt"></el-option>
				      <el-option label="api" value="api"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="文件前缀" prop="filePrefix">
				    <el-input v-model="ruleForm.filePrefix" placeholder="请输入文件前缀"></el-input>
				  </el-form-item>
				  <el-form-item label="获取目录" prop="route">
				    <el-input v-model="ruleForm.route" placeholder="请输入获取目录"></el-input>
				  </el-form-item>
				  <el-form-item label="订单号" prop="json.orderld">
				    <el-input v-model="ruleForm.json.orderld" placeholder="请输入订单号"></el-input>
				  </el-form-item>
				  <el-form-item label="总价" prop="json.total">
				    <el-input v-model="ruleForm.json.total" placeholder="请输入总价"></el-input>
				  </el-form-item>
				  <el-form-item label="下单时间">
				      <el-form-item prop="json.orderTime">
				        <el-date-picker type="date" placeholder="请选择下单时间" v-model="ruleForm.json.orderTime" style="width: 100%;"></el-date-picker>
				      </el-form-item>
				  </el-form-item>
				  <el-form-item label="收货人姓名" prop="json.userNanme">
				    <el-input v-model="ruleForm.json.userNanme" placeholder="请输入收货人姓名"></el-input>
				  </el-form-item>
				  <el-form-item label="商品编号" prop="json.itemCode">
				    <el-input v-model="ruleForm.json.itemCode" placeholder="请输入商品编号"></el-input>
				  </el-form-item>
      	</div>
      	<div class="right w50">
      		<el-form-item label="商品规格" prop="json.itemPpecs">
				    <el-input v-model="ruleForm.json.itemPpecs" placeholder="请输入商品规格"></el-input>
				  </el-form-item>
				  <el-form-item label="省" prop="json.province">
				    <el-input v-model="ruleForm.json.province" placeholder="请输入省"></el-input>
				  </el-form-item>
				  <el-form-item label="市" prop="json.city">
				    <el-input v-model="ruleForm.json.city" placeholder="请输入市"></el-input>
				  </el-form-item>
				  <el-form-item label="区" prop="json.area">
				    <el-input v-model="ruleForm.json.area" placeholder="请输入区"></el-input>
				  </el-form-item>
				  <el-form-item label="数量" prop="json.count">
				    <el-input type="number" v-model="ruleForm.json.count" placeholder="请输入数量"></el-input>
				  </el-form-item>
				  <el-form-item label="单价" prop="json.price">
				    <el-input v-model="ruleForm.json.price" placeholder="请输入单价"></el-input>
				  </el-form-item>
				  <el-form-item label="收货地址" prop="json.address">
				    <el-input v-model="ruleForm.json.address" placeholder="请输入收货地址"></el-input>
				  </el-form-item>
				  <el-form-item label="邮编" prop="json.zipCode">
				    <el-input v-model="ruleForm.json.zipCode" placeholder="请输入邮编"></el-input>
				  </el-form-item>
				  <el-form-item label="发票" prop="json.invoice">
				    <el-input v-model="ruleForm.json.invoice" placeholder="请输入发票"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号码" prop="phone">
				    <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
				  </el-form-item>
      	</div>
      	<div class="w100Over">
	      	<el-form-item label="订单备注" prop="json.remark">
					  <el-input type="textarea" v-model="ruleForm.json.remark" placeholder="请输入订单备注"></el-input>
					</el-form-item>
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
</template>

<script>
import { channelProList,addchannelPro,modchannelPro,delchannelPro,widgetOrderStatus } from '@/service/getData'
import { checkPhone,checkCount,checkPrice } from '@/utils/validate'
import BackToTop from '@/components/BackToTop'

export default {
	 data() {
	  return {
	    tableData3: [],//查询数据
	    multipleSelection: [],//查询数据选择变更
	    dialogTableVisible: false,//新增弹框显示
	    addmodFalg:false,//添加与编辑判断   true新增
	    modId:'',//编辑数据id
	    codeDisabled:'',//渠道编号禁用
	    delData:{'idList':''},//删除提交的id
	    ruleForm: {
	      channelCode: '',
	      channelName: '',
	      transmission: 'execl',
	      filePrefix: '',
	      route: '',
	      json: {
	      	orderld:'',
	      	total:0,
	      	orderTime:'',
	      	userNanme:'',
	      	itemCode:'',
	      	phone:'',
	      	itemPpecs:'',
	      	province:'',
	      	city:'',
	      	area:'',
	      	count:'',
	      	price:0,
	      	address:'',
	      	zipCode:'',
	      	invoice:'',
	      	remark:''
	      }
	    },
	    rules: {
	      channelCode: [
	        { required: true, message: '请输入渠道编号', trigger: 'change' }
	      ],
	      phone: [
	        { required: false,validator:checkPhone, trigger: 'change' }
	      ],
	      count: [
	        { required: false,validator:checkCount, trigger: 'change' }
	      ],
	    }
	  }
	},
  components: { BackToTop },
  created(){
  	this.dataInfo();
  	widgetOrderStatus().then(response => {
    		if(response && response.result){
    			sessionStorage.setItem('orderStatus',JSON.stringify(response.result));
    		}
    })
  },
  watch:{
  	ruleForm:{
        handler:function(val,oldval){
        	let check = (value) => {
        		if(value){
	        		setTimeout(function(){value = checkPrice(value);},10)
	        	}
        	}
        	if(val.json.count){
        		setTimeout(function(){val.json.count = checkCount(val.json.count);},10)
        	}
        	if(val.json.total){
        		setTimeout(function(){val.json.total = checkPrice(val.json.total);},10)
        	}
        	if( val.json.price){
        		setTimeout(function(){val.json.price = checkPrice(val.json.price);},10)
        	}
        },
        deep:true
    },
  },
  methods: {
  	dataInfo(){
  		let _this = this;
	  	channelProList().then(response => {
	    		if(response.result){
	    			_this.tableData3 = [];
	    			response.result.forEach((v,k) => {
	    				_this.tableData3.push(v);
	    			})
	    		}else{
	    			_this.tableData3 = [];
	    		}
	    })
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
	    		delchannelPro(_this.delData).then(response => {
      			if(response.httpCode == 200){
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
			  		_this.ruleForm.json = JSON.stringify(_this.ruleForm.json);
			  		if(_this.addmodFalg){//新增
		      		addchannelPro(_this.ruleForm).then(response => {
		      			if(response.httpCode == 200){
		      				_this.resAlert(response.msg).then(()=>{
			      				_this.dialogTableVisible = false;
		  							_this.dataInfo();
			      			});
		      			}
					    })
		      	}else{//编辑 
		      		modchannelPro(_this.ruleForm).then(response => {
		      			if(response.httpCode == 200){
		      				_this.resAlert(response.msg).then(()=>{
			      				_this.dialogTableVisible = false;
		  							_this.dataInfo();
			      			});
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
	  	let _json = JSON.parse(_row.json);
  		_this.addmodFalg = false;
  		_this.codeDisabled = true;
  		_this.ruleForm.id = _row.id;
  		_this.ruleForm.channelCode = _row.channelCode;
  		_this.ruleForm.channelName = _row.channelName;
  		_this.ruleForm.transmission = _row.transmission;
  		_this.ruleForm.filePrefix = _row.filePrefix;
  		_this.ruleForm.route = _row.route;
  		delete _this.ruleForm.json;
  		_this.ruleForm.json = {};
  		_this.ruleForm.json.orderld = _json.orderld;
  		_this.ruleForm.json.total = _json.total;
  		_this.ruleForm.json.orderTime = _json.orderTime;
  		_this.ruleForm.json.userNanme = _json.userNanme;
  		_this.ruleForm.json.itemCode = _json.itemCode;
  		_this.ruleForm.json.phone = _json.phone;
  		_this.ruleForm.json.itemPpecs = _json.itemPpecs;
  		_this.ruleForm.json.province = _json.province;
  		_this.ruleForm.json.city = _json.city;
  		_this.ruleForm.json.area = _json.area;
  		_this.ruleForm.json.count = _json.count;
  		_this.ruleForm.json.price = _json.price;
  		_this.ruleForm.json.address = _json.address;
  		_this.ruleForm.json.zipCode = _json.zipCode;
  		_this.ruleForm.json.invoice = _json.invoice;
  		_this.ruleForm.json.remark = _json.remark;
  		console.log(_this.ruleForm)
  		_this.dialogTableVisible = true;
	  },
	  resetForm(formName) {//点击新增
	  	let _this = this;
	  	if(typeof _this.ruleForm.json == 'string'){
	  		 _this.ruleForm.json =  JSON.parse(_this.ruleForm.json);
	  	}
	  	if(_this.$refs['ruleForm'] != undefined){
	  		_this.$refs['ruleForm'].resetFields();
	  	}
	    _this.addmodFalg = true;
  		_this.codeDisabled = false;
  		delete _this.ruleForm.id;
  		delete _this.ruleForm.phone;
  		_this.ruleForm.channelCode = '';
  		_this.ruleForm.channelName = '';
  		_this.ruleForm.transmission = 'execl';
  		_this.ruleForm.filePrefix = '';
  		_this.ruleForm.route = '';
  		_this.ruleForm.json.orderld = '';
  		_this.ruleForm.json.total = 0;
  		_this.ruleForm.json.orderTime = '';
  		_this.ruleForm.json.userNanme = '';
  		_this.ruleForm.json.itemCode = '';
  		_this.ruleForm.json.phone = '';
  		_this.ruleForm.json.itemPpecs = '';
  		_this.ruleForm.json.province = '';
  		_this.ruleForm.json.city = '';
  		_this.ruleForm.json.area = '';
  		_this.ruleForm.json.count = '';
  		_this.ruleForm.json.price = 0;
  		_this.ruleForm.json.address = '';
  		_this.ruleForm.json.zipCode = '';
  		_this.ruleForm.json.invoice = '';
  		_this.ruleForm.json.remark = '';
  		console.log(_this.ruleForm)
	  	_this.dialogTableVisible = true;
	  }
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.panel-group {
	margin-top: -15px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .pan-btn{
  	padding: 10px 25px;
  }
}
</style>
