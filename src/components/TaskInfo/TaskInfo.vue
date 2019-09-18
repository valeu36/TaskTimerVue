<template>
  <div class="h-100 row align-items-center justify-content-center">
  <div class="card" style="width: 24rem; min-height: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{id}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
    </div>


</template>

<script>
  export default {
  	props: ['id']
    // data() {
    // 	return {
    // 		cardNumber: this.$route.params.id
    //   }
    // }
  }
</script>

<style>

</style>
