<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">基本信息设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="活动名称：" prop="activityName">
        <el-input class="name-input" v-model="info.activityName" maxlength="30" placeholder="请输入活动名称" :disabled="info.pageType === 'detail'"/>
      </el-form-item>
      <el-form-item label="活动KEY：" prop="activityKey" v-if="info.pageType === 'detail' || info.pageType === 'mod'">
        <el-input class="name-input" v-model="info.activityKey" placeholder="请输入活动KEY" disabled/>
      </el-form-item>
      <el-form-item label="活动时间：" prop="beginTime">
        <el-col class="useDate">
          <el-date-picker v-model="info.beginTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime"  :disabled="info.pageType === 'detail'"/>
        </el-col>
        <el-col class="line useDateLine">-</el-col>
        <el-col class="useDate">
          <el-date-picker v-model="info.endTime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime"  :disabled="info.pageType === 'detail'"/>
        </el-col>
      </el-form-item>
      <el-form-item label="活动类型：" prop="type">
        <el-radio-group v-model="info.type" :disabled="info.pageType === 'detail'">
          <el-radio :label="'COOPERATION'">渠道合作</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合作方" prop="merchantId">
        <el-select v-model="info.merchantId" placeholder="请选择" :disabled="info.pageType === 'detail'">
          <el-option
            v-for="item in info.merchantList"
            :key="item.id"
            :label="item.merchantName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动背景图片：" prop="imageUrl">
        <upload-img :imageName="'imageUrl'"></upload-img>
        <span style="color: #909399;font-size: 12px;" v-if="info.pageType !== 'detail'">建议上传尺寸=宽度750px*高度不限，不超过2MB，支持JPG、PNG、JPEG格式</span>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import uploadImg from "./uploadImg"
export default {
  components: {
    uploadImg
  },
  computed: {
    info () {
      return this.$store.getters.channelSendCouponTemplateInfo
    }
  },
  data () {
    let validateTime = (rule, value, callback) => {
      if (this.info.beginTime && this.info.endTime) {
        callback()
      } else {
        callback(new Error('请选择时间'))
      }
    }
    return {
      rules: {
        'activityName': [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        'activityKey': [{ required: true, message: '请输入活动KEY', trigger: 'blur' }],
        'beginTime': [{ required: true, validator: validateTime, trigger: 'blur' }],
        'merchantId': [{ required: true }],
        'type': [{ required: true }],
        'imageUrl': [{ required: true, message: '请上传活动背景图片', trigger: 'blur' }]
      }
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.endTime) {
        if (+value > this.info.endTime) {
          this.info.beginTime = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.beginTime) {
        if (+value < this.info.beginTime) {
          this.info.endTime = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
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
  }
</style>
