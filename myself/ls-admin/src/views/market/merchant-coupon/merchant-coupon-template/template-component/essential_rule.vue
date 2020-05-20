<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">基本信息设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="商家券名称：" prop="couponInfo.name">
        <el-input class="name-input" v-model="info.couponInfo.name" maxlength="9" placeholder="请输入商家券名称" :disabled="info.pageType === 'detail'" @input="inputSapceTrim"/>
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入9位</span>
      </el-form-item>
      <el-form-item label="所属商户号：" prop="baseInfo.belongMerchantName">
        <el-input class="name-input" v-model="info.baseInfo.belongMerchantName" disabled/>
      </el-form-item>
      <el-form-item label="券发放模式：" prop="baseInfo.couponCodeMode">
        <el-radio-group v-model="info.baseInfo.couponCodeMode" :disabled="info.pageType === 'detail'">
          <el-radio :label="'MERCHANT_UPLOAD'">预上传微信</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商家券类型：" prop="couponInfo.stockType">
        <el-radio-group v-model="info.couponInfo.stockType" :disabled="info.pageType === 'detail'" @change="typeChange">
          <el-radio :label="'EXCHAHGE'">商品券</el-radio>
          <el-radio :label="'NORMAL'">满减券</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送类型：" prop="couponInfo.sendType">
        <el-radio-group v-model="info.couponInfo.sendType" :disabled="info.pageType === 'detail'">
          <el-radio :label="'SET_POINT_ACTIVITY'">集点活动</el-radio>
          <el-radio :label="'ACTIVITY_SELL'">活动派发</el-radio>
          <el-radio :label="'POINT_EXCHANGE'">积分兑换</el-radio>
          <el-radio :label="'REGISTER'">注册</el-radio>
          <el-radio :label="'BUY'">购买</el-radio>
          <el-radio :label="'OUTSIDE'">外部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="促销类型：" prop="couponInfo.subsidyFlg">
        <el-radio-group v-model="info.couponInfo.subsidyFlg" :disabled="info.pageType === 'detail'">
          <el-radio :label="'SELL_CHANGE'" :disabled="info.couponInfo.stockType === 'NORMAL'">促销让利(原卖变)</el-radio>
          <el-radio :label="'MEMBER_VOUCHER'">会员代金券</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="允许转赠：" prop="baseInfo.transferable">
        <el-radio-group v-model="info.baseInfo.transferable" :disabled="info.pageType === 'detail'">
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <img :src="introduceImg" alt="" class="introduceImg">
  </el-card>
</template>

<script>
import introduceImg from '@/assets/merchantCoupon.jpeg'
export default {
  computed: {
    info () {
      return this.$store.getters.merchantCouponInfo
    }
  },
  data () {
    let valdisbelongMerchant = (rule, value, callback) => {
      callback()
    }
    return {
      introduceImg: introduceImg,
      rules: {
        'couponInfo.name': [{ required: true, message: '请输入商家券名称', trigger: 'blur' }],
        'baseInfo.belongMerchantName': [{ required: true, validator: valdisbelongMerchant }],
        'baseInfo.couponCodeMode': [{ required: true }],
        'couponInfo.stockType': [{ required: true }],
        'couponInfo.sendType': [{ required: true }],
        'couponInfo.subsidyFlg': [{ required: true }]
      }
    }
  },
  methods: {
    inputSapceTrim () {
      this.info.couponInfo.name = this.info.couponInfo.name.replace(/\s+/g, '')
    },
    typeChange (val) {
      if (val === 'NORMAL') {
        this.info.couponInfo.subsidyFlg = 'MEMBER_VOUCHER'
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    position: relative;
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
    .el-input{
      display: inline-block;
      width: 400px !important;
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
      width: 181px;
      height: 390px;
      position: absolute;
      right: 30px;
      top: 70px;
    }
  }
</style>
