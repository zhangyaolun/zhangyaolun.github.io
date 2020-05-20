
export const templateMixin = {

  methods: {
    // 提交数据验证
    submitFalg () {
      let essentialRuleFlag = false
      let stocksendRuleFlag = false
      let commentRuleRuleFlag = false
      let sendContentIdRuleFlag = true
      let sendContentUrlRuleFlag = true
      let minTimeRuleFlag = false
      let maxTimeRuleFlag = false
      let identicalTimeRuleFlag = false
      let maxCouponsPerUserRuleFlag = false

      this.$refs.merchantForm.$refs.essentialRule.$refs.ruleForm.validate(valid => {
        valid ? essentialRuleFlag = true : essentialRuleFlag = false
      })
      this.$refs.merchantForm.$refs.stocksendRule.$refs.ruleForm.validate(valid => {
        valid ? stocksendRuleFlag = true : stocksendRuleFlag = false
      })
      this.$refs.merchantForm.$refs.commentRule.$refs.ruleForm.validate(valid => {
        valid ? commentRuleRuleFlag = true : commentRuleRuleFlag = false
      })
      this.info.couponInfo.awardInfoList.forEach(v => {
        if (v.name === '' || v.nameerror !== '') {
          v.idShow = true
          sendContentIdRuleFlag = false
        }
        if (v.originalImageUrl === '') {
          v.urlShow = true
          sendContentUrlRuleFlag = false
        }
        if (this.info.baseInfo.beginTime < v.availableBeginTime && v.availableBeginTime !== '') {
          minTimeRuleFlag = true
        }
        if (this.info.baseInfo.endTime > v.availableEndTime && v.availableEndTime !== '') {
          maxTimeRuleFlag = true
        }
      })
      if (!essentialRuleFlag || !stocksendRuleFlag || !commentRuleRuleFlag || !sendContentIdRuleFlag || !sendContentUrlRuleFlag){
        this.$message.error('请检查填写内容是否正确')
        return false
      }
      if (this.info.couponInfo.sendContent === 'GIFT_PACKAGE') {
        if (this.info.couponInfo.awardInfoList.length < 3) {
          this.$message.error('多张券，指至少3张券，最多5张券')
          return false
        }
        identicalTimeRuleFlag = this.info.couponInfo.awardInfoList.some(v => {
          return this.info.couponInfo.awardInfoList[0].availableBeginTime !== v.availableBeginTime || this.info.couponInfo.awardInfoList[0].availableEndTime !== v.availableEndTime
        })
        if (identicalTimeRuleFlag) {
          this.$message.error('商家券生效时间必须一致')
          return false
        }
        maxCouponsPerUserRuleFlag = this.info.couponInfo.awardInfoList.some(v => {
          return this.info.couponInfo.awardInfoList[0].maxCouponsPerUser !== v.maxCouponsPerUser
        })
        if (maxCouponsPerUserRuleFlag) {
          this.$message.error('商家券用户最大可领个数不一致')
          return false
        }
      }
      if (minTimeRuleFlag) {
        this.$message.error('活动开始时间必须大于商家券开始时间')
        return false
      }
      if (maxTimeRuleFlag) {
        this.$message.error('活动结束时间必须小于商家券结束时间')
        return false
      }
      return true
    },
    // 提交数据转换
    submitChange () {
    },
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('payCourtesy/setInfoData', _res)
      this.info.merchantListSelect = []
      this.info.otherInfo.merchantList.forEach(v => {
        this.info.merchantListSelect.push(v.mchId)
      })
      this.info.otherInfo.merchantNameData = this.info.otherInfo.merchantList
      this.info.otherInfo.merchantListData = this.info.otherInfo.merchantList
      this.info.couponInfo.awardInfoList.forEach(v => {
        v.name = v.mchCouponName
        v.nameerror = ''
        v.idShow = false
        v.urlShow = false
      })
    }
  }
}
