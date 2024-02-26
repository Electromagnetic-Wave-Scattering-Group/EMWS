import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { paramStore } from '@/store/emws';
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
  locale: 'en',
  messages
})

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@fortawesome/fontawesome-free/css/all.css' 
import { aliases, fa } from 'vuetify/iconsets/fa'
import PrimeVue from 'primevue/config';
import VueApexCharts from "vue3-apexcharts";




const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  }
}) 

createApp(App).use(store).use(router).use(vuetify).use(PrimeVue).use(VueApexCharts).use(i18n).mount('#app')
