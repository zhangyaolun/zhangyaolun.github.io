<template>
    <div>
       <header-top v-on:increment="incrementTotal" >
       </header-top>
       <div class="productListView">
          <div class="categoryListView">
              <div class="sx-view">
                      <section @click="tabClick(index)" :class="[{'active':selected==index},'category-item']" v-for="(title, index) in tabTitle">
                          <span v-if="index!=0">{{title}}</span>
                          <span v-if="index==0">{{cateName}}</span>

                          <div :class="[{'default-view':priceSort==0},{'top-arrow':priceSort==1},{'bot-arrow':priceSort==2},'arrow-view']" v-if="index==2">
                          </div>
                          <div :class="[{'cate-default-view':showCateTips==false},{'cate-view':showCateTips==true},'arrow-view']" v-if="index==0">
                          </div>
                      </section>
              </div>
          </div>
          <div :style="proHeight" class="product-list">
            <section @click.stop="gotoSkip({path: '/product-detail',query:{proId:pro.id}})"  v-for="(pro,index) in proList" class="product-item" v-load-more="loadMoreData">
              <img class="product-img" :src="getImgPath(pro.product_image,productDefaultImg)">
              <div class="product-info">
                <span class="proTitle">{{pro.product_name}} {{pro.product_desc}}</span>
                <div class="proPrice">
                  <span class="product-price">￥{{pro.sale_price}}</span>
                  <span class="product-oprice">￥{{pro.source_price}}</span>
                  <section @click.stop.prevent="addCart(pro.id)" class="buy">
                    <img src="../../images/cart-img.png"/>
                  </section>
                </div>
              </div>
            </section>
          </div>
       </div>
      <success-tips :successText="successText" v-if="showTips==true" v-on:closeTip="closeTip">
      </success-tips>
      <cate-view v-on:cancel="closeTip" :selectedFCate="selectedFCate" :selectedSCate="selectedSCate" :selectedTCate="selectedTCate"  v-if="showCateTips==true" :cateList="cateList" v-on:changeFcate="changeFcate" v-on:changeScate="changeScate" v-on:getProData="getProData">
      </cate-view>
      <empty-seach v-if="emptySeach"></empty-seach>
    </div>
</template>
<script>
import headerTop from 'src/components/header/mall-inside-head'
import Swiper from '../../plugins/swiper.min.js'
import Bus from '../../config/eventbus.min.js';
import { Loadmore } from 'mint-ui';
import {findCategoryById,findProductByPro,shopaddShopCar,findAllCategory} from 'src/service/getData'
import {getImgPath,loadMore,ModalHelper} from 'src/components/common/mixin'
import productDefaultImg from '../../images/pro-item-default.png'
import successTips from 'src/components/common/success-tips'
import cateView from 'src/components/common/cate-view'
import {checkText} from 'src/components/common/mixin'
import emptySeach from 'src/components/common/empty-seach'
require('../../style/swiper.min.css')

