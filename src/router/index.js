import VueRouter from 'vue-router'

import Operate from '@/views/Operate'

const routes = [{
  path: '/',
  component: Operate
}]

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routes
})

export default router
