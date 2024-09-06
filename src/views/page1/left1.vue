<template>
  <div class="page1-left1">
    <div class="bg-color-black">
      <div class="pt-1 pl-1">
        <a-row>
          <a-col :span="6" class="lz pl-4">
            <svg
              t="1655004472546"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1284"
              width="70"
              height="70"
            >
              <path
                d="M788 295.1c-35.8-35.8-77.6-63.8-124.1-83.5-48.2-20.3-99.3-30.6-152-30.6s-103.8 10.3-152 30.6c-46.5 19.6-88.2 47.7-124.1 83.5-35.8 35.8-64 77.4-83.7 123.8-20.4 48-30.7 99-30.7 151.6s10.3 103.6 30.7 151.6c19.7 46.4 47.8 88 83.7 123.8 35.8 35.8 77.6 63.8 124.1 83.5 48.2 20.3 99.3 30.6 152 30.6s103.8-10.3 152-30.6c46.5-19.6 88.2-47.7 124.1-83.5 35.8-35.8 64-77.4 83.7-123.8 20.4-48 30.7-99 30.7-151.6S892.1 467 871.7 418.9c-19.7-46.4-47.8-88-83.7-123.8zM512 896.2c-180 0-326.4-146.1-326.4-325.6S332 244.9 512 244.9 838.4 391 838.4 570.5 692 896.2 512 896.2z"
                fill="#ffffff"
                p-id="1285"
              ></path>
              <path
                d="M511.9 423h-64v240.5h238.9v-63.8H511.9zM810.7 64c-67.2 0-124 44.3-142.8 105.2 88.3 34.2 162.6 96.5 211.6 176C927.3 320.4 960 270.5 960 213c0-82.3-66.8-149-149.3-149zM356.1 169.2C337.4 108.3 280.5 64 213.3 64 130.9 64 64 130.7 64 213c0 57.5 32.7 107.4 80.5 132.2 49-79.5 123.3-141.8 211.6-176z"
                fill="#ffffff"
                p-id="1286"
              ></path>
            </svg>
            <!-- <icon name="clock"  style="fill: #fff"></icon> -->
          </a-col>
          <a-col :span="18">
            <a-row class="p-1">
              <a-col :span="18" class="t-s">连续安全生产天数</a-col>
              <!-- <a-col :span="6">
                <a-tag color="#2db7f5">第{{ week }}周</a-tag>
              </a-col> -->
            </a-row>
            <a-row class="p-1 text-white t-r">
              <span class="suzi1">{{ days }}</span>
              <span class="wz mr-4">天</span>
              <!-- <span class="suzi2">{{ hours }}</span>
              <span class="wz mr-4">时</span>
              <span class="suzi3">{{ minutes }}</span>
              <span class="wz mr-4">分</span>
              <span class="suzi4">{{ seconds }}</span>
              <span class="wz mr-4">秒</span> -->
            </a-row>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { safeDays,getAqscts } from "../../api/serve";
export default {
  data() {
    return {
      timing: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      week: null,
    };
  },
  mounted() {
    //this.timeDifference();
    this.GetSafeDays();
  },
  beforeDestroy() {
    // clearInterval(this.timing);
  },
  methods: {
    GetSafeDays() {
      getAqscts().then((res) => {
        // this.days = res.safeDays;
		console.log(res,'res')
		this.days = res.data.result;
      });
    },
    timeDifference() {
      this.timing = setInterval(() => {
        var date1 = "2022/01/01 00:00:00"; //开始时间
        var date2 = new Date(); //结束时间
        var date3 = date2.getTime() - new Date(date1).getTime(); //时间差的毫秒数
        //计算出相差天数
        this.days = Math.floor(date3 / (24 * 3600 * 1000));
        //计算出⼩时数
        var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        this.hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算⼩时数后剩余的毫秒数
        this.minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        this.seconds = Math.round(leave3 / 1000);
        //周
        this.week = parseInt(Math.floor(date3) / 1000 / 60 / 60 / 24 / 7);
      }, 1000);
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      // debugger;
      var l = window.location.hash.split("?");
      if (l.length <= 1) return null;
      var r = l[1].match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.page1-left1 {
  $box-height: 100%;
  $box-width: 100%;
  padding: 5px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.09);
  }
  .suzi1 {
    font-size: 28px;
    letter-spacing: 12px;
    color: #03ff03;
    font-weight: 500;
    font-family: DS-Digital;
  }
  .suzi2,
  .suzi3,
  .suzi4 {
    font-size: 18px;
  }
  .icon {
    font-size: 18px;
  }
  .t-s {
    font-size: 16px;
    color: #fff;
  }
  .wz {
    padding-left: 10px;
    font-size: 14px;
  }
  .t-r {
    text-align: right;
  }
}
</style>