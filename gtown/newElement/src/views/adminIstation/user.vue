<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
	    <el-row class="panel-group pz" :gutter="40">
	    	
	    	<div class="navList clear">
	    		<md-input name="title" placeholder="输入账号" v-model="oDataInfo.account">账号</md-input>
	    		<div class="right lineBtn">
	    			<el-button type="primary" icon="el-icon-search" class="pan-btn blue-btn mleft0" @click="seachClick()">搜索</el-button>
				  	<el-button type="info" icon="el-icon-edit" class="pan-btn yellow-btn mleft0" @click="resetForm('ruleForm')">新增</el-button>
			  	</div>
	    	</div>
		    <el-table ref="multipleTable" border stripe :data="tableData" fit style="width: 100%;margin: 20px 0 40px 0;text-align: center;" empty-text='暂无数据'>
			    <el-table-column label="账号">
			      <template slot-scope="scope">{{ scope.row.account }}</template>
			    </el-table-column>
			    <el-table-column label="邮箱">
			    	<template slot-scope="scope">{{ scope.row.email }}</template>
			    </el-table-column>
			    <el-table-column label="是否有效">
			    	<template slot-scope="scope">{{ scope.row.enable}}</template>
			    </el-table-column>
			    <el-table-column label="姓名">
			    	<template slot-scope="scope">{{ scope.row.userName}}</template>
			    </el-table-column>
			    <el-table-column label="角色">
			    	<template slot-scope="scope">{{ scope.row.roleNames}}</template>
			    </el-table-column>
			    <el-table-column fixed="right" label="操作" type='expand' width='100'>
			      <template slot-scope="scope">
			      	<el-button class='cancel-btn' size="small" plain type="primary" @click="disableBtn(scope.row)">{{scope.row.enable | enableName}}</el-button>
			      	<el-button class='cancel-btn' size="small" plain type="success" @click="roleBtn(scope.row)">角色</el-button>
			      	<el-button class='cancel-btn' size="small" plain type="info" @click="categoryBtn(scope.row)">分类</el-button>
			      	<el-button class='cancel-btn' size="small" plain type="warning" @click="channelBtn(scope.row)">渠道</el-button>
			      </template>
			    </el-table-column>
		   	</el-table>
		   	
		    <el-dialog title="新增账号" :visible.sync="dialogTableVisible" style="margin-bottom: 50px;">
		      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="w100Over demo-ruleForm clear">
		      	<div class="w100Over">
		      		<el-form-item label="账号" prop="account">
						    <el-input v-model="ruleForm.account" @blur="accountBlur" placeholder="请输入账号" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="邮箱" prop="email">
						    <el-input type='email' v-model="ruleForm.email" placeholder="请输入邮箱" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="姓名" prop="userName">
						    <el-input v-model="ruleForm.userName" placeholder="请输入姓名" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="启用/禁用" prop="enable">
						    <el-radio-group v-model="ruleForm.enable" class='w60'>
							    <el-radio :label="true">启用</el-radio>
							    <el-radio :label="false">禁用</el-radio>
							  </el-radio-group>
						  </el-form-item>
						  <el-form-item label="角色">
						    <el-checkbox-group v-model="ruleForm.roleIds">
						    		<el-checkbox v-if='roleGroup.length>0' v-for="item in roleGroup" :label="item.id" name="type" :key="item.id">{{item.roleName}}</el-checkbox>
						    </el-checkbox-group>
						  </el-form-item>
		      	</div>
		      	<div class="w100Over center">
			      	<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
		      	</div>
					</el-form>
		    </el-dialog>
		    
		    <!--分页-->
		    <el-pagination
		    	background
		    	class='center'
		    	@size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="oDataInfo.currPage"
		      :page-sizes="[10, 20, 50, 100]"
		      :page-size="oDataInfo.pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="pagination.total">
		    </el-pagination>
		    
		    <!--弹出  角色 分类 渠道-->
		    <el-dialog :title="oModTitle" :visible.sync="oModVisible">
	      	<div class="w100Over">
				    	<el-checkbox v-for="(item,index) in oModGroup" :key="item.id" :class="[oModFalg==3?'width':'']" v-if='oModGroup.length>0' :label="item.id" name="type" v-model="item.selected">{{item.oName}}</el-checkbox>
	      	</div>
	      	<div class="w100Over center mt40" v-if="oModFalg==1">
		      	<el-button type="primary" @click="roleSubClick()">确定</el-button>
	      	</div>
		    </el-dialog>
		    
		    <el-tooltip placement="top" content="回到顶部">
		      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
		    </el-tooltip>
		    
		  </el-row>
	  </div>
  </div>
</template>

<script>
import { sysUserSearch,sysRoleAll,addSysCreate,accountValidate,roleSysDisable,roleSysEnable,sysAllCategory,sysAllChannel,sysUserRoleUupdate,sysCategoryAdd,sysCategoryDel,sysChannelAdd,sysChannelDel } from '@/service/getData'
import {outReplace} from '@/utils/validate'
import BackToTop from '@/components/BackToTop'
import MdInput from '@/components/MDinput'

