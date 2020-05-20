import merchantCouponTemplate from '@/api/group/merchant-coupon-template'
const querymerchantCouponQueryData = sessionStorage.getItem('querymerchantCouponQueryData')
const baseInfoMiniProgramsAppid = 'wx79cbc00c40c96c3e'
const baseInfoMiniProgramsPath = 'pages/my-coupon-list/my-coupon-list'
const state = {
  querymerchantCouponQueryData: querymerchantCouponQueryData ? JSON.parse(querymerchantCouponQueryData) : '',
  info: {
    id: '',
    pageType: '',
    baseInfo: {
      belongMerchant: '', // 商户号
      belongMerchantName: '', // 商户号
      comment: '', // 批次备注
      couponCodeMode: 'MERCHANT_UPLOAD', // 券发放模式
      transferable: false, // 允许转赠
      // 微信自定义入口设置
      customEntranceMiniProgramsAppid: baseInfoMiniProgramsAppid, // 小程序appid
      customEntranceMiniProgramsPath: baseInfoMiniProgramsPath, // 小程序path
      couponUseMiniProgramsAppid: baseInfoMiniProgramsAppid, // 核销商家券小程序appid
      couponUseMiniProgramsPath: baseInfoMiniProgramsPath, // 核销商家券小程序path
      entranceWords: '', // 入口文案
      guidingWords: '', // 引导文案
      appid: '', // 公众号appid
      hallId: '', // 营销馆入口
      // storeId: '', // 可用门店
      description: '', // 使用须知
      merchantLogoUrl: '', // 商户logo
      merchantName: '', // 商户名称
      backgroundColor: 'Color010', // 背景颜色
      goodsName: '', // 适用商品范围使用说明
      useMethod: 'MINI_PROGRAMS', // 核销方式:OFF_LINE：线下滴码核销,MINI_PROGRAMS：线上小程序核销（需要添加小程序appid和path）,USER_SELF：用户自主核销
    },
    couponInfo: {
      name: '', // 商家券名称
      stockType: 'EXCHAHGE', // 商家券类型 EXCHAHGE商家券 NORMAL满减券
      sendType: 'ACTIVITY_SELL', // 发送类型
      couponImageUrl: '', // 券详情图片
      shopFlg: 'UNLIMITED', // 适用门店
      // * UNLIMITED - 不限
      // * SUITED_SHOP - 适用门店
      shopInfoList: [], // 门店上传成功保存数据
      commodityFlg: 'UNLIMITED', // 适用商品
      // * UNLIMITED - 不限
      // * SUITED_COMMODITY - 适用门店
      // * UNSUITED_COMMODITY - 不适用商品
      commodityInfoList: [], // 商品上传成功保存数据
      fullAmount: '', // 券使用门槛金额
      reduceAmount: '', // 优惠金额
      couponUpperLimit: '', // 商家券库存
      dynamicPeriodFlg: 'FIXED_TERM', // 券使用期限类型
      displayDateFrom: '', // 券显示开始期限
      availableBeginTime: '', // 券使用期限(时间)
      availableEndTime: '', // 券使用期限(时间)
      dynamicPeriodDays: '', // 券使用期限（天）
      subsidyFlg: 'SELL_CHANGE', // 促销类型
      couponExplain: '', // 商家券说明
    },
    sendInfo: {
      maxAmount: '', // 批次总预算
      maxCoupons: '', // 批次最大发放个数
      maxAmountByDay: '', // 单天发放上限金额
      maxCouponsByDay: '', // 单天发放上限个数
      maxCouponsPerUser: '', // 用户最大可领个数
    },
    csvList: [],
    searchShop: [{ searchVal: '', name: '', id: '', sellPrice: 0, nameerror: '' }],
  },
  loading: true
}

