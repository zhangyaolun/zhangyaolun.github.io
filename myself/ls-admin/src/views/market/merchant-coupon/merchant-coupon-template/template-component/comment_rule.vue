<template>
  <el-card class="box-card action-add-info">
    <div slot="header" class="clearfix">备注信息设置</div>
    <el-form ref="ruleForm" :model="info" :rules="rules" label-width="180px" class="appid">
      <el-form-item class="form-desc-item" label="批次备注说明：" prop="baseInfo.comment">
        <el-input type="text" v-model="info.baseInfo.comment" maxlength="20" placeholder="请输入批次备注说明" :disabled="info.pageType === 'detail'"/>
        <span class="inlineBlock promptingError" v-if="info.pageType !== 'detail'">*最多可输入20位</span>
      </el-form-item>
      <el-form-item class="form-desc-item" label="商家券说明：" prop="couponInfo.couponExplain">
        <el-input type="textarea" class="inputWidth70" v-model="info.couponInfo.couponExplain" placeholder="请输入商家券说明" :autosize="{ minRows: 6, maxRows: 40}" :disabled="info.pageType === 'detail'"/>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  computed: {
    info () {
      return this.$store.getters.merchantCouponInfo
    }
  },
  data () {
    return {
      rules: {
        'baseInfo.comment': [{ required: true, message: '请输入批次备注说明', trigger: 'blur' }],
        'couponInfo.couponExplain': [{ required: true, message: '请输入商家券说明', trigger: 'blur' }]
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .action-add-info{
    .el-form-item{
      margin-bottom: 18px !important;
    }
    .el-input{
      width: 400px !important;
    }
    margin: 20px;
    .inputWidth70{
      width: 70% !important;
    }
  }
</style>
