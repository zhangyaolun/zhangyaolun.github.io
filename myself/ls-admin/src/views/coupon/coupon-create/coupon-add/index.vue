<template>
  <div class="coupon-create-wrapper">
    <action-info :submitFalg="submitFalg" @couponCreat="couponCreat" @load="load"/>
    <action-btn @submit="submit" />
  </div>
</template>

<script>
import ActionBtn from '@/views/coupon/template-component/coupon-add/action-btn'
import ActionInfo from './action-add-info'

export default {
  components: {
    ActionBtn,
    ActionInfo
  },
  data () {
    return {
      submitFalg: false
    }
  },
  methods: {
    load (val) {
      this.$emit('update:load', val)
    },
    submit (val) {
      this.submitFalg = Math.random()
    },
    couponCreat (val) {
      let routerPath = window.location.href.split('#')[1]
      this.$router.push({ path: '/backend/coupon/confirmation', query: { copyType: 1 } })
      //this.$emit('update:submits', 'CouponConfirmation')
    }
  }
}
</script>
