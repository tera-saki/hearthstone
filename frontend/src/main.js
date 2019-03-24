import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import Tooltip from 'vue-directive-tooltip'
import 'vue-directive-tooltip/css/index.css'
import underscore from 'vue-underscore'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(AsyncComputed, {
  default: {}
})
Vue.use(underscore)
Vue.use(Tooltip)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
