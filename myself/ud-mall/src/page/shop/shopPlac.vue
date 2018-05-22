<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="shop-place" v-if="showPlace">
      <div class="place-details">
        <router-link class="place-map clear" :to="{path: '/shopMap',query: {title:'地址管理',typeMap:2}}">
          <img src="../../images/icon1.png" alt="" class="icon left">
          <div class="placemap-right left">
            <div class="placemap-top">
              <span>{{mapName}}</span>
              <em>{{mapPhone | mapFilter}}</em>
            </div>
            <div class="placemap-bot">
              <span v-for="item in pCodeCode">{{item}}</span><span>{{mapTitle}}</span>
            </div>
          </div>
          <img src="../../images/zhankai.png" alt="" class="zhankai right">
        </router-link>
          <div class="details-top">商品详情</div>
          <div class="shopMain-bot clear" v-for="(items,j) in placelist" :id="items.productId">
            <img :src="getImgPath(items.productImage,productDefaultImg)" alt="" class="shop-img">
            <div class="right">
              <span class="shop-cont">
              {{items.productName}}
              </span>
              <span class="shop-weight">
                {{items.productDetail}}
              </span>
            </div>
            <div class="shop-money">
              <span class="money-big">{{items.allPrice | currency}}</span>
            </div>
            <ul class="shop-adjustment">
              <li class="reduce">x{{items.num}}</li>
            </ul>
          </div>
          <div class="place-freight place-main clear">
            <span class="left">运费</span>
            <em class="right freightMoney">{{freightMoney | freightCurrency}}</em>
          </div>
          <div class="place-main clear">
            <span class="left">买家留言</span>
            <input type="text" placeholder="可填写与商家达成一致的内容" value="" class="right" ref="input">
          </div>
      </div>
      <div class="place-submit clear">
          <div class="placesub-left left">
            <span>实付款:</span>
            <em>{{placesubMoney | currency}}</em>
          </div>
           <section class="placesub-right right" @click="placesubClick">提交订单</section>
      </div>
    </div>
    <popupTop v-if="showPopup"></popupTop>
  </div>

