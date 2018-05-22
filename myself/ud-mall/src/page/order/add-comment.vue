<template>
  <div>
    <header-top :head-title="headTitle">
    </header-top>
    <div class="main-view" :style="cheight">
      <div class="comment-list"  v-for="(id,index) in idList">
        <div class="comment-top">
          <img class="comm-img" :src="getImgPath(imgList[index],defaultCommentImg)"/>
          <span class="comm-title">{{nameList[index]}}</span>
        </div>
        <textarea class="comment-detail" :placeholder="pholder" ref="txtArea">
        </textarea>
      </div>

    </div>
    <section class="add-comment" ref="tabref" @click="clickComment()">
      <span>发&nbsp;表</span>
    </section>
   </div>
  </template>

<script>
  import headerTop from 'src/components/header/inside-head'
  import {getImgPath,loadMore} from 'src/components/common/mixin'
  import defaultCommentImg from '../../images/comment-default.png'
  import {addComment} from 'src/service/getData'
  import { Toast } from 'mint-ui';
  export default {
    data(){
      return {
        headTitle: "发表评价",
        pholder:'宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧',
        cheight:{
          minHeight:'auto'
        },
        orderId:'',
        idList:'',
        imgList:'',
        nameList:'',
        defaultCommentImg:defaultCommentImg,
      }
    },
    created(){
      this.orderId=this.$route.query.orderId;
      this.idList=this.$route.query.proId.toString().split(',');
      this.imgList=this.$route.query.proImgs.toString().split(',');
      this.nameList=this.$route.query.proName.toString().split(',');
    },
    mounted(){
      this.cheight.minHeight=document.body.clientHeight-this.$refs.tabref.offsetHeight*2+'px';
    },
    mixins: [loadMore,getImgPath],
    components: {
      headerTop,
    },
    computed: {},

    methods: {
      clickComment(){
        console.log(this.$refs.txtArea[0].value)
        let comentList='';
        for(let i=0;i<this.idList.length;i++){
          comentList+=this.idList[i]+'|'+this.$refs.txtArea[i].value;
          if(i!=this.idList.length-1){
            comentList+=',';
          }
        }
        console.log(comentList)
       addComment(this.orderId,comentList).then(res => {
          if(res){
             Toast('评论成功');
              this.$router.push({path:'/myOrder'})
          }
        });
      }
    },
  }



</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .main-view{
    position: relative;
    top:2rem;
    width:100%;
    height:100%;
    font-size:0;
    background:#ffffff;
    padding-bottom: 2rem;
    .comment-top{
      height: 2.8rem;
      width: 100%;
      border-bottom:1px solid #e5e5e5;
      .comm-img{
        width: 1.8rem;
        height: auto;
        margin-left: .5rem;
        vertical-align: middle;
      }
      .comm-title{
        margin-left: .5rem;
        vertical-align: middle;
        display: inline-block;
        line-height: 2.8rem;
        font-size: .6rem;
        color: #4c4c4c;
      }
    }
    .comment-detail{
      width: 100%;
      padding: .5rem;
      resize: none;
      height: 5rem;
    }

  }

  .add-comment{
    position: fixed;
    background: #ea363e;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    @include wh(100%, 2rem);
    span{
      font-size: .7rem;
      line-height: 2rem;
      color: #fff;
    }
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999999;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #999999;
    opacity:  1;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #999999;
    opacity:  1;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #999999;
  }
</style>
