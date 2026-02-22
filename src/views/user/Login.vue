<template>
  <div class="login-container" id="login">
    <div class="left">
      <img class="img_bg" :src="loginBg" />
    </div>
    <div class="right">
      <div class="login-box" v-if="normal">
        <img class="img" :src="logo" />
        <div class="login-form">
          <a-form :form="form" layout="vertical" @submit="doLogin">
            <div class="fix">
              <a-form-item :label="$t('loginManager.loginName.text')" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                <a-input
                  v-decorator="['userLoginId', { rules: [{ required: true, message: $t('loginManager.userNameMessage.text') }] }]"
                  :placeholder="$t('loginManager.userNamePlaceholder.text')"
                />
              </a-form-item>
              <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" :label="$t('loginManager.userPassword.text')">
                <a-input-password
                  v-decorator="['password', { rules: [{ required: true, message: $t('loginManager.userPasswordMessage.text') }] }]"
                  :placeholder="$t('loginManager.userPasswordPlaceholder.text')"
                />
              </a-form-item>
            </div>
            <a-button :disabled="loading" type="primary" class="btn-row" html-type="submit">{{ $t('loginManager.login.text') }}</a-button>
          </a-form>
        </div>
      </div>
      <div class="unnormal-login-box" v-else>
        <h3 class="unnormal">{{ $t('loginManager.modifyPwdTitle.text') }}</h3>
        <div style="color:rgba(179,189,197,1);font-size:12px;width:400px;height:36px;line-height:16px;">
          {{ modifyPwdTip }}
        </div>
        <div class="login-form">
          <a-form :form="form1" layout="vertical">
            <div class="fix">
              <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" :label="$t('loginManager.oldPwdLabel.text')">
                <a-input-password
                  v-decorator="['oldPassword', { rules: [{ required: true, message: $t('loginManager.oldPwdLabel.text') }] }]"
                  :placeholder="$t('loginManager.oldPwdPlaceholder.text')"
                />
              </a-form-item>
              <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" :label="$t('loginManager.newPwdLabel.text')">
                <a-input-password
                  v-decorator="['password', { rules: [{ required: true, message: $t('loginManager.newPwdMessage.text') }] }]"
                  :placeholder="$t('loginManager.newPwdPlaceholder.text')"
                />
              </a-form-item>
              <a-form-item :label="$t('loginManager.reNewPwdLabel.text')" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                <div style="display:flex">
                  <a-input-password
                    v-decorator="[
                      'reNewPwd',
                      {
                        rules: [
                          {
                            required: true,
                            message: $t('loginManager.reNewPwdMessage.text')
                          }
                        ]
                      }
                    ]"
                    :placeholder="$t('loginManager.reNewPwdPlaceholder.text')"
                  />
                </div>
              </a-form-item>
            </div>
            <div style="display: flex;justify-content: flex-end;">
              <a-button type="primary" class="btn-row1" @click="cancel">
                {{ $t('public.cancel.text') }}
              </a-button>
              <a-button type="primary" class="btn-row2" @click="modifySubmit">{{ $t('public.save.text') }}</a-button>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loginBg from './../../assets/login_bg.png'
import drawMixin from '../../utils/drawMixin'
import logo from './../../assets/logo.png'
import Api from '@/api/monitor.js'

