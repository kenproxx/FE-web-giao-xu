import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";



Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
