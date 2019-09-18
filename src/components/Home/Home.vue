<template>
  <div class="container">

    <start-task/>

    <tasks-table>
    </tasks-table>

  </div>
</template>

<script>
	import StartTask from '../Timer/Timer';
	import TasksTable from '../TaskTable/TasksTable';

	export default {
		name: 'app',
		components: {
			StartTask,
			TasksTable,
		},
	};
</script>

<style>
</style>
