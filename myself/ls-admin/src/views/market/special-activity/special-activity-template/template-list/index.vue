<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @updateConfirm="updateConfirm" @update="update" @mod="mod" @dimensionalBarcode="dimensionalBarcode"/>
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
        activityKey: '',
        beginTime: '',
        endTime: '',
        activityUnicom: 4,
        activityType: 3,
        couponSendType: 2,
        userType: 3,
        prohibitFlg: 4,
        publishFlg: 2
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.specialActivityLoading
    }
  },
  created () {
    this.$store.dispatch('specialActivity/setLoadingData', true)
    let _filter = this.$store.getters.specialActivityTemplateQueryData
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
      this.listQuery.page = 1
      this.listQuery.pageSize = 10
      this.fetch()
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length) {
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('specialActivity/setSpecialActivityTemplateQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.$api.specialActivity.getList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.meta.totalNum
        this.$store.dispatch('specialActivity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod (val) {
      this.$router.push({ path: '/backend/specialActivity/templatemod/' + val.id, query: { publishFlg: val.publishFlg } })
    },
    updateConfirm (data) {
      this.$confirm(`是否${data.title}外部投放活动【${data.name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(data)
      }).catch(error => {})
    },
    update (data) {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.$api.specialActivity.delList(data.id).then(res => {
        this.$message.success('删除成功！')
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.fetch()
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    dimensionalBarcode ({ id }) {
      this.$router.push({ path: '/backend/dimensionalBarcode/templateCreate', query: { type: 'pickCouponActivityDetail', pickCouponActivityId: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
}
</style>
