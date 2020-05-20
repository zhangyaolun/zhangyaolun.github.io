
const sceneMarketQueryData = sessionStorage.getItem('sceneMarketQueryData')
const state = {
  sceneMarketQueryData: sceneMarketQueryData ? JSON.parse(sceneMarketQueryData) : '',
  info: {
    id: '',
    pageMold: '', // timing 定时 secne 客群
    pageType: '', // create 创建 mod 编辑 detail 详情
    baseInfo: { // 基础信息
      name: '', // 计划名称
      type: '', // 活动类型 CUSTOMER_SEGMENT_MARKETING - 客群营销活动，TIMING_MARKETING - 定时营销活动
      planWayType: 'AUTO_LONG_TIME_PLAN', // 计划方式 AUTO_LONG_TIME_PLAN - 自动长期计划, MANUAL_TIMING_PLAN - 手动定时计划",
      startTime: '', // 自动  开始时间
      endTime: '', // 自动  结束时间
      distributeRewardType: 'IMMEDIATE_EXECUTION', // 执行标志 IMMEDIATE_EXECUTION - 立刻执行，TIMING_EXECUTION - 定时执行",
      distributeRewardTime: '', // 手动  定时时间
      repeatType: 'MONTHLY', // 定时时间标志 MONTHLY-每月, WEEKLY-每周, DAILY-每天",
      monthlyStartDay: '', // 每月 开始
      monthlyEndDay: '', // 每月 结束
      weeklyDay: [], // 每周
      dailyStartDay: '', // 每天开始日
      dailyEndDay: '', // 每天结束日
      rewardType: 'COUPON', // 奖励设置 COUPON - 优惠券
      individualDistributeQty: '', // 每人派发数量
      distributeRotation: 1, // 每人参与轮次
      notifyTime: '', // 发放权益通知时间
      status: 'CREATED', // 公开 CREATED未公开 已公开PUBLISHED
    },
    customerSegmentInfoList: [], // 客群信息
    limitCommodityInfoList: [], // 限定商品信息
    rewardRuleInfo: { // 奖励规则信息
      distributeType: 'LIMIT_COMMODITY', // "发放类型 LIMIT_COMMODITY-限定商品,LIMIT_AMOUNT-限定金额,LIMIT_REPEAT_PURCHASE-复购"
      limitCommodityCount: '', // 限定商品次数
      limitAmountDays: '', // 天数
      limitAmountType: '', // 标签 CUMULATIVE_CONSUME_AMOUNT - 累计消费金额，CUSTOMER_UNIT_PRICE - 客单价，MAX_CONSUME_AMOUNT - 最高消费金额，CONSUME_COUNT - 消费频次"
      limitPurchaseAmount: '', // 限定消费金额"
      limitRepeatPurchaseCount: '', // 限定复购次数"
      releatedActivityFlg: false, // 关联活动标志 true/关联，false/未关联"
      releatedActivityCouponId: false, // 关联活动ID - 活动券ID
    },
    csvList: [],
    couponFalg: false, // 发放优惠券
    rewardCouponInfoList: [], // 发放优惠券
    checkedList: [], // 选中的模版
    wechatNewsInfo: {
      title: '',
      customDescription: '',
      thumbnailImgUrl: ''
    }, // 公众号图文消息
    wechatTemplateInfo: {
      title: '',
      serveProject: '',
      serveTime: '',
      shopAddress: '',
      contactPhone: '',
      content: ''
    }, // 公众号模版消息
    minaSubscribeInfo: {
      activityName: '',
      activityStartTime: '',
      activityEndTime: '',
      activityContent: ''
    }, // 小程序模版消息
    smsInfo: {
      content: '',
      signature: '[罗森点点]'
    } // 短信
  },
  loading: true,
  templateMsgObj: {
    0: { title: '公众号图文消息', tip: '图文消息只对有互动行为的粉丝生效，无举报风险' },
    1: { title: '公众号模版消息', tip: '面向关注公众号用户，频繁发送营销类模板消息存在被封禁的风险。' },
    2: { title: '小程序模版消息', tip: '面向关注公众号用户，频繁发送营销类模板消息存在被封禁的风险。' },
    3: { title: '短信', tip: '仅可面向有手机号的用户发送' }
  },
  customerList: []
}

