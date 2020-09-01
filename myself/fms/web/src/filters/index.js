import {parseTime} from '@/utils'

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 *格式化时间
 */
export function formatBackendTime(string, format) {
    return parseTime(string, format)
}

export function RMB(price) {
    if (!price) return ''
    return price.toFixed(2)
}

/**
 *手机号转译
 */
export function mobileEncryption(val) {
    if (!val) return
    let reg = /^(\d{3})\d{4}(\d{4})$/
    val = val.replace(reg, "$1XXXX$2")
    return val
}

/**
 *数字过万处理
 */
export function millionProcessing(value) {
    let num = 0
    if (value >= 10000) {
        num = (value / 10000).toFixed(2) + 'W'
    } else if (value < 10000 && value > 0) {
        num = Math.floor(value)
    } else if (value < -9999) {
        num = -(Math.floor(Math.abs(value) / 1000) / 10) + 'W'
    }
    return num
}

