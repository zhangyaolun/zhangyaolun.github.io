<template>
  <el-dialog class="user-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('userInfoForm')">
    <el-form :model="info" :rules="rules" ref="userInfoForm" label-width="100px">
      <el-form-item label="登录账号" prop="userName">
        <el-input v-model="info.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="trueName">
        <el-input v-model="info.trueName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="info.sex">
          <el-radio :label="'M'">男</el-radio>
          <el-radio :label="'F'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="info.phone" autocomplete="off" maxlength="11" show-word-limit @input="checkTel" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="info.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="info.userType" placeholder="请选择用户类型" :disabled="type==='edit'">
          <el-option label="yoren用户" :value="'Y'" />
          <el-option label="合作用户" :value="'C'" />
          <el-option label="渠道商户" :value="'P'" />
        </el-select>
      </el-form-item>
      <el-form-item label="区域" prop="blockCode" v-if="info.userType==='C'">
        <el-select v-model="info.blockCode" placeholder="请选择区域">
          <el-option v-for="(item, index) in blockCodeLists" :key="index" :label="item.regionBlockName" :value="item.regionBlockCode" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('userInfoForm')">取 消</el-button>
      <el-button v-if="type==='create'" type="primary" @click="comfirm('userInfoForm')">确 定</el-button>
      <el-button v-else type="primary" @click="update('userInfoForm')">更 新</el-button>
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
    var validatePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      blockCodeLists:[],
      rules: {
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        trueName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
        blockCode: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    title () {
      if (this.type === 'create') {
        return '新增用户'
      } else {
        return '编辑用户'
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
  created(){
     this.$api.adminParam.getListBySuperParamCode('region_block_code').then(res => {
      res.data.forEach(ele => {
        this.blockCodeLists.push({
          regionBlockCode: ele.conParamValue,
          regionBlockName: ele.conParamName
        })
      })
    })
  },
  methods: {
    checkTel (val) {
      this.info.phone = val.replace(/[^0-9]/, '')
    },
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
