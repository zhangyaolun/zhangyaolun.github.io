<template>
  <el-upload
    class="upload-image"
    :action="uploadUrl()"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
  >
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    uploadUrl () {
      return `${BASE_URL}/modules/web/common/upload`;
    },
    handleSuccess (res) {
      this.$emit('input', res.data)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024  < 500
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss">
.upload-image {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
   .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>
