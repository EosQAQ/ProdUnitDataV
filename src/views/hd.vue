<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>

      <div v-else class="host-body">
        <Title />
        <div class="swiper">
          <Page4 />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 气电

import drawMixin from "../utils/drawMixin";
import Title from "./title.vue";

import Page4 from "./page4/index.vue";
export default {
  mixins: [drawMixin],
  data() {
    return {
      timing: null,
      loading: true,
      tpage: 1,
      show: 0,
    };
  },
  components: {
    Title,
    Page4,
  },
  mounted() {
    this.cancelLoading();
    // this.timeFn();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.setShow(1);
      }, 6000);
    },
    setShow(v) {
      if (this.show == 3 && v > 0) {
        this.show = 0;
        return;
      }
      if (this.show == 0 && v < 0) {
        this.show = 3;
        return;
      }
      this.show += v;
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    onSwipeLeft(e) {
      // this.setShow(1);
      this.$refs.carousel.next();
    },
    onSwipeRight() {
      //this.setShow(-1);
      this.$refs.carousel.prev();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.swiper {
  height: 100%;
  // border: 1px solid red;
  position: relative;
  top: 30px;
  // .swiper-slide {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   text-align: center;
  //   font-weight: bold;
  // }
}
.dy {
  position: absolute;
  width: 100%;
}
</style>
