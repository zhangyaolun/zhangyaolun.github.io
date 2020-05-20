<template>
  <div class="coupon-create-wrapper">
    <action-info :submitFalg="submitFalg" @couponCreat="couponCreat" :couponIds="couponIds" @load="load"/>
    <action-btn @submit="submit" />
  </div>
</template>

<script>
import ActionBtn from './action-btn'
import ActionInfo from './action-add-info'

export default {
  components: {
    ActionBtn,
    ActionInfo
  },
  props: ['couponId', 'copyType'],
  data () {
    return {
      submitFalg: false,
      couponIds: ''
    }
  },
  created () {
    this.couponIds = this.couponId
  },
  methods: {
    load (val) {
      this.$emit('update:load', val)
    },
    submit (val) {
      this.submitFalg = Math.random()
    },
    couponCreat (val) {
      this.$router.push({ path: '/backend/coupon/confirmation', query: { copyType: this.copyType } })
      //this.$emit('update:submits', 'CouponConfirmation')
    }
  }
}
</script>
