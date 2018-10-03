// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import SocketIo from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

export const SocketInstance = SocketIo('http://localhost:2100')

Vue.use(VueSocketIO, SocketInstance)

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
