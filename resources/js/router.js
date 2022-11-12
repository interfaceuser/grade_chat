import chatPage from "./chatPage";
import loginPage from "./loginPage";
import registerPage from "./registerPage"

import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

const routes = [
    {
      path: '/',
      component: loginPage
    },
    {
        path: '/login',
        component: loginPage,
        exact: true
    },
    {
        path: '/register',
        component: registerPage,
        exact: true
    },
    {
        path: '/chat',
        component: chatPage,
        exact: true
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes : routes
})

export default router;
