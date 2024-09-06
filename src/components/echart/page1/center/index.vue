<template>
	<div style="">
		<Chart :cdata="cdata" ref="page1index" />
	</div>
</template>

<script>
	import Chart from "./chart.vue";
	import {
		allAreaCode
	} from "./geoAtlasJson.js";
	export default {
		data() {
			return {
				historyList: [{
					code: 999999,
					name: "world",
				}, ],
				cdata: {
					area: "world",
					data: [],
				},
			};
		},
		components: {
			Chart,
		},
		mounted() {
			const dl = [];
			console.log(this.$czinfo);
			for (let index = 0; index < this.$czinfo.length; index++) {
				const element = this.$czinfo[index];
				dl.push({
					iconName: element.type,
					lng: element.wd,
					lat: element.jd,
					name: element.dzmc,
					data: {
						type: 2,
						...element,
					},
				});
			}

			this.cdata.data = dl;
			this.$nextTick(() => {
				try {
					const map = this.$refs.page1index.$refs.pageCentreChart.chart;
					const _self = this;
					// console.log(map);
					// map.on("georoam", (params) => {
					// let series = map.getOption().series[1]; //获得option对象
					// let options = _self.options; //获得option对象
					// //console.log(11111, _self.options);
					// //console.log(222, options);
					// if (params.zoom != null && params.zoom != undefined) {
					//   //捕捉到缩放时
					//   options.series[1].zoom = series.zoom;
					//   options.series[1].center = series.center;
					//   options.geo.zoom = series.zoom; //下层geo的缩放等级跟着上层的geo一起改变
					//   options.geo.center = series.center; //下层的geo的中心位置随着上层geo一起改变
					// } else {
					//   //捕捉到拖曳时
					//   options.series[1].center = series.center;
					//   options.geo.center = series.center; //下层的geo的中心位置随着上层geo一起改变
					// }
					//console.log(11111, _self.options);
					//map.setOption(option); //设置option
					// });
					map.on("click", (params) => {
						// 当双击事件发生时，清除单击事件，仅响应双击事件
						console.log(params, 'params');
						// if (params.name == "中国") {
						// 	if (this.$route.path !== '/page7') {
						// 		
						// 	}
						// }
						if (params.seriesType == "scatter") {
							this.$store.commit("setSelectedDwmc", params.data.data.dzmc );
							this.$store.commit("setSelectedOrgType", "102" );
							//this.$router.push({ path: '/page7', query: { dwmc: params.data.data.dzmc } });
							return;
						}
						if (params.seriesType != "map") return;
						if (
							allAreaCode.filter((item) => item.name.indexOf(params.name) > -1)[0]
						) {
							let areaCode = allAreaCode.filter(
								(item) => item.name.indexOf(params.name) > -1
							)[0].code;
							// console.log(params.name);
							_self.cdata.area = params.name;
							// _self.options.series[1].map = params.name;
							//_self.area = params.name;

							_self.historyList.push({
								code: areaCode,
								name: params.name,
							});

							let result = [];
							let obj = {};
							for (let i = 0; i < _self.historyList.length; i++) {
								if (!obj[_self.historyList[i].code]) {
									result.push(_self.historyList[i]);
									obj[_self.historyList[i].code] = true;
								}
							}
							_self.historyList = result;
						}
					});

					map.getZr().on("click", (params) => {
						// console.log(params);
						if (params.target || params.target != undefined) return;
						// 当双击事件发生时，清除单击事件，仅响应双击事件

						if (_self.historyList.length == 1) {
							// alert("已经到达最上一级地图了");
							return;
						}
						let map = _self.historyList.pop();
						//  console.log(_self.historyList[_self.historyList.length - 1]);
						if (_self.historyList[_self.historyList.length - 1].code == "world") {
							_self.cdata.area = "world";
							// this.options.series[1].map = "world";
							// this.area = "world";
						} else {
							// this.area = this.historyList[this.historyList.length - 1].name;

							_self.cdata.area =
								_self.historyList[_self.historyList.length - 1].name;
							// _self.options.series[1].map =
							//   this.historyList[this.historyList.length - 1].name;
						}
					});
				} catch (error) {
					console.log(error);
				}
			});
		},
		methods: {},
	};
</script>

<style lang="scss" scoped>
</style>