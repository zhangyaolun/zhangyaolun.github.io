<template>
  <div class="coupon-container" v-loading="loading">
    <coupon-query @query="query" @reset="reset" :info.sync="info" :loading.sync="loading"/>
    <coupon-action />
    <coupon-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @getTempUrl="getTempUrl"/>
  </div>
</template>

<script>
import CouponList from './list.vue'
import CouponAction from './action-btn.vue'
import CouponQuery from './query.vue'
import { formatBackendTime } from '@/filters'
export default {
  components: {
    CouponList,
    CouponAction,
    CouponQuery
  },
  data () {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      list: [],
      dataFetched: true,
      total: 0,
      filter: {},
      seachData: {},
      info: {
        reportDate: ''
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    query (obj) {
      this.filter = {}
      this.seachData = {}
      Object.keys(obj).forEach(key => {
        if (obj[key] !== '' && key !== 'sendType' && obj[key] !== null) {
          this.filter[key] = obj[key]
        }
      })
      this.listQuery.page = 1
      this.fetch()
    },
    reset () {
      this.filter = {}
      this.seachData = {}
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    fetch () {
      if (this.filter) {
        Object.keys(this.filter).forEach(key => {
          this.seachData[key] = this.filter[key]
        })
      }
      this.seachData.currPage = this.listQuery.page
      this.seachData.pageSize = this.listQuery.limit
      this.fetchCouponList()
    },
    fetchCouponList () {
      this.loading = true
      this.seachData.reportDate = formatBackendTime(this.seachData.reportDate, '{y}{m}')
      this.$api.payAsMember.getPurchaseList(this.seachData).then(res => {
        this.loading = false
        this.list = res.data.list
        this.total = res.data.totalCount
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    getTempUrl ({ id }) {
      this.loading = true
      this.$api.payAsMember.getTempUrl(id).then(res => {
        this.loading = false
        window.location.href = res.data
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-container{
  margin: 20px;
}
</style>
