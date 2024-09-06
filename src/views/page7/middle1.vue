<template>
	<div class="middle1-container">
		<!-- Trend Analysis Chart -->
		<dv-border-box-13>
			<div class="chart-container" ref="trendChart">
				<CategoryChartModule :chartOtherOptions="chartOtherOptions1"/>
			</div>
		</dv-border-box-13>

		<!-- Specialty Distribution Chart -->
		<dv-border-box-13>
			<!-- <div class="chart-container" ref="specialtyChart"></div> -->
			<div class="chart-container" ref="specialtyChart">
				<CategoryChartModule :chartOtherOptions="chartOtherOptions2"/>
			</div>
		</dv-border-box-13>
	</div>
</template>

<script>
	import CategoryChartModule from "@/common/echart/CategoryChartModule.vue";
	import { mapState } from 'vuex';
	import {
		timeSlot
	} from "@/utils/index";
	import {
		mapActions
	} from 'vuex';
	import {
		getZyYjCountByDw,
		getQsfxDataList
	} from '@/api/serve.js'; // 导入 API 函数

	export default {
		computed: {
			...mapState(['selectedUnit']),
		},
		data() {
			return {
				trendChartData: [], // Dummy data for trend chart
				specialtyChartData: [],
				orgName: '',
				chartOtherOptions1:{},
				chartOtherOptions2:{},
				thisInterval:null
			};
		},
		components: {
            CategoryChartModule
		},
		mounted() {
			this.initChart();
		},
		beforeDestroy() {
			clearInterval(this.thisInterval);
		},
		watch: {
            selectedUnit: {
                handler (val, oldVal) {
                    clearInterval(this.thisInterval);
					this.initChart();
                }
            }
        },
		methods: {
			initChart(){
				this.initTrendChart();
				this.initSpecialtyChart();
				this.thisInterval = setInterval(() => {
					this.initTrendChart();
					this.initSpecialtyChart();
				}, this.$store.state.interval);
			},
			//...mapActions(['fetchUserInfo']),
			async initTrendChart() {
				console.log(this.userInfo, 'userInfo')
				this.orgName = this.$store.state.selectedDwmc;
				const dwmc = this.orgName;
				const jzh = this.$store.state.selectedUnit;
				const response = await getQsfxDataList({
					dwmc,
					jzh
				});
				// 检查响应数据是否存在且格式正确
				if (!response || !response.data || !response.data.result) {
					console.error('数据格式不正确或数据为空');
					return;
				}
				
				// 分组数据
				const dataByJzh = response.data.result.reduce((acc, curr) => {
					if (!acc[curr.jzh]) {
						acc[curr.jzh] = [];
					}
					acc[curr.jzh].push(curr.value);
					return acc;
				}, {});
				this.chartOtherOptions1 = {
					titleText:'趋势分析',
					series:Object.keys(dataByJzh).map(jzh => ({
							name: jzh,
							type: 'line',
							data: dataByJzh[jzh],
							smooth:true,
							showSymbol:false
						})),
					xAxisData:timeSlot(5),
					xyChange:false
				}
			},

			// Initialize Specialty Distribution Chart
			async initSpecialtyChart() {
				this.orgName =this.$store.state.selectedDwmc;
				const dwmc = this.orgName;
				const jzh = this.$store.state.selectedUnit;

				const response = await getZyYjCountByDw({
					dwmc,
					jzh
				});
				const data = response.data.result;

				const categories = [];
				const seriesDataA = [];
				const seriesDataB = [];

				// Dynamically populate data
				data.forEach((item) => {
					categories.push(item.name);
					seriesDataA.push(item.value); // Example data for 专业A
					seriesDataB.push(item.value2); // Example data for 专业B

				});
				this.chartOtherOptions2={
					titleText : '专业分布情况',
					series:[{
							name: '严重预警',
							type: 'bar',
							stack: '总量',
							data: seriesDataA, // Use dynamically generated data
							itemStyle: {
								color: this.$store.state.yzColor, // Set this to a shade of red
							},
						},
						{
							name: '一般预警',
							type: 'bar',
							stack: '总量',
							data: seriesDataB, // Use dynamically generated data
							itemStyle: {
								color: this.$store.state.ybColor, // Set this to a shade of red
							},
						},
					],
					xAxisData:categories,
					xyChange:true
				}
			}

		}
	};
</script>

<style scoped>
	.middle1-container {
		margin-top: 70px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.chart-container {
		width: 100%;
		height: 400px;
		margin-top: 20px;
	}
</style>