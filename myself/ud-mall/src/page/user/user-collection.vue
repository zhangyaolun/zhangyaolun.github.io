<template>
    <div>
       <header-top :head-title="headTitle">
       </header-top>
      <mt-loadmore class="productListView"  :all-loaded ="true"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" >
        <div>
          <div class="product-list">
            <mt-cell-swipe title='' :right="[{content: '删除',
               style: { background: 'red',
               color: '#fff',fontSize:'.8rem',
               lineHeight:'6rem' },
               handler:()=>messagebox(index) }]"
                           v-for="(item,index) in oRes" class="product-item" :id="item.id" v-load-more="loadMoreData">
              <section class="top" @click.stop="gotoSkip({path: '/product-detail',query:{proId:item.ProductDto.id}})">
                <img class="product-img" :src="getImgPath(item.ProductDto.productImage)">
                <div class="product-info">
                  <span class="proTitle">{{item.ProductDto.productName}}</span>
                  <span class="proTitle">{{item.ProductDto.productDesc}}</span>
                  <div class="proPrice">
                    <span class="product-price">￥{{item.ProductDto.salePrice}}</span>
                    <span class="product-oprice">￥{{item.ProductDto.sourcePrice}}</span>
                    <section @click.stop.prevent="addCart(index)" class="cart">
                      <img src="../../images/cart-img.png"/>
                    </section>
                  </div>
                </div>
              </section>


            </mt-cell-swipe>
          <!--  <img class="product-img" src="../../images/product1.png">
             <div class="product-info">
                <span class="proTitle">Apple Ipad 平板电脑 9.7(32G WLAN版/A9芯片/Retina屏)</span>
                <div class="proPrice">
                   <span class="product-price">￥2348</span>
                   <span class="product-oprice">￥2688</span>
                   <section @click.stop.prevent="addCart()" class="cart">
                       <img src="../../images/cart-img.png"/>
                   </section>
                </div>
             </div>-->
          </div>
        </div>
      </mt-loadmore>

      <success-tips :successText="successText" v-if="showTips==true" v-on:closeTip="closeTip">
      </success-tips>
    </div>
</template>
<script>
import headerTop from 'src/components/header/inside-head'
import successTips from 'src/components/common/success-tips'
import Swiper from '../../plugins/swiper.min.js'
import {userCollection,userDeleteCollection,shopaddShopCar} from 'src/service/getData'
import {getImgPath,loadMore} from 'src/components/common/mixin'
require('../../style/swiper.min.css')

export default {

    data(){
        return{
          headTitle: "",
          successText:'加入购物车成功',
          showTips:false,
          allLoaded:true,
          page:1,
          oRes:[],
          bottomStatus:'',
          topStatus:'',
          isloading:false
        }
    },
    created(){
        this.headTitle = '我的收藏';
        userCollection(this.page).then(res => {
          console.log(res);
          if(res){
            this.oRes = res.result;
          }
        })
    },
   mixins: [loadMore,getImgPath],

	  mounted(){
        var categorySwiper = new Swiper ('#category-swiper', {
                   direction: 'horizontal',

        })
    },

    components:{
        headerTop,
        successTips
    },

    computed:{

    },

    methods:{
      addCart(index){
        shopaddShopCar(this.oRes[index].ProductDto.id,1 ).then(res => {
          this.successText = '加入购物车成功'
          this.showTips=true;
        })
      },

      gotoSkip(path){
        this.$router.push(path);
      }
      ,

      closeTip(){
        this.showTips=false;
      },
      messagebox(index){
         userDeleteCollection(this.oRes[index].id,false).then(res => {
             if(res){
               this.successText = '删除成功'
               this.showTips=true;
               this.oRes.splice(index,1);
             }
          })
      },
      loadTop() {

      },
      loadBottom() {

      },
      handleTopChange(status) {
      },
      bottomChange(status){
      },
      async loadMoreData(){
        if(this.isloading){
          return;
        }
        this.isloading=true;
        this.bottomMore();
      },
      bottomMore(){
        this.page++;
        let vm = this;
        userCollection(this.page).then(res => {
            console.log(res)
          if(res){
              if(res.result){
                vm.isloading=false;
                vm.oRes=vm.oRes.concat(res.result)
                this.$refs.loadmore.onTopLoaded();
              }else{
                vm.isloading=true;
                return ;
              }
          }
        })
      }
    },
}

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .categoryListView{
    width:100%;
    background-color: #fff;
    border-bottom:1px solid #ededed;
  }
  .top{
    margin-top:.5rem;
    width: 19rem;
  }
  .product-list{
    background-color: #fff;
  }
  .productListView{
    position: relative;
    top:2rem;
    width:100%;
    height:auto;
    font-size:.8rem;
    color: #ccc;
    .banner{
       display:block;
       width:100%;
       height:auto;
    }
    .product-item{
       width:100%;
       height:6rem;
       display:block;
       border-bottom:1px solid #ededed;
       clear:both;

       .product-img{
          display:inline-block;
          width: 4.2rem;
          height: 4.2rem;
          margin-left:5%;
          vertical-align:middle;
       }
       .product-info{
          margin-left:5%;
          display:inline-block;
          height:100%;
          width:55%;
          vertical-align:middle;
          .proTitle{
            font-weight:bold;
             margin-top:5%;
             font-size:.65rem;
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 2;
             overflow: hidden;
          }
          .proPrice{
             width:100%;
             margin-top:10%;
            .product-price{
                display:inline-block;
                font-weight:bold;
                font-size:.7rem;
                color:#ec0000;
                vertical-align:middle;
            }
            .product-oprice{
              display:inline-block;
              margin-left:2%;
              text-decoration:line-through;
              font-size:.6rem;
              color:#7a7a7a;
              vertical-align:middle;
            }
            .cart{
              float:right;
              display:inline-block;
              width:35%;
              vertical-align:middle;
              text-align:right;
              img{
                width:1rem;
                height:auto;
              }
            }
          }

       }
    }
  }




</style>
