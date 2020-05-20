<template>
  <el-card class="reserve-purchase-query-form-wrap">
    <el-form :model="info" label-width="120px" ref="reservePurchaseQueryForm">
      <el-form-item label="订单号：" prop="orderNo">
        <el-input v-model="info.orderNo" />
      </el-form-item>
      <el-form-item label="预约商品名称：" prop="commodityName">
        <el-input v-model="info.commodityName" />
      </el-form-item>
      <el-form-item label="预约商品ID：" prop="commodityId">
        <el-input v-model="info.commodityId" />
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="info.mobile" />
      </el-form-item>
      <el-form-item label="会员Id：" prop="userId">
        <el-input v-model="info.userId" />
      </el-form-item>
      <el-form-item label="订单状态：" prop="status">
        <el-select v-model="info.status" placeholder="全部">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付时间：" prop="payedTimeStart">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="开始日期"
            v-model="info.payedTimeStart"
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            placeholder="结束时间"
            type="datetime"
            v-model="info.payedTimeEnd"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="提货时间：" prop="takeTimeStart">
        <el-col :span="11">
          <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="info.takeTimeStart"
            />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker
            placeholder="结束时间"
            type="date"
            v-model="info.takeTimeEnd"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('reservePurchaseQueryForm')">重置</el-button>
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
        { value: 1, label: '待支付' },
        { value: 3, label: '已支付' },
        { value: 4, label: '已取消' },
        { value: 6, label: '用户已退款' },
        { value: 8, label: '线下已退款' },
        { value: 9, label: '待取货' },
        { value: 10, label: '已取货' },
        { value: '', label: '全部' }
      ]
    }
  },
  methods: {
    reset (formName) {
      this.$refs[formName].resetFields()
      this.info.payedTimeEnd = ''
      this.info.takeTimeEnd = ''
      this.$emit('reset')
    },
    query () {
      this.$emit('query', this.info)
    }
  }
}
</script>

<style lang="scss">
.reserve-purchase-query-form-wrap {
  margin: 20px;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .el-form-item {
      flex-basis: 33.3%;
      &:last-child, &:nth-child(7), &:nth-child(8) {
        .el-form-item__content {
          width: 50%;
        }
        flex-basis: 100%;
      }
    }

  }
  // .el-form-item__content {
  //   width:
  // }
}
</style>
