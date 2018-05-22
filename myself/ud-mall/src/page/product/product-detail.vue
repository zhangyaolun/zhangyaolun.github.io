<template>
  <div>
    <header-top v-on:increment="incrementTotal">
    </header-top>
    <div class="proDetailView">
      <div class="pageProductInfo">
        <div class="swiper-container" id="tab-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-bind:style="swpierHeight">
              <div class="pageProductInfo">
                <div class="swiper-container" id="category-swiper">
                  <div class="swiper-wrapper category-swiper">
                    <div class="swiper-slide" v-for="(img,index) in proImgs">
                      <img class="pdbanner" :src="getImgPath(img,detailDefaultImg)"/>
                    </div>
                  </div>
                  <div class="swiper-pagination" id="pdbanner-pagination"></div>
                </div>
                <div class="proDetailInfo">
                  <span class="com">￥</span>
                  <span class="price">{{proDetail.salePrice}}</span>
                  <div class="info">
                    <span class="oprice">￥{{proDetail.sourcePrice}}</span>
                    <span>1.7万人付款</span>
                  </div>
                  <div class="by">
                    <span>包邮</span>
                  </div>
                </div>
                <div class="prodec">
                        <span class="dec">
                           {{proDetail.productName}}&nbsp;{{proDetail.productDesc}}&nbsp;
                        </span>
                </div>
                <div class="cline">
                </div>
                <div class="guessView">
                  <div class="guessTitle">
                    <span>猜你喜欢</span>
                  </div>
                  <div class="guessProduct">
                    <section class="guessProductCell">
                      <img class="guessImg" src="../../images/pdbanner1.png"/>
                      <span class="sub">风影 滋养修护洗发露800ml保湿滋养</span>
                    </section>
                    <section class="guessProductCell">
                      <img class="guessImg" src="../../images/pdbanner2.png"/>
                      <span class="sub">风影 滋养修护洗发露800ml保湿滋养</span>
                    </section>
                    <section class="guessProductCell">
                      <img class="guessImg" src="../../images/pdbanner3.png"/>
                      <span class="sub">风影 滋养修护洗发露800ml保湿滋养</span>
                    </section>
                  </div>
                </div>
                <div class="cline">
                </div>
                <div class="commentInfo">
                  <div class="commentTitle">
                    <span>评价</span>
                  </div>
                  <div class="commentList">
                    <div class="commentItem" v-for="index in commentShow">
                      <div class="commentTop">
                        <img class="userIcon" :src="getImgPath(proComment[index-1].userPic,commentDefaultImg)"/>
                        <span class="userName">{{proComment[index-1].userName}}</span>
                      </div>
                      <div class="commentContent">
                        <span>
                          {{proComment[index-1].msg}}
                        </span>
                      </div>
                    </div>

                  </div>
                  <div @click="changePageView({target:2})" class="commentAll" v-if="commentShow>0">
                    <span>查&nbsp;看&nbsp;全&nbsp;部&nbsp;评&nbsp;价</span>
                  </div>
                  <span class="nocomment-tips" v-if="commentShow==0">暂无评价</span>
                </div>
              </div>
            </div>
            <div class="swiper-slide" v-bind:style="swpierHeight">
              <img class="detail-img" :src="getImgPath(proDetail.productDetail,'')">
            </div>

            <div class="swiper-slide" v-bind:style="swpierHeight">
              <div class="commentAllist">
                <div class="commentItem" v-for="(comment,index) in proComment">
                  <div class="commentTop">
                    <img class="userIcon" :src="getImgPath(comment.userPic)"/>
                    <span class="userName">{{comment.userName}}</span>
                  </div>
                  <div class="commentContent">
                        <span>
                          {{comment.msg}}
                        </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
    <success-tips :successText="successText" v-if="showTips==true" v-on:closeTip="closeTip">
    </success-tips>
    <footer-bot v-on:buy="buy" v-on:gotoCar="gotoCar" v-on:addCart="addCart" v-on:addCollection="addCollection">
    </footer-bot>

  </div>
