<template>
  <div class="view-order-system_reserve-purchase-list" v-loading="loading">
    <reserve-purchase-query-form @reset="reset" @query="query" :info.sync="info"/>
    <reserve-purchase-list-table :list="list" :list-query="listQuery" :total="total" @handleApplyRefund="handleApplyRefund" @handleImmediatelyRefund="handleImmediatelyRefund" @fetch="fetch" />
    <refund-reason-dialog :visible.sync="refundDialogVisible" @comfirm="handleComfirmRefund" @cancle="handleCancleRefund" />
  </div>
</template>

<script>
import reservePurchaseQueryForm from './reserve-purchase-query-form.vue'
import reservePurchaseListTable from './reserve-purchase-list-table.vue'
import refundReasonDialog from './refund-reason-dialog.vue'

export default {
  components: {
    reservePurchaseQueryForm,
    reservePurchaseListTable,
    refundReasonDialog
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      orderId: '',
      total: 0,
      filter: {},
      list: [],
      loading: true,
      refundDialogVisible: false,
      info: {
        orderNo: '',
        commodityName: '',
        commodityId: '',
        userId: '',
        mobile: '',
        status: '',
        payedTimeStart: '',
        payedTimeEnd: '',
        takeTimeStart: '',
        takeTimeEnd: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.reservePurchaseQueryData
    if (_filter) {
      this.filter = Object.assign({}, _filter)
      Object.keys(_filter).forEach(key => {
        if (_filter[key] !== '') {
          this.info[key] = _filter[key]
          key === 'currPage' ? this.listQuery.currPage = _filter[key] : ''
          key === 'pageSize' ? this.listQuery.pageSize = _filter[key] : ''
        }
      })
    }
    this.fetch()
  },
  methods: {
    reset () {
      this.filter = {}
      Object.keys(this.info).forEach(key => {
        if (key !== 'currPage' && key !== 'pageSize') {
          this.info[key] = ''
        }
      })
      this.listQuery.currPage = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    query (data) {
      this.filter = {}
      Object.keys(data).forEach(key => {
        if (data[key] !== '') {
          this.filter[key] = data[key]
        }
      })
      this.listQuery.currPage = 1
      this.fetch()
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length) {
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('reservePurchase/setReservePurchaseQueryData', data)
      this.$api.orderReservePurchase.index(data).then(res => {
        this.loading = false
        this.list = res.data.list
        this.total = res.data.totalCount
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    handleApplyRefund (val) {
      this.refundDialogVisible = true
      this.orderId = val
    },
    handleComfirmRefund (val) {
      let data = val
      data.orderId = this.orderId
      this.refundDialogVisible = false
      this.$api.orderReservePurchase.applyRefund(data).then(res => {
        this.loading = true
        this.fetch()
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    handleImmediatelyRefund (val) {
      this.$api.orderReservePurchase.immediatelyRefund(val).then(res => {
        this.$message.success('退款成功！')
        this.loading = true
        this.fetch()
      })
    },
    handleCancleRefund () {
      this.refundDialogVisible = false
    }
  }
}
</script>
