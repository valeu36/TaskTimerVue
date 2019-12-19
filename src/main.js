import Vue from 'vue';
import App from './App.vue';
// import bootstrap from 'bootstrap/scss/bootstrap.scss';
import VueRouter from 'vue-router';
// import { index } from './router';
import {routes} from './router';
import { store } from './store/store';
// import VueRouter from "vue-router/types/router";

export const eventBus = new Vue();

// const router = new VueRouter({
// 	routes: index,
// 	mode: 'history',
// });

const router = new VueRouter({
    routes,
    mode: 'history',
    saveScrollPosition: false,
});


// Vue.use(Bootstrap);
Vue.use(VueRouter);

store.dispatch('checkLogged');

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App),
});
