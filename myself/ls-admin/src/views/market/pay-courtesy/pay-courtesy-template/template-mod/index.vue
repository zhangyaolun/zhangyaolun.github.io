<template>
  <div v-loading="loading">
    <template-add ref="merchantForm" :load.sync="loading"></template-add>
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
    this.$store.dispatch('payCourtesy/restInfoData', 'mod')
    this.info.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.payCourtesy.detail(this.info.id).then(res => {
        let _res = res.data
        this.updateDetailData(_res)
        this.$store.dispatch('payCourtesy/setLoadingData', false)
      }).catch(error => {
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
      this.$store.dispatch('payCourtesy/setLoadingData', true)
      this.submitChange()
      this.$api.payCourtesy.update(this.info).then(res => {
        this.$store.dispatch('payCourtesy/setLoadingData', false)
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/payCourtesyTemplate/templatelist' })
      }).catch(error => {
        this.$store.dispatch('payCourtesy/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
