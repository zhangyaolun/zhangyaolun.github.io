<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="shopSuccess">
      <div class="shopmap-top">
        <span>{{mapName}}</span>
        <em>{{mapPhone | mapFilter}}</em>
        <div class="shoptop-way">{{mapTitle | filter}}</div>
      </div>
      <router-link class="success-show"  :to="{path: '/order-detail',query: {title:'订单详情',orderId:''}}">
        查看订单
      </router-link>
    </div>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import {searchUserDeliveryAddress} from 'src/service/getData'
  import icono1 from '../../images/icono1.png';
  import icono2 from '../../images/icono2.png';
  import icono3 from '../../images/icono3.png';
  import icono4 from '../../images/icono4.png';

  export default {

    data(){
      return{
        headTitle: "",
        userDeliveryId:'',
        orderId:'',
        mapName:'杨建忠',
        mapTitle:'上海市宝山区',
        mapPhone:'13755552411'
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      this.orderId = this.$route.query.orderId;
      this.userDeliveryId = this.$route.query.userDeliveryId;
      this.mapTitle = this.$route.query.userDeliveryDetail;
      this.getShopMap(this.userDeliveryId);
    },


    mounted(){

    },

    filters:{
      mapFilter:function (value) {
        return value.substring(0,3)+'****'+value.substring(7,value.length);
      },
      currency:function (value) {
        return '￥'+parseFloat(value).toFixed(2);
      },
      freightCurrency:function (value) {
        return value+'元';
      },
      filter(value){
        if(value) return value.split('|').join('')
      },
    },

    components:{
      headerTop
    },

    computed:{

    },

    methods:{
      gotoSkip(path){
        this.$router.push(path);
      },
      getShopMap(id){
        searchUserDeliveryAddress().then(res => {
            console.log(res)
          if(res){
            res.result.forEach((v,k)=>{
              if(v.id == id){
                this.mapName = v.name;
                this.mapPhone = v.moblie;
              }
            })
          }
        });
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  em{font-style: normal;}
  .shopSuccess {
    padding-top: 2rem;

    .shopmap-top {
      width: 100%;
      font-size: .7rem;
      font-weight: 600;
      color: #4c4c4c;
      padding: .5rem 0 0 .5rem;
      background: #fff;
      span{
        font-weight: 600;
      }
      .shoptop-way {
        width: 100%;
        padding: .5rem 0 ;
        font-weight: 600;
      }
    }
    .success-show{
      display: block;
      width:100%;
      height:2rem;
      line-height:2rem;
      font-size:.8rem;
      color: #3481ea;
      background: #fff;
      margin-top:.5rem;
      text-align: center;
      text-decoration:underline;
    }
  }

</style>
