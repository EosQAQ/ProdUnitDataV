<template>
  <div class="user-title">
    <a-row>
      <a-col :span="8" style="padding: 5px 0px">
        <span class="text">
          <span style="font-size: 18px">
            {{ dateDay }}
          </span>
          {{ dateYear }}
          {{ dateWeek }}
        </span>
      </a-col>
      <a-col :span="8">
        <div class="title">
          <span class="title-text" style="letter-spacing: 5px"
            >上海电力数字哨兵系统</span
          >
        </div>
      </a-col>
      <a-col :span="6"></a-col>
      <a-col :span="2">
        <svg @click="logout" style="cursor: pointer" t="1725535600646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1463" width="30" height="30"><path d="M733.866667 469.333333l-46.933334-46.933333 59.733334-59.733333L896 512l-149.333333 149.333333-59.733334-64 42.666667-42.666666H512v-85.333334h221.866667zM725.333333 341.333333h-85.333333V256H341.333333v512h298.666667v-85.333333h85.333333v170.666666H256V170.666667h469.333333v170.666666z" fill="#1296db" p-id="1464"></path></svg>
      </a-col>

    </a-row>
    <a-row>
      <a-col :span="9">
        <dv-decoration-10 class="dv-dec-10" />
      </a-col>
      <a-col :span="6">
        <a-row>
          <a-col :span="12">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
          </a-col>
          <!-- <a-col :span="8">
            <dv-decoration-6
              class="dv-dec-6"
              style="margin-top: 45px; height: 8px"
              :reverse="true"
              :color="['#50e3c2', '#67a1e5']"
            />
          </a-col> -->
          <a-col :span="12">
            <dv-decoration-8
              :reverse="true"
              class="dv-dec-8"
              :color="decorationColor"
            />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="9"> <dv-decoration-10 class="dv-dec-10-s" /> </a-col>
    </a-row>
  </div>
</template>

<script>
import { formatTime } from "../utils/index.js";
import {
		logout
	} from '@/api/serve.js'; // 导入 API 函数
export default {
  data() {
    return {
      timing: null,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      decorationColor: ["#568aea", "#0000000"],
    };
  },
  components: {
  },
  mounted() {
    this.timeFn();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    logout(){
      this.$router.push("/");
      logout();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
.user-title {
  position: fixed;
  width: 100%;
}
</style>
