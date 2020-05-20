<template>
  <div v-loading="loading">
    <template-add ref="commodityForm"></template-add>
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
      return this.$store.getters.commodityLoading
    },
    info () {
      return this.$store.getters.commodityInfo
    }
  },
  created () {
    this.$store.dispatch('commodity/restInfoData', 'create')
    this.$store.dispatch('commodity/setLoadingData', false)
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
      this.$store.dispatch('commodity/setLoadingData', true)
      let _info = JSON.parse(JSON.stringify(this.info))
      this.submitChange(_info)
      delete _info.id
      console.log(_info)
      this.$api.commodityTemplate.addProduct(_info).then(res => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/commodity/templatelist' })
      }).catch(error => {
        this.$store.dispatch('commodity/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
