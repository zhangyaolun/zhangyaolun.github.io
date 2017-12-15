<template>
  <div>
    <header-view signin-up='home' v-bind:ashopEmpty='shopEmpty'>
    </header-view>
    <div class="shop-view" v-if="carShow">
      <div class="shop-main" v-for="(item,i) in shopList">
        <div class="shopMain-top">
          <span :class="[item.checkStatus ? 'selected' : 'checked']" @click="changChecke(i)"></span>
          <span class="shop-name">{{item.shopname}}</span>
        </div>
        <div class="shopMain-bot clear" v-for="(items,j) in item.List" :id="items.productId">
          <span :class="[items.checkStatus ? 'selected' : 'checked']" @click="changList(j,i)"></span>
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
            ￥
            <span class="money-big">{{items.allPrice | currency}}</span>
          </div>
          <ul class="shop-adjustment clear">
            <li class="reduce" @click="reduceChang(items,j,i)">-</li>
            <li class="numberInput"><input type="text" v-model="items.num"></li>
            <li class="plus" @click="plusChang(items,j,i)">+</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shop-settlement clear" v-if="carShow">
      <div class="settlement-left left">
        <span :class="[ checkShop? 'selected' : 'checked']" @click="checkAll"></span>
        <span >&ensp;全选</span>
        <span class="total-money" v-if="editShow">&ensp;合计:&ensp;<em>￥{{allmoney | currency}}</em></span>
      </div>
      <section class="settlement-right right" v-if="editShow" @click="settlement()">去结算</section>
      <div class="editMore right" v-if="editDelShow">
        <span class="editDel" @click="delshop">删除</span>
      </div>
    </div>
    <alert-tips :alertText="alertText" v-on:confrimTip="confrim" v-on:cancelTip="cancel" v-if="alertShow==true">
    </alert-tips>
    <success-tips :successText="successText" v-if="showTips==true" :type="type" v-on:closeTip="closeTip">
    </success-tips>
    <div class="shop-empty" v-if="ocarShow">
      <div class="empty-top">
        <img src="../../images/gouwuche.png" alt="" class="gouwuche">
        <div class="empty-name">您的购物车空空如也！</div>
      </div>
      <div class="items-cell">
        <img src="../../images/shop-tuijian.png" alt="" class="tuijian">
        <div class="item-cell-1">
          <div class="left-item">
            <span class="item-title ml03">会逛</span>
            <span class="item-dec ml03">品质钟表每满500减60</span>
            <img src="../../images/ct1.png"/>
          </div>
          <div class="right-item">
            <span class="item-title ml03">品牌头条</span>
            <span class="item-dec ml03">最优质的全在这里  </span>
            <img src="../../images/ct2.png"/>
          </div>
        </div>
        <div class="item-cell-1 clear">
          <div class="left-item">
            <span class="item-title ml03">全球尖货</span>
            <span class="item-dec ml03">大牌品质</span>
            <img src="../../images/ct3.png"/>
          </div>
          <div class="right-item">
            <span class="item-title ml03">奢侈大牌</span>
            <span class="item-dec ml03">大牌钟表狂欢12期免息</span>
            <img src="../../images/ct4.png"/>
          </div>
        </div>
        <div class="item-cell-2 clear">
          <div class="cell-1">
            <span class="item-title ml03">京东体育</span>
            <span class="item-dec ml03">品！骑行装备</span>
            <img src="../../images/ct5.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">珠宝首饰</span>
            <span class="item-dec ml03">满199减100</span>
            <img src="../../images/ct6.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">环球时尚</span>
            <span class="item-dec ml03">逛！低至399</span>
            <img src="../../images/ct7.png"/>
          </div>
          <div class="cell-2">
            <span class="item-title ml03">买手甄选</span>
            <span class="item-dec ml03">欢9元秒杀</span>
            <img src="../../images/ct8.png"/>
          </div>
        </div>
      </div>
    </div>
    <footer-view :checkedNum="checkedNum">
      <span slot='logo' class="head_logo" @click="reload"></span>
    </footer-view>
  </div>
</template>

