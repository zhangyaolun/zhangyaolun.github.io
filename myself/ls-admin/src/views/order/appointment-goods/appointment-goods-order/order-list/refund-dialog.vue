<template>
  <el-dialog class="appointmentGoods-dialog" :title="title" :visible="orderDialogFalg" @close="$emit('update:orderDialogFalg', false)">
    <div class="appointmentGoods-dialog-description">确认操作后将作废用户兑换券，并退款，该操作不可逆！</div>
    <el-form :model="info" label-width="100px">
      <el-row>
        <el-col>
          <el-form-item label="订单编号：" prop="orderNo">
            <span>{{info.orderNo}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="userID：" prop="userId">
            <span>{{info.userId}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号：" prop="mobile">
            <span>{{info.mobile}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="提货门店：" prop="shopName">
            <span v-if="info.shop">{{info.shop.shopName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提货日期：" prop="takeDate">
            <span>{{info.takeDate | formatBackendTime('{y}/{m}/{d}')}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('deterMineClick')">确 定</el-button>
      <el-button @click="$emit('update:orderDialogFalg', false)">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    orderDialogFalg: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      let titleName = this.info.orderSubStatus === 'SETTLED' ? '退款' : '退单'
      return `确认要${titleName}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .appointmentGoods-dialog {
    .appointmentGoods-dialog-description{
      position: relative;
      text-align: center;
      margin-bottom: 20px;
      font-size: 15px;
      font-weight: 700;
      color: #606266;
    }
    .appointmentGoods-dialog-description::after{
      content: '';
      position: absolute;
      bottom: -15px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background: rgb(230,230,230);
      width: 220px;
      height: 1px;
    }
    .el-form-item{
      margin-bottom: 0 !important;
    }
  }
</style>
