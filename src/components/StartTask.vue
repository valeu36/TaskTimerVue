<template>
  <div class="timer-container">
    <input class="input-task" type="text" placeholder="Task name" v-model="taskName">
    <start-task-timer :startIsClicked="isStartClicked">
    </start-task-timer>
    <button class="button" @click="startOrStopTask">
      {{isStartClicked ? 'STOP' : 'START'}}
    </button>
  </div>
</template>

<script>
	import Timer from './Timer';
	import moment from 'moment';
	import { EventBus } from '../main';

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
			};
		},
		components: {
			startTaskTimer: Timer,
		},
		methods: {
			startOrStopTask() {
				this.isStartClicked = !this.isStartClicked;
				if (this.isStartClicked) {
					this.startPoint = moment();
					this.timeStart = this.startPoint.format('HH:mm:ss');
					if (!this.taskName) {
						alert('Name your task first');
						this.isStartClicked = false;
					}
				} else {
					this.endPoint = moment();
					this.timeEnd = this.endPoint.format('HH:mm:ss');
					this.calculateTimeSpent(this.timeStart, this.timeEnd);
					this.tableContent.push(this.taskName, this.timeStart,
						this.timeEnd, this.timeSpent);
					EventBus.$emit('stopWasClicked',
            [this.tableContent, this.calculateTimeSpent(this.timeStart, this.timeEnd)]);
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
		},
	};
</script>

<style scoped>
  .timer-container {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .input-task {
    margin: 15px auto;
    width: 200px;
    border: 0;
    border-bottom: 1px solid black;
    outline: none;
    padding: 5px;
    font-size: 16px;
  }

  .button {
    margin: 15px auto;
    width: 80px;
    padding: 10px;
    border: 0;
    background-color: white;
    box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    outline: none;
  }

  .button:active {
    transform: translateY(1px);
  }

</style>
