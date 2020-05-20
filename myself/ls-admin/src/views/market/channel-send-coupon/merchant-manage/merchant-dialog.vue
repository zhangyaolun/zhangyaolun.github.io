<template>
  <el-dialog class="user-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('userInfoForm')">
    <el-form :model="info" :rules="rules" ref="userInfoForm" label-width="120px">
      <el-form-item label="商户名称" prop="merchantName">
        <el-input v-model="info.merchantName" autocomplete="off" placeholder="请输入商户名称" maxlength="30"/>
      </el-form-item>
      <el-form-item label="商户回调地址" prop="callbackUrl">
        <el-input v-model="info.callbackUrl" autocomplete="off" placeholder="请输入商户回调地址"/>
      </el-form-item>
      <el-form-item label="关联用户账号" prop="linkedUserName">
        <el-input v-model="info.linkedUserName" autocomplete="off" placeholder="请输入关联用户账号"/>
      </el-form-item>
      <el-form-item label="商户说明：" prop="comment" style="width: 70%">
        <el-input type="textarea" v-model="info.comment" placeholder="请输入商户说明" autocomplete="off" maxlength="50" :autosize="{ minRows: 6, maxRows: 40}"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('userInfoForm')">取 消</el-button>
      <el-button type="primary" @click="comfirm('userInfoForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        merchantName: [{ required: true, message: '请输入商户名称', trigger: 'blur' }],
        callbackUrl: [{ required: true, message: '请输入商户回调地址', trigger: 'blur' }],
        linkedUserName: [{ required: true, message: '请输入关联用户账号', trigger: 'blur' }],
      }
    }
  },
  computed: {
    title () {
      if (this.info.type === 'create') {
        return '新增商户'
      } else {
        return '编辑商户'
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
      this.$nextTick(() => {
        this.$refs.userInfoForm.clearValidate()
      })
    }
  },
  methods: {
    close (formName) {
      this.$refs[formName].clearValidate()
      this.$emit('update:visible', false)
    },
    cancle (formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false)
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

<style lang="scss">
.user-dialog {
  .el-input {
    width: 50%;
  }
  .el-select {
      .el-input {
        width: 100%;
      }
  }
}
</style>
