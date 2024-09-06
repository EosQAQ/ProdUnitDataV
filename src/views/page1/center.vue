<template>
  <div class="m-5">
    <!-- <div><span>世界</span>/<span>中国</span>/<span>上海</span></div> -->
    <div style="height: 50px"></div>

    <div>
      <mapChart />
    </div>
    <div class="gq-w">
      <div class="gq"></div>
    </div>
  </div>
</template>

<script>
import mapChart from "../../components/echart/page1/center/index.vue";
export default {
  components: {
    mapChart,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.gq-w {
  position: relative;
}
.gq {
  background-image: url("../../assets/img/gq.png");
  width: 100%;
  height: 1073px;
  position: absolute;
  top: -782px;
  z-index: -10;
  background-size: cover;
  background-position: center center;
}
</style>