const payCourtesyQueryData = sessionStorage.getItem('payCourtesyQueryData')
const baseInfoMiniProgramsAppid = 'wx79cbc00c40c96c3e'
const baseInfoMiniProgramsPath = 'pages/my-coupon-list/my-coupon-list'
const state = {
  payCourtesyQueryData: payCourtesyQueryData ? JSON.parse(payCourtesyQueryData) : '',
  info: {
    id: '',
    pageType: '',
    baseInfo: {
      activityName: '', // 活动名称
      activitySecondTitle: '', // 活动副标题
      merchantLogoUrl: '', // 商户logo
      backgroundColor: 'Color010', // 背景颜色
      beginTime: '', // 生效开始时间
      endTime: '', // 生效结束时间
      deliveryPurpose: 'JUMP_MINI_APP', // 投放目的 OFF_LINE_PAY - 拉用户回店消费，JUMP_MINI_APP - 引导用户前往小程序消费
      miniProgramsAppid: baseInfoMiniProgramsAppid, // 小程序appid
      miniProgramsPath: baseInfoMiniProgramsPath, // 小程序path
    },
    couponInfo: {
      activityType: 'FULL_SEND_ACT_TYPE', // 发券模式 FULL_SEND_ACT_TYPE - 满额送
      awardType: 'BUSIFAVOR', // 券类型 BUSIFAVOR - 商家券
      transactionNumberMinimum: '', // 发券门槛金额
      sendContent: 'SINGLE_COUPON', // 发放商家券模式 SINGLE_COUPON - 单张券，GIFT_PACKAGE - 礼包
      thumbnailUrl: '', // 发券缩略图
      awardInfoList: [], // 券奖励信息 mchCouponId 商家券ID 微信stockId originalImageUrl 奖品详情图
    },
    otherInfo: {
      deliveryUserCategory: 'DELIVERY_ALL_PERSON', // 投放范围 DELIVERY_ALL_PERSON - 所有用户， DELIVERY_MEMBER_PERSON - 商户会员
      merchantName: '', // 选择商户名称
      merchantMemberAppid: '', // 商家会员appid
      merchantList: [], // 发券商户号
      merchantNameData: [], // 所有商户
      merchantListData: [], // 所有发券商户号
    },
    merchantListSelect: []
  },
  loading: true
}

const mutations = {
  SET_INFO_DATA: (state, data) => {
    state.info = Object.assign(state.info, data)
    sessionStorage.setItem('payCourtesyInfo', JSON.stringify(data))
  },
  REST_INFO_DATA: (state, data) => {
    Object.keys(state.info).forEach(infoKey => {
      if (infoKey === 'pageType') {
        data ? state.info.pageType = data : state.info.pageType = 'create'
      } else if (infoKey === 'merchantListSelect') {
        state.info.merchantListSelect = []
      } else if (infoKey === 'baseInfo') {
        Object.keys(state.info.baseInfo).forEach(baseKey => {
          if (baseKey === 'deliveryPurpose') {
            state.info.baseInfo[baseKey] = 'JUMP_MINI_APP'
          } else if (baseKey === 'miniProgramsAppid') {
            state.info.baseInfo[baseKey] = baseInfoMiniProgramsAppid
          } else if (baseKey === 'miniProgramsPath') {
            state.info.baseInfo[baseKey] = baseInfoMiniProgramsPath
          } else if (baseKey === 'backgroundColor') {
            state.info.baseInfo[baseKey] = 'Color010'
          } else {
            state.info.baseInfo[baseKey] = ''
          }
        })
      } else if (infoKey === 'couponInfo') {
        Object.keys(state.info.couponInfo).forEach(couponKey => {
          if (couponKey === 'activityType') {
            state.info.couponInfo[couponKey] = 'FULL_SEND_ACT_TYPE'
          } else if (couponKey === 'awardType') {
            state.info.couponInfo[couponKey] = 'BUSIFAVOR'
          } else if (couponKey === 'sendContent') {
            state.info.couponInfo[couponKey] = 'SINGLE_COUPON'
          } else if (couponKey === 'awardInfoList') {
            state.info.couponInfo[couponKey] = [{ mchCouponId: '', originalImageUrl: '', name: '', nameerror: '', idShow: false, urlShow: false, stockId: '', availableBeginTime: '', availableEndTime: '', maxCouponsPerUser: '' }]
          } else {
            state.info.couponInfo[couponKey] = ''
          }
        })
      } else if (infoKey === 'otherInfo') {
        Object.keys(state.info.otherInfo).forEach(otherKey => {
          if (otherKey === 'merchantNameData' || otherKey === 'merchantListData' || otherKey === 'merchantList') {
            state.info.otherInfo[otherKey] = []
          } else if (otherKey === 'deliveryUserCategory') {
            state.info.otherInfo[otherKey] = 'DELIVERY_ALL_PERSON'
          } else {
            state.info.otherInfo[otherKey] = ''
          }
        })
      } else {
        state.info[infoKey] = ''
      }
    })
    state.loading = true
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  SET_PAYCOURTESYQUERYDATA_DATA: (state, data) => {
    state.payCourtesyQueryData = data
    sessionStorage.setItem('payCourtesyQueryData', JSON.stringify(data))
  }
}

const actions = {
  setInfoData ({ commit }, data) {
    commit('SET_INFO_DATA', data)
  },
  restInfoData ({ commit }, data) {
    commit('REST_INFO_DATA', data)
    sessionStorage.removeItem('payCourtesyInfo')
  },
  setLoadingData ({ commit }, data) {
    commit('SET_LOADING_DATA', data)
  },
  setPayCourtesyQueryData ({ commit }, data) {
    commit('SET_PAYCOURTESYQUERYDATA_DATA', data)
  },
  removePayCourtesyQueryData ({ commit }) {
    commit('SET_PAYCOURTESYQUERYDATA_DATA', '')
    sessionStorage.removeItem('payCourtesyQueryData')
    sessionStorage.removeItem('payCourtesyInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
