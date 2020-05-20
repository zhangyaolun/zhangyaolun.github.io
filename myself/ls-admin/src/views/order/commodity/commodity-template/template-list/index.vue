<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @updateConfirm="updateConfirm" @mod="mod" />
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
        currPage: 1,
        pageSize: 10
      },
      list: null,
      dataFetched: false,
      total: null,
      filter: {},
      info: {
        name: '',
        id: '',
        status: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.commodityLoading
    }
  },
  created () {
    this.$store.dispatch('commodity/setLoadingData', true)
    let _filter = this.$store.getters.commodityQueryData
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
      this.$store.dispatch('commodity/setCommodityOrderQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('commodity/setLoadingData', true)
      this.$api.commodityTemplate.getList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.totalCount
        this.$store.dispatch('commodity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod ({ id, status, name }) {
      if (status === 'ONSALE') {
        this.$confirm(`编辑前请先下架该商品【${name}】？`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        }).catch(error => {})
      } else {
        this.$router.push({ path: '/backend/commodity/templatemod/' + id })
      }
    },
    updateConfirm ({ name, id }, val) {
      let titleStatus = {
        '上架': 'ONSALE',
        '下架': 'OFFSALE',
        '废弃': 'DELETED'
      }
      this.$confirm(`是否确定${val.title}商品【${name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateProductStatus(id, titleStatus[val.title])
      }).catch(error => {})
    },
    updateProductStatus (id, titleStatus) {
      this.$store.dispatch('commodity/setLoadingData', true)
      let titleObj = {
        'ONSALE': '上架',
        'OFFSALE': '下架',
        'DELETED': '废弃'
      }
      this.$api.commodityTemplate.updateProductStatus({ id: id, status: titleStatus }).then(res => {
        this.$message.success(`${titleObj[titleStatus]}成功！`)
        this.$store.dispatch('commodity/setLoadingData', false)
        this.fetch()
      }).catch(error => {
        this.$store.dispatch('commodity/setLoadingData', false)
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
