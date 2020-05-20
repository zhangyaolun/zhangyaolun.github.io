<template>

      <el-card class="box-card">
        <el-form :model="info" label-width="140px" ref="queryForm">
          <el-form-item label="订单流水号：" prop="serialNumber">
            <el-input
              v-model="info.serialNumber"
              placeholder="请输入订单流水号"
            />
          </el-form-item>
          <el-form-item label="领取时间：" prop="pickupTimeStart">
            <el-col :span="11">
              <el-date-picker v-model="info.pickupTimeStart" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime('pickupTimeStart','pickupTimeEnd')" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="info.pickupTimeEnd" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime('pickupTimeStart','pickupTimeEnd')" />
            </el-col>
          </el-form-item>
          <el-form-item label="优惠券状态：" prop="couponStatus">
            <el-select v-model="info.couponStatus" placeholder="请选择"  >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券使用时间：" prop="useTimeStart">
            <el-col :span="11">
              <el-date-picker v-model="info.useTimeStart" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime('useTimeStart','useTimeEnd')" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="info.useTimeEnd" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime('useTimeStart','useTimeEnd')" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset('queryForm')">重置</el-button>
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
      statusOptions: [
        { label: '全部', value: '' },
        { label: '已使用', value: 'USED' },
        { label: '未使用', value: 'UNUSED' }
      ]
    }
  },
  methods: {
    changeStartTime (beginTime, endTime) {
      if (this.info[endTime]) {
        if (this.info[beginTime] > this.info[endTime]) {
          this.info[beginTime] = ''
          this.$message.error('开始时间必须小于或等于结束时间')
        }
      }
    },
    changeEndTime (beginTime, endTime) {
      if (this.info[beginTime]) {
        if (this.info[endTime] < this.info[beginTime]) {
          this.info[endTime] = ''
          this.$message.error('结束时间必须大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
      if (!this.startEndTimeRuleFalg('pickupTimeStart', 'pickupTimeEnd')) return
      if (!this.startEndTimeRuleFalg('useTimeStart', 'useTimeEnd')) return
      this.$emit('query', this.info)
    },
    startEndTimeRuleFalg (beginTime, endTime) {
      if (this.info[beginTime] || this.info[endTime]) {
        if (!this.info[beginTime]) {
          this.$message.error('请选择开始时间')
          return false
        }
        if (!this.info[endTime]) {
          this.$message.error('请选择结束时间')
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
  /*.el-card.is-always-shadow{*/
  /*  box-shadow: 0 0 0 0 #fff !important;*/
  /*}*/
.placeholder{
  margin-left: 10px;
  display: block;
  color: #909399;
  font-size: 12px;
}
.el-form{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .el-form-item{
    flex-basis: 33%;
    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    &:nth-last-child(2), &:nth-last-child(4){
      display: inline-block;
      flex-basis: 66%;
      .line{
        text-align: center;
      }
    }
  }
}
</style>
