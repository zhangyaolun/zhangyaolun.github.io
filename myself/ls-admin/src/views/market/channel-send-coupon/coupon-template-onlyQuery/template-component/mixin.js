
export const templateMixin = {

  methods: {
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('channelSendCouponTemplate/setInfoData', _res)
    }
  }
}
