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
			    <el-table-column label="角色">
			      <template slot-scope="scope">{{ scope.row.roleName }}</template>
			    </el-table-column>
			    <el-table-column label="类型">
			    	<template slot-scope="scope">{{ scope.row.roleType | roleTypeFilter}}</template>
			    </el-table-column>
			    <el-table-column fixed="right" label="操作" width='200'>
			      <template slot-scope="scope">
			      	<el-button class='cancel-btn' icon="el-icon-edit" size="small" plain type="info" @click="roleModClick(scope.row)">编辑</el-button>
			      	<el-button class='cancel-btn' icon="el-icon-delete" size="small" plain type="danger" @click="roleDelClick(scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		   	</el-table>
		   	
		    <el-dialog title="新增角色" :visible.sync="dialogTableVisible" style="margin-bottom: 50px;">
		      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="w100Over demo-ruleForm clear">
		      	<div class="w100Over">
		      		<el-form-item label="角色名称" prop="roleName">
						    <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="角色类型" prop="roleType">
						    <el-radio-group v-model="ruleForm.roleType" class='w80'>
							    <el-radio :label="k" v-for="(item,k) in roleTypeAttr" :key="k">{{item}}</el-radio>
							  </el-radio-group>
						  </el-form-item>
		      	</div>
		      	<div class="w100Over center mt40">
			      	<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
		      	</div>
					</el-form>
		    </el-dialog>
		    
		    <el-dialog title="角色菜单管理" :visible.sync="dialogMenus" style="margin-bottom: 50px;">
		      <tree-table :data="treeData" :evalFunc="func" :expandAll="expandAll" border style="text-align: center;margin: 35px 0;">
			      <el-table-column label="菜单名称">
			        <template slot-scope="scope">
			          <span :class="[scope.row._level==1?'Actlevel':'']">{{ scope.row.menuName }}</span>
			        </template>
			      </el-table-column>
			      <el-table-column label="操作" width="200" fixed="right">
			        <template slot-scope="scope">
	          		<el-button v-if="!scope.row.selected" plain type="success" @click='rowSuccess(scope.row)' size="small">{{scope.row.selected | treeSelected}}</el-button>
	          		<el-button v-else type="danger" plain @click='rowDanger(scope.row)' size="small">{{scope.row.selected | treeSelected}}</el-button>
			        </template>
			      </el-table-column>
			    </tree-table>
		    </el-dialog>
		    
		    <el-tooltip placement="top" content="回到顶部">
		      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
		    </el-tooltip>
		    
		  </el-row>
	  </div>
  </div>
</template>

<script>
import { sysRoleAll,sysRoleAdd,sysRoleDel,sysRoleMenu,sysRoleMenuAdd,sysRoleMenuDel } from '@/service/getData'
import BackToTop from '@/components/BackToTop'
import treeTable from '@/components/TreeTable'
import treeToArray from '@/utils/customEval'

export default {
  data() {
	  return {
	  	func: treeToArray,
	  	expandAll: false,
	    tableData: [],//查询数据
	    roleTypeAttr:['普通用户','管理员用户','系统管理员'],//角色类型
	    dialogTableVisible: false,//新增弹框显示
	    dialogMenus: false,//角色编辑弹框显示
	    ruleForm: {
	    	roleName:'',
	      roleType: 0
	    },
	    rules: {
	      roleName: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
	      roleType: [{ required: true, message: '请选择角色类型', trigger: 'change' }]
	    },
	    treeData: [],
	    defaultProps: {
	      children: 'leafMenu',
	      label: 'menuName'
	    },
	    roleId:'',//编辑选中的id
	  }
	},
  components: { BackToTop,treeTable },
  filters:{
  	roleTypeFilter:function(v){
  		let attrRole = ['普通用户','管理员用户','系统管理员'];
  		return attrRole[v];
  	},
  	treeSelected:function(v){
  		return v?'禁用':'启用';
  	},
  },
  created(){
  	this.dataInfo();
  },
  methods: {
  	
  	roleModClick(row){//编辑点击
	  	let _this = this;
	  	_this.roleId = row.id;
	  	sysRoleMenu(row.id).then(response => {
	    		if(response.result && (response.result.length>0)){
	    			_this.treeData = [];
	    			response.result.forEach((v,k) => {
	    				_this.treeData.push(v);
	    			})
	    		}else{
	    			_this.treeData = [];
	    		}
	    })
	  	_this.dialogMenus = true;
	  },
  	dataInfo(){//查询数据
  		let _this = this;
	  	sysRoleAll().then(response => {
	    		if(response.result && (response.result.length>0)){
	    			_this.tableData = [];
	    			response.result.forEach((v,k) => {
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
			  		sysRoleAdd(_this.ruleForm).then(response => {
				  			if(response.result){
				  				_this.resAlert('添加成功').then(()=>{
			      				_this.dialogTableVisible = false;
		  							_this.dataInfo();
			      			});
				  			}else{
				  				_this.resAlert('添加失败','warning');
				  			}
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
	  	_this.ruleForm.roleType = 0;
	  	_this.dialogTableVisible = true;
	  },
	  roleDelClick(row) {//删除
	  	let _this = this;
	  	_this.delAlert().then(data => {
    		sysRoleDel(row.id).then(response => {
	  			if(response.result){
	  				_this.resAlert('删除成功').then(()=>{
						_this.dataInfo();
	  			});
	  			}else{
	  				_this.resAlert('删除失败','warning');
	  			}
		    }).catch(error => {})
		  }).catch(error => {})
	  },
	  rowSuccess(row) {//菜单点击启用
  		let _this = this;
  		_this.treeData.forEach((v,k)=>{
  			if(v.id == row.parentId && v.selected == false){
  				_this.menusAdd(v.id).then(()=>{v.selected = true;})
  			}
  		})
  		_this.menusAdd(row.id).then(()=>{_this.resAlert('修改成功');row.selected = true;})
	  },
	  rowDanger(row) {//菜单点击禁用
	    let _this = this;
	    _this.treeData.forEach((v,k)=>{
  			if(v.id == row.id){
  				v.leafMenu.forEach((n,m)=>{
  					if(n.selected){
  						_this.menusAdd(n.id).then(()=>{n.selected = false;})
  					}
  				})
  			}
  		})
  		_this.menusDel(row.id).then(()=>{_this.resAlert('修改成功');row.selected = false;})
	  },
	  menusAdd(id){
	  	let _this = this;
	  	return new Promise((resolve, reject) => {
				sysRoleMenuAdd(_this.roleId,id).then(response => {
	  			if(response.result){
	  				resolve();
	  			}else{
	  				_this.resAlert('修改失败','warning');
	  			}
		    }).catch(error => {})
			}); 
	  },
	  menusDel(id){
	  	let _this = this;
	  	return new Promise((resolve, reject) => {
				sysRoleMenuDel(_this.roleId,id).then(response => {
	  			if(response.result){
	  				resolve();
	  			}else{
	  				_this.resAlert('修改失败','warning');
	  			}
		    }).catch(error => {})
			}); 
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