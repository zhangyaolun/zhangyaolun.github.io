<template>
  <div v-loading="loading">
    <template-add ref="templateForm" :load.sync="loading" :info.sync="info"></template-add>
    <template-btn @submit="submit"></template-btn>
  </div>
</template>

<script>
import templateAdd from '../template-component/template-add/action-add-info'
import templateBtn from '../template-component/template-add/action-btn'
import { templateMixin } from "../template-component/mixin.js"

export default {
  mixins: [templateMixin],
  components: {
    templateAdd,
    templateBtn
  },
  computed: {
    loading () {
      return this.$store.getters.channelSendCouponTemplateLoading
    },
    info () {
      return this.$store.getters.channelSendCouponTemplateInfo
    }
  },
  created () {
    this.$store.dispatch('channelSendCouponTemplate/restInfoData', 'mod')
    this.info.id = this.$route.params.id
    this.$api.channelSendCouponTemplate.merchantList().then(res => {
      this.info.merchantList = []
      res.data.forEach(v => {
        this.info.merchantList.push(v)
      })
    }).catch(error => {
      this.$message.error(error.message)
    })
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
      this.$api.channelSendCouponTemplate.detail(this.info.id).then(res => {
        let _res = res.data
        this.updateDetailData(_res)
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
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
      this.$store.dispatch('channelSendCouponTemplate/setLoadingData', true)
      this.submitChange()
      this.$api.channelSendCouponTemplate.update(this.info).then(res => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/channelSendCoupon/templatelist' })
      }).catch(error => {
        this.$store.dispatch('channelSendCouponTemplate/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
