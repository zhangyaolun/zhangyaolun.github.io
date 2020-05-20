<template>
  <div v-loading="loading">
    <template-add ref="sceneMarketForm" :load.sync="loading" :info.sync="info"></template-add>
    <template-btn @submit="submit"></template-btn>
  </div>
</template>

<script>
import templateAdd from '../template-component/template-add/action-add-info'
import templateBtn from '../template-component/template-add/action-btn'
import { templateMixin } from "../template-component/mixin.js"

export default {
  mixins: [templateMixin],
  components: {
    templateAdd,
    templateBtn
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
    this.$store.dispatch('sceneMarket/restInfoData', 'timingMod')
    this.info.id = this.$route.params.id
    this.getCustomer()
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.sceneMarket.detail(this.info.id).then(async res => {
        let _res = res.data
        this.updateDetailData(_res)
        await this.getCustomer()
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.submitMod()
        })
        .catch(_ => {})
    }
  }
}
</script>
