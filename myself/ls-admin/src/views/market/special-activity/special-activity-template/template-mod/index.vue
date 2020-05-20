<template>
  <div v-loading="loading">
    <template-add ref="specialActivityForm"></template-add>
    <template-btn @submit="submit"></template-btn>
    <upload-file v-if="info.pageType === 'mod' && info.activityUnicom === 0"/>
  </div>
</template>

<script>
import templateAdd from '../template-component/template-add/action-add-info'
import templateBtn from '../template-component/template-add/action-btn'
import uploadFile from '../template-component/uploadFile'
import { templateMixin } from "../template-component/mixin.js"

export default {
  mixins: [templateMixin],
  components: {
    templateAdd,
    templateBtn,
    uploadFile // 活动图片上传【.zip】
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
    this.$store.dispatch('specialActivity/restInfoData', 'mod')
    this.info.id = this.$route.params.id
    this.info.publishFlgOld = this.$route.query.publishFlg
    this.$store.dispatch('specialActivity/setLoadingData', false)
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.$api.specialActivity.detail(this.info.id).then(res => {
        let _res = res.data
        this.updateDetailData(_res)
        this.$store.dispatch('specialActivity/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.$router.push({ path: '/backend/specialActivity/templatelist' })
          this.update()
        })
        .catch(_ => {})
    },
    update () {
      this.$store.dispatch('specialActivity/setLoadingData', true)
      this.submitChange()
      this.$api.specialActivity.update(this.info).then(res => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/specialActivity/templatelist' })
      }).catch(error => {
        this.$store.dispatch('specialActivity/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
