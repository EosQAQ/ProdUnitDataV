<template>
	<div class="height-container">
		
		<div class="charts-container">
			
			<dv-border-box-13 class="fixed-size">

			<!-- 第一个框：包含两个横向排列的饼图 -->
			<div class="horizontal-charts">
				<!-- <div class="chart" ref="chart1" style="width: 50%;"></div> -->
				<!-- <div class="chart" ref="chart2" style="width: 50%;"></div> -->
                <PieChartModule :chartOtherOptions="chartOtherOptions1"/>
                <PieChartModule :chartOtherOptions="chartOtherOptions2"/>
			</div>
			</dv-border-box-13>
			<dv-border-box-13 class="fixed-size">
			<!-- 第二个框：柱状图 -->
			<!-- <div class="chart" ref="chart3" style="height: 100%;"></div> -->
            <CategoryChartModule :chartOtherOptions="chartOtherOptions3"/>
			</dv-border-box-13>
			<dv-border-box-13 class="fixed-size">
			<!-- 第三个框：柱状图 -->
			<!-- <div class="chart" ref="chart4" style="height: 100%;"></div> -->
            <CategoryChartModule :chartOtherOptions="chartOtherOptions4"/>

			</dv-border-box-13>
		</div>
	</div>
</template>

<script>
    import PieChartModule from "@/common/echart/PieChartModule.vue";
    import CategoryChartModule from "@/common/echart/CategoryChartModule.vue";

	import {
		getYjDataByBk,
		getBKYJSL
	} from "@/api/serve";

	export default {
		data() {
			return {
				chartData: null, // 接口数据
                thisInterval:null,
                chartOtherOptions1:{},
                chartOtherOptions2:{},
                chartOtherOptions3:{},
                chartOtherOptions4:{},
				myseries: {
						data:[],// this.chartOtherOptions.seriesData.map(item => item.value),
						type: 'bar',
						itemStyle: {
							color: this.$store.state.ybColor
						}
					}
			};
		},
        props:{
			selectedType:String
		},
		components: {
            PieChartModule,
            CategoryChartModule
		},
		methods: {
            createCharts(){
                this.chartOtherOptions1 = {
                    titleText:'严重预警',
                    seriesName:'专业',
                    seriesData:this.chartData.yzyjPieChartDataList,
                };
                this.chartOtherOptions2 = {
                    titleText:'一般预警',
                    seriesName:'专业',
                    seriesData:this.chartData.ybyjPieChartDataList,
                };
				this.myseries.data=this.chartData.yzyjCategoryChartDataList.map(item => item.value)
                this.chartOtherOptions3 = {
                    titleText:'严重预警排名',
                    //seriesData:this.chartData.yzyjCategoryChartDataList,
					xAxisData:this.chartData.yzyjCategoryChartDataList.map(item => item.name),
					series:[this.myseries]
                };
				this.myseries.data=this.chartData.ybyjCategoryChartDataList.map(item => item.value)
                this.chartOtherOptions4 = {
                    titleText:'一般预警排名',
                    //seriesData:this.chartData.ybyjCategoryChartDataList,
					xAxisData:this.chartData.ybyjCategoryChartDataList.map(item => item.name),
					series:[this.myseries]
                };
            },
			async handleChange() {
				

				// Set type in params object correctly
				const params = {
					bkmc: this.selectedType
				};
				console.log(params, 'params')
				try {
						const response = await getYjDataByBk(params);
						const data = response.data.result;
						console.log(data, 'data')
						this.chartData = {
							yzyjPieChartDataList: data.yzyjPieChartDataList || [],
							ybyjPieChartDataList: data.ybyjPieChartDataList || [],
							yzyjCategoryChartDataList: data.yzyjCategoryChartDataList || [],
							ybyjCategoryChartDataList: data.ybyjCategoryChartDataList || []
						};
						console.log(this.chartData, 'chartData')
						this.createCharts();
				
				} catch (error) {
					console.error('获取报警数据失败:', error);
				}
			},
		},
		mounted() {
			this.handleChange(); // 初始加载数据
			this.thisInterval = setInterval(() => {
				this.handleChange(); // 初始加载数据
			}, this.$store.state.interval)
		},
        watch: {
            selectedType: {
                handler (val, oldVal) {
                    this.handleChange();
                }
            }
        },
        beforeDestroy() {
			clearInterval(this.thisInterval);
		},
	};
</script>

<style scoped>
	.height-container {
		height: 943px;
		/* height: 100%px; */
	}

	.charts-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
	}

	.fixed-size {
		padding: 16px;
		height: 33.33%;
		/* 每个框的高度占1/3 */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.horizontal-charts {
		display: flex;
		justify-content: space-between;
		height: 100%;
	}

	.chart {
		width: 100%;
		height: 100%;
	}

	.radio-group {
		display: flex;
		justify-content: space-around;
		margin-bottom: 0px;
		margin-top: 15px;
	}
</style>