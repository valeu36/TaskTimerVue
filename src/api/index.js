import axios from 'axios';

const baseURL = 'https://tasktimervue.firebaseio.com';
const api = axios.create({
	baseURL: baseURL,
});

const getData = async (resource) => await api.get(resource);
const setData = async (resource, data) => await api.put(resource, data);

export default {
  getData,
  setData
};
