<template>
  <div>
    <dv-border-box-13>
      <div class="page1-right3 text-white">
        <div class="bg-color-black">
          <div class="pt-1 pl-1">
            <!-- sub title -->

            <subTitle
              title="分类电量占比"
              unit=""
              :lineColor="['#fa709a', '#fee140']"
            ></subTitle>

            <!-- 图 -->
            <a-row class="text-center">
              <a-row class="p-1">
                <a-col :span="2"> </a-col>
                <a-col :span="7"></a-col>
                <a-col :span="8">本月发电量占比</a-col>
                <a-col :span="7">本月上网量占比</a-col>
              </a-row>
              <a-row class="p-1">
                <a-col :span="2">
                  <a-row type="flex" justify="center">
                    <img
                      style="height: 15px; width: 15px"
                      src="../../components/echart/page1/center/img/hd.png"
                    />
                  </a-row>
                </a-col>
                <a-col :span="7">火电</a-col>
                <a-col :span="8" class="fs">{{ monthDLRpt_zb.hd_fdl }}%</a-col>
                <a-col :span="7" class="fs">{{ monthDLRpt_zb.hd_swdl }}%</a-col>
              </a-row>
              <a-row class="p-1">
                <a-col :span="2">
                  <a-row type="flex" justify="center">
                    <img
                      style="height: 15px; width: 15px"
                      src="../../components/echart/page1/center/img/fd.png"
                    />
                  </a-row>
                </a-col>
                <a-col :span="7">风电</a-col>
                <a-col :span="8" class="fs">{{ monthDLRpt_zb.fd_fdl }}%</a-col>
                <a-col :span="7" class="fs">{{ monthDLRpt_zb.fd_swdl }}%</a-col>
              </a-row>
              <a-row class="p-1">
                <a-col :span="2">
                  <a-row type="flex" justify="center">
                    <img
                      style="height: 15px; width: 15px"
                      src="../../components/echart/page1/center/img/gf.png"
                    />
                  </a-row>
                </a-col>
                <a-col :span="7">光伏</a-col>
                <a-col :span="8" class="fs">{{ monthDLRpt_zb.gf_fdl }}%</a-col>
                <a-col :span="7" class="fs">{{ monthDLRpt_zb.gf_swdl }}%</a-col>
              </a-row>
            </a-row>
          </div>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import subTitle from "../../components/subTitle/index.vue";
import { getMonthDLRpt } from "../../api/serve";
export default {
  components: {
    countTo,
    subTitle,
  },
  data() {
    return {
      timing: null,
      monthDLRpt: {
        gf_fdl: 0,
        gf_swdl: 0,
        hd_fdl: 0,
        hd_swdl: 0,
        fd_fdl: 0,
        fd_swdl: 0,
      },
      monthDLRpt_zb: {
        gf_fdl: 0,
        gf_swdl: 0,
        hd_fdl: 0,
        hd_swdl: 0,
        fd_fdl: 0,
        fd_swdl: 0,
      },
    };
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  mounted() {
    this.GetMonthDLRpt();
    this.timeFn();
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.GetMonthDLRpt();
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
        const fdl_t =
          this.monthDLRpt.gf_fdl +
          this.monthDLRpt.hd_fdl +
          this.monthDLRpt.fd_fdl;
        this.monthDLRpt_zb.gf_fdl = Number(
          ((this.monthDLRpt.gf_fdl / fdl_t) * 100).toFixed(0)
        );
        this.monthDLRpt_zb.hd_fdl = Number(
          ((this.monthDLRpt.hd_fdl / fdl_t) * 100).toFixed(0)
        );
        this.monthDLRpt_zb.fd_fdl = Number(
          ((this.monthDLRpt.fd_fdl / fdl_t) * 100).toFixed(0)
        );

        const fswdl_t =
          this.monthDLRpt.gf_swdl +
          this.monthDLRpt.hd_swdl +
          this.monthDLRpt.fd_swdl;
        this.monthDLRpt_zb.gf_swdl = Number(
          ((this.monthDLRpt.gf_swdl / fswdl_t) * 100).toFixed(0)
        );
        this.monthDLRpt_zb.hd_swdl = Number(
          ((this.monthDLRpt.hd_swdl / fswdl_t) * 100).toFixed(0)
        );
        this.monthDLRpt_zb.fd_swdl = Number(
          ((this.monthDLRpt.fd_swdl / fswdl_t) * 100).toFixed(0)
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page1-right3 {
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
  .bjsj {
    background-color: #fa70993f;
    border-left: 2px solid #fa709a;
    border-right: 2px solid #fa709a;
  }
  .fs {
    font-size: 18px;
  }
}
</style>