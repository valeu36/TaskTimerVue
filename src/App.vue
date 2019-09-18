<template>

  <transition name="slide" mode="out-in">
    <router-view></router-view>
  </transition>

</template>

<script>

	export default {
		name: 'app',
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

  #app {
    font-family: 'Open Sans', sans-serif;
  }

  .slide-leave-active {
    transition: opacity 150ms ease;
    opacity: 0;
    animation: slide-out 150ms ease-out forwards;
  }

  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-enter-active {
    animation: slide-in 150ms ease-out forwards;
  }

  @keyframes slide-out {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(300px);
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateX(300px);
    }
    100% {
      transform: translateX(0);
    }
  }

</style>
