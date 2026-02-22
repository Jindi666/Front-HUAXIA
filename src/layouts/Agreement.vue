<template>
  <div id="agreement">
    <a-modal v-model="visible" :maskClosable="false" :keyboard="false" width="60%" :closable="false">
      <div v-if="showSpin" class="example">
        <a-spin size="large" />
      </div>
      <iframe v-else :src="agreementLanguage" frameborder="0" style="height: 500px; width: 100%"></iframe>
      <template slot="footer">
        <div v-if="showType === 'first'">
          <a-button type="primary" @click="handleFirstOK">{{ $t('agreement.confirm.text') }}</a-button>
        </div>
        <div v-else>
          <a-checkbox class="leftCheck" :checked="isChecked" @change="onChange">{{ $t('agreement.checkTip.text') }}</a-checkbox>
          <a-button @click="handleReject">{{ $t('agreement.cancel.text') }}</a-button>
          <a-button :disabled="!isAgree" type="primary" @click="handleOk">{{ $t('agreement.agree.text') }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import agreementApi from '@/api/agreement'
import {LangEnum} from '@/locales/index'
export default {
  data() {
    return {
      isAgree: false,
      isChecked: false,
      visible: this.isShowAgreement,
      showSpin: true,
    }
  },
  props: {
    isShowAgreement: {
      type: Boolean,
      default() {
        return false
      },
    },
    showType: {
      type: String,
      default() {
        return 'first'
      },
    },
  },
  computed: {
    agreementLanguage() {
      console.log(this.$i18n.locale)
      if (this.$i18n.locale === LangEnum['en-US']) {
        return '/agreementEnglish.html'
      } else if (this.$i18n.locale === LangEnum['zh-CN']) {
        return '/agreementChinese.html'
      } else if (this.$i18n.locale === LangEnum['ja-JP']) {
        return '/agreementJapannese.html'
      } else {
        //默认为中文
        return '/agreementChinese.html'
      }
    },
  },
  watch: {
    isShowAgreement: function (val) {
      console.log(val)
      this.visible = val
      console.log(this.isShowAgreement)
    },
  },
  created() {
    setTimeout(() => {
      this.showSpin = false
    }, 2000)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
    // console.log(this.showType)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    getFirstDiv() {
      return () => {
        return document.getElementById('agreement')
      }
    },
    handleScroll(e) {
      // console.log(e)
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = e.target.scrollTop
      //变量windowHeight是可视区的高度
      var windowHeight = e.target.clientHeight
      //变量scrollHeight是滚动条的总高度
      var scrollHeight = e.target.scrollHeight
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        // console.log(this.isChecked)
        // this.isChecked = true
        // this.isAgree = this.isChecked
      }
    },
    handleOk(e) {
      console.log(e)
      agreementApi.checkLoginTimes({ isAgree: 1 }).then((res) => {
        console.log(res)
        if (res.code === 0) {
          localStorage.setItem('isAgree', 1)
          this.$store.dispatch('setIsFirstLogin', 1).then((res) => {
            console.log(this.$store.getters)
          })
          this.visible = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleFirstOK() {
      this.visible = false
      // 这里不传回去只能第一次点击有效果,传回父组件在触发子组件的watch
      this.$emit('close', false)
    },
    handleReject(e) {
      console.log(e)
      this.visible = false
      this.$store.dispatch('Logout').then(() => {
        // console.log('是否退出了')
        setTimeout(() => {
          // console.log('延迟退出了')
          if (process.env.NODE_ENV === 'production') {
            var culture = localStorage.getItem('lang')
            window.location = '/api/commander/oidc/logout?ui_locales=' + culture
          } else {
            window.location.reload()
          }
          // window.location.reload()
          // console.log('已经退出登录')
        }, 10)
      })
    },
    onChange(e) {
      this.isChecked = e.target.checked
      console.log(this.isChecked)
      this.isAgree = this.isChecked
    },
  },
}
</script>

<style lang="less" scoped>
.leftCheck {
  float: left;
}
.ant-btn-primary[disabled] {
  color: rgba(0, 0, 0, 0.25);
}
.example {
  height: 600px;
  text-align: center;
  padding-top: 300px;
}

/deep/ .ant-modal-body {
  overflow-y: hidden;
}
</style>
