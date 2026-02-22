<template>
  <div class="no-permission">
    <img src="../../assets/Nopermission.png" alt="Nopermission" />
    <div class="actions">
      <div class="title">{{ $t('Nopermission.titleText.text') }}</div>
      <!-- <a-button type="primary" @click="toLogin">{{ $t('Nopermission.backToLogin.text') }}</a-button> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toLogin: function() {
      // 清空cookie
      var date = new Date()
      date.setSeconds(date.getSeconds() - 1)
      document.cookie = 'UiBot=;expires=' + date.toGMTString()
      localStorage.clear()
      if (process.env.NODE_ENV === 'production') {
        var culture = localStorage.getItem('lang')
        window.location = '/api/commander/oidc/logout?ui_locales=' + culture
      } else {
        this.$router.push('/user/login')
      }
    }
  }
}
</script>

<style scoped lang="less">
.no-permission {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .actions {
    button:not(:last-child) {
      margin-right: 8px;
    }
    .title {
      width: 522px;
      height: 24px;
      margin-bottom: 24px;
      font-size: 18px;
      color: rgba(52, 61, 73, 1);
      line-height: 24px;
    }
  }
}
</style>
