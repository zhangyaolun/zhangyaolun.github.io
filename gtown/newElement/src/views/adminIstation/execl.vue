<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
	    <el-row class="panel-group pz" :gutter="40">
	    	
	    	<el-table ref="multipleTable" border stripe :data="tableData" fit style="width: 100%;margin: 20px 0 40px 0;text-align: center;">
	    		<el-table-column
			      type="index"
			      width="30">
			    </el-table-column>
			    <el-table-column label="模板名称">
			      <template slot-scope="scope">{{ scope.row.name }}</template>
			    </el-table-column>
			    <el-table-column fixed="right" label="操作" width='100'>
			      <template slot-scope="scope">
          		<el-button type="info" plain @click='modEdit(scope.row)' size="small" icon="el-icon-share">下载</el-button>
			      </template>
			    </el-table-column>
		   	</el-table>
		    
		  </el-row>
	  </div>
  </div>
</template>

<script>

export default {
  data() {
	  return {
	  	tableData:[
	  		{name:'批量修改代发订单物流信息模板',url:'http://192.168.1.133/download/daifa.xlsx'},
	  		{name:'批量修改订单地址模板',url:'http://192.168.1.133/download/address.xlsx'},
	  		{name:'批量修改订单详情对应商品编号模板',url:'http://192.168.1.133/download/sku.xlsx'},
	  		{name:'批量修改订单详情费率模板',url:'http://192.168.1.133/download/rate.xlsx'},
	  		{name:'特殊商品序列号模板',url:'http://192.168.1.133/download/serial.xlsx'}
	  	]
	  }
	},
  methods: {
  	modEdit(row) {
  		window.location.href = row.url;
	  }
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>

