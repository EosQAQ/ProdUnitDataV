<template>
	<div>
		<!-- 包裹 alert-panel -->
		<dv-border-box-13>
			<div class="alert-panel">
				
				<div class="alarms-info">
					<div class="alarm">
						<dv-decoration-9 :color="['#aa55ff', '#ffaaff']" style="width: 100px; height: 100px">
							<span style="font-size: 20px; color: #ffffff">{{ chart1Data }}</span>
						</dv-decoration-9>
						<div class="alarm-label">严重预警</div>
					</div>
					<div class="total-alarms">
						<div>预警总次数</div>
						<div style="font-size: 24px; font-weight: bold;margin-top:5px">{{ totalAlarms }}</div>
					</div>
					<div class="alarm">
						<dv-decoration-9 :color="['#00ff00', '#00ff7f']" style="width: 100px; height: 100px">
							<span style="font-size: 20px; color: #ffffff">{{ chart2Data }}</span>
						</dv-decoration-9>
						<div class="alarm-label">一般预警</div>
					</div>
				</div>
			</div>
		</dv-border-box-13>

		<!-- 包裹 fault-distribution -->
		<dv-border-box-13>
			<div class="fault-distribution">
				<div class="fault-title">预警单位分布</div>
				<div class="ellipse" v-for="(item, index) in sortedUnits" :key="index"
					:style="{width: item.width + 'px', height: item.height + 'px', top: item.top + 'px', left: item.left + 'px'}">
					<span class="ellipse-value">{{ item.value }}</span>
					<span class="ellipse-label">{{ item.unit }}</span>
				</div>
			</div>
		</dv-border-box-13>
	</div>
</template>

<script>
	import {
		getBKYJSL
	} from "@/api/serve";

	export default {
		data() {
			return {
				options: ['全部', '火电', '光伏', '风电'],
				selectedOption: '全部',
				chart1Data: 10, // 示例数据
				chart2Data: 20, // 示例数据
				totalAlarms: 30, // 示例数据
				units: [], // 单位分布数据
				thisInterval:null,
				unitoptions: [{
						unit: '单位1',
						value: 222,
						width: 140,
						height: 80,
						top: 50,
						left: 100
					},
					{
						unit: '单位2',
						value: 115,
						width: 120,
						height: 70,
						top: 150,
						left: 50
					},
					{
						unit: '单位3',
						value: 112,
						width: 110,
						height: 65,
						top: 130,
						left: 290
					},
					{
						unit: '单位4',
						value: 95,
						width: 100,
						height: 60,
						top: 200,
						left: 150
					},
					{
						unit: '单位5',
						value: 87,
						width: 90,
						height: 55,
						top: 230,
						left: 300
					},
					{
						unit: '单位6',
						value: 87,
						width: 80,
						height: 50,
						top: 50,
						left: 350
					},
				] //虚构的数//虚构的数据，有数据以后更换unit和value
			};
		},
		props:{
			selectedType:String
		},
		computed: {
			sortedUnits() {
				return [...this.units].sort((a, b) => b.value - a.value); // 根据值大小排序
			},
			wacthSelectedType(){
				return this.selectedType
			}
		},
		methods: {
			async handleChange() {
			
				const params = {
					bkmc: ''
				};

				try {
					const response = await getBKYJSL(params);
					const data = response.data;
					this.chart1Data = data.result.ybyjzs;
					this.chart2Data = data.result.yzyjzs;
					this.totalAlarms = data.result.yjzs;

					// Get data from server response and limit to 6 elements if necessary
					const responseData = data.result.yjdwDataList.slice(0, 6);
					console.log(responseData)
					// Merge new data with existing size and position data, or use defaults if less data is returned
					this.units = responseData.map((item, index) => ({
						unit: item.sjdwmc,
						value: item.sjsl,
						width: this.unitoptions[index].width, // default or existing
						height: this.unitoptions[index].height, // default or existing
						top: this.unitoptions[index].top, // calculated or existing
						left: this.unitoptions[index].left // calculated or existing
					}));

					console.log(this.units, 'this.units');
				} catch (error) {
					console.error('获取报警数据失败:', error);
				}
			},
		},

		mounted() {
			this.handleChange(); // 初始加载数据
			this.thisInterval = setInterval(() => {
				this.handleChange(); // 初始加载数据
			}, this.$store.state.interval);
			
		},
		beforeDestroy() {
			clearInterval(this.thisInterval);
		},
		// watch: {
		// 	wacthSelectedType: function (val) {
		// 		this.handleChange();
		// 	},
		// }
	};
</script>

<style lang="scss" scoped>
	.alert-panel {
		padding: 16px;

		/* 保留之前的样式 */
		.radio-group {
			display: flex;
			justify-content: space-around;
			margin-bottom: 5px;

			.ant-radio-inner {
				border-width: 3px;
				border-color: #1890ff;
			}

			.ant-radio-checked .ant-radio-inner {
				background-color: #1890ff;
			}

			.ant-radio-checked .ant-radio-inner::after {
				width: 12px !important;
				height: 12px;
				background-color: #fff;
			}

			.ant-radio-wrapper {
				color: white;
				font-weight: bold;
			}
		}

		.alarms-info {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 20px;

			.alarm {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.alarm-label {
				margin-top: 5px;
				color: #ffffff;
				font-size: 14px;
			}

			.total-alarms {
				text-align: center;
				font-size: 18px;
				color: #fccf31;
			}
		}
	}

	.fault-distribution {
		position: relative;
		margin-top: 20px;
		height: 300px;
		padding: 16px;

		.fault-title {
			text-align: center;
			font-size: 18px;
			color: #fff;
			margin-bottom: 10px;
			letter-spacing: 2px;
		}

		/* 根据实际情况调整高度 */
		.ellipse {
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			background-color: rgba(0, 136, 255, 0.6);
			color: white;
			text-align: center;

			.ellipse-value {
				font-size: 18px;
				font-weight: bold;
			}

			.ellipse-label {
				margin-top: 5px;
				font-size: 14px;
			}
		}
	}
</style>