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
        seriesName:'',
        seriesData:null
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
						},
						top: '10%',
					},
					// backgroundColor: '#2a3f54',
					tooltip: {
						trigger: 'item',
						textStyle: {
							color: '#fff'
						}
					},
					legend: {
						// bottom: '0',
						textStyle: {
							color: '#fff'
						},
						bottom: '15%',
					},
					series: [{
						name: this.chartOtherOptions.seriesName,
						type: 'pie',
						radius: '50%',
						data: this.chartOtherOptions.seriesData,
						label: {
							color: '#fff',
							show: false, // Hide the lines
						},
						labelLine: {
							show: false, // Hide the lines
						},
						itemStyle: {
							color: (params) => {
								const colors = ['#4facfe', '#38f9d7', '#ff6d50'];
								return colors[params.dataIndex % colors.length];
							}
						},

					}]
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
        // 设置true清空echart缓存
        console.log(newValue,"newValue");
        
        this.setOption();
        console.log(this.options,"this.options");
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
