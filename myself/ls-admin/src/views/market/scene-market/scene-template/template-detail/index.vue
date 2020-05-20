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
      return this.$store.getters.sceneMarketLoading
    },
    info () {
      return this.$store.getters.sceneMarketInfo
    }
  },
  created () {
    this.$store.dispatch('sceneMarket/restInfoData', 'detail')
    this.info.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.sceneMarket.detail(this.info.id).then(res => {
        let _res = JSON.parse(JSON.stringify(res.data))
        this.updateDetailData(_res)
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}

</script>
