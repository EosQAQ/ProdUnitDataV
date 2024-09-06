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
      default: () => ({ yData: [] }),
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
            //type: "value",
            boundaryGap: false,
            data: newData.xData,
            axisLabel: {
              showMaxLabel: true,
              interval: newData.interval,
            },
          },
          yAxis: {
            type: "value",
            max: function (value) {
              return parseInt(value.max * 1.5);
            },
          },
          series: newData.yData.map((v, i) => {
            return {
              name: newData.legendData[i],
              data: v,
              type: "line",
              showSymbol: false,
              areaStyle: {
                //color: newData.color2 + "3a",
              },
            };
          }),
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
