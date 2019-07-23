<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
	    <el-row class="panel-group pz" :gutter="40">
	    	
	    	<div class="navList">
	    		<div class="mt15 mleft10 lineBtn">
				  	<el-button type="info" icon="el-icon-edit" class="pan-btn yellow-btn " @click="addClick('ruleForm')">新增</el-button>
			  	</div>
	    	</div>
				
				<tree-table :data="dataAllmenus" :evalFunc="func" :expandAll="expandAll" border style="text-align: center;margin-top: 35px;">
		      <el-table-column label="菜单名称">
		        <template slot-scope="scope">
		        	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.menuName"></el-input>
		          </template>
		          <span v-else :class="[scope.row._level==1?'Actlevel':'']">{{ scope.row.menuName }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column label="菜单url">
		      	<template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.requestUrl"></el-input>
		          </template>
		          <span v-else :class="[scope.row._level==1?'Actlevel':'']">{{ scope.row.requestUrl }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column label="父级菜单">
		      	<template slot-scope="scope">
			      	<template v-if="scope.row.edit && scope.row._level!=1">
			      		<el-select v-model="scope.row.parentName" placeholder="请选择">
							    <el-option
							      v-for="item in parentMenu"
							      :key="item.menuName"
							      :label="item.menuName"
							      :value="item.menuName">
							    </el-option>
							  </el-select>
		          </template>
		          <span v-else :class="[scope.row._level==1?'Actlevel':'']">{{ scope.row.parentName }}</span>
		        </template>
		      </el-table-column>
		      <el-table-column label="排序字段">
		      	<template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.sortNo"></el-input>
		          </template>
		          <span v-else :class="[scope.row._level==1?'Actlevel':'']">{{ scope.row.sortNo }}</span>
	          </template>   
		      </el-table-column>
		      <el-table-column label="菜单图标样式">
		      	<template slot-scope="scope">
			      	<template v-if="scope.row.edit">
		            <el-input class="edit-input" size="small" v-model="scope.row.iconCls"></el-input>
		          </template>
		          <span v-else :class="[scope.row._level==1?'Actlevel':'']">{{ scope.row.iconCls }}</span>
	          </template>
		      </el-table-column>
		      <el-table-column label="操作" width="200" fixed="right">
		        <template slot-scope="scope">
		        	<el-button v-if="scope.row.edit" type="success" plain @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
          		<el-button v-if="scope.row.edit" class='cancel-btn' plain size="small" icon="el-icon-refresh" type="warning" @click="confirmCancel(scope.row)">取消</el-button>
          		<el-button v-if="!scope.row.edit" type="info" plain @click='modEdit(scope.row)' size="small" icon="el-icon-edit">编辑</el-button>
          		<el-button v-if="!scope.row.edit" type="danger" plain @click='delClick(scope.row)' size="small" icon="el-icon-delete">删除</el-button>
		        </template>
		      </el-table-column>
		    </tree-table>
    
    		<el-dialog title="新增菜单" :visible.sync="dialogTableVisible" style="margin-bottom:50px;">
		      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="w100Over demo-ruleForm marginAuto">
		      	<div class="w100Over">
		      		<el-form-item label="菜单名称" prop="menuName">
						    <el-input v-model="ruleForm.menuName" placeholder="请输入菜单名称" class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="父级菜单" prop="parentId">
						  	<el-select v-model="ruleForm.parentId" placeholder="请选择"  class='w60'>
							    <el-option
							      v-for="item in parentMenu"
							      :key="item.menuName"
							      :label="item.menuName"
							      :value="item.id">
							    </el-option>
							  </el-select>
						  </el-form-item>
						  <el-form-item label="菜单URL" prop="requestUrl">
						    <el-input v-model="ruleForm.requestUrl" placeholder="请输入菜单URL"  class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="排序字段" prop="sortNo">
						    <el-input type='number' v-model="ruleForm.sortNo" placeholder="请输入排序字段"  class='w60'></el-input>
						  </el-form-item>
						  <el-form-item label="菜单图标样式" prop="iconCls">
						    <el-input v-model="ruleForm.iconCls" placeholder="除一级菜单，都填fa"  class='w60'></el-input>
						  </el-form-item>
		      	</div>
		      	<div class="w100Over center mt40">
			      	<el-button type="primary" @click="resetForm('ruleForm')">确定</el-button>
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
import { allMenus,allParentMenu,createOrUpdate,addOrUpdate,deleteMenus } from '@/service/getData'
import BackToTop from '@/components/BackToTop'
import treeTable from '@/components/TreeTable'
import treeToArray from '@/utils/customEval'

export default {
  data() {
	  return {
	  	func: treeToArray,
	  	expandAll: false,
	  	dataAllmenus:[],//所有菜单数据
	  	parentMenu:[],//所有一级菜单
	  	ruleForm:{
	    	menuName:'',
	      requestUrl: '',
	      iconCls: '',
	      sortNo: '',
	      parentId: ''
	    },
	    rules: {
	      menuName: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
	      requestUrl: [{ required: true, message: '请输入菜单URL', trigger: 'change' }],
	      iconCls: [{ required: true, message: '请输入菜单图标样式', trigger: 'change' }],
	      sortNo: [{ required: true, message: '请输入排序字段', trigger: 'change' }]
	    },
	    dialogTableVisible: false,//新增弹框显示
	    modEditId:{},//编辑选中的数据
	  }
	},
  components: { BackToTop,treeTable },
  filters:{
  	channelTypeName:function(v){
  		let channelAttr = ['','分期','集采','积分','员工福利','其他'];
  		return v?channelAttr[v]:'';
  	},
  },
  created(){
  	this.dataInfo();
  	this.oParentMenu();
  },
  watch:{
  	ruleForm:{
        handler:function(val,oldval){
        	
        },
        deep:true
    },
  },
  methods: {
  	dataInfo(){//请求所有菜单数据
  		let _this = this;
	  	allMenus().then(response => {
	    		if(response.result && response.result.length){
	    			_this.dataAllmenus = [];
	    			response.result.forEach((v,k) => {
	    				v.edit = false;
	    				if(v.leafMenu && v.leafMenu.length){
	    					v.leafMenu.forEach((n,m) => {
			    				n.edit = false;
			    			})	
	    				}
	    				_this.dataAllmenus.push(v);
	    			})
	    		}else{
	    			_this.dataAllmenus = [];
	    		}
	    })
  	},
  	oParentMenu(){//请求一级菜单数据
  		let _this = this;
	  	allParentMenu().then(response => {
	    		if(response.result && response.result.length){
	    			_this.parentMenu = [];
	    			response.result.forEach((v,k) => {
	    				_this.parentMenu.push(v);
	    			})
	    		}else{
	    			_this.parentMenu = [];
	    		}
	    })
  	},
  	confirmEdit(row) {//点击修改
      let _this = this;
      let aData = {
				'id':row.id,
				'menuName':row.menuName,
				'requestUrl':row.requestUrl,
				'iconCls':row.iconCls,
				'sortNo':row.sortNo,
				'parentId':row.parentId
			}
      createOrUpdate(aData).then(response => {
					response.result?response.msg='修改成功':response.msg='修改失败';
					_this.resAlert(response.msg).then(()=>{
					  row.edit = false;
	  			});
	    })
    },
	  delClick(row) {//点击删除 
	  	let _this = this;
	    _this.delAlert().then(data => {
    		deleteMenus(row.id).then(response => {
    			response.result?response.msg='删除成功':response.msg='删除失败';
	  			_this.resAlert(response.msg).then(()=>{
	  				_this.dialogTableVisible = false;
	  				_this.dataInfo();
	  			});
		    })
		  }).catch(error => {})
	  },
	  resetForm(formName) {//点击新增 确定
	  	let _this = this;
	  	_this.$refs[formName].validate((valid) => {
	      if (valid) {
			  	_this.msgAlert().then(data => {
			  	addOrUpdate(_this.ruleForm).then(response => {
		  			  response.result?response.msg='添加成功':response.msg='添加失败';
	      			_this.resAlert(response.msg).then(()=>{
							  _this.dialogTableVisible = false;
							  _this.dataInfo();
			  			});
					  })
			  	}).catch(error => {})
	      } else {
	      	_this.$message({message: '请审核信息',type: 'warning'});
	        return false;
	      }
	    });
	  },
	  addClick(formName) {//新增
	  	let _this = this;
	  	_this.ruleForm.menuName = '';
	  	_this.ruleForm.requestUrl = '';
	  	_this.ruleForm.iconCls = '';
	  	_this.ruleForm.sortNo = '';
	  	_this.ruleForm.parentId = '';
	  	_this.dialogTableVisible = true;
	  },
	  modEdit(row) {//编辑点击
	  	this.modEditId.menuName = row.menuName;
	  	this.modEditId.requestUrl = row.requestUrl;
	  	this.modEditId.iconCls = row.iconCls;
	  	this.modEditId.sortNo = row.sortNo;
	  	this.modEditId.parentId = row.parentId;
	  	row.edit = !row.edit;
	  },
	  confirmCancel(row){//编辑 取消
			row.menuName = this.modEditId.menuName;
			row.requestUrl = this.modEditId.requestUrl;
			row.iconCls = this.modEditId.iconCls;
			row.sortNo = this.modEditId.sortNo;
			row.parentId = this.modEditId.parentId;
			row.edit = false;
	  }
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navBtn{
	width: 30%;
}
.el-tree{
	border: 1px dashed #ccc;
  width: 40%;
}
.Actlevel{ color: #409EFF;}
.level{ color: #606266;}

</style>