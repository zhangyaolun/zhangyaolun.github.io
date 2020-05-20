<template>
  <div class="coupon-create-wrapper">
    <action-info :submitFalg="submitFalg" :copyType="copyType"/>
    <action-btn @submit="submit" :copyType="copyType"/>
  </div>
</template>

<script>
import ActionBtn from './action-btn'
import ActionInfo from './action-info'

export default {
  props: ['copyType'],
  components: {
    ActionBtn,
    ActionInfo
  },
  data () {
    return {
      submitFalg: false,
      copyTypes: false
    }
  },
  methods: {
    submit (val) {
      if (val == 'true') {
        this.submitFalg = Math.random()
      } else {
        let routerPath = window.location.href.split('#')[1]
        window.history.back()
        //this.$emit('update:submits', 'CouponAdd')
      }
    }
  }
}

</script>
