
export const templateMixin = {
  methods: {
    // 提交数据验证
    submitFalg () {
      let essentialRuleFlag = false
      let couponRuleFlag = false
      this.$refs.specialActivityForm.$refs.essentialRule.$refs.ruleForm.validate(valid => {
        valid ? essentialRuleFlag = true : essentialRuleFlag = false
      })
      this.$refs.specialActivityForm.$refs.couponRule.$refs.ruleForm.validate(valid => {
        valid ? couponRuleFlag = true : couponRuleFlag = false
      })
      if (!essentialRuleFlag || !couponRuleFlag) {
        this.$message.error('请检查填写内容是否正确')
        return false
      }
      if (+this.info.couponList.length === 0) {
        this.$message.error('请添加赠送礼券')
        return false
      }
      let timeFalg = false
      if (+this.info.couponList.length > 1 && this.info.couponType === 'SINGLE' && +this.info.activityUnicom === 3) {
        this.info.couponList.forEach((v, k) => {
          if (k > 0) {
            if (v.beginTime < this.info.couponList[k - 1].endTime) {
              timeFalg = true
            }
          }
        })
      }
      if (timeFalg) {
        this.$message.error('可领取时间需互斥')
        return false
      }
      return true
    },
    // 提交数据转换
    submitChange () {
      this.info.couponImageList = this.info.couponType === 'SINGLE' ? JSON.stringify(this.info.couponImage) : JSON.stringify(this.info.couponImageMore)
      if (this.info.activityUnicom === 0) {
        this.info.displayDateFrom = this.info.beginTime
        this.info.displayDateTo = this.info.beginTime
      }
    },
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('specialActivity/setInfoData', _res)
      this.info.couponType === 'SINGLE' ? this.info.couponImage = JSON.parse(this.info.couponImageList) : this.info.couponImageMore = JSON.parse(this.info.couponImageList)
    }
  }
}
