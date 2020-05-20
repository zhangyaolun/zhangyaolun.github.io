
export const templateMixin = {
  methods: {
    // 提交数据验证
    submitFalg () {
      let essentialRuleFlag = false
      let couponuseRuleFlag = false
      let stocksendRuleFlag = false

      console.log(this.info)
      this.$refs.sceneMarketForm.$refs.essentialRule.$refs.ruleForm.validate(valid => {
        valid ? essentialRuleFlag = true : essentialRuleFlag = false
      })
      this.$refs.sceneMarketForm.$refs.couponuseRule.$refs.ruleForm.validate(valid => {
        valid ? couponuseRuleFlag = true : couponuseRuleFlag = false
      })
      this.$refs.sceneMarketForm.$refs.stocksendRule.$refs.ruleForm.validate(valid => {
        valid ? stocksendRuleFlag = true : stocksendRuleFlag = false
      })
      if (!essentialRuleFlag || !couponuseRuleFlag || !stocksendRuleFlag) {
        this.$message.error('请检查填写内容是否正确')
        return false
      }
      if (this.info.limitCommodityInfoList.length === 0 && this.info.rewardRuleInfo.distributeType === 'LIMIT_COMMODITY' && this.info.baseInfo.planWayType === 'AUTO_LONG_TIME_PLAN') {
        this.$message.error('请上传限定商品文件')
        return false
      }
      if (this.info.customerSegmentInfoList.some(v => {
        return v.checkedList.length === 0
      })) {
        this.$message.error('请选择客群通知类型')
        return false
      }
      if (this.info.checkedList.some(v => {
        return v === 0
      }) && (this.info.wechatNewsInfo.title === '' || this.info.wechatNewsInfo.customDescription === '' || this.info.wechatNewsInfo.thumbnailImgUrl === '')) {
        this.$message.error('请完整填写公众号图文消息信息')
        return false
      }
      if (this.info.checkedList.some(v => {
        return v === 1
      }) && (this.info.wechatTemplateInfo.title === '' || this.info.wechatTemplateInfo.serveProject === '' || this.info.wechatTemplateInfo.serveTime === '' || this.info.wechatTemplateInfo.shopAddress === '' || this.info.wechatTemplateInfo.contactPhone === '' || this.info.wechatTemplateInfo.content === '')) {
        this.$message.error('请完整填写公众号模版消息信息')
        return false
      }
      if (this.info.checkedList.some(v => {
        return v === 2
      }) && (this.info.minaSubscribeInfo.activityName === '' || this.info.minaSubscribeInfo.activityStartTime === '' || this.info.minaSubscribeInfo.activityEndTime === '' || this.info.minaSubscribeInfo.activityContent === '')) {
        this.$message.error('请完整填写小程序模版消息信息')
        return false
      }
      if (this.info.checkedList.some(v => {
        return v === 3
      }) && this.info.smsInfo.content === '') {
        this.$message.error('请完整填写短信模版信息')
        return false
      }
      return true
    },
    // 提交数据转换
    submitChange (info) {
      if (info.rewardRuleInfo.limitAmountType === 'CONSUME_COUNT') {
        info.rewardRuleInfo.distributeType = 'LIMIT_REPEAT_PURCHASE'
      }
      info.baseInfo.weeklyDay = info.baseInfo.weeklyDay && info.baseInfo.weeklyDay.length > 0 ? info.baseInfo.weeklyDay.join(',') : ''
      info.customerSegmentInfoList.forEach((v, k) => {
        v.wechatNewsMessageFlg = false // 公众号图文消息
        v.wechatTemplateMessageFlg = false // 公众号模板消息
        v.minaSubscribeMessageFlg = false // 小程序订阅消息
        v.smsMessageFlg = false // 短信消息
        v.checkedList.forEach(i => {
          if (v.list.some(s => {
            return i === s.type
          })) {
            if (i === 0) {
              v.wechatNewsMessageFlg = true
            } else if (i === 1) {
              v.wechatTemplateMessageFlg = true
            } else if (i === 2) {
              v.minaSubscribeMessageFlg = true
            } else if (i === 3) {
              v.smsMessageFlg = true
            }
          }
        })
        delete info.customerSegmentInfoList[k].select
        delete info.customerSegmentInfoList[k].checkedList
        delete info.customerSegmentInfoList[k].list
      })
      delete info.checkedList
      delete info.pageMold
      delete info.pageType
      delete info.couponFalg
      delete info.csvList

      if (info.wechatNewsInfo.title === '') delete info.wechatNewsInfo
      if (info.wechatTemplateInfo.commodityName === '') delete info.wechatTemplateInfo
      if (info.minaSubscribeInfo.commodityName === '') delete info.minaSubscribeInfo
      if (info.smsInfo.commodityName === '') delete info.smsInfo
    },
    // 修改和详情数据处理显示
    updateDetailData (_res) {
      this.$store.dispatch('sceneMarket/setInfoData', _res)
      this.info.baseInfo.type === 'CUSTOMER_SEGMENT_MARKETING' ? this.info.pageMold = 'secne' : this.info.pageMold = 'timing'
      this.info.baseInfo.weeklyDay = this.info.baseInfo.weeklyDay ? this.info.baseInfo.weeklyDay.split(',') : ''
      if (this.info.rewardRuleInfo.limitAmountType === 'CONSUME_COUNT') {
        this.info.rewardRuleInfo.distributeType = 'LIMIT_AMOUNT'
      }
      if (this.info.limitCommodityInfoList && this.info.limitCommodityInfoList.length > 0) {
        this.info.csvList = [{ name: '限定商品信息', list: [] }]
        this.info.csvList[0].list = this.info.limitCommodityInfoList
      }
      let typeList = []
      this.info.couponFalg = true
      this.info.customerSegmentInfoList.forEach((v, k) => {
        this.$set(this.info.customerSegmentInfoList[k], 'checkedList', [])
        this.$set(this.info.customerSegmentInfoList[k], 'list', [{ name: '公众号图文消息', type: 0 }, { name: '微信模板消息', type: 1 }, { name: '小程序订阅消息', type: 2 }, { name: '短信通知', type: 3 }])
        if (v.wechatNewsMessageFlg) { // 公众号图文消息
          v.checkedList.push(0)
          typeList.push(0)
        }
        if (v.wechatTemplateMessageFlg) {
          v.checkedList.push(1)
          typeList.push(1)
        }
        if (v.minaSubscribeMessageFlg) {
          console.log(v.smsMessageFlg)
          v.checkedList.push(2)
          typeList.push(2)
        }
        if (v.smsMessageFlg) {
          v.checkedList.push(3)
          typeList.push(3)
        }
      })
      this.info.checkedList = [...new Set(typeList)]
      if (this.info.baseInfo.status === 'CREATED') {
        this.info.pageType = 'create'
      }
      if (!this.info.wechatNewsInfo) {
        this.info.wechatNewsInfo = { title: '', customDescription: '', thumbnailImgUrl: '' }
      }
      if (!this.info.wechatTemplateInfo) {
        this.info.wechatTemplateInfo = { title: '', serveProject: '', serveTime: '', shopAddress: '', contactPhone: '', content: '' }
      }
      if (!this.info.minaSubscribeInfo) {
        this.info.minaSubscribeInfo = { activityName: '', activityStartTime: '', activityEndTime: '', activityContent: '' }
      }
      if (!this.info.smsInfo) {
        this.info.smsInfo = { content: '', signature: '[罗森点点]' }
      }
    },
    submitCreate () {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      let _info = JSON.parse(JSON.stringify(this.info))
      this.submitChange(_info)
      delete _info.id
      this.$api.sceneMarket.create(_info).then(res => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.success('创建成功！')
        this.$router.push({ path: '/backend/sceneMarket/templatelist' })
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    submitMod () {
      this.$store.dispatch('sceneMarket/setLoadingData', true)
      let _info = JSON.parse(JSON.stringify(this.info))
      this.submitChange(_info)
      this.$api.sceneMarket.update(_info).then(res => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.success('修改成功！')
        this.$router.push({ path: '/backend/sceneMarket/templatelist' })
      }).catch(error => {
        this.$store.dispatch('sceneMarket/setLoadingData', false)
        this.$message.error(error.message)
      })
    },
    getCustomer () {
      return new Promise((resolve, reject) => {
        this.$api.groupSetting.getList({ currPage: 1, pageSize: 10000 }).then(res => {
          let list = []
          let obj = {}
          res.data.list.forEach(v => {
            obj = {
              customerSegmentName: '',
              customerSegmentCnt: 0,
              customerSegmentId: 0,
              select: false,
              checkedList: [],
              list: [ { name: '公众号图文消息', type: 0 }, { name: '微信模板消息', type: 1 }, { name: '小程序订阅消息', type: 2 }, { name: '短信通知', type: 3 } ]
            }
            obj.customerSegmentName = v.name
            obj.customerSegmentCnt = v.labelCnt
            obj.customerSegmentId = v.id
            if (this.info.customerSegmentInfoList.some(i => {
              return v.id === i.customerSegmentId
            })) {
              obj.select = true
            }
            list.push(obj)
          })
          this.$store.dispatch('sceneMarket/setCustomerList', list)
          resolve()
        }).catch(error => {
          this.$message.error(error.message)
        })
      })
    }
  }
}
