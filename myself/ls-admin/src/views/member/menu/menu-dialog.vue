<template>
  <el-dialog class="menu-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('menuInfoForm')">
    <el-form :model="info" :rules="rules" ref="menuInfoForm" label-width="100px">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="info.menuName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上级模块" prop="sysObj">
        <el-select v-model="info.sysObj" placeholder="请选择所属系统" :value-key="'sysCode'" @change="change">
          <el-option v-for="item in sysLists" :key="item.sysCode" :label="item.sysName" :value="item" />
        </el-select>
        <el-select v-model="info.modelObj" placeholder="请选择所属模块" :value-key="'modelCode'">
          <el-option v-for="item in modelLists" :key="item.modelCode" :label="item.modelName" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" prop="menuAddr">
        <el-input v-model="info.menuAddr" autocomplete="off" />
      </el-form-item>
      <el-form-item label="序号" prop="menuIndex">
        <el-input v-model="info.menuIndex" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('menuInfoForm')">取 消</el-button>
      <el-button v-if="type==='create'" type="primary" @click="comfirm('menuInfoForm')">确 定</el-button>
      <el-button v-else type="primary" @click="update('menuInfoForm')">更 新</el-button>
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
    menuId: {
      type: Number,
      required: true
    }
  },
  data () {
    var validateModelObj = (rule, value, callback) => {
      if (this.info.sysObj && this.info.sysObj.sysCode) {
        if (!Object.keys(value).length) {
          callback(new Error('请选择菜单所属上级模块编码'))
        } else {
          callback()
        }
      }
    }
    var validateSysObj = (rule, value, callback) => {
      if (!Object.keys(value).length) {
        callback(new Error('请选择菜单所属上级模块编码'))
      } else {
        callback()
      }
    }
    return {
      info: {
        menuName: '',
        modelObj: {},
        sysObj: {},
        menuAddr: '',
        menuIndex: ''
      },
      dialogFormVisible: false,
      sysLists: [],
      modelLists: [],
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        sysObj: [
          { validator: validateSysObj, trigger: 'change' },
        ],
        menuIndex: [
          { required: true, message: '请输入菜单序号', trigger: 'blur' },
        ],
        modelObj: [
          { validator: validateModelObj, trigger: 'change' }
        ],
        menuAddr: [
          { required: true, message: '请输入菜单地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title () {
      if (this.type === 'create') {
        return '新增菜单'
      } else {
        return '编辑菜单'
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
      this.resetInfo()
      this.$nextTick(() => {
        this.$refs.menuInfoForm.clearValidate()
      })
    },
    'info.sysObj': {
      handler (val) {
        if (val.sysCode) {
          this.getModelList({ modelCode: val.sysCode})
        }
      },
      deep: true
    },
    menuId (val) {
      this.resetInfo()
      if (val !== -1) {
        this.getMenuDetail({ id: val })
      }
    }
  },
  created () {
    this.$api.adminModel.modelLevelIndex({
      modelLevel: '1'
    }).then(res => {
      res.data.forEach(ele => {
        this.sysLists.push({
          sysCode: ele.modelCode,
          sysName: ele.modelName
        })
      })
    })
  },
  methods: {
    resetInfo () {
      this.info = {
        menuName: '',
        modelObj: '',
        menuAddr: '',
        menuIndex: '',
        sysObj: ''
      }
    },
    getMenuDetail (data) {
      this.$api.adminMenu.detail(data).then(res => {
        this.info.menuName = res.data.menuName
        this.info.modelObj = {
          modelCode: res.data.modelCode,
          modelName: res.data.modelName
        }
        this.info.menuAddr = res.data.menuAddr
        this.info.menuIndex = res.data.menuIndex
        this.sysLists.forEach(list => {
          if (list.sysCode === res.data.firstModelCode) {
            this.info.sysObj = list
          }
        })
      })
    },
    change (val) {
      // this.getModelList({
      //   modelCode: val.sysCode
      // })
    },
    getModelList (data) {
      this.modelLists = []
      this.$api.adminModel.modelListBySupModelIndex(data).then(res => {
        res.data.forEach(ele => {
          this.modelLists.push({
            modelCode: ele.modelCode,
            modelName: ele.modelName
          })
        })
      })
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
          let data = {
            menuName: this.info.menuName,
            modelCode: this.info.modelObj.modelCode,
            modelName: this.info.modelObj.modelName,
            menuAddr: this.info.menuAddr,
            menuIndex: this.info.menuIndex
          }
          this.$emit('comfirm', data)
        } else {
          return false
        }
      })
    },
    update (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            menuName: this.info.menuName,
            modelCode: this.info.modelObj.modelCode,
            modelName: this.info.modelObj.modelName,
            menuAddr: this.info.menuAddr,
            menuIndex: this.info.menuIndex,
            id: this.menuId
          }
          this.$emit('update', data)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.menu-dialog {
  .el-input {
    width: 50%;
  }
  .el-select {
    .el-input {
      width: 100%;
    }
    &:first-child {
      margin-right: 10px;
    }

  }
}
</style>
