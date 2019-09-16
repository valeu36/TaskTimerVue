<template>

  <div class="table-container" v-if="!isLoading">

    <modal-delete v-if="showModal" @close="showModal = false" @delete="deleteTask">
    </modal-delete>

    <div class="table-name">
      TASK LOG
    </div>

    <table class="tasks-table">
      <thead class="table-head">
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
          <button class="button" @click="setDialog(index)">
            DELETE
          </button>
        </tr>
        <tr class="table-row total-time-row">
          <th class="table-header total-time-header">
            Total
          </th>
          <td class="table-cell total-time-cell">
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

    <spinner v-else/>

</template>

<script>

	import { EventBus } from '../../main';
	import moment from 'moment';
	import axios from 'axios';
	import ModalDelete from '../Modals/DeleteModal/DeleteModal';
	import Spinner from '../Spinner/Spinner';

	const TABLE_HEADERS = [
		'№', 'Tasks', 'Time Start', 'Time End', 'Time Spend', 'Info', 'Delete',
	];

	export default {
		components: {
			ModalDelete,
			Spinner,
		},
		data() {
			return {
				tableHeaders: TABLE_HEADERS,
				tableContent: {
					rowContent: [],
				},
				timeSpentArray: [],
				timeSpent: '',
				milliseconds: 0,
				showModal: false,
				indexOfDeletedItem: null,
				isLoading: false,
			};
		},
		methods: {
			deleteTask() {
				EventBus.$emit('deleteTaskWasClicked');
				this.tableContent.rowContent = this.tableContent.rowContent
					.filter((element, index) => index !== this.indexOfDeletedItem);
				this.timeSpentArray = this.timeSpentArray
					.filter((element, index) => index !== this.indexOfDeletedItem);
				this.updateTime(this.timeSpentArray, this.millisecond);
				this.sendData(this.tableContent.rowContent, 'data');
				this.sendData(this.timeSpentArray, 'timeSpentArray');
				this.indexOfDeletedItem = null;
				this.showModal = false;
			},
			calculateMs(array) {
				return array.reduce((acc, curr) => {
					return acc + curr;
				}, 0);
			},
			convertTime(milliseconds) {
				this.timeSpent = moment('000000', 'HH:mm:ss')
					.milliseconds(milliseconds).format('HH:mm:ss');
			},
			updateTime(array, milliseconds) {
				milliseconds = this.calculateMs(array);
				return this.convertTime(milliseconds);
			},
			setDialog(idx) {
				this.showModal = true;
				this.indexOfDeletedItem = idx;
			},
			sendData(data, name) {
				axios.put(`https://tasktimervue.firebaseio.com/${name}.json`, data)
					.then(response => {
						console.log('data was sent');
					})
					.catch(error => console.log(error));
			},
			getData(name) {
				axios.get(`https://tasktimervue.firebaseio.com/${name}.json`)
					.then(response => {
						return response;
					})
					.then(data => {
						if (name === 'data') {
							this.tableContent.rowContent = data.data;
            }
						if (name === 'timeSpentArray') {
							this.timeSpentArray = data.data;
            }
            this.nullCheck();
            this.isLoading = false;
					})
          .then(() => {
          	this.updateTime(this.timeSpentArray, this.milliseconds);
          })
					.catch(error => {
						console.log(error);
					});
			},
      nullCheck() {
				if (this.tableContent.rowContent === null
          || this.tableContent.rowContent === undefined ) {
					this.tableContent.rowContent = [];
        }
				if (this.timeSpentArray === null || this.timeSpentArray === undefined) {
					this.timeSpentArray = [];
        }
      }
		},
		mounted() {
			this.isLoading = true;
			EventBus.$on('stopWasClicked', (taskInfo) => {
				const { tableContent, milliseconds } = taskInfo;
				this.tableContent.rowContent.push(tableContent);
				this.timeSpentArray.push(milliseconds);
				this.sendData(this.tableContent.rowContent, 'data');
				this.sendData(this.timeSpentArray, 'timeSpentArray');
				this.updateTime(this.timeSpentArray, this.millisecond);
			});
			this.getData('data');
			this.getData('timeSpentArray');
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
    min-height: 45px;
    border-bottom: 1px solid #dddddd;
  }

  .table-header,
  .table-cell {
    min-width: 15px;
    padding: 10px 20px;
  }

  .total-time-cell {
    justify-self: flex-end;
    margin-right: 380px;
  }

  .total-time-header {
    justify-self: flex-start;
    margin-left: 220px;
    color: inherit !important;
    font-weight: bold !important;
  }

  .total-time-row {
    color: black;
    font-weight: bold;
  }

  .table-header {
    font-weight: 400;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
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

  .table-name {
    width: 100%;
    height: 43px;
    background-color: #3f51b5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #f50057;
    color: rgba(255, 255, 255, 1);
  }

</style>
