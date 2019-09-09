<template>
  <div class="table-container">
    <table class="tasks-table">
      <thead>
      <tr class="table-row">
        <th class="table-header"
            v-for="(header, index) in tableHeaders"
            :key="index">
          {{header}}
        </th>
      </tr>
      </thead>
      <tbody class="table-body">
      <template v-if="tableContent.rowContent.length">
        <tr
          class="table-row"
          v-for="(content, index) in tableContent.rowContent"
          :key="index">
          <td class="table-cell">
            {{index + 1}}
          </td>
          <td class="table-cell" v-for="cell in content">
            {{cell}}
          </td>
          <button class="button">
            INFO
          </button>
          <button class="button" @click="deleteTask(index)">
            DELETE
          </button>
        </tr>
        <tr class="table-row">
          <th class="table-header total-time-header">
            Total
          </th>
          <td class="table-cell total-time">
          {{timeSpent}}
          </td>
        </tr>
      </template>
      <template v-else>
        <tr class="table-row">
          <td>
            Tasks Not Found
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>

	import { EventBus } from '../main';
	import moment from 'moment';

	const TABLE_HEADERS = [
		'№', 'Tasks', 'Time Start', 'Time End', 'Time Spend', 'Info', 'Delete',
  ];

	export default {
		data() {
			return {
				tableHeaders: TABLE_HEADERS,
				tableContent: {
					rowContent: [],
				},
        timeSpentArray: [],
        timeSpent: '',
        milliseconds: 0
			};
		},
		methods: {
			deleteTask(key) {
				this.tableContent.rowContent = this.tableContent.rowContent
					.filter((element, index) => index !== key);
        this.timeSpentArray = this.timeSpentArray
          .filter((element, index) => index !== key);
        this.updateTime(this.timeSpentArray, this.millisecond);
			},
			calculateMs(array) {
				return  array.reduce((acc, curr) => {
					return acc + curr;
        }, 0);
      },
			convertTime(milliseconds) {
				this.timeSpent = moment('000000', 'HH:mm:ss')
					.milliseconds(milliseconds).format('HH:mm:ss');
			},
      updateTime(array, milliseconds) {
				milliseconds = this.calculateMs(array);
				this.convertTime(milliseconds);
      },
		},
		mounted() {
			EventBus.$on('stopWasClicked', (taskInfo) => {
				const [content, timeSpent] = taskInfo;
				this.tableContent.rowContent.push(content);
				this.timeSpentArray.push(timeSpent);
				this.milliseconds = this.calculateMs(this.timeSpentArray);
				this.convertTime(this.milliseconds);
			});
		},
	};
</script>


<style scoped>
  .table-container {
    font-weight: lighter;
    font-size: 14px;
    color: rgba(0, 0, 0, 1);
  }

  .tasks-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }

  .table-row {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    min-height: 40px;
    border-bottom: 1px solid #dddddd;
  }

  .table-header,
  .table-cell {
    padding: 14px 40px 14px 16px;
  }

  .total-time {
    justify-self: flex-end;
    margin-right: 373px;
  }

  .total-time-header {
    justify-self: flex-start;
    margin-left: 211px;
  }

  .button {
    width: 80px;
    height: 30px;
    border: 0;
    background-color: white;
    box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    outline: none;
  }

  .button:active {
    transform: translateY(1px);
  }
</style>
