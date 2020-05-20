<template>
  <div class="coupon-create-wrapper" v-loading="loading">
    <CouponAdd :load.sync="loading"></CouponAdd>
  </div>
</template>

<script>
import CouponAdd from './coupon-add/index'

export default {
  components: {
    CouponAdd
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
