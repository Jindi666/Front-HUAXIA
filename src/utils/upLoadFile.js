import sysConfig from '@/api/sysConfig.js'
import i18n from '@/locales/index'
// const OSS = require('ali-oss')
/**
 * 文件上传
 */

function getGuid() {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    let flag = Math.floor(Math.random() * 10)
    //如果是偶数就设置成为
    if (flag % 2 == 0) {
      //全大写
      let n = Math.floor(flag * 2.4) + 65
      //全小写
      // let n = Math.floor(flag*2.4) + 97;
      n = String.fromCharCode(n)
      guid += n
    } else {
      guid += flag
    }
    // if((i==8)||(i==12)||(i==16)||(i==20))
    //   guid += "-";
  }
  return guid
}

var UploadFileClass = function() {}

var progress = new Event('build')
/**
 * 本地文件上传
 */
UploadFileClass.prototype.localServerUpload = function(opts) {
  const that = this
  const uploadKey = getGuid() + new Date().getTime() // generate a unique key.
  if (opts.file) {
    const file = opts.file
    const fileName = file.name
    const size = file.size
    const batchSize = 5 * 1024 * 1024 // 超过5M，就分片上传，很多对象存储分片都不能低于 5MB，这个以后作为一个标准
    const total = Math.ceil(size / batchSize)
    let succeed = 0
    var isCancel = false

    document.addEventListener(
      'localCancelUpload',
      () => {
        isCancel = true
      },
      false
    )

    return new Promise((resolve, reject) => {
      const uploadPart = function(idx) {
        const start = idx * batchSize
        const end = Math.min(size, start + batchSize)
        const form = new FormData()
        form.append('filePart', file.slice(start, end))
        form.append('fileName', fileName)
        form.append('index', idx + 1)
        // form.append('total', total)
        form.append('total', total ? total : 1)
        form.append('uploadKey', uploadKey)
        opts.contentType && form.append('contentType', opts.contentType)
        sysConfig
          .uploadFile(form)
          .then(response => {
            if (response.code === 0) {
              succeed++
              that.uploadProgress = Math.round((100 * succeed) / total, 2)
              // console.log('进度条', that.uploadProgress)
              document.dispatchEvent(opts.buildEvent ? new Event(opts.buildEvent) : progress)
              if (response.data.finished) {
                //上传完成
                resolve(response.data)
              } else if (idx < total - 1) {
                if (isCancel) {
                  reject(i18n.t('package.uploadWarning.text'))
                } else {
                  uploadPart(idx + 1)
                }
              }
            } else {
              console.log('uploadPart -> response', response)
              reject(response.message)
            }
          })
          .catch(err => {
            console.log('uploadPart -> err---', err)
            reject(err.message)
          })
      }
      uploadPart(0)
    })
  }
}
/**
 * oss上传，这里需要上传oss配置的region和bucket
 */

// UploadFileClass.prototype.ossUpload = function(opts, newFileNameRes) {
//   const that = this
//   const file = opts.file
//   const contentType = opts.contentType
//   return new Promise((resolve, reject) => {
//     const newFileName = newFileNameRes.path
//     const tokenInfo = newFileNameRes.ossConfig
//     const ossOpt = {
//       region: tokenInfo.region,
//       // 云帐号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
//       accessKeyId: tokenInfo.accessKeyId,
//       accessKeySecret: tokenInfo.accessKeySecret,
//       stsToken: tokenInfo.securityToken,
//       bucket: tokenInfo.bucket
//     }
//     const key = newFileName
//     const client = new OSS(ossOpt)
//     const options = {
//       partSize: 100 * 1024,
//       headers: {
//         'Content-Disposition': `filename=${encodeURIComponent(file.name)}`
//       },
//       mime: contentType,
//       progress: async function(p, checkpoint) {
//         // console.log(p, checkpoint)
//         that.uploadProgress = Math.round(100 * p, 2)
//         document.dispatchEvent(opts.buildEvent ? new Event(opts.buildEvent) : progress)
//       }
//     }
//     client
//       .multipartUpload(key, file, options)
//       .then(res => {
//         if (res.res.status === 200) {
//           resolve(tokenInfo.cdnDomain + '/' + newFileNameRes.path)
//         }
//       })
//       .catch(err => {
//         reject(err)
//       })
//     document.addEventListener(
//       'ossCancel',
//       () => {
//         client.cancel()
//       },
//       false
//     )
//   })
// }

/**
 * 根据上传方式选择调用上传接口
 */
UploadFileClass.prototype.upLoadFile = function(opts) {
  if (!opts.file) return
  return new Promise((resolve, reject) => {
    sysConfig
      .requestNewFile()
      .then(newFileRes => {
        //根据size限制上传文件的大小,0时不做限制,size为MB
        if (newFileRes.data.size && newFileRes.data.size !== 0 && (opts.file.size / Math.pow(1024.0, 2)).toFixed(2) > newFileRes.data.size) {
          reject({ message: i18n.t('utilsIndexJs.fileTooLarge.text') })
          return
        }
        if (newFileRes.data.type === 'localServer') {
          //本地文件上传（Minio）
          this.localServerUpload(opts)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        }
        // else if (newFileRes.data.type === 'oss') {
        //   return this.ossUpload(opts, newFileRes.data)
        //     .then(res => {
        //       resolve(res)
        //     })
        //     .catch(err => {
        //       reject(err)
        //     })
        // }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default UploadFileClass
