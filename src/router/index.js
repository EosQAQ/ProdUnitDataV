import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	// {
	//   path: '/',
	//   name: 'index',
	//   component: () => import('../views/index.vue')
	// },
	// {
	//   path: '/hd/:orgCode',
	//   name: 'hd',
	//   component: () => import('../views/hd.vue')
	// },

	// {
	//   path: '/xny/:code',
	//   name: 'xny',
	//   component: () => import('../views/xny.vue')
	// },
	// {
	//   path: '/zhny',
	//   name: 'zhny',
	//   component: () => import('../views/zhny.vue')
	// },
	{
		path: '/',
		redirect: '/login', // 默认重定向到 /login
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	
	{
		path: '/page7',
		name: 'Page7',
		component: () => import('../views/sjdw.vue'),
		query: { dwmc: '' }
	},
	{
		path: '/home',
		name: 'HomePage',
		component: () => import('../views/index.vue'),
		// children: [
		// 	{
		// 		path: 'page7', // 改为相对路径
		// 		component: () => import('../views/page7/index.vue'),
		// 	}
		// ]
	}
]
const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	const isAuthenticated = !!localStorage.getItem('accessToken');
	if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
		next({
			name: 'Login'
		});
	} else {
		
		next();
	}
});

// router.beforeEach((to, from, next) => {
//     next(); // 绕过所有验证，允许访问所有页面
// });
//zan
export default router