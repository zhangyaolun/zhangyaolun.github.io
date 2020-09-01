import {omsAjax} from '@/utils/request'

export default {
    // 渠道订单管理
    searchAllByQbc(values) {
        return omsAjax.get(`/orders/searchAllByQbc`, {params: {...values}})
    }
}
