<template>
  <el-dialog class="param-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('paramInfoForm')">
    <el-form :model="info" :rules="rules" ref="paramInfoForm" label-width="100px">
      <el-form-item label="参数编码" prop="conParamCode">
        <el-input v-model="info.conParamCode" placeholder="请输入参数编码" autocomplete="off" :disabled="type==='edit'"/>
      </el-form-item>
      <el-form-item label="参数名称" prop="conParamName">
        <el-input v-model="info.conParamName" placeholder="请输入参数名称" autocomplete="off" />
      </el-form-item>
      <el-form-item label="参数值" prop="conParamValue">
        <el-input v-model="info.conParamValue" placeholder="请输入参数值" autocomplete="off" />
      </el-form-item>
      <el-form-item label="参数等级" prop="conParamType">
        <el-select v-model="info.conParamType" placeholder="请选择参数等级" style="width:50%" :disabled="type==='edit'">
          <el-option
            v-for="item in paramLevelList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级参数" prop="superParamCode" v-if="info.conParamType== '1'">
        <el-select v-model="info.superParamCode" placeholder="请选择上级参数" style="width:50%">
          <el-option
            v-for="item in paramList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('paramInfoForm')">取 消</el-button>
      <el-button v-if="type==='create'" type="primary" @click="comfirm('paramInfoForm')">确 定</el-button>
      <el-button v-else type="primary" @click="update('paramInfoForm')">更 新</el-button>
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
      paramList: [],
      paramLevelList: [{
          value: 0,
          label: '一级参数'
      },
      {
          value: 1,
          label: '二级参数'
      }],
      rules: {
        conParamCode: [
          { required: true, message: '请输入参数编码', trigger: 'blur' },
        ],
        conParamName: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
        ],
        conParamValue:[
          { required: true, message: '请输入参数值', trigger: 'blur' }
        ],
        conParamType:[
          { required: true, message: '请选择参数等级', trigger: 'blur' }
        ],
        superParamCode:[
          { required: true, message: '请选择上级参数', trigger: 'blur'}
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
        this.$refs.paramInfoForm.clearValidate()
      })
    }
  },
  created(){
    this.$api.adminParam.getList(0).then(res => {
      res.data.forEach(ele => {
        this.paramList.push({
          value: ele.conParamCode,
          label: ele.conParamName
        })
      })
    })
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
    },
    getParamList(){
       this.$api.adminParam.getList(0).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style lang="scss">
.param-dialog {
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
