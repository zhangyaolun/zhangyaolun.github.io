<template>
  <div class="container" v-loading="loading">
    <upload-query :info.sync="info" @createCode="createCode"/>
    <upload-action />
    <upload-list v-if="dataFetched" :table-data="list"/>
  </div>
</template>

<script>
import uploadList from './list.vue'
import uploadAction from './action-btn.vue'
import uploadQuery from './query.vue'
export default {
  components: {
    uploadList,
    uploadAction,
    uploadQuery
  },
  data () {
    return {
      loading: true,
      list: [],
      dataFetched: false,
      total: null,
      info: {
        id: '',
        name: '',
        belongMerchantName: '',
        stockId: '',
        num: ''
      }
    }
  },
  created () {
    this.info.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.loading = true
      this.$api.merchantCouponTemplate.codeDetail(this.info.id).then(res => {
        let _res = res.data
        this.info.name = _res.baseInfo.name
        this.info.belongMerchantName = _res.baseInfo.belongMerchantName
        this.info.stockId = _res.baseInfo.stockId
        this.dataFetched = true
        this.loading = false
        this.list = _res.historyInfoList
      }).catch(error => {
        this.loading = false
        this.$message.error(error.message)
      })
    },
    createCode () {
      this.loading = true
      this.$api.merchantCouponTemplate.createCode({ mchCouponId: this.info.id, num: this.info.num }).then(res => {
        this.$message.success('上传成功！')
        this.loading = false
        this.fetch()
      }).catch(error => {
        this.loading = false
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
