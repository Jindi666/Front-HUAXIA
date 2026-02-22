<template>
  <div>
    <div class="swiper" v-if="BannerList.length > 0">
      <!-- <div class="swiper-wrapper" v-for="(item, index) in BannerList" :key="index">
        <img :src="item" />
      </div> -->
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in BannerList" :key="i">
          <img :src="item" alt="" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
let vm = null
let mySwiper = null
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
export default {
  name: 'SwiperChart',
  components: {},
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    },
    showType: {
      type: Boolean,
      default() {
        return true
      }
    },
    BannerList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  created() {
    vm = this
  },
  updated() {
    // console.log('ssss')
  },
  watch: {
    // 监听bannerList数据的变化 由空数组变为长度为4的数组
    BannerList: {
      handler(newV, oldV) {
        this.initSwiper()
      }
    },
    showType: {
      handler(newV, oldV) {
        this.initSwiper()
      }
    }
  },
  computed: {},
  methods: {
    initSwiper() {
      if (mySwiper) {
        mySwiper.destroy()
      }
      this.$nextTick(() => {
        mySwiper = new Swiper('.swiper', {
          speed: 2000,
          loop: true, // 循环模式选项
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          uniqueNavElements: false,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: false
            // dynamicBullets: true,
            // dynamicMainBullets: 2
            // bulletActiveClass: 'my-bullet-active'
          }
        })
      })
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.swiper {
  margin-top: 5px;
  position: absolute;
  height: 360px;
  width: 570px;
  overflow: hidden;
  @media screen and (min-width: 3000px) {
    height: 720px;
    width: 1140px;
  }

  .swiper-wrapper {
    .swiper-slide {
      img {
        height: 325px;
        width: 100%;
        @media screen and (min-width: 3000px) {
          height: 650px;
        }
      }
    }
  }
}

/deep/ .swiper-pagination {
  position: relative;
  text-align: right;
  // padding-right: 100px;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 30px !important;
  right: 100px !important;
}

.swiper-pagination /deep/ .swiper-pagination-bullet-active {
  background: #4389c9 !important; /* 为了保险，这里在使用!important */
  opacity: 1;
  width: 20px !important;
  height: 20px !important;
}

.swiper-pagination /deep/ .swiper-pagination-bullet {
  background: #234c77;
  opacity: 1;
  margin: 0 4px !important;
  width: 10px !important;
  height: 10px !important;
  @media screen and (min-width: 3000px) {
    margin: 0 8px !important;
    width: 20px !important;
    height: 20px !important;
  }
}
</style>
