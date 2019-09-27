import axios from 'axios';

const baseURL = 'https://tasktimervue.firebaseio.com';
const api = axios.create({
	baseURL: baseURL,
});

const isStartClicked = async (resource) => await api.get(resource);
const updateIsStartClicked = async (resource, data) => await api.put(resource, data);
const tableContent = async (resource) => await api.get(resource);
const timeSpentArray = async (resource) => await api.get(resource);
const updateTableContent = async(resource, data) => await api.put(resource, data);
const updateTimeSpentArray = async(resource, data) => await api.put(resource, data);

export default {
  isStartClicked,
  updateIsStartClicked,
	tableContent,
  timeSpentArray,
  updateTableContent,
  updateTimeSpentArray
};
