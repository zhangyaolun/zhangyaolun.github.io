<template>
    <div class="main-view">
    	{{selected}}
    	<i class="el-icon-edit"></i>
		<i class="el-icon-share"></i>
		<i class="el-icon-delete"></i>
		<el-button type="primary" icon="el-icon-search">搜索</el-button>
		<div class="block">
		    <span class="demonstration">默认</span>
		    <el-date-picker
		      v-model="value1"
		      type="date"
		      placeholder="选择日期">
		    </el-date-picker>
		  </div>
    </div>
</template>

<script>
  import Bus from '../../config/eventbus.min.js'
  import searchImg from '../../images/search.png'
  import {mapState} from 'vuex';
  
  export default {
    data(){
      return {
        selected:'122222222222222222222',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }],
        
      },
      value1: '',
        value2: '',
      }
    },
    components: {
      
    },
    mounted(){
    	
    },
    computed:{
    },
    watch: {
    },
    methods: {
      seachchange(val){
      	console.log(val)
      }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .main-view {
  	font-size:12px;
  	@include pNew;
  	 
  }
</style>