<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="infoQuery"/>
    <template-action />
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @updateConfirm="updateConfirm" @update="update" @mod="mod" />
  </div>
</template>

<script>
import templateList from './list.vue'
import templateAction from './action-btn.vue'
import templateQuery from './query.vue'
import { templateMixin } from "../template-component/mixin.js"
export default {
  mixins: [templateMixin],
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
      infoQuery: {
        name: '',
        customerSegmentId: '',
        status: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.sceneMarketLoading
    },
    info () {
      return this.$store.getters.sceneMarketInfo
    }
  },
  async created () {
    this.$store.dispatch('sceneMarket/setLoadingData', true)
    await this.getCustomer()
    let _filter = this.$store.getters.sceneMarketQueryData
    if (_filter) {
      this.filter = Object.assign({}, _filter)
      Object.keys(_filter).forEach(key => {
        if (_filter[key] !== '') {
          this.infoQuery[key] = _filter[key]
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
      Object.keys(this.infoQuery).forEach(key => {
        if (key !== 'page' && key !== 'pageSize') {
          this.infoQuery[key] = ''
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
      this.$api.sceneMarket.getList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.meta.totalNum
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod ({ id, type }) {
      let path = type === 'CUSTOMER_SEGMENT_MARKETING' ? 'secneMod' : 'timingMod'
      this.$router.push({ path: `/backend/sceneMarket/${path}/${id}` })
    },
    updateConfirm (data) {
      this.$confirm(`是否${data.title}场景营销模板【${data.name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(data)
      }).catch(error => {})
    },
    update (data) {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.sceneMarket.statusMod({ id: data.id, status: data.status }).then(res => {
        this.$message.success('修改成功！')
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.fetch()
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
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
