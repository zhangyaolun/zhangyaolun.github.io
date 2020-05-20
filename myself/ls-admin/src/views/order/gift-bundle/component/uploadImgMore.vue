<template>
  <section>
    <el-upload
      :action="uploadUrl()"
      list-type="picture-card"
      :limit="5"
      :file-list="bundle.imageBigList"
      :on-success="bigFileSuccess" v-if="bundle.imageBigList" :before-upload="beforeAvatarUpload" :class="{hideUpload: bundle.imageBigList.length >= 5}">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url" alt=""
        >
        <span class="el-upload-list__item-actions">
<!--          <span-->
<!--            class="el-upload-list__item-preview"-->
<!--            @click="handlePictureCardPreview(file)"-->
<!--          >-->
<!--            <i class="el-icon-zoom-in"></i>-->
<!--          </span>-->
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<script>
const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
export default {
  props: {
    bundle: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    bigFileSuccess (res, file) {
      this.bundle.imageBigList.push({ url: res.data })
      setTimeout(() => {
        this.$emit('loading', false)
      }, 600)
    },
    uploadUrl: function () {
      return `${BASE_URL}/modules/web/common/upload`
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file) {
      this.bundle.imageBigList = this.bundle.imageBigList.filter(v => {
        return v.url != file.url
      })
    },
    beforeAvatarUpload (file) {
      this.$emit('loading', true)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 <= 2;

      if (!isJPG && !isPNG) {
        setTimeout(() => {
          this.$emit('loading', false)
        }, 600)
        this.$emit('error', 0)
      }
      if (!isLt2M) {
        setTimeout(() => {
          this.$emit('loading', false)
        }, 600)
        this.$emit('error', 1)
      }
      const isSize = new Promise((resolve, reject) => {
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = +img.width === +img.height
          if (valid) {
            +img.width >= 400 && +img.width <= 2000 ? resolve() : reject('图片尺寸不符合规范')
          } else {
            reject('图片比例不符合规范')
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, error => {
        setTimeout(() => {
          this.$emit('loading', false)
        }, 600)
        this.$message.error(error)
        return Promise.reject()
      })
      return (isJPG || isPNG) && isLt2M && isSize
    }
  }
}
</script>

<style lang="scss" >
  .el-upload-list__item {
    transition: none !important;
  }
  .hideUpload .el-upload--picture-card {
    display: none !important;
  }
</style>
