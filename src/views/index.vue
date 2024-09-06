<template>
	<div id="index" ref="appRef">
		<div class="bg">
			<dv-loading v-if="loading">Loading...</dv-loading>

			<div v-else class="host-body">
				<Title />
				<div class="swiper">
							<div v-if="orgType === '101'">
								<Page1 />
							</div>
							<div v-else>
								<Sjdw @showloading="showloading"/>
							</div>
							

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import drawMixin from "../utils/drawMixin";
	import Title from "./title.vue";

	import Page1 from "./page1/index.vue";
	import Sjdw from "./sjdw.vue";
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		mixins: [drawMixin],
		data() {
			return {
				timing: null,
				loading: true,
				tpage: 1,
				show: 0,
				orgType: '',
			};
		},
		components: {
			Title,
			Page1,
			Sjdw,
		},
		computed: {
			...mapState(["userInfo","selectedOrgType"]),
		},
		mounted() {
			this.fetchUserInfo().then(() => {
				if(this.userInfo.result == null){
					this.$message.error('获取用户信息失败，将退出登录，请重新登录');
					setTimeout(() => {
						this.$router.push("/")
					}, 3000);
				}
				this.orgType = this.userInfo.result.orgType || "101";
				this.$store.commit("setSelectedDwmc", this.userInfo.result.orgName);
				this.$store.commit("setSelectedUnit", "");
				this.$store.commit("setSelectedOrgType", this.orgType);
				this.cancelLoading();
			});

			// this.timeFn();
		},
		beforeDestroy() {
			clearInterval(this.timing);
		},
		methods: {
			...mapActions(["fetchUserInfo"]),
			cancelLoading() {
				setTimeout(() => {
					this.loading = false;
				}, 3000);
			},
			showloading(){
				this.loading = true;
				this.cancelLoading();
			}
		},
		watch:{
			selectedOrgType:{
				handler (val, oldVal) {
					this.orgType = val;
                }
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../assets/scss/index.scss";

	.swiper {
		height: 100%;
		// border: 1px solid red;
		position: relative;
		top: 30px;
		// .swiper-slide {
		//   display: flex;
		//   justify-content: center;
		//   align-items: center;
		//   text-align: center;
		//   font-weight: bold;
		// }
	}

	.dy {
		position: absolute;
		width: 100%;
	}
</style>