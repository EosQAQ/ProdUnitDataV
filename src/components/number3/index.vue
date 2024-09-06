<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col :span="14">
      <span>
        <!-- <svg
          :v-if="img == 1"
          t="1655023155392"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="73943"
          :width="iconHeight"
          :height="iconHeight"
        >
          <path
            d="M512 960c49.6 0 88-38.4 88-88H424c0 49.6 38.4 88 88 88z m288.8-286.4V444.8c0-137.6-97.6-252.8-224.8-283.2v-28.8c0-32-17.6-60.8-48-67.2-44-10.4-80 23.2-80 66.4v30.4C320.8 192 223.2 307.2 223.2 444.8v228.8L136 763.2v44.8h752v-44.8l-87.2-89.6z"
            p-id="73944"
            :fill="fontColor"
          ></path>
        </svg> -->
        <span
          :style="{ color: fontColor, fontSize: iconSize }"
          :class="'iconfont ' + iconName"
        ></span>
      </span>
      <span class="" :style="{ color: fontColor }"> {{ title }} </span>
    </a-col>
    <a-col
      :span="10"
      class="text-center"
      :style="{ color: fontColor, fontSize: '24px' }"
    >
      <countTo
        :startVal="0"
        :endVal="data"
        :duration="duration"
        :decimals="2"
      ></countTo>
    </a-col>
  </a-row>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components: {
    countTo,
  },
  props: {
    data: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    fontColor: {
      type: String,
      default: "#fff",
    },
    iconHeight: {
      type: String,
      default: "17",
    },
    iconSize: {
      type: String,
      default: "17px",
    },
    iconName: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 200,
    },
  },
  watch: {
    data: {
      handler(newData) {
        this.data = newData;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
