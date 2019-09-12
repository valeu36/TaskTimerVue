<template>
  <div class="app-container">

    <start-task/>

    <tabs>
      <tab name="TASK LOG" selected="true">
        <tasks-table>
        </tasks-table>
      </tab>
      <tab name="TASK CHART">
        <div class="task-chart-content">
          SOME CONTENT
        </div>
      </tab>
    </tabs>

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
  .app-container {
    margin: 0 auto;
    width: 1200px;
    font-family: 'Roboto', sans-serif;
  }

  .task-chart-content {
    text-align: center;
    margin: 50px
  }
</style>
