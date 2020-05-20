<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">基本信息设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="商户请求单号：" prop="baseInfo.deliveryPurpose" v-if="info.pageType !== 'create'">
        <el-input class="name-input" v-model="info.baseInfo.outRequestNo" disabled/>
      </el-form-item>
      <el-form-item label="活动名称：" prop="baseInfo.activityName">
        <el-input class="name-input" v-model="info.baseInfo.activityName" maxlength="10" placeholder="请输入活动名称" :disabled="info.pageType === 'detail'"/>
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入10位</span>
      </el-form-item>
      <el-form-item label="活动副标题：" prop="baseInfo.activitySecondTitle">
        <el-input class="name-input" v-model="info.baseInfo.activitySecondTitle" maxlength="9" placeholder="请输入活动副标题" :disabled="info.pageType === 'detail'"/>
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入9位</span>
      </el-form-item>
      <el-form-item label="活动LOGO：" prop="baseInfo.merchantLogoUrl">
        <upload-img :imageName="'merchantLogoUrl'"></upload-img>
        <span class="placeholder" v-if="info.pageType !== 'detail'">尺寸为120*120，仅支持JPG/PNG格式，图片要求小于等于1MB</span>
      </el-form-item>
      <el-form-item label="背景颜色：" prop="baseInfo.backgroundColor">
        <color-picker :backgroundColor.sync="info.baseInfo.backgroundColor" :show="info.pageType === 'detail'"></color-picker>
      </el-form-item>
      <el-form-item label="活动生效时间：" prop="baseInfo.beginTime" >
        <el-col class="useDate">
          <el-date-picker v-model="info.baseInfo.beginTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime"  :disabled="info.pageType ==='detail'"/>
        </el-col>
        <el-col class="line useDateLine">-</el-col>
        <el-col class="useDate">
          <el-date-picker v-model="info.baseInfo.endTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime"  :disabled="info.pageType === 'detail'"/>
        </el-col>
      </el-form-item>
      <el-form-item label="投放目的类型：" prop="baseInfo.deliveryPurpose">
        <el-radio-group v-model="info.baseInfo.deliveryPurpose" :disabled="info.pageType === 'detail'">
          <el-radio :label="'JUMP_MINI_APP'">引导用户前往小程序消费</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="小程序appid：" prop="baseInfo.miniProgramsAppid">
        <el-input class="name-input" v-model="info.baseInfo.miniProgramsAppid" disabled/>
      </el-form-item>
      <el-form-item label="小程序path：" prop="baseInfo.miniProgramsPath">
        <el-input class="name-input" v-model="info.baseInfo.miniProgramsPath" disabled/>
      </el-form-item>
    </el-form>
    <img :src="introduceImg" alt="" class="introduceImg">
  </el-card>
</template>

<script>
import uploadImg from "./uploadImg"
import colorPicker from "@/components/ColorPicker/colorPicker"
import introduceImg from '@/assets/payCourtesyTemplate.jpeg'
export default {
  components: {
    uploadImg,
    colorPicker
  },
  computed: {
    info () {
      return this.$store.getters.payCourtesyInfo
    }
  },
  data () {
    let validateTime = (rule, value, callback) => {
      if (this.info.baseInfo.beginTime && this.info.baseInfo.endTime) {
        callback()
      } else {
        callback(new Error('请选择时间'))
      }
    }
    return {
      introduceImg: introduceImg,
      rules: {
        'baseInfo.activityName': [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        'baseInfo.activitySecondTitle': [{ required: true, message: '请输入活动副标题', trigger: 'blur' }],
        'baseInfo.merchantLogoUrl': [{ required: true, message: '请上传活动LOGO', trigger: 'blur' }],
        'baseInfo.beginTime': [{ required: true, validator: validateTime, trigger: 'blur' }],
        'baseInfo.deliveryPurpose': [{ required: true }],
        'baseInfo.miniProgramsAppid': [{ required: true }],
        'baseInfo.miniProgramsPath': [{ required: true }]
      }
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.baseInfo.endTime) {
        if (+value >= this.info.baseInfo.endTime) {
          this.info.baseInfo.beginTime = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.baseInfo.beginTime) {
        if (+value <= this.info.baseInfo.beginTime) {
          this.info.baseInfo.endTime = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    position: relative;
    .placeholder{
      margin-left: 10px;
      display: block;
      color: #909399;
      font-size: 12px;
    }
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
        width: 130px !important;
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
    .placeholder{
      display: block;
      color: #909399;
      font-size: 12px;
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
    .introduceImg{
      width: 200px;
      height: 433px;
      position: absolute;
      right: 30px;
      top: 80px;
    }
  }
</style>
