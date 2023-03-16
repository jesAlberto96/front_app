import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ToastPlugin from 'vue-toast-notification';

import './assets/main.css';
import "toastify-js/src/toastify.css"

const app = createApp(App)

app.use(ToastPlugin);
app.use(router)

app.mount('#app')
