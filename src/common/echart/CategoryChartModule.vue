<template>
  <div :id="id" :class="className" style="height:100%" />
</template>

<script>
import tdTheme from "./theme.json"; // 引入默认主题
export default {
  name: "echart",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "2.5rem",
    },
    chartOtherOptions:{
      type: Object,
      default: () => ({
        titleText:'',
        seriesData:null,
        series:[],
        xAxisData:[],
        xyChange:false
      }),
    }
  },
  data() {
    return {
      chart: null,
      //   注册地图json
      options: {}
    };
  },
  methods:{
    setOption(){
      this.options={
					title: {
						text: this.chartOtherOptions.titleText,
						left: 'center',
						textStyle: {
							color: '#fff'
						}
					},
          legend: {
            right: '20%', // 将图例放置在右侧
          },
          tooltip: {
						trigger: 'axis',
						textStyle: {
							color: '#fff'
						}
					},
					// backgroundColor: '#2a3f54',
					xAxis: {
						type: 'category',
						data: this.chartOtherOptions.xAxisData,//this.chartOtherOptions.seriesData.map(item => item.name),
						axisLabel: {
							color: '#fff'
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}, // X轴线条颜色

					},
					yAxis: {
						type: 'value',
						axisLabel: {
							color: '#fff'
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}, // X轴线条颜色

					},
          series:this.chartOtherOptions.series
				}
    },
    setXYChangeOption(){
      this.options={
					title: {
						text: this.chartOtherOptions.titleText,
						left: 'center',
						textStyle: {
							color: '#fff'
						}
					},
          legend: {
            right: '20%', // 将图例放置在右侧
          },
          tooltip: {
						trigger: 'axis',
						textStyle: {
							color: '#fff'
						}
					},
					// backgroundColor: '#2a3f54',
					yAxis: {
						type: 'category',
						data: this.chartOtherOptions.xAxisData,//this.chartOtherOptions.seriesData.map(item => item.name),
						axisLabel: {
							color: '#fff'
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}, // X轴线条颜色

					},
					xAxis: {
						type: 'value',
						axisLabel: {
							color: '#fff'
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						}, // X轴线条颜色

					},
          series:this.chartOtherOptions.series
				}
    },
    initChart() {
      // 初始化echart
      this.chart = this.$echarts.init(this.$el, "tdTheme");
      this.setOption();
      this.chart.setOption(this.options, true);
    },
  },
  watch: {
    chartOtherOptions: {
      handler(newValue,oldValue) {
        console.log(this.chartOtherOptions.xyChange,"xycahge")
        if(!this.chartOtherOptions.xyChange)
          this.setOption();
        else
          this.setXYChangeOption();
        console.log(this.options,"catetory.this.options");
        this.chart.setOption(this.options, true);
      },
      deep: true,
    },
  },
  mounted() {
    this.$echarts.registerTheme("tdTheme", tdTheme); // 覆盖默认主题
    this.initChart();
  },
  beforeDestroy() {
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style>
</style>
