<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info" :createUserOptions="createUserOptions"/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @logdetail="logdetail"/>
  </div>
</template>

<script>
import templateList from './list.vue'
import templateQuery from './query.vue'

export default {
  components: {
    templateList,
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
        type: '',
        startTime: '',
        endTime: '',
        createUser: ''
      },
      createUserOptions: [
        { label: '全部', value: '' }
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.specialActivityLoading
    }
  },
  async created () {
    await this.adminUser()
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
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.$api.specialActivity.getSpecialActivityAdminLog(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.meta.totalNum
        this.$store.dispatch('specialActivity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    adminUser () {
      return new Promise(resolve => {
        this.$store.dispatch('specialActivity/setLoadingData', true)
        this.$api.adminUser.index({ page: 1, pageSize: 1000 }).then(res => {
          this.createUserOptions = [{ label: '全部', value: '' }]
          res.data.list.forEach(v => {
            this.createUserOptions.push({ label: `${v.trueName}(${v.userName})`, value: v.userName })
          })
          resolve()
        }).catch(error => {
          this.$store.dispatch('specialActivity/setLoadingData', false)
          this.$message.error(error.message)
        })
      })
    },
    logdetail (row) {
      this.$router.push({ path: `/backend/specialActivity/logdetail/${row.id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
}
</style>