const mutations = {
  SET_INFO_DATA: (state, data) => {
    state.info = Object.assign(state.info, data)
  },
  REST_INFO_DATA: (state, data) => {
    Object.keys(state.info).forEach(infoKey => {
      if (infoKey === 'pageType') {
        if (data) {
          let index = data.indexOf('C') || data.indexOf('M') || data.indexOf('D')
          state.info.pageMold = data.substring(0, index)
          state.info.pageType = data.substring(index, data.length).toLowerCase()
        } else {
          state.info.pageMold = 'secne'
          state.info.pageType = 'create'
        }
      } else if (infoKey === 'baseInfo') {
        Object.keys(state.info.baseInfo).forEach(baseKey => {
          if (baseKey === 'type') {
            state.info.baseInfo[baseKey] = state.info.pageMold === 'secne' ? 'CUSTOMER_SEGMENT_MARKETING' : 'TIMING_MARKETING'
          } else if (baseKey === 'planWayType') {
            state.info.baseInfo[baseKey] = 'AUTO_LONG_TIME_PLAN'
          } else if (baseKey === 'distributeRewardType') {
            state.info.baseInfo[baseKey] = 'IMMEDIATE_EXECUTION'
          } else if (baseKey === 'repeatType') {
            state.info.baseInfo[baseKey] = 'MONTHLY'
          } else if (baseKey === 'weeklyDay') {
            state.info.baseInfo[baseKey] = []
          } else if (baseKey === 'rewardType') {
            state.info.baseInfo[baseKey] = 'COUPON'
          } else if (baseKey === 'status') {
            state.info.baseInfo[baseKey] = 'CREATED'
          } else if (baseKey === 'distributeRotation') {
            state.info.baseInfo[baseKey] = 1
          } else {
            state.info.baseInfo[baseKey] = ''
          }
        })
      } else if (infoKey === 'rewardRuleInfo') {
        Object.keys(state.info.rewardRuleInfo).forEach(rewardKey => {
          if (rewardKey === 'distributeType') {
            state.info.rewardRuleInfo[rewardKey] = 'LIMIT_COMMODITY'
          } else if (rewardKey === 'releatedActivityFlg') {
            state.info.rewardRuleInfo[rewardKey] = false
          } else {
            state.info.rewardRuleInfo[rewardKey] = ''
          }
        })
      } else if (infoKey === 'pageMold') {
      } else if (infoKey === 'customerSegmentInfoList' || infoKey === 'limitCommodityInfoList' || infoKey === 'checkedList') {
        state.info[infoKey] = []
      } else if (infoKey === 'csvList') {
        state.info[infoKey] = [{ name: '', list: [] }]
      } else if (infoKey === 'couponFalg') {
        state.info[infoKey] = false
      } else if (infoKey === 'rewardCouponInfoList') {
        state.info[infoKey] = [{ couponId: '', couponName: '', inventoryQty: '' }]
      } else if (infoKey === 'wechatNewsInfo') {
        Object.keys(state.info.wechatNewsInfo).forEach(wechatNewsKey => {
          state.info.wechatNewsInfo[wechatNewsKey] = ''
        })
      } else if (infoKey === 'wechatTemplateInfo') {
        Object.keys(state.info.wechatTemplateInfo).forEach(wechatTemplateKey => {
          state.info.wechatTemplateInfo[wechatTemplateKey] = ''
        })
      } else if (infoKey === 'minaSubscribeInfo') {
        Object.keys(state.info.minaSubscribeInfo).forEach(minaSubscribeKey => {
          state.info.minaSubscribeInfo[minaSubscribeKey] = ''
        })
      } else if (infoKey === 'smsInfo') {
        Object.keys(state.info.smsInfo).forEach(smsKey => {
          if (smsKey === 'signature') {
            state.info.smsInfo[smsKey] = '[罗森点点]'
          } else {
            state.info.smsInfo[smsKey] = ''
          }
        })
      } else {
        state.info[infoKey] = ''
      }
    })
    state.customerList = []
    state.loading = true
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  SET_SCENEMARKETQUERYDATA_DATA: (state, data) => {
    state.sceneMarketQueryData = data
    sessionStorage.setItem('sceneMarketQueryData', JSON.stringify(data))
  },
  SET_CUSTOMERLIST_DATA: (state, data) => {
    state.customerList = data
  },
}

const actions = {
  setInfoData ({ commit }, data) {
    commit('SET_INFO_DATA', data)
  },
  restInfoData ({ commit }, data) {
    commit('REST_INFO_DATA', data)
  },
  setLoadingData ({ commit }, data) {
    commit('SET_LOADING_DATA', data)
  },
  setSceneMarketQueryData ({ commit }, data) {
    commit('SET_SCENEMARKETQUERYDATA_DATA', data)
  },
  setCustomerList ({ commit }, data) {
    commit('SET_CUSTOMERLIST_DATA', data)
  },
  removeSceneMarketQueryData ({ commit }) {
    commit('SET_SCENEMARKETQUERYDATA_DATA', '')
    sessionStorage.removeItem('sceneMarketQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
