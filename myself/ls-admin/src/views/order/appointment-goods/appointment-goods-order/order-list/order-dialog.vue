<template>
  <el-dialog class="appointmentGoods-order-dialog" :title="title" :visible="dialogFormVisible" @close="$emit('update:visible', false)">
    <order-table :table="table"></order-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:visible', false)">确 定</el-button>
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import orderTable from './order-table'
export default {
  components: {
    orderTable
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    table: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      title: '子订单'
    }
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = val
    }
  }
}
</script>
