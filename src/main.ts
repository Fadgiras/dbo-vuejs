import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from 'vue-apexcharts'

createApp(App)
  .use(store)
  .use(router)
  .component('apexchart', VueApexCharts)
  .mount('#app')
