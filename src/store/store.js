// Not used anywhere yet
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		tableContent: [],
		timeSpentArray: [],
	},
	mutations: {
		setTableContent(state, tableContent) {
			state.tableContent = tableContent;
		},
		setTimeSpentArray(state, timeSpentArray) {
			state.timeSpentArray = timeSpentArray;
		},
		pushIntoTableContent(state, tableContent) {
			state.tableContent.push(tableContent);
		},
		pushIntoTimeSpentArray(state, timeSpentArray) {
			state.timeSpentArray.push(timeSpentArray);
		},
	},
	actions: {},
	getters: {
		tableContent(state) {
			return state.tableContent;
		},
		timeSpentArray(state) {
			return state.timeSpentArray;
		},
	},
});
