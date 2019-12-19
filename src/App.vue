<template>
	<div class="container">
		<top-bar :isLogged="isLogged"/>
		<router-view />
	</div>
</template>

<script>
import TopBar from './components/Layouts/TopBar';
import {store} from './store/store';

import Bootstrap from 'bootstrap/scss/bootstrap.scss';
import BootstrapJQuery from 'bootstrap/dist/js/bootstrap.min';

export default {
    data() {
      return {
          isLogged: store.getters.isLogged
      }
    },
	name: 'app',
	components: { TopBar },
	comments: {
		TopBar,
	},
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
