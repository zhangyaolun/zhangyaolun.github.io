<template>
  <div v-loading="loading">
    <template-add ref="assemleForm" :info.sync="info" @seachModelId="seachModelId"></template-add>
    <template-btn @submit="submit"></template-btn>
  </div>
</template>

<script>
import templateAdd from '../template-component/template-add/action-add-info'
import templateBtn from '../template-component/template-add/action-btn'
import { encodeTextAreaString, decodeTextAreaString } from '@/utils/validate'

export default {
  components: {
    templateAdd,
    templateBtn
  },
  computed: {
    loading () {
      return this.$store.getters.assembleLoading
    }
  },
  data () {
    return {
      info: {
        pageType: 'create',
        type: 1,
        name: '',
        beginTime: '',
        endTime: '',
        endTimeOld: '',
        finishTime: '',
        peopleNum: '', // 参团人数
        validTime: '', // 有效时间,前段转成秒给我
        dataTime: {
          day: '',
          hour: '',
          minutes: ''
        },
        purchaseLimit: '', // 限购次数
        cbBundleModelId: '', // 特惠券包ID
        originalPrice: '', // 原价
        sellPrice: '', // 售价
        inventoryQty: '', // 库存数量
        saleQty: 0, // 已售数量
        cbName: '',
        cbBundleNameError: '',
        cbBundleInfo: [{
          originalPrice: '',
          sellPrice: '',
          inventoryQty: ''
        }],
        imageSmall: '',
        imageSmallList: [],
        images: '',
        imageBigList: [],
        imagesList: [],
        regionBlockCodeName: this.$store.getters.regionBlockCodeName,
        status: 'CREATED',
        isShieldDisplay: false,
        shieldRecommendedPlace: false,
        platform: 0,
        platformList: ['小程序'],
        description: '',
        shareTitle: '',
        shareImage: '',
        shareImageList: [],
        shareDescription: '',
        sort: 1
      }
    }
  },
  created () {
    this.$store.dispatch('assemble/setLoadingData', false)
  },
  methods: {
    submit () {
      let flag = false
      this.$refs.assemleForm.$refs.ruleForm.validate(valid => {
        if (valid) flag = true
        if (flag && this.info.endTime >= this.info.finishTime) {
          this.$message.error('结束时间必须小于特惠券包结束时间')
          flag = false
        }
      })
      if (!flag) return
      this.$confirm('确认提交吗？')
        .then(_ => {
          this.create()
        })
        .catch(_ => {})
    },
    create () {
      this.info.description = encodeTextAreaString(this.info.description)
      this.$api.assemble.create(this.info).then(res => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/assemble/templatelist' })
      }).catch(error => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.info.description = decodeTextAreaString(this.info.description)
        this.$message.error(error.message)
      })
    },
    seachModelId () {
      if (this.info.cbBundleModelId === '') return false
      this.$store.dispatch('assemble/setLoadingData', true)
      this.$api.assemble.getGiftDetail(this.info.cbBundleModelId).then(res => {
        this.$store.dispatch('assemble/setLoadingData', false)
        let _res = res.data
        this.info.originalPrice = _res.originalPrice
        this.info.cbName = _res.name
        this.info.finishTime = _res.finishTime
        this.info.cbBundleInfo[0].originalPrice = _res.originalPrice
      }).catch(error => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
