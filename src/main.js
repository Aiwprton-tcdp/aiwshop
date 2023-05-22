import { createApp } from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookies from 'js-cookie'
import 'flowbite'
import router from '@/utils/router'
import VueSidePanel from 'vue3-side-panel'
import VueDatePicker from '@vuepic/vue-datepicker'
import Toast from 'vue-toastification'

import '@/style.css'
import 'vue3-side-panel/dist/vue3-side-panel.css'
import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-toastification/dist/index.css'

// axios.defaults.withCredentials = true
axios.defaults.baseURL= 'http://aiwshopwebapi:8000/api/'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.post['Content-type'] = 'application/json'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Content-type'] = 'application/json'
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.interceptors.request.use(config => {
    const token = Cookies.get('access')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

const app = createApp(App)
app.use(router)
app.use(VueAxios, { ax: axios })
app.use(VueSidePanel)
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 1,
    newestOnTop: true
})
app.component('DatePicker', VueDatePicker)
app.mount('#app')
