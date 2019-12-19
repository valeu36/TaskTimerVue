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
    'Accept': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
});

axios.interceptors.request.use(
  config => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
  },
  error => {
      Promise.reject(error)
  });

// created: function () {
//     axios.interceptors.response.use(undefined, function (err) {
//         return new Promise(function (resolve, reject) {
//             if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
//                 // if you ever get an unauthorized, logout the user
//                 this.$store.dispatch(AUTH_LOGOUT)
//                 // you can also redirect to /login if needed !
//             }
//             throw err;
//         });
//     });
// }

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
