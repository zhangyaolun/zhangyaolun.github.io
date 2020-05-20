<template>
  <el-dialog class="blackList-dialog" :title="title" :visible.sync="dialogFormVisible" @close="close('infoForm')">
    <el-form :model="info" label-width="100px" ref="infoForm">
      <el-form-item label="拉黑原因：" prop="remark" style="width: 70%">
        <el-input type="textarea" v-model="info.remark" placeholder="请输入拉黑原因" autocomplete="off" maxlength="50" :autosize="{ minRows: 6, maxRows: 40}"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle('infoForm')">取 消</el-button>
      <el-button type="primary" @click="comfirm('infoForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      title: '备注',
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    close (formName) {
      this.$emit('update:visible', false)
      this.$refs[formName].clearValidate()
    },
    cancle (formName) {
      this.$emit('update:visible', false)
      this.$refs[formName].clearValidate()
    },
    comfirm (formName) {
      this.$emit('comfirm')
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$emit('comfirm')
      //   } else {
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.blackList-dialog {

}
</style>
