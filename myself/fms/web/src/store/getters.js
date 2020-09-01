const getters = {
    loading: state => state.app.loading,
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    name: state => state.user.name,
    ruleMenu: state => state.permission.ruleMenu,
    /** 商品配置 **/
    // 商品管理
    goodsStatus: state => state.brandGoodsBrand.goodsStatus,
    // 渠道商品匹配
    channelGoodsList: state => state.brandGoodsBrand.channelGoodsList,
    /** 订单管理 **/
    // 渠道订单管理
    channelOrderType: state => state.order.channelOrderType,
    /** 卡密配置 **/
    // 卡券管理
    cardType: state => state.card.cardType,
}
export default getters
