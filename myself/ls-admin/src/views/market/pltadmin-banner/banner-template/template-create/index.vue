<template>
  <div v-loading="loading">
    <template-add ref="specialActivityForm"></template-add>
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
      return this.$store.getters.pltadminBannerLoading
    },
    info () {
      return this.$store.getters.pltadminBannerInfo
    }
  },
  created () {
    this.$store.dispatch('pltadminBanner/restInfoData', 'create')
    this.$store.dispatch('pltadminBanner/setLoadingData', false)
  },
  methods: {
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.create()
          this.$router.push({ path: '/backend/pltadminBanner/templatelist' })
        })
        .catch(_ => {})
    },
    create () {
      this.$store.dispatch('pltadminBanner/setLoadingData', true)
      this.submitChange()
      this.$api.specialActivity.create(this.info).then(res => {
        this.$store.dispatch('pltadminBanner/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/pltadminBanner/templatelist' })
      }).catch(error => {
        this.$store.dispatch('pltadminBanner/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
