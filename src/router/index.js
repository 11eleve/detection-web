import Vue from 'vue'
//对应你要跳转的组件
import Router from 'vue-router'


    
export default new Router({
    mode:'history',
    routes: [
        {path:'/',name:'Login',component:()=>import('../views/login/Login.vue')},
        {path:'/Check',name:'Check',component:()=>import('../views/Check.vue')},
        {path:'/Set', name:'Set', component:()=>import('../views/set/set.vue')},
        {path:'/User', name:'User', component:()=>import('../views/user/user.vue')}
    ]
})

Vue.use(Router)
