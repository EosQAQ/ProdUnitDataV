<template>
	<div>
		<dv-border-box-13>
			<div class="page1-left3 text-white">
				<div class="bg-color-black">
					<div class="pt-1 pl-1">
						<subTitle title="分类实时负荷率" unit="单位：MW" :lineColor="['#38f9d7', '#43e97b']"></subTitle>
						<a-row class="p-2">
							<a-col :span="8">
								<div class="d-flex jc-center">
									<CenterChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
								</div>
								<div class="text-center m-2">火电负荷占比</div>
							</a-col>
							<a-col :span="8">
								<div class="d-flex jc-center">
									<CenterChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />
								</div>
								<div class="text-center m-2">风电负荷占比</div>
							</a-col>
							<a-col :span="8">
								<div class="d-flex jc-center">
									<CenterChart :id="rate[2].id" :tips="rate[2].tips" :colorObj="rate[2].colorData" />
								</div>
								<div class="text-center m-2">光伏负荷占比</div>
							</a-col>
						</a-row>
						<a-row class="p-2">
							<a-row>
								<a-col :span="2">
									<a-badge status="processing" color="#fa709a"
										style="width: 15px; height: 15px; margin-top: 21px" />
								</a-col>
								<a-col :span="16" class="pb-2">
									<div>火电负荷（MW）</div>
									<div class="progress3">
										<a-progress :stroke-color="{
                        from: '#fa709a',
                        to: '#fee140',
                      }" :percent="rate[0].tips" status="active" :show-info="false" />
									</div>
								</a-col>
								<a-col :span="6" class="p-2 pt-4" style="font-size: 24px; color: #fa709a">
									<countTo :startVal="0" :endVal="GF_YG" :duration="200" :decimals="2"></countTo>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="2">
									<a-badge status="processing" color="#4facfe"
										style="width: 15px; height: 15px; margin-top: 21px" />
								</a-col>
								<a-col :span="16" class="pb-2">
									<div>风电负荷（MW）</div>
									<div class="progress2">
										<a-progress :stroke-color="{
                        from: '#4facfe',
                        to: '#00f2fe',
                      }" :percent="rate[1].tips" status="active" :show-info="false" />
									</div>
								</a-col>
								<a-col :span="6" class="p-2 pt-4" style="font-size: 24px; color: #4facfe">
									<countTo :startVal="0" :endVal="GF_XNY_FD_YG" :duration="200" :decimals="2">
									</countTo>
								</a-col>
							</a-row>
							<a-row>
								<a-col :span="2">
									<a-badge status="processing" color="#38f9d7"
										style="width: 15px; height: 15px; margin-top: 21px" />
								</a-col>
								<a-col :span="16" class="pb-2">
									<div>光伏负荷（MW）</div>
									<div class="progress1">
										<a-progress :stroke-color="{
                        from: '#38f9d7',
                        to: '#43e97b',
                      }" :percent="rate[2].tips" status="active" :show-info="false" />
									</div>
								</a-col>
								<a-col :span="6" class="p-2 pt-4" style="font-size: 24px; color: #38f9d7">
									<countTo :startVal="0" :endVal="GF_XNY_GF_YG" :duration="200" :decimals="2">
									</countTo>
								</a-col>
							</a-row>
						</a-row>
					</div>
				</div>
			</div>
		</dv-border-box-13>
	</div>
</template>

<script>
	import CenterChart from "../../components/echart/page1/fh/index.vue";
	import subTitle from "../../components/subTitle/index.vue";
	import countTo from "vue-count-to";
	import {
		getPlantRealData,
		getRealtimeData
	} from "../../api/serve";
	import {
		GetZJRL
	} from "../../utils/index";
	export default {
		data() {
			return {
				// 通过率和达标率的组件复用数据
				rate: [{
						id: "centerRate3",
						tips: 40,
						colorData: {
							textStyle: "#fa709a",
							series: {
								color: ["#fa709a52", "transparent"],
								dataColor: {
									normal: "#fa709a",
									shadowColor: "#fee140",
								},
							},
						},
					},
					{
						id: "centerRate2",
						tips: 40,
						colorData: {
							textStyle: "#4facfe",
							series: {
								color: ["#4facfe52", "transparent"],
								dataColor: {
									normal: "#4facfe",
									shadowColor: "#00f2fe",
								},
							},
						},
					},
					{
						id: "centerRate1",
						tips: 60,
						colorData: {
							textStyle: "#38f9d7",
							series: {
								color: ["#38f9d752", "transparent"],
								dataColor: {
									normal: "#38f9d7",
									shadowColor: "#43e97b",
								},
							},
						},
					},
				],
				GF_XNY_FD_YG: 0,
				GF_XNY_GF_YG: 0,
				GF_YG: 0,
				GF_XNY_FD_YG_T: 0,
				GF_XNY_GF_YG_T: 0,
				GF_YG_T: 0,
				timing: null,
			};
		},
		components: {
			CenterChart,
			countTo,
			subTitle,
		},
		beforeDestroy() {
			clearInterval(this.timing);
		},
		mounted() {
			this.getData();
			this.timeFn();
		},
		methods: {
			timeFn() {
				this.timing = setInterval(() => {
					this.getData();
				}, 50000); //五秒
			},
			async getData() {
				await this.GetPlantRealData_GF_XNY_FD_YG();
				await this.GetPlantRealData_GF_XNY_GF_YG();
				await this.GetPlantRealData_GF_YG();

				const total = this.GF_XNY_FD_YG + this.GF_XNY_GF_YG + this.GF_YG;

				if (total > 0) {
					this.rate[0].tips = Number(((this.GF_YG / total) * 100).toFixed(0));
					this.rate[1].tips = Number(((this.GF_XNY_FD_YG / total) * 100).toFixed(0));
					this.rate[2].tips = Number(((this.GF_XNY_GF_YG / total) * 100).toFixed(0));
				}

				console.log(this.rate);
			},
			async GetPlantRealData_GF_XNY_FD_YG() {
				const res = await getRealtimeData();
				this.GF_XNY_FD_YG = Number(res.data.result.fdfh);
			},
			async GetPlantRealData_GF_XNY_GF_YG() {
				const res = await getRealtimeData();
				this.GF_XNY_GF_YG = Number(res.data.result.gffh);
			},
			async GetPlantRealData_GF_YG() {
				const res = await getRealtimeData();
				this.GF_YG = Number(res.data.result.hdfh);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page1-left3 {
		$box-height: 100%;
		$box-width: 100%;
		//   padding: 5px;
		padding: 16px;
		padding-top: 20px;
		height: $box-height;
		width: $box-width;
		border-radius: 5px;

		.bg-color-black {
			padding: 5px;
			height: $box-height;
			width: $box-width;
			border-radius: 10px;
		}
	}
</style>
<style lang="scss">
	.progress1 {
		.ant-progress-inner {
			background-color: #38f9d752;
		}
	}

	.progress2 {
		.ant-progress-inner {
			background-color: #4facfe52;
		}
	}

	.progress3 {
		.ant-progress-inner {
			background-color: #fa709a52;
		}
	}
</style>