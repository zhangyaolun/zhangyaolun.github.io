<template>
  <section>
    <el-upload
      list-type="picture-card"
      :action="uploadUrl()"
      :file-list="imageList" class="hideUpload">
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
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-upload ref="uploadimage" :action="uploadUrl()" :show-file-list="false" :headers="headers"
               :on-success="bigFileSuccess" :before-upload="beforeAvatarUpload" >
      <el-button size="mini" type="primary">点击更换背景图</el-button>
    </el-upload>
  </section>
</template>

<script>
import { getToken } from '@/utils/auth'
const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  props: ['imageName', 'index'],
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
      return this.$store.getters.specialActivityInfo
    },
    imageList () {
      let imglist = []
      imglist = [{ url: this.info[this.imageName][this.index].couponImage }]
      return imglist
    }
  },
  methods: {
    bigFileSuccess (res, file) {
      this.info[this.imageName][this.index].couponImage = res.data
      this.$store.dispatch('specialActivity/setLoadingData', false)
    },
    uploadUrl: function () {
      return `${BASE_URL}/market/web/v1/file/uploadImg`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
      return isJPG && isLt2M
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
    line-height: 148px;
  }
</style>
