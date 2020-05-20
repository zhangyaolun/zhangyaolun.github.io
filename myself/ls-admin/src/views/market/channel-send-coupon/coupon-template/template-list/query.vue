<template>
    <el-card class="box-card">
      <el-form :model="info" label-width="130px" ref="CouponListQueryForm">
        <el-form-item label="活动ID：" prop="id">
          <el-input
            v-model="info.id"
            placeholder="请输入活动ID"
          />
        </el-form-item>

        <el-form-item label="活动名称：" prop="activityName">
          <el-input
            v-model="info.activityName"
            placeholder="请输入活动名称"
          />
        </el-form-item>
        <el-form-item label="活动KEY：" prop="activityKey">
          <el-input
            v-model="info.activityKey"
            placeholder="请输入活动KEY"
          />
        </el-form-item>
        <el-form-item label="活动类型：" prop="type">
          <el-select v-model="info.type" placeholder="请选择"  >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
        { label: '渠道合作', value: 'COOPERATION' }
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
    &:nth-last-child(2){
      flex-basis: 33%;
      .line{
        text-align: center;
      }
      margin-right: 10%;
    }
    &:last-child{
      flex-basis: 100%;
    }
  }
}
</style>
