<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <mt-index-list :slots="slots" >
      <mt-index-section :index="item.title" v-for="item in itemList">
        <mt-cell :title="oItems.name" v-for="oItems in item.List"></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head';

  export default {

    data(){
      return{
        headTitle: "",
        itemList:[
          {
            title:'上海',
            List:[{name:'1'},{ name:'2'},{ name:'3'}]
          },
          {
            title:'北京',
            List:[{name:'1'},{ name:'2'},{ name:'3'}]
          }
        ]
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
    },
    mounted(){

    },

    components:{
      headerTop
    },

    computed:{

    },

    methods:{

    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';


</style>
