<template>
  <section class="templateMsgDetail clearfix">
    <section v-if="info.wechatNewsInfo && info.checkedList.some(v => {return v === 0})" class="templateMsg_main left">
      <div class="title">公众号图文消息</div>
      <div class="wechatTemplate_left left">
        <h3>{{info.wechatNewsInfo.title}}</h3>
        <div>{{info.wechatNewsInfo.customDescription}}</div>
      </div>
      <div class="wechatTemplate_right right">
        <img :src="info.wechatNewsInfo.thumbnailImgUrl" alt="">
      </div>
    </section>

    <section v-if="info.smsInfo && info.checkedList.some(v => {return v === 3})" class="templateMsg_main left">
      <div class="title">短信</div>
      <div class="smsInfo_content">{{info.smsInfo.content}}</div>
    </section>
    <section v-if="info.wechatTemplateInfo && info.checkedList.some(v => {return v === 1})" class="templateMsg_main left wechatTemplate">
      <div class="title">公众号模版消息</div>
      <div class="msgItem">
        <div class="label">商品名称:</div>
        <div class="content">{{info.wechatTemplateInfo.commodityName}}</div>
      </div>
      <div class="msgItem">
        <div class="label">售价:</div>
        <div class="content">{{info.wechatTemplateInfo.salePrice}}</div>
      </div>
      <div class="msgItem">
        <div class="label">到货门店:</div>
        <div class="content">{{info.wechatTemplateInfo.arrivalShop}}</div>
      </div>
      <div class="msgItem">
        <div class="label">备注:</div>
        <div class="content">{{info.wechatTemplateInfo.content}}</div>
      </div>
    </section>
    <section v-if="info.minaSubscribeInfo && info.checkedList.some(v => {return v === 2})" class="templateMsg_main left minaSubscribe">
      <div class="title">小程序模版消息</div>
      <div class="msgItem">
        <div class="label">活动名称:</div>
        <div class="content">{{info.minaSubscribeInfo.activityName}}</div>
      </div>
      <div class="msgItem">
        <div class="label">活动开始:</div>
        <div class="content">{{info.minaSubscribeInfo.activityStartTime  | formatBackendTime}}</div>
      </div>
      <div class="msgItem">
        <div class="label">活动截止:</div>
        <div class="content">{{info.minaSubscribeInfo.activityEndTime  | formatBackendTime}}</div>
      </div>
      <div class="msgItem">
        <div class="label">活动内容:</div>
        <div class="content">{{info.minaSubscribeInfo.activityContent  | formatBackendTime}}</div>
      </div>
    </section>
  </section>
</template>

<script>

export default {
  computed: {
    info () {
      return this.$store.getters.sceneMarketInfo
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .templateMsgDetail{
    width: 800px !important;
    margin-left: 180px;
    .templateMsg_main{
      width: 350px !important;
      height: 140px;
      line-height: 20px;
      padding: 10px;
      margin-right: 20px;
      margin-bottom: 30px;
      border: 1px solid #e6ebf5;
      border-radius: 5px;
      font-size: 14px;
      .title{
        width: 100%;
        margin-bottom: 6px;
      }
      .wechatTemplate_left{
        width: 67%;
        padding-right: 3%;
        h3{
          margin: 10px 0;
          font-size: 25px;
        }
        div{
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      .wechatTemplate_right{
        width: 30%;
        img{
          width: 100%;
        }
      }
      .smsInfo_content{
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
      }
      .msgItem{
        width: 100%;
        line-height: 20px;
        margin: 3px 0;
        .label{
          display: inline-block;
          width: 20%;
          text-align: right;
        }
        .content{
          display: inline-block;
          width: 80%;
        }
      }
    }
    .wechatTemplate,.minaSubscribe {
      min-height: 140px;
    }
  }

</style>
