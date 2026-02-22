<template>
  <div>
    <!-- <div class="center-top-row">
      <div class="decorator-line2-left"></div>
      <h2 class="title1">{{ $t('dashboard.centerTitle.text') }}</h2>
      <div class="decorator-line2-right"></div>
    </div> -->
    <div class="center-top-bg">
      <h2 class="title1">{{ $t('dashboard.centerTitle.text') }}</h2>
    </div>
    <div class="video-player-part">
      <worker-player :url="videoUrl" :videos="videoUrls" recordingImage="@/assets/datav/player-default.png" :autoplay="true" :shown="true" />
    </div>
    <div class="center-top-bg center-center">
      <h2 class="title1 title2">{{ '优 秀 数 字 员 工 展 示' }}</h2>
    </div>
    <swiper-chart :BannerList="swiperList" :showType="shoeType"></swiper-chart>
    <!-- <dv-border-box-10 class="pill-department">
      <div class="pill-title">
        <h2>{{ $t('dashboard.departmentAnaTitle.text') }}</h2>
      </div>
      <capsule-chart :config="pillConfig" class="pill-chart" :typeConfig="typeConfig" v-on:barClick="showDetail" v-if="pillConfig.data.length" />

      <div style="display:flex" class="pie">
        <business-type style="flex:1" :typeId="type1" :refresh-interval="refreshInterval" v-on:pieClick="showDetail" />
        <business-type style="flex:1" :typeId="type2" :refresh-interval="refreshInterval" v-on:pieClick="showDetail" />
        <business-type style="flex:1" :typeId="type3" :refresh-interval="refreshInterval" v-on:pieClick="showDetail" />
      </div>
    </dv-border-box-10> -->
  </div>
</template>
<script>
import WorkerPlayer from './WorkerPlayer'
import dashboardApi from '@/api/dashboard'
import dashboardApiDemo from '../mockApi/dashboardApi.js'
import BusinessType from './BusinessType'
import SwiperChart from './SwiperChart'

// import CapsuleChart from '../components/capsuleChart/src/main'
import { forEach } from 'jszip'
import queryId from '@/store/queryId.js'

export default {
  name: 'CentrolComponent',
  components: { WorkerPlayer, BusinessType, SwiperChart },
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    },
    demoMode: {
      type: Boolean,
      default() {
        return true
      }
    },
    shoeType: {
      type: Boolean,
      default() {
        return true
      }
    },
    videoUrl: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      type1: queryId.QUERYSCREENPIE_INTERIOR,
      type2: queryId.QUERYSCREENPIE_PROVINCE,
      type3: queryId.QUERYSCREENPIE_EXTERNAL,
      demoVideoUrl: '',
      pillConfig: {
        data: []
      },
      typeConfig: [],
      videoUrls: [],
      intervalObj: null,
      swiperList: []
    }
  },
  watch: {
    videoUrl: function(val) {
      this.demoVideoUrl = val
    }
  },
  created() {
    // this.loadData()
    this.loadViedos()
    // this.loadColors()
    // setTimeout(() => {
    //   console.log('11111')
    //   this.videoUrls = [
    //     // 'https://res.laiye.com/LaiYeProduction/Video/disseminate.mp4',
    //     // 'https://advertise.gtcloud.cn/xuanchuan/greentown.mp4',
    //     // 'https://video-js.51miz.com/preview/video/00/00/16/58/V-165862-6ED79517.mp4',
    //     // 'https://video-js.51miz.com/preview/video/00/00/16/51/V-165152-BB8DE326.mp4',
    //     // 'https://video-js.51miz.com/preview/video/00/00/16/49/V-164949-135346B1.mp4'
    //   ]
    // }, 11000)

    const that = this
    this.intervalObj = window.setInterval(function() {
      // that.loadData(1)
    }, this.refreshInterval)

    this.demoVideoUrl = this.videoUrl
  },
  beforeDestroy() {
    window.clearInterval(this.intervalObj)
  },
  methods: {
    showDetail(typeId) {
      // console.log('showDetail')
      this.$emit('show', typeId)
    },
    getPillConfig(data) {
      const items = []
      for (var item of data) {
        items.push({ name: item.areaName, value: item.staffCount })
      }
      return {
        data: items,
        colors: ['#7EFFF2', '#4C9CFF', '#8B88FF', '#C6A0FF', '#FFEAAA', '#A5FF99', '#85DCFF', '#7AC852', '#50CEFE'],
        unit: '个',
        showValue: true
      }
    },
    getApi() {
      if (this.demoMode) {
        return dashboardApiDemo
      } else {
        return dashboardApi
      }
    },
    loadViedos() {
      this.getApi()
        .queries(queryId.QUERYSCREEN_PLAYVIDEOLIST)
        .then(resp => {
          if (resp?.data?.query_result?.data) {
            this.videoUrls = []
            this.swiperList = []
            const data = resp?.data?.query_result?.data.rows
            for (let item of data) {
              if (item.fileType == 1) {
                this.videoUrls.push(item.videoName)
              } else if (item.fileType == 2) {
                this.swiperList.push(item.videoName)
              }
            }
          }
          // this.videoUrls = [
          //   // 'https://res.laiye.com/LaiYeProduction/Video/disseminate.mp4',
          //   // 'https://advertise.gtcloud.cn/xuanchuan/greentown.mp4',
          //   // 'https://video-js.51miz.com/preview/video/00/00/16/58/V-165862-6ED79517.mp4',
          //   // 'https://video-js.51miz.com/preview/video/00/00/16/51/V-165152-BB8DE326.mp4',
          //   // 'https://video-js.51miz.com/preview/video/00/00/16/49/V-164949-135346B1.mp4'
          // ]
        })
    },
    loadData() {
      this.getApi()
        .queries(queryId.QUERYSCREEN_BARCHART_AREA_STAFFCOUNT)
        .then(resp => {
          const data = resp?.data?.query_result?.data.rows
          this.pillConfig = this.getPillConfig(data)
        })
    },
    loadColors() {
      this.getApi()
        .queries(queryId.V_TOOLNAME)
        .then(resp => {
          // const data = resp?.data?.query_result?.data.rows
          this.typeConfig = resp?.data?.query_result?.data.rows
        })
    }
  }
}
</script>
<style scoped lang="less">
.center-center {
  margin-top: 10px;
  @media screen and (min-width: 3000px) {
    margin-top: 20px;
  }
}
.pie {
  position: relative;
  top: 220px;
  @media screen and (min-width: 3000px) {
    position: relative;
    top: 420px;
  }
}

