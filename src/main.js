// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

Vue.use(moment)

Vue.config.productionTip = false

// Global uppercase filter
Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MMM Do YY')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
