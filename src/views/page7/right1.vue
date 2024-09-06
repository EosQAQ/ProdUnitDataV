<template>
	<div class="right1-container">
		<div class="select-container1">
                  <label for="unit-select">请选择机组：</label>
                  <a-select v-model="selectedUnit" show-search :options="unitOptions" placeholder="请选择机组" style="width: 200px"
                    @change="handleUnitChange">
                  </a-select>
        </div>

		<!-- 饼图容器 -->
		<dv-border-box-13 class="chart-container">
			<div class="pie-chart-container" ref="pieChart">
				<PieChartModule :chartOtherOptions="chartOtherOptions1"/>
			</div>
		</dv-border-box-13>

		<!-- 故障预警列表 -->
		<dv-border-box-13 class="table-container">
			<div class="table-inside-container">
				<div class="table-title">预警列表</div>
				<table class="warning-table">
					<thead>
						<tr>
							<th>机组名称</th>
							<th>专业</th>
							<th>预警名称</th>
							<th>预警时间</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in warningList" :key="index"
							:class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}">
							<td>{{ item.unitName }}</td>
							<td>{{ item.specialty }}</td>
							<td>{{ item.warningName }}</td>
							<td>{{ item.warningTime }}</td>
						</tr>
						<tr v-if="warningList.length === 0">
							<td colspan="4" class="no-data">暂无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
		</dv-border-box-13>
	</div>
</template>

<script>
	import * as echarts from 'echarts'; // 导入 ECharts
	import {
		getYjCountByJzh,
		getYjListByJzh
	} from '@/api/serve.js'; // 导入 API 函数
	import PieChartModule from "@/common/echart/PieChartModule.vue";


	export default {
		data() {
			return {
				selectedUnit: '', // 当前选中的机组
				unitOptions: [], // 下拉框选项
				chartData: [], // 饼图数据
				warningList: [], // 故障预警列表数据
				orgName: '',
				chartOtherOptions1:{},
				thisInterval:null,
			};
		},
		computed: {
			//...mapState(['userInfo']),
		},
		components: {
            PieChartModule,
		},
		mounted() {
			this.populateUnitOptions();
			this.initChart();
		},
		beforeDestroy() {
			clearInterval(this.thisInterval);
		},
		methods: {
			//...mapActions(['fetchUserInfo']),
			initChart(){
				clearInterval(this.thisInterval);
				this.fetchPieChartData(); // 页面加载时获取饼图数据
				this.fetchWarningList(); // 页面加载时获取故障预警列表
				this.updatePieChart();
				this.thisInterval = setInterval(() => {
					this.fetchPieChartData(); // 页面加载时获取饼图数据
					this.fetchWarningList(); // 页面加载时获取故障预警列表
					this.updatePieChart();
				},  this.$store.state.interval);
			},
			populateUnitOptions() {
				// this.orgName = this.userInfo.result.orgName;
				this.orgName =  this.$store.state.selectedDwmc ;
				let unitOptions = [];
				var sjdw = window.czinfo.filter(item=>item.sjdw === this.orgName);
				console.log(sjdw,"sjdw")
				if(sjdw == undefined || sjdw == null || sjdw.length == 0) alert(`未在系统中设置${this.orgName}的信息`);
				unitOptions.push({
									value: '',
									label: `全部`
								});
				if(sjdw.length == 1)
				{
					sjdw[0].jzs.forEach(unit => {
								unitOptions.push({
									value: `${unit.jzmc}`,
									label: `${unit.jzmc}`
								});
							});
				}else{
					sjdw.forEach(station => {
							unitOptions.push({
								value: station.dzmc, // You may change this according to your needs
								label: station.dzmc
							});
					});
				}
				
				this.unitOptions = unitOptions;
			},
			async fetchPieChartData() {
				try {
					const dwmc = this.orgName; // 根据用户信息获取单位名称
					const jzh = this.$store.state.selectedUnit || '';

					const response = await getYjCountByJzh({
						dwmc,
						jzh
					});
					this.chartData = [{
							name: '一般预警',
							value: response.data.result ==null || response.data.result.length === 0 ? [] : response.data.result[0]
						}, {
							name: '严重预警',
							value: response.data.result ==null || response.data.result.length === 0 ? [] : response.data.result[1]
					}];
					this.updatePieChart(); // 使用新数据更新饼图
				} catch (error) {
					console.error('获取饼图数据失败:', error);
				}
			},
			async fetchWarningList() {
				try {
					const dwmc = this.orgName; // 根据用户信息获取单位名称
					const jzh = this.$store.state.selectedUnit || '';

					const response = await getYjListByJzh({
						dwmc,
						jzh
					});
					this.warningList = response.data.result.map((item, index) => ({
						unitName: item.jzmc,
						specialty: item.zymc,
						warningName: item.yjmc,
						warningTime: item.caltime
					}))
				} catch (error) {
					console.error('获取预警列表失败:', error);
				}
			},
			handleUnitChange(value) {
				this.$store.commit("setSelectedUnit", value );
				this.initChart();
			},
			updatePieChart() {
				this.chartOtherOptions1 = {
					titleText:'预警事件次数',
					seriesName:'事件次数',
					seriesData:this.chartData,
				}
			}
		}
	};
</script>

<style scoped>
	.right1-container {
		padding: 16px;
	}

	.select-container {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.chart-container {
		width: 100%;
	}

	.table-inside-container {
		height: 509px;
		overflow: auto;
	}

	.table-inside-container::-webkit-scrollbar {
		display: none;
		/* 对于 Chrome, Safari 和 Opera 隐藏滚动条 */
	}

	.pie-chart-container {
		width: 100%;
		height: 300px;
		margin-top: 20px;
	}

	.table-container {
		margin-top: 20px;
		padding: 16px;
	}

	.table-title {
		text-align: center;
		font-size: 18px;
		color: #fff;
		margin-bottom: 10px;
		letter-spacing: 2px;
	}

	.warning-table {
		width: 100%;
		border-collapse: collapse;
		text-align: center;

		th {
			color: #fff;
			padding: 10px;
			font-weight: normal;
			background-color: #1f2937;
		}

		td {
			padding: 10px;
			color: #fff;
		}

		.odd-row {
			background-color: #485974;
		}

		.even-row {
			background-color: #003e5b;
		}

		.no-data {
			color: #ff6b6b;
			font-style: italic;
		}
	}

	label {
		color: white;
		margin-right: 10px;
	}
</style>