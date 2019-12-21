import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import {routes} from './router';
import { store } from './store/store';
import Paginate from 'vuejs-paginate';


export const eventBus = new Vue();

const router = new VueRouter({
    routes,
    mode: 'history',
    saveScrollPosition: false,
});

Vue.component('paginate', Paginate);

Vue.use(VueRouter);

store.dispatch('checkLogged');

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App),
});
