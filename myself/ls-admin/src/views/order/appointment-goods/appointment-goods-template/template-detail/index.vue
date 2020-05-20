<template>
  <div v-loading="loading">
    <action-info></action-info>
    <action-btn></action-btn>
  </div>
</template>

<script>
import actionInfo from '../template-component/template-add/action-add-info'
import actionBtn from './action-btn'
import { templateMixin } from "../template-component/mixin.js"

export default {
  mixins: [templateMixin],
  components: {
    actionInfo,
    actionBtn
  },
  computed: {
    loading () {
      return this.$store.getters.appointmentGoodsLoading
    },
    info () {
      return this.$store.getters.appointmentGoodsInfo
    }
  },
  created () {
    this.$store.dispatch('appointmentGoods/restInfoData', 'detail')
    this.info.commodityId = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.appointmentGoodsTemplate.getCommodityDetail({ commodityId: this.$route.params.id }).then(res => {
        let _res = JSON.parse(JSON.stringify(res.data))
        this.updateDetailData(_res)
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}

</script>
