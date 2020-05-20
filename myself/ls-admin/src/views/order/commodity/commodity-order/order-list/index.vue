<template>
  <div class="container" v-loading="loading">
    <order-query @query="query" @reset="reset" :info.sync="info" @exportQuery="exportQuery"/>
    <order-list :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" />
  </div>
</template>

<script>
import orderList from './list.vue'
import orderQuery from './query.vue'
import { formatBackendTime } from '@/filters'
import { blobExportData } from '@/utils/index'
export default {
  components: {
    orderList,
    orderQuery
  },
  computed: {
    loading () {
      return this.$store.getters.commodityLoading
    }
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      filter: {},
      seachData: {},
      info: {
        name: '',
        commodityId: '',
        orderNo: '',
        mobile: '',
        userId: '',
        status: '',
        payStartTime: '',
        payEndTime: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.commodityOrderQueryData
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
      this.$store.dispatch('commodity/setCommodityOrderQueryData', data)
      this.fetchList(data)
    },
    fetchList (data) {
      this.$store.dispatch('commodity/setLoadingData', true)
      this.$api.commodityOrder.getOrderList(data).then(res => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.list = res.data.list
        this.total = res.data.totalCount
      }).catch(error => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    exportQuery () {
      this.$store.dispatch('commodity/setLoadingData', true)
      let datas = JSON.parse(JSON.stringify(this.info))
      datas.payStartTime = formatBackendTime(datas.payStartTime, '{y}/{m}/{d} {h}:{i}:{s}')
      datas.payEndTime = formatBackendTime(datas.payEndTime, '{y}/{m}/{d} {h}:{i}:{s}')
      delete datas.currPage
      delete datas.pageSize
      Object.keys(datas).forEach(v => {
        if (datas[v] === '') {
          datas[v] = null
        }
      })
      this.$api.commodityOrder.exportOrderData(datas).then(res => {
        this.$store.dispatch('commodity/setLoadingData', false)
        blobExportData(res, '商品订单管理查询导出.xlsx')
      }).catch(error => {
        this.$store.dispatch('commodity/setLoadingData', false)
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
