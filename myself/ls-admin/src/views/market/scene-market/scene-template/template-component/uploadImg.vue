<template>
  <section class="sceneMarketImg">
    <el-upload
      class="sceneMarketUpload"
      :action="uploadUrl()"
      list-type="picture-card"
      :limit="1"
      :file-list="imageList"
      :headers="headers"
      :on-success="bigFileSuccess" v-if="imageList" :before-upload="beforeAvatarUpload" :class="{hideUpload: imageList.length >= 1}">
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
    <view-picture :url.sync="dialogImageUrl" :visible.sync="dialogVisible"></view-picture>
    <div class="el-loading-mask" v-if="loading">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import viewPicture from '@/components/viewPicture'
import { getToken } from '@/utils/auth'
const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  props: ['imageName'],
  components: {
    viewPicture
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      loading: false
    }
  },
  computed: {
    headers () {
      return {
        'Authentication-Admin-Web-Token': getToken()
      }
    },
    info () {
      return this.$store.getters.sceneMarketInfo
    },
    imageList () {
      let imglist = []
      if (this.imageName === 'wechatNewsInfo.thumbnailImgUrl') {
        this.info.wechatNewsInfo.thumbnailImgUrl ? imglist = [{ url: this.info.wechatNewsInfo.thumbnailImgUrl }] : imglist = []
      }
      return imglist
    }
  },
  methods: {
    bigFileSuccess (res, file) {
      if (this.imageName === 'wechatNewsInfo.thumbnailImgUrl') {
        this.$set(this.info.wechatNewsInfo, 'thumbnailImgUrl', res.data)
        this.$parent.$parent.$parent.$parent.$refs.infoForm.validateField('wechatNewsInfo.thumbnailImgUrl')
      }
      this.loading = false
    },
    uploadUrl: function () {
      return `${BASE_URL}/market/web/v1/file/uploadImg`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove () {
      this.$set(this.info.wechatNewsInfo, 'thumbnailImgUrl', '')
    },
    beforeAvatarUpload (file) {
      this.loading = true
      let _type = file.type.toLowerCase()
      let isJPG = /^image\/(jpg|png|jpeg)$/.test(_type)
      let isLt2M = file.size / 1024 / 1024 <= 2
      if (!isJPG) {
        this.loading = false
        this.$message.error('上传图片仅支持JPG/PNG格式')
      }
      const isSize = new Promise((resolve, reject) => {
        let width = 500
        let height = 400

        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = +img.width === width && +img.height === height
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.loading = false
        this.imageName === 'wechatNewsInfo.thumbnailImgUrl' ? this.$message.error('上传的图片尺寸为500*400') : ''
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
  .sceneMarketUpload{
    .el-upload-list--picture-card .el-upload-list__item{
      line-height: 0 !important;
      height: auto !important;
      border: none !important;
    }
  }
  .sceneMarketImg {
    .el-loading-mask{
      position: fixed;
      z-index: 3000;
    }
  }
</style>
