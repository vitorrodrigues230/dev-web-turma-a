import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$apiUrl = process.env.VUE_API_APP_BASE_URL

createApp(App).use(router).mount('#app')
