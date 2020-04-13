import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ele from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../less/reset.min.css'
Vue.use(ele)
Vue.config.productionTip = false
router.beforeEach((to, form, next) => {
  //to 是要去的路径  若to的路径  没有权限，那么我们不执行next
  let power = localStorage.getItem('POWER') || '';//用户权限
  if (/^\/\w+[/]?$/.test(to.path)) {
    next()
  }
  if (power.indexOf(to.meta.power) != -1) {
    next()
  }else{
    // next(from)
  }·
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
