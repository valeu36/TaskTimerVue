<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a class="navbar-brand">TaskTimer</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item" v-if="isActive">
					<router-link class="nav-link" to="/">Home</router-link>
				</li>
				<template v-if="!isActive">
					<li class="nav-item">
						<router-link class="nav-link" to="/login">Login</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/register">Register</router-link>
					</li>
				</template>
                <li>
                    <button class="btn btn-primary" @click="show">CLICK</button>
                </li>
			</ul>

			<ul class="navbar-nav ml-auto" v-if="isActive">
				<li class="nav-item active">
					<button class="btn btn-secondary btn-sm" @click.prevent="onSubmit">Logout</button>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
    import { store } from '../../store/store';
    import api from '../../api';

export default {
	data() {
		return {};
	},
	methods: {
		async onSubmit() {
		    await this.$store.dispatch('logout');

		    // await this.$store.dispatch('checkLogged');

		    this.$router.push('/login');
        },
        async show() {
		    // console.log(store.getters.isLogged);
            // console.log(store.getters.currentUser);
            const { data } = await api.index('/auth/total_spent');

            console.log(data);
        }
	},
	computed: {
		isActive() {
			return this.$store.getters.isLogged;
		},
	},
};
</script>

<style scoped>
.router-link-exact-active {
	color: white !important;
}
</style>
