<template>
    <el-card class="box-card">
      <el-form :model="info" label-width="130px" ref="queryForm">
        <el-form-item label="商品名称：" prop="name">
          <el-input
            v-model="info.name"
            placeholder="请输入商品名称"
          />
        </el-form-item>

        <el-form-item label="商品ID：" prop="id">
          <el-input
            v-model="info.id"
            placeholder="请输入商品ID"
          />
        </el-form-item>
        <el-form-item label="商品状态：" prop="status">
          <el-select v-model="info.status" placeholder="请选择"  >
            <el-option
              v-for="item in statusOptions"
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
      statusOptions: [
        { label: '全部', value: '' },
        { label: '废弃', value: 'DELETED' },
        { label: '上架', value: 'ONSALE' },
        { label: '下架', value: 'OFFSALE' }
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
      flex-basis: 100%;
    }
  }
}
</style>
