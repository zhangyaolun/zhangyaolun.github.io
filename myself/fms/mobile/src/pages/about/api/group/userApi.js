import {omsAjax} from '@/utils/request'

export default {
    login({username, password}) {
        return omsAjax.post(`/login`, {username: 'admin', password: 'Arro18930746234'})
    },
    logout() {
        return omsAjax.post(`/logout`)
    },
    getMenus(values) {
        return omsAjax.post(`/sysMenu/getMenus`, {term: 'oms', ...values})
    }
}
