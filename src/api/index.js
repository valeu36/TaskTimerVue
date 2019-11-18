import axios from 'axios';

// const baseURL = 'https://tasktimervue.firebaseio.com';
// const api = axios.create({
// 	baseURL: baseURL,
// });
//
// const getData = async (resource) => await api.get(resource);
// const setData = async (resource, data) => await api.put(resource, data);
//
// export default {
//   getData,
//   setData
// };

const api = axios.create({
  baseURL: 'http://tasktimer.local/api',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const get = async (resource, id = null) => await api.get(`${resource}/${id}`);
const post = async (resource, data) => await api.post(resource, data);

const index = async (resource) => await api.get(resource);
const show = async (resource, id = null) => await api.get(`${resource}/${id}`);
const store = async (resource, data) => await api.post(resource, data);
const update = async (resource, id, data) => await api.put(`${resource}/${id}`, data);
const destroy = async (resource, id) => await api.delete(`${resource}/${id}`);

export default {
  get,
  post,
  index,
  show,
  store,
  update,
  destroy,
};
