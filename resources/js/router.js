import chatPage from "./chatPage";
import loginPage from "./loginPage";
import registerPage from "./registerPage"

import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import profilePage from "./profilePage";

const routes = [
    {
      path: '/',
      component: loginPage,
        name: 'index'
    },
    {
        path: '/login',
        component: loginPage,
        exact: true,
        name: 'user.login'
    },
    {
        path: '/register',
        component: registerPage,
        exact: true,
        name: 'user.registration'
    },
    {
        path: '/chat',
        component: chatPage,
        exact: true,
        name: 'chat'
    },
    {
        path: '/profile',
        component: profilePage,
        exact: true,
        name: 'profile'
    },
]

const router = createRouter({
    history : createWebHistory(),
    routes : routes
})

export default router;
