<template>
  <div class="container" v-loading="loading">
    <template-query @query="query" @reset="reset" :info.sync="info"/>
    <template-action @exportClick="exportClick"/>
    <template-list v-if="dataFetched" :table-data="list" :total="total" :list-query="listQuery" @fetch="fetch" />
  </div>
</template>

<script>
import templateList from './list.vue'
import templateAction from './action-btn.vue'
import templateQuery from './query.vue'
import { formatBackendTime, exportExcel } from '@/filters/index'
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
      exportList: [],
      dataFetched: false,
      total: null,
      filter: {},
      info: {
        activityKey: '',
        serialNumber: '',
        pickupTimeStart: '',
        pickupTimeEnd: '',
        couponStatus: '',
        useTimeStart: '',
        useTimeEnd: ''
      },
      activityKey: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.channelSendCouponTemplateLoading
    }
  },
  created () {
    this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
    this.info.activityKey = this.$route.params.key
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
      this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
      this.$api.channelSendCouponTemplate.getCMCouponRecord(data).then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.total = res.data.meta.totalNum
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    exportClick () {
      this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
      let excelData = {}
      Object.keys(this.info).forEach(key => {
        if (this.info[key] !== '') {
          excelData[key] = this.info[key]
        }
      })
      this.$api.channelSendCouponTemplate.getExportCMCouponRecordList(excelData).then(res => {
        this.exportList = []
        if (res.data && res.data.length > 0) {
          res.data.forEach(v => {
            v.pickupTime ? v.pickupTimeVal = formatBackendTime(v.pickupTime) : v.pickupTimeVal = ''
            v.useTime ? v.useTimeVal = formatBackendTime(v.useTime) : v.useTimeVal = ''
            v.couponStatus === 'USED' ? v.couponStatusVal = '已使用' : v.couponStatus === 'UNUSED' ? v.couponStatusVal = '未使用' : v.couponStatusVal = ''
            this.exportList.push(v)
          })
        }
        this.exportExcel()
        this.dataFetched = true
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    exportExcel () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['订单流水号', '领取时间', '优惠券状态', '优惠券使用时间']
        const filterVal = ['serialNumber', 'pickupTimeVal', 'couponStatusVal', 'useTimeVal']
        const data = this.formatJson(filterVal, this.exportList)
        export_json_to_excel(tHeader, data, '优惠券领取状态列表')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
}
</style>
