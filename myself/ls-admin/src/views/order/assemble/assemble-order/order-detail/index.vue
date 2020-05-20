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
  data () {
    return {
      loading: true,
      oData: null,
      id: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (this.id) {
      this.$api.assembleOrder.getOrderSubDetail(this.id).then(res => {
        this.oData = res.data
        this.loading = false
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}

</script>
