<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action @createClick="createDialogFalg = true"/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" @updateConfirm="updateConfirm" @update="update" @mod="mod" @dimensionalBarcode="dimensionalBarcode"/>
    <create-dialog v-if="createDialogFalg" :createDialogFalg.sync="createDialogFalg"></create-dialog>
  </div>
</template>

<script>
import templateList from './list.vue'
import templateAction from './action-btn.vue'
import templateQuery from './query.vue'
import createDialog from '../template-component/create-dialog.vue'

export default {
  components: {
    templateList,
    templateAction,
    templateQuery,
    createDialog
  },
  data () {
    return {
      listQuery: {
        currPage: 1,
        pageSize: 10
      },
      list: null,
      dataFetched: false,
      createDialogFalg: false,
      total: null,
      filter: {},
      info: {
        commodityName: '',
        commodityCd: '',
        orderStartTime: '',
        orderEndTime: '',
        publishStartTime: '',
        publishEndTime: '',
        publishFlg: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.appointmentGoodsLoading
    }
  },
  created () {
    this.$store.dispatch('appointmentGoods/setLoadingData', true)
    let _filter = this.$store.getters.appointmentGoodsTemplateQueryData
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
      this.$store.dispatch('appointmentGoods/setAppointmentGoodsTemplateQueryData', data)
      this.fetchCouponList(data)
    },
    fetchCouponList (data) {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      this.$api.appointmentGoodsTemplate.getList(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.totalCount
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    mod (val) {
      if (val.publishFlg === 0) {
        this.$router.push({ path: '/backend/appointmentGoods/templatemod/' + val.commodityId, query: { pageType: 'edit' } })
      } else {
        this.$router.push({ path: '/backend/appointmentGoods/templatemod/' + val.commodityId, query: { pageType: 'mod' } })
      }
    },
    updateConfirm (data) {
      this.$confirm(`是否${data.title}预购商品【${data.name}】？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.update(data)
      }).catch(error => {})
    },
    update (data) {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      if (+data.publishFlg === 1) { // 公开
        this.$api.appointmentGoodsTemplate.updateCommodity(data).then(res => {
          this.$message.success('公开成功！')
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
          this.fetch()
        }).catch(error => {
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
          this.$message.error(error.message)
        })
      } else {
        this.$api.appointmentGoodsTemplate.endCommodity(data).then(res => {
          this.$message.success('结束成功！')
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
          this.fetch()
        }).catch(error => {
          this.$store.dispatch('appointmentGoods/setLoadingData', false)
          this.$message.error(error.message)
        })
      }
    },
    dimensionalBarcode ({ commodityId }) {
      this.$router.push({ path: '/backend/dimensionalBarcode/templateCreate', query: { type: 'newEcProductDetail', commodityId: commodityId } })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
}
</style>
