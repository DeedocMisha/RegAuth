import './assets/main.css'
import App from './components/App.vue';
import router from '@/router'
import { createApp } from 'vue'
import "./style.css"; 
import axios from 'axios'; // Импортируем Axios

const app = createApp(App);
app.use(router);

// Подключаем Axios
app.config.globalProperties.$axios = axios;

app.mount('#app');
