<template>
  <el-card class="bundle-order-query-wrap">
    <el-form :model="info" label-width="120px" ref="bundleOrderinfoForm">
      <el-form-item label="订单号：" prop="orderNo">
        <el-input v-model="info.orderNo" />
      </el-form-item>
      <el-form-item label="特惠券包名称：" prop="cbName">
        <el-input v-model="info.cbName" />
      </el-form-item>
      <el-form-item label="特惠券包ID：" prop="cbId">
        <el-input v-model="info.cbId" />
      </el-form-item>
       <el-form-item label="订单状态：" prop="orderStatus">
        <el-select v-model="info.orderStatus" placeholder="全部">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="info.mobile" />
      </el-form-item>
      <el-form-item label="会员ID：" prop="userId">
        <el-input v-model="info.userId" />
      </el-form-item>
      <el-form-item label="支付时间：" prop="orderPayTimeFrom">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="开始日期"
            v-model="info.orderPayTimeFrom"
            value-format="timestamp"
            @change="changeStartTime"
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            placeholder="结束时间"
            type="datetime"
            v-model="info.orderPayTimeTo"
            value-format="timestamp"
            @change="changeEndTime"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('bundleOrderinfoForm')">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
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
    return {
      statusOptions: [
        { value: '1', label: '待支付' },
        { value: '2', label: '已支付' },
        { value: '3', label: '已取消' },
        { value: '4', label: '已退款' },
        { value: '5', label: '已结算' },
        { value: '11', label: '退款中' },
        { value: '', label: '全部' }
      ],

    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.orderPayTimeTo) {
        if (value > this.info.orderPayTimeTo) {
          this.info.orderPayTimeFrom = ''
          this.$message.error('开始时间要小于或等于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.orderPayTimeFrom) {
        if (value < this.info.orderPayTimeFrom) {
          this.info.orderPayTimeTo = ''
          this.$message.error('结束时间要大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.orderPayTimeTo = ''
      this.$emit('reset')
    },
    query () {
      this.$emit('query', this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
  .bundle-order-query-wrap {
    margin: 20px;
    .el-form{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      .el-form-item {
        flex-basis: 33.3%;
        .el-form-item__content {
          width: 100%;
        }
        &:nth-child(7) {
          flex-basis: 60%;
          .line {
            text-align: center;
          }
        }
        &:last-child {
          flex-basis: 100%;
        }
      }
    }
  }
</style>
