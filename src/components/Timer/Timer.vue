<template>
	<div class="container">
		<input-modal v-if="showModal" @close="showModal = false" />

		<div class="text-center">
			<input
				class="input-task"
				type="text"
				placeholder="Task name"
				v-model="taskName"
				@keyup.enter="toggleTask"
			/>
			<timer :startIsClicked="isStartClicked" :difference="difference"></timer>
			<button type="button" class="btn btn-light m-2" @click="toggleTask">
				{{ isStartClicked ? 'STOP' : 'START' }}
			</button>
		</div>
	</div>
</template>

<script>
import { eventBus } from '../../main';
import moment from 'moment';
import api from '../../api/index';

import InputModal from '../Modals/InputModal/InputModal';
import Timer from './Clock/Clock';

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
			data: {},
		};
	},
	components: {
		Timer,
		InputModal,
	},
	methods: {
		toggleTask() {
			this.isStartClicked = !this.isStartClicked;
			this.isStartClicked ? this.start() : this.stop();
		},
		start() {
			this.startPoint = moment();
			this.timeStart = this.startPoint.format('YYYY-MM-DD HH:mm:ss');
			this.formatTime();
			this.updateIsStartClicked({
                is_start: this.isStartClicked, start_time: this.timeStart});
		},
		stop() {
			if (!this.taskName) {
				this.showModal = true;
				this.isStartClicked = true;
			} else {
				this.endPoint = moment();
				this.timeEnd = this.endPoint.format('YYYY-MM-DD HH:mm:ss');
				const milliseconds = this.calculateTimeSpent(
					this.timeStart,
					this.timeEnd
				);
				this.tableContent.push(
					this.taskName,
					this.timeStart,
					this.timeEnd,
					this.timeSpent
				);
				this.data = {
					// tableContent: this.tableContent,
                    tableContent: {
                        start_time: this.timeStart,
                        end_time: this.timeEnd,
                        task_name: this.taskName,
                    },
					milliseconds: milliseconds,
				};
				this.updateIsStartClicked({is_start: this.isStartClicked, start_time: null});
				eventBus.$emit('stopWasClicked', this.data);
				this.difference = 0;
				this.tableContent = [];
				this.taskName = '';
			}
		},
		calculateTimeSpent(start, end) {
			const difference = moment(end, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss'));
			this.timeSpent = moment('000000', 'HH:mm:ss')
				.milliseconds(difference)
				.format('HH:mm:ss');
			return difference;
		},
		formatTime() {
			const milliseconds = moment(moment(), 'HH:mm:ss').diff(
				moment(this.timeStart, 'YYYY-MM-DD HH:mm:ss')
			);
			this.difference = moment.duration(milliseconds);
		},
		async updateIsStartClicked(data) {
			await api.store('/auth/timer_status', data);
		},
		async getIsStartClicked() {
			const { data } = await api.index('/auth/timer_status');
			this.isStartClicked = !!data.is_start;
			this.timeStart = data.start_time;
			this.formatTime();
		},
	},
	mounted() {
		this.getIsStartClicked();
	},
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
