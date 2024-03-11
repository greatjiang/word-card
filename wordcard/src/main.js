import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import plugins from './plugins/fetch/fetch.js';

const app = createApp(App)
app.config.globalProperties.$fetch = plugins

app.use(createPinia())
app.use(router)

app.mount('#app')
