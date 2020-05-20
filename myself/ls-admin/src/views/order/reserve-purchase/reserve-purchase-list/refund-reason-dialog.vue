<template>
  <el-dialog class="refund-reason-form-wrap" :title="'退款原因'" :visible.sync="dialogFormVisible" @close="close('refundReasonForm')">
    <el-form :rules="rules" ref="refundReasonForm" :model="info" label-width="100px">
      <el-form-item label="退款原因" prop="refundReason">
        <el-input type="textarea" v-model="info.refundReason" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('refundReasonForm')">取消</el-button>
      <el-button type="primary" @click="comfirm('refundReasonForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      info: {
        refundReason: ''
      },
      rules: {
        refundReason: [
          { required: true, message: '退款原因不能为空', trigger: 'blur' },
          { max: 100, message: '最多输入 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
      this.resetInfo()
      this.$nextTick(() => {
        this.$refs.refundReasonForm.clearValidate()
      })
    }
  },
  methods: {
    resetInfo () {
      this.info.refundReason = ''
    },
    close (formName) {
      this.$refs[formName].clearValidate()
      this.$emit('update:visible', false)
    },
    cancle (formName) {
      // this.$refs[formName].resetFields()
      this.$emit('cancle')
    },
    comfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('comfirm', this.info)
        } else {
          return false
        }
      })
    }
  }
}
</script>
