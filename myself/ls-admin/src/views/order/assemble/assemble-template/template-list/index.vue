<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action />
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
  computed: {
    loading () {
      return this.$store.getters.assembleLoading
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
      filter: {},
      info: {
        id: '',
        name: '',
        regionBlockCode: '',
        status: '',
        beginTime: '',
        endTime: ''
      }
    }
  },
  created () {
    let _regionBlockCode = this.$store.getters.regionBlockCode
    _regionBlockCode === 'default' ? this.info.regionBlockCode = 'sh-lawson' : this.info.regionBlockCode = _regionBlockCode
    let _filter = this.$store.getters.assembleSeachData
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
        if (obj[key] !== '') {
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
      data.regionBlockCode = this.info.regionBlockCode
      this.$store.dispatch('assemble/setAssembleData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('assemble/setLoadingData', true)
      this.$api.assemble.getList(data).then(res => {
        this.dataFetched = true
        this.$store.dispatch('assemble/setLoadingData', false)
        this.list = res.data.list
        if (this.list.length > 0) {
          this.list.forEach(v => {
            v.oldSort = v.sort
          })
        }
        this.total = res.data.totalCount
      }).catch(error => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod (val) {
      this.$router.push({ path: '/backend/assemble/templatemod/' + val.id })
    },
    updateConfirm (data) {
      this.$confirm(`是否确定${data.title}拼团活动【${data.name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(data)
      }).catch(error => {})
    },
    update (data) {
      this.$store.dispatch('assemble/setLoadingData', true)
      if (data.sort === '') {
        this.$set(this.list[data.index], 'sort', this.list[data.index].oldSort)
        this.$store.dispatch('assemble/setLoadingData', false)
      } else {
        if (data.status === 'ALREADYEND') {
          this.$api.assemble.endGroup(data.id).then(res => {
            this.$store.dispatch('assemble/setLoadingData', false)
            this.$message.success('修改成功！')
            this.fetch()
          }).catch(error => {
            this.$store.dispatch('assemble/setLoadingData', false)
            this.$message.error(error.message)
          })
        } else {
          this.$api.assemble.update(data).then(res => {
            this.$store.dispatch('assemble/setLoadingData', false)
            this.$message.success('修改成功！')
            this.fetch()
          }).catch(error => {
            this.$store.dispatch('assemble/setLoadingData', false)
            this.$message.error(error.message)
          })
        }
      }
    },
    dimensionalBarcode ({ id }) {
      this.$router.push({ path: '/backend/dimensionalBarcode/templateCreate', query: { type: 'teamBuyingActivityDetail', activityId: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;

}
</style>
