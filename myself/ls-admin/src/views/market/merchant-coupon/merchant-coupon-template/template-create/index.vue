<template>
  <div v-loading="loading">
    <template-add ref="merchantForm"></template-add>
    <template-btn @submit="submit"></template-btn>
  </div>
</template>

<script>
import templateAdd from '../template-component/template-add/action-add-info'
import templateBtn from '../template-component/template-add/action-btn'
import { merchantMixin } from "../template-component/mixin.js"
export default {
  mixins: [merchantMixin],
  components: {
    templateAdd,
    templateBtn
  },
  computed: {
    loading () {
      return this.$store.getters.merchantCouponLoading
    },
    info () {
      return this.$store.getters.merchantCouponInfo
    }
  },
  created () {
    this.$store.dispatch('merchantCoupon/restInfoData', 'create')
    this.$store.dispatch('merchantCoupon/setLoadingData', false)
  },
  methods: {
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.create()
        })
        .catch(_ => {})
    },
    create () {
      this.$store.dispatch('merchantCoupon/setLoadingData', true)
      this.submitChange()
      this.$api.merchantCouponTemplate.create(this.info).then(res => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/merchantCoupon/templatelist' })
      }).catch(error => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
