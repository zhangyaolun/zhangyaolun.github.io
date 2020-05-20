<template>
  <el-dialog class="sceneMarket-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('infoForm')">
    <customer-table :type="'original'"></customer-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('infoForm')">取 消</el-button>
      <el-button type="primary" @click="comfirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import customerTable from './customer-table'

export default {
  components: {
    customerTable
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      title: '选择人群'
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
      this.$emit('cancle')
    },
    cancle () {
      this.$emit('update:visible', false)
    },
    comfirm () {
      this.$emit('update:visible', false)
      this.$emit('comfirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.sceneMarket-dialog {

}
</style>
