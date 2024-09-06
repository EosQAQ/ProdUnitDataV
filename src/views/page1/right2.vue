<template>
  <div>
    <dv-border-box-13>
      <div class="page1-right2 text-white">
        <div class="bg-color-black">
          <div class="pt-1 pl-1">
            <!-- sub title -->

            <subTitle
              title="年发电量/上网量"
              unit="单位：万kW·h"
              :lineColor="['#03A9F4']"
            ></subTitle>
            <a-row class="p-1">
              <a-col :span="12">
                <Number1
                  :data="bnfdl"
                  fontColor="#B3E5FC"
                  iconName="icon-nianfadianliang"
                  title="本年发电量"
                />
              </a-col>
              <a-col :span="12">
                <Number1
                  :data="bnswl"
                  fontColor="#B3E5FC"
                  iconName="icon-network"
                  title="本年上网量"
                />
              </a-col>
            </a-row>
            <!-- 图 -->
            <a-row class="p-2">
              <div style="">
                <ZChart :cdata="cdata" height="200px" />
              </div>
            </a-row>
          </div>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import ZChart from "../../components/echart/page1/right1/chart.vue";
import subTitle from "../../components/subTitle/index.vue";
import Number1 from "../../components/number1/index.vue";
import countTo from "vue-count-to";
import { getYearMonthDLListRpt } from "../../api/serve";
export default {
  components: {
    ZChart,
    countTo,
    subTitle,
    Number1,
  },
  data() {
    return {
      timing: null,
      cdata: {
        legendData: ["发电量", "上网量"],
        xData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        yData1: [120, 200, 150, 80, 70, 110, 130],
        yData2: [110, 210, 350, 80, 60, 110, 130],
        color11: "#03A9F4",
        color12: "#03A9F410",
        color21: "#4CAF50",
        color22: "#4CAF5010",
      },
      bnfdl: 0,
      bnswl: 0,
    };
  },
  mounted() {
    this.timeFn();
    this.GetData();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.GetData();
      }, 300000); //五分钟300000
    },
    GetData() {
      this.GetYearMonthDLListRpt();
    },
    GetYearMonthDLListRpt() {
      this.bnfdl = 0;
      this.bnswl = 0;
      getYearMonthDLListRpt().then((res) => {
        this.cdata.yData1 = res.map((element) => {
          return [
            Number(element.rq.substring(5).substring(0, 2)) + "",
            Number(element.fdl),
          ];
        });
        this.cdata.yData2 = res.map((element) => {
          return [
            Number(element.rq.substring(5).substring(0, 2)) + "",
            Number(element.swdl),
          ];
        });
        res.forEach((element) => {
          this.bnfdl += Number(element.fdl);
          this.bnswl += Number(element.swdl);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page1-right2 {
  $box-height: 100%;
  $box-width: 100%;
  //   padding: 5px;
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
  }
}
</style>