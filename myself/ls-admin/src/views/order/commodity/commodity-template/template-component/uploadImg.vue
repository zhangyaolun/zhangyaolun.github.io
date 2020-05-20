<template>
  <section>
    <el-upload
      :action="uploadUrl()"
      list-type="picture-card"
      :limit="1"
      :file-list="imageList"
      :headers="headers"
      :on-success="bigFileSuccess" v-if="imageList" :before-upload="beforeAvatarUpload" :class="{hideUpload: +imageList.length >= 1 || info.pageType === 'detail'}">
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
      return this.$store.getters.commodityInfo
    },
    imageList () {
      let imglist = []
      if (this.imageName === 'thumnailImagePath') {
        this.info.thumnailImagePath ? imglist = [{ url: this.info.thumnailImagePath }] : imglist = []
      }
      return imglist
    }
  },
  methods: {
    bigFileSuccess (res, file) {
      if (this.imageName === 'thumnailImagePath') {
        this.$set(this.info, this.imageName, res.data)
        this.$parent.$parent.$parent.$parent.$refs.ruleForm.validateField('thumnailImagePath')
      }
      this.$store.dispatch('commodity/setLoadingData', false)
    },
    uploadUrl: function () {
      return `${BASE_URL}/market/web/v1/file/uploadImg`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove () {
      this.imageName === 'thumnailImagePath' ? this.$set(this.info, this.imageName, '') : ''
    },
    beforeAvatarUpload (file) {
      this.$store.dispatch('commodity/setLoadingData', true)

      let _type = file.type.toLowerCase()
      let isJPG = /^image\/(jpg|png|jpeg)$/.test(_type)
      const isLt2M = file.size / 1024 / 1024 <= 2

      if (!isJPG) {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error('上传图片仅支持JPG/PNG格式')
      }
      if (!isLt2M) {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      const isSize = new Promise((resolve, reject) => {
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = () => {
          let valid = +img.width === +img.height
          if (valid) {
            +img.width >= 400 && +img.width <= 2000 ? resolve() : reject()
          } else {
            reject()
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error('图片比例不符合规范')
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
</style>
