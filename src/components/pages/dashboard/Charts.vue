<style scoped></style>

<template>
<div class="flex text-sm sm:text-base">
  <Navigation ref="nav" />
</div>
  
<div class="w-full overflow-x-auto">
  <div class="flex flex-col gap-4 items-center">
    <div id="chart_roles"></div>
    <div id="chart_prices"></div>
    <div id="chart_sales"></div>
  </div>
</div>
</template>

<script>
import { inject } from 'vue'
import Navigation from '@/components/pages/dashboard/templates/Navigation.vue'

import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  GridComponent,
  TransformComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent
} from 'echarts/components'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  DatasetComponent,
  GridComponent,
  TransformComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  PieChart,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

// https://echarts.apache.org/examples/en/index.html#chart-type-line
export default {
  name: 'D_Charts',
  components: {
    Navigation,
  },
  // data() {
  //   return {
  //     roles: Array(),
  //   }
  // },
  setup() {
    const toast = inject('createToast')

    return { toast }
  },
  mounted() {
    this.$refs.nav.data = ['Диаграммы']
    this.InitChartRoles()
    this.InitChartPrices()
    this.InitChartSales()
  },
  methods: {
    InitChartRoles() {
      let d = [];
      this.ax.get('chart/roles')
        .then(r => {
          let p = r.data.data
          p.forEach(pd => d.push({value: pd.count, name: pd.rolename}))

          var myChart = echarts.init(document.getElementById('chart_roles'), null, {
            width: 600,
            height: 400,
          })

          // Draw the chart
          myChart.setOption({
            title: {
              text: 'Users roles',
              subtext: '',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'horizontal',
              top: 'bottom'
            },
            toolbox: {
              feature: {
                restore: {},
                saveAsImage: {}
              }
            },
            series: [
              {
                name: '',
                type: 'pie',
                radius: '50%',
                data: d,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }).catch(e => this.toast(e.response.data.message, 'error'))
    },
    InitChartPrices() {
      let d = [];
      this.ax.get('chart/prices')
        .then(r => {
          let p = r.data.data
          p.forEach(pd => d.push({count: pd.count, price: '$' + pd.price}))


          var myChart = echarts.init(document.getElementById('chart_prices'), null, {
            width: 600,
            height: 400,
          })

          // Draw the chart
          myChart.setOption({
            title: {
              text: 'Goods prices',
              subtext: '',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              axisLabel: { interval: 0, rotate: 0 }
            },
            yAxis: {},
            series: {
              type: 'bar',
              encode: { x: 'name', y: 'count' },
              datasetIndex: 1
            },
            tooltip: {
              trigger: 'item'
            },
            toolbox: {
              feature: {
                restore: {},
                saveAsImage: {}
              }
            },
            // legend: {
            //   orient: 'horizontal',
            //   top: 'bottom'
            // },
            dataset: [
              {
                dimensions: ['count', 'price'],
                source: p,
              },
              {
                transform: {
                  type: 'sort',
                  config: { dimension: 'price', order: 'asc' }
                }
              }
            ],
          })
        }).catch(e => this.toast(e.response.data.message, 'error'))
    },
    InitChartSales() {
      let d = [], dates = [], avg_prices = [], counts = []

      this.ax.get('chart/sales')
        .then(r => {
          let p = r.data.data
          
          p.forEach(pd => {
            dates.push(pd.date)
            avg_prices.push(parseInt(pd.avg_price))
            counts.push(pd.count)
          })

          d.push({
            name: 'Avg_prices',
            type: 'line',
            data: avg_prices
          }, {
            name: 'Counts',
            type: 'line',
            data: counts
          })


          var myChart = echarts.init(document.getElementById('chart_sales'), null, {
            width: 600,
            height: 400,
          })

          myChart.setOption({
            title: {
              text: 'Sales by dates',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: dates
            },
            yAxis: {},
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Counts', 'Avg_prices'],
              top: 'bottom'
            },
            grid: {
              left: '10%',
              right: '10%',
              bottom: '10%',
              containLabel: true
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            series: d
          })
        }).catch(e => this.toast(e.response.data.message, 'error'))
    },
  }
}
</script>
