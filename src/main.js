import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import { romanize } from './utils'
import moment from 'moment'
import NProgress from 'vue-nprogress'

Vue.config.productionTip = false
const options = {
  // latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
  // router: true, // Show progressbar when navigating routes, default: true
  // http: false // Show progressbar when doing Vue.http, default: true
  color: 'red'
};
Vue.use(NProgress, options)
const nprogress = new NProgress()

moment.locale('vi');
Vue.prototype.$romanize = romanize
Vue.prototype.$moment = moment
Vue.prototype.$showAlert = (msg, type) => store.commit('setAlert', { msg, type })

new Vue({
  nprogress,
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
