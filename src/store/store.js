import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import api from '../api';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		token: null,
		isLogged: false,
		currentUser: null,
		page: 0,
	},
	mutations: {
		login(state, payload) {
			localStorage.setItem('token', payload);
			axios.defaults.headers.common.Authorization = `Bearer ${payload}`;
			state.isLogged = true;
			state.token = payload;
		},

		logout(state) {
			localStorage.removeItem('token');
			axios.defaults.headers.common.Authorization = '';
			state.isLogged = false;
			state.token = null;
		},

		currentUser(state, payload) {
			state.currentUser = payload;
		},

		setPage(state, payload) {
			state.page = payload;
		},
	},
	actions: {
		async login({ dispatch, commit }, payload) {
			const json = await api.post('/auth/login', payload);

			if (json.status === 200) {
				await commit('login', json.data.access_token);
				await dispatch('getCurrentUser');
				return json;
			}

			throw json;
		},

		async checkLogged({ dispatch, commit }) {
			const token = localStorage.getItem('token');

			if (token !== null && token !== 'null') {
				await commit('login', token);
				await dispatch('getCurrentUser');
			}
		},

		async register(state, payload) {
			const json = await api.post('/auth/register', payload);

			if (json.status === 201) {
				return json;
			}

			throw json;
		},

		async logout({ dispatch, commit }) {
			const json = await api.index('/auth/logout');

			if (json.status === 200) {
				await commit('logout');
				await commit('currentUser', null);
				return json;
			}

			throw json;
		},

		async getCurrentUser({ commit }) {
			const json = await api.index('/auth/user');

			if (json.status === 200) {
				await commit('currentUser', json.data);
				return json;
			}

			throw json;
		},
	},
	getters: {
		isLogged: (state) => state.isLogged,
		currentUser: (state) => state.currentUser,
		page: (state) => state.page,
	},
});
