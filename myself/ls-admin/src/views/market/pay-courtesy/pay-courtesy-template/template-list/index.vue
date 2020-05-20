<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action />
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @updateFun="updateFun" @update="update" @mod="mod" />
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
      loading: false,
      list: null,
      dataFetched: false,
      total: null,
      filter: {},
      info: {
        id: '',
        activityName: '',
        activityStatus: '',
        beginTime: '',
        endTime: ''
      }
    }
  },
  created () {
    let _filter = this.$store.getters.payCourtesyQueryData
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
      this.$store.dispatch('payCourtesy/setPayCourtesyQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.loading = true
      this.$api.payCourtesy.getList(data).then(res => {
        this.dataFetched = true
        this.loading = false
        this.list = res.data.list
        this.total = res.data.meta.totalNum
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    mod (val) {
      this.$router.push({ path: '/backend/payCourtesyTemplate/templatemod/' + val.id })
    },
    updateFun (data) {
      this.$confirm(`是否${data.title}支付有礼活动【${data.name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(data)
      }).catch(error => {})
    },
    update (data) {
      this.loading = true
      if (data.title === '公开') {
        this.$api.payCourtesy.updateStatus(data).then(res => {
          this.loading = false
          this.$message.success('公开成功！')
          this.fetch()
        }).catch(error => {
          this.loading = false
          this.$message.error(error.message)
        })
      } else if (data.title === '终止') {
        this.$api.payCourtesy.terminate(data.id).then(res => {
          this.loading = false
          this.$message.success('终止成功！')
          this.fetch()
        }).catch(error => {
          this.loading = false
          this.$message.error(error.message)
        })
      } else if (data.title === '同步') {
        this.$api.payCourtesy.wechat(data.id).then(res => {
          this.loading = false
          this.$message.success('同步成功！')
          this.fetch()
        }).catch(error => {
          this.loading = false
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
