<template>

  <el-collapse accordion @change="handleChange" v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">优惠券查询 <span class="placeholder">(点击{{collapseTitle}})</span></template>
      <el-card class="box-card coupon-query">
        <el-form :model="info" :rules="rules" label-width="120px" ref="CouponListQueryForm">
          <el-form-item label="优惠券ID：" prop="couponId">
            <el-input
              v-model="info.couponId"
              placeholder="必填"
              maxlength="10"
            />
          </el-form-item>

          <el-form-item label="优惠券状态：" prop="userCouponStatus">
            <el-radio-group v-model="info.userCouponStatus">
              <el-radio :label="''">不限</el-radio>
              <el-radio :label="'NOTUSED'">未使用</el-radio>
              <el-radio :label="'USED'">已使用</el-radio>
              <el-radio :label="'LOCKED'">已锁定</el-radio>
              <el-radio :label="'DELETED'">已作废</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="用户：" prop="type">
            <el-radio-group v-model="info.type" @change="typeChange">
              <el-radio :label="0">手机号</el-radio>
              <el-radio :label="1">会员卡号</el-radio>
            </el-radio-group>
            <el-input
              v-model="info.mobile"
              placeholder="手机号"
              maxlength="11"
              v-if="info.type === 0"
            />
            <el-input
              v-model="info.Barcode"
              placeholder="会员卡号"
              maxlength="13"
              v-if="info.type === 1"
            />
          </el-form-item>
          <el-form-item label="使用日期：">
            <el-col :span="8">
              <el-date-picker v-model="info.useDateStart" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime" />
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="8">
              <el-date-picker v-model="info.useDateEnd" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime" />
            </el-col>
          </el-form-item>
          <el-form-item label="使用门店：">
            <el-input
              v-model="info.useShopId"
              placeholder="选填"
              maxlength="10"
            />
          </el-form-item>

          <el-form-item>
            <el-button @click="reset('CouponListQueryForm')">重置</el-button>
            <el-button type="primary" @click="queryList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-collapse-item>
  </el-collapse>

</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeNames: ['1'],
      collapseTitle: '收起',
      rules: {
        couponId: [{ required: true, message: '请输入优惠券ID', trigger: 'blur' }]
      }
    }
  },
  methods: {
    typeChange () {
      this.info.mobile = ''
      this.info.Barcode = ''
    },
    changeStartTime (value) {
      if (this.info.useDateEnd) {
        if (value > this.info.useDateEnd) {
          this.info.useDateStart = ''
          this.$message.error('开始时间必须小于或等于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.useDateStart) {
        if (value < this.info.useDateStart) {
          this.info.useDateEnd = ''
          this.$message.error('结束时间必须大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.couponId = ''
      this.info.userCouponStatus = ''
      this.info.type = 0
      this.info.mobile = ''
      this.info.Barcode = ''
      this.info.useDateStart = ''
      this.info.useDateEnd = ''
      this.info.useShopId = ''
      this.info.userId = ''
      //this.$emit('reset')
    },
    handleChange (val) {
      val ? this.collapseTitle = '收起' : this.collapseTitle = '展开'
    },
    queryList () {
      let flag = false
      this.$refs.CouponListQueryForm.validate(valid => {
        if (valid) flag = true
      })
      if (!flag) return
      if (this.info.useDateStart && !this.info.useDateEnd) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.useDateStart && this.info.useDateEnd) {
        this.$message.error('请选择开始时间')
        return false
      }
      if (this.info.useDateEnd !== '' && this.info.useDateEnd !== null) {
        this.info.useDateEnd = +this.info.useDateEnd + 86399000
      }
      if (this.info.type === 0 && this.info.mobile !== '' && this.info.mobile.length < 11) {
        this.$message.error('请填写11位手机号码')
        return false
      } else if (this.info.mobile.length === 11) {
        this.getUserId(this.info.mobile)
        return false
      }
      if (this.info.type === 1 && this.info.Barcode !== '' && this.info.Barcode.length < 13) {
        this.$message.error('请填写13位会员卡号')
        return false
      } else if (this.info.Barcode.length === 13) {
        this.getUserId(this.info.Barcode)
        return false
      }
      this.getUserId()
    },
    getUserId (mobileOrBarcode) {
      if (mobileOrBarcode) {
        this.$emit('update:loading', true)
        this.$api.promotionCouponSearch.getUserId(mobileOrBarcode).then(res => {
          this.info.userId = res.data
          this.$emit('query', this.info)
        }).catch(error => {
          this.$emit('update:loading', false)
          this.$message.error(error.message)
        })
      } else {
        this.info.userId = ''
        this.$emit('query', this.info)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.placeholder{
  margin-left: 10px;
  display: block;
  color: #909399;
  font-size: 12px;
}
.coupon-query{
  .el-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item{
      flex-basis: 100%;
      .el-input {
        width: 33%;
      }
      .el-select {
        width: 33%;
      }
      &:nth-child(3) .el-radio-group{
        width: 100%;
      }
      &:nth-child(4) .el-input{
        width: 100%;
      }
      .line{
        text-align: center;
      }
    }
  }
}
</style>
