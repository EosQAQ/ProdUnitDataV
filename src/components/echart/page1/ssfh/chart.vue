<template>
	<Echart :options="options" id="page1ssfh" :height="height" width="100%"></Echart>
</template>

<script>
	import Echart from "../../../../common/echart/index.vue";
	export default {
		data() {
			return {
				options: {},
			};
		},
		components: {
			Echart,
		},
		props: {
			cdata: {
				type: Object,
				default: () => ({}),
			},
			height: {
				type: String,
				default: "",
			},
		},
		watch: {
			cdata: {
				handler(newData) {
					console.log(newData, 'newData')
					this.options = {
						tooltip: {
							trigger: "axis",
							// backgroundColor: "rgba(255,255,255,0.1)",
							// axisPointer: {
							//   type: "shadow",
							//   label: {
							//     show: true,
							//     backgroundColor: "#7B7DDC",
							//   },
							// },
						},
						legend: {
							data: newData.legendData,
							right: "0",
						},
						grid: {
							// x: "8%",
							// y: "4%",
							// width: "90%",
							// height: "85%",
							left: "1%",
							right: "4%",
							bottom: "1%",
							top: "15%",
							containLabel: true,
						},
						xAxis: {
							//type: "value",
							boundaryGap: false,
							data: newData.xData,
							axisLabel: {
								showMaxLabel: true,
								interval: 47,
							},
						},
						yAxis: {
							type: "value",
							max: function(value) {
								return parseInt(value.max * 1.5);
							},
						},
						series: [{
							name: newData.legendData[0],
							data: newData.yData,
							type: "line",
							showSymbol: false,
							areaStyle: {
								//color: newData.color0 + "3a",
							},
							itemStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
											offset: 0,
											color: "#76FAC7", // 100% 处的颜色
										},
										// {
										//   offset: 0.37,
										//   color: "rgba(45, 140, 240, 0.67)", // 100% 处的颜色
										// },
										// {
										//   offset: 0.67,
										//   color: "rgba(45, 140, 240, 0.37)", // 100% 处的颜色
										// },
										{
											offset: 1,
											color: "rgba(45, 140, 240, 0.5)", //   0% 处的颜色
										},
									],
								},
							},
						}, ],
					};
				},
				immediate: true,
				deep: true,
			},
		},
	};
</script>