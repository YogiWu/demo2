import VueRouter from 'vue-router'

import Operate from '@/views/Operate'
// import Test from '@/views/Test'

const routes = [{
  path: '/',
  // component: Test
  component: Operate
}]

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routes
})

export default router