<script>
  import headerView from '../../components/header/shop-head'
  import footerView from '../../components/footer/footGuide'
  import Swiper from '../../plugins/swiper.min.js'
  import Bus from '../../config/eventbus.min.js';
  import radiusimg from '../../images/image-radius-4px.png';
  import alertTips from 'src/components/common/alert-tips'
  import {findShopCar,userAddCollection,modShopCar,delOneShopCar,delAllShop,delMoreShopCar,findByCode,userAddress,searchUserDeliveryAddress} from 'src/service/getData'
  import successTips from 'src/components/common/success-tips'
  import {getImgPath,loadMore} from 'src/components/common/mixin'
  import {setStore, getStore,removeStore} from '../../config/mUtils'
  import productDefaultImg from '../../images/pro-item-default.png'
  require('../../style/swiper.min.css')

  export default {
    data(){
      return {
          checkedNum:2,
          number:'',
          shopEmpty:'1',
          alertText:'确认要删除商品吗？',
          alertShow:false,
          editShow:true,
          editDelShow:false,
          successText:'',
          checkShop:false,
          editShop:false,
          oldcheckShop:false,
          allmoney:0,
          carShow:true,
          ocarShow:false,
          showTips:false,
          type:0,
          addCheckId:[],
          oldshopList:[],
          shopList:[
            {
                shopname:'',
                checkStatus:false,
                List:[

                ]
            },
            {
              shopname:'',
              checkStatus:false,
              List:[

              ]
            }
          ],
        productDefaultImg:productDefaultImg,
      }
    },
    mixins: [loadMore,getImgPath],
    mounted(){
     this.$nextTick(function () {
       this.carView();
     })
    },
    components: {
      headerView,
      footerView,
      alertTips,
      successTips
    },
    created(){
        this.number = this.$route.query.num;
        Bus.addEventListener("changeditclick",this.totalMoney);
        /*delAllShop().then(res => {
            console.log(res)
        })*/
      findShopCar().then(res => {
          console.log(res);
          if(res){
            let data = this;
            if(res.result.length != 0){
              this.shopEmpty=3;
              this.carShow=true;
              this.ocarShow=false;
              res.result.forEach((v,k)=>{
                if(v.channel == '1'){
                  data.shopList[0].shopname = v.channelName;
                  data.shopList[0].List=data.shopList[0].List.concat(v);
                }else{
                  data.shopList[1].shopname = v.channelName;
                  data.shopList[1].List=data.shopList[1].List.concat(v);
                }
              })
              data.typeShopList();
            }else{
              this.shopEmpty=2;
              this.carShow=false;
              this.ocarShow=true;
            }
          }
        })
    },
    computed: {

    },
    filters:{
      currency:function (value) {
        return parseFloat(value).toFixed(2);
      }
    },
    methods: {
      reload(){
        window.location.reload();
      },
      gotoSkip(path){
        this.$router.push(path);
      },
      carView(){

      },
      typeShopList(){
          if(this.shopList.length>1){
            if(this.shopList[0].List.length==0){
              if(this.oldshopList.length>0){
                this.oldshopList.splice(0,1)
              }
              this.shopList.splice(0,1)
            }else if(this.shopList[1].List.length==0){
              if(this.oldshopList.length>0){
                this.oldshopList.splice(1,1)
              }
              this.shopList.splice(1,1)
            }
          }else{
            if(this.shopList[0].List.length==0){
              if(this.oldshopList.length>0){
                this.oldshopList.splice(0,1)
              }
              Bus.dispatch("changedit",2);
              this.shopList.splice(0,1)
              this.carShow=false;
              this.ocarShow=true;
            }
          }

      },
      totalMoney(num){//编辑-完成
        this.shopEmpty = num;
        if(num == 2)return ;
        this.editShow?this.editShow = false:this.editShow = true;
        this.editDelShow?this.editDelShow = false:this.editDelShow = true;
        this.allmoney = 0;
        if(this.editDelShow){
          this.oldcheckShop = this.checkShop;
          this.oldshopList = this.copyArr(this.shopList);
          this.shopList.forEach((v,k)=>{
              if(v.List.length>0){
                this.oldshopList[k].List=this.copyArr(v.List)
              }
          })
          this.checkShop = false;
          this.shopList.forEach(function (v,k) {
            v.checkStatus = false;
            v.List.forEach(function (m,n) {
             m.checkStatus = false;
             })
          })
        }else{
          this.oldshopList.forEach(function (a,b) {
            a.checkStatus = a.checkStatus;
            a.List.forEach(function (c,d) {
              c.checkStatus = c.checkStatus;
            })
          })
          this.shopList = this.oldshopList;
          this.checkShop = this.oldcheckShop;
        }
      },
      reduceChang(items,newindex,oldindex){
          if(items.num<2) return;
          items.num --;
          this.numValue(items,newindex,oldindex);
      },
      plusChang(items,newindex,oldindex){
        items.num ++;
        this.numValue(items,newindex,oldindex);
      },
      numValue(items,newindex,oldindex){
        this.allmoney = 0;
        items.checkStatus = true;
        if(this.oldshopList.length>0){
          this.oldshopList[oldindex].List[newindex].num = items.num;
        }
        this.checkedInput(oldindex);
        modShopCar(items.productId,items.num).then(res => {})
        this.forShop();
      },
      checkAll(){//全选
        this.checkShop = !this.checkShop;
        for(let i=0,m=this.shopList.length;i<m;i++){
          this.checkShop?this.shopList[i].checkStatus = true:this.shopList[i].checkStatus = false;
          for(let j=0,n=this.shopList[i].List.length;j<n;j++){
            this.checkShop?this.shopList[i].List[j].checkStatus = true:this.shopList[i].List[j].checkStatus = false;
          }
        }
        this.allmoney = 0;
        this.forShop();
      },
      changChecke(index){
        this.shopList[index].checkStatus = !this.shopList[index].checkStatus;
        for(let i=0,m=this.shopList[index].List.length;i<m;i++){
          this.shopList[index].checkStatus?this.shopList[index].List[i].checkStatus = true:this.shopList[index].List[i].checkStatus = false;
        }
        this.allmoney = 0;
        this.forShop();
        this.allcheckedInput();

      },
      changList(newindex,oldindex){
        console.log(newindex)
        this.shopList[oldindex].List[newindex].checkStatus = !this.shopList[oldindex].List[newindex].checkStatus;
        this.checkedInput(oldindex);
        this.allmoney = 0;
        this.forShop();
        this.allcheckedInput();

      },
      delshop(){//点击删除
        this.addproductId();
        let falg = true;
        if(this.addCheckId.length >= 1){
          falg = false;
          this.alertShow=true;
        }
        if(falg){
          this.successText = '请选择要删除的商品'
          this.showTips=true;
          this.type=0;
        }
      },
      copyArr : function (arr){
        return arr.map((e)=>{
            if(typeof e === 'object'){
          return Object.assign({},e)
        }else{
          return e
        }
      })
      },
      confrim(){//删除确定
        this.addproductId();
        let id='',vm=this;
        vm.addproductId();
        if(vm.addCheckId.length == 1){
          id = vm.addCheckId[0].productId;
        }else{
          vm.addCheckId.forEach((v,k)=>{
            id=v.productId+','+id
          })
          id=id.substring(0,id.length-1);
        }
        vm.truedelOneShopCar(id)
      }
      ,
      cancel(){//删除取消
        this.alertShow=false;
      },
      truedelOneShopCar(id){
        let vm=this,falg=false;
          if(id.indexOf(',') >0){
            delMoreShopCar(id).then(res => {
                if(res) this.removeShopSucc();
            })
          }else{
            delOneShopCar(id).then(res => {
              if(res) this.removeShopSucc();
            })
          }
      },
      removeShopSucc(){
        let vm=this;
        vm.addCheckId.forEach((v,k)=>{
          vm.removeShopList(vm.oldshopList,v.productId);
          vm.removeShopList(vm.shopList,v.productId);
        })
        vm.typeShopList();
        vm.successText = '删除成功'
        vm.showTips=true;
        vm.type=1;
        vm.alertShow=false;
      },
      addproductId(){//查询选中
        this.addCheckId=[];
        let vm = this;
        this.shopList.forEach(function (v,k) {
          v.List.forEach(function (m,n) {
            if(m.checkStatus){
              vm.addCheckId.push(m);
            }
          })
        })
      },
      removeShopList(obj,oid){//删除
        let b = false;
        obj.forEach(function (v,k) {
          v.List.forEach(function (m,n) {
            if(m.productId == oid){
              v.List.splice(n,1);
              b = true;
            }
          })
        })
        return b;
      },
      settlement(){//结算
        let vm = this;
        this.addproductId();
        if(vm.addCheckId.length == 0){
          vm.successText = '请选择要结算的商品'
          vm.showTips=true;
          vm.type=0;
        }else{
          let path;
          setStore('addCheckId',JSON.stringify(vm.addCheckId))
          setStore('allmoney',vm.allmoney)
          path = {path: '/shopPlac',query: {title:'订单确认'}}
          vm.$router.push(path);
        }
      },
      forShop(){
        if(this.shopList.length>1){
          this.forEachAllShop(this.shopList[0].List)
          this.forEachAllShop(this.shopList[1].List)
        }else{
          this.forEachAllShop(this.shopList[0].List)
        }
      },
      forEachAllShop(data){//总价钱
        let vm = this;
        data.forEach((v,k)=>{
            if(v.checkStatus){
              vm.allmoney +=  v.allPrice*v.num
            }
        })
      },
      closeTip(){
        this.showTips=false;
      },
      checkedInput(oldindex){//点击单个检验选中
        let numm = true;
        for(let i=0,m=this.shopList[oldindex].List.length;i<m;i++){
          if(!this.shopList[oldindex].List[i].checkStatus) numm=false;
        }
        !numm?this.shopList[oldindex].checkStatus=false:this.shopList[oldindex].checkStatus=true
        this.allcheckedInput();
      },
      allcheckedInput(){//点击单个检验全部选中
        let numm = true;
        for(let i=0,m=this.shopList.length;i<m;i++){
            for(let j=0,n=this.shopList[i].List.length;j<n;j++){
              if(!this.shopList[i].List[j].checkStatus) numm=false;
            }
        }
        numm?this.checkShop = true:this.checkShop = false;
      },
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  @import 'conment.css';
  .shop-view {
    position: relative;
    top: 1.5rem;
    width: 100%;
    background-color: #f2f2f2;
    height: 27.7rem;
    overflow: auto;
    padding-top: .5rem;
    .shop-main{
      min-height: 6rem;
      margin-top: .5rem;
      background-color: #fff;
      box-sizing: border-box;
      border-top:1px solid #e5e5e5;
    }
  }

  .shop-main {
    .shopMain-top{
      width:100%;
      height: 2rem;
      line-height: 1.5rem;
      background-color: #fafafa;
      padding: 0 .5rem;
      .shop-name{
        display: inline-block;
        font-size: .65rem;
        padding-left: .3rem;
      }
    }
    .shopMain-bot{
      height: 5rem;
      padding: .4rem .5rem 0;
      position: relative;
      border-top:1px solid #eff1f4;
      img{
        vertical-align: middle;
      }
      .shop-img{
        width: 4.2rem;
        height: 4.2rem;
        padding-left: .3rem;
      }
      .shop-cont{
        font-size: .6rem;
        width: 9.7rem;
        display: inline-block;
        line-height: .8rem;
        margin-right: 1.5rem;
        color: #4c4c4c;
        overflow: hidden;
        text-overflow: ellipsis;
        display: box;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .shop-weight{
        font-size: .55rem;
        width: 9.7rem;
        height: .9rem;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #b3b3b3;
      }
      .shop-money{
        position: absolute;
        left: 7rem;
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
        right: .5rem;
        bottom: .4rem;
        width: 4rem;
        height:1.2rem;
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        box-sizing: border-box;
        li{
          float: left;
          width:1.1rem;
          border-right:1px solid #e4e4e4;
          text-align: center;
          font-size: 1.3rem;
          height:1.1rem;
          line-height:.9rem;
        }
        .numberInput{
          width:1.6rem;
          font-size: .7rem;
          height:1.1rem;
          line-height:1.1rem;
          input{
            text-align: center;
            width:1.6rem;
            font-size: .7rem;
            height:1.1rem;
            border:none;
            background: #fff;
          }
        }
        .plus{
          border-right:0;
        }
      }
    }
  }
  .shop-settlement{
    width:100%;
    height:2.2rem;
    position: fixed;
    bottom: 2rem;
    background-color: #fff;
    line-height: 2.2rem;
    border-top:1px solid #e5e5e5;
    padding-left: .4rem;
    .settlement-left{
      font-size: .8rem;
      color: #333;
    }
    .total-money em{
      font-style:normal;
      color: #f23030;
    }
    .settlement-right{
      width:5.45rem;
      text-align: center;
      background-color: #f23030;
      color:#fff;
    }
    .editMore{
      padding-right: .5rem;
      line-height: 1.9rem;
      span{
        width:3.35rem;
        height:1.4rem;
        line-height:1.3rem;
        text-align: center;
        display: inline-block;
        border: 1px solid #000;
        font-size: .3rem;
        border-radius: 5px;
      }
      .editDel{
        color: #ff0000;
        margin-left:.4rem;
        border-color: #ff0000;
      }
    }
  }
  .shop-empty{
    padding-top:3.45rem;
    width:100%;
    height: 29rem;
    overflow: auto;
    .empty-top{
      text-align: center;
      .gouwuche{
        width:2.6rem;
        height: 2.1rem;
        padding-bottom:1rem;
        vertical-align: middle;
      }
      .empty-name{
        font-size: .75rem;
        color: #898989;
        padding-bottom:1.45rem;
      }
    }
    .cell-title {
      @include wh(100%, auto);
    }
    .item-dec {
      @include sc(0.5rem, #c86edb);
      display: block;

    }
    .tuijian{
      width:100%;
      height: 2.1rem;
      vertical-align: middle;
    }
    .item-cell-1 {
      font-size: .5rem;
      width: 100%;
      background-color: #ffffff;
      overflow: hidden;
      border-bottom: 1px solid #f0f0f0;

      div {
        width: 50%;
        display: inline-block;

        img {
          margin-top: 0.2rem;
          width: 100%;
          height: auto;
        }

      }
      .left-item {
        border-right: 1px solid #f0f0f0;
        float: left;
      }

      .right-item {

      }

      .cell-left {
        vertical-align: top;
        width: 50%;
      }

      .cell-right {
        vertical-align: top;
        width: 50%;
      }

    }
    .item-cell-2 {
      width: 100%;
      background-color: #ffffff;
      border-bottom: 1px solid #f0f0f0;

      div {
        width: 25%;
        display: inline-block;
        vertical-align: top;
        float: left;
        img {
          margin-top: 0.2rem;
          width: 100%;
          height: auto;
        }

      }
      .cell-1 {
        border-right: 1px solid #f0f0f0;
      }

    }
    .item-title {
      @include sc(0.7rem, #4c4c4c);
      display: block;
      margin-top: 0.2rem;
    }

    .item-dec {
      @include sc(0.5rem, #c86edb);
      display: block;
    }
    .ml03 {
      margin-left: 0.3rem;
    }
  }
  .deleteShop{
    position: absolute;
    width:100%;
    height:100%;
    bottom:0;
    left:0;
    z-index: 999;
    background: rgba(0,0,0,.3);
    text-align: center;
    .del-determine{
      position: absolute;
      bottom:3.3rem;
      background:url("../../images/shop-del-1.png") no-repeat;
      width:95%;
      margin-left:2.5%;
      height:4.65rem;
      background-size: 100% 4.65rem;
      span{
        height:1.8rem;
        line-height: 1.8rem;
        display: block;
        font-size: .7rem;
        color: #808080;
        border:1px solid #e5e5e5;
      }
      div{
        line-height: 2.7rem;
        font-size: .9rem;
        color: #e74b41;
      }
    }
    .del-cancel{
      position: absolute;
      bottom:.4rem;
      width:95%;
      margin-left:2.5%;
      height:2.6rem;
      line-height: 2.6rem;
      background:url("../../images/shop-del-2.png") no-repeat;
      background-size: 100% 2.6rem;
      font-size: .9rem;
      color: #4187e7;
    }
  }


</style>
