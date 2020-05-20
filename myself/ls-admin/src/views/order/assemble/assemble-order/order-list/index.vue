<template>
  <div class="container" v-loading="loading">
    <order-query @query="query" @reset="reset" :info.sync="info"/>
    <order-action />
    <order-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @refund="refund" @detail="detail" />
  </div>
</template>

<script>
import orderList from './list.vue'
import orderAction from './action-btn.vue'
import orderQuery from './query.vue'
export default {
  components: {
    orderList,
    orderAction,
    orderQuery
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      loading: true,
      list: [],
      dataFetched: false,
      total: null,
      filter: {},
      seachData: {},
      info: {
        orderNo: '',
        name: '',
        templateId: '',
        orderSubNo: '',
        cbBundleModeId: '',
        mobile: '',
        userId: '',
        orderSubStatus: '',
        payTimeStart: '',
        payTimeEnd: '',
        orderStatus: '',
        regionBlockCode: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.orderAssembleData
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
      this.$store.dispatch('assemble/setorderAssembleData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.loading = true
      this.$api.assembleOrder.getOrderList(data).then(res => {
        this.dataFetched = true
        this.loading = false
        this.list = res.data.list
        this.total = res.data.totalCount
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    detail ({ orderSubId }) {
      this.$router.push({ path: '/backend/assemble/orderdetail/' + orderSubId })
    },
    refund ({ orderSubId, orderSubNo }) {
      this.$confirm(`是否确定为订单【${orderSubNo}】执行退款？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doRefund(orderSubId)
      }).catch(error => {})
    },
    doRefund (orderSubId) {
      this.loading = true
      this.$api.assembleOrder.refundToAdmin(orderSubId).then(res => {
        let _res = res.data
        if (_res.requestSuccess) {
          this.$message.success(_res.message)
        } else {
          this.$message.error(_res.message)
        }
        this.fetch()
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
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
