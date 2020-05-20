<template>
  <div class="container" v-loading="loading">
    <template-list v-if="dataFetched" :table-data="list"/>
  </div>
</template>

<script>
import templateList from './list.vue'

export default {
  components: {
    templateList
  },
  data () {
    return {
      list: null,
      dataFetched: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.sceneMarketLoading
    }
  },
  created () {
    this.$store.dispatch('sceneMarket/setLoadingData', true)
    this.query()
  },
  methods: {
    query () {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      this.$api.specialActivity.getList().then(res => {
        this.dataFetched = true
        this.list = res.data.list
        this.$store.dispatch('sceneMarket/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
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
