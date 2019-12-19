<template>
	<div>
		<div class="container">
			<div class="h-100 row align-items-center justify-content-center">
				<template v-if="!isLoading">
					<template v-if="isPageExist">
						<div class="card" style="width: 24rem; min-height: 18rem">
							<div class="card-body">
								<h5 class="card-title">{{ id }}</h5>
								<p class="card-text d-flex justify-content-between">
									<b>Task name:</b> <span>{{ taskName }}</span>
								</p>
								<hr />
								<p class="card-text d-flex justify-content-between">
									<b>Task start:</b> <span>{{ taskStart }}</span>
								</p>
								<hr />
								<p class="card-text d-flex justify-content-between">
									<b>Task end:</b> <span>{{ taskEnd }}</span>
								</p>
								<hr />
								<p class="card-text d-flex justify-content-between">
									<b>Task spent:</b> <span>{{ taskSpent }}</span>
								</p>
								<hr />
								<button class="btn-light border-0 rounded" @click="navigateToHome">
									Home
								</button>
							</div>
						</div>
					</template>

					<template v-else>
<!--						<error />-->
                        <not-found />
					</template>
				</template>

				<template v-else>
					<spinner />
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../api/index';
// import Error from '../Error/Error';
import NotFound from '../NotFound/NotFound';
import Spinner from '../Spinner/Spinner';
import TopBar from '../Layouts/TopBar';

export default {
	props: ['id'],
	components: {
		// Error,
        NotFound,
		Spinner,
		TopBar,
	},
	data() {
		return {
			taskName: '',
			taskStart: '',
			taskEnd: '',
			taskSpent: '',
			isPageExist: true,
			isLoading: false,
		};
	},
	methods: {
		async getTableContent() {
			const { data } = await api.getData('/data.json');
			if (data.length < this.id) {
				this.isPageExist = false;
				return;
			}
			this.isPageExist = true;
			const [taskName, taskStart, taskEnd, taskSpent] = data[this.id - 1];
			this.taskName = taskName;
			this.taskStart = taskStart;
			this.taskEnd = taskEnd;
			this.taskSpent = taskSpent;
		},
		navigateToHome() {
			this.$router.push({ name: 'Home' });
		},
	},
	async mounted() {
		this.isLoading = true;
		await this.getTableContent();
		this.isLoading = false;
	},
};
</script>

<style></style>
