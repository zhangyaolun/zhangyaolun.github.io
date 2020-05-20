<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" />
  </div>
</template>

<script>
import templateList from './template-list.vue'
import templateQuery from './template-query.vue'
export default {
  components: {
    templateList,
    templateQuery
  },
  computed: {
    loading () {
      return this.$store.getters.appointmentGoodsLoading
    }
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      list: null,
      dataFetched: false,
      total: null,
      id: '',
      filter: {
        commodityCd: '',
      },
      info: {
        shopCode: '',
        shopName: ''
      }
    }
  },
  created () {
    this.filter.commodityCd = this.$route.params.id
    this.fetch()
  },
  methods: {
    query (obj) {
      this.filter = {}
      Object.keys(obj).forEach(key => {
        if (obj[key] !== '') {
          this.filter[key] = obj[key]
        }
      })
      this.listQuery.currPage = 1
      this.fetch()
    },
    reset () {
      this.filter = {}
      this.filter.commodityCd = this.$route.params.id
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
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      this.$api.appointmentGoodsTemplate.getShopList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.totalCount
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .container{
    margin: 20px;
  }
</style>
