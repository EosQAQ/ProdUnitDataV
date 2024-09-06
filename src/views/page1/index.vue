<template>
	<div>
		<a-row>
			<a-col :span="6">
				<a-row style="margin-top:30px"></a-row>
				<a-row class="my-2">
					<Left1></Left1>
				</a-row>
				<a-row class="my-2">
					<!-- 设备在线统计 -->
					<ssfh></ssfh>
				</a-row>
				<a-row class="my-2">
					<!-- 运行状态 -->
					<Left3></Left3>
				</a-row>
			</a-col>
			<a-col :span="12">
				<!-- 地图 -->
				<Center></Center>
			</a-col>
			<a-col :span="6">
				<a-row class="my-2">
					<Right6></Right6>
				</a-row>
			</a-col>
		</a-row>
	</div>
</template>


<script>
	import Left1 from "./left1.vue";
	import ssfh from "./ssfh.vue";
	import Left3 from "./left3.vue";
	import Center from "./center.vue";

	import Right6 from "./right6.vue";
	export default {
		data() {
			return {};
		},
		components: {
			Left1,
			Left3,
			Center,
			Right6,
			ssfh,
		},
		mounted() {
			//清空选项组织和机组
			this.$store.commit("initSelectedData");
		}
	};
</script>

<style lang="scss" scoped>
</style>