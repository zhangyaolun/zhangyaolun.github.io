<template>
  <div class="push-object-setting">
    <h2>推送对象设置</h2>
    <el-form class="push-object-setting__content" ref="PushObjectSettingContent" :model="form" :rules="rules">
      <el-form-item prop="pushActivityKey">
        <el-input v-model="form.pushActivityKey"></el-input>
        <div>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            accept="text/csv"
            ref="upload"
            :http-request="requestFile"
            :show-file-list="false"
            :multiple="form.templateType === 0 ? true : false"
            :auto-upload="form.templateType === 0 ? false : true"
            :before-upload="beforeUpload">
              <el-button slot="trigger" size="small" type="primary" v-if="form.templateType === 0 ? true : false" @click="clearFiles">选取文件</el-button>
              <el-button size="small" type="primary" @click="submitUpload()" :class="{ 'ml40': form.templateType === 0 }">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">最多可上传<span v-if="form.templateType === 0">两</span><span v-else>一</span>个文件，支持csv文件</div>
            </el-upload>
            <ul class="el-upload-list el-upload-list--text" v-if="form.uploadFileName.length">
              <li tabindex="0" class="el-upload-list__item is-ready" v-for="(item, index) in form.uploadFileName">
                <a class="el-upload-list__item-name">
                  <i class="el-icon-document"></i>
                  {{ item }}
                </a>
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-circle-check"></i>
                </label>
                <i class="el-icon-close" @click="handleFileDel(item, index)"></i>
              </li>
            </ul>
        </div>
        <el-link type="primary" class="ml40" href="https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/userIdTemplate.csv">userId下载模板</el-link>
        <el-link type="primary" class="ml40" v-if="form.templateType === 0" href="https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/openIdTemplate.csv">openId下载模板</el-link>
      </el-form-item>
      <div class="push-object-setting__time-field">
        <el-form-item prop="pushTimeType">
          <el-radio-group v-model="form.pushTimeType">
            <el-radio :label="0">立即发送</el-radio>
            <el-radio :label="1">定时发送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="pushTime" v-show="form.pushTimeType === 1">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="form.pushTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="pushTimeChange"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index.js'

export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.wechatTemplateLoading
    }
  },
  watch: {
    'form.pushTimeType' (val) {
      if (val === 0) {
        this.form.pushTimeImmediate = parseTime(new Date())
        this.form.pushTime = ''
      } else {
        this.form.pushTimeImmediate = ''
      }
    }
  },
  methods: {
    pushTimeChange (val) {
      if (new Date(val).getTime() <= Date.now()) {
        this.$message.error('请选择未来时间')
        this.form.pushTime = ''
      }
    },
    clearFiles () {
      this.$refs.upload.clearFiles()
    },
    requestFile (param) {
      // 先判断有没有选模版
      let temp = param.file
      let fileData = new FormData()
      fileData.append('file', temp)
      this.uploadFile(fileData).then(res => {
        this.form.uploadFileName = []
        this.form.uploadFileName.push(param.file.name)
      })
    },
    submitUpload () { // 多文件上传
      if (this.form.templateType !== 0) return
      let { uploadFiles } = this.$refs.upload
      if (uploadFiles.length === 0) {
        this.$message.error('请先选取文件')
        return
      }
      if (uploadFiles.length > 2) {
        this.$message.error('最多可上传两个文件')
        return
      }
      let nameList = []
      let fileData = new FormData()
      uploadFiles.forEach(v => {
        fileData.append('file', v.raw)
        nameList.push(v.name)
      })

      this.uploadFile(fileData).then(() => {
        this.form.uploadFileName = nameList
      })
    },
    uploadFile (fileData) {
      this.$store.dispatch('wechatTemplate/setLoadingData', false)
      return new Promise((resolve, reject) => {
        this.$api.promotionTemplateMsg.uploadFile({
          templateId: this.form.templateId,
          file: fileData
        }).then(res => {
          this.$store.dispatch('wechatTemplate/setLoadingData', false)
          this.form.pushActivityKey = res.data
          this.clearFiles()
          resolve()
        }).catch(error => {
          this.$store.dispatch('wechatTemplate/setLoadingData', false)
          this.form.uploadFileName = []
          this.$message.error(error.message)
          this.clearFiles()
        })
      })
    },
    handleFileDel (item, index) {
      if (this.form.templateType === 0) item = '所有模版'
      this.$confirm(`确定移除${item}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.uploadFileName = []
        this.form.pushActivityKey = ''
      })
    },
    beforeUpload (file) {
      let _type = file.name.toLowerCase()
      let isCSV = /\.(csv)$/.test(_type)
      // const isCSV = file.type === 'text/csv'
      if (!isCSV) {
        this.$message.error('上传文件只支持 CSV 格式!')
      }
      return isCSV
    }
  }
}
</script>

<style lang="scss">
.push-object-setting {
  border-top: 1px solid #ececec;
  .ml40{margin-left: 40px;}
  .el-form-item:first-child {
    .el-form-item__content {
      display: flex;
      align-items: flex-start;
      .el-input {
        position: absolute;
        opacity: 0;
        z-index: -4;
      }
    }
  }
  &__time-field {
    display: flex;
    align-items: center;
    .el-form-item {
     margin-right: 20px;
    }
  }
}
</style>
