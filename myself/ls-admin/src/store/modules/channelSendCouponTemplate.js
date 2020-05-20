const channelSendCouponTemplateQueryData = sessionStorage.getItem('channelSendCouponTemplateQueryData')
const channelSendCouponTemplateOnlyQueryData = sessionStorage.getItem('channelSendCouponTemplateOnlyQueryData')
const state = {
  channelSendCouponTemplateQueryData: channelSendCouponTemplateQueryData ? JSON.parse(channelSendCouponTemplateQueryData) : '',
  channelSendCouponTemplateOnlyQueryData: channelSendCouponTemplateOnlyQueryData ? JSON.parse(channelSendCouponTemplateOnlyQueryData) : '',
  loading: true,
  info: {
    id: '',
    pageType: '',
    activityName: '', // 活动名称
    activityKey: '', // 活动key
    beginTime: '', // 活动开始时间
    endTime: '', // 活动结束时间
    merchantId: '', // 合作方id
    merchantList: [], // 合作方
    type: 'COOPERATION', // 活动类型 渠道合作-COOPERATION'
    status: 'CREATED', // 状态 CREATED-未公开, PUBLISHED-已公开, INVALIDATED-已作废[暂时不用], DELETED-已删除',
    imageUrl: '', // 活动背景图片
    sendType: 'ALL', // 发放类型 ALL-全发送'
    inventoryQty: '', // 总库存
    list: [], // 优惠券列表
    couponIdList: [
      {
        couponId: '', // 优惠券Id
        couponName: '', // 优惠券名字
        num: 1, // 数量
      }
    ]
  }
}

const mutations = {
  SET_TEMPLATEQUERY_DATA: (state, data) => {
    state.channelSendCouponTemplateQueryData = data
    sessionStorage.setItem('channelSendCouponTemplateQueryData', JSON.stringify(data))
  },
  SET_TEMPLATEQUERYONLY_DATA: (state, data) => {
    state.channelSendCouponTemplateOnlyQueryData = data
    sessionStorage.setItem('channelSendCouponTemplateOnlyQueryData', JSON.stringify(data))
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  SET_INFO_DATA: (state, data) => {
    sessionStorage.removeItem('channelSendCouponTemplateInfo')
    state.info = Object.assign(state.info, data)
    sessionStorage.setItem('channelSendCouponTemplateInfo', JSON.stringify(data))
  },
  REST_INFO_DATA: (state, data) => {
    Object.keys(state.info).forEach(infoKey => {
      if (infoKey === 'pageType') {
        data ? state.info.pageType = data : state.info.pageType = 'create'
      } else if (infoKey === 'merchantList') {
        state.info[infoKey] = []
      } else if (infoKey === 'couponIdList') {
        state.info[infoKey] = [{ couponId: '', couponName: '', num: 1 }]
      } else if (infoKey === 'type') {
        state.info[infoKey] = 'COOPERATION'
      } else if (infoKey === 'status') {
        state.info[infoKey] = 'CREATED'
      } else if (infoKey === 'sendType') {
        state.info[infoKey] = 'ALL'
      } else {
        state.info[infoKey] = ''
      }
    })
    state.loading = true
  },
}

const actions = {
  setLoadingData ({ commit }, data) {
    commit('SET_LOADING_DATA', data)
  },
  setTemplateOnlyQueryData ({ commit }, data) {
    commit('SET_TEMPLATEQUERYONLY_DATA', data)
  },
  setTemplateQueryData ({ commit }, data) {
    commit('SET_TEMPLATEQUERY_DATA', data)
  },
  removeChannelSendCouponTemplateQueryData ({ commit }) {
    commit('SET_TEMPLATEQUERY_DATA', '')
    sessionStorage.removeItem('channelSendCouponTemplateQueryData')
    sessionStorage.removeItem('channelSendCouponTemplateOnlyQueryData')
    sessionStorage.removeItem('channelSendCouponTemplateInfo')
  },
  setInfoData ({ commit }, data) {
    commit('SET_INFO_DATA', data)
  },
  restInfoData ({ commit }, data) {
    commit('REST_INFO_DATA', data)
    sessionStorage.removeItem('channelSendCouponTemplateInfo')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
