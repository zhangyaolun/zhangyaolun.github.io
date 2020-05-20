<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action />
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @updateConfirm="updateConfirm" @update="update" @mod="mod" />
  </div>
</template>

<script>
import templateList from './list.vue'
import templateAction from './action-btn.vue'
import templateQuery from './query.vue'
export default {
  components: {
    templateList,
    templateAction,
    templateQuery
  },
  data () {
    return {
      listQuery: {
        page: 1,
        pageSize: 10
      },
      list: null,
      dataFetched: false,
      total: null,
      filter: {},
      info: {
        name: '',
        dayType: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.sceneMarketLoading
    }
  },
  created () {
    this.$store.dispatch('sceneMarket/setLoadingData', true)
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
      this.listQuery.page = 1
      this.fetch()
    },
    reset () {
      this.filter = {}
      Object.keys(this.info).forEach(key => {
        if (key !== 'page' && key !== 'pageSize') {
          this.info[key] = ''
        }
      })
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length) {
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('sceneMarket/setSceneMarketQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.specialActivity.getList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.list.forEach(v => {
          v.rangeList = [{ name: '未注册潜在客户' }, { name: '已注册潜在客户' }]
        })
        this.total = res.data.meta.totalNum
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod (val) {
      this.$router.push({ path: '/backend/sceneMarket/secneMod/' + val.id })
    },
    updateConfirm (data) {
      this.$confirm(`是否${data.title}商家券模板【${data.name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(data)
      }).catch(error => {})
    },
    update (data) {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      if (data.openStatus === 'PUBLISHED') { // 公开
        this.$api.merchantCouponTemplate.updateStatus(data).then(res => {
          this.$message.success('公开成功！')
          this.$store.dispatch('sceneMarket/setLoadingData', false)
          this.fetch()
        }).catch(error => {
          this.$store.dispatch('sceneMarket/setLoadingData', false)
          this.$message.error(error.message)
        })
      } else {
        this.$api.merchantCouponTemplate.wechat(data.id).then(res => {
          this.$message.success('同步成功！')
          this.$store.dispatch('sceneMarket/setLoadingData', false)
          this.fetch()
        }).catch(error => {
          this.$store.dispatch('sceneMarket/setLoadingData', false)
          this.$message.error(error.message)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
}
</style>
