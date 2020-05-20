<template>
  <div class="bind-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>活动图片上传</span>
      </div>
      <el-form ref="ruleForm" label-width="200px">
        <el-form-item label="活动图片上传【.zip】：">
          <el-upload ref="upload" :limit="1" class="inlineBlock"
                     :before-upload="beforeAvatarUpload"
                     :show-file-list="false"
                     :http-request="requestFile"
                     :action="uploadUrl()">
            <el-button type="primary" class="mr" size="mini">选择</el-button>
          </el-upload>
          <span class="promptingError">说明： 1.选择zip压缩包，压缩包内不能含多层级目录； 2.图片尺寸宽度785px*高度1248px； 3.压缩包大小50M以下，单张图片大小2MB以下； 4.图片格式JPG,JPEG； 5.图片名称按内部规范。</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const BASE_URL = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL
export default {
  props: ['imageName'],
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  computed: {
    info () {
      return this.$store.getters.specialActivityInfo
    }
  },
  methods: {
    uploadUrl: function () {
      return `${BASE_URL}/admin/v1/imgUpload/forSpecialActivity`
    },
    beforeAvatarUpload (file) {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      let name = file.name.toLowerCase()
      let nameAttr = name.split('.')
      let isZIP = nameAttr[nameAttr.length - 1] && nameAttr[nameAttr.length - 1] === 'zip'
      if (!isZIP) {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error('上传文件仅支持zip格式')
      }
      let isLt50M = file.size / 1024 / 1024 <= 50
      if (!isLt50M) {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error('上传文件大小不能超过 50MB!')
      }
      return isZIP && isLt50M
    },
    requestFile (param) {
      let temp = param.file
      let f = new FormData()
      f.append('file', temp)
      f.append('id', this.info.id)
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.$api.specialActivity.upLoadFile(f).then(res => {
        this.$message.success('文件上传成功！')
        this.$store.dispatch('specialActivity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bind-form {
    margin: 20px;
    .promptingError{
      line-height: 20px;
    }

  }
</style>
