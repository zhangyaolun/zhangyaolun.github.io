import {omsAjax} from '@/utils/request'

export default {
    // 品牌管理
    searchBrand(values) {
        return omsAjax.get(`/brand/searchBrand`, {params: {...values}})
    },
    addBrand(values) {
        return omsAjax.post(`/brand/addBrand`, {...values})
    },
    // 商品管理
    searchSpuList(values) {
        return omsAjax.get(`/items/searchSpuList`, {params: {...values}})
    },
}
