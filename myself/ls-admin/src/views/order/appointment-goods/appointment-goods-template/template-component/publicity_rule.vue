<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">公示信息设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="商品显示名称：" prop="commodityName">
        <el-input class="name-input" v-model="info.commodityName" maxlength="30" placeholder="请输入商品名称" :disabled="info.pageType === 'detail'" />
        <span class="placeholder inlineBlock">用于线上显示</span>
      </el-form-item>
      <el-form-item class="form-desc-item" label="预购商品说明：" prop="takeDescription">
        <el-input type="textarea" class="inputWidth70" maxlength="500" v-model="info.takeDescription" placeholder="请输入预购商品说明" :autosize="{ minRows: 6, maxRows: 40}" :disabled="info.pageType === 'detail'"/>
      </el-form-item>
      <el-row>
        <el-col :span="14">
          <el-form-item label="开始销售时间：" prop="canOrderStart" class="inlineBlock mr15">
            <el-date-picker v-model="info.canOrderStart" format="yyyy-MM-dd HH:mm" value-format="timestamp" type="datetime" placeholder="选择时间" @change="dateFromChange" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"/>
          </el-form-item>
          <el-checkbox-group v-model="info.dateFromFalg" class="inlineBlock" :disabled="info.pageType === 'mod' || info.pageType === 'detail'">
            <el-checkbox label="同活动公开时间"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动公开时间：" prop="canShowStart" v-show="!info.dateFromFalg">
            <el-date-picker v-model="info.canShowStart" format="yyyy-MM-dd HH:mm" value-format="timestamp" type="datetime" placeholder="选择时间" @change="displayDateFromChange" :disabled="info.pageType === 'mod' || info.pageType === 'detail'"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="最长预定天数：" prop="reserveDays">
        <el-input class="name-input" v-model="info.reserveDays" placeholder="请输入最长预定天数" @input="provingNum('reserveDays', $event)" :disabled="info.pageType === 'mod' || info.pageType === 'detail'" />
        <span class="placeholder inlineBlock">天，默认30天，不建议设置45天以上。</span>
      </el-form-item>
      <el-form-item label="列表图：" prop="imageSmall">
        <upload-img :imageName="'imageSmall'"></upload-img>
        <span class="placeholder" v-if="info.pageType !== 'detail'">支持jpg/png，建议jpg；尺寸 800 X 800；不超过2MB</span>
      </el-form-item>
      <el-form-item label="详情图：" prop="imageBigs">
        <upload-imgmore></upload-imgmore>
        <span class="placeholder" v-if="info.pageType !== 'detail'">最多可上传5张，最少1张；支持jpg/png，建议jpg；尺寸 800 X 800；不超过2MB</span>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import uploadImg from "./uploadImg"
import uploadImgmore from "./uploadImgMore"
export default {
  components: {
    uploadImg,
    uploadImgmore
  },
  computed: {
    info () {
      return this.$store.getters.appointmentGoodsInfo
    }
  },
  data () {
    let valdisplayImage = (rule, value, callback) => {
      if (!this.info.imageSmall) {
        callback(new Error('请上传列表图'))
      } else {
        callback()
      }
    }
    let valdisplayImageBigs = (rule, value, callback) => {
      if (this.info.imageBigs.length === 0) {
        callback(new Error('请上传详情图'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        'commodityName': [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        'takeDescription': [{ required: true, message: '请输入预购商品说明', trigger: 'blur' }],
        'canOrderStart': [{ required: true, message: '请选择时间', trigger: 'blur' }],
        'canShowStart': [{ required: true, message: '请选择时间', trigger: 'blur' }],
        'reserveDays': [{ required: true, message: '请输入最长预定天数', trigger: 'blur' }],
        'imageSmall': [{ required: true, validator: valdisplayImage, trigger: 'blur' }],
        'imageBigs': [{ required: true, validator: valdisplayImageBigs, trigger: 'blur' }]
      }
    }
  },
  methods: {
    dateFromChange (value) {
      if (value < this.info.orderBegin) {
        this.$message.error('开始销售时间需大于等于开始销售日')
        this.info.canOrderStart = ''
        return
      }
      if (this.info.canOrderEnd) {
        if (value >= this.info.orderEnd) {
          this.$message.error('开始销售时间需小于截止订货日')
          this.info.canOrderStart = ''
          return
        }
      }
      if (+this.info.hasPromotion === 2 && this.info.reservePromotionDtoList[0].promotionEnd && value >= this.info.reservePromotionDtoList[0].promotionEnd) {
        this.$message.error('开始销售时间需小于限时优惠截止日期')
        this.info.canOrderStart = ''
        return
      }
      if (!this.info.dateFromFalg && value < this.info.canShowStart) {
        this.$message.error('开始销售时间需大于等于活动公开时间')
        this.info.canOrderStart = ''
        return
      }
      if (this.info.dateFromFalg) this.info.canShowStart = value
    },
    displayDateFromChange (value) {
      if (value > this.info.canOrderStart) {
        this.$message.error('活动公开时间需小于等于开始销售时间')
        this.info.canShowStart = ''
      }
    },
    provingNum (name, $event) {
      let _val = this.info[name].replace(/[\D]/gi, '')
      this.$set(this.info, name, _val !== '' ? parseInt(_val) : '')
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
      font-size: 13px;
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
    .expiring-days-input {
      width: 120px !important;
    }
    .dynamicPeriodDaysInput{
      display: inline-block;
      width: 120px !important;
    }
  }
</style>
