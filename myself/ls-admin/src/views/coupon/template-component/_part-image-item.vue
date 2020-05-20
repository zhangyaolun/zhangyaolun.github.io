<template>
  <div class="image-item">
    <el-image :src="url" fit="cover" @click="enlarge" />
    <i class="el-icon-delete" @click="$emit('del')" />
    <el-dialog class="dialog-modal" title="查看图片" :visible.sync="dialogImageVisible">
      <img :src="url" alt="图片">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialogImageVisible: false
    }
  },
  methods: {
    enlarge () {
      this.dialogImageVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.image-item{
  width: 100px;
  height: 100px;
  position: relative;
  border: 1px solid #eeeeee;
  margin-right: 8px;
  margin-bottom: 8px;
  i{
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .dialog-modal{
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>


