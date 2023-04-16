import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/dashboard2',
                name: 'dashboard2',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard2.vue'),
            },
            {
                path: '/table',
                name: 'basetable',
                meta: {
                    title: '表格',
                    permiss: '9',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/table.vue'),
            },
            {
                path: '/table2',
                name: 'basetable2',
                meta: {
                    title: '表格',
                    permiss: '9',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/table2.vue'),
            },{
                path: '/important',
                name: 'important',
                meta: {
                    title: '表格',
                    permiss: '9',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/important.vue'),
            },
            {
                path: '/charts',
                name: 'basecharts',
                meta: {
                    title: '图表',
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/charts.vue'),
            },
            {
                path: '/form',
                name: 'baseform',
                meta: {
                    title: '表单',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/form.vue'),
            },{
                path: '/form2',
                name: 'baseform2',
                meta: {
                    title: '表单',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/form2.vue'),
            },{
                path: '/form3',
                name: 'baseform3',
                meta: {
                    title: '表单',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/form3.vue'),
            },
            {
                path: '/tabs',
                name: 'tabs',
                meta: {
                    title: '回复管理',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/tabs.vue'),
            },
            {
                path: '/donate',
                name: 'donate',
                meta: {
                    title: '鼓励作者',
                    permiss: '14',
                },
                component: () => import(/* webpackChunkName: "donate" */ '../views/donate.vue'),
            },
            {
                path: '/permission',
                name: 'permission',
                meta: {
                    title: '权限管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "permission" */ '../views/permission.vue'),
            },
            {
                path: '/upload',
                name: 'upload',
                meta: {
                    title: '上传插件',
                    permiss: '6',
                },
                component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue'),
            },
            {
                path: '/icon',
                name: 'icon',
                meta: {
                    title: '自定义图标',
                    permiss: '10',
                },
                component: () => import(/* webpackChunkName: "icon" */ '../views/icon.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '短信发送',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/consumer.vue'),
            },{
                path: '/consumer2',
                name: 'consumer2',
                meta: {
                    title: '短信发送',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/consumer2.vue'),
            },{
                path: '/form4',
                name: 'form4',
                meta: {
                    title: '短信发送',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/form4.vue'),
            },{
                path: '/device',
                name: 'device',
                meta: {
                    title: '短信发送',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/device.vue'),
            },
            {
                path: '/editor2',
                name: 'editor2',
                meta: {
                    title: '短信群发2',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/editor2.vue'),
            },
            {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '9',
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue'),
            },{
                path: '/cuxiao',
                name: 'cuxiao',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '9',
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/cuxiao.vue'),
            },
            {
                path: '/export',
                name: 'export',
                meta: {
                    title: '导出Excel',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "export" */ '../views/export.vue'),
            },
            {
                path: '/export2',
                name: 'export2',
                meta: {
                    title: '导出Excel',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "export" */ '../views/export2.vue'),
            },
            {
                path: '/import',
                name: 'import',
                meta: {
                    title: '导入Excel',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "import" */ '../views/import.vue'),
            },
            {
                path: '/1-2',
                name: '1-2',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/1-2.vue'),
            },
            {
                path: '/1-3',
                name: '1-3',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/1-3.vue'),
            },
            {
                path: '/2-1',
                name: '2-1',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/2-1.vue'),
            },
            {
                path: '/2-2',
                name: '2-2',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/2-2.vue'),
            },
            {
                path: '/2-3',
                name: '2-3',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/2-3.vue'),
            },
            {
                path: '/3-1',
                name: '3-1',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/3-1.vue'),
            },
            {
                path: '/3-2',
                name: '3-2',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/3-2.vue'),
            },
            {
                path: '/3-3',
                name: '3-3',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/3-3.vue'),
            },
            {
                path: '/4-1',
                name: '4-1',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/4-1.vue'),
            },
            {
                path: '/4-2',
                name: '4-2',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/4-2.vue'),
            },
            {
                path: '/4-3',
                name: '4-3',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/4-3.vue'),
            },
            {
                path: '/5-1',
                name: '5-1',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/5-1.vue'),
            },
            {
                path: '/5-2',
                name: '5-2',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/5-2.vue'),
            },
            {
                path: '/5-3',
                name: '5-3',
                meta: {
                    title: '管理首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/5-3.vue'),
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `炅光互动直播系统`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
