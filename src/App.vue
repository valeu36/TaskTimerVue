<template>
  <div class="container">

    <start-task/>

    <tasks-table>
    </tasks-table>

  </div>
</template>

<script>
	import StartTask from './components/Timer/Timer';
	import TasksTable from './components/TaskTable/TasksTable';
	import Tabs from './components/Tabs/Tabs';
	import Tab from './components/Tabs/Tab/Tab';
	import DeleteModal from './components/Modals/DeleteModal/DeleteModal';

	export default {
		name: 'app',
		components: {
			StartTask,
			TasksTable,
			Tabs,
			Tab,
			DeleteModal,
		},
	};
</script>

<style>
  html {
    font-size: 1rem;
  }
</style>
