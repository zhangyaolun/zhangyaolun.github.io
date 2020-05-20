
import CryptoJS from '../../node_modules/crypto-js/crypto-js.js'

const KEY = CryptoJS.enc.Utf8.parse(2015020120200131)

const encode = {
  encodeFunc: function (obj) {
    let key = KEY

    let enCodeAes = CryptoJS.AES.encrypt(JSON.stringify(obj), key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
	
	let enCodeMd5 = CryptoJS.MD5(JSON.stringify(obj)).toString();
	
    let sendData = {
      data: enCodeAes,
      md5: enCodeMd5
    }
    // $print.log(sendData)
    return sendData
  },
  decodeFuc: function (obj) {
    let key = KEY
    let decodeAes = CryptoJS.AES.decrypt(obj, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
    return decodeAes
  }

}
export default encode
