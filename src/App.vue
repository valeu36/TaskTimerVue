<template>
  <div class="app-container">
    <app-start-task>
    </app-start-task>
    <app-tabs>
      <app-tab name="TASK LOG" selected="true">
        <app-tasks-table>
        </app-tasks-table>
      </app-tab>
      <app-tab name="TASK CHART">
        <div class="task-chart-content">
          SOME CONTENT
        </div>
      </app-tab>
    </app-tabs>
  </div>
</template>

<script>
	import StartTask from './components/StartTask/StartTask';
	import TasksTable from './components/TaskTable/TasksTable';
	import Tabs from './components/Tabs/Tabs';
	import Tab from './components/Tabs/Tab/Tab';
	import DeleteModal from './components/Modals/DeleteModal/DeleteModal';

	export default {
		name: 'app',
		components: {
			Tab,
			appStartTask: StartTask,
			appTasksTable: TasksTable,
			appTabs: Tabs,
			appTab: Tab,
			appDeleteModal: DeleteModal,
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
