<template>
  <Echart
    :options="options"
    id="page1fdl"
    :height="height"
    width="100%"
  ></Echart>
</template>

<script>
import Echart from "../../../../common/echart/index.vue";
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
          color: ["#2ec7c9", "#b6a2de"],
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
          legend: {
            data: newData.legendData,
            right: "0",
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
            boundaryGap: false,
            data: newData.xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: newData.legendData[0],
              data: newData.yData1,
              type: "line",
              areaStyle: {
                //color: newData.color1 + "3a",
              },
              showSymbol: false,

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
                      color: "#2ec7c9", // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#2ec7c900", //   0% 处的颜色
                    },
                  ],
                },
              },
            },
            {
              name: newData.legendData[1],
              data: newData.yData2,
              type: "line",
              areaStyle: {
                // color: newData.color2 + "3a",
              },
              showSymbol: false,
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
                      color: "#b6a2de", // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#b6a2de00", //   0% 处的颜色
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
