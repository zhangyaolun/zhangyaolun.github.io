<template>
  <div v-loading="loading">
    <template-add ref="sceneMarketForm"></template-add>
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
  async created () {
    this.$store.dispatch('sceneMarket/restInfoData', 'secneCreate')
    await this.getCustomer()
    this.$store.dispatch('sceneMarket/setLoadingData', false)
  },
  methods: {
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.submitCreate()
        })
        .catch(_ => {})
    }
  }
}
</script>
