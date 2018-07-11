<template>
    <div>
       <header-top :head-title="headTitle">
       </header-top>

       <div class="productListView"  >
          <img class="banner" src="../../images/s-banner.png">
          <div class="categoryListView">
          <div class="swiper-container" id="category-swiper">
              <img class="left-arrow" src="../../images/left-arrow.png"/>
              <img class="right-arrow" src="../../images/right-arrow.png"/>
              <div class="swiper-wrapper category-swiper">
                  <div class="swiper-slide" v-for="i in catePage">
                      <section @click="changeCateTab(y,getCateCode(i,y))" :class="[{'active':selected==y},'category-item'] " v-for="y in getForCount(i)">
                          <span>{{getCateTitle(i,y)}}</span>
                      </section>
                  </div>
             </div>
             </div>
          </div>
          <div class="product-list">
            <section @click.stop="gotoSkip({path: '/product-detail',query:{proId:pro.id}})"  v-for="(pro,index) in proList" class="product-item" v-load-more="loadMoreData">
              <img class="product-img" :src="getImgPath(pro.product_image,productDefaultImg)">
              <div class="product-info">
                 <span class="proTitle">{{pro.product_name}} {{pro.product_desc}}</span>
                 <div class="proPrice">
                    <span class="product-price">￥{{pro.sale_price}}</span>
                    <span class="product-oprice">￥{{pro.source_price}}</span>
                    <section class="buy" @click.stop.prevent="addCart(index)">
                        <img src="../../images/cart-img.png"/>
                    </section>
                 </div>
              </div>
            </section>
          </div>
         </div>
      <success-tips :successText="successText" v-if="showTips==true" v-on:closeTip="closeTip">
      </success-tips>
    </div>
</template>
<script>
import headerTop from 'src/components/header/inside-head'
import { Loadmore } from 'mint-ui';
import {findCategoryById,findProductByPro,shopaddShopCar} from 'src/service/getData'
import {getImgPath,loadMore} from 'src/components/common/mixin'
import Swiper from '../../plugins/swiper.min.js'
import successTips from 'src/components/common/success-tips'
import productDefaultImg from '../../images/pro-item-default.png'
require('../../style/swiper.min.css')

