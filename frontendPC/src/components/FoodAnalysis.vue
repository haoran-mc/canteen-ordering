<template>
  <div id="main" style="width: 70%; height: 80%; margin-left: 15%; margin-top: 5%;"></div>
</template>

<script>
  const echarts = require('echarts')

  export default {
    name: 'index',
    mounted () {
      this.initChart()
    },
    created () {
      this.getFoodAnalysis()
    },
    data () {
      return {
        list: {},

        a: [],
        name: [],
        num: [],
        table: false,
        dialog: false,
        loading: false,
        drawer: false
      }
    },
    methods: {
      getFoodAnalysis () {
        this.$http.get("foodAnalysis").then(res => {
          this.list = res.data
        })
      },
      initChart () {
        this.char = echarts.init(document.getElementById('main'))
        this.char.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            // 坐标轴指示器，坐标轴触发有效
            axisPointer: {
              // 默认为直线，可选为：'line' | 'shadow'
              type: 'shadow'
            }
          },
          title: {
            text: '菜品销量柱状图',
            // 主标题内容样式
            textStyle: {
              color: '#3398DB'
            },
            // 标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
            padding: [0, 0, 100, 100]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '销量',
              type: 'bar',
              barWidth: '60%',
              data: [],
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        })
        this.$http.get('http://localhost:8003/CanteenPC/foodAnalysis').then((res) => {
          console.log('访问后台')
          this.list = res.data
          console.log(this.list)
          this.char.setOption({
            series: [
              {
                name: '销量',
                type: 'bar',
                barWidth: '60%',
                data: this.list.cnt
              }
            ],
            xAxis: [
              {
                type: 'category',
                data: this.list.name,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ]
          })
        })
        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>
</style>
