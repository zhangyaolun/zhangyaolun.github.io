<template>
  <div class="dashboard-container">
  	
  	<div class="lineBtn clear">
			<el-button type="primary" class="pan-btn yellow-btn mt15 mleft10 right" @click="moreModClick()">添加一级分类</el-button>
  	</div>
  	
  	<div class="tableEl">
	    <el-tree
			  :data="treeData"
			  :props="defaultProps"
			  :load="loadNode"
			  accordion
			  lazy
			  @node-click="handleNodeClick" empty-text="暂无数据">
			  <span class="custom-tree-node clear w30" slot-scope="{ node, data }">
	        <span class="left">{{ node.label }}</span>
	        <span class="right">
	          <el-button
	            type="text"
	            size="mini"
	            @click="() => append(data)">
	            Append
	          </el-button>
	          <el-button
	            type="text"
	            size="mini"
	            @click="() => remove(node, data)">
	            Delete
	          </el-button>
	        </span>
	      </span>
			</el-tree>
		</div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import { searchCategoryByLevel,findByParentId } from '@/service/getData'
import BackToTop from '@/components/BackToTop'

export default {
  data() {
	  return {
	  	seachData:{level:'',channelCode:''},
	  	treeData: [],
	    defaultProps: {
	      children: 'children',
	      label: 'label'
	    }
	  }
	},
	components: { BackToTop },
	mounted(){
		this.seachData.level = 1;
    this.dataInfo();
	},
  methods: {
  	append(data) {
  		console.log(data)
	    const newChild = { id: '', label: 'testtest', children: [] };
	    if (!data.children) {
	      this.$set(data, 'children', []);
	    }
	    data.children.push(newChild);
	  },
	  remove(node, data) {
	    const parent = node.parent;
	    const children = parent.data.children || parent.data;
	    const index = children.findIndex(d => d.id === data.id);
	    children.splice(index, 1);
	  },
  	loadNode(node, resolve) {
  		let _this = this;
	    console.log(node)
	    let odata = [];
	    findByParentId({parentId:node.data.oid}).then(response => {
				if(response.result && (response.result.length>0)){
					response.result.forEach((v,k)=>{
						let _data = {label:'',children:[],oid:''};
						_data.label = v.categoryName;
						_data.oid = v.id;
	  				odata.push(_data);
		  		})
				}
				resolve(odata);
      })
	  },
  	dataInfo(){//数据请求
  		let _this = this;
  		searchCategoryByLevel(_this.seachData).then(response => {
  			_this.treeData = [];
				if(response && (response.result.length>0)){
					response.result.forEach((v,k)=>{
						let _data = {label:'',children:[],oid:''};
						_data.label = v.categoryName;
						_data.oid = v.id;
	  				_this.treeData.push(_data);
		  		})
				}
      })
  	},
  	handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>