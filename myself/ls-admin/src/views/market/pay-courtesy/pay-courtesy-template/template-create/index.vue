<template>
  <div v-loading="loading">
    <template-add ref="merchantForm"></template-add>
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
      return this.$store.getters.payCourtesyLoading
    },
    info () {
      return this.$store.getters.payCourtesyInfo
    }
  },
  created () {
    this.$store.dispatch('payCourtesy/restInfoData', 'create')
    this.$api.merchantCouponTemplate.region().then(res => {
      this.info.otherInfo.merchantMemberAppid = 'wx79cbc00c40c96c3e'
      this.info.otherInfo.merchantName = res.data.regionMchName
      this.info.merchantListSelect = []
      this.info.merchantListSelect.push(res.data.regionMchId)
      this.info.otherInfo.merchantList = [{ mchName: res.data.regionMchName, mchId: res.data.regionMchId }]
      this.info.otherInfo.merchantNameData = [{ mchName: res.data.regionMchName, mchId: res.data.regionMchId }]
      this.info.otherInfo.merchantListData = [{ mchName: res.data.regionMchName, mchId: res.data.regionMchId }]
    }).catch(error => {})
    this.$store.dispatch('payCourtesy/setLoadingData', false)
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
      this.$store.dispatch('payCourtesy/setLoadingData', true)
      this.$api.payCourtesy.create(this.info).then(res => {
        this.$store.dispatch('payCourtesy/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/payCourtesyTemplate/templatelist' })
      }).catch(error => {
        this.$store.dispatch('payCourtesy/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
