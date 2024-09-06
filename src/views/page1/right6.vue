<template>
	<div class="height-container">
		<div class="radio-group">
			<a-radio-group v-model="selectedOption">
				<a-radio :value="item" v-for="item in options" :key="item" style="color: white;">
					{{ item }}
				</a-radio>
			</a-radio-group>
		</div>
		<div class="charts-container" v-if="this.selectedOption=='全部'">
			
			<a-col :span="24">
				<!-- 预警总次数和故障单位分布 -->
				<a-row class="my-2">
					<Right7 :selectedType="selectedOption"/>
				</a-row>
				<!-- 故障预警列表 -->
				<a-row class="my-2">
					<Right8/>
				</a-row>
			</a-col>
		</div>
		<div class="charts-container" v-else>
			<Right9 :selectedType="selectedOption" />
		</div>
	</div>
</template>

<script>
	import Right7 from "./right7.vue";
	import Right8 from "./right8.vue";
	import Right9 from "./right9.vue";

	import {
		getYjDataByBk,
		getBKYJSL
	} from "@/api/serve";

	export default {
		data() {
			return {
				chartData: null, // 接口数据
				options: ['全部', '火电', '光伏', '风电'],
				// options: ['火电', '光伏', '风电'],
				selectedOption: '全部',
			};
		},
		components: {
			Right7,
			Right8,
			Right9
		},
		methods: {
		
		},
		mounted() {
			//this.handleChange();
			// this.fetchData();
		}
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