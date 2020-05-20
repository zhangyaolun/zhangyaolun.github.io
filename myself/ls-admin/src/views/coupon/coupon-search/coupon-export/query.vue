<template>

  <el-card class="box-card coupon-query-export">
    <el-form :model="info" :rules="rules" label-width="150px" ref="couponForm">
      <el-form-item label="优惠券模板ID：" prop="couponId">
        <el-input
          v-model="info.couponId"
          placeholder="请输入优惠券模板ID"
          @input="provingNum('couponId', $event)"
        />
      </el-form-item>
      <span class="promptingError inlineBlock tips">* 必填，最多指定5个ID，用英文逗号分隔</span>

      <el-form-item label="核销日期：" prop="startTime">
        <el-col :span="6">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="info.startTime" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择开始日期" @change="changeStartTime" />
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="6">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="info.endTime" format="yyyy-MM-dd" type="date" value-format="timestamp" placeholder="选择结束日期" @change="changeEndTime" />
        </el-col>
      </el-form-item>
      <span class="promptingError inlineBlock tips">* 必填，指定优惠券核销起止日期，起止日期范围不能超过90天</span>

      <el-form-item label="报表类型：" prop="type">
        <el-radio-group v-model="info.type">
          <el-radio :label="'REC'">对账用报表（券维度明细）</el-radio>
          <el-radio :label="'SUM'">统计用报表（交易维度明细）</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="download">下载报表</el-button>
      </el-form-item>
    </el-form>
  </el-card>

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
    let validateCouponId = (rule, value, callback) => {
      if (this.info.couponId) {
        if (this.info.couponId.split(',').length > 5) {
          callback(new Error('优惠券模板ID最多指定5个'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入优惠券模板ID'))
      }
    }
    let validateTime = (rule, value, callback) => {
      if (this.info.startTime && this.info.endTime) {
        callback()
      } else {
        callback(new Error('请正确指定核销日期（起止日期）'))
      }
    }
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        }
      },
      rules: {
        couponId: [{ required: true, validator: validateCouponId, trigger: 'blur' }],
        startTime: [{ required: true, validator: validateTime, trigger: 'blur' }]
      }
    }
  },
  methods: {
    provingNum (name, $event) {
      this.info[name] = $event.replace(/[^\d\,]/g, '')
    },
    changeStartTime (value) {
      if (this.info.endTime) {
        if (value >= this.info.endTime) {
          this.info.startTime = ''
          this.$message.error('开始日期必须小于结束日期')
        } else if ((this.info.endTime - value) > 7776000000) {
          this.info.startTime = ''
          this.$message.error('起止日期范围不能超过90天')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.startTime) {
        if (value <= this.info.startTime) {
          this.info.endTime = ''
          this.$message.error('结束日期必须大于开始日期')
        } else if ((value - this.info.startTime) > 7776000000) {
          this.info.endTime = ''
          this.$message.error('起止日期范围不能超过90天')
        }
      }
    },
    download () {
      let flag = false
      this.$refs.couponForm.validate(valid => {
        if (valid) flag = true
      })
      if (!flag) return
      this.getUserId()
    },
    getUserId () {
      this.$api.promotionCouponSearch.checkExportCoupon(this.info).then(res => {
        window.location.href = `${process.env.VUE_APP_LAWSONADMIN_API_BASE_URL}/admin/new/coupon/exportCoupon?couponId=${this.info.couponId}&type=${this.info.type}&startTime=${this.info.startTime}&endTime=${this.info.endTime}&regionBlockCode=${this.info.regionBlockCode}`
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style lang="scss">
.coupon-query-export{
  .el-form-item__error{
    display: inline-block;
    position: static;
    margin-left: 15px;
  }
  .el-form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item{
      flex-basis: 100%;
      .el-input {
        width: 33%;
      }
      &:nth-child(3) .el-input{
        width: 100%;
      }
      .line{
        text-align: center;
      }
    }
    .tips{
      margin: -5px 0 30px 150px;
    }
  }
}
</style>
