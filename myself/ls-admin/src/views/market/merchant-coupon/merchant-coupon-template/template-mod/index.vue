<template>
  <div v-loading="loading">
    <template-add ref="merchantForm" :load.sync="loading" :info.sync="info"></template-add>
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
    this.$store.dispatch('merchantCoupon/restInfoData', 'mod')
    this.info.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('merchantCoupon/setLoadingData', true)
      this.$api.merchantCouponTemplate.detail(this.info.id).then(res => {
        let _res = res.data
        this.updateDetailData(_res)
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.update()
        })
        .catch(_ => {})
    },
    update () {
      this.$store.dispatch('merchantCoupon/setLoadingData', true)
      this.submitChange()
      this.$api.merchantCouponTemplate.update(this.info).then(res => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/merchantCoupon/templatelist' })
      }).catch(error => {
        this.$store.dispatch('merchantCoupon/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
