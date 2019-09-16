import Vue from 'vue';
import App from './App.vue';
import Bootstrap from 'bootstrap/scss/bootstrap.scss'

export const EventBus = new Vue();

Vue.use(Bootstrap);

new Vue({
  el: '#app',
  render: h => h(App),
});
