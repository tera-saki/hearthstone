import Vue from 'vue'
import Router from 'vue-router'

import Cards from '@/components/Cards.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Cards',
      component: Cards
    }
  ]
})

export default router