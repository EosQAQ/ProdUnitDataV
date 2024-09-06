<template>
	
	<div id="index" class="sjdwclass">
        <div>
          <a-row>
            <a-row>
              <a-col :span="12" class="p-3">
                <a-button
                  type="link"
                  style="color: #fff"
                  @click="
                    () => {
                      $emit('showloading');
                      this.$store.commit('setSelectedOrgType', '101' );
                    }
                  "
                  v-if="this.$store.state.userInfo.result.orgType == '101'"
                >
                  返回主页
                </a-button></a-col
              >
              
              <a-col :span="6">
                
              </a-col>
              <a-col :span="6" class="p-3 text-center" style="font-size: 20px">
                <dv-decoration-7> {{ this.$store.state.selectedDwmc }}</dv-decoration-7>
              </a-col>
            </a-row>
            <a-row>
              <!-- 左侧 -->
              <a-col :span="6">
                <left1 />
              </a-col>

              <!-- 中间 -->
              <a-col :span="12">
                <middle1 />
              </a-col>

              <!-- 右侧 -->
              <a-col :span="6">
                <right1 />
              </a-col>
          </a-row>
          </a-row>
        </div>
      </div>
</template>

<script>
//import drawMixin from "../utils/drawMixin";
import Title from "./title.vue";
	import left1 from '../views/page7/left1.vue';
	import middle1 from '../views/page7/middle1.vue';
	import right1 from '../views/page7/right1.vue';
 import { defineEmits } from "vue";
 
	export default {
		//mixins: [drawMixin],
		data(){
			return {
				loading:true,
			}
		},
		components: {
			left1,
			middle1,
			right1,
			Title
		},
    mounted() {
      this.cancelLoading();
    },
    methods: {
      cancelLoading() {
				setTimeout(() => {
					this.loading = false;
				}, 1000);
			},
    }
	};
</script>

<style  lang="scss" scoped>
.sjdwclass{
  position:relative;
  margin-top:550px;
}
</style>