</template>
<script>
  import headerTop from 'src/components/header/inside-head'
  import popupTop from 'src/page/map/popup'
  import radiusimg from '../../images/image-radius-4px.png'
  import {setStore, getStore,removeStore} from '../../config/mUtils'
  import {getImgPath} from 'src/components/common/mixin'
  import productDefaultImg from '../../images/pro-item-default.png'
  import {createOrder,searchUserDeliveryAddress,delMoreShopCar,delOneShopCar,userAddress,findByCode} from 'src/service/getData'

  export default {

    data(){
      return{
        headTitle: "",
        showPlace:true,
        showPopup:false,
        mapName:'杨建忠',
        mapTitle:'上海市宝山区',
        mapPhone:'13755552411',
        freightMoney:'0',
        userDeliveryId:'',
        placesubMoney:'25.26',
        placelist:[

        ],
        pCodeCode:[],
        productDefaultImg:productDefaultImg,
      }
    },
    created(){
      this.headTitle = this.$route.query.title;
      if(this.$route.query.userIdList){//地址管理过来
        let v = JSON.parse(this.$route.query.userIdList);
        this.userDeliveryId = v.id;
        this.mapName = v.name;
        this.mapTitle = v.address;
        this.mapPhone = v.moblie;
        this.pCodeCode = [];
        this.pCodeCode.push( v.province)
        this.pCodeCode.push( v.city)
        this.pCodeCode.push( v.area)
      }else if(this.$route.query.opCodeCode){//新建地址过来
        this.userDeliveryId = this.$route.query.userDeliveryId;
        this.pCodeCode = this.$route.query.opCodeCode.reverse();
        searchUserDeliveryAddress().then(res => {
          if(res){
            res.result.forEach((v,k)=>{
              if(v.id == this.userDeliveryId){
                this.mapName = v.name;
                this.mapTitle = v.address;
                this.mapPhone = v.moblie;
              }
            })
          }
        })
      }else{//直接进来
        userAddress().then(res => {
          console.log(res)
          if(res){
            let path;
            if(res.msg.indexOf('无数据') != 0){
              let oList = res.result;
              this.mapName = oList.name;
              this.mapTitle = oList.address;
              this.mapPhone = oList.moblie;
              this.userDeliveryId = oList.id;
              this.getMap(oList.province,oList.city,oList.area)
            }else{
              searchUserDeliveryAddress().then(res =>{
                if(res.msg.indexOf('无数据') != 0){
                  path = {path: '/shopMap',query: {title:'地址管理',typeMap:2}}
                  vm.$router.push(path);
                }else{
                  this.showPlace=false;
                  this.showPopup=true;
                }
              })
            }
          }
        })
      }
        this.placelist = JSON.parse(getStore('addCheckId'));
        this.placesubMoney=getStore('allmoney');
    },
    mixins: [getImgPath],

    mounted(){

    },

    filters:{
      mapFilter:function (value) {
          console.log(value)
        return value.substring(0,3)+'****'+value.substring(7,value.length);
      },
      currency:function (value) {
        return '￥'+parseFloat(value).toFixed(2);
      },
      freightCurrency:function (value) {
        return value+'元';
      }
    },

    components:{
      headerTop,
      popupTop
    },

    computed:{

    },

    methods:{
      getMap(province,city,area){
        this.pCodeCode = [];
        findByCode(province).then(res => {
          if(res)this.pCodeCode.push(res.result.name);
          findByCode(city).then(res => {
            if(res)this.pCodeCode.push(res.result.name);
            findByCode(area).then(res => {
              if(res)this.pCodeCode.push(res.result.name);
            })
          })
        })
      },
      placesubClick(){
       let path = '',vm=this,userDeliveryId='',remark='',proItem='';
        userDeliveryId=this.userDeliveryId;
        remark=vm.$refs.input.value;
        vm.placelist.forEach((v,k)=>{
          proItem = v.productId+'|'+v.num+','+proItem
        })
        proItem = proItem.substring(0,proItem.length-1);
        createOrder(userDeliveryId,remark,proItem).then(res => {
            console.log(res)
           /*removeStore('addCheckId');
           removeStore('allmoney');*/
           if(res){
               let id = '';
             if(vm.placelist.length == 1){
               id = vm.placelist[0].productId;
               delMoreShopCar(id).then(res => {})
             }else{
               vm.placelist.forEach((v,k)=>{
                 id=v.productId+','+id
               })
               id=id.substring(0,id.length-1);
               delOneShopCar(id).then(res => {})
             }

             path = {path: '/shopPar',query: {title:'订单支付',orderNo:res.result.orderNo,payPrice:res.result.payPrice,orderId:res.result.orderId,userDeliveryId:res.result.userDeliveryId,userDeliveryDetail:res.result.userDeliveryDetail}};
             vm.$router.push(path);
           }
        })
      }


    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  em{
    font-style: normal;
  }
  .shop-place{
    padding-top: 2rem;
    overflow: hidden;
    .place-details{
      height:29.3rem;
      overflow-y: auto;
      .place-map{
        width:100%;
        height:3rem;
        padding-top: .3rem;
        display: block;
        background: #fff;
        .icon{
          width:.9rem;
          height:.9rem;
          padding: 1.4rem .4rem 0 .5rem;
        }
        .placemap-right{
          .placemap-top{
            color: #333;
            font-size: .75rem;
            font-weight: 600;
            span{
              font-weight: 600;
              margin-right: 1.4rem;
            }
            margin-bottom: .4rem;
          }
          .placemap-bot{
            font-size: .6rem;
            color: #666;
          }
        }
        .zhankai{
          width:.6rem;
          height:1rem;
          padding:.7rem .5rem 0 0;
        }
      }
      .details-top{
        font-size: .7rem;
        color: #4c4c4c;
        padding-left: .5rem;
        height:1.5rem;
        line-height: 1.5rem;
        background: #fff;
      }
      .shopMain-bot{
        height: 5rem;
        padding: .4rem .5rem 0;
        position: relative;
        background: #fff;
        border-bottom:1px solid #eff1f4;
        .shop-img{
          width: 4rem;
          height: 4.2rem;
          padding-left: .3rem;
          margin-right:.4rem;
        }
        .shop-cont{
          font-size: .65rem;
          width: 13rem;
          display: inline-block;
          line-height: .8rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: box;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .shop-weight{
          font-size: .55rem;
          width: 13rem;
          height: .9rem;
          display: inline-block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #b2b2b2;
        }
        .shop-money{
          position: absolute;
          left: 5.1rem;
          bottom: .5rem;
          font-size: .5rem;
          color: #d81d0e;
          span{
            color: #d81d0e;
          }
          .money-big{
            font-size: .7rem;
          }
        }
        .shop-adjustment{
          position: absolute;
          right: .8rem;
          bottom: .2rem;
          height:1.2rem;
          li{
            text-align: center;
            font-size: .5rem;
            height:1.1rem;
            line-height:.9rem;
            color: #b2b2b2;
          }
        }
      }
      .place-main{
        width:100%;
        height: 2rem;
        background: #fff;
        font-size: .6rem;
        padding: 0 .5rem;
        color: #808080;
        line-height:2rem;
        span{
          color: #808080;
        }
        input{
          color: #808080;
          font-size: .6rem;
          width:7.8rem;
          height:1.3rem;
          margin-top:.3rem;
        }
        ::-webkit-input-placeholder {
          color: #808080;
        }
        :-moz-placeholder {
          color: #808080;
        }
        ::-moz-placeholder {
        }
        :-ms-input-placeholder {
          color: #808080;
        }
      }
      .place-freight{
        margin-top: .5rem;
        border-bottom:1px solid #eff1f4;
      }
    }
    .place-submit{
      position: fixed;
      bottom:0.05rem;
      width:100%;
      height:2rem;
      line-height:2rem;
      box-sizing: border-box;
      background: #fff;
      border-top:1px solid #eff1f4;
      .placesub-left{
        color: #333;
        font-size: .7rem;
        margin-left:6rem;
        em{
          color: #df463a;
        }
      }
      .placesub-right{
        width:5rem;
        height:2rem;
        font-size: .8rem;
        text-align: center;
        background: #f23030;
        color: #fff;
      }
    }



  }


</style>
