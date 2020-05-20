<template>
  <div v-loading="loading">
    <action-info :oData.sync="oData" >
      <action-btn />
    </action-info>
  </div>
</template>

<script>
import actionInfo from './action-info'
import actionBtn from './action-btn'

export default {
  components: {
    actionInfo,
    actionBtn
  },
  computed: {
    loading () {
      return this.$store.getters.commodityLoading
    }
  },
  data () {
    return {
      oData: null,
      id: ''
    }
  },
  mounted () {
    this.$store.dispatch('commodity/setLoadingData', true)
    this.id = this.$route.params.id
    if (this.id) {
      this.$api.commodityOrder.getOrderDetail(this.id).then(res => {
        this.oData = res.data
        this.$store.dispatch('commodity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}

</script>
