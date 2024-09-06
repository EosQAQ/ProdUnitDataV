<template>
  <div>
    <countTo
      class="text-center"
      :startVal="0"
      :endVal="data"
      :duration="duration"
      :decimals="decimals"
      :suffix="suffix"
    ></countTo>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components: {
    countTo,
  },
  props: {
    duration: {
      type: Number,
      default: 200,
    },
    data: {
      type: Number,
      default: 0,
    },
    decimals: {
      type: Number,
      default: 2,
    },
    suffix: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="sass" scoped>
</style>