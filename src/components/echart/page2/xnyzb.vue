<template>
  <Echart
    :options="options"
    id="page2xnyzb"
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
            trigger: "item",
          },
          //   grid: {
          //     x: "8%",
          //     width: "90%",
          //     y: "4%",
          //     height: "80%",
          //   },
          //   xAxis: {
          //     type: "category",
          //     data: newData.xData,
          //   },
          //   yAxis: {
          //     type: "value",
          //   },
          series: [
            {
              // data: [
              //   { value: 1048, name: "Search Engine" },
              //   { value: 735, name: "Direct" },
              //   { value: 580, name: "Email" },
              //   { value: 484, name: "Union Ads" },
              //   { value: 300, name: "Video Ads" },
              // ],
              data: newData.Data,
              type: "pie",
              radius: ["40%", "70%"],
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
