<template>
  <div>
    <a-row>
      <a-row>
        <a-col :span="18" class="sub-title"> {{ title }} </a-col>
        <a-col :span="6" class="px-2 sub-title-unit">{{ unit }} </a-col>
      </a-row>
      <a-row class="py-1">
        <dv-decoration-2 style="width: 100%; height: 5px" :color="lineColor" />
      </a-row>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    lineColor: {
      type: Array,
      default: () => ["#667eea", "#764ba2"],
    },
  },
};
</script>
<style lang="scss" scoped>
.sub-title-unit {
  text-align: right;
}
</style>