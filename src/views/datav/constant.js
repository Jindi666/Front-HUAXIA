// import enquireJs from 'enquire.js'
import echarts from 'echarts'
import { chartColors, chartColors2 } from './components/chartColors'

export const BAR_CONSTANT_2K = {
  barWidth: '18px'
}

export const BAR_CONSTANT_4K = {
  barWidth: '36px'
}

export function linearColor() {
  let colors = []
  for (let i = 0; i < chartColors.length; i++) {
    colors.push(
      new echarts.graphic.LinearGradient(1, 1, 0, 0, [
        {
          offset: 0,
          color: chartColors[i]
        },
        {
          offset: 0.9,
          color: chartColors2[i]
        }
      ])
    )
  }
  return colors
}
