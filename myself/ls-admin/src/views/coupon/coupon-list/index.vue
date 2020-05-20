<template>
  <div class="coupon-container" v-loading="loading">
    <coupon-query @query="query" @reset="reset" :info.sync="info"/>
    <coupon-action />
    <coupon-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @del="del" @copymod="copyMod" @mod="mod" />
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
      loading: true,
      list: null,
      dataFetched: false,
      total: null,
      filter: {},
      info: {
        id: '',
        projectNo: '',
        sendType: [],
        sendTypeStr: '',
        name: '',
        status: '',
        type: '',
        subsidyFlg: '',
        useDateFromStr: '',
        useDateToStr: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.couponSeachData
    if (_filter) {
      this.filter = Object.assign({}, _filter)
      Object.keys(_filter).forEach(key => {
        if (_filter[key] !== '') {
          this.info[key] = _filter[key]
          if (key == 'sendTypeStr' && _filter.sendTypeStr != '' && _filter.sendTypeStr != null) {
            this.$set(this.info, 'sendType', _filter.sendTypeStr.split(','))
          }
          key === 'page' ? this.listQuery.page = _filter[key] : ''
          key === 'pageSize' ? this.listQuery.pageSize = _filter[key] : ''
        }
      })
    }
    this.fetch()
  },
  methods: {
    query (obj) {
      this.filter = {}
      obj.sendTypeStr = obj.sendType.join()
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
      this.$store.dispatch('coupon/setSeachData', data)
      this.fetchCouponList(data)
    },
    del ({ id }) {
      this.$confirm('确定删除此优惠券吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel(id)
      }).catch(error => {})
    },
    doDel (id) {
      this.$api.promotionCoupon.delete({
        id: id
      }).then(res => {
        this.$message.success('删除成功')
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    mod ({ id }) {
      this.$confirm('确定公开？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doMod(id)
      })
    },
    doMod (id) {
      this.$api.promotionCoupon.updateStatus({
        id: id,
        status: 'PUBLISHED'
      }).then(res => {
        this.$message.success('操作成功')
        this.fetch()
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    fetchCouponList (data) {
      this.loading = true
      this.$api.promotionCoupon.index(data).then(res => {
        this.dataFetched = true
        this.loading = false
        this.list = res.data.list
        this.total = res.data.meta.totalNum
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    copyMod (val) {
      this.$store.dispatch('coupon/setCouponData', '')
      if (val.type === 1) {
        this.$router.push({ path: '/backend/coupon/copy/' + val.id })
      } else {
        this.$router.push({ path: '/backend/coupon/mod/' + val.id })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-container{
  margin: 20px;
}
</style>
