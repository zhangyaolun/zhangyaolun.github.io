<template>
  <el-dialog class="groupSetting-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('infoForm')">
    <el-form :model="info" label-width="100px" ref="infoForm" :rules="rules">
      <el-form-item label="客群名称:" prop="name">
      <el-input v-model="info.name" placeholder="请输入客群名称" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark" style="width: 70%">
        <el-input type="textarea" v-model="info.memo" placeholder="请输入备注" autocomplete="off" maxlength="50" :autosize="{ minRows: 6, maxRows: 40}"/>
      </el-form-item>
      <el-form-item label="" prop="remark">
        <el-upload v-if="info.csvName === ''" ref="uploadcommodity" :limit="1" class="upload-svg inlineBlock" :before-upload="beforeAvatarUploadsvg" :show-file-list="false" :http-request="requestFileSvgCommod" :action="actionSvg">
          <el-link type="primary">上传指定用户</el-link>
        </el-upload>
        <section v-if="info.csvName !== ''" class="inlineBlock">
          <span class="mr">{{info.csvName}}</span>
<!--          <el-button type="primary" class="mr" size="mini ml20" @click="csvClick">预览</el-button>-->
          <el-button type="danger" class="mlr15" size="mini" @click="shopCsvDel">删除</el-button>
        </section>
        <el-link type="primary" class="ml40" href="https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/userIdTemplate.csv">下载模板</el-link>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('infoForm')">取 消</el-button>
      <el-button type="primary" @click="comfirm('infoForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  components: {

  },
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
      actionSvg: ``,
      dialogFormVisible: false,
      title: '自定义客群',
      rules: {
        'name': [{ required: true, message: '请输入客群名称', trigger: 'blur' }]
      }
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    close (formName) {
      this.$emit('update:visible', false)
      this.$refs[formName].clearValidate()
    },
    cancle (formName) {
      this.$emit('update:visible', false)
      this.$refs[formName].clearValidate()
    },
    comfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('comfirm', { title: this.info.id === '' ? '创建' : '修改' })
        } else {
          return false
        }
      })
    },
    beforeAvatarUploadsvg (file) {
      let _type = file.name.toLowerCase()
      let isCSV = /\.(csv)$/.test(_type)
      if (!isCSV) {
        this.$message.error('上传文件只支持 CSV 格式!')
      }
      return isCSV
    },
    requestFileSvgCommod (param) {
      let temp = param.file
      let fileData = new FormData()
      fileData.append('file', temp)
      this.$set(this.info, 'csvName', temp.name)
      this.$set(this.info, 'file', fileData)
    },
    shopCsvDel () {
      this.$set(this.info, 'csvName', '')
      this.$set(this.info, 'file', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.groupSetting-dialog {
  .ml40{margin-left: 40px}
  .mlr15{margin: 0 15px}
  .el-input{
    width: 70%;
  }
}
</style>
