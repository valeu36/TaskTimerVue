<template>
	<div class="table-responsive mt-3">
		<modal-delete
			v-if="showModal"
			@close="showModal = false"
			@delete="deleteTask"
		/>

		<table class="table table-hover table-sm">
			<thead>
				<tr>
					<th
						class="font-weight-normal text-secondary small"
						v-for="(header, index) in tableHeaders"
						:key="index"
					>
						{{ header }}
					</th>
                    <th></th>
                    <th></th>
                    <th></th>
				</tr>
			</thead>
			<tbody>
				<template v-if="tableContent">
					<tr class v-for="(content, index) in tableContent" :key="index">
                        <td>{{ content.id}}</td>
                        <td>{{ content.task_name}}</td>
                        <td>{{ content.start_time}}</td>
                        <td>{{ content.end_time}}</td>
                        <td></td>
<!--						<td v-for="(cell, idx) in content" :key="idx">{{ cell }}</td>-->
						<td>
							<button
								type="button"
								class="btn btn-light"
								@click="navigateToTaskCard(index)"
							>
								INFO
							</button>
						</td>
						<td>
							<button
								type="button"
								class="btn btn-light"
								@click="setDialog(index)"
							>
								DELETE
							</button>
						</td>
					</tr>
					<tr>
						<th colspan="4">Total time spent:</th>
						<td colspan="4" class="font-weight-bold">{{ timeSpent }}</td>
					</tr>
				</template>

				<template v-else>
					<tr class="font-weight-bold">
						<td>Tasks Not Found</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>

</template>

<script>
import { eventBus } from '../../main';
import moment from 'moment';
import api from '../../api/index';

import ModalDelete from '../Modals/DeleteModal/DeleteModal';
import Spinner from '../Spinner/Spinner';

const TABLE_HEADERS = [
	'№',
	'Tasks',
	'Time Start',
	'Time End',
	'Time Spend',
	'Info',
	'Delete',
];

export default {
	components: {
		ModalDelete,
		Spinner,
	},
	data() {
		return {
			tableHeaders: TABLE_HEADERS,
			// tableContent: [],
            tableContent: null,
			timeSpentArray: [],
			timeSpent: '',
			milliseconds: 0,
			showModal: false,
			indexOfDeletedItem: null,
			isLoading: false,
		};
	},
	computed: {},
	methods: {
		deleteTask() {
			eventBus.$emit('deleteTaskWasClicked');
			this.tableContent = this.tableContent.filter(
				(element, index) => index !== this.indexOfDeletedItem
			);
			this.timeSpentArray = this.timeSpentArray.filter(
				(element, index) => index !== this.indexOfDeletedItem
			);
			this.updateTime(this.timeSpentArray, this.millisecond);
			this.updateTableContent(this.tableContent);
			// this.updateTimeSpentArray(this.timeSpentArray);
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
				.milliseconds(milliseconds)
				.format('HH:mm:ss');
		},
		updateTime(array, milliseconds) {
			milliseconds = this.calculateMs(array);
			return this.convertTime(milliseconds);
		},
		setDialog(idx) {
			this.showModal = true;
			this.indexOfDeletedItem = idx;
		},
		onStopWasClicked() {
			eventBus.$on('stopWasClicked', (taskInfo) => {
				const { tableContent, milliseconds } = taskInfo;
				this.tableContent = tableContent;
				this.timeSpentArray.push(milliseconds);
				this.updateTableContent(this.tableContent);
				// this.updateTimeSpentArray(this.timeSpentArray);
				this.updateTime(this.timeSpentArray, this.millisecond);
			});
		},
    	navigateToTaskCard(index) {
			this.$router.push({ name: 'TaskInfo', params: { id: index + 1 } });
		},
		async updateTableContent(data) {
			await api.store('/auth/tasks', data);
		},
		// async updateTimeSpentArray(data) {
		// 	await api.setData('/timeSpentArray.json', data);
		// },
		async getTableContent() {
			const { data } = await api.index('/auth/tasks');
			if (!data) {
				this.tableContent = null;
      } else {
				this.tableContent = data;
      }
		},
		async getTimeSpentArray() {
			const { data } = await api.getData('/timeSpentArray.json');
			if (!data) {
				this.timeSpentArray = [];
      } else {
				this.timeSpentArray = data;
      }
		}
	},
	async mounted() {
		this.isLoading = true;
		await this.getTableContent();
		// await this.getTimeSpentArray();
		this.onStopWasClicked();
		this.updateTime(this.timeSpentArray, this.millisecond);
		this.isLoading = false;
		// console.log(this.$store.getters.isLogged);
        // console.log(this.$store.getters.token);
	},
};
</script>

<style scoped>
td,
th {
	vertical-align: middle;
}
</style>
