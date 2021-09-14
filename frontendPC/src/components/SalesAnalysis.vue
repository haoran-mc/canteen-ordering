<template>
  <div id="main" style="width: 70%; height:80%; margin-left: 15%; margin-top: 5%;"></div>
</template>

<script>
  const echarts = require('echarts')

  export default {
    data () {
      return {
        list: {}
      }
    },
    created () {
      this.getSalesAnalysis()
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      // 获取数据
      getSalesAnalysis () {
        this.$http.get("/salesAnalysis").then(res => {
          /* console.log(res) */
          this.list = res.data
        })
        console.log(this.list)
      },
      // 画折线图
      drawLine () {
        // 获取dom元素
        this.char = echarts.init(document.getElementById('main'))
        this.char.setOption({
          title: {
            text: '销量折线图',
            // 主标题内容样式
            textStyle: {
              color: '#3398DB'
            },
            // 标题位置,图形是放在一个dom中,因此用padding属性来定位
            padding: [0, 0, 100, 100]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: { backgroundColor: '#6a7985' }
            }
          },
          legend: {
            data: ['总销量', '堂食', '外卖']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          // 横坐标
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['最近第七天', '最近第六天', '最近第五天', '最近第四天', '最近第三天', '最近第二天', '最近第一天']
            }
          ],
          // 纵坐标
          yAxis: [
            {
              type: 'value'
            }
          ],
          order: [],
          series: [
            {
              name: '外卖',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: []
            },
            {
              name: '堂食',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: []
            },
            {
              name: '总销量',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: this.list.sum
            }
          ]
        })
        this.$http.get('http://localhost:8003/CanteenPC/salesAnalysis').then((res) => {
          this.list = res.data
          this.char.setOption({
            series: [
              {
                name: '外卖',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: this.list.takeOut
              },
              {
                name: '堂食',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: this.list.canteen
              },
              {
                name: '总销量',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: this.list.sum
              }
            ]
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
