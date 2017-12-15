<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="shopMap">
      <div class="shopmap-top" v-for="(item,index) in shopmapList">
        <div  @click="shopmapTop(index)">
          <span>{{item.name}}</span>
          <em>{{item.moblie }}</em>
          <div class="shoptop-way">{{item.province+item.city+item.area+item.address}}</div>
        </div>

        <ul class="shopmap-bot clear">
          <li class="left"><span :class="[ item.isDefault? 'selected' : 'checked']" @click="checkShopBot(index)"></span><em>设为默认</em></li>
          <li class="right shopbot-img"><img :src="oshanchu" alt=""><em @click="shopbotDel(index)">删除</em></li>
          <li class="right shopbot-img"><img :src="obianji" alt=""><em class="shopbot-em" @click="shopbotEm(index)">编辑</em></li>
        </ul>
      </div>

    </div>
    <router-link class="shopmap-new" :to="{path: '/shopMapNew',query: {title:'新建收货地址',typeMap:otypeMap}}">新建地址</router-link>
    <alert-tips :alertText="alertText" v-on:confrimTip="confrim" v-on:cancelTip="cancel" v-if="alertShow==true">
    </alert-tips>
    <success-tips :successText="successText" v-if="showTips==true" :type="type" v-on:closeTip="closeTip">
    </success-tips>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import alertTips from 'src/components/common/alert-tips'
  import successTips from 'src/components/common/success-tips'
  import {searchUserDeliveryAddress,findByCode,DeliveryAddress,DeleteAddress} from 'src/service/getData'
  import shanchu from '../../images/shanchu.png';
  import bianji from '../../images/bianji.png';

  export default {

    data(){
      return{
        headTitle: "",
        oshanchu:shanchu,
        obianji:bianji,
        alertText:'确认删除此地址?',
        alertShow:false,
        successText:'设置成功',
        showTips:false,
        otypeMap:'',
        type:1,
        ShouHuoAddress:'',
        province:'',
        ocity:'',
        area:'',
        shopmapList:[],
        deleteId:'',
        deleteIndex:''
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      this.otypeMap = this.$route.query.typeMap;
      searchUserDeliveryAddress().then(res => {
          console.log(res)
          if(res){
            this.shopmapList = [];
            this.shopmapList = this.shopmapList.concat(res.result);
            this.shopmapList.forEach((v,k)=>{
              findByCode(v.province).then(res => {
                if(res)this.shopmapList[k].province = res.result.name
              })
              findByCode(v.city).then(res => {
                if(res)this.shopmapList[k].city = res.result.name
              })
              findByCode(v.area).then(res => {
                if(res)this.shopmapList[k].area = res.result.name
              })
            })
          }
      })
    },


    mounted(){

    },

    filters:{
      /*mapFilter:function (value) {
        return value.substring(0,3)+'****'+value.substring(7,value.length);
      }*/
    },

    components:{
      headerTop,
      alertTips,
      successTips
    },

    computed:{

    },

    methods:{
      checkShopBot(index){
          if(this.shopmapList[index].isDefault)return ;
        this.shopmapList.forEach((v,k)=>{
           v.isDefault = false;
        })
        this.shopmapList[index].isDefault = true;
        DeliveryAddress(this.shopmapList[index].id,this.shopmapList[index].isDefault).then(res => {
          if(res){
            this.showTips=true;
          }
        })
      },
      shopbotEm(index){
          let path = {path: '/shopMapNew',query: {title:'新建收货地址',edit:this.shopmapList[index].id,typeMap:this.otypeMap}}
          this.$router.push(path);
      },
      shopbotDel(index){
        this.alertShow=true;
        this.deleteId=this.shopmapList[index].id;
        this.deleteIndex=index;
      }
      ,
      confrim(){
        this.alertShow=false;
        DeleteAddress(this.deleteId).then((res)=>{
            if(res){
              this.shopmapList.splice(this.deleteIndex,1)
              this.showTips=true;
              this.successText='删除成功';
            }
        })
      }
      ,
      cancel(){
        this.alertShow=false;
      }
      ,
      closeTip(){
        this.showTips=false;
      },
      shopmapTop(index){
        if(this.otypeMap == 2){
          let path = {path: '/shopPlac',query: {title:'订单确认',userIdList:JSON.stringify(this.shopmapList[index])}}
          this.$router.push(path);
        }

      }
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  @import '../shop/conment.css';
  em{
    font-style: normal;
  }
  .shopMap{
    padding-top:2rem;
    margin-bottom: 3rem;
    .shopmap-top{
      width:100%;
      font-size: .8rem;
      color: #333;
      font-weight:600;
      padding: .5rem 0 0 .5rem;
      background: #fff;
      .shoptop-way{
        width:100%;
        font-size: .6rem;
        color: #666;
        padding:.5rem 0 1rem 0;
        border-bottom: 1px solid #e5e5e5;
      }
    }
    .shopmap-bot{
      margin-bottom: .5rem;
      height:1.6rem;
      line-height:1rem;
      font-size: .6rem;
      margin-top: .5rem;
      em{
        margin:0 .4rem 0 .3rem;
      }
      .shopbot-img{
        img{
          width:1.1rem;
          height:1.1rem;
          display: inline-block;
          vertical-align: bottom;
        }
       em{
         margin-left: .1rem;
       }
      }
      .right{
        color:#808080;
      }
    }
  }





</style>
