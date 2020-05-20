<template>
  <div class="coupon-create-wrapper" v-loading="loading">
    <action-info @loadIng="loadIng"/>
  </div>
</template>

<script>
import ActionInfo from './action-info'

export default {
  components: {
    ActionInfo
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    loadIng () {
      this.loading = false
    }
  }
}

</script>
