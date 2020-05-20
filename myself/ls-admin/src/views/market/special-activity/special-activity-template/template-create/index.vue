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
      return this.$store.getters.specialActivityLoading
    },
    info () {
      return this.$store.getters.specialActivityInfo
    }
  },
  created () {
    this.$store.dispatch('specialActivity/restInfoData', 'create')
    this.info.publishFlgOld = 1
    this.$store.dispatch('specialActivity/setLoadingData', false)
  },
  methods: {
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.create()
          this.$router.push({ path: '/backend/specialActivity/templatelist' })
        })
        .catch(_ => {})
    },
    create () {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.submitChange()
      this.$api.specialActivity.create(this.info).then(res => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/specialActivity/templatelist' })
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
