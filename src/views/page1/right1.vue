<template>
  <div>
    <dv-border-box-13>
      <div class="page1-right1 text-white">
        <div class="bg-color-black">
          <div class="pt-1 pl-1">
            <!-- sub title -->
            <subTitle
              title="月发电量/上网量"
              unit="单位：万kW·h"
              :lineColor="['#7C4DFF']"
            ></subTitle>

            <a-row class="p-1">
              <a-col :span="12">
                <Number1
                  :data="monthDLRpt_t.fdl"
                  fontColor="#D1C4E9"
                  iconName="icon-yuefadianliang"
                  title="本月发电量"
                />
              </a-col>
              <a-col :span="12">
                <Number1
                  :data="monthDLRpt_t.swdl"
                  fontColor="#D1C4E9"
                  iconName="icon-diqiu"
                  title="本月上网量"
                />
              </a-col>
            </a-row>
            <!-- 图 -->
            <a-row class="p-2">
              <div style="">
                <fdlchart :cdata="cdata" height="200px" />
              </div>
            </a-row>
          </div>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import fdlchart from "../../components/echart/page1/fdl/chart.vue";
import subTitle from "../../components/subTitle/index.vue";
import Number1 from "../../components/number1/index.vue";
import countTo from "vue-count-to";
import { getMonthDLRpt, getMonthDLListRpt } from "../../api/serve";
import { mGetDate } from "../../utils/index";
export default {
  components: {
    fdlchart,
    countTo,
    Number1,
    subTitle,
  },
  data() {
    return {
      timing: null,
      cdata: {
        legendData: ["发电量", "上网量"],
        xData: mGetDate(),
        yData1: [120, 200, 150, 80, 70, 110, 130],
        yData2: [130, 100, 100, 80, 20, 100, 100],
        color: ["#3fb1e3", "#6be6c1"],
      },
      monthDLRpt: {
        gf_fdl: 0,
        gf_swdl: 0,
        hd_fdl: 0,
        hd_swdl: 0,
        fd_fdl: 0,
        fd_swdl: 0,
      },
      monthDLRpt_t: {
        fdl: 0,
        swdl: 0,
      },
    };
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  mounted() {
    this.GetMonthDLRpt();
    this.GetMonthDLListRpt();
    this.timeFn();
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.GetMonthDLRpt();
        this.GetMonthDLListRpt();
      }, 300000); //五分钟300000
    },
    GetMonthDLRpt() {
      getMonthDLRpt().then((res) => {
        //console.log(res.filter((v) => v.kind == "GF"));
        const gf = res.filter((v) => v.kind == "GF");
        this.monthDLRpt.gf_fdl = Number(gf.length > 0 ? gf[0].fdl : 0);
        this.monthDLRpt.gf_swdl = Number(gf.length > 0 ? gf[0].swdl : 0);
        const hd = res.filter((v) => v.kind == "HD");
        this.monthDLRpt.hd_fdl = Number(hd.length > 0 ? hd[0].fdl : 0);
        this.monthDLRpt.hd_swdl = Number(hd.length > 0 ? hd[0].swdl : 0);
        const fd = res.filter((v) => v.kind == "FD");
        this.monthDLRpt.fd_fdl = Number(fd.length > 0 ? fd[0].fdl : 0);
        this.monthDLRpt.fd_swdl = Number(fd.length > 0 ? fd[0].swdl : 0);
        this.monthDLRpt_t.fdl =
          this.monthDLRpt.gf_fdl +
          this.monthDLRpt.hd_fdl +
          this.monthDLRpt.fd_fdl;

        this.monthDLRpt_t.swdl =
          this.monthDLRpt.gf_swdl +
          this.monthDLRpt.hd_swdl +
          this.monthDLRpt.fd_swdl;
      });
    },
    GetMonthDLListRpt() {
      getMonthDLListRpt().then((res) => {
        this.cdata.yData1 = res.map((element) => {
          return [Number(element.rq.substring(8)) + "", Number(element.fdl)];
        });
        this.cdata.yData2 = res.map((element) => {
          return [Number(element.rq.substring(8)) + "", Number(element.swdl)];
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page1-right1 {
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