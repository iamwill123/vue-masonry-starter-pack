import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Global uppercase filter
Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
