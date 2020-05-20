<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">微信发放商家券设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px">
      <el-form-item label="批次总预算：" prop="sendInfo.maxAmount">
        <el-input class="name-input" v-model="info.sendInfo.maxAmount" placeholder="请输入预算金额" :disabled="info.pageType === 'detail'" @input="checkNumber('maxAmount', $event)"/>
      </el-form-item>
      <el-form-item label="批次最大发放个数：" prop="sendInfo.maxCoupons">
        <el-input class="name-input" :value="maxCoupons" placeholder="请输入发放总份数" :disabled="info.pageType === 'detail'" :readonly="info.couponInfo.stockType === 'NORMAL'" @input="maxCouponsProvingNum('maxCoupons', $event)"/>
      </el-form-item>
      <el-form-item label="单天发放上限金额：" prop="sendInfo.maxAmountByDay">
        <el-input class="name-input" v-model="info.sendInfo.maxAmountByDay" placeholder="请输入每日发放上限金额" :disabled="info.pageType === 'detail'" @input="checkNumber('maxAmountByDay', $event)"/>
      </el-form-item>
      <el-form-item label="单天发放上限个数：" prop="sendInfo.maxCouponsByDay">
        <el-input class="name-input" v-model="info.sendInfo.maxCouponsByDay" placeholder="请输入每天发放上限份数" :disabled="info.pageType === 'detail'" @input="provingNum('maxCouponsByDay', $event)"/>
      </el-form-item>
      <el-form-item label="用户最大可领个数：" prop="sendInfo.maxCouponsPerUser">
        <el-input class="name-input" v-model="info.sendInfo.maxCouponsPerUser" placeholder="请输入单个用户最大领取份数" :disabled="info.pageType === 'detail'" @input="provingNum('maxCouponsPerUser', $event)"/>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.getters.merchantCouponInfo
    },
    maxCoupons () {
      if (this.info.couponInfo.stockType === 'NORMAL') {
        let _maxCoupons = parseInt(this.info.sendInfo.maxAmount / this.info.couponInfo.reduceAmount) || ''
        this.info.sendInfo.maxCoupons = _maxCoupons
        _maxCoupons ? this.$refs.ruleForm.validateField('sendInfo.maxCoupons') : ''
        return _maxCoupons
      } else {
        return this.info.sendInfo.maxCoupons
      }
    }
  },
  data () {
    let valdisbeMaxCoupons = (rule, value, callback) => {
      if (this.info.couponInfo.stockType === 'NORMAL') {
        this.info.sendInfo.maxAmount.toString() === '' || this.info.couponInfo.reduceAmount.toString() === '' ? callback(new Error('请正确输入批次总预算和优惠金额')) : callback()
      } else {
        value.toString() === '' ? callback(new Error('请输入发放总份数')) : callback()
      }
    }
    return {
      rules: {
        'sendInfo.maxAmount': [{ required: true, message: '请输入批次总预算', trigger: 'blur' }],
        'sendInfo.maxCoupons': [{ required: true, validator: valdisbeMaxCoupons, trigger: 'blur' }],
        'sendInfo.maxCouponsPerUser': [{ required: true, message: '请输入单个用户最大领取份数', trigger: 'blur' }]
      }
    }
  },
  methods: {
    checkNumber (name, $event) {
      if ($event) {
        this.info.sendInfo[name] = $event.match(/^\d*(\.?\d{0,2})/g)[0] || ''
      }
    },
    provingNum (name, $event) {
      let val = this.info.sendInfo[name].toString().replace(/[\D]/gi, '')
      this.$set(this.info.sendInfo, name, val !== '' ? parseInt(val) : '')
    },
    maxCouponsProvingNum (name, $event) {
      this.info.sendInfo[name] = $event.replace(/[\D]/gi, '') || ''
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
    .el-input{
      display: inline-block;
      width: 400px !important;
    }
  }
</style>
