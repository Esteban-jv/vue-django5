import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import axios from 'axios'
import naive from 'naive-ui'
import router from './router'

const app = createApp(App)

//app.config.globalProperties.$axios = axios
app.provide('axios',axios)
window.axios = axios

app.use(router)
app.use(naive)

app.mount('#app')
