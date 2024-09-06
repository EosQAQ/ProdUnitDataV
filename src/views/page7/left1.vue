<template>
	<div class="left1-container">
		<!-- Top section with image and station info -->
		<dv-border-box-13>
			<div class="station-info">
				<div class="image-container">
					<img src="../../assets/img/working.png" alt="Working Image" />
				</div>
				<div class="info-container">
					<div class="info-item">机组数量: {{ stationInfo.jzsl }}</div>
					<div class="info-item">装机容量(MW): {{ stationInfo.jzrl }}</div>
					<div class="info-item">有功(MW): {{ stationInfo.yg }}</div>
					<div class="info-item">所属区域: {{ stationInfo.ssqy }}</div>
					<div class="info-item">锅炉四管泄漏次数: {{ stationInfo.dnsgxlcs }} 次</div>
					<div class="info-item">机组跳闸次数: {{ stationInfo.dnjztzcs }} 次</div>
				</div>
			</div>
		</dv-border-box-13>

		<!-- Bottom section with pie chart -->
		<dv-border-box-13 style="height: 489px;">
			<div class="height-controller">
				<div class="event-chart">
					<div class="chart-title">重大事件次数</div>
					<div class="event-info">
						<div class="event-item">
							<div class="event-label">累计非停次数</div>
							<div class="event-value">{{ stationInfo.ljftcs }}</div>
						</div>
						<div class="event-item">
							<div class="event-label">累计非减次数</div>
							<div class="event-value">{{ stationInfo.ljfjcs }}</div>
						</div>
					</div>
					<div class="chart-container">
						<PieChartModule :chartOtherOptions="chartOtherOptions1"/>
					</div>
				</div>
			</div>
		</dv-border-box-13>
	</div>
</template>


<script>
	import {
		mapState,
	} from 'vuex';
	import {
		getSjData
	} from '@/api/serve.js'; // Import API function
    import PieChartModule from "@/common/echart/PieChartModule.vue";

	export default {
		data() {
			return {
				orgName: '',
				chartOtherOptions1: {}, // Placeholder for pie chart options
				thisInterval:null,
				stationInfo: {
					jzsl: 0,
					jzrl: 0,
					yg: 0,
					ssqy: '',
					dnsgxlcs: 0,
					dnjztzcs: 0,
					ljfjcs: 0,
					ljftcs: 0,
				}, // Placeholder for station info
			};
		},
		computed: {
			...mapState(['selectedUnit']),
		},
		components: {
            PieChartModule,
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
				this.updatePieChart();
				this.thisInterval = setInterval(() => {
				this.updatePieChart();
				},  this.$store.state.interval);
			},
			async updatePieChart() {
				//this.orgName = this.userInfo.result.orgName || '上电漕泾';
				this.orgName = this.$store.state.selectedDwmc;
				console.log(this.orgName,"this.orgName");
				const dwmc = this.orgName;
				const jzh =  this.$store.state.selectedUnit;
				const response = await getSjData({
					dwmc,
					jzh
				});

				if (response && response.data && response.data.result) {
					const data = response.data.result;

					// Update station info with API response
					this.stationInfo.jzsl = data.jzsl;
					this.stationInfo.jzrl = data.jzrl;
					this.stationInfo.yg = data.yg;
					this.stationInfo.ssqy = data.ssqy;
					this.stationInfo.dnsgxlcs = data.dnsgxlcs;
					this.stationInfo.dnjztzcs = data.dnjztzcs;
					this.stationInfo.ljfjcs = data.ljfjcs;
					this.stationInfo.ljftcs = data.ljftcs;

					this.chartOtherOptions1 = {
						titleText:'重大事件次数',
						seriesName:'事件次数',
						seriesData:[{
									value: data.ljftcs,
									name: '累计非停次数',
									itemStyle: {
										color: '#38f9d7'
									}
								},
								{
									value: data.ljfjcs,
									name: '累计非减次数',
									itemStyle: {
										color: '#4facfe'
									}
								},
							],
					};
				} else {
					console.error('Error fetching data: ', response);
				}
			},
		},
	};
</script>


<style scoped>
	.left1-container {
		margin-top: 55px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		/* height: 400px; */
	}

	.station-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 350px;
	}

	.image-container {
		flex: 1;
		text-align: center;
	}

	.image-container img {
		width: 100%;
		height: auto;
	}

	.info-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #ffffff;
	}

	.info-item {
		margin: 8px;
		border-bottom: 1px solid #2c3e50;
		padding: 5px;
	}

	.event-chart {
		margin-top: 20px;
		text-align: center;
		height: 400px;
	}

	.chart-title {
		margin-top: 30px;
		margin-bottom: 45px;
		font-size: 18px;
		color: #ffffff;
	}

	.chart-container {
		width: 100%;
		height: 300px;
	}

	.event-info {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
		color: #00ff00;
	}

	.event-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.event-label {
		font-size: 14px;
		color: #ffffff;
	}

	.event-value {
		font-size: 25px;
		margin-top: 15px;
		font-weight: bold;
	}

	.height-controller {
		height: 400px;
	}
</style>