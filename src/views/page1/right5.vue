<template>
	<dv-border-box-11>
		<div class="height-controller">
			<div class="warning-list">
				<div class="table-title">故障预警列表</div>
				<table class="warning-table">
					<thead>
						<tr>
							<th>单位名称</th>
							<th>严重预警数量</th>
							<th>板块</th>
							<th>专业</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in dataList" :key="index"
							:class="{'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0}">
							<td>{{ item.sjdwmc }}</td>
							<td>{{ item.sjsl }}</td>
							<td>{{ item.bkmc }}</td>
							<td>{{ item.zymc }}</td>
						</tr>
						<tr v-if="dataList.length === 0">
							<td colspan="3" class="no-data">暂无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</dv-border-box-11>
</template>

<script>
	import {
		getYJList
	} from "@/api/serve";

	export default {
		data() {
			return {
				dataList: [], // 预警列表数据
			};
		},
		methods: {
			async fetchData() {
				try {
					const response = await getYJList();
					this.dataList = response.data.result
					console.log(this.dataList, 'this.dataList')
				} catch (error) {
					console.error("获取预警列表失败:", error);
				}
			}
		},
		mounted() {
			this.fetchData();
		}
	};
</script>

<style lang="scss" scoped>
	.height-controller {
		height: 450px;
		overflow: scroll;
		padding: 5px;
	}

	.warning-list {
		padding: 16px;

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
				// margin-top: 5px;
				color: #fff;
				padding: 10px;
				font-weight: normal;
				background-color: #003e5b;
			}

			td {
				padding: 10px;
				color: #fff;
			}

			.even-row {
				background-color: #485974;
			}

			.odd-row {
				background-color: #003e5b;
			}

			.no-data {
				color: #ff6b6b;
				font-style: italic;
			}
		}
	}
</style>