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
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="RememberMe" v-model="rememberMe">
                <label class="form-check-label" for="RememberMe">Remember Me</label>
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
            rememberMe: false
		};
	},
	components: {
		TopBar,
	},
	methods: {
		async onSubmit() {
			await this.$store.dispatch('login', {
				email: this.email,
				password: this.password,
                remember_me: this.rememberMe
			});
			await this.$router.push('/home');
		},
	}
};
</script>
