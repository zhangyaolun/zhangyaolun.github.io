<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action @openFlg="openFlgClick"/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @handleSelectionChange="handleSelectionChange"/>
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
      bannerIds: [],
      list: null,
      dataFetched: false,
      total: null,
      filter: {},
      info: {
        id: '',
        title: '',
        displayType: '',
        redirectType: 3,
        userFlg: 3,
        bannerType: 2,
        openFlg: 2,
        beginTime: '',
        endTime: '',
        openBeginDtStr: '',
        openEndDtStr: '',
        regionBlockCode: 'PLT',
        sort: 'desc',
        sortBy: 'createDate'
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.pltadminBannerLoading
    }
  },
  created () {
    this.$store.dispatch('pltadminBanner/setLoadingData', true)
    this.$api.pltadminBanner.initSelectData({ apType: 0, locationFlg: 0 }).then(res => {
      this.displayTypeOptions = []
      this.displayTypeOptions = res.data
      let sizeAttr = []
      this.displayTypeOptions.forEach(v => {
        sizeAttr = v.displayName.substring(+v.displayName.indexOf('(') + 1, v.displayName.length - 1).split(',')
        v.isSizeNum = /[0-9]/.test(sizeAttr[0].substring(0, 1))
        if (v.isSizeNum) {
          v.sizeList = sizeAttr
        } else {
          let obj = {}
          sizeAttr.forEach(m => {
            obj[m.substring(0, 1)] = m.substring(1, m.length)
          })
          v.sizeList = obj
        }
      })
      this.displayTypeOptions.unshift({ displayType: '', displayName: '全部' })
      this.$store.dispatch('pltadminBanner/setDisplayTypeList', this.displayTypeOptions)
    }).catch(error => {})
    let _filter = this.$store.getters.pltadminBannerTemplateQueryData
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
    this.query(this.info)
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
      this.query(this.info)
    },
    fetch () {
      let data = this.listQuery
      if (Object.keys(this.filter).length) {
        data = Object.assign({}, this.filter, data)
      }
      this.$store.dispatch('pltadminBanner/setPltadminBannerTemplateQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('pltadminBanner/setLoadingData', true)
      this.$api.pltadminBanner.getBannerList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.meta.totalNum
        this.$store.dispatch('pltadminBanner/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('pltadminBanner/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod (val) {
      this.$router.push({ path: '/backend/pltadminBanner/templatemod/' + val.id, query: { publishFlg: val.publishFlg } })
    },
    handleSelectionChange (val) {
      this.bannerIds = val
    },
    openFlgClick () {
      if (this.bannerIds.length === 0) {
        this.$message.error('请选择要公开的广告')
      } else {
        this.$confirm(`确定公开这批广告吗？`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.update()
        }).catch(error => {})
      }
    },
    update () {
      this.$store.dispatch('pltadminBanner/setLoadingData', true)
      let _bannerIds = []
      this.bannerIds.forEach(v => {
        _bannerIds.push(v.id)
      })
      this.$api.pltadminBanner.batchOpenBanner({ bannerIds: _bannerIds }).then(res => {
        this.$message.success('公开成功！')
        this.$store.dispatch('pltadminBanner/setLoadingData', false)
        this.query(this.info)
      }).catch(error => {
        this.$store.dispatch('pltadminBanner/setLoadingData', false)
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
