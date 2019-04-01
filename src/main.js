import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import 'normalize.css'

import { Drag, Drop } from 'vue-drag-drop'

import ClickOutside from 'vue-click-outside'

// Vue.use(ClickOutside)

Vue.directive('cos', ClickOutside)

Vue.component('drag', Drag)
Vue.component('drop', Drop)

Vue.use(Antd)

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
