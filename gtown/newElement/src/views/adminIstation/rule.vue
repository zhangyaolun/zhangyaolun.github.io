<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
	    <el-row class="panel-group pz" :gutter="40">
	    	
	    	<div class="clear">
	    		<md-input name="title" placeholder="输入规则名称" v-model="roleName">规则名称</md-input>
	    		<div class="right lineBtn">
	    			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0" @click="seachClick()">搜索</el-button>
				  	<el-button type="info" icon="el-icon-edit" class="pan-btn yellow-btn mleft0" @click="addClick('ruleForm')">新增</el-button>
			  	</div>
	    	</div>
	    	
	    	<el-table ref="multipleTable" border stripe :data="tableData" fit style="width: 100%;margin: 20px 0 40px 0;text-align: center;" empty-text='暂无数据'>
			    <el-table-column label="描述">
			      <template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.remark"></el-input>
		          </template>
		          <span v-else>{{ scope.row.remark }}</span>
		        </template>
			    </el-table-column>
			    <el-table-column label="规则内容">
			    	<template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.roleDetail"></el-input>
		          </template>
		          <span v-else>{{ scope.row.roleDetail }}</span>
		        </template>
			    </el-table-column>
			    <el-table-column fixed="right" label="操作" width='200'>
			      <template slot-scope="scope">
			      	<el-button v-if="scope.row.edit" type="success" plain @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
          		<el-button v-if="scope.row.edit" class='cancel-btn' plain size="small" icon="el-icon-refresh" type="warning" @click="confirmCancel(scope.row)">取消</el-button>
          		<el-button v-if="!scope.row.edit" type="info" plain @click='modEdit(scope.row)' size="small" icon="el-icon-edit">编辑</el-button>
          		<el-button v-if="!scope.row.edit" type="danger" plain @click='delClick(scope.row)' size="small" icon="el-icon-delete">删除</el-button>
			      </template>
			    </el-table-column>
		   	</el-table>
		    
		    <el-dialog title="新增规则" :visible.sync="dialogTableVisible" style="margin-bottom:50px;">
		      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="w100Over demo-ruleForm marginAuto">
		      	<div class="w100Over">
		      		<el-form-item label="规则名称" prop="roleName">
						    <el-input v-model="ruleForm.roleName" placeholder="请输入规则名称" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="描述" prop="remark">
						    <el-input v-model="ruleForm.remark" placeholder="请输入描述"  class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="规则内容" prop="roleDetail">
						    <el-input type='number' v-model="ruleForm.roleDetail" placeholder="请输入规则内容"  class='w60'></el-input>
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
import { ruleEngineFind,ruleEngineDel,ruleEngineAdd,ruleEngineUpdate } from '@/service/getData'
import BackToTop from '@/components/BackToTop'
import {checkNotEmpty} from '@/utils/validate'
import MdInput from '@/components/MDinput'

export default {
  data() {
	  return {
	  	dialogTableVisible:false,
	  	roleName:'',//查询条件
	  	tableData:[],//查询数据
	  	ruleForm:{
	    	roleName:'',
	      remark: '',
	      roleDetail: ''
	    },
	    rules: {
	      roleName: [{ required: true, message: '请输入规则名称', trigger: 'change' }],
	      roleDetail: [{ required: true, message: '请输入规则内容', trigger: 'change' }]
	    },
	    ruleData:{},//选中的数据
	  }
	},
  components: { BackToTop,MdInput },
  filters:{
  	
  },
  created(){
  	
  },
  methods: {
  	modEdit(row) {//编辑
  		this.ruleData.roleName = row.roleName;
  		this.ruleData.remark = row.remark;
  		this.ruleData.roleDetail = row.roleDetail;
  		row.edit = !row.edit;
	  },
  	seachClick(){//查询数据
  		let _this = this;
  		if(!checkNotEmpty(_this.roleName)){_this.resAlert('请输入规则名称','warning');return;}
	  	ruleEngineFind(_this.roleName).then(response => {
    		if(response.result){
    			_this.tableData = [];
    			let ab = [];
    			response.result.edit = false;
    			ab[0] = response.result;
    			ab.forEach((v,k) => {
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
			  		ruleEngineAdd(_this.ruleForm).then(response => {
				  			_this.resAlert(response.msg).then(()=>{
		      				_this.dialogTableVisible = false;
	  							_this.seachClick();
		      			});
					    }).catch(error => {})
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
	  	_this.ruleForm.remark = '';
	  	_this.ruleForm.roleDetail = '';
	  	_this.dialogTableVisible = true;
	  },
	  delClick(row) {//删除
	  	let _this = this;
	  	_this.delAlert().then(data => {
    		ruleEngineDel(row.id).then(response => {
	  			if(response.result){
	  				_this.resAlert('删除成功').then(()=>{
						_this.tableData = [];
	  			});
	  			}else{
	  				_this.resAlert('删除失败','warning');
	  			}
		    }).catch(error => {})
		  }).catch(error => {})
	  },
	  confirmEdit(row) {//编辑确定
  		let _this = this;
  		let _data = {
  			id:row.id,
  			roleName:row.roleName,
  			remark:row.remark,
  			roleDetail:row.roleDetail
  		}
  		ruleEngineUpdate(_data).then(response=>{
  			if(response.result){
	  				_this.resAlert('修改成功').then(()=>{
						row.edit = false;
	  			});
	  			}else{
	  				_this.resAlert('修改失败','warning');
	  			}
  		}).catch(error => {})
	  },
	  confirmCancel(row) {//编辑取消
  		row.roleName = this.ruleData.roleName;
  		row.remark = this.ruleData.remark;
  		row.roleDetail = this.ruleData.roleDetail;
  		row.edit = false;
	  },
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