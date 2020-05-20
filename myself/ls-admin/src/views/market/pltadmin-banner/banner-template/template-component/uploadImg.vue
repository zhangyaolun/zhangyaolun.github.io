<template>
  <section>
    <el-upload
      :action="uploadUrl()"
      list-type="picture-card"
      :limit="1"
      :file-list="imageList"
      :headers="headers"
      :on-success="bigFileSuccess" :before-upload="beforeAvatarUpload" :class="{hideUpload: imageList.length >= 1}">
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
      dialogVisible: false,
    }
  },
  computed: {
    headers () {
      return {
        'Authentication-Admin-Web-Token': getToken()
      }
    },
    info () {
      return this.$store.getters.pltadminBannerInfo
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
      if (this.imageName === 'backgroundImage') this.$parent.$parent.$parent.$parent.$refs.ruleForm.validateField(this.imageName)
      this.$store.dispatch('specialActivity/setLoadingData', false)
    },
    uploadUrl: function () {
      return `${BASE_URL}/market/web/v1/file/uploadImg`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove () {
      this.$set(this.info, this.imageName, '')
    },
    beforeAvatarUpload (file) {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      let _type = file.type.toLowerCase()
      let isJPG = /^image\/(jpg|png|jpeg)$/.test(_type)
      let isLt2M = file.size / 1024 / 1024 <= 2
      if (!isJPG) {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error('上传图片仅支持JPG/JPEG/PNG格式')
      }
      if (!isLt2M) {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      let isSize = new Promise((resolve, reject) => {
        if (this.imageName === 'backgroundImage') {
          const reader = new FileReader()
          const image = new Image()
          image.onload = () => {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            let width = image.width
            let height = image.height

            let product = 800 / width
            width = Math.floor((width * product) * 100) / 100
            height = Math.floor((height * product) * 100) / 100

            canvas.width = width
            canvas.height = height
            context.clearRect(0, 0, width, height)
            context.drawImage(image, 0, 0, width, height)
            const dataUrl = canvas.toDataURL(file.type)
            const blobData = this.dataURItoBlob(dataUrl, file.type)
            resolve(blobData)
          }
          reader.onload = (e => { image.src = e.target.result })
          reader.readAsDataURL(file)
        } else {
          let width = 702
          let height = 248
          let _URL = window.URL || window.webkitURL
          let img = new Image()
          img.onload = () => {
            let valid = +img.width >= width && +img.height >= height
            valid ? resolve(file) : reject()
          }
          img.src = _URL.createObjectURL(file)
        }
      }).then((res) => {
        return res
      }, () => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        if (this.imageName === 'imagePathList') {
          this.$message.error('请上传尺寸=宽度702px以上*高度248px以上的图片文件')
        } else if (this.imageName === 'backgroundImage') {
          this.$message.error('请上传尺寸=宽度800px*高度不限的图片文件')
        }
        return Promise.reject()
      })
      return isJPG && isLt2M && isSize
    },
    dataURItoBlob (dataURI, type) {
      let binary = atob(dataURI.split(',')[1])
      let array = []
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], { type: type })
    },
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
