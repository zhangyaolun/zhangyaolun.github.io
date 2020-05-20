<template>
  <div class="container" v-loading="loading">
    <order-query @query="query" @reset="reset" :info.sync="info" @exportQuery="exportQuery"/>
    <order-list :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @itemDialog="itemDialog" />
    <order-dialog v-if="orderDialogFalg" :orderDialogFalg.sync="orderDialogFalg" :info="orderItemData" @deterMineClick="doRefund"></order-dialog>
  </div>
</template>

<script>
import orderList from './list.vue'
import orderQuery from './query.vue'
import orderDialog from './refund-dialog.vue'
import { formatBackendTime } from '@/filters'
import { blobExportData } from '@/utils/index'
export default {
  components: {
    orderList,
    orderQuery,
    orderDialog
  },
  computed: {
    loading () {
      return this.$store.getters.appointmentGoodsLoading
    }
  },
  data () {
    return {
      orderDialogFalg: false,
      orderItemData: {}, // 退款/取消数据
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      filter: {},
      seachData: {},
      info: {
        barcode: '',
        mobile: '',
        userId: '',
        commodityName: '',
        commodityCd: '',
        orderStatus: '',
        shopName: '',
        shopId: '',
        afterSaleStatus: '',
        payedTimeStart: '',
        payedTimeEnd: '',
        takeTimeStart: '',
        takeTimeEnd: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.appointmentGoodsOrderQueryData
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
    query (obj) {
      this.filter = {}
      Object.keys(obj).forEach(key => {
        if (obj[key] !== '' && key !== 'sendType') {
          this.filter[key] = obj[key]
        }
      })
      this.listQuery.currPage = 1
      this.fetch()
    },
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
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length) {
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('appointmentGoods/setAppointmentGoodsOrderQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      this.$api.appointmentGoodsOrder.getList(data).then(res => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.list = res.data.list
        this.list.forEach(v => {
          v.subTotalQty = 0
          v.subOrderList.forEach(i => {
            v.subTotalQty += i.qty
          })
        })
        this.total = res.data.totalCount
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    itemDialog (data) {
      this.orderItemData = Object.assign({}, data)
      this.orderDialogFalg = true
    },
    doRefund () {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      this.orderDialogFalg = false
      if (this.orderItemData.orderStatus === 'HAS_PAYED' && this.orderItemData.afterSaleStatus === 'WAITING_PICK') {
        this.$api.appointmentGoodsOrder.applyRefundForCancel({ orderId: this.orderItemData.id }).then(res => {
          this.$message.success('取消成功')
          this.fetch()
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
        }).catch(error => {
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
          this.$message.error(error.message)
        })
      } else {
        this.$api.appointmentGoodsOrder.applyRefund({ orderId: this.orderItemData.id }).then(res => {
          this.$message.success('退款成功')
          this.fetch()
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
        }).catch(error => {
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
          this.$message.error(error.message)
        })
      }
    },
    exportQuery (data) {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      let datas = JSON.parse(JSON.stringify(data))
      datas.regionBlockCode = this.$store.getters.regionBlockCode
      datas.payedTimeStart = formatBackendTime(datas.payedTimeStart, '{y}/{m}/{d} {h}:{i}:{s}')
      datas.payedTimeEnd = formatBackendTime(datas.payedTimeEnd, '{y}/{m}/{d} {h}:{i}:{s}')
      datas.takeTimeStart = datas.takeTimeStart ? formatBackendTime(datas.takeTimeStart, '{y}/{m}/{d} {h}:{i}:{s}') : ''
      datas.takeTimeEnd = datas.takeTimeEnd ? formatBackendTime(datas.takeTimeEnd, '{y}/{m}/{d} {h}:{i}:{s}') : ''
      delete datas.currPage
      delete datas.pageSize
      Object.keys(datas).forEach(v => {
        if (datas[v] === '') {
          datas[v] = null
        }
      })
      this.$api.appointmentGoodsOrder.exportOrderData(datas).then(res => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        blobExportData(res, '预购订单管理查询导出.xlsx')
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
}
</style>
