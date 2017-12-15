
<template>

  <div>

    <header-view v-on:increment="incrementTotal">
    </header-view>
    <div class="mallView" v-bind:style="malls" ref="mallv">
      <div class="categoryList" v-bind:style="malls">
        <section @click="changeCategory(index,cateF.category_code,cateF.leval)" :class="[{'active':selected === index},'categoryItem']" v-for="(cateF,index) in cateFlist">
          <span>{{cateF.category_name}}</span>
        </section>
      </div>
      <div class="productView" ref="prov" v-bind:style="malls">
        <div class="productGrid" >
          <router-link :to="{path: '/mall-product-list',query:{cateCode:selectedFCate,sCateCode:cateS.category_code,catTitle:cateS.category_name,malltitle:''}}" v-for="(cateS,index) in cateSlist" :class=" ['productItem']">
            <img :src="getImgPath(cateS.icon,mallDefaultImg)"/>
            <span>{{cateS.category_name}}</span>
          </router-link>
         </div>
      </div>
    </div>
    <footer-view :checkedNum="checkedNum">
    </footer-view>
  </div>
</template>
<script>
  import headerView from '../../components/header/head'
  import footerView from '../../components/footer/footGuide'
  import Swiper from '../../plugins/swiper.min.js'
  import Bus from '../../config/eventbus.min.js';
  import {findCategory,findCategoryById} from 'src/service/getData'
  import {getImgPath} from 'src/components/common/mixin'
  import mallDefaultImg from '../../images/mall-default.png'
  require('../../style/swiper.min.css')
  let tabSwiper;
  export default {

    data(){
      return {
        cateFlist: '',
        cateSlist: '',
        selected:0,
        checkedNum:1,
        selectedFCate:0,
        malls:{
          height: 'auto',
        },
        mallDefaultImg:mallDefaultImg,
      }
    },
    created(){


    },


    mounted(){
      findCategory('1').then(res => {
        if(res){
        this.cateFlist=res.result;
        this.selectedFCate=this.cateFlist[0].category_code;
        if(this.cateFlist!=null&&this.cateFlist.length>0){
          findCategoryById(this.cateFlist[0].category_code,this.cateFlist[0].leval).then(ress => {
            if(ress){
              this.cateSlist=ress.result;
            }
          });
        }}
      });
    },
    components: {
      headerView,
      footerView
    },
    mixins: [getImgPath],
    computed: {},

    methods: {
      changeCategory(index,fcode,level){
        this.selected=index;
        this.selectedFCate=fcode;
        findCategoryById(fcode,level).then(ress => {
          if(ress){
            console.log(ress)
            this.cateSlist = ress.result;
          }
      });
      },
      incrementTotal(height){
        let hh=document.body.clientHeight-height*2;
        this.malls.height=hh+'px';
      },
    },
  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .mallView{
    position: relative;
    top: 2rem;
    width: 100%;
    height: auto;
    font-size: 0;
    padding-bottom: 2rem;
    overflow:hidden;
  }
  .categoryList{
    width:24%;
    display:inline-block;
    vertical-align: top;
    height:100%;
    overflow-y:auto;
    .categoryItem{
      background: #ffffff;
      height:2.3rem;
      width:100%;
      border-right:1px solid #e5e5e5;
      border-bottom:1px solid #e5e5e5;
      text-align: center;
      span{
        line-height: 2.3rem;
        @include sc(0.6rem, #4c4c4c);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .active{
      background: #f7f7f7;
      border-right:1px solid #f7f7f7;
      border-right:none;
      span{
        color:#ea4473;

      }

    }
  }
  .productView{
    display: inline-block;
    vertical-align: top;
    width:76%;
    padding: 2.6%;
    min-height:100%;
    background: #f7f7f7;
    overflow-y:auto;
    .productGrid{
      min-height:100%;
      width: 100%;
      background: #ffffff;
      .productItem{
        display: inline-block;
        width: 33.3333%;
        height:5rem;
        text-align: center;
        align-items: center;
        overflow:hidden;
        img{
          margin-top: .5rem;
          display: block;
          width: 100%;
          height: auto;
        }
        span{
          display: block;
          line-height: .8rem;
          @include sc(0.5rem, #4c4c4c);
        }
      }
    }
  }



</style>
