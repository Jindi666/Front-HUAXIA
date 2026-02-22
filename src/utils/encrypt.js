import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

/**
 * 生成密钥字节数组, 原始密钥字符串不足128位, 补填0.
 * @param {string} key - 原始 key 值
 * @return Buffer
 */
 const fillKey = (key) => {
  const filledKey = Buffer.alloc(256 / 8)
  const keys = Buffer.from(key)
  if (keys.length < filledKey.length) {
    filledKey.map((b, i) => (filledKey[i] = keys[i]))
  }

  return filledKey
}

export function EncryptSecret(secret) {
  const nonce = 'awsomerobot' + new Date().getFullYear()
  const encryptedSecret = AES.encrypt(secret, CryptoJS.enc.Utf8.parse(fillKey(nonce)), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return encryptedSecret
}