<template>
  <section>
    <div class="v-modal" v-if="visible" style="z-index: 2010" @click="$emit('update:visible',false)"></div>
    <div class="item_images" style="" v-if="visible">
      <div class="dialog">
        <div class="el-dialog__header">
          <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="$emit('update:visible',false)">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body">
          <img width="100%" :src="url" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ViewPicture',
  props: {
    url: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>

  .item_images {
    position: fixed;
    width: 100%;
    z-index: 2050;
    left: 0;
    top: 50%;
    margin-top: -25%;
    .dialog {
      position: relative;
      margin: 0 auto;
      background: #FFFFFF;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 50%;
      .el-dialog__header {
        .el-dialog__headerbtn {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 0;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .el-dialog__body {
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
      }
    }
  }
</style>
