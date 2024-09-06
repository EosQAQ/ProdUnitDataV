<template>
  <div>
    <div class="text-center" style="font-size: 16px">{{ title }}</div>
    <div class="p-1 text-center">{{ subTitle }}</div>
    <a-row type="flex" justify="center">
      <div class="controller">
        <img v-if="imgType == 1" src="../../assets/img/hl.png" alt="" />
        <img v-if="imgType == 2" src="../../assets/img/hlb.png" alt="" />
        <img v-if="imgType == 3" src="../../assets/img/sy.png" alt="" />
        <img v-if="imgType == 4" src="../../assets/img/syb.png" alt="" />
        <img v-if="imgType == 5" src="../../assets/img/02.png" alt="" />
        <img v-if="imgType == 6" src="../../assets/img/03.png" alt="" />
      </div>

      <div class="pt-3">
        <img
          v-if="imgType == 1 || imgType == 3"
          src="../../assets/img/ldyp.png"
          style="width: 50px; height: 50px"
          alt=""
        />
        <img
          v-if="imgType == 2 || imgType == 4"
          src="../../assets/img/hdyp.png"
          style="width: 50px; height: 50px"
          alt=""
        />
        <img
          v-if="imgType == 5 || imgType == 6"
          src="../../assets/img/01.png"
          style="width: 50px; height: 50px"
          alt=""
        />
      </div>
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
    subTitle: {
      type: Number,
      default: 1,
    },
    imgType: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.controller {
  position: absolute;
  width: 50px;
  height: 50px;
  -webkit-animation: bounce-down 1.5s linear infinite;
  animation: bounce-down 1.5s linear infinite;

  img {
    position: absolute;
    width: 50px;
    height: 50px;
    color: rgba(255, 255, 255, 0);
  }
}

@-webkit-keyframes bounce-down {
  25% {
    -webkit-transform: translateY(-4px);
  }
  50%,
  100% {
    -webkit-transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(4px);
  }
}

@keyframes bounce-down {
  25% {
    transform: translateY(-4px);
  }
  50%,
  100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(4px);
  }
}
</style>