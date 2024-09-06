<template>
  <div>
    <Echart
      id="pageCentreChart"
      ref="pageCentreChart"
      :options="options"
      height="850px"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from "../../../../common/echart/index.vue";
//import { GetMapDataKey, MapData } from "../../../../common/echart/mapData.js";
import MapName from "./mapName";
import { allAreaCode } from "./geoAtlasJson.js";
export default {
  data() {
    return {
      options: {},
      area: "world",
      historyList: [],
      // 全球地域中文映射
      // nameMap: MapName,
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.historyList.push({
          code: 999999,
          name: "world",
        });
        this.chinaConfigure(newData);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    chinaConfigure(newData) {
      const showName = [
        "中国",
        "美国",
        "俄罗斯",
        "英国",
        "法国",
        "日本",
        "印度",
      ];
      let datalist = [];
      let lineData = [];
      if (newData.area == "world") {
        for (var i = 0; i < 10; i++) {
          if (newData.data[i]) {
            datalist.push(newData.data[i]);
          }
        }
      } else if (newData.area == "中国") {
        for (var j = 0; j < newData.data.length - 7; j++) {
          if (newData.data[j]) {
            datalist.push(newData.data[j]);
          }
        }
      } else {
        datalist = newData.data;
      }
      if (newData.area == "world" || newData.area == "中国") {
        lineData = datalist;
      } else {
        lineData.push({
          name: "#false#",
          lng: 121.481923,
          lat: 31.238711,
        });
      }

      // newData.data = datalist;

      this.options = {
        // 提示框组件(可以设置在多种地方)
        tooltip: {
          show: true, //是否显示提示框组件，包括提示框浮层和 axisPointer。
          trigger: "item", //触发类型。item,axis,none
          enterable: true, //鼠标是否可进入提示框浮层中，默认为false，
          showContent: true, //是否显示提示框浮层
          triggerOn: "mousemove", //提示框触发的条件(mousemove|click|none)
          showDelay: 0, //浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
          textStyle: {
            color: "white",
            fontSize: 12,
          },
          padding: [0, 8],
          hideDelay: 10, //浮层隐藏的延迟
          formatter: (o) => {
            if (!o.data) return "";
            if (o.data.type == "lines") return "";
            return `<div class="ant-card ant-card-bordered"  style="width: 200px;"><div class="ant-card-body">${o.name}</div></div>`;
          },
          backgroundColor: "rgba(0, 0, 0, 0)", //提示框浮层的背景颜色。
          alwaysShowContent: true,
          transitionDuration: 1, //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
        },

        //地理坐标系组件。地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
        geo: {
          show: true,
          map: newData.area,
          roam: false,
          center: null,
          // top: 10,
          // left: 15,
          zoom: 1.2,
          //aspectScale: 0.9,
          itemStyle: {
            normal: {
              opacity: 1, //图形透明度 0 - 1
              borderColor: "#0e3c6d", //图形的描边颜色
              borderWidth: 2, //描边线宽。为 0 时无描边。
              borderType: "solid", //柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
              //areaColor: "rgba(11, 28, 63, 0.8)", //图形的颜色 #eee
              // areaColor: "#0063cc", //图形的颜色 #eee
              //  shadowOffsetX: 30, //X轴阴影
              //  shadowOffsetY: -30, //Y轴阴影
              shadowColor: "#105781", //地图区域的阴影颜色。
              shadowOffsetX: 0,
              shadowOffsetY: 10,
            },
          },
        },

        //系列列表。每个系列通过 type(map, scatter, bar, line, gauge, tree.....) 决定自己的图表类型
        series: [
          {
            name: "自定义图标",
            // map: this.area,
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 0,
            silent: "none",
            data: datalist.map((item) => {
              return {
                name: item.name,
                value: [item.lng, item.lat],
              };
            }),
          },
          {
            map: newData.area,
            type: "map",
            zoom: 1.2, //当前视角的缩放比例。
            center: null,
            // aspectScale: 0.9, //这个参数用于 scale 地图的长宽比。geoBoundingRect.width / geoBoundingRect.height * aspectScale
            roam: false, //是否开启鼠标缩放和平移漫游。默认不开启
            nameMap: newData.area == "world" ? MapName : {},
            label: {
              show: false,
              textStyle: {
                color: "white",
                fontSize: 12,
                backgroundColor: "", //文字背景色
              },
            },

            itemStyle: {
              normal: {
                borderColor: "#4b93da", //图形的描边颜色
                borderWidth: 2, //描边线宽。为 0 时无描边。
                borderType: "solid", //柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
                areaColor: "rgba(11, 28, 63)", //图形的颜色 #eee
                shadowBlur: 100, //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: "#133988", //阴影色
                shadowOffsetX: 20, //X轴阴影
                shadowOffsetY: -20, //Y轴阴影

                label: {
                  //show: newData.area != "world",
                  show: true,
                  formatter: (params) =>
                    showName.indexOf(params.name) >= 0 ||
                    newData.area != "world"
                      ? params.name
                      : "",
                  textStyle: {
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 14,
                  },
                },
              },
              //鼠标移入时
              emphasis: {
                label: {
                  color: "#ffffff",
                  show: true,
                  formatter: (params) => params.name,
                },
                borderColor: "#005b89",
                borderWidth: "1",
                areaColor: "#17beed",
                // label: {
                //   show: false,
                //   textStyle: {
                //     color: "yellow",
                //     fontSize: 14,
                //   },
                // },
              },

              effect: {
                show: true,
                shadowBlur: 10,
                loop: true,
              },
            },
          },
          // ...lineData.map((item, index) => {
          //   return {
          //     type: "lines",

          //     coordinateSystem: "geo",
          //     zlevel: 2,
          //     effect: {
          //       show: item.name != "#false#",
          //       period: 8, //箭头指向速度，值越小速度越快
          //       trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          //       // symbol: 'image://./images/airline.png', // 箭头图标
          //       symbol: "arrow",
          //       // symbolSize: [20, 20], //图标大小
          //       symbolSize: 10,
          //       color: "#14be8b", // 图标颜色
          //     },
          //     lineStyle: {
          //       normal: {
          //         show: item.name != "#false#",
          //         width: 2, //尾迹线条宽度
          //         opacity: 0.6, //尾迹线条透明度
          //         curveness: 0.3, //尾迹线条曲直度
          //         color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //           {
          //             offset: 0,
          //             color: "#14be8b", // 0% 处的颜色
          //           },
          //           {
          //             offset: 1,
          //             color: "#3d675b", // 100% 处的颜色
          //           },
          //         ]),
          //       },
          //     },
          //     data: [
          //       {
          //         type: "lines",
          //         fromName: item.name,
          //         toName: "上海",
          //         coords: [
          //           [item.lng, item.lat],
          //           [121.481923, 31.238711],
          //         ],
          //         value: 12,
          //       },
          //     ],
          //   };
          // }),
          // ...newData.data.map((item, index) => {
          //   // 出发点
          //   return {
          //     type: "effectScatter",
          //     coordinateSystem: "geo",
          //     zlevel: 2,
          //     hoverAnimation: true, // 鼠标移动上去后效果
          //     rippleEffect: {
          //       //涟漪特效
          //       period: 8, //动画时间，值越小速度越快
          //       brushType: "stroke", //波纹绘制方式 stroke, fill
          //       scale: 10, //波纹圆环最大限制，值越大波纹越大
          //     },
          //     label: {
          //       normal: {
          //         show: true,
          //         position: "bottom", //显示位置
          //         offset: [6, 6], //偏移设置
          //         color: "#a7b9cd",
          //         formatter: function (params) {
          //           // 圆环显示文字
          //           // return '';
          //           return params.data.name;
          //         },
          //         fontSize: 11,
          //       },
          //       // 高亮时效果
          //       emphasis: {
          //         show: true,
          //         areaColor: "null",
          //       },
          //     },
          //     symbol: "circle",
          //     symbolSize: function (val) {
          //       return 5 + val[2] * 5; // 圆环大小
          //     },
          //     itemStyle: {
          //       normal: {
          //         show: false,
          //         color: "#14be8b",
          //       },
          //     },
          //     data: [{ name: item.name, value: [item.lng, item.lat] }],
          //   };
          // }),
          // 到达点
          // {
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   zlevel: 2,
          //   hoverAnimation: true, // 鼠标移动上去后效果
          //   rippleEffect: {
          //     //涟漪特效
          //     period: 8, //动画时间，值越小速度越快
          //     brushType: "stroke", //波纹绘制方式 stroke, fill
          //     number: 1,
          //     scale: 10, //波纹圆环最大限制，值越大波纹越大
          //   },
          //   label: {
          //     normal: {
          //       show: true,
          //       position: "right", //显示位置
          //       color: "#a7b9cd",
          //       offset: [6, 6], //偏移设置
          //       formatter: function (params) {
          //         // 圆环显示文字
          //         // return '';
          //         return params.data.name;
          //       },
          //       fontSize: 11,
          //     },
          //     // 高亮时效果
          //     emphasis: {
          //       show: true,
          //       areaColor: "null",
          //     },
          //   },
          //   symbol: "circle",
          //   symbolSize: function (val) {
          //     return 2 + val[2] * 5; // 圆环大小
          //   },
          //   itemStyle: {
          //     normal: {
          //       show: false,
          //       color: "#14be8b",
          //     },
          //   },
          //   data: [{ name: "上海", value: [121.481923, 31.238711] }],
          // },
          //自定义图片数组对象[{}, {}...]
          ...datalist.map((item, index) => {
            return {
              type: "scatter",
              coordinateSystem: "geo",
              //自定义图片的 位置（lng, lat）
              data: [
                {
                  type: "img",
                  name: item.name,
                  data: item.data,
                  value: [item.lng, item.lat],
                },
              ],
              //自定义图片的 大小
              symbolSize: [15, 15],
              //自定义图片的 路径(注：必须以image://开头)
              symbol: "image://" + require(`./img/${item.iconName}.png`),
              zlevel: 999,
              z: 999,
            };
          }),
        ],
      };

      //this.chertevent();
    },
  },
  chertevent() {
    this.$nextTick(() => {
      try {
        const map = this.$refs.pageCentreChart.chart;
        const _self = this;

        map.on("georoam", (params) => {
          let options = map.getOption(); //获得option对象
          let series = options.series[1]; //获得option对象

          //console.log(11111, _self.options);
          //console.log(222, options);
          if (params.zoom != null && params.zoom != undefined) {
            //捕捉到缩放时
            options.series[1].zoom = series.zoom;
            options.series[1].center = series.center;
            options.geo.zoom = series.zoom; //下层geo的缩放等级跟着上层的geo一起改变
            options.geo.center = series.center; //下层的geo的中心位置随着上层geo一起改变
          } else {
            //捕捉到拖曳时
            options.series[1].center = series.center;
            options.geo.center = series.center; //下层的geo的中心位置随着上层geo一起改变
          }
          //console.log(11111, _self.options);
          map.setOption(options); //设置option
        });
        // map.on("click", (params) => {
        //   // 当双击事件发生时，清除单击事件，仅响应双击事件
        //   console.log(params);
        //   if (params.seriesType == "scatter") {
        //     if (params.data.data.type == 1) {
        //       this.$router.push("/cjrd");
        //     }
        //     if (params.data.data.type == 2) {
        //       this.$router.push("/xnyhh");
        //     }
        //     if (params.data.data.type == 3) {
        //       this.$router.push("/xnyqh");
        //     }
        //     return;
        //   }
        //   if (params.seriesType != "map") return;
        //   if (
        //     allAreaCode.filter((item) => item.name.indexOf(params.name) > -1)[0]
        //   ) {
        //     let areaCode = allAreaCode.filter(
        //       (item) => item.name.indexOf(params.name) > -1
        //     )[0].code;
        //     console.log(params.name);
        //     _self.options.geo.map = params.name;
        //     _self.options.series[1].map = params.name;
        //     //_self.area = params.name;

        //     _self.historyList.push({
        //       code: areaCode,
        //       name: params.name,
        //     });

        //     let result = [];
        //     let obj = {};
        //     for (let i = 0; i < _self.historyList.length; i++) {
        //       if (!obj[_self.historyList[i].code]) {
        //         result.push(_self.historyList[i]);
        //         obj[_self.historyList[i].code] = true;
        //       }
        //     }
        //     _self.historyList = result;
        //   }
        // });

        // map.getZr().on("click", (params) => {
        //   //console.log(params);
        //   if (params.target || params.target != undefined) return;
        //   // 当双击事件发生时，清除单击事件，仅响应双击事件

        //   if (this.historyList.length == 1) {
        //     // alert("已经到达最上一级地图了");
        //     return;
        //   }
        //   let map = this.historyList.pop();
        //   console.log(this.historyList[this.historyList.length - 1]);
        //   if (this.historyList[this.historyList.length - 1].code == "world") {
        //     this.options.geo.map = "world";
        //     this.options.series[1].map = "world";
        //     this.area = "world";
        //   } else {
        //     // this.area = this.historyList[this.historyList.length - 1].name;

        //     _self.options.geo.map =
        //       this.historyList[this.historyList.length - 1].name;
        //     _self.options.series[1].map =
        //       this.historyList[this.historyList.length - 1].name;
        //   }
        // });
      } catch (error) {
        console.log(error);
      }
    });
  },
};
</script>
