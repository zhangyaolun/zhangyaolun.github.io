<template>
  <div class="view-order-system_bundle-order-list" v-loading="loading">
    <bundle-order-query-form @reset="reset" @query="query" :info.sync="info"/>
    <bundle-order-list-table :list="list" :list-query="listQuery" :total="total" @handleApplyBack="handleApplyBack" @fetch="fetch" />
  </div>
</template>

<script>
import bundleOrderQueryForm from './bundle-order-query-form.vue'
import bundleOrderListTable from './bundle-order-list-table.vue'

export default {
  components: {
    bundleOrderQueryForm,
    bundleOrderListTable
  },
  data() {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      total: 0,
      filter: {},
      list: [],
      loading: true,
      info: {
        orderNo: '',
        cbName: '',
        cbId: '',
        orderStatus: '',
        mobile: '',
        userId: '',
        orderPayTimeFrom: '',
        orderPayTimeTo: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.giftOrderQueryData
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
      this.loading = true
      let data = this.listQuery
      if (Object.keys(this.filter).length){
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('giftBundle/setGiftOrderQueryData', data)
      this.$api.orderBundleOrder.index(data).then(res => {
        this.loading = false
        this.list = res.data.list
        this.total = res.data.totalCount
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    handleApplyBack ({ id, orderNo }) {
      this.$api.orderBundleOrder.validateCoupon(id).then(res => {
        this.$confirm(`是否确定为订单【${orderNo}】执行退款？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.applyBack(id)
        })
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    applyBack (val) {
      this.loading = true
      this.$api.orderBundleOrder.applyBack(val).then(res => {
        res.message.indexOf('退款成功') === -1 ? this.$message.error(res.message) : this.$message.success(res.message)
        this.loading = false
        this.fetch()
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    handleOrderBack (val) {
      this.$api.orderBundleOrder.orderBack(val).then(res => {
        this.$message.success('退款成功！')
        this.loading = false
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>
