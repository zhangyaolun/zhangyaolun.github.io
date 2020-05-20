<template>
    <el-card class="box-card">
      <el-form :model="info" label-width="130px" ref="queryForm">
        <el-form-item label="活动类型：" prop="type">
          <el-select v-model="info.type" placeholder="请选择"  >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行人：" prop="createUser">
          <el-select v-model="info.createUser" placeholder="请选择"  >
            <el-option
              v-for="item in createUserOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="block" label="日志时间：" prop="startTime">
          <el-col :span="11">
            <el-date-picker v-model="info.startTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime('startTime', 'endTime')" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="info.endTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime('startTime', 'endTime')" />
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
    },
    createUserOptions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      typeOptions: [
        { label: '全部', value: '' },
        { label: '领券活动', value: 'COUPONACTIVITY' }
      ]
    }
  },
  methods: {
    changeStartTime (start, end) {
      if (this.info[end]) {
        if (this.info[start] > this.info[end]) {
          this.info[start] = ''
          this.$message.error('开始时间必须小于或等于结束时间')
        }
      }
    },
    changeEndTime (start, end) {
      if (this.info[start]) {
        if (this.info[end] < this.info[start]) {
          this.info[end] = ''
          this.$message.error('结束时间必须大于或等于开始时间')
        }
      }
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
      if (this.info.startTime && !this.info.endTime) {
        this.$message.error('请选择结束时间')
        return false
      }
      if (!this.info.startTime && this.info.endTime) {
        this.$message.error('请选择开始时间')
        return false
      }
      this.$emit('query', this.info)
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
.el-form{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .el-form-item{
    flex-basis: 33%;
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
      flex-basis: 100%;
    }
  }
}
</style>
