<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible=true">
      媒体库
    </el-button>
    <media-modal :visible.sync="dialogVisible" @comfirm="comfirmSelectedImages" @cancle="cancle" />
  </div>
</template>

<script>
import MediaModal from '@/components/admin-media-modal'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  components: {
    MediaModal
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    cancle () {
      this.dialogVisible = false
    },
    // val 是一个数组 里面放的是media_id
    comfirmSelectedImages (val) {
      this.dialogVisible = false
      this.$emit('successCBK', val[0].url)
    }
  }
}
</script>

<style lang="scss">
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