.center-top-bg {
  position: relative;
  height: 40px;
  background: url(~@/assets/datav/datav-centet-top-bg.png) no-repeat 50% 50%;
  background-size: cover;
  @media screen and (min-width: 3000px) {
    height: 80px;
  }

  h2.title1 {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #fff;
    line-height: 40px;
    position: absolute;
    left: 208px;
    text-align: center;
    // width: 164px;
    @media screen and (min-width: 3000px) {
      font-size: 42px;
      line-height: 80px;
      left: 416px;
      // width: 328px;
    }
  }

  h2.title2 {
    left: 180px;
    text-align: center;
    // width: 164px;
    @media screen and (min-width: 3000px) {
      font-size: 42px;
      line-height: 80px;
      left: 350px;
      // width: 328px;
    }
  }
}

.center-top-row {
  position: relative;
  height: 20px;
  @media screen and (min-width: 3000px) {
    height: 40px;
  }

  .decorator-line2-left {
    width: 198px;
    height: 8px;
    border-top: 1px solid #1868f5;
    border-bottom: 1px solid #0c2d69;
    position: absolute;
    top: 9px;
    @media screen and (min-width: 3000px) {
      width: 396px;
      height: 16px;
      top: 16px;
    }
  }

  .decorator-line2-right {
    width: 198px;
    height: 8px;
    border-top: 1px solid #1868f5;
    border-bottom: 1px solid #0c2d69;
    position: absolute;
    top: 9px;
    left: 376px;
    @media screen and (min-width: 3000px) {
      width: 396px;
      height: 16px;
      top: 18px;
      left: 752px;
    }
  }

  h2.title1 {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #86a6f7;
    line-height: 20px;
    position: absolute;
    left: 206px;
    text-align: center;
    width: 164px;
    @media screen and (min-width: 3000px) {
      font-size: 40px;
      line-height: 40px;
      left: 412px;
      width: 328px;
    }
  }
}

.video-player-part {
  width: 573px;
  height: 322px;
  // background: #5472b2;
  margin-top: 5px;
  @media screen and (min-width: 3000px) {
    // margin-top: 34px;
    width: 1146px;
    height: 644px;
  }
}

.pill-department {
  // margin-top: 22px;
  width: 573px;
  height: 407px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  box-shadow: 0px 0px 46px 0px #012898;
  @media screen and (min-width: 3000px) {
    // margin-top: 22px;
    width: 1146px;
    height: 814px;
  }
  // border-radius: 14px;
  .pill-chart {
    width: 550px;
    height: 180px;
    position: absolute;
    top: 42px;
    left: 12px;
    @media screen and (min-width: 3000px) {
      width: 1100px;
      height: 360px;
      top: 84px;
      left: 24px;
    }
  }

  .pill-title {
    position: absolute;
    left: 16px;
    top: 12px;
    @media screen and (min-width: 3000px) {
      top: 24px;
      left: 32px;
    }
    h2 {
      color: #8aaafc;
      font-size: 18px;
      @media screen and (min-width: 3000px) {
        font-size: 36px;
      }
      font-weight: bold;
    }
  }
}
.emptymask {
  padding-top: 135px;
}
.emptymask /deep/ .ant-empty-description {
  color: rgba(132, 172, 255, 1);
  font-size: 12px;
  margin-top: -7px;
  @media screen and (min-width: 3000px) {
    font-size: 24px;
  }
}
</style>
