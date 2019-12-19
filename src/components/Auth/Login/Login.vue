<template>
	<div>
		<form class="container col-md-4 mt-3 card card-body">
			<div class="form-group">
				<label for="InputEmail">Email address</label>
				<input
					type="email"
					class="form-control"
					id="InputEmail"
					aria-describedby="emailHelp"
					placeholder="Enter email"
					v-model="email"
				/>
				<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
			</div>
			<div class="form-group">
				<label for="InputPassword">Password</label>
				<input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password" />
			</div>
			<button type="submit" class="btn btn-primary" @click.prevent="onSubmit">Submit</button>
		</form>
	</div>
</template>

<script>
import TopBar from '../../Layouts/TopBar';

export default {
	data() {
		return {
			email: '',
			password: '',
		};
	},
	components: {
		TopBar,
	},
	methods: {
		async onSubmit() {
			// console.log(this.email + ' ' + this.password);
			const { data } = await this.$store.dispatch('login', {
				email: this.email,
				password: this.password,
			});
			// await this.$store.dispatch('checkLogged');
			await this.$router.push('/');
		},
	},
	mounted() {
		// console.log(this.$store.getters.isLogged);
		// console.log(this.$store.getters.token)
        console.log('LUL BLEAT')
	},
};
</script>
