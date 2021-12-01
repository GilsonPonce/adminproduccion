import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import swal from "sweetalert";



//npm install vue-json-excel
//npm install sweetalert --save
//npm install vue-cookie --save
//npm install --save axios vue-axios
createApp(App).use(store).use(router).mount('#app')
