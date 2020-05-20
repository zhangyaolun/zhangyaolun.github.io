<template>
  <el-card class="box-card">
    <el-form :model="info" label-width="100px" ref="queryForm">
      <el-form-item label="客户类型：" prop="type">
        <el-select v-model="info.customerSegmentId" placeholder="请选择"  >
          <el-option
            v-for="item in sceneMarketCustomerList"
            :key="item.customerSegmentId"
            :label="item.customerSegmentName"
            :value="item.customerSegmentId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态：" prop="status">
        <el-select v-model="info.status" placeholder="请选择"  >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="名称：" prop="name">
        <el-input
          v-model="info.name"
          placeholder="请输入名称"
        />
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
  computed: {
    sceneMarketCustomerList () {
      return this.$store.getters.sceneMarketCustomerList
    }
  },
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
        { label: '未公开', value: 'CREATED' },
        { label: '已公开', value: 'PUBLISHED' },
        { label: '已结束', value: 'ALREADYEND' },
        { label: '已暂停', value: 'PAUSED' }
      ],
      customerSegmentOptions: [
        { label: '全部', value: '' },
        { label: '潜在客户', value: '1' }
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
