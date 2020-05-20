const specialActivityTemplateQueryData = sessionStorage.getItem('specialActivityTemplateQueryData')
const state = {
  specialActivityTemplateQueryData: specialActivityTemplateQueryData ? JSON.parse(specialActivityTemplateQueryData) : '', // template
  info: {
    id: '',
    publishFlgOld: '', // 公开状态（列表旧值）
    pageType: '',
    title: '', // 活动名称
    beginTime: '', // 活动时间
    endTime: '',
    displayDateFrom: '', // 公开时间
    displayDateTo: '',
    activityUnicom: 0, // 活动类型
    userType: 0, // 会员范围
    prohibitFlg: 0, // 屏蔽常规活动
    activityType: 1, // 赠送范围
    couponSendType: 0, // 礼券赠送种类
    // point: '', // 赠送积分数
    // pointLimitNum: '', // 领取积分人数限制
    activityKey: '', // 活动KEY
    publishFlg: 0, // 公开状态
    // 活动类型4内部活动
    couponShowOffset: 1000, // 活动券显示位置(px)
    imagePathList: '', // 活动图片
    backgroundImage: '', // 活动详情背景图
    couponType: 'SINGLE', // 券类型couponType:券类型：SINGLE-单券 MANY-多券
    pushFlg: 0, // 是否推送服务通知 0-不推送 1-推送
    // 优惠券设置
    couponImageList: '', // 优惠券背景图(背景图状态)
    couponImage: [
      { name: 'B1券背景1-彩色(当前为默认图)', status: 'B1', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/single_colorful.png' },
      { name: 'B2券背景2-灰色(当前为默认图)', status: 'B2', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/single_colorless.png' }], // 单张 优惠券背景图
    couponImageMore: [
      { name: 'C1券背景1-彩色无章(当前为默认图)', status: 'C1', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorful.png' },
      { name: 'C2券背景2-彩色有章(当前为默认图)', status: 'C2', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorful_stamp.png' },
      { name: 'C3券背景3-灰色无章(当前为默认图)', status: 'C3', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorless.png' },
      { name: 'C4券背景4-灰色有章(当前为默认图)', status: 'C4', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorless_stamp.png' }], // 多张 优惠券背景图
    couponList: []
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
      } else if (infoKey === 'activityUnicom' || infoKey === 'userType' || infoKey === 'prohibitFlg' || infoKey === 'couponSendType' || infoKey === 'publishFlg' || infoKey === 'pushFlg') {
        state.info[infoKey] = 0
      } else if (infoKey === 'activityType') {
        state.info[infoKey] = 1
      } else if (infoKey === 'couponList') {
        state.info[infoKey] = []
      } else if (infoKey === 'couponShowOffset') {
        state.info[infoKey] = 1000
      } else if (infoKey === 'couponType') {
        state.info[infoKey] = 'SINGLE'
      } else if (infoKey === 'couponImage') {
        state.info[infoKey] = [
          { name: 'B1券背景1-彩色(当前为默认图)', status: 'B1', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/single_colorful.png' },
          { name: 'B2券背景2-灰色(当前为默认图)', status: 'B2', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/single_colorless.png' }]
      } else if (infoKey === 'couponImageMore') {
        state.info[infoKey] = [
          { name: 'C1券背景1-彩色无章(当前为默认图)', status: 'C1', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorful.png' },
          { name: 'C2券背景2-彩色有章(当前为默认图)', status: 'C2', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorful_stamp.png' },
          { name: 'C3券背景3-灰色无章(当前为默认图)', status: 'C3', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorless.png' },
          { name: 'C4券背景4-灰色有章(当前为默认图)', status: 'C4', couponImage: 'https://lawson-event.oss-cn-hangzhou.aliyuncs.com/admin/multiple_colorless_stamp.png' }]
      } else {
        state.info[infoKey] = ''
      }
    })
    state.loading = true
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  SET_SPECIALACTIVITYTEMPLATEQUERYDATA_DATA: (state, data) => {
    state.specialActivityTemplateQueryData = data
    sessionStorage.setItem('specialActivityTemplateQueryData', JSON.stringify(data))
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
  setSpecialActivityTemplateQueryData ({ commit }, data) {
    commit('SET_SPECIALACTIVITYTEMPLATEQUERYDATA_DATA', data)
  },
  removeSpecialActivityTemplateQueryData ({ commit }) {
    commit('SET_SPECIALACTIVITYTEMPLATEQUERYDATA_DATA', '')
    sessionStorage.removeItem('specialActivityTemplateQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
