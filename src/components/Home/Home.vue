<template>
	<div>
		<div class="container">
			<start-task />

			<tasks-table />
		</div>
	</div>
</template>

<script>
import StartTask from '../Timer/Timer';
import TasksTable from '../TaskTable/TasksTable';
import TopBar from '../Layouts/TopBar';

export default {
	name: 'app',
	components: {
		StartTask,
		TasksTable,
		TopBar,
	},
};
</script>

<style></style>
