<template>
	<div class="container">
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
				<label for="InputPassword">Name</label>
				<input type="text" class="form-control" id="InputName" placeholder="Name" v-model="name" />
			</div>
			<div class="form-group">
				<label for="InputPassword">Last Name</label>
				<input type="text" class="form-control" id="InputLastName" placeholder="Last Name" v-model="lastName" />
			</div>
			<div class="form-group">
				<label for="InputPassword">Middle Name</label>
				<input type="text" class="form-control" id="InputMiddleName" placeholder="Middle Name" v-model="middleName" />
			</div>
			<div class="form-group">
				<label for="InputPassword">Nick</label>
				<input type="text" class="form-control" id="InputNick" placeholder="Nick" v-model="nick" />
			</div>
			<div class="form-group">
				<label for="InputPassword">Password</label>
				<input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password" />
			</div>
			<div class="form-group">
				<label for="InputPasswordConfirm">Confirm password</label>
				<input
					type="password"
					class="form-control"
					id="InputPasswordConfirm"
					placeholder="Confirm Password"
					v-model="confirmPassword"
				/>
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
			name: '',
			lastName: '',
			middleName: '',
			nick: '',
			password: '',
			confirmPassword: '',
		};
	},
	components: {
		TopBar,
	},
	methods: {
		async onSubmit() {
			console.log(this.email + ' ' + this.password);
			await this.$store.dispatch('register', {
				email: this.email,
				name: this.name,
				last_name: this.lastName,
				middle_name: this.middleName,
				nick: this.nick,
				password: this.password,
				password_confirmation: this.confirmPassword,
			});
		},
	},
};
</script>
