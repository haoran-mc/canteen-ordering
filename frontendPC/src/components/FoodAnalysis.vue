<template>
  <el-card>
    <div id="main" style=""></div>
  </el-card>
</template>

<script>
  const echarts = require('echarts')

  export default {
    mounted () {
      this.initChart()
    },
    created () {
      this.getFoodAnalysis()
    },
    data () {
      return {
        list: {}
      }
    },
    methods: {
      // 获得数据
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
            axisPointer: {
              type: 'shadow'
            }
          },
          title: {
            text: '菜品销量柱状图',
            textStyle: {
              color: '#333744'
            },
            padding: [10, 0, 0, 100]
          },
          xAxis: [{ type: 'category' }],
          yAxis: [{ type: 'value' }],
          series: [
            {
              name: '销量',
              type: 'bar',
              barWidth: '60%',
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
                data: this.list.name
              }
            ]
          })
        })
      }
    }
  }
</script>

<style scoped>
  #main {
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
