<template>

      <el-card class="box-card">
        <el-form :model="info" label-width="130px" ref="CouponListQueryForm">
          <el-form-item label="活动名称：" prop="activityName">
            <el-input
              v-model="info.activityName"
              placeholder="请输入活动名称"
            />
          </el-form-item>

          <el-form-item label="活动ID：" prop="id">
            <el-input
              v-model="info.id"
              placeholder="请输入活动ID"
            />
          </el-form-item>
          <el-form-item label="活动状态：" prop="status">
            <el-select v-model="info.activityStatus" placeholder="请选择"  >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item class="block" label="活动开始时间：" prop="from_time">
            <el-col :span="11">
              <el-date-picker v-model="info.beginTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="info.endTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset('CouponListQueryForm')">重置</el-button>
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
        { label: '已创建', value: 'CREATE_ACT_STATUS' },
        { label: '运行中', value: 'ONGOING_ACT_STATUS' },
        { label: '已终止', value: 'TERMINATE_ACT_STATUS' },
        { label: '已暂停', value: 'STOP_ACT_STATUS' },
        { label: '已过期', value: 'OVER_TIME_ACT_STATUS' },
        { label: '创建活动失败', value: 'CREATE_ACT_FAILED' }
      ]
    }
  },
  created () {

  },
  methods: {
    changeStartTime (value) {
      if (this.info.endTime) {
        if (value > this.info.endTime) {
          this.info.beginTime = ''
          this.$message.error('开始时间必须小于或等于结束时间')
        }
      }
    },
    changeEndTime (value) {
      if (this.info.beginTime) {
        if (value < this.info.beginTime) {
          this.info.endTime = ''
          this.$message.error('结束时间必须大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
      if (this.info.beginTime && !this.info.endTime) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.beginTime && this.info.endTime) {
        this.$message.error('请选择开始时间')
        return false
      }
      this.$emit('query', this.info)
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
    .el-input {
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
      margin-right: 10%;
    }
    &:last-child{
      flex-basis: 66%;
    }
  }
}
</style>
