import monitor from "../pages/monitor/index.vue";
import NotFoundView from "../components/404.vue";
import menuList from "../pages/sys/menu.vue";
import role from "../pages/sys/role.vue";
import resource from "../pages/sys/resource.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import sysUser from "../pages/sys/user.vue";
import userAdd from "../pages/sys/userAdd.vue";
import resetPwd from "../pages/resetPwd.vue";

import device from "../pages/device/device.vue";
import deviceAdd from "../pages/device/deviceAdd.vue";

import client from "../pages/client/index.vue";
// Routes
const routes = [
	{ path: '/login', component: login },
	{ path: '/client', component: client },
	{
		path: '/test',
		component: app,
		children: [
			{ path: '*', component: NotFoundView }
		]
	},
	{
		path: '',
		component: app,
		children: [
			{ path: '/resetPwd', component: resetPwd },
			{ path: '/index', component: monitor },
			
			{ path: '/device/device', component: device },
			{ path: '/device/deviceAdd', component: deviceAdd },
			
			{ path: '/sys/menuList', component: menuList },
			{ path: '/sys/roleList', component: role },
			{ path: '/sys/userList', component: sysUser },
			{ path: '/sys/userAdd', component: userAdd },
			{ path: '/sys/resource', component: resource }
		]
	},
	{ path: '*', component: NotFoundView }
]

export default routes