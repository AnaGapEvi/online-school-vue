// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from "moment";




Vue.config.productionTip = false

require('./plugins')
require('./components/custom/custom')


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  moment,
  components: { App },
  template: '<App/>'
})
