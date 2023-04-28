
import { createApp } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import App from './App.vue'
import roteador from './roteador'
import { store } from './store'
import '../node_modules/nprogress/nprogress.css' 

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const options: PluginOptions = {
    position: POSITION.TOP_LEFT
};

createApp(App)
.use(VueAwesomePaginate)
.use(Toast, options)
.use(roteador)
.use(CKEditor)
.use(store)
.mount('#app')
