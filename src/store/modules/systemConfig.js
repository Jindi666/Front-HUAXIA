const systemConfig = {
  state: {
    uploadType: 1 //上传方式   1代表本地服务器上传  2代表oss上传
  },
  mutations: {
    setUploadType: (state, uploadType) => {
      state.uploadType = uploadType
    }
  },
  actions: {}
}

export default systemConfig
