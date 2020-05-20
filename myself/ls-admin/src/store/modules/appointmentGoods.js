const appointmentGoodsTemplateQueryData = sessionStorage.getItem('appointmentGoodsTemplateQueryData')
const appointmentGoodsOrderQueryData = sessionStorage.getItem('appointmentGoodsOrderQueryData')
const state = {
  appointmentGoodsTemplateQueryData: appointmentGoodsTemplateQueryData ? JSON.parse(appointmentGoodsTemplateQueryData) : '', // template
  appointmentGoodsOrderQueryData: appointmentGoodsOrderQueryData ? JSON.parse(appointmentGoodsOrderQueryData) : '', // template
  info: {
    id: '',
    commodityId: '',
    pageType: '',
    status: '',
    // 主档信息
    commodityNameDisplay: '', // 商品名称
    commodityCd: '', // 货号
    takeDelay: '', // 到货周期
    takeDelayDisplay: '',
    sellPriceDisplay: '', // 基本售价
    orderBegin: '', // 开始销售日
    orderEnd: '', // 截止订货日
    arriveBegin: '', // 到货开始日期
    arriveEnd: '', // 到货结束日期
    saleFlg: '', // 可售状态
    saleFlgDisplay: '', // 可售状态
    lawsonDayLimited: '',
    lawsonTotalLimited: '',
    // 公示信息设置
    commodityName: '', // 商品显示名称
    takeDescription: '', // 预购商品说明
    canOrderStart: '', // 开始销售时间
    canOrderEnd: '', // 结束销售时间
    dateFromFalg: true, // 同活动公开时间
    canShowStart: '', // 活动公开时间
    reserveDays: 30, // 最长预定天数
    imageSmall: '', // 缩略图
    imageBigs: [], // 缩略图数组
    imageBig: '', // 缩略图数组(提交)
    // 价格&限制
    sellPrice: '', // 售价
    hasPromotion: 0, // 线上促销
    reservePromotionDtoList: [], // hasPromotion为1,2时填
    num: '', // 数量
    couponPrice: '', // 优惠售价
    purchaseUpperLimit: 0, // 购买上限
    promotionUpperLimitFlg: false, // 上限仅限促销期间checkbox
    isAllCity: 0, // 限定城市设置
    cityLimitedList: [],
    cityIdList: [],
    // 优惠券设置
    couponTable: [],
    couponId: ''
  },
  loading: true
}

const mutations = {
  SET_INFO_DATA: (state, data) => { // appointmentGoodsInfo
    state.info = Object.assign({}, state.info, data)
  },
  REST_INFO_DATA: (state, data) => {
    Object.keys(state.info).forEach(infoKey => {
      if (infoKey === 'pageType') {
        data ? state.info[infoKey] = data : state.info[infoKey] = 'create'
      } else if (infoKey === 'dateFromFalg') {
        state.info[infoKey] = true
      } else if (infoKey === 'reserveDays') {
        state.info[infoKey] = 30
      } else if (infoKey === 'couponTable' || infoKey === 'imageBigs' || infoKey === 'cityLimitedList' || infoKey === 'cityIdList') {
        state.info[infoKey] = []
      } else if (infoKey === 'hasPromotion' || infoKey === 'purchaseUpperLimit' || infoKey === 'isAllCity') {
        state.info[infoKey] = 0
      } else if (infoKey === 'reservePromotionDtoList') {
        state.info[infoKey] = [{
          'promotionStart': '',
          'promotionEnd': '',
          'promotionPrice': '',
          'promotionStore': '' }]
      } else if (infoKey === 'promotionUpperLimitFlg') {
        state.info[infoKey] = false
      } else if (infoKey === 'status') {
        state.info[infoKey] = 'CREATED'
      } else {
        state.info[infoKey] = ''
      }
    })
    state.loading = true
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  SET_APPOINTMENTGOODSTEMPLATEQUERYDATA_DATA: (state, data) => {
    state.appointmentGoodsTemplateQueryData = data
    sessionStorage.setItem('appointmentGoodsTemplateQueryData', JSON.stringify(data))
  },
  SET_APPOINTMENTGOODSORDERQUERYDATA_DATA: (state, data) => {
    state.appointmentGoodsOrderQueryData = data
    sessionStorage.setItem('appointmentGoodsOrderQueryData', JSON.stringify(data))
  }
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
  setAppointmentGoodsTemplateQueryData ({ commit }, data) {
    commit('SET_APPOINTMENTGOODSTEMPLATEQUERYDATA_DATA', data)
  },
  removeAppointmentGoodsTemplateQueryData ({ commit }) {
    commit('SET_APPOINTMENTGOODSTEMPLATEQUERYDATA_DATA', '')
    sessionStorage.removeItem('appointmentGoodsTemplateQueryData')
  },
  setAppointmentGoodsOrderQueryData ({ commit }, data) {
    commit('SET_APPOINTMENTGOODSORDERQUERYDATA_DATA', data)
  },
  removeAppointmentGoodsOrderQueryData ({ commit }) {
    commit('SET_APPOINTMENTGOODSORDERQUERYDATA_DATA', '')
    sessionStorage.removeItem('appointmentGoodsOrderQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
