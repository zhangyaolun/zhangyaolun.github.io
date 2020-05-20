<template>
  <el-card class="order-basic-info">
    <div slot="header" class="clearfix">
      <span>会员基本信息</span>
    </div>
    <el-form :model="order" label-width="120px" class="detailLabelColor">
      <el-row>
        <el-col :span="8">
          <el-form-item label="手机号：">
            {{order.mobile}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="会员id：">
            {{order.userId}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>
