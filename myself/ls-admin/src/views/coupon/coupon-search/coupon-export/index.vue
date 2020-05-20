<template>
  <div class="coupon-container" v-loading="loading">
    <coupon-query :info.sync="info" :loading.sync="loading"/>
  </div>
</template>

<script>
import couponQuery from './query.vue'
export default {
  components: {
    couponQuery
  },
  data () {
    return {
      loading: false,
      info: {
        couponId: '',
        type: 'REC',
        startTime: '',
        endTime: '',
        regionBlockCode: this.$store.getters.regionBlockCode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-container{
  margin: 20px;
}
</style>
