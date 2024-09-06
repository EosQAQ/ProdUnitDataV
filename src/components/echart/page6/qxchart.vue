<template>
  <Echart :options="options" id="QX" :height="height" width="100%"></Echart>
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
            // backgroundColor: "rgba(255,255,255,0.1)",
            // axisPointer: {
            //   type: "shadow",
            //   label: {
            //     show: true,
            //     backgroundColor: "#7B7DDC",
            //   },
            // },
          },
          grid: {
            left: "1%",
            right: "4%",
            bottom: "1%",
            top: "15%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: newData.xData,
          },
          yAxis: {
            type: "value",
          },
          legend: {
            data: newData.legendData,
            right: "0",
          },
          series: [
            {
              name: newData.legendData[0],
              data: newData.yData,
              showSymbol: false,
              type: "line",
              areaStyle: {},
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: newData.color[0], // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: newData.color[0] + "00", //   0% 处的颜色
                    },
                  ],
                },
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
