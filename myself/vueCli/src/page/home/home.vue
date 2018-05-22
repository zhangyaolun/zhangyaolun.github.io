<template>
    <div class="main-view">
    	<p>{{count}}</p>
    	<div class="search">
			<input type="text" name="search" value="" placeholder="请输入店铺名称" @click='seachClick()' v-model="seachVal">
			<img :src="searchImg" alt="" class="seachImg"/>
		</div>
	    <mt-navbar v-model="selected" :fixed="fixedFlag">
		  <mt-tab-item id="1" class='item_mt'>综合排序</mt-tab-item>
		  <mt-tab-item id="2" class='item_mt'>最受欢迎</mt-tab-item>
		  <mt-tab-item id="3" class='item_mt'>距离最近</mt-tab-item>
		</mt-navbar>
	    <index-list v-bind:ashopEmpty='order' ref="productImage" @services-change='seachchange'></index-list>
    </div>
</template>

<script>
  import indexList from '../comment/indexlist'
  import Bus from '../../config/eventbus.min.js'
  import searchImg from '../../images/search.png'
  import {mapState} from 'vuex';
  
  export default {
    data(){
      return {
        selected:'1',
        order:1,
        searchImg:searchImg,
        scrolled: '',
        fixedFlag:false,
        seachVal:''
      }
    },
    components: {
      indexList,
    },
    mounted(){
    	console.log(this.$store.state.count)
    },
    activated() {
    	window.addEventListener('scroll', this.menu);
    	this.seachVal = this.$store.state.count;
    	console.log(this.$store.state.count)
	},
    computed:{
        count(){
        	/*return this.$store.getters.count;计算*/
            return this.$store.state.count;
        }
    },
   	/*computed:mapState({
            count:state=>state.count  //理解为传入state对象，修改state.count属性
    }),
    computed:mapState(["count"]),*/
    watch: {
      selected: function (val) {
      	let oAttr = ['','0','1','2']
      	this.currPage = 1;
      	this.order = oAttr[val];
      	/*this.$refs.productImage.getSrcList('8888888888');*/
		this.$store.commit('add')	
      	/*Bus.dispatch("changedit",this.order);*/
      }
    },
    methods: {
      seachClick(){
      	window.removeEventListener("scroll",this.menu);
      	let path;
      	path = {path: '/seach'};
        this.$router.push(path);
      },
      seachchange(val){
      	this.seachVal = val
      	console.log(val)
      },
      menu() {
	    this.scrolled = document.body.scrollTop;
	    const homeItem = document.querySelectorAll('.mint-navbar')[0];
	    const seachItem = document.querySelectorAll('.search')[0];
	    if(homeItem){this.scrolled > homeItem.offsetTop?this.fixedFlag = true:this.fixedFlag = false;}
	   }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .main-view {
  	font-size:0;
  	@include box;
  	 .search{
	  	@include box;
	  	font-size: .14rem;
	  	background-color: #fff;
	  	margin-bottom: .5%;
	  	input{
	        width: 95%;
		    outline: none;
		    border: none;
		    border-radius: 1rem;
		    background-color: #e6e4e7;
		    color: #333;
		    margin: 1.5% 0 1.5% 2.5%;
		    padding: 2% 0 2% 4%;
	  	}
	  	.seachImg{
		    width: 25px;
		    position: absolute;
		    top: 1.2%;
		    right: 7%;
	  	}   
	  }
  }
</style>