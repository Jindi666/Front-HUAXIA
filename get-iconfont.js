/*
 * @Author: kai
 * @Date: 2019-09-25 15:14:52
 * @Description: 用于快速从iconfont下载字体文件 跟项目无关
 */
const fs = require('fs')
const request = require('request')
const newPath = process.argv[2]

if (!newPath) {
  console.log('【Error】需要 http://at.alicdn.com/t/...后面这一串')
  console.log('示例：node get-iconfont.js font_153770_kdb4omr364a')
  process.exit(0)
}
const fontPath = 'http://at.alicdn.com/t/' + newPath
const suffixs = ['.eot', '.woff', '.ttf', '.svg', '.css', '.js']

const promise = (ele) => {
  return new Promise((resolve, reject) => {
    const downloadPath = `${fontPath}${ele}`
    const options = {
      method: 'GET',
      url: downloadPath,
      headers: {
        'cache-control': 'no-cache'
      }
    }
    request(options, (error, response, body) => {
      if (error) {
        reject(`iconfont${ele}下载失败了`)
        throw new Error(error)
      }
      if (ele === '.css') {
        const reg = new RegExp(`//at.*?${newPath}`, 'g')
        body = body.replace(reg, '/src/assets/iconfont/iconfont');
        fs.writeFileSync(`./src/assets/iconfont/iconfont.less`, body)
      } else {
        fs.writeFileSync(`./src/assets/iconfont/iconfont${ele}`, body)
      }
      resolve(`iconfont${ele}下载更新成功`)
    })
  })
}
const promises = suffixs.map((ele) => {
  return promise(ele)
})
Promise.all(promises).then((res) => {
  console.log(res)
  process.exit(0)
})
