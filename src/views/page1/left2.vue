<template>
  <div>
    <dv-border-box-13>
      <div class="page1-left2 text-white">
        <div class="bg-color-black">
          <div class="pt-1 pl-1">
            <subTitle
              title="实时负荷"
              unit="单位：MW"
              :lineColor="['#fda085', '#f6d365']"
            ></subTitle>

            <a-row class="p-2">
              <a-col :span="12">
                <dv-water-level-pond
                  class="dvwalepo"
                  style="width: 160px; height: 160px"
                  :config="water"
                />
              </a-col>
              <a-col :span="12" class="p-2">
                <div class="py-2">设备总数</div>
                <div class="s-value py-2">
                  <countTo
                    :startVal="0"
                    :endVal="132213"
                    :duration="3000"
                  ></countTo>
                  <!-- <dv-digital-flop :config="config0" style="height: 55px" /> -->
                </div>
                <div class="py-1 mt-2">
                  <div class="fk pl-1">
                    <div class="py-1 pl-1 fk-nr">在线率 22%</div>
                  </div>
                </div>
              </a-col>
            </a-row>
            <a-row class="p-2">
              <a-col :span="12">
                <a-row>
                  <a-col :span="10" class="pl-1">
                    <div class="sjbk">
                      <svg
                        t="1655016164709"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="13162"
                        width="50"
                        height="50"
                      >
                        <path
                          d="M112 672c132.544 0 240 107.456 240 240 0 15.904-1.552 31.6-4.608 46.976l-0.224 1.024h-65.6l1.856-7.888c3.04-13.04 4.576-26.464 4.576-40.112 0-97.2-78.8-176-176-176-11.328 0-22.512 1.072-33.44 3.168l-6.512 1.376-8.048 1.872v-65.6l1.2-0.256C80.512 673.536 96.16 672 112 672z m0-160c220.912 0 400 179.088 400 400 0 13.856-0.704 27.616-2.112 41.28l-0.784 6.72h-64.48l0.608-4.688A339.52 339.52 0 0 0 448 912c0-185.568-150.432-336-336-336-11.616 0-23.152 0.592-34.592 1.76l-8.544 0.976L64 579.36v-64.48l6.912-0.8C84.512 512.704 98.208 512 112 512z m0-192c326.96 0 592 265.04 592 592 0 12.544-0.384 25.056-1.168 37.504l-0.768 10.496h-64.208l0.288-3.408c1.232-14.768 1.856-29.632 1.856-44.592 0-291.6-236.4-528-528-528-11.2 0-22.352 0.352-33.44 1.04l-11.088 0.8-3.472 0.288v-64.192l10.56-0.768A600.56 600.56 0 0 1 112 320z"
                          fill="#ffffff"
                          p-id="13163"
                        ></path>
                        <path
                          d="M950.64 97.344a31.888 31.888 0 0 1 0 45.12L702.112 390.688a31.84 31.84 0 0 1-18.72 9.12L680.8 400h-2.576a31.856 31.856 0 0 1-21.296-9.328l-0.048-0.032-135.52-135.36a31.888 31.888 0 0 1 0-45.12c12.48-12.464 32.704-12.464 45.184 0l112.96 112.816L905.456 97.344c12.48-12.464 32.704-12.464 45.184 0z"
                          fill="#ffffff"
                          p-id="13164"
                        ></path>
                      </svg>
                    </div>
                  </a-col>
                  <a-col :span="14">
                    <div>在线数</div>
                    <div class="py-2" style="font-size: 24px; color: #f6d365">
                      <countTo
                        :startVal="0"
                        :endVal="123112"
                        :duration="3000"
                      ></countTo>
                      <!-- <dv-digital-flop :config="config1" style="height: 55px" /> -->
                    </div>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="12">
                <a-row>
                  <a-col :span="10" class="pl-1">
                    <div class="sjbk">
                      <svg
                        t="1655015664502"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="23315"
                        width="50"
                        height="50"
                      >
                        <path
                          d="M256.6656 240.0256l-16.64 16.64c-74.24 74.24-74.24 195.072 0 269.312l85.0432 85.0432c4.8128 4.8128 11.3152 7.5264 18.1248 7.5264s13.312-2.7136 18.1248-7.5264l57.088-57.088a25.61536 25.61536 0 0 0 0-36.1984 25.61536 25.61536 0 0 0-36.1984 0l-38.9632 38.9632-67.0208-66.9696c-54.272-54.272-54.272-142.592 0-196.864l16.64-16.64c54.272-54.272 142.592-54.272 196.864 0l66.9696 66.9184-37.7344 37.7344a25.61536 25.61536 0 0 0 0 36.1984 25.61536 25.61536 0 0 0 36.1984 0l55.808-55.808c4.8128-4.8128 7.5264-11.3152 7.5264-18.1248s-2.7136-13.312-7.5264-18.1248l-85.0432-85.0432c-74.24-74.1888-195.0208-74.24-269.2608 0.0512zM662.7328 412.9792l-55.808 55.808a25.61536 25.61536 0 0 0 0 36.1984 25.61536 25.61536 0 0 0 36.1984 0l37.7344-37.7344 66.9696 66.9184c54.272 54.272 54.272 142.592 0 196.864l-16.64 16.64c-54.272 54.272-142.592 54.272-196.864 0l-66.9184-66.9696 38.9632-38.9632a25.61536 25.61536 0 0 0 0-36.1984 25.61536 25.61536 0 0 0-36.1984 0l-57.088 57.088c-4.8128 4.8128-7.4752 11.3152-7.4752 18.1248s2.7136 13.312 7.4752 18.1248l85.0432 85.0432c37.12 37.12 85.8624 55.7056 134.656 55.7056 48.7424 0 97.536-18.5856 134.656-55.7056l16.64-16.64c74.24-74.24 74.24-195.072 0-269.312l-85.0432-85.0432c-10.0864-9.9328-26.3168-9.9328-36.3008 0.0512z"
                          p-id="23316"
                          fill="#ffffff"
                        ></path>
                        <path
                          d="M646.656 646.656a25.61536 25.61536 0 0 0 0-36.1984L413.5936 377.344a25.61536 25.61536 0 0 0-36.1984 0 25.61536 25.61536 0 0 0 0 36.1984l233.0624 233.0624a25.5488 25.5488 0 0 0 18.1248 7.5264c6.5024 0 13.056-2.4576 18.0736-7.4752zM686.8992 296.0384l18.5344-69.2736c3.6352-13.6704-4.4544-27.6992-18.1248-31.3856-13.6704-3.6352-27.6992 4.4544-31.3856 18.1248l-18.5344 69.2736c-3.6352 13.6704 4.4544 27.6992 18.1248 31.3856 13.6704 3.6864 27.6992-4.4544 31.3856-18.1248zM797.184 318.5664l-69.2736 18.5344c-13.6704 3.6352-21.76 17.7152-18.1248 31.3856s17.7152 21.76 31.3856 18.1248l69.2736-18.5344c13.6704-3.6352 21.76-17.7152 18.1248-31.3856a25.66144 25.66144 0 0 0-31.3856-18.1248zM282.8288 637.3888l-69.2736 18.5344c-13.6704 3.6352-21.76 17.7152-18.1248 31.3856s17.7152 21.76 31.3856 18.1248l69.2736-18.5344c13.6704-3.6352 21.76-17.7152 18.1248-31.3856a25.68704 25.68704 0 0 0-31.3856-18.1248zM337.1008 727.9616l-18.5344 69.2736c-3.6352 13.6704 4.4544 27.6992 18.1248 31.3856 13.6704 3.6352 27.6992-4.4544 31.3856-18.1248l18.5344-69.2736c3.6352-13.6704-4.4544-27.6992-18.1248-31.3856-13.6704-3.6864-27.6992 4.4544-31.3856 18.1248z"
                          p-id="23317"
                          fill="#ffffff"
                        ></path>
                      </svg>
                    </div>
                  </a-col>
                  <a-col :span="14">
                    <div>离线数</div>
                    <div class="py-2" style="font-size: 24px">
                      <countTo
                        :startVal="0"
                        :endVal="11111"
                        :duration="3000"
                      ></countTo>
                      <!-- <dv-digital-flop :config="config2" style="height: 55px" /> -->
                    </div>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import { toThousands, formatter } from "../../utils/index";
import subTitle from "../../components/subTitle/index.vue";
import countTo from "vue-count-to";
export default {
  components: {
    countTo,
    subTitle,
  },
  data() {
    return {
      sbzs: 0,
      water: {
        data: [24, 45],
        shape: "round",
        formatter: "",
        waveNum: 3,
        colors: ["#fda085", "#f6d365"],
      },
    };
  },
  mounted() {
    this.sbzs = toThousands(23123123);
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.page1-left2 {
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
  .s-value {
    font-size: 24px;
    color: #f6d365;
  }
  .fk {
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  }
  .fk-nr {
    border-left: 2px solid rgba(19, 25, 47);
    color: rgba(19, 25, 47);
  }
  .sjbk {
    width: 50px;
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