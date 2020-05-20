const pltadminBannerTemplateQueryData = sessionStorage.getItem('pltadminBannerTemplateQueryData')
const _displayTypeList = sessionStorage.getItem('displayTypeList')
const state = {
  pltadminBannerTemplateQueryData: pltadminBannerTemplateQueryData ? JSON.parse(pltadminBannerTemplateQueryData) : '', // template
  displayTypeList: _displayTypeList ? JSON.parse(_displayTypeList) : [], // 广告显示位置区分
  COMPANYDATA: {
    REGIONDATA: {
      companyId: 4,
      companyName: '罗森',
      checked: false,
      REGION: [
        { id: 5, regionBlockCode: 'sh-lawson', 'regionBlockName': '上海', 'checked': false },
        { id: 6, regionBlockCode: 'bj-lawson', 'regionBlockName': '北京', 'checked': false },
        { id: 7, regionBlockCode: 'dl-lawson', 'regionBlockName': '大连', 'checked': false },
        { id: 8, regionBlockCode: 'wh-lawson', 'regionBlockName': '武汉', 'checked': false },
        { id: 9, regionBlockCode: 'cq-lawson', 'regionBlockName': '重庆', 'checked': false },
        { id: 10, regionBlockCode: 'ah-lawson', 'regionBlockName': '安徽', 'checked': false },
        { id: 11, regionBlockCode: 'cs-lawson', 'regionBlockName': '长沙', 'checked': false },
        { id: 12, regionBlockCode: 'sy-lawson', 'regionBlockName': '沈阳', 'checked': false }]
    }
  },
  info: {
    id: '',
    pageType: '',
    unionArr: ['sh-lawson', 'bj-lawson', 'dl-lawson', 'wh-lawson', 'cq-lawson', 'ah-lawson', 'cs-lawson', 'sy-lawson'], // 投放区域
    apType: '0', // 应用类型
    title: '0', // 广告标题
    displayType: '', // 显示位置区分
    locationFlg: 0, // banner类型
    imagePath: '', // 广告图片
    imageSize: '', // 图片大小
  },
  loading: true
}

const mutations = {
  SET_INFO_DATA: (state, data) => {
    state.info = Object.assign(state.info, data)
  },
  REST_INFO_DATA: (state, data) => {
    Object.keys(state.info).forEach(infoKey => {
      if (infoKey === 'pageType') {
        data ? state.info[infoKey] = data : state.info[infoKey] = 'create'
      } else if (infoKey === 'unionArr') {
        state.info[infoKey] = ['sh-lawson', 'bj-lawson', 'dl-lawson', 'wh-lawson', 'cq-lawson', 'ah-lawson', 'cs-lawson', 'sy-lawson']
      } else if (infoKey === 'apType' || infoKey === 'locationFlg') {
        state.info[infoKey] = '0'
      }else {
        state.info[infoKey] = ''
      }
    })
    state.loading = true
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  SET_PLTADMINBANNERTEMPLATEQUERYDATA_DATA: (state, data) => {
    state.pltadminBannerTemplateQueryData = data
    sessionStorage.setItem('pltadminBannerTemplateQueryData', JSON.stringify(data))
  },
  SET_DISPLAYTYPELIST_DATA: (state, data) => {
    state.displayTypeList = data
    sessionStorage.setItem('displayTypeList', JSON.stringify(data))
  }
}

const actions = {
  setInfoData ({ commit }, data) {
    commit('SET_INFO_DATA', data)
  },
  restInfoData ({ commit }, data) {
    commit('REST_INFO_DATA', data)
  },
  setDisplayTypeList ({ commit }, data) {
    commit('SET_DISPLAYTYPELIST_DATA', data)
  },
  setLoadingData ({ commit }, data) {
    commit('SET_LOADING_DATA', data)
  },
  setPltadminBannerTemplateQueryData ({ commit }, data) {
    commit('SET_PLTADMINBANNERTEMPLATEQUERYDATA_DATA', data)
  },
  removePltadminBannerTemplateQueryData ({ commit }) {
    commit('SET_PLTADMINBANNERTEMPLATEQUERYDATA_DATA', '')
    sessionStorage.removeItem('pltadminBannerTemplateQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
