<template>
  <el-dialog class="role-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('roleInfoForm')">
    <el-form :model="info" :rules="rules" ref="roleInfoForm" label-width="100px">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="info.roleCode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="info.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="info.roleDesc" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('roleInfoForm')">取 消</el-button>
      <el-button v-if="type==='create'" type="primary" @click="comfirm('roleInfoForm')">确 定</el-button>
      <el-button v-else type="primary" @click="update('roleInfoForm')">更 新</el-button>
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
    type: {
      type: String,
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
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    title () {
      if (this.type === 'create') {
        return '新增角色'
      } else {
        return '编辑角色'
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
      this.$nextTick(() => {
        this.$refs.roleInfoForm.clearValidate()
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
    },
    update (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('update', this.info)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.role-dialog {
  .el-input {
    width: 50%;
  }
}
</style>