export default {

    data(){
        return{
          tabTitle:['分类',"销量","价格","人气"],
          mallTitle:'',
          emptySeach:false,
          selected:0,
          priceSort:0,
          cateCode:'',
          currentPage:1,
          proTotalPage:0,
          proList:[],
          allLoaded:true,
          isloading:false,
          currentSort:0,
          proHeight:{
            minHeight:0,
          },
          productDefaultImg:productDefaultImg,
          title:'',
          showTips:false,
          showCateTips:false,
//          scateList:'',
//          tcateList:'',
           selectedFCate:-1,
           selectedSCate:-1,
           selectedTCate:-1,
          cateName:'分类',
          cateList:'',
        }
    },
    created(){
      this.cateCode=  this.$route.query.cateCode;
      this.selectedFCate=  this.$route.query.cateCode;
      this.selectedSCate=this.$route.query.sCateCode;
      this.cateName=  this.$route.query.catTitle;
      this.mallTitle=  this.$route.query.malltitle;
      Bus.addEventListener("mallInsideHead",this.mallHead);
    },
	  mounted(){
        var categorySwiper = new Swiper ('#category-swiper', {
           direction: 'horizontal',
        })
       Bus.dispatch("omallTitle",this.mallTitle);
//        findCategoryById(this.cateCode,'').then(res => {
//          if(res){
//            this.scateList=res.result;
//            if(this.scateList&&this.scateList.length>0){
//              let code='';
//              if(this.isEmpty(this.selectedSCate)){
//                code=this.scateList[0].category_code;
//              }else{
//                code=this.selectedSCate;
//              }
//              findCategoryById(code,'').then(res => {
//                if(res){
//                  this.tcateList=res.result;
//                  this.getProductData(this.currentPage,this.cateCode,'',this.currentSort);
//                }
//              })
//            }
//          }
//        })

        findAllCategory().then(res => {
          if(res){
            this.cateList=res.result;
             let code='';
             if(this.isEmpty(this.selectedSCate)){
               code=this.selectedFCate;
             }else{
               code=this.selectedSCate;
             }
             this.getProductData(this.currentPage,code,this.mallTitle,this.currentSort);
          }
        })


        //this.getProductData(this.currentPage,this.cateCode,this.title,this.currentSort);
       //this.getProductData(this.currentPage,this.cateCode,this.title,this.currentSort);
    },


    components:{
        headerTop,
        successTips,
        cateView,
        emptySeach
    },

    computed:{

    },

    mixins: [loadMore,getImgPath,checkText,ModalHelper],
    methods:{
      loadTop() {
        // 加载更多数据
        this.currentPage=0;
        this.proList=[];
        this.proTotalPage=0;
        this.getProductData(this.currentPage,this.cateCode,'',this.currentSort);
      },
      tabClick(index){
        if(index!=0&&this.selected==index&&this.selected!=2){
          return;
        }
        /*this.currentPage=0;
        this.proList=[];
        this.proTotalPage=0;*/
        this.selected=index;
        if(index==2){
          this.changeCateView(false);
          if(this.priceSort==2||this.priceSort==0){
            this.priceSort=1;
            this.currentSort=1;
          }
          else if(this.priceSort==1){
            this.priceSort=2;
            this.currentSort=2;
          }
        }else if(index==0){
          this.changeCateView(!this.showCateTips);
          return;
        }else{
          this.changeCateView(false);
          this.priceSort=0;
          this.currentSort=0;
        }
        this.getProductData(this.currentPage,this.cateCode,'',this.currentSort)
      },
      async loadMoreData(){
        if(this.isloading||this.currentPage>=this.proTotalPage){
          return;
        }
        this.isloading=true;
        this.currentPage=this.currentPage+1;
        this.getProductData(this.currentPage,this.cateCode,'',this.currentSort);
      },
      getCategory(obj){
          this.selectedSCate=obj.category_code;
          findCategoryById(obj.category_code,'').then(res => {
            if(res){
              this.tcateList=res.result;
            }
          })
       },
      getProductData(page,ccode,spos,sort){
        findProductByPro(page,ccode,spos,sort).then(res => {
          if(res){
            let resultObj = res.result;
            res.result.reslutList.length == 0?this.emptySeach=true:this.emptySeach=false;
            this.proTotalPage = resultObj.totalPage;
            this.currentPage = resultObj.currentPage;
            this.proList = this.proList.concat(resultObj.reslutList);
            this.isloading = false;
            this.changeCateView(false);
          }
      })
      },
      incrementTotal(height){
        let hh=document.body.clientHeight-height*2;
        this.proHeight.minHeight=hh+'px';
      },
      gotoSkip(path){
        this.$router.push(path);
      },
      mallHead(v){
        this.proList=[];
        this.getProductData(this.currentPage,'',v.target,this.currentSort);
      },
      addCart(id){
        shopaddShopCar(id,1 ).then(res => {
          this.successText = '加入购物车成功'
          this.showTips=true;
        })
      },
      closeTip(){
        this.changeCateView(false);
        this.showTips=false;
      },
      getProData(obj,code,scode){
        this.proList=[];
        this.selectedTCate=obj.categoryCode;
        this.selectedSCate=scode;
        this.selectedFCate=code;
        this.cateName=obj.categoryName;
        this.getProductData(this.currentPage,obj.categoryCode,'',this.currentSort);
      },
      changeFcate(code){
        this.selectedFCate=code;
      },
      changeScate(obj){
        this.proList=[];
        this.selectedSCate=obj.categoryCode;
        this.selectedTCate=-1;
        this.cateName=obj.categoryName;
        this.getProductData(this.currentPage,obj.categoryCode,'',this.currentSort);
      },
      changeCateView(foo){
        this.showCateTips=foo;
        foo?this.afterOpen():this.beforeClose();

      }

    },
}

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

  .categoryListView{
    width:100%;
    border-bottom:1px solid #ededed;
  }
  .sx-view{
    width:100%;
    height:2rem;
    .category-item{
      width:25%;
      display:inline-block;
      text-align:center;
      span{
        display:inline-block;
        line-height: 2rem;
        color:#4c4c4c;
        height:2rem;
        font-size:0.6rem;
      }
      .arrow-view{
        display:inline-block;
        vertical-align:top;
        height:2rem;
        width:1rem;
        background-repeat: no-repeat;
        background-size: .5rem .5rem;
        background-position:center;
      }
      .default-view{
        background-image: url('../../images/default.png');
      }
      .top-arrow{
        background-image: url('../../images/arrow-top.png');
      }
      .bot-arrow{
        background-image: url('../../images/arrow-bottom.png');
      }
      .cate-default-view{
        background-image: url('../../images/cate-gary.png');
      }
      .cate-view{
        background-image: url('../../images/cate-red.png');
      }
    }
    .active{
      span{
        color:#ea4473;
      }
    }
  }
  .productListView{
    position: relative;
    top:2rem;
    width:100%;
    height:auto;
    color:#333;
    font-size:.8rem;
    background:#ffffff;


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
    font-size:.65rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
