<template>
  <div>
    <div class="stringMap">
      <div class="stringMap-main" v-if="isstringMap">
        <div class="stringMap-top">您还没有收货地址哦，赶快设置一个吧！</div>
        <div class="stringMap-bot clear">
          <span class="left" @click="$router.go(-1)">取消</span>
          <section @click="gotoSkip()" class="popupsting">{{sectionTit}}</section>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'

  export default {
    data(){
      return{
        headTitle: "",
        isstringMap:true,
        sectionTit:'去设置',
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
      gotoSkip(path){
        if(this.headTitle == '订单确认'){
          path = {path: '/shopMapNew',query: {title:'新建收货地址',typeMap:2}}
          this.$router.push(path);
        }
        /*this.$router.push(path);*/
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .stringMap{
    position: absolute;
    z-index: 999;
    width:100%;
    height:100%;
    background: rgba(0,0,0,.6);
    .stringMap-main{
      width:86%;
      height:6.8rem;
      background: #fff;
      position: absolute;
      top:10rem;
      left:7%;
      border-radius: 8px;
      font-size: .75rem;
      text-align: center;
      .stringMap-top{
        height:4.8rem;
        line-height: 4.8rem;
        color: #4c4c4c;
        border:1px solid #e5e5e5;
        border-top-left-radius:8px;
        border-top-right-radius:8px;
      }
      .stringMap-bot{
        width:100%;
        height:2rem;
        line-height:2rem;
        span{
          width:50%;
          height:2rem;
          display: inline-block;
          color: #808080;
        }
        .popupsting{
          display: inline-block;
          color: #fff;
          width:50%;
          height:2rem;
          display: inline-block;
          background: #de453a;
          font-style: normal;
          border-bottom-right-radius:6px;
        }
      }
    }
  }
</style>
