import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueCompositionAPI)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP_API_KEY,
    libraries: "places", // necessary for places input
    region: 'GB',
    language: 'en',
  },
  installComponents: true
});

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