export default {
  data() {
	  return {
	  	roleGroup:[],//角色数据
	  	pagination:{
	  		total:100,//总数
	  	},
	  	oDataInfo:{
	  		account:'',
	  		currPage:1,
	  		pageSize:10
	  	},//查询条件值
	    tableData: [],//查询数据
	    dialogTableVisible: false,//新增弹框显示
	    accountFalg:false,//判断账号是否存在
	    ruleForm: {
	    	account:'',
	      email: '',
	      userName: '',
	      enable: true,
	      roleIds: []
	    },
	    rules: {
	      account: [{ required: true, message: '请输入账号', trigger: 'change' }],
	      email: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
	      userName: [{ required: true, message: '请输入姓名', trigger: 'change' }]
	    },
	    oModGroup:[],//操作修改 数据数组
	    oModFalg:0,//角色 1 分类 2 渠道3
	    oModTitle:'角色修改',//弹出框title
	    oModVisible:false,//弹出框修改 判断
	    oModId:[],//修改选中数据id
	    roleId:'',//角色修改确定id
	    oldVal:[],//原有值
	  }
	},
  components: { BackToTop,MdInput },
  filters:{
  	enableName:function(v){
  		let enableObj = {'启用':'禁用','禁用':'启用'};
  		return v?enableObj[v]:'启用';
  	},
  },
  created(){
  	this.roleData();
  	this.dataInfo();
  },
  watch:{
  	oModGroup:{
	    handler: function (val){
	    	let _this = this;
					if(_this.oldVal && (_this.oldVal.length>0) && (_this.oModFalg!=1)){
						val.forEach((v,k) => {
	    				_this.oldVal.forEach((n,m) => {
		    				if(v.id == n.id){
		    					if(v.selected != n.selected){
		    						if(_this.oModFalg == 2){
		    							v.selected?_this.oCategoryAdd(v.id):_this.oCategoryDel(v.id);
		    						}else{
		    							v.selected?_this.oChannelAdd(v.id):_this.oChannelDel(v.id);
		    						}
		    					}
		    				}
		    			})
	    			})
					}
					_this.oldVal = JSON.parse(JSON.stringify(val));
	    },
	    deep:true
		}
  },
  methods: {
  	handleSizeChange(val) {//每页大小选择
	    this.oDataInfo.pageSize = val;
		  this.dataInfo();
	  },
  	handleCurrentChange(val) {//页数
	    this.oDataInfo.currPage = val;
		  this.dataInfo();
	  },
  	dataInfo(){//查询数据
  		let _this = this;
	  	sysUserSearch(_this.oDataInfo).then(response => {
	    		if(response.result.result && (response.result.result.length>0)){
	    			let _result = response.result;
	    			_this.pagination.total = _result.totalCount;
	    			_this.tableData = [];
	    			_result.result.forEach((v,k) => {
	    				_this.tableData.push(v);
	    			})
	    		}else{
	    			_this.tableData = [];
	    		}
	    })
  	},
	  seachClick() {//点击查询
	  	this.oDataInfo.currPage = 1;
	  	this.oDataInfo.pageSize = 10;
  		this.dataInfo();
	  },
	  roleData() {//角色查询
	    let _this = this;
	  	sysRoleAll().then(response => {
	    		if(response.result && (response.result.length>0)){
	    			_this.roleGroup = [];
	    			response.result.forEach((v,k) => {
	    				v.oName = v.roleName;
	    				v.selected = false;
	    				_this.roleGroup.push(v);
	    			})
	    		}else{
	    			_this.roleGroup = [];
	    		}
	    })
	  },
	  accountBlur(){//检查账号是否存在
	  	let _this = this;
	  	_this.ruleForm.account = outReplace(_this.ruleForm.account);
	  	if(!_this.ruleForm.account)return;
	  	accountValidate(_this.ruleForm.account).then(response => {
	    		if(response.result){
	    			_this.resAlert('账号已存在，不能创建','warning');
	    			_this.accountFalg = true;
	    		}else{
	    			_this.accountFalg = false;
	    		}
	    })
	  },
	  submitForm(formName) {//新增   提交确定
	  	let _this = this;
	    _this.$refs[formName].validate((valid) => {
	      if (valid) {
	      	if(_this.accountFalg){_this.resAlert('账号已存在，不能创建','warning');return;}
	      	if(_this.ruleForm.roleIds.length==0){_this.resAlert('请选择角色','warning');return;}
			  	_this.msgAlert().then(() => {
			  		_this.ruleForm.roleIds = _this.ruleForm.roleIds.join(',');
			  		addSysCreate(_this.ruleForm).then(response => {
				  			if(response.result){
				  				_this.resAlert('添加成功').then(()=>{
			      				_this.ruleForm.roleIds = [];
			      				_this.dialogTableVisible = false;
		  							_this.dataInfo();
			      			});
				  			}else{
				  				_this.ruleForm.roleIds = _this.ruleForm.roleIds.split(',');
				  				_this.resAlert('添加失败','warning');
				  			}
					    }).catch(error => {_this.ruleForm.roleIds = _this.ruleForm.roleIds.split(',');})
			  	}).catch(error => {})
	      } else {
	      	_this.resAlert('请审核信息','warning');
	        return false;
	      }
	    });
	  },
	  resetForm(formName) {//点击新增
	  	let _this = this;
	    if (_this.$refs[formName]!==undefined) {
		     _this.$refs[formName].resetFields();
	  		_this.ruleForm.account = '';
	  		_this.ruleForm.email = '';
	  		_this.ruleForm.userName = '';
	  		_this.ruleForm.enable = true;
	  		_this.ruleForm.roleIds = [];
		  }
	  	_this.dialogTableVisible = true;
	  },
	  disableBtn(row){//启用禁用
	  	let _this = this;
	  	_this.msgAlert().then(() => {
	  		if(row.enable == '禁用'){
	  			roleSysDisable(row.id).then(response => {
		  			if(response.result){
		  				_this.resAlert('修改成功').then(()=>{row.enable = '启用';});
		  			}else{
		  				_this.resAlert('修改失败','warning');
		  			}
			    })
	  		}else{
	  			roleSysEnable(row.id).then(response => {
		  			if(response.result){
		  				_this.resAlert('修改成功').then(()=>{row.enable = '禁用';});
		  			}else{
		  				_this.resAlert('修改失败','warning');
		  			}
			    })
	  		}
	  	}).catch(error => {})
	  },
	  roleSubClick(){//角色点击确定
	  	let _this = this,oIds='';
	  	_this.oModGroup.forEach((v,k)=>{if(v.selected)oIds += v.id + ',';})
	  	if(!oIds){_this.resAlert('请选择角色','warning');return;}
	  	oIds = oIds.substring(0,oIds.length-1);
	  	_this.msgAlert().then(() => {
	  		let _data = {
	  			userId: _this.roleId,
					roleIds: oIds
	  		}
	  		sysUserRoleUupdate(_data).then(response => {
	  			if(response.result){
	  				_this.resAlert('修改成功').then(()=>{_this.oModVisible = false;_this.dataInfo();});
	  			}else{
	  				_this.resAlert('修改失败','warning');
	  			}
		    })
	  	}).catch(error => {})
	  },
	  roleBtn(row){//角色操作点击
	  	let _this = this;
	  	let _roleNames = row.roleNames;
	  	if(_roleNames){
	  		_roleNames = _roleNames.split(',');
	  		_this.roleGroup.forEach((n,m)=>{n.selected = false;})
	  		_this.roleGroup.forEach((n,m)=>{
	  		 	_roleNames.forEach((v,k)=>{
	  		 		if(n.roleName.indexOf(v) >= 0){n.selected = true;}
	  		 	})
  		  })
	  	}
	  	_this.roleId = row.id;
	  	_this.oModGroup = _this.roleGroup;
	  	_this.oModVisible = true;
	  	_this.oModTitle = '角色修改';
	  	_this.oModFalg = 1;
	  },
	  categoryBtn(row){//分类操作点击
	  	let _this = this;
	  	let data = {userId:row.id};
	  	_this.roleId = row.id;
	  	sysAllCategory(data).then(response => {
	  		_this.oModGroup = [];
  			if(response.result && (response.result.length>0)){
					response.result.forEach((v,k) => {
    				v.oName = v.categoryName;
    				_this.oModGroup.push(v);
    			})
  				_this.oModVisible = true;
  			}
  			_this.oModTitle = '分类修改';
	  		_this.oModFalg = 2;
	    })
	  },
	  channelBtn(row){//渠道操作点击
	  	let _this = this;
	  	let data = {userId:row.id};
	  	_this.roleId = row.id;
	  	sysAllChannel(data).then(response => {
	  		_this.oModGroup = [];
	  		_this.oModId = [];
  			if(response.result && (response.result.length>0)){
					response.result.forEach((v,k) => {
    				v.oName = v.channelName;
    				_this.oModGroup.push(v);
    			})
  				_this.oModVisible = true;
  			}
  			_this.oModTitle = '渠道修改';
	  		_this.oModFalg = 3;
	    })
	  },
	  oCategoryAdd(id) {//分类修改添加
	    let _this = this;
	  	sysCategoryAdd(_this.roleId,id).then(response => {
	  		response.result?_this.resAlert('修改成功'):_this.resAlert('修改失败','warning');
	    })
	  },
	  oCategoryDel(id) {//分类修改取消
	    let _this = this;
	  	sysCategoryDel(_this.roleId,id).then(response => {
	  		response.result?_this.resAlert('修改成功'):_this.resAlert('修改失败','warning');
	    })
	  },
	  oChannelAdd(id) {//渠道修改添加
	    let _this = this;
	  	sysChannelAdd(_this.roleId,id).then(response => {
	  		response.result?_this.resAlert('修改成功'):_this.resAlert('修改失败','warning');
	    })
	  },
	  oChannelDel(id) {//渠道修改取消
	    let _this = this;
	  	sysChannelDel(_this.roleId,id).then(response => {
	  		response.result?_this.resAlert('修改成功'):_this.resAlert('修改失败','warning');
	    })
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
.checkboxlogistics{
	border: 1px dashed #ccc;
  padding: 20px;
  margin-bottom: 40px;
}

</style>