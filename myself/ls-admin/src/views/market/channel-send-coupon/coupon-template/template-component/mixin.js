
export const templateMixin = {

  methods: {
    // 提交数据验证
    submitFalg () {
      let essentialRuleFlag = false
      let couponuseRuleFlag = false
      this.$refs.templateForm.$refs.essentialRule.$refs.ruleForm.validate(valid => {
        valid ? essentialRuleFlag = true : essentialRuleFlag = false
      })
      this.$refs.templateForm.$refs.couponRule.$refs.ruleForm.validate(valid => {
        valid ? couponuseRuleFlag = true : couponuseRuleFlag = false
      })
      if (!essentialRuleFlag || !couponuseRuleFlag) return false
      return true
    },
    // 提交数据转换
    submitChange () {

    },
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('channelSendCouponTemplate/setInfoData', _res)
    }
  }
}