const mutations = {
  SET_INFO_DATA: (state, data) => {
    sessionStorage.removeItem('merchantCouponInfo')
    state.info = Object.assign(state.info, data)
    sessionStorage.setItem('merchantCouponInfo', JSON.stringify(data))
  },
  REST_INFO_DATA: (state, data) => {
    Object.keys(state.info).forEach(infoKey => {
      if (infoKey === 'pageType') {
        data ? state.info.pageType = data : state.info.pageType = 'create'
      } else if (infoKey === 'searchShop') {
        state.info[infoKey] = [{ searchVal: '', name: '', id: '', sellPrice: 0, nameerror: '' }]
      } else if (infoKey === 'csvList') {
        state.info[infoKey] = [
          { name: '', falg: true, list: [], type: '' },
          { name: '', falg: true, list: [], type: 'SUITED_COMMODITY' },
          { name: '', falg: true, list: [], type: 'UNSUITED_COMMODITY' }
        ]
      } else if (infoKey === 'baseInfo') {
        Object.keys(state.info.baseInfo).forEach(baseKey => {
          if (baseKey === 'couponCodeMode') {
            state.info.baseInfo[baseKey] = 'MERCHANT_UPLOAD'
          } else if (baseKey === 'belongMerchant' && data === 'create') {
            merchantCouponTemplate.region().then(res => {
              state.info.baseInfo.belongMerchant = res.data.mchId
              state.info.baseInfo.belongMerchantName = res.data.mchName
            }).catch(error => {})
          } else if (baseKey === 'mchName') {
          } else if (baseKey === 'transferable') {
            state.info.baseInfo[baseKey] = false
          } else if (baseKey === 'customEntranceMiniProgramsAppid' || baseKey === 'couponUseMiniProgramsAppid') {
            state.info.baseInfo[baseKey] = baseInfoMiniProgramsAppid
          } else if (baseKey === 'customEntranceMiniProgramsPath' || baseKey === 'couponUseMiniProgramsPath') {
            state.info.baseInfo[baseKey] = baseInfoMiniProgramsPath
          } else if (baseKey === 'backgroundColor') {
            state.info.baseInfo[baseKey] = 'Color010'
          } else if (baseKey === 'useMethod') {
            state.info.baseInfo[baseKey] = 'MINI_PROGRAMS'
          } else {
            state.info.baseInfo[baseKey] = ''
          }
        })
      } else if (infoKey === 'couponInfo') {
        Object.keys(state.info.couponInfo).forEach(couponKey => {
          if (couponKey === 'stockType') {
            state.info.couponInfo[couponKey] = 'EXCHAHGE'
          } else if (couponKey === 'sendType') {
            state.info.couponInfo[couponKey] = 'ACTIVITY_SELL'
          } else if (couponKey === 'shopFlg') {
            state.info.couponInfo[couponKey] = 'UNLIMITED'
          } else if (couponKey === 'commodityFlg') {
            state.info.couponInfo[couponKey] = 'UNLIMITED'
          } else if (couponKey === 'shopInfoList' || couponKey === 'commodityInfoList') {
            state.info.couponInfo[couponKey] = []
          } else if (couponKey === 'dynamicPeriodFlg') {
            state.info.couponInfo[couponKey] = 'FIXED_TERM'
          } else if (couponKey === 'subsidyFlg') {
            state.info.couponInfo[couponKey] = 'SELL_CHANGE'
          } else {
            state.info.couponInfo[couponKey] = ''
          }
        })
      } else if (infoKey === 'sendInfo') {
        Object.keys(state.info.sendInfo).forEach(sendKey => {
          state.info.sendInfo[sendKey] = ''
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
  SET_QUERYMERCHANTCOUPONQUERYDATA_DATA: (state, data) => {
    state.querymerchantCouponQueryData = data
    sessionStorage.setItem('querymerchantCouponQueryData', JSON.stringify(data))
  }
}

const actions = {
  setInfoData ({ commit }, data) {
    commit('SET_INFO_DATA', data)
  },
  restInfoData ({ commit }, data) {
    commit('REST_INFO_DATA', data)
    sessionStorage.removeItem('merchantCouponInfo')
  },
  setLoadingData ({ commit }, data) {
    commit('SET_LOADING_DATA', data)
  },
  setQuerymerchantCouponQueryData ({ commit }, data) {
    commit('SET_QUERYMERCHANTCOUPONQUERYDATA_DATA', data)
  },
  removeQuerymerchantCouponQueryData ({ commit }) {
    commit('SET_QUERYMERCHANTCOUPONQUERYDATA_DATA', '')
    sessionStorage.removeItem('querymerchantCouponQueryData')
    sessionStorage.removeItem('merchantCouponInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
