<template>
  <div v-loading="loading">
    <template-add ref="assemleForm" :info.sync="info"></template-add>
    <template-btn @submit="submit"></template-btn>
  </div>
</template>

<script>
import templateAdd from '../template-component/template-add/action-add-info'
import templateBtn from '../template-component/template-add/action-btn'
import { regionBlockCode } from '@/filters/index'
import { encodeTextAreaString, decodeTextAreaString } from '@/utils/validate'

export default {
  components: {
    templateAdd,
    templateBtn
  },
  computed: {
    loading () {
      return this.$store.getters.assembleLoading
    },
    // info () {
    //     return this.$store.getters.channelSendCouponTemplateInfo
    // }
  },
  data () {
    return {
      info: {
        id: '',
        pageType: 'mod',
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
        regionBlockCodeName: '',
        status: 'CREATED',
        isShieldDisplay: false,
        shieldRecommendedPlace: false,
        platform: '',
        platformList: [],
        description: '',
        shareTitle: '',
        shareImage: '',
        shareImageList: [],
        shareDescription: '',
        sort: 1
      },
      routerPath: ''
    }
  },
  created () {
    this.routerPath = window.location.href.split('#')[1]
    this.info.id = this.$route.params.id
    this.fetch()
  },
  methods: {
    fetch () {
      this.$api.assemble.groupDetail(this.info.id).then(res => {
        let _res = res.data
        Object.keys(_res).forEach(key => {
          this.info[key] = _res[key]
        })
        if (_res.status === 'CREATED') {
          this.$set(this.info, 'pageType', 'create')
        } else {
          this.$set(this.info, 'pageType', 'mod')
        }
        this.info.regionBlockCodeName = regionBlockCode(_res.regionBlockCode)
        let _imageBigList = []
        _res.imagesList.forEach(v => {
          _imageBigList.push({ url: v })
        })
        this.$set(this.info, 'imageBigList', _imageBigList)
        _res.platform === 0 ? this.info.platformList = ['小程序'] : this.info.platformList = []
        this.info.endTimeOld = _res.endTime
        this.info.cbBundleInfo[0].originalPrice = _res.originalPrice
        this.info.cbBundleInfo[0].sellPrice = _res.sellPrice
        this.info.cbBundleInfo[0].inventoryQty = _res.inventoryQty
        this.info.originalPrice = _res.originalPrice
        this.info.description = decodeTextAreaString(_res.description)
        this.info.sellPrice = _res.sellPrice
        this.info.inventoryQty = _res.inventoryQty
        let _day = parseInt(_res.validTime / 24 / 60 / 60 / 1000)
        let _hour = parseInt((_res.validTime / 1000 - _day * 24 * 60 * 60) / 60 / 60)
        let _minutes = parseInt((_res.validTime / 1000 - _day * 24 * 60 * 60 - _hour * 60 * 60) / 60)
        this.info.dataTime.day = _day && +_day.toString().length === 1 ? '0' + _day : _day
        this.info.dataTime.hour = _hour && +_hour.toString().length === 1 ? '0' + _hour : _hour
        this.info.dataTime.minutes = _minutes && +_minutes.toString().length === 1 ? '0' + _minutes : _minutes
        this.seachModelId()
        this.$store.dispatch('assemble/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    seachModelId () {
      if (this.info.cbBundleModelId === '') return false
      this.$store.dispatch('assemble/setLoadingData', true)
      this.$api.assemble.getGiftDetail(this.info.cbBundleModelId).then(res => {
        this.$store.dispatch('assemble/setLoadingData', false)
        let _res = res.data
        this.info.finishTime = _res.finishTime
      })
    },
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
      this.$store.dispatch('assemble/setLoadingData', true)
      this.info.description = encodeTextAreaString(this.info.description)
      this.$api.assemble.update(this.info).then(res => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/assemble/templatelist' })
      }).catch(error => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.info.description = decodeTextAreaString(this.info.description)
        this.$message.error(error.message)
      })
    }
  }
}
</script>
