const commodityTemplateQueryData = sessionStorage.getItem('commodityTemplateQueryData')
const commodityOrderQueryData = sessionStorage.getItem('appointmentGoodsOrderQueryData')
const state = {
  commodityTemplateQueryData: commodityTemplateQueryData ? JSON.parse(commodityTemplateQueryData) : '', // template
  commodityOrderQueryData: commodityOrderQueryData ? JSON.parse(commodityOrderQueryData) : '', // template
  info: {
    id: '',
    pageType: '',
    name: '', // 商品名称
    price: '', // 商品售价
    postage: '', // 商品运费
    stock: '', // 商品库存
    purchaseLimit: '', // 单用户购买上限
    singlePurchaseLimit: '', // 单笔订单购买上限
    status: 'OFFSALE', // 是否上架
    thumnailImagePath: '', // 商品缩略图
    detailImagePaths: [], // 商品详情图
    detailImageList: [], // 商品详情图
    detail: '', // 商品详情
  },
  loading: true
}

const mutations = {
  SET_INFO_DATA: (state, data) => {
    state.info = Object.assign({}, state.info, data)
  },
  REST_INFO_DATA: (state, data) => {
    Object.keys(state.info).forEach(infoKey => {
      if (infoKey === 'pageType') {
        data ? state.info[infoKey] = data : state.info[infoKey] = 'create'
      } else if (infoKey === 'status') {
        state.info[infoKey] = 'OFFSALE'
      } else if (infoKey === 'detailImagePaths' || infoKey === 'detailImageList') {
        state.info[infoKey] = []
      } else {
        state.info[infoKey] = ''
      }
    })
    state.loading = true
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  SET_COMMODITYTEMPLATEQUERYDATA_DATA: (state, data) => {
    state.commodityTemplateQueryData = data
    sessionStorage.setItem('commodityTemplateQueryData', JSON.stringify(data))
  },
  SET_COMMODITYORDERQUERYDATA_DATA: (state, data) => {
    state.commodityOrderQueryData = data
    sessionStorage.setItem('commodityOrderQueryData', JSON.stringify(data))
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
  setCommodityTemplateQueryData ({ commit }, data) {
    commit('SET_COMMODITYTEMPLATEQUERYDATA_DATA', data)
  },
  removeCommodityTemplateQueryData ({ commit }) {
    commit('SET_COMMODITYTEMPLATEQUERYDATA_DATA', '')
    sessionStorage.removeItem('commodityTemplateQueryData')
  },
  setCommodityOrderQueryData ({ commit }, data) {
    commit('SET_COMMODITYORDERQUERYDATA_DATA', data)
  },
  removeCommodityOrderQueryData ({ commit }) {
    commit('SET_COMMODITYORDERQUERYDATA_DATA', '')
    sessionStorage.removeItem('commodityOrderQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
