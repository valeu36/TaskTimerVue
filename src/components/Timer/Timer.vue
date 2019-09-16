<template>
  <div class="container">

    <input-modal v-if="showModal" @close="showModal = false" />

    <div class="text-center">
      <input class="input-task" type="text" placeholder="Task name" v-model="taskName">
      <timer :startIsClicked="isStartClicked" :difference="difference">
      </timer>
      <button type="button" class="btn btn-light m-2" @click.prevent="toggleTask">
        {{isStartClicked ? 'STOP' : 'START'}}
      </button>
    </div>


  </div>
</template>

<script>
	import Timer from './Clock/Clock';
	import moment from 'moment';
	import { EventBus } from '../../main';
	import InputModal from '../Modals/InputModal/InputModal';
	import axios from 'axios';

	export default {
		data() {
			return {
				isStartClicked: false,
				taskName: '',
				timeStart: '',
				timeEnd: '',
				timeSpent: '',
				startPoint: 0,
				endPoint: 0,
				tableContent: [],
				showModal: false,
				difference: 0,
        data: {}
			};
		},
		components: {
			Timer,
			InputModal,
		},
		methods: {
			toggleTask() {
				this.isStartClicked = !this.isStartClicked;
				if (this.isStartClicked) {
					this.start();
				} else {
					this.stop();
				}
			},
			start() {
				this.startPoint = moment();
				this.timeStart = this.startPoint.format('HH:mm:ss');
        this.formatTime();
				this.sendData([this.isStartClicked, this.timeStart]);
			},
			stop() {
				if (!this.taskName) {
					this.showModal = true;
					this.isStartClicked = true;
				} else {
					this.endPoint = moment();
					this.timeEnd = this.endPoint.format('HH:mm:ss');
					const milliseconds = this.calculateTimeSpent(this.timeStart, this.timeEnd);
					this.tableContent
						.push(this.taskName, this.timeStart, this.timeEnd, this.timeSpent);
					this.data = {
						name: this.taskName,
						start: this.timeStart,
						end: this.timeEnd,
						spent: this.timeSpent,
						tableContent: this.tableContent,
						milliseconds: milliseconds,
					};
					this.sendData([this.isStartClicked, null]);
					this.difference = 0;
					EventBus.$emit('stopWasClicked', this.data);
					this.tableContent = [];
					this.taskName = '';

				}
			},
			calculateTimeSpent(start, end) {
				const difference = moment(end, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss'));
				this.timeSpent = moment('000000', 'HH:mm:ss')
					.milliseconds(difference).format('HH:mm:ss');
				return difference;
			},
      formatTime() {
				const milliseconds = moment(moment(), 'HH:mm:ss').diff(moment(this.timeStart, 'HH:mm:ss'));
				this.difference = moment.duration(milliseconds);
      },
      sendData(data) {
				axios.put(`https://tasktimervue.firebaseio.com/isStartClicked.json`, data)
					.then(response => {
						console.log(response);
					})
					.catch(onerror => {
						console.log(onerror);
					})
			},
      getData() {
				axios.get(`https://tasktimervue.firebaseio.com/isStartClicked.json`)
					.then(response => {
						return response;
					})
					.then(data => {
						this.isStartClicked = data.data[0];
						this.timeStart = data.data[1];
            this.formatTime();
					});
      }
      },
		mounted() {
      this.getData();
		}
		};
</script>

<style scoped>
  .input-task {
    margin: 15px auto;
    width: 200px;
    border: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    outline: none;
    padding: 5px;
    font-size: 16px;
  }

  .input-task:focus {
    border-bottom: 2px solid #303f9f;
  }

</style>
