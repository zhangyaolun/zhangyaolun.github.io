<template>
  <div class="image-item">
    <el-image :src="url" fit="cover" />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
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
