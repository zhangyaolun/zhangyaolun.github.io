<template>
  <div v-loading="loading">
    <action-info :info.sync="info"></action-info>
    <action-btn></action-btn>
  </div>
</template>

<script>
import actionInfo from '../template-component/template-add/action-add-info'
import actionBtn from './action-btn'
import { regionBlockCode } from '@/filters/index'
import { decodeTextAreaString } from '@/utils/validate'

export default {
  components: {
    actionInfo,
    actionBtn
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
        pageType: 'detail',
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
      }
    }
  },
  created () {
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
        _res.platform === 0 ? this.info.platformList = ['小程序'] : this.info.platformList = []
        this.info.endTimeOld = _res.endTime
        this.info.cbBundleInfo[0].originalPrice = _res.originalPrice
        this.info.cbBundleInfo[0].sellPrice = _res.sellPrice
        this.info.cbBundleInfo[0].inventoryQty = _res.inventoryQty
        this.info.description = decodeTextAreaString(_res.description)
        let _day = parseInt(_res.validTime / 24 / 60 / 60 / 1000)
        let _hour = parseInt((_res.validTime / 1000 - _day * 24 * 60 * 60) / 60 / 60)
        let _minutes = parseInt((_res.validTime / 1000 - _day * 24 * 60 * 60 - _hour * 60 * 60) / 60)
        this.info.dataTime.day = _day && +_day.toString().length === 1 ? '0' + _day : _day
        this.info.dataTime.hour = _hour && +_hour.toString().length === 1 ? '0' + _hour : _hour
        this.info.dataTime.minutes = _minutes && +_minutes.toString().length === 1 ? '0' + _minutes : _minutes
        this.info.regionBlockCodeName = regionBlockCode(_res.regionBlockCode)
        this.$store.dispatch('assemble/setLoadingData', false)
      }).catch(error => {
        this.$store.dispatch('assemble/setLoadingData', false)
        this.$message.error(error.message)
      })
    }
  }
}

</script>
