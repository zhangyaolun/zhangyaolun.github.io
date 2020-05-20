<template>
  <div class="coupon-create-wrapper" v-loading="loading">
    <CouponAdd :couponId="couponId" :load.sync="loading" :copyType="copyType"></CouponAdd>
  </div>
</template>

<script>
import CouponAdd from '@/views/coupon/template-component/coupon-add/index'

export default {
  components: {
    CouponAdd
  },
  data () {
    return {
      loading: true,
      copyType: 1,
      couponId: ''
    }
  },
  created () {
    this.couponId = this.$route.params.id
  }
}
</script>
