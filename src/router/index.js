import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/standard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/user_mgt',
                    component: resolve => require(['../components/page/system/UserMgt.vue'], resolve),
                    meta: {title: '用户管理'}
                },
                {
                    path: '/role_mgt',
                    component: resolve => require(['../components/page/system/RoleMgt.vue'], resolve),
                    meta: {title: '角色管理'}
                },
                {
                    path: '/resource_mgt',
                    component: resolve => require(['../components/page/system/ResourceMgt.vue'], resolve),
                    meta: {title: '资源管理'}
                },
                {
                    path: '/log_mgt',
                    component: resolve => require(['../components/page/system/Log.vue'], resolve),
                    meta: {title: '系统日志查询'}
                },
                {
                    path: '/main_material',
                    component: resolve => require(['../components/page/decoration/MainMaterial.vue'], resolve),
                    meta: {title:'主材维护'}
                },
                {
                    path: '/standard',
                    component: resolve => require(['../components/page/decoration/Standard.vue'], resolve),
                    meta: {title:'主材规格'}
                },
                {
                    path: '/vendor',
                    component: resolve => require(['../components/page/decoration/Vendor.vue'], resolve),
                    meta: {title:'商家管理'}
                },
                {
                    path: '/project',
                    component: resolve => require(['../components/page/decoration/Project.vue'], resolve),
                    meta: {title:'工地管理'}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: {title: '403'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
