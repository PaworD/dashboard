import './firebase'
import 'firebase/app'
import { rtdbPlugin } from 'vuefire'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'


Vue.config.productionTip = false

Vue.use(rtdbPlugin)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
