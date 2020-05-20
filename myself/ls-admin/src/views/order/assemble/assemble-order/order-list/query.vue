<template>

    <el-card class="box-card">
      <el-form :model="info" label-width="145px" ref="listQueryForm">
        <el-form-item label="拼团编号：">
          <el-input
            v-model="info.orderNo"
            placeholder="请输入拼团编号"
          />
        </el-form-item>
        <el-form-item label="拼团活动名称：">
          <el-input
            v-model="info.name"
            placeholder="请输入拼团活动名称"
          />
        </el-form-item>
        <el-form-item label="拼团活动ID：">
          <el-input
            v-model="info.templateId"
            placeholder="请输入拼团活动ID"
          />
        </el-form-item>
        <el-form-item label="拼团订单编号：">
          <el-input
            v-model="info.orderSubNo"
            placeholder="请输入拼团订单编号"
          />
        </el-form-item>
        <el-form-item label="特惠券包ID：">
          <el-input
            v-model="info.cbBundleModeId"
            placeholder="请输入特惠券包ID"
          />
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model="info.mobile"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="会员ID：">
          <el-input
            v-model="info.userId"
            placeholder="请输入会员ID"
          />
        </el-form-item>
        <el-form-item label="拼团订单状态：">
          <el-select v-model="info.orderSubStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in orderSubStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="拼团状态：">
          <el-select v-model="info.orderStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间：" prop="from_time">
          <el-col :span="11">
            <el-date-picker v-model="info.payTimeStart" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择开始时间" @change="changeStartTime" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="info.payTimeEnd" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" type="datetime" placeholder="选择结束时间" @change="changeEndTime" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset('listQueryForm')">重置</el-button>
          <el-button type="primary" @click="queryList">查询</el-button>
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
      activeNames: [],
      collapseTitle: '展开',
      orderStatusOptions: [
        { label: '全部', value: '' },
        { label: '拼团中', value: 'GROUPING' },
        { label: '拼团成功', value: 'SUCCESS' },
        { label: '拼团失败', value: 'FAIL' }
      ],
      // 拼团订单状态订单状态
      // UNPAY-待付款
      // PAYING-付款中
      // PAYED-已付款
      // SETTLED-已结算
      // REFUNDING-退款中
      // REFUND-已退款
      // CLOSED-已关闭
      // REFUNDFAILED-退款失败
      orderSubStatusOptions: [
        { label: '全部', value: '' },
        { label: '已付款', value: 'PAYED' },
        { label: '已关闭', value: 'CLOSED' },
        { label: '退款中', value: 'REFUNDING' },
        { label: '已退款', value: 'REFUND' },
        { label: '已结算', value: 'SETTLED' }
        //{ label: '退款失败', value: 'REFUNDFAILED' }
      ]
    }
  },
  methods: {
    changeStartTime (value) {
      if (this.info.payTimeEnd) {
        if (value > this.info.payTimeEnd) {
          this.info.payTimeStart = ''
          this.$message.error('开始时间要小于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.payTimeStart) {
        if (value < this.info.payTimeStart) {
          this.info.payTimeEnd = ''
          this.$message.error('结束时间要大于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
      if (this.info.payTimeStart && !this.info.payTimeEnd) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.payTimeStart && this.info.payTimeEnd) {
        this.$message.error('请选择开始时间')
        return false
      }
      this.$emit('query', this.info)
    },
    handleChange (val) {
      val ? this.collapseTitle = '收起' : this.collapseTitle = '展开'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .el-form-item{
    flex-basis: 33%;
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    &:nth-last-child(2){
      flex-basis: 66%;
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
      }
      .line{
        text-align: center;
      }
    }
    &:last-child{
      flex-basis: 66%;
    }
  }
}
</style>
