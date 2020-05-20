<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">预制并上传商家券</div>
    <el-form :model="info" :rules="rules" label-width="180px" ref="merchantUpload">
      <el-form-item label="商家券名称：">
        <span>{{info.name}}</span>
      </el-form-item>
      <el-form-item label="所属商户号：">
        <span>{{info.belongMerchantName}}</span>
      </el-form-item>
      <el-form-item label="商家券批次ID：">
        <span>{{info.stockId}}</span>
      </el-form-item>
      <el-form-item label="本次预制商家券数量：" prop="num">
        <el-input
          v-model="info.num"
          placeholder="请输入本次预制商家券数量"
          @input="provingNum('num', $event)"
        />
        <span class="prompting"> *200个CODE上传一次，一次性上传券的值不要设置太大</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryList">确定</el-button>
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
      rules: {
        num: [{ required: true, message: '请输入本次预制商家券数量', trigger: 'blur' }]
      }
    }
  },
  methods: {
    provingNum (name, $event) {
      let _val = this.info[name].replace(/[\D]/gi, '')
      this.$set(this.info, name, _val !== '' ? parseInt(_val) : '')
    },
    queryList () {
      let falg = false
      this.$refs.merchantUpload.validate(valid => {
        valid ? falg = true : falg = false
      })
      if (!falg) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.$emit('createCode')
        })
        .catch(_ => {})
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
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
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
    }
    &:last-child{
      flex-basis: 66%;
    }
  }
  .prompting{
    color: red;
    font-size: 13px;
    display: block
  }
}
</style>
