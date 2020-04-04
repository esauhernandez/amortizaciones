import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import VueMdl 		from 'vue-mdl'
import VueJsonToCsv from 'vue-json-to-csv'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'vue-material/dist/vue-material.css'

Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.use(VueMdl)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueJsonToCsv)

Vue.config.productionTip = false

Vue.material.registerTheme('default', {
  primary: 'amber',
  accent: 'white',
  warn: 'amber',
  white: 'white',
  background: 'white',
  red: 'red',
  green: 'green'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
