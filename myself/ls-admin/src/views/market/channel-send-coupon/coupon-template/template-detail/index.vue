<template>
  <div v-loading="loading">
    <action-info :info.sync="info" :load.sync="loading"></action-info>
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
      return this.$store.getters.channelSendCouponTemplateLoading
    },
    info () {
      return this.$store.getters.channelSendCouponTemplateInfo
    }
  },
  created () {
    this.$store.dispatch('channelSendCouponTemplate/restInfoData', 'detail')
    this.info.id = this.$route.params.id
    this.$api.channelSendCouponTemplate.merchantList().then(res => {
      this.info.merchantList = []
      res.data.forEach(v => {
        this.info.merchantList.push(v)
      })
    }).catch(error => {
      this.$message.error(error.message)
    })
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.channelSendCouponTemplate.detail(this.info.id).then(res => {
        let _res = JSON.parse(JSON.stringify(res.data))
        this.updateDetailData(_res)
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}

</script>
