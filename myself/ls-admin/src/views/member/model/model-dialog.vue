<template>
  <el-dialog class="model-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('modelInfoForm')">
    <el-form :model="info" :rules="rules" ref="modelInfoForm" label-width="120px">
      <el-form-item label="模块编码" prop="modelCode">
        <el-input v-model="info.modelCode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="模块名称" prop="modelName">
        <el-input v-model="info.modelName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="模块路由地址" prop="modelAddr">
        <el-input v-model="info.modelAddr" autocomplete="off" />
      </el-form-item>
      <el-form-item label="模块等级" prop="modelLevel">
        <el-select v-model="info.modelLevel" placeholder="请选择用户类型" :disabled="type==='edit'">
          <el-option label="系统等级" :value="'1'" />
          <el-option label="模块等级" :value="'2'" />
        </el-select>
      </el-form-item>
      <el-form-item label="上级模块名称" prop="supModel" v-if="info.modelLevel==='2'">
        <el-select v-model="info.supModel" placeholder="请选择上级模块">
          <el-option v-for="item in supModelLists" :key="item.id" :label="item.modelName" :value="item.modelCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="序号" prop="modelIndex">
        <el-input v-model="info.modelIndex" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('modelInfoForm')">取 消</el-button>
      <el-button v-if="type==='create'" type="primary" @click="comfirm('modelInfoForm')">确 定</el-button>
      <el-button v-else type="primary" @click="update('modelInfoForm')">更 新</el-button>
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
      supModelLists: [],
      rules: {
        modelCode: [
          { required: true, message: '请输入模块编码', trigger: 'blur' },
        ],
        modelName: [
          { required: true, message: '请输入模块名称', trigger: 'blur' },
        ],
        modelIndex: [
          { required: true, message: '请输入序号', trigger: 'blur' },
        ],
        modelLevel: [
          { required: true, message: '请选择模块等级', trigger: 'change' },
        ],
        supModel: [
          { required: true, message: '请选择上级模块', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    title () {
      if (this.type === 'create') {
        return '新增模块'
      } else {
        return '编辑模块'
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
      this.$nextTick(() => {
        this.$refs.modelInfoForm.clearValidate()
      })
    },
    'info.modelLevel' (val) {
      if (val === '2') {
        this.getSupModels({ modelLevel: '1' })
      }
    }
  },
  methods: {
    getSupModels (data) {
      this.$api.adminModel.modelLevelIndex(data).then(res => {
        this.supModelLists = res.data
      }).catch(error => {
        this.$message.error(error.message)
      })
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
.model-dialog {
  .el-input {
    width: 50%;
  }
  .el-select{
    .el-input {
      width: 100%;
    }
  }
}
</style>
