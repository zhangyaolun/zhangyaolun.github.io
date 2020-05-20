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
    this.$store.dispatch('appointmentGoods/restInfoData', 'create')
    this.fetchList(this.$route.query)
  },
  methods: {
    fetchList (data) {
      this.$api.appointmentGoodsTemplate.getMainFileCommodityList({ type: data.type }).then(res => {
        let list = res.data.filter((v, k) => {
          return v.commodityCd === data.commodityCd
        })
        Object.keys(list[0]).forEach(v => {
          this.info[v] = list[0][v]
        })
        this.info.takeDelay = this.info.takeDelay * 1 + 24
        this.info.takeDelayDisplay = (this.info.takeDelay / 24).toFixed(0)
        this.info.canOrderEnd = this.info.orderEnd
        this.info.canTakeStart = this.info.arriveBegin
        this.info.canTakeEnd = this.info.arriveEnd
        this.info.canShowEnd = this.info.orderEnd
        this.info.saleFlgDisplay = this.info.saleFlg === 1 ? '可售' : '不可售'
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    submit () {
      if (!this.submitFalg()) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.create()
        })
        .catch(_ => {})
    },
    create () {
      this.$store.dispatch('appointmentGoods/setLoadingData', true)
      let _info = JSON.parse(JSON.stringify(this.info))
      this.submitChange(_info)
      this.$api.appointmentGoodsTemplate.createCommodity(_info).then(res => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/appointmentGoods/templatelist' })
      }).catch(error => {
        this.$store.dispatch('appointmentGoods/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
