<template>
  <section>
    <el-upload
      :action="uploadUrl()"
      list-type="picture-card"
      ref="upload"
      :limit="1"
      :file-list="imageList"
      :headers="headers"
      :http-request="requestFile"
      :before-upload="beforeAvatarUpload" :class="{hideUpload: imageList.length >= 1}">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url" alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
            v-if="info.pageType !== 'detail'"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </section>
</template>

<script>
import { getToken } from '@/utils/auth'
const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  props: ['imageName'],
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    headers () {
      return {
        'Authentication-Admin-Web-Token': getToken()
      }
    },
    info () {
      return this.$store.getters.wechatTemplateMarketForm
    },
    imageList () {
      let imglist = []
      this.info[this.imageName] ? imglist = [{ url: this.info[this.imageName] }] : imglist = []
      return imglist
    }
  },
  methods: {
    bigFileSuccess (res, file) {
      this.$set(this.info, this.imageName, res.data)
      if (this.imageName === 'imageUrl') this.$parent.$parent.$parent.$refs.TemplateMsgCreateFormContent.validateField(this.imageName)
      this.$store.dispatch('wechatTemplate/setLoadingData', false)
    },
    requestFile (param) {
      // 先判断有没有选模版
      let temp = param.file
      let fileData = new FormData()
      fileData.append('media', temp)
      this.$api.promotionTemplateMsg.uploadMedia({
        msgType: this.info.type,
        media: fileData
      }).then(res => {
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
        this.$set(this.info, this.imageName, res.data.url)
        if (this.imageName === 'imageUrl') this.$set(this.info, 'mediaKey', res.data.mediaKey)
        if (this.imageName === 'imageUrl') this.$parent.$parent.$parent.$refs.TemplateMsgCreateFormContent.validateField(this.imageName)
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
        this.$refs.upload.clearFiles()
      }).catch(error => {
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
        this.$set(this.info, this.imageName, '')
        if (this.imageName === 'imageUrl') this.$set(this.info, 'mediaKey', '')
        this.$message.error(error.message)
        this.$refs.upload.clearFiles()
      })
    },
    uploadUrl: function () {
      return `${BASE_URL}/notify/web/v1/wechatPush/uploadMedia`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove () {
      this.$set(this.info, this.imageName, '')
      if (this.imageName === 'imageUrl') this.$set(this.info, 'mediaKey', '')
    },
    beforeAvatarUpload (file) {
      this.$store.dispatch('wechatTemplate/setLoadingData', true)
      let _type = file.type.toLowerCase()
      let isJPG = /^image\/(jpg|png|jpeg)$/.test(_type)
      let isLt2M = file.size / 1024 / 1024 <= 2
      if (!isJPG) {
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
        this.$message.error('上传图片仅支持JPG/JPEG/PNG格式')
      }
      if (!isLt2M) {
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      let isSize = new Promise((resolve, reject) => {
        if (this.imageName === 'imageUrl') {
          let width = 520
          let height = 416

          if (this.info.type === 1) {
            width = 400
            height = 400
          }
          let _URL = window.URL || window.webkitURL
          let img = new Image()
          img.onload = function () {
            let valid = +img.width === width && +img.height === height
            valid ? resolve() : reject()
          }
          img.src = _URL.createObjectURL(file)
        }
      }).then((res) => {
        return res
      }, () => {
        this.$store.dispatch('wechatTemplate/setLoadingData', false)
        this.info.type === 1 ? this.$message.error('上传的图片尺寸为400*400') : this.$message.error('上传的图片尺寸为520*416')
        return Promise.reject()
      })
      return isJPG && isLt2M && isSize
    }
  }
}
</script>

<style lang="scss">
  .el-upload-list__item {
    transition: none !important;
  }
  .hideUpload .el-upload--picture-card {
    display: none!important;
  }
  .el-upload-list--picture-card .el-upload-list__item{
    line-height: 0 !important;
    height: auto !important;
    border: none !important;
  }
</style>
