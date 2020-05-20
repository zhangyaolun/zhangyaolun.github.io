<template>
    <el-card class="box-card">
      <el-form :model="info" label-width="130px" ref="queryForm">
        <el-form-item label="商品显示名称：" prop="commodityName">
          <el-input
            v-model="info.commodityName"
            placeholder="请输入商品显示名称"
          />
        </el-form-item>

        <el-form-item label="商品货号：" prop="commodityCd">
          <el-input
            v-model="info.commodityCd"
            placeholder="请输入商品货号"
          />
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="info.publishFlg" placeholder="请选择"  >
            <el-option
              v-for="item in publishFlgOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="block" label="预购日期：" prop="dateFrom">
          <el-col :span="11">
            <el-date-picker v-model="info.orderStartTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime('dateFrom', 'dateTo')" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="info.orderEndTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime('dateFrom', 'dateTo')" />
          </el-col>
        </el-form-item>
        <el-form-item class="block" label="上线日期：" prop="from_time">
          <el-col :span="11">
            <el-date-picker v-model="info.publishStartTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择开始时间" @change="changeStartTime('availableBeginTime', 'availableEndTime')" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="info.publishEndTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" value-format="timestamp" placeholder="选择结束时间" @change="changeEndTime('availableBeginTime', 'availableEndTime')" />
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
      publishFlgOptions: [
        { label: '全部', value: '' },
        { label: '未公开', value: 0 },
        { label: '已公开', value: 1 }
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
      if (this.info.orderStartTime && !this.info.orderEndTime) {
        this.$message.error('请选择预购日期结束时间')
        return false
      }
      if (!this.info.orderStartTime && this.info.orderEndTime) {
        this.$message.error('请选择预购日期开始时间')
        return false
      }
      if (this.info.publishStartTime && !this.info.publishEndTime) {
        this.$message.error('请选择上线日期结束时间')
        return false
      }
      if (!this.info.publishStartTime && this.info.publishEndTime) {
        this.$message.error('请选择上线日期开始时间')
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
    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    &:nth-last-child(2), &:nth-last-child(3){
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
