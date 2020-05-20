<template>
  <div class="coupon-container" v-loading="loading">
    <coupon-query @query="query" @reset="reset" :info.sync="info" :loading.sync="loading"/>
    <coupon-action />
    <coupon-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" />
  </div>
</template>

<script>
import CouponList from './list.vue'
import CouponAction from './action-btn.vue'
import CouponQuery from './query.vue'
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
        pageSize: 10
      },
      loading: false,
      list: [],
      dataFetched: true,
      total: 0,
      filter: {},
      info: {
        couponId: '',
        userCouponStatus: '',
        type: 0,
        mobile: '',
        Barcode: '',
        useDateStart: '',
        useDateEnd: '',
        useShopId: '',
        userId: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.couponQueryData
    if (_filter) {
      this.filter = Object.assign({}, _filter)
      Object.keys(_filter).forEach(key => {
        if (_filter[key] != '') {
          this.info[key] = _filter[key]
          key === 'page' ? this.listQuery.page = _filter[key] : ''
          key === 'pageSize' ? this.listQuery.pageSize = _filter[key] : ''
        }
      })
      this.fetch()
    }
  },
  methods: {
    query (obj) {
      this.filter = {}
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
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length) {
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('couponSearch/setQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.loading = true
      this.$api.promotionCouponSearch.getUserCoupon(data).then(res => {
        this.loading = false
        this.list = res.data.list
        this.total = res.data.meta.totalNum
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
