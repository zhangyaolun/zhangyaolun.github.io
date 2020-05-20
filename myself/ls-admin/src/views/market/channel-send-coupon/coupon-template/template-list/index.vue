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
        id: '',
        activityName: '',
        activityKey: '',
        type: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.channelSendCouponTemplateLoading
    }
  },
  created () {
    this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
    let _filter = this.$store.getters.channelSendCouponTemplateQueryData
    if (_filter) {
      this.filter = Object.assign({}, _filter)
      Object.keys(_filter).forEach(key => {
        if (_filter[key] !== '') {
          this.info[key] = _filter[key]
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
        if (obj[key] !== '' && obj[key] !== null) {
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
      this.$store.dispatch('channelSendCouponTemplate/setTemplateQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
      this.$api.channelSendCouponTemplate.getList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.meta.totalNum
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod (val) {
      this.$router.push({ path: '/backend/channelSendCoupon/templatemod/' + val.id })
    },
    updateConfirm (data) {
      this.$confirm(`是否${data.title}活动【${data.name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(data)
      }).catch(error => {})
    },
    update (data) {
      this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
      this.$api.channelSendCouponTemplate.updateActivityStatus(data).then(res => {
        this.$message.success(`${data.title}成功！`)
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
        this.fetch()
      }).catch(error => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
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
