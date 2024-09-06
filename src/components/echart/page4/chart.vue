<template>
  <Echart
    :options="options"
    id="centreLeft1Chart"
    :height="height"
    width="100%"
  ></Echart>
</template>

<script>
import Echart from "../../../common/echart/index.vue";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
    height: {
      type: String,
      default: "",
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          color: newData.color,
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.1)",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC",
              },
            },
          },
          grid: {
            // x: "8%",
            // width: "90%",
            // y: "4%",
            // height: "80%",
            left: "1%",
            right: "4%",
            bottom: "1%",
            top: "15%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: newData.xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: newData.yData,
              type: "bar",
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: newData.color[0] },
                  { offset: 1, color: newData.color[0] + "00" },
                ]),
              },
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
