<template>
	<div>
		<dv-border-box-13>
			<div class="page1-left2 text-white">
				<div class="bg-color-black">
					<div class="pt-2 pl-2">
						<subTitle title="实时负荷" unit="单位：MW" :lineColor="['#00D2FC']"></subTitle>
						<Number2 :data="ssfhdata" fontColor="#00D2FC" title="实时负荷" iconName="icon-fuhe"></Number2>

						<a-row class="p-2">
							<ssfhChart :cdata="cdata" height="270px"></ssfhChart>
						</a-row>
					</div>
				</div>
			</div>
		</dv-border-box-13>
	</div>
</template>

<script>
	import {
		toThousands,
		formatter
	} from "../../utils/index";
	import ssfhChart from "../../components/echart/page1/ssfh/chart.vue";
	import subTitle from "../../components/subTitle/index.vue";
	import Number2 from "../../components/number2/index.vue";
	import countTo from "vue-count-to";
	import {
		getRealtimeData,
		getLoadDataInDay
	} from "../../api/serve";
	import {
		timeSlot
	} from "../../utils/index";
	export default {
		components: {
			countTo,
			ssfhChart,
			subTitle,
			Number2,
		},
		data() {
			return {
				cdata: {
					legendData: ["实时负荷"],
					xData: timeSlot(5),
					yData: [],
					color0: "#F57C00",
				},
				ssfhdata: 0,
				timing1: null,
			};
		},
		mounted() {
			this.initData();
			this.timeFn1();
		},
		beforeDestroy() {
			clearInterval(this.timing1);
		},
		methods: {
			timeFn1() {
				this.timing1 = setInterval(() => {
					this.initData();
				}, 60000); //1分钟
			},
			initData() {
				this.GetGFPlantDay24YG();
				this.GetPlantRealData();
			},
			GetGFPlantDay24YG() {
				getLoadDataInDay().then((res) => {
					this.cdata.yData = res.data.result
					console.log(res.data.result, 'res.data.result')
				});
			},
			GetPlantRealData() {
				// getPlantRealData("GF_YG").then((res) => {
				getRealtimeData().then((res) => {
					this.ssfhdata = Number(res.data.result.zfh);
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page1-left2 {
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