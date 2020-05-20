// import parseTime, formatTime and set to filter
// export { parseTime, formatTime } from '@/utils'
import { parseTime, formatTime } from '@/utils'


/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 *格式化时间
 */
export function formatBackendTime(string, format) {
  return parseTime(string, format)
}

export function RMB(price) {
  if(!price) return ''
  return price.toFixed(2)
}
/**
 *格式化时间
 */
export function checkSuffix (str) {
  let strRegex = "(.jpg|.png|.jpeg)$"
  let re = new RegExp(strRegex)
  if (re.test(str.toLowerCase())) {
  } else {
    return false
  }
}
/**
 *区域转译
 */
export function regionBlockCode (code) {
  let codeName = {
    'default': '江浙沪',
    'sh-lawson': '江浙沪',
    'bj-lawson': '北京',
    'cq-lawson': '重庆',
    'wh-lawson': '武汉',
    'dl-lawson': '大连',
    'ah-lawson': '安徽',
    'cs-lawson': '长沙',
    'sy-lawson': '沈阳'
  }
  return codeName[code]
}
/**
 *手机号转译
 */
export function mobileEncryption (val) {
  if (!val) return
  let reg = /^(\d{3})\d{4}(\d{4})$/
  val = val.replace(reg, "$1XXXX$2")
  return val
}
/**
 *微信backgroundColor
 */
export function wechatBackgroundColor (val, type) {
  if (!val) return
  type === 'name' ? '' : val = val.toLocaleUpperCase()
  let allColorName = {
    'Color010': '#63B359',
    'Color020': '#2C9F67',
    'Color030': '#509FC9',
    'Color040': '#5885CF',
    'Color050': '#9062C0',
    'Color060': '#D09A45',
    'Color070': '#E4B138',
    'Color080': '#EE903C',
    'Color090': '#BB6549',
    'Color100': '#CC463D'
  }
  let allColor = {
    '#63B359': 'Color010',
    '#2C9F67': 'Color020',
    '#509FC9': 'Color030',
    '#5885CF': 'Color040',
    '#9062C0': 'Color050',
    '#D09A45': 'Color060',
    '#E4B138': 'Color070',
    '#EE903C': 'Color080',
    '#BB6549': 'Color090',
    '#CC463D': 'Color100'
  }
  return type === 'name' ? allColorName[val] : allColor[val]
}

/**
 *数字过万处理
 */
export function millionProcessing (value) {
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

export function checkTel (tel) {
  let ph = /^1[0-9]{10}$/
  let mb = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
  if (!ph.test(tel) && !mb.test(tel)) {
    return true
  } else {
    return false
  }
}