export default {

    data(){
        return{
          headTitle: "",
          catePage:0,
          catePageCount:4,
          cateTotalCount:0,
          cateSlist:"",
          cateCode:'',
          cateLevel:0,
          selected:1,
          currentPage:1,
          proTotalPage:0,
          proList:[],
          allLoaded:true,
          isloading:false,
          successText:'',
          showTips:false,
          productDefaultImg:productDefaultImg,
        }
    },
    mixins: [loadMore,getImgPath],
    created(){
        this.headTitle = this.$route.query.title;
        this.cateCode=  this.$route.query.cateCode;
        this.cateLevel= this.$route.query.level;
    },


	  mounted(){
        var categorySwiper = new Swiper ('#category-swiper', {
                   direction: 'horizontal',
        })
        findCategoryById(this.cateCode,this.cateLevel).then(ress => {
          if(ress){
          this.cateSlist=ress.result;
          this.cateTotalCount=this.cateSlist.length;
          this.catePage=this.cateTotalCount% this.catePageCount== 0 ? parseInt(this.cateTotalCount/ this.catePageCount) : parseInt(this.cateTotalCount/ this.catePageCount)+ 1 ;
          if(this.cateSlist!=null&&this.cateTotalCount>0){
            this.getProductData(this.currentPage,this.cateSlist[this.selected-1].category_code,'',0);
            //this.getProductData(this.currentPage,'','',0);
          }}
        });
    },


    components:{
        headerTop,
        successTips
    },

    computed:{

    },

    methods:{
      loadTop() {
       // 加载更多数据
        this.currentPage=0;
        this.proList=[];
        this.proTotalPage=0;
        this.getProductData(this.currentPage,this.cateSlist[this.selected-1].category_code,'',0);
      },
      gotoSkip(path){

        this.$router.push(path);
      },
      handleTopChange(status) {
      },
      bottomChange(){
      },
      loadBottom() {
      },
      async loadMoreData(){
        if(this.isloading||this.currentPage>=this.proTotalPage){
            return;
        }
        this.isloading=true;
        this.currentPage=this.currentPage+1;
        this.getProductData(this.currentPage,this.cateSlist[this.selected-1].category_code,'',0);
      },
      changeCateTab(index,code){
        this.currentPage=0;
        this.proList=[];
        this.proTotalPage=0;
        this.selected=index;
        this.getProductData(this.currentPage,code,'',0);
      },
      getForCount(currentPage){
        if(this.cateTotalCount<this.catePageCount){
          return this.cateTotalCount;
        }else if(this.cateTotalCount-currentPage*this.catePageCount>0){
          return this.catePageCount;
        }else{
          return Math.abs(this.cateTotalCount-currentPage*this.catePageCount);
        }
      },
      getCateTitle(currentPage,index){
        return this.cateSlist[(currentPage-1)*this.catePageCount+(index-1)].category_name;
      },
      getCateCode(currentPage,index){
        return this.cateSlist[(currentPage-1)*this.catePageCount+(index-1)].category_code;
      },
      getProductData(page,ccode,spos,sort){
        findProductByPro(page,ccode,spos,sort).then(res => {
          if(res){
            console.log(res)
            let resultObj = res.result;
            this.proTotalPage = resultObj.totalPage;
            this.currentPage = resultObj.currentPage;
            this.proList = this.proList.concat(resultObj.reslutList);
            this.isloading = false;
          }
        })
      },
      addCart(index){//加入购物车
        shopaddShopCar(this.proList[index].id,1 ).then(res => {
          this.successText = '加入购物车成功'
          this.showTips=true;
        })
      },
      closeTip(){
        this.showTips=false;
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

   #category-swiper{
      width:100%;
      height:2rem;
      .category-item{
        display:inline-block;
        border-radius:100px;
        margin-left:2.4%;
        width:22%;
        height:1.2rem;
        margin-top:.4rem;
        background:#f7f7f7;
        font-size:0.5rem;
        line-height:1.2rem;
        text-align:center;
        span{
          @include sc(0.5rem, #4c4c4c);
        }
      }
      .active{
        background:#fcebf0;
        span{
          @include sc(0.5rem, #d15377);
        }
      }
      .left-arrow{
         position:absolute;
         top:.4rem;
         left:2.4%;
         z-index:100;
         height:1.2rem;
         width:auto;
       }
      .right-arrow{
        position:absolute;
        top:.4rem;
        right:2.4%;
        z-index:100;
        height:1.2rem;
        width:auto;
      }
   }
  .product-list{
    background-color: #fff;
  }
  .productListView{
    position: relative;
    top:2rem;
    width:100%;
    height:auto;
    color:#333;
    font-size:.8rem;



    .banner{
       display:block;
       width:100%;
       height:auto;
    }
    .product-item{
       width:100%;
       height:8rem;
       display:block;
       border-bottom:1px solid #ededed;
       clear:both;
       .product-img{
          display:inline-block;
          height:6.55rem;
          width:5.9rem;
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
             margin-top:.8rem;
             height:2rem;
             font-size:.65rem;
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 2;
             overflow: hidden;
              color:#000000;
          }
          .proPrice{
            position: relative;
            width:100%;
            height:1.2rem;
            margin-top:3rem;
            .product-price{
                display:inline-block;
                font-weight:bold;
                font-size:.7rem;
                line-height: 1.2rem;
                color:#ec0000;
                vertical-align:middle;
            }
            .product-oprice{
              display:inline-block;
              margin-left:2%;
              text-decoration:line-through;
              font-size:.6rem;
              line-height: 1.2rem;
              color:#7a7a7a;
              vertical-align:middle;
            }
            .buy{
              float:right;
              display:inline-block;
              width:35%;
              vertical-align:middle;
              img{
                width:1.2rem;
                height:1.2rem;
              }
            }
          }

       }
    }
  }




</style>
