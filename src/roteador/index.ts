import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress';
import Editor from '../views/Editor.vue'
import Posts from '../views/Posts.vue'
import Post from '../views/Post.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import EmailSuccess from '../views/EmailSuccess.vue'
import EmailVerifySuccess from '../views/EmailVerufySuccess.vue'
import SuasDuvidas from '../views/SuasDuvidas.vue'
import View404 from '../views/View404.vue'
import Tags from '../views/Tags.vue'
import User from '../views/User.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import RecoveryPassword from '../views/RecoveryPassword.vue'
import SuccessChangePassword from '../views/SuccessChangePassword.vue'
import store from '../store/index'

const rotas: RouteRecordRaw[] = [
    {
        path: '/user',
        name: 'User',
        component: User,
        beforeEnter: async (to, from, next) => {
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']


            if (!isLoggedIn) {
                next('/login')
            }
            else if (requiresGuest && isLoggedIn) {
                next()
            }
            else {
                next();
            }
        }
    },
    {
        path: '/tags',
        name: 'Tags',
        component: Tags,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'View404',
        component: View404,
    },
    {
        path: '/',
        name: 'Editor',
        component: Editor,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            requiresAuth: false
        },
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']

            if (requiresAuth && !isLoggedIn) {
                next("/");
            } else if (requiresGuest && isLoggedIn) {
                next("/posts");
            } else {
                next();
            }
        }
    },
    {
        path: '/recovery-password/:code',
        name: 'RecoveryPassword',
        component: RecoveryPassword,
        props: true,
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']

            if (requiresAuth && !isLoggedIn) {
                next("/");
            } else if (requiresGuest && isLoggedIn) {
                next("/posts");
            } else {
                next();
            }
        }
    }, {
        path: '/success-change-password/',
        name: 'SuccessChangePassword',
        component: SuccessChangePassword,
        meta: {
            requiresGuest: true
        },
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']
            console.log(isLoggedIn);

            if (requiresAuth && !isLoggedIn) {
                next("/");
            } else if (requiresGuest && isLoggedIn) {
                next("/posts");
            } else {
                next();
            }
        }
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post,
        props: true
    },
    {
        path: '/login/',
        name: 'Login',
        meta: {
            requiresGuest: true
        },
        component: Login,
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']

            if (requiresAuth && !isLoggedIn) {
                next("/");
            } else if (requiresGuest && isLoggedIn) {
                next("/posts");
            } else {
                next();
            }
        }
    },
    {
        path: '/cadastro/',
        name: 'Cadastro',
        component: Cadastro,
        props: true,
        meta: {
            requiresGuest: true
        },
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']

            if (requiresAuth && !isLoggedIn) {
                next("/");
            } else if (requiresGuest && isLoggedIn) {
                next("/posts");
            } else {
                next();
            }
        }

    },
    {
        path: '/email_success/:email',
        name: 'EmailSuccess',
        component: EmailSuccess,
        props: true,
        meta: {
            requiresGuest: true
        },
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']
            console.log(isLoggedIn);

            if (requiresAuth && !isLoggedIn) {
                next("/");
            } else if (requiresGuest && isLoggedIn) {
                next("/posts");
            } else {
                next();
            }
        }
    },
    {
        path: '/email_verify_success/:code',
        name: 'EmailVerifySuccess',
        component: EmailVerifySuccess,
        props: true,
        meta: {
            requiresGuest: true
        },
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']
            console.log(isLoggedIn);

            if (requiresAuth && !isLoggedIn) {
                next("/");
            } else if (requiresGuest && isLoggedIn) {
                next("/posts");
            } else {
                next();
            }
        }
    },
    {
        path: '/suas_duvidas',
        name: 'SuasDuvidas',
        component: SuasDuvidas,
        meta: {
            requiresGuest: false
        },
        beforeEnter: async (to, from, next) => {
            const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
            const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
            const isLoggedIn = store.getters['isLogado']

            if (requiresAuth) {
                if (!isLoggedIn) {
                    next('/login')
                }
            } else if (requiresGuest && isLoggedIn) {
                next()
            }
            else {
                next();
            }
        }
    }
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

roteador.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
})

roteador.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})

export default roteador;