</template>
<script>
  import headerTop from 'src/components/header/detail-head'
  import footerBot from 'src/components/footer/footCart'
  import Swiper from '../../plugins/swiper.min.js'
  import Bus from '../../config/eventbus.min.js';
  import {findProductDetailById,findByProductIdComment,shopaddShopCar,userAddCollection} from 'src/service/getData'
  import {getImgPath} from 'src/components/common/mixin'
  import commentDefaultImg from '../../images/comment-default-icon.png'
  import detailDefaultImg from '../../images/detail-default.png'
  import {setStore, getStore,removeStore} from '../../config/mUtils'
  import successTips from 'src/components/common/success-tips'
  require('../../style/swiper.min.css')
  let tabSwiper;
  export default {

    data(){
      return {
        proId:0,
        proDetail:'',
        proComment:'',
        proImgs:'',
        swpierHeight:{
          minHeight:0,
        },
        commentMaxShow:3,
        commentShow:0,
        commentDefaultImg:commentDefaultImg,
        detailDefaultImg:detailDefaultImg,
        showTips:false,
      }
    },
    created(){
      Bus.addEventListener("changePageFunction",this.changePageView);



    },
    mixins: [getImgPath],

    mounted(){
      var categorySwiper = new Swiper('#category-swiper', {
        direction: 'horizontal',
        pagination: '#pdbanner-pagination',
        observer:true,
        observeParents:true,
      })
      tabSwiper = new Swiper('#tab-swiper', {
        direction: 'horizontal',
          onSlideChangeEnd: function(swiper){
            Bus.dispatch("changeTopFunction",swiper.activeIndex,false);
        }
      })

      this.proId=this.$route.query.proId;
      this.getProductDetail();
      this.getProductComment();
    },
    components: {
      headerTop,
      footerBot,
      successTips
    },

    computed: {},

    methods: {
      changePageView(obj){
        tabSwiper.slideTo(obj.target, 500, true);
      },
      getProductDetail(){
        findProductDetailById(this.proId).then(res => {
          if(res){
            this.proDetail = res.result;
            this.proImgs = this.proDetail.imageDetail.split(",");
            console.log(res)
          }
        })
      },
      getProductComment(){
        findByProductIdComment(this.proId).then(res => {
          if(res){
            this.proComment = res.result;
            this.commentShow = this.proComment.length < this.commentMaxShow ? this.proComment.length : this.commentMaxShow;
          }
        })
      },
      incrementTotal(height){
        let hh=document.body.clientHeight-height*2;
        this.swpierHeight.minHeight=hh+'px';
      },
      buy(){
        //console.log(this.proDetail)
        let str='[{"allPrice":"'+this.proDetail.salePrice+'","channelName":"'+(this.proDetail.channel==1?'京东':'笑派')+'","num":"1","productDetail":"'+this.proDetail.productDetail+'","productId":"'+this.proDetail.id+'","productImage":"'+this.proDetail.productImage+'","productName":"'+this.proDetail.productName+'"}]';
        setStore('addCheckId',str)
        setStore('allmoney',this.proDetail.salePrice)
        this.$router.push({path: '/shopPlac',query: {title:'订单确认'}});
      },
      gotoCar(){
        this.$router.push({path:'/shopCar'})
      },
      addCart(){//加入购物车
        shopaddShopCar(this.proDetail.id,1 ).then(res => {
          this.successText = '加入购物车成功'
          this.showTips=true;
        })
      },
      addCollection(){
        userAddCollection(this.proDetail.id).then(res => {
          if(res){
            this.successText = '已移入收藏'
            this.showTips=true;
          }
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

  .proDetailView {
    background-color: #fff;
    position: relative;
    top: 2rem;
    width: 100%;
    height: auto;
    padding-bottom: 2rem;

  .pdbanner {
    width: 100%;
    height: auto;
  }

  .proDetailInfo {
    background-image: url('../../images/pdbg.png');
    background-repeat: no-repeat;
    background-size: 100% 2rem;
    height: 2rem;

  .com {
    line-height: 2rem;
    font-size: .8rem;
    color: #ffffff;
    font-weight: bold;
    margin-left: 5%;
    vertical-align: middle;
  }

  .price {
    line-height: 2rem;
    font-size: 1.2rem;
    color: #ffffff;
    font-weight: bold;
    vertical-align: middle;
  }

  .info {
    margin-left: 5%;
    font-size: .5rem;
    display: inline-block;
    vertical-align: middle;

  span {
    line-height: .7rem;
    display: block;
    color: #ffffff;
  }

  .oprice {
    opacity: 0.7;
    filter: alpha(opacity=70);
    text-decoration: line-through;
  }

  }
  .by {
    display: inline-block;
    border: 1px solid #e39edb;
    border-radius: 4px;
    margin-top: .4rem;
    width: 2.2rem;
    height: 1.2rem;
    font-size: .5rem;
    text-align: center;
    float: right;
    margin-right: 5%;

  span {
    line-height: 1.2rem;
    color: #ffffff;
  }

  }
  }
  .prodec {
    width: 100%;
    height: auto;
    padding: 4% 2%;;

  .dec {
    display: block;
    color: #4c4c4c;
    font-size: .7rem;
    line-height: 1rem;
  }

  }
  .cline {
    width: 100%;
    height: .5rem;
    background: #f7f7f7;
  }

  .guessView {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;

  .guessTitle {
    height: 1.5rem;
    font-size: .6rem;

  span {
    line-height: 1.5rem;
  }

  }
  .guessProduct {
    margin-top: .5rem;
    display: flex;

  .guessProductCell {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;

  .guessImg {
    width: 80%;
    height: auto;
  }

  .sub {
    text-align: left;
    padding: 5%;
    font-size: .5rem;
    color: #4c4c4c
  }

  }
  }
  }
  .commentInfo {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;

  .commentTitle {
    height: 1.5rem;
    font-size: .6rem;

  span {
    line-height: 1.5rem;
  }

  }
  .commentList {

  .commentItem {
    padding-top: .5rem;
    padding-bottom: .5rem;
    border-top: 1px solid #e5e5e5;
  }

  .commentTop {

  .userIcon {
    vertical-align: middle;
    width: 10%;
    height: auto;
    display: inline-block;
  }

  .userName {
    vertical-align: middle;
    display: inline-block;
    font-size: .5rem;
    color: #4c4c4c;
  }

  }
  .commentContent {
    margin-top: .5rem;
    font-size: .6rem;
    margin-left: 12%;
  }

  }

  .commentAll {
    border-radius: 4px;
    height: 1.5rem;
    margin-bottom: .5rem;
    border: 1px solid #e5e5e5;
    font-size: 0.55rem;

  span {
    width: 100%;
    display: inline-block;
    text-align: center;
    line-height: 1.5rem;
    color: #4c4c4c;
  }

  }
  }
  .detail-img {
    width: 100%;
    height: auto;
  }

  .swiper-slide {
    height: 10px
  }

  .swiper-slide-active {
    height: auto
  }
  .commentAllist {
    padding:5%;
  .commentItem {
    padding-bottom: .5rem;
    border-bottom: 1px solid #e5e5e5;
  }

  .commentTop {
    height:2rem;
  .userIcon {
    vertical-align: middle;
    width: 10%;
    height: auto;
    display: inline-block;
  }

  .userName {
    line-height:2rem;
    vertical-align: middle;
    display: inline-block;
    font-size: .5rem;
    color: #4c4c4c;
  }
  .sendTime{
    @include sc(0.3rem, #b3b3b3);
    float: right;
    line-height:2rem;
    vertical-align: middle;
    display:inline-block;
  }

  }
  .commentContent {
    margin-top: .5rem;
    font-size: .6rem;
    margin-left: 12%;
  }

  }
  }
  .nocomment-tips{
    font-size:.6rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }

</style>
