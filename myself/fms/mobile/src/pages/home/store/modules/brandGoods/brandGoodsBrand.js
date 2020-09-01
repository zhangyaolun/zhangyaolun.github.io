const state = {
    goodsStatus: { // 商品销售状态
        0: '全部',
        1: '正常销售',
        2: '暂停销售'
    },
    channelGoodsList: { // 渠道名称-上架渠道
        0: '全部',
        1: '工行e生活-麦当劳',
        2: '工行容易购-麦当劳'
    }
}

const mutations = {}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