const formItemLayout = {
  labelCol: { span: 15 },
  wrapperCol: { span: 18 }
}
export default {
  mixins: [drawMixin],
  name: 'Login',
  data: function() {
    return {
      logo: logo,
      loginBg: loginBg,
      modifyPwdTip: '密码修改成功将自动退出当前用户，需用新密码重新登录',
      normal: true,
      userName: '',
      logobackground: '',
      systemName: '',
      copyright: '',
      isShowUserContract: false,
      ignoreValidationCode: false,
      formItemLayout,
      identifyCode: '',
      identifyCodes: '1234567890',
      loading: false,
      year: '',
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      form1: this.$form.createForm(this, { name: 'dynamic_rule1' }),
      showType: 'first',
      verifyCodeUrl: '/api/commander/account/getVerifyCode',
      // loginButtonConfig: {}
      loginButtonConfigs: []
    }
  },
  computed: {},
  beforeCreate() {},
  created() {
    if (this.$route.query.type) {
      this.normal = false
    }
  },
  mounted() {
    console.log('Login component mounted')
    console.log('Current route:', this.$route)
    console.log('Normal state:', this.normal)
    this.userName = this.$cookies.get('userLoginId')
    console.log('User name from cookie:', this.userName)
  },
  methods: {
    setTitle(title) {
      document.title = title
    },

    doLogin(e) {
      let vm = this
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          // 调用后端API进行登录验证
          this.loading = true
          Api.Login(values)
            .then(response => {
              this.loading = false
              console.log(this.loading)
              if (response.code == 200) {
                this.$cookies.set('isLogin', true, { expires: 7 })
                this.$cookies.set('userLoginId', values.userLoginId)
                this.$router.push('monitor')
              } else {
                vm.$message.error(response.message)
              }
            })
            .catch(error => {
              vm.$message.error(error.message)
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    cancel() {
      // this.normal = true
      this.loading = false
      this.$router.push('/')
    },
    modifySubmit() {
      this.$cookies.remove('isLogin')
      let vm = this
      vm.form1.validateFields((err, values) => {
        if (!err) {
          if (values.reNewPwd !== values.password) {
            // 两次输入密码不一致
            vm.$message.error(this.$t('loginManager.errorMessage3.text'))
          } else if (this.userName === values.password) {
            // 检查新密码是否和用户名相同
            vm.$message.error(this.$t('loginManager.errorMessage2.text'))
          }
          // else if (values.newPassword === vm.password) {
          //   // 新密码和旧密码相同时
          //   vm.$message.error(this.$t('loginManager.errorMessage4.text'))
          // }
          else {
            this.loading = true
            values.userLoginId = this.userName
            delete values.reNewPwd
            Api.updatePassword(values)
              .then(response => {
                console.log(response)
                this.loading = false
                if (response.code == 200) {
                  this.$cookies.remove('isLogin')
                  this.$cookies.set('isLogin', true, { expires: 7 })
                  this.$cookies.set('userLoginId', values.userLoginId)
                  this.$router.push('Login')
                } else {
                  this.loading = false
                  vm.$message.error(response.message)
                }
              })
              .catch(() => {
                this.loading = false
                vm.$message.error(this.$t('loginManager.errorMessage1.text'))
              })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/index.scss';
.login-container {
  height: 100%;
  width: 100%;
  background-size: cover;
  display: flex;
  background: #fff;
  overflow: hidden;
}

.left {
  flex: 1;
  // left: 170px;
  bottom: 0;
  width: 50%;
  height: 100%;
  // background: url('/img/login_bg.png') no-repeat center 0;
  background: linear-gradient(to bottom, rgba(255, 227, 225, 1), rgba(255, 252, 245, 1));
  background-size: cover;
  text-align: center;

  .img_bg {
    margin: auto;
    margin-top: 300px;
    height: 389px;
    width: 527px;
    background-size: cover;
  }
}
.right {
  flex: 1;
  // left: 170px;
  bottom: 0;
  width: 50%;
  height: 100%;
  text-align: center;

  .login-box {
    margin: auto;
    margin-top: 300px;
    height: 400px;
    width: 400px;
    text-align: left;

    .img {
      height: 59px;
      width: 182px;
      // background: url('/img/login.png') no-repeat center 0;
      background-size: cover;
      margin-bottom: 20px;
    }
    .login-form {
      margin-top: 32px;

      .btn-row {
        width: 100%;
        height: 38px;
        margin-top: 10px;
        background-color: #c31219;
        color: #fff;
        border-color: #c31219;
      }
    }
  }

  .unnormal-login-box {
    margin: auto;
    margin-top: 300px;
    height: 400px;
    width: 400px;
    text-align: left;

    .unnormal {
      margin: 0 auto;
      display: inline-block;
      // padding-bottom: 20px;
      font-size: 20px;
      border-bottom: 0px solid #202b4f !important;
      // margin-bottom: 48px;
      font-weight: bolder;
    }

    .login-form {
      margin-top: 32px;
      .alert {
        margin-top: 0.8rem;
        margin-bottom: 0.8rem;
        line-height: 32px;
        padding: 0 0.8rem;
        height: 32px;
        font-size: 12px;
      }
      .btn-row1 {
        width: 30%;
        height: 38px;
        border-color: transparent;
        margin-top: 10px;
        background-color: #eceef0;
        color: #687c8a;
      }
      .btn-row2 {
        width: 30%;
        height: 38px;
        margin-left: 12px;
        margin-top: 10px;
        background-color: #c31219;
        color: #fff;
        border-color: #c31219;
      }
    }
  }
}
</style>
<style scoped>
#login >>> .ant-form-explain {
  text-align: left;
}
#login >>> .fix {
  position: relative;
  top: -20px;
  width: 400px;
  /* height: 270px;
  overflow: hidden; */
}
#login >>> .ant-form-explain {
  position: absolute;
  top: 34px;
  left: 0em;
  margin-bottom: -1px;
}
#login >>> .ant-form-item-with-help {
  margin-bottom: 24px;
}
#login >>> .ant-col-18 {
  display: block;
  width: 400px;
  margin-top: 3px;
  margin-left: 1px;
  margin-bottom: -10px;
}
#login >>> .ant-form-item {
  padding-bottom: 8px;
}
</style>
