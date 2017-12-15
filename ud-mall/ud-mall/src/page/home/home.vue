<template>
  <div>
    <header-view signin-up='home'>
    </header-view>
    <div class="main-view">
      <div class="swiper-container" id="banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img class="banner-img" src="../../images/banner.png"></div>
        </div>
        <div class="swiper-pagination" id="banner-pagination"></div>
      </div>
      <div class="swiper-container" id="category-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="i in catePage">
            <div class="category-table">
              <router-link :to="{path: '/mall-product-list',query: {cateCode:getCateCode(i,y),sCateCode:'',catTitle:getCateTitle(i,y),malltitle:''}}" class="category-cell cate-border-1" v-for="y in getForCount(i)">
                  <img :src="getImage(i,y)"/>
                  <span>{{getCateTitle(i,y)}}</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="swiper-pagination" id="category-pagination" ></div>
      </div>
      <div class="banner-view">
        <div class="banner-cell">
          <img src="../../images/banner-1.png">
          <span class="top-title">家店体验区</span>
        </div>
        <div class="banner-cell">
          <img src="../../images/banner-2.png">
          <span class="top-title">智能手机馆</span>
        </div>
      </div>
      <div class="items-cell">
        <img class="cell-title" src="../../images/cell-title-1.png"/>
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
        <div class="item-cell-1">
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
        <div class="item-cell-2">
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
      <div class="items-cell">
        <img class="cell-title" src="../../images/cell-title-2.png"/>
        <div class="item-cell-1">
          <div class="left-item">
            <div class="cell-left">
              <span class="item-title ml03">母婴馆</span>
              <span class="item-dec-1 ml03">领券199-100</span>
            </div>
            <div class="cell-right">
              <img src="../../images/ct9.png"/>
            </div>
          </div>
          <div class="right-item">
            <div class="cell-left">
              <span class="item-title ml03">手机数码</span>
              <span class="item-dec-1 ml03">小米MAX2抢购</span>
            </div>
            <div class="cell-right">
              <img src="../../images/ct10.png"/>
            </div>
          </div>
        </div>
        <div class="item-cell-2">
          <div class="cell-1">
            <span class="item-title ml03">美食城</span>
            <span class="item-dec-1 ml03">哦一洗</span>
            <img src="../../images/ct11.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">电脑办公</span>
            <span class="item-dec-1 ml03">全天好心情</span>
            <img src="../../images/ct12.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">鞋靴箱包</span>
            <span class="item-dec-1 ml03">出门方便</span>
            <img src="../../images/ct13.png"/>
          </div>
          <div class="cell-2">
            <span class="item-title ml03">小家电馆</span>
            <span class="item-dec-1 ml03">小电器</span>
            <img src="../../images/ct14.png"/>
          </div>
        </div>
        <div class="item-cell-2">
          <div class="cell-1">
            <span class="item-title ml03">京东生鲜</span>
            <span class="item-dec-1 ml03">满90-40</span>
            <img src="../../images/ct15.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">家装城</span>
            <span class="item-dec-1 ml03">大牌直降</span>
            <img src="../../images/ct16.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">图书音像</span>
            <span class="item-dec-1 ml03">大牌直降</span>
            <img src="../../images/ct17.png"/>
          </div>
          <div class="cell-2">
            <span class="item-title ml03">医疗保健</span>
            <span class="item-dec-1 ml03">大牌直降</span>
            <img src="../../images/ct18.png"/>
          </div>
        </div>
      </div>
      <div class="items-cell">
        <img class="cell-title" src="../../images/cell-title-3.png"/>
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
        <div class="item-cell-1">
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
        <div class="item-cell-2">
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
      <div class="items-cell">
        <img class="cell-title" src="../../images/cell-title-4.png"/>
        <div class="item-cell-1">
          <div class="left-item">
            <span class="item-title text-center">— 小当家 —</span>
            <span class="item-dec text-center">“餐具用具充实你的厨房”</span>
            <img src="../../images/ct23.png"/>
          </div>
          <div class="right-item">
            <span class="item-title text-center">— 我是大厨 —</span>
            <span class="item-dec text-center">“小电器，大厨好帮手”</span>
            <img src="../../images/ct24.png"/>
          </div>
        </div>
        <div class="item-cell-2">
          <div class="cell-1">
            <span class="item-title ml03">精致早餐</span>
            <span class="item-dec ml03">全天好心情</span>
            <img src="../../images/ct19.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">好吃不停</span>
            <span class="item-dec ml03">看着流口水</span>
            <img src="../../images/ct20.png"/>
          </div>
          <div class="cell-1">
            <span class="item-title ml03">超级奶爸</span>
            <span class="item-dec ml03">北鼻吃喝</span>
            <img src="../../images/ct21.png"/>
          </div>
          <div class="cell-2">
            <span class="item-title ml03">朕不下床</span>
            <span class="item-dec ml03">聚合床上用品</span>
            <img src="../../images/ct22.png"/>
          </div>
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
  import {imgBaseUrl} from 'src/config/env'
  import {findCategory} from 'src/service/getData'
  require('../../style/swiper.min.css')
  export default {
    data(){
      return {
        cateList:"",
        checkedNum:0,
        catePage:0,
        catePageCount:8,
        cateTotalCount:0,
      }
    },

    mounted(){

      var mySwiper = new Swiper('#banner-swiper', {
        direction: 'horizontal',
        pagination: '#banner-pagination',
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
      })
      var categorySwiper = new Swiper('#category-swiper', {
        direction: 'horizontal',
        pagination: '#category-pagination',
        observer:true,
        observeParents:true,
      })
      findCategory('1').then(res => {
        if(res){
          this.cateList = res.result;
          console.log(this.cateList)
          this.cateTotalCount = this.cateList.length;
          this.catePage = this.cateTotalCount % this.catePageCount == 0 ? parseInt(this.cateTotalCount / this.catePageCount) : parseInt(this.cateTotalCount / this.catePageCount) + 1;
          console.log(this.catePage)
        }
        });

    },


    components: {
      headerView,
      footerView
    },

    computed: {

    },



    methods: {
      reload(){
        window.location.reload();
      },
      gotoSkip(path){
        this.$router.push(path);
      },
      getForCount(currentPage){
        if(this.cateTotalCount<this.catePageCount){
          return this.cateTotalCount;
        } else if(this.cateTotalCount-currentPage*this.catePageCount>0){
          return this.catePageCount;
        }else if(Math.abs(this.cateTotalCount-currentPage*this.catePageCount)==0){
          return this.catePageCount;
        }else{
          return Math.abs(this.cateTotalCount-currentPage*this.catePageCount);
        }
      },
      getImage(currentPage,index){
        return imgBaseUrl+this.cateList[(currentPage-1)*this.catePageCount+(index-1)].icon;
      },
      getCateTitle(currentPage,index){
        return this.cateList[(currentPage-1)*this.catePageCount+(index-1)].category_name;
      },
      getCateCode(currentPage,index){
        return this.cateList[(currentPage-1)*this.catePageCount+(index-1)].category_code;
      },
      getLevel(currentPage,index){
        return this.cateList[(currentPage-1)*this.catePageCount+(index-1)].leval;
      }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .main-view {
    position: relative;
    top: 2rem;
    width: 100%;
    height: auto;
    font-size: 0;
    padding-bottom: 2rem;
  }

  .banner-img {
    @include wh(100%, auto);
  }

  .cell-title {
    @include wh(100%, auto);
  }

  .item-cell {

  }

  .banner-view {
  @include wh(95%, auto);
    font-size: 0;
    margin: 0.5rem auto auto auto;
  }

  .banner-cell {
    width: 50%;
    text-align: center;
    display: inline-block;

  img {
    width: 95%;
    height: auto;
  }

  }
  .top-title {
    @include sc(0.6 rem, #4c4c4c);
    line-height: 1.2rem;
    font-weight: bold;
  }

  .item-cell-1 {
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

  .item-dec-1 {
  @include sc(0.5rem, #00c7b0);
    display: block;
  }

  .text-center {
    text-align: center;
  }

  .ml03 {
    margin-left: 0.3rem;
  }

  .category-table {
    width: 100%;
    background-color: #ffffff;
  }

  .category-cell {
    width: 25%;
    height: 4rem;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
    display: inline-block;

  img {
    margin: 1rem auto auto auto;
    display: block;
    width: 1.5rem;
    height: 1.5rem;
  }
  span {
    display: block;
    font-weight: bold;
    margin-top: 0.2rem;
  @include sc(0.5rem, #4c4c4c);
  }

  }
  .cate-border-1 {
    border-right: 1px solid #f5f5f5;
    box-sizing: border-box;
  }

</style>
