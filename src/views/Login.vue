<template>
	<div class="login-page">
		<!-- 左边的图片区域 -->
		<div class="login-image">
			<img src="../assets/img/shouye.png" alt="Login Image" />
		</div>

		<!-- 右边的登录表单区域 -->
		<div class="login-container">
			<!-- 标题 -->
			<h1 class="login-title">发电设备数字哨兵系统</h1>

			<!-- 登录表单 -->
			<form @submit.prevent="handleLogin">
				<div class="form-group">
					<label for="account">账号:</label>
					<input type="text" v-model="account" id="account" required />
				</div>
				<div class="form-group">
					<label for="password">密码:</label>
					<input type="password" v-model="password" id="password" required />
				</div>
				<div>
					<a-checkbox  :checked="checked" @change="onChange" style="float:left">
						记住账号密码
					</a-checkbox>
				</div>
				<div>
					<button type="submit" :disabled="isSubmitting"  style="margin-top:20px">
						<span v-if="isSubmitting">登录中...</span>
						<span v-else>登录</span>
					</button>
				</div>
			</form>
			<div v-if="loginError" class="error-message">
				{{ loginError }}
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex';
	import {
		login
	} from '@/api/serve.js';
	export default {
		data() {
			return {
				account: localStorage.getItem("account"),
				password: localStorage.getItem("password"),
				code: 'string',
				codeId: 0,
				isSubmitting: false,
				loginError: null,
				checked:!!localStorage.getItem("saveAP")
			};
		},
		mounted(){
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		},
		methods: {
			...mapActions(['login', 'fetchUserInfo']),
			onChange(e) {
				this.checked=e.target.checked;
			},
			async handleLogin() {
				this.isSubmitting = true;
				this.loginError = null;
				try {
					const response = await login({
						account: this.account,
						password: this.password,
						codeId: this.codeId,
						code: this.code,
					});

					if (response.data.code === 200 && response.data.type === 'success') {
						//存token，其实token和cookie可以用一个组件封装
						const token = response.data.result.accessToken;
						localStorage.setItem('accessToken', token);
						const refreshToken = response.data.result.refreshToken;
						localStorage.setItem('refreshToken', refreshToken);
						//记住账号密码
						if(this.checked){
							localStorage.setItem("account", this.account)
							localStorage.setItem("password", this.password)
							localStorage.setItem("saveAP", this.checked)
						}else{
							localStorage.removeItem("account")
							localStorage.removeItem("password")
							localStorage.removeItem("saveAP")
						}
						setTimeout(() => {
							this.$router.push({
								name: 'HomePage'
							});
						}, 1000);
						
					} else {
						this.loginError = response.data.message || '登录失败，请重试';
					}
				} catch (error) {
					this.loginError = '登录出错，请稍后重试';
					console.error('登录出错:', error);
				} finally {
					this.isSubmitting = false;
				}
			},
		},
	};
</script>

<style scoped>
	.login-page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f0f2f5;
	}

	.login-image {
		flex: 0.5;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		/* Hide the overflow to crop the image */
		height: 100vh;
		/* Ensure it takes full height */
	}

	.login-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		overflow: hidden;
		/* Crop the image to fill the container */
	}

	.login-container {
		flex: 1;
		max-width: 400px;
		margin: auto;
		padding: 20px;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.login-title {
		font-size: 24px;
		color: #1890ff;
		margin-bottom: 20px;
	}

	.form-group {
		margin-bottom: 15px;
		text-align: left;
	}

	.form-group label {
		display: block;
		margin-bottom: 5px;
		color: #333;
	}

	.form-group input {
		width: 100%;
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #ddd;
	}

	button {
		width: 100%;
		padding: 10px;
		background-color: #1890ff;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
		font-weight: bold;
	}

	button:disabled {
		background-color: #d9d9d9;
	}

	.error-message {
		color: red;
		margin-top: 10px;
	}
</style>