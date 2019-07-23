<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
	    <el-row class="panel-group pz" :gutter="40">
	    	
	    	<div class="navList">
	    		<div class="mt15 mleft10 lineBtn">
				  	<el-button type="info" icon="el-icon-edit" class="pan-btn yellow-btn " @click="addClick('ruleForm')">新增</el-button>
			  	</div>
	    	</div>
	    	
		    <el-table ref="multipleTable" border stripe :data="tableData" fit style="width: 100%;margin: 20px 0 40px 0;text-align: center;" empty-text='暂无数据'>
			    <el-table-column label="Key">
			      <template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.appKey"></el-input>
		          </template>
		          <span v-else>{{ scope.row.appKey }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column label="Value">
			    	<template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.appValue"></el-input>
		          </template>
		          <span v-else>{{ scope.row.appValue }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column label="描述">
			    	<template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.description"></el-input>
		          </template>
		          <span v-else>{{ scope.row.description }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column fixed="right" label="操作" width='200'>
			      <template slot-scope="scope">
			      	<el-button v-if="scope.row.edit" type="success" plain @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
          		<el-button v-if="scope.row.edit" class='cancel-btn' plain size="small" icon="el-icon-refresh" type="warning" @click="confirmCancel(scope.row)">取消</el-button>
          		<el-button v-if="!scope.row.edit" type="info" plain @click='modEdit(scope.row)' size="small" icon="el-icon-edit">编辑</el-button>
			      </template>
			    </el-table-column>
		   	</el-table>
		   
		    <el-dialog title="新增参数" :visible.sync="dialogTableVisible" style="margin-bottom: 50px;">
		      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="w100Over demo-ruleForm clear">
		      	<div class="w100Over">
		      		<el-form-item label="Key" prop="appKey">
						    <el-input v-model="ruleForm.appKey" placeholder="请输入Key" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="Value" prop="appValue">
						    <el-input v-model="ruleForm.appValue" placeholder="请输入Value" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="描述" prop="description">
						    <el-input v-model="ruleForm.description" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" class='w60'></el-input>
						  </el-form-item>
		      	</div>
		      	<div class="w100Over center mt40">
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
import { sysConfigSearch,sysConfigCreateOrUpdate } from '@/service/getData'
import BackToTop from '@/components/BackToTop'
import {checkNotEmpty} from '@/utils/validate'

export default {
  data() {
	  return {
	    tableData: [],//查询数据
	    dialogTableVisible: false,//新增弹框显示
	    ruleForm: {
	    	id:'',
	    	appKey:'',
	      appValue: '',
	      description: '',
	    },
	    rules: {
	      appKey: [{ required: true, message: '请输入Key', trigger: 'change' }],
	      appValue: [{ required: true, message: '请输入Value', trigger: 'change' }],
	      description: [{ required: true, message: '请输入描述', trigger: 'change' }]
	    },
	    configId: {},//编辑选中的数据
	  }
	},
  components: { BackToTop },
  created(){
  	this.dataInfo();
  },
  methods: {
  	dataInfo(){//查询数据
  		let _this = this;
	  	sysConfigSearch().then(response => {
	    		if(response.result && (response.result.length>0)){
	    			_this.tableData = [];
	    			response.result.forEach((v,k) => {
	    				v.edit = false;
	    				_this.tableData.push(v);
	    			})
	    		}else{
	    			_this.tableData = [];
	    		}
	    })
  	},
	  submitForm(formName) {//新增   提交确定
	  	let _this = this;
	    _this.$refs[formName].validate((valid) => {
	      if (valid) {
			  	_this.msgAlert().then(() => {
			  		sysConfigCreateOrUpdate(_this.ruleForm).then(response => {
			    		if(response.result){
			  				_this.resAlert('添加成功').then(()=>{
		      				_this.dialogTableVisible = false;
	  							_this.dataInfo();
		      			});
			  			}else{
			  				_this.resAlert('添加失败','warning');
			  			}
				    })
			  	}).catch(error => {})
	      } else {
	      	_this.resAlert('请审核信息','warning');
	        return false;
	      }
	    });
	  },
	  addClick(formName) {//新增
	  	let _this = this;	
	  	_this.ruleForm.roleName = '';
	  	_this.ruleForm.roleType = 0;
	  	_this.dialogTableVisible = true;
	  },
	  modEdit(row) {//编辑点击
	  	this.configId = JSON.parse(JSON.stringify(row));//编辑
	  	row.edit = !row.edit;
	  },
	  confirmEdit(row) {//编辑 确定
	  	let _this = this;
	  	let _data = {
	  		id:row.id,
	  		appKey:row.appKey,
	  		appValue:row.appValue,
	  		description:row.description
	  	};
	  	if(!checkNotEmpty(_data.appKey)){_this.resAlert('Key不能为空','warning');return;}
	  	if(!checkNotEmpty(_data.appValue)){_this.resAlert('Value不能为空','warning');return;}
	  	if(!checkNotEmpty(_data.description)){_this.resAlert('描述不能为空','warning');return;}
	  	sysConfigCreateOrUpdate(_data).then(response => {
    		response.result?response.msg='修改成功':response.msg='修改失败';
				_this.resAlert(response.msg).then(()=>{
				  row.edit = false;
  			});
	    })
	  },
	  confirmCancel(row){//编辑 取消
			row.appKey = this.configId.appKey;
			row.appValue = this.configId.appValue;
			row.description = this.configId.description;
			row.edit = false;
	  }
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navBtn{
	width: 30%;
}
.w100Over label.width {
	width: 220px !important;
}
.w100Over label{
	width: 120px !important;
	text-align: left !important;
	margin: 0 !important;
}
.Actlevel{ color: #409EFF;}
</style>