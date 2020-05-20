<template>
  <div class="view-order-system_bundle-order-detail" v-loading="loading" v-if="dataFetched">
    <order-basic-info :order="order" />
    <member-basic-info :order="order" />
    <bundle-basic-info :order="order" />
    <bundle-rules :order="order" />
    <bundle-cancle-btn/>
  </div>
</template>

<script>
import orderBasicInfo from './order-basic-info.vue'
import memberBasicInfo from './member-basic-info.vue'
import bundleBasicInfo from './bundle-basic-info.vue'
import bundleRules from './bundle-rules.vue'
import bundleCancleBtn from './bundle-cancle-btn.vue'

export default {
  components: {
    orderBasicInfo,
    memberBasicInfo,
    bundleBasicInfo,
    bundleRules,
    bundleCancleBtn
  },
  data () {
    return {
      loading: true,
      order: null,
      dataFetched: false
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
  },
  methods: {
    getDetail (val) {
      this.$api.orderBundleOrder.detail(val).then(res => {
        this.order = res.data
        this.loading = false
        this.dataFetched = true
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }
}
</script>

