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
      return this.$store.getters.commodityLoading
    },
    info () {
      return this.$store.getters.commodityInfo
    }
  },
  created () {
    this.$store.dispatch('commodity/restInfoData', 'detail')
    this.info.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.commodityTemplate.getProductDetail(this.$route.params.id).then(res => {
        let _res = JSON.parse(JSON.stringify(res.data))
        this.updateDetailData(_res)
        this.$store.dispatch('commodity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}

</script>
