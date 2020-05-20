import { encodeTextAreaString, decodeTextAreaString } from '@/utils/validate'
import { RMB } from '@/filters/index'
export const templateMixin = {
  methods: {
    // 提交数据验证
    submitFalg () {
      let publicityRuleFlag = false
      let priceRuleFlag = false
      let couponRuleFlag = false
      this.$refs.appointmentGoodsForm.$refs.publicityRule.$refs.ruleForm.validate(valid => {
        valid ? publicityRuleFlag = true : publicityRuleFlag = false
      })
      this.$refs.appointmentGoodsForm.$refs.priceRule.$refs.ruleForm.validate(valid => {
        valid ? priceRuleFlag = true : priceRuleFlag = false
      })
      this.$refs.appointmentGoodsForm.$refs.couponRule.$refs.ruleForm.validate(valid => {
        valid ? couponRuleFlag = true : couponRuleFlag = false
      })
      if (!publicityRuleFlag || !priceRuleFlag || !couponRuleFlag) {
        this.$message.error('请检查填写内容是否正确')
        return false
      }
      if (this.info.couponTable.length === 0) {
        this.$message.error('请添加优惠券设置')
        return false
      }
      return true
    },
    // 提交数据转换
    submitChange (info) {
      info.takeDescription = encodeTextAreaString(info.takeDescription)
      info.couponId = info.couponTable[0].couponId
      info.reservePromotionDtoList.forEach((v, k) => {
        if (k === 0) {
          v.promotionStart = info.canOrderStart
        } else {
          v.promotionStart = info.reservePromotionDtoList[k - 1].promotionEnd
        }
      })
      info.reservePromotionDtoList = JSON.stringify(info.reservePromotionDtoList)
      info.imageBig = ''
      info.imageBigs.forEach(v => {
        info.imageBig += v.url + ';'
      })
      info.imageBig = info.imageBig.substring(0, info.imageBig.length - 1)
      if (info.isAllCity === 1) {
        let _cityIdList = []
        info.cityLimitedList.forEach(v => {
          if (v.selectd) {
            _cityIdList.push(v.cityId)
          }
        })
        info.cityIdList = _cityIdList
      } else {
        info.cityIdList = []
      }
      info.dateFromFalg ? info.canShowStart = info.canOrderStart : ''
      info.promotionUpperLimitFlg = info.promotionUpperLimitFlg ? 1 : 0
    },
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('appointmentGoods/setInfoData', _res)
      this.info.takeDescription = decodeTextAreaString(this.info.takeDescription)
      this.info.dateFromFalg = this.info.canOrderStart === this.info.canShowStart
      this.info.promotionUpperLimitFlg = this.info.promotionUpperLimitFlg === 1 ? true : false
      this.info.imageBigs = []
      this.info.imageBigList.forEach(v => {
        this.info.imageBigs.push({ url: v })
      })
      this.info.couponTable = []
      let newValue = { couponId: this.info.couponId, couponNum: 1, couponName: '', couponRemain: '' }
      this.info.couponTable.push(newValue)
      this.$api.orderGiftBundle.handlerCouponId(this.info.couponId).then(res => {
        this.info.couponTable[0].couponName = res.data.couponName
      })
      if (this.info.isAllCity === 1) {
        this.$api.appointmentGoodsTemplate.getCityList().then(res => {
          res.data.forEach(v => {
            v.selectd = +v.defaultFlg === 0 ? false : true
          })
          this.info.cityLimitedList = res.data
          this.info.cityIdList.forEach(v => {
            this.info.cityLimitedList.forEach(m => {
              if (v === m.cityId) {
                m.selectd = true
              }
            })
          })
        }).catch(error => {})
      }
      if (this.info.hasPromotion > 0) {
        this.info.reservePromotionDtoList = this.info.promotionList
      }
      this.info.takeDelayDisplay = (this.info.takeDelay / 24).toFixed(0)
      this.info.saleFlgDisplay = this.info.saleFlg === 1 ? '可售' : '不可售'
    }
  }
}
