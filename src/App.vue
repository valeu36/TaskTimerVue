<template>
	<router-view /> <!--v-if="isLoading">-->
</template>

<script>
// import api from './api/index';

export default {
	name: 'app',
	// data() {
	// 	return {
	// 		refCount: 0,
	// 		isLoading: false,
	// 	};
	// },
	// created() {
	// 	api.interceptors.request.use((config) => {
  //     this.setLoading(true);
  //     return config;
  //   }, (error) => {
  //     this.setLoading(false);
  //     return Promise.reject(error);
  //   });
  //
  //   api.interceptors.response.use((response) => {
  //     this.setLoading(false);
  //     return response;
  //   }, (error) => {
  //     this.setLoading(false);
  //     return Promise.reject(error);
  //   });
	// },
  // methods: {
	// 	setLoading(isLoading) {
  //     if (isLoading) {
  //       this.refCount++;
  //       this.isLoading = true;
  //     } else if (this.refCount > 0) {
  //       this.refCount--;
  //       this.isLoading = (this.refCount > 0);
  //     }
  //   }
  // }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto:100,300,400,500,700&display=swap');

html {
	height: 100%;
	font-size: 0.95rem;
	font-family: 'Open Sans', sans-serif;
}

body {
	height: 100%;
	font-family: 'Open Sans', sans-serif;
}
</style>
