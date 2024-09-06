<template>
  <div class="number1">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="8">
        <a-row type="flex" justify="center" align="middle">
          <div
            class="sjbk"
            :style="{
              height: iconHeight,
              width: iconHeight,
              textAlign: 'center',
            }"
          >
            <a-row
              class="w-100 h-100"
              type="flex"
              justify="center"
              align="middle"
            >
              <div>
                <span
                  :style="{
                    color: iconColor,
                    fontSize: iconSize,
                    lineHeight: iconHeight,
                  }"
                  :class="'iconfont ' + iconName"
                ></span>
              </div>
            </a-row>
          </div>
        </a-row>
      </a-col>
      <a-col :span="16">
        <div>{{ title }}</div>
        <div :style="{ fontSize: '20px', color: fontColor }">
          <countTo
            :startVal="0"
            :endVal="data"
            :duration="duration"
            :decimals="2"
            :suffix="suffix"
          ></countTo>
        </div>
      </a-col>
    </a-row>
  </div>
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
    iconName: {
      type: String,
      default: "",
    },
    fontColor: {
      type: String,
      default: "#fff",
    },
    iconColor: {
      type: String,
      default: "#fff",
    },
    iconHeight: {
      type: String,
      default: "50px",
    },
    iconSize: {
      type: String,
      default: "35px",
    },
    duration: {
      type: Number,
      default: 200,
    },
    suffix: {
      type: String,
      default: "",
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
.number1 {
  .sjbk {
    background: linear-gradient(to left, rgb(255, 255, 255), rgb(255, 255, 255))
        left top no-repeat,
      linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255)) left
        top no-repeat,
      linear-gradient(to left, rgb(255, 255, 255), rgb(255, 255, 255)) right top
        no-repeat,
      linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255)) right
        top no-repeat,
      linear-gradient(to left, rgb(255, 255, 255), rgb(255, 255, 255)) left
        bottom no-repeat,
      linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255)) left
        bottom no-repeat,
      linear-gradient(to left, rgb(255, 255, 255), rgb(255, 255, 255)) right
        bottom no-repeat,
      linear-gradient(to left, rgb(255, 255, 255), rgb(255, 255, 255)) right
        bottom no-repeat;
    /*设置大小*/
    background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px,
      1px 10px, 10px 1px;
  }
}
</style>
