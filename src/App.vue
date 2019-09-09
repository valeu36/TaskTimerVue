<template>
  <div class="app-container">
    <app-start-task>
    </app-start-task>
    <app-tasks-table>
    </app-tasks-table>
  </div>
</template>

<script>
	import StartTask from './components/StartTask';
	import TasksTable from './components/TasksTable';

	export default {
		name: 'app',
		components: {
			appStartTask: StartTask,
			appTasksTable: TasksTable,
		},
		data() {
			return {};
		},
	};
</script>

<style>
  .app-container {
    margin: 0 auto;
    width: 1200px;
    font-family: 'Open Sans', sans-serif;
  }
</style>
