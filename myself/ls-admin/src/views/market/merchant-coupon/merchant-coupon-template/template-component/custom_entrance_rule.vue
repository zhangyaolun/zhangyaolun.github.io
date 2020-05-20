<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">微信自定义入口设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px" class="appid">
      <el-form-item label="小程序appid：" prop="baseInfo.customEntranceMiniProgramsAppid">
        <el-input class="name-input" v-model="info.baseInfo.customEntranceMiniProgramsAppid" disabled/>
      </el-form-item>
      <el-form-item label="小程序path：" prop="baseInfo.customEntranceMiniProgramsPath">
        <el-input class="name-input" v-model="info.baseInfo.customEntranceMiniProgramsPath" disabled/>
      </el-form-item>
      <el-form-item label="入口文案：" prop="baseInfo.entranceWords">
        <el-input class="name-input" v-model="info.baseInfo.entranceWords" maxlength="5" placeholder="请输入入口文案" :disabled="info.pageType === 'detail'" />
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入5位</span>
      </el-form-item>
      <el-form-item label="引导文案：" prop="baseInfo.guidingWords">
        <el-input class="name-input" v-model="info.baseInfo.guidingWords" maxlength="6" placeholder="请输入引导文案" :disabled="info.pageType === 'detail'" />
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入6位</span>
      </el-form-item>
      <el-form-item label="公众号appid：" prop="baseInfo.appid">
        <el-input class="name-input" v-model="info.baseInfo.appid" placeholder="请输入公众号appid" :disabled="info.pageType === 'detail'" />
      </el-form-item>
      <el-form-item label="营销馆入口：" prop="baseInfo.hallId">
        <el-input class="name-input" v-model="info.baseInfo.hallId" placeholder="请输入营销馆地址" :disabled="info.pageType === 'detail'" />
      </el-form-item>
<!--      <el-form-item label="可用门店：" prop="baseInfo.storeId">-->
<!--        <el-input class="name-input" v-model="info.baseInfo.storeId" placeholder="请输入可用门店编号" :disabled="info.pageType === 'detail'" />-->
<!--      </el-form-item>-->
      <el-form-item label="使用须知：" prop="baseInfo.description">
        <el-input class="name-input" v-model="info.baseInfo.description" placeholder="请输入使用须知" :disabled="info.pageType === 'detail'" />
      </el-form-item>
      <el-form-item label="商户logo：" prop="baseInfo.merchantLogoUrl">
        <upload-img :imageName="'merchantLogoUrl'"></upload-img>
        <span class="promptingDefalut" v-if="info.pageType !== 'detail'">尺寸为120*120，仅支持JPG/PNG格式，图片要求小于等于1MB</span>
      </el-form-item>
      <el-form-item label="商户名称：" prop="baseInfo.merchantName">
        <el-input class="name-input" v-model="info.baseInfo.merchantName" maxlength="5" placeholder="请输入商户名称" :disabled="info.pageType === 'detail'" />
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入5位</span>
      </el-form-item>
      <el-form-item label="背景颜色：" prop="baseInfo.backgroundColor">
        <color-picker :backgroundColor.sync="info.baseInfo.backgroundColor" :show.sync="info.pageType === 'detail'"></color-picker>
      </el-form-item>
      <el-form-item label="券详情图片：" prop="baseInfo.couponImageUrl">
        <upload-img :imageName="'couponImageUrl'"></upload-img>
        <span class="promptingDefalut" v-if="info.pageType !== 'detail'">尺寸为850*350，仅支持JPG/PNG格式，图片要求小于等于2MB</span>
      </el-form-item>
      <el-form-item class="form-desc-item" label="适用商品范围使用说明：" prop="baseInfo.goodsName">
        <el-input type="text" class="inputWidth70" v-model="info.baseInfo.goodsName" maxlength="15" placeholder="请输入适用商品范围使用说明" :disabled="info.pageType === 'detail'"/>
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入15位</span>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import uploadImg from "./uploadImg"
import colorPicker from "@/components/ColorPicker/colorPicker"
export default {
  components: {
    uploadImg,
    colorPicker
  },
  computed: {
    info () {
      return this.$store.getters.merchantCouponInfo
    }
  },
  data () {
    return {
      rules: {
        'baseInfo.customEntranceMiniProgramsAppid': [{ required: true }],
        'baseInfo.customEntranceMiniProgramsPath': [{ required: true }],
        'baseInfo.entranceWords': [{ required: true, message: '请输入入口文案', trigger: 'blur' }],
        'baseInfo.description': [{ required: true, message: '请输入使用须知', trigger: 'blur' }],
        'baseInfo.merchantName': [{ required: true, message: '请输入商户名称', trigger: 'blur' }],
        'baseInfo.goodsName': [{ required: true, message: '请输入适用商品范围使用说明', trigger: 'blur' }]
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .el-form-item{
      margin-bottom: 18px !important;
    }
    margin: 20px;
    .errorColor{color: #ff4949}
    .mr{margin-right: 10px !important;}
    .mr15{margin-right: 15px !important;}
    .mb{margin-bottom: 20px !important;}
    .mt{margin-top: 20px !important;}
    .mlr{margin: 0 10px !important;}
    .amount{
      .el-input{
        display: inline-block;
        width: 100px !important;
        margin: 0 5px;
      }
    }
    .appid{
      .el-input{
        width: 400px !important;
      }
    }
    .el-form-item__label{
      margin-right: 15px;
    }
    .max-nums-input, .name-input{
      width: 30%;
      margin-right: 10px;
    }
    .image-input{
      opacity: 0;
      position: absolute;
      z-index: -99;
    }
    .sendType_radio{
      .el-radio{
        margin-bottom: 20px;
      }
    }
    .el-radio-group{
      vertical-align: inherit;
    }
    .useDate{
      width: 220px;
      display: inline-block;
      .elSelect{
        display: inline-block;
        width: 100px;
      }
    }
    .useDateLine{
      width: 40px;
      display: inline-block;
      text-align: center;
    }
    .uploadImg{
      border: 1px solid #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block;
    }
    .inputWidth70{
      width: 70% !important;
    }
  }
</style>
