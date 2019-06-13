console.log('main.js');

import Vue from 'vue';
// 导入app.vue根组件
import app from './app.vue'

// 引入vue-resourec模块，发送ajax请求
import vueResourec from 'vue-resource'
Vue.use(vueResourec);
//引入vue-router路由
import VueRouter from 'vue-router';
//安装到vue身上去
Vue.use(VueRouter);
// 引入路由匹配对应的组件
import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import newslist from './components/news/newslist.vue'
// 定义路由匹配
var router = new VueRouter({
    routes: [{ path: '/', redirect: '/home' }, //重定向
        { path: '/home', component: home },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },
        { path: '/home/newslist', component: newslist },
    ],
    // 修改路由匹配的默认类,改成mui的类----修改选中tabbar的高亮效果
    'linkActiveClass': 'mui-active'
});

//引入路由模块，获取路由对象
// import router from './router.js';

// 引入mint-ui组件  css 按需引入，js全部引入
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css' //css全局引入
Vue.component(Header.name, Header);
import { Tabbar, TabItem } from 'mint-ui'; //引入tabbar
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
// mint-ui引入轮播图
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 引入mui-tabbar 组件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css' //字体文件


// 创建实例
new Vue({
    el: '#app',
    // 会覆盖掉app模板
    // render: function(c) {
    //     return c(app);
    // }
    // 当函数参数只有1个可以省略括号，函数体内部只有1行可以省略{} ,一条语句可以省略retuen
    render: c => c(app),
    // 把路由匹配对象挂载到vm实例中
    router: router
});