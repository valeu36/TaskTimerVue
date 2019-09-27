import Vue from 'vue';
import App from './App.vue';
import Bootstrap from 'bootstrap/scss/bootstrap.scss';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store';

export const eventBus = new Vue();

const router = new VueRouter({
	routes,
	mode: 'history',
});

Vue.use(Bootstrap);
Vue.use(VueRouter);

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App),
});
