<template>
  <div v-loading="loading">
    <template-add ref="appointmentGoodsForm"></template-add>
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
      return this.$store.getters.appointmentGoodsLoading
    },
    info () {
      return this.$store.getters.appointmentGoodsInfo
    }
  },
  created () {
    this.$store.dispatch('appointmentGoods/restInfoData', this.$route.query.pageType) // 编辑无限制
    this.info.commodityId = this.$route.params.id
    this.info.pageType = this.$route.query.pageType
    this.$store.dispatch('appointmentGoods/setLoadingData', false)
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      this.$api.appointmentGoodsTemplate.getCommodityDetail({ commodityId: this.$route.params.id }).then(res => {
        let _res = res.data
        this.updateDetailData(_res)
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
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
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      let _info = JSON.parse(JSON.stringify(this.info))
      this.submitChange(_info)
      this.$api.appointmentGoodsTemplate.updateCommodity(_info).then(res => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/appointmentGoods/templatelist' })
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
