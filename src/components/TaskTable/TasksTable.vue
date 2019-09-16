<template>

  <div class="table-responsive" v-if="!isLoading">

    <modal-delete v-if="showModal" @close="showModal = false" @delete="deleteTask"/>

    <div class="table-name">
      TASK LOG
    </div>

    <table class="table table-hover">
      <thead>
      <tr>
        <th class="font-weight-normal" v-for="(header, index) in tableHeaders" :key="index">
          {{header}}
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="tableContent.rowContent.length">
        <tr class="" v-for="(content, index) in tableContent.rowContent" :key="index">
          <td>
            {{index + 1}}
          </td>
          <td v-for="cell in content">
            {{cell}}
          </td>
          <td>
            <button type="button" class="btn btn-light">
              INFO
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-light" @click="setDialog(index)">
              DELETE
            </button>
          </td>
        </tr>
        <tr>
          <th colspan="4">
            Total time spent:
          </th>
          <td  colspan="4" class="font-weight-bold">
            {{timeSpent}}
          </td>
        </tr>
      </template>

      <template v-else>
        <tr class="font-weight-bold">
          <td class="">
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
					|| this.tableContent.rowContent === undefined) {
					this.tableContent.rowContent = [];
				}
				if (this.timeSpentArray === null || this.timeSpentArray === undefined) {
					this.timeSpentArray = [];
				}
			},
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

  td, th {
    /*text-align: center;*/
    vertical-align: middle;
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
