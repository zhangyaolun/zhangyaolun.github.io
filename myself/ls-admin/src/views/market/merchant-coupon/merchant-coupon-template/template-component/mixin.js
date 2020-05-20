import { encodeTextAreaString, decodeTextAreaString } from '@/utils/validate'

export const merchantMixin = {
  methods: {
    // 提交数据验证
    submitFalg () {
      let essentialRuleFlag = false
      let couponuseRuleFlag = false
      let stocksendRuleFlag = false
      let customentranceRuleFlag = false
      let commentRuleRuleFlag = false
      this.$refs.merchantForm.$refs.essentialRule.$refs.ruleForm.validate(valid => {
        valid ? essentialRuleFlag = true : essentialRuleFlag = false
      })
      this.$refs.merchantForm.$refs.couponuseRule.$refs.ruleForm.validate(valid => {
        valid ? couponuseRuleFlag = true : couponuseRuleFlag = false
      })
      this.$refs.merchantForm.$refs.stocksendRule.$refs.ruleForm.validate(valid => {
        valid ? stocksendRuleFlag = true : stocksendRuleFlag = false
      })
      this.$refs.merchantForm.$refs.customentranceRule.$refs.ruleForm.validate(valid => {
        valid ? customentranceRuleFlag = true : customentranceRuleFlag = false
      })
      this.$refs.merchantForm.$refs.commentRule.$refs.ruleForm.validate(valid => {
        valid ? commentRuleRuleFlag = true : commentRuleRuleFlag = false
      })
      if (!essentialRuleFlag || !couponuseRuleFlag || !stocksendRuleFlag || !customentranceRuleFlag || !commentRuleRuleFlag) {
        this.$message.error('请检查填写内容是否正确')
        return false
      }
      if (this.info.couponInfo.shopFlg !== 'UNLIMITED' && +this.info.couponInfo.shopInfoList.length === 0) {
        this.$message.error('请上传适用门店')
        window.scrollTo(0, document.getElementById('shopFlg').scrollHeight)
        return false
      }
      // document.getElementById('essentialRuleForm').scrollIntoView({ behavior: 'smooth' })
      if (this.info.couponInfo.commodityFlg !== 'UNLIMITED' && +this.info.couponInfo.commodityInfoList.length === 0 && this.info.couponInfo.stockType === 'NORMAL') {
        this.$message.error('请上传适用商品')
        window.scrollTo(0, document.getElementById('commodity').scrollHeight)
        return false
      }
      if (this.info.searchShop[this.info.searchShop.length - 1].id === '' && this.info.couponInfo.stockType !== 'NORMAL' && this.info.searchShop[this.info.searchShop.length - 1].nameerror === '') {
        this.$message.error('请添加适用商品')
        window.scrollTo(0, document.getElementById('commodityFlg').scrollHeight)
        return false
      }
      let _attr = this.info.searchShop.filter((v) => {
        return v.nameerror !== ''
      })
      if (_attr.length > 0) {
        window.scrollTo(0, document.getElementById('commodityFlg').scrollHeight)
        return false
      }
      this.info.baseInfo.guidingWords === '' ? this.info.baseInfo.guidingWords = null : ''
      return true
    },
    // 提交数据转换
    submitChange () {
      this.info.couponInfo.couponExplain = encodeTextAreaString(this.info.couponInfo.couponExplain)
      if (this.info.couponInfo.stockType === 'EXCHAHGE') {
        this.info.couponInfo.commodityInfoList = []
        this.info.searchShop.forEach((v, k) => {
          if (v.id) {
            this.info.couponInfo.commodityInfoList.push({ commodityCd: v.id, commodityName: v.name })
          }
        })
        this.info.couponInfo.fullAmount = 0.01
      }
      if (this.info.couponInfo.dynamicPeriodFlg === 'DYNAMIC_TERM') {
        this.info.couponInfo.displayDateFrom = null
      } else {
        this.info.couponInfo.dynamicPeriodDays = null
      }
    },
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('merchantCoupon/setInfoData', _res)
      this.info.couponInfo.couponExplain = decodeTextAreaString(_res.couponInfo.couponExplain)
      if (this.info.couponInfo.stockType === 'EXCHAHGE') {
        if (this.info.couponInfo.commodityInfoList && this.info.couponInfo.commodityInfoList.length > 0) {
          this.info.searchShop = []
          this.info.couponInfo.commodityInfoList.forEach(async (v, k) => {
            this.info.searchShop.push({ searchVal: v.commodityCd, name: v.commodityName, id: v.commodityCd, sellPrice: 0, nameerror: '' })
          })
        }
      }
      if (this.info.couponInfo.dynamicPeriodFlg === 'DYNAMIC_TERM') {
        this.info.couponInfo.displayDateFrom = ''
      } else {
        this.info.couponInfo.dynamicPeriodDays = ''
      }
      if (this.info.couponInfo.shopFlg === 'SUITED_SHOP') {
        this.info.csvList[0].falg = false
        this.info.csvList[0].name = '可用门店'
        this.info.csvList[0].list = this.info.couponInfo.shopInfoList
      }
      if (this.info.couponInfo.commodityFlg === 'SUITED_COMMODITY') {
        this.info.csvList[1].falg = false
        this.info.csvList[1].name = '可用商品'
        this.info.csvList[1].list = this.info.couponInfo.commodityInfoList
      }
      if (this.info.couponInfo.commodityFlg === 'UNSUITED_COMMODITY') {
        this.info.csvList[2].falg = false
        this.info.csvList[2].name = '不可用商品'
        this.info.csvList[2].list = this.info.couponInfo.commodityInfoList
      }
    }
  }
}
