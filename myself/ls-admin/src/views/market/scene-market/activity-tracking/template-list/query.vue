<template>
  <el-card class="box-card">
    <el-form :model="info" label-width="100px" ref="queryForm">
      <el-form-item label="活动名称：" prop="name">
        <el-input
          v-model="info.name"
          placeholder="请输入活动名称"
        />
      </el-form-item>

      <el-form-item label="时间周期：" prop="type">
        <el-select v-model="info.dayType" placeholder="请选择"  >
          <el-option
            v-for="item in dayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      dayOptions: [
        { label: '1天', value: '1' },
        { label: '3天', value: '3' },
        { label: '7天', value: '7' },
        { label: '30天', value: '30' },
        { label: '90天', value: '90' }
      ]
    }
  },
  methods: {
    reset (formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    queryList () {
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
    &:last-child{
      flex-basis: 66%;
    }
  }
}
</style>
