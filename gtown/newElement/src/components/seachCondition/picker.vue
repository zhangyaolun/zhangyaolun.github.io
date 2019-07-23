<template>
  <div class="block left">
    <span class="center demonstration">{{names}}</span>
    <el-date-picker
      v-model="value"
      type="daterange"
      align="right"
      unlink-panels
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: '',
        names:''
      };
    },
    props: ['seachList'],//String Number Boolean Array Object
		props: {
			seachList: Object
		},
		watch:{
	  	value:{
	        handler:function(val,oldval){
	        	this.$emit('pickerEvent', val);
	        },
	        deep:true
	    },
		},
		mounted(){
		  	let _this = this;
		  	_this.names = _this.seachList.name;
		  	
		},
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-range-editor--medium{
	width: 70%;
}
.demonstration{
	width: 30%;
	font-size: 14px;
	color: #fff;
	height: 36px;
	line-height: 36px;
	float: left;
	background: #ccc;
	display: inline-block;
	border-radius: 4px;
	border-top-left-radius: 20px;
	border-bottom-right-radius: 20px;
}
</style>
