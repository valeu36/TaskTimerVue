<template>
	<div class="table-responsive mt-3">
		<modal-delete v-if="showModal" @close="showModal = false" @delete="deleteTask" />
		<template v-if="!isLoading">
			<table class="table table-hover table-sm">
				<thead>
					<tr>
						<th class="font-weight-normal text-secondary small" v-for="(header, index) in tableHeaders" :key="index">
							{{ header }}
						</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<template v-if="tableContent">
						<tr v-for="(content, index) in tableContent" :key="index">
							<td>{{ index + 1 }}</td>
							<td>{{ content.task_name }}</td>
							<td>{{ content.start_time }}</td>
							<td>{{ content.end_time }}</td>
							<td>{{ content.time_spent }}</td>
							<td>
								<button type="button" class="btn btn-light" @click="navigateToTaskCard(index)">
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
		</template>

        <template v-else>
            <spinner />
        </template>
	</div>
</template>

<script>
import { eventBus } from '../../main';
import api from '../../api/index';

import ModalDelete from '../Modals/DeleteModal/DeleteModal';
import Spinner from '../Spinner/Spinner';

const TABLE_HEADERS = ['№', 'Tasks', 'Time Start', 'Time End', 'Time Spend', 'Info', 'Delete'];

export default {
	components: {
		ModalDelete,
		Spinner,
	},
	data() {
		return {
			tableHeaders: TABLE_HEADERS,
			tableContent: null,
			timeSpent: null,
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
			this.tableContent = this.tableContent.filter((element, index) => index !== this.indexOfDeletedItem);
			this.updateTableContent(this.tableContent);
			this.indexOfDeletedItem = null;
			this.showModal = false;
		},
		setDialog(idx) {
			this.showModal = true;
			this.indexOfDeletedItem = idx;
		},
		onStopWasClicked() {
			eventBus.$on('stopWasClicked', async (taskInfo) => {
				const { tableContent } = taskInfo;
				await this.updateTableContent(tableContent);
				await this.getTableContent();
				await this.getTimeSpent();
			});
		},
		navigateToTaskCard(index) {
			this.$router.push({ name: 'TaskInfo', params: { id: index + 1 } });
		},
		async updateTableContent(data) {
			await api.store('/auth/tasks', data);
		},
		async getTableContent() {
			const { data } = await api.index('/auth/tasks');
			if (!data) {
				this.tableContent = 0;
			} else {
				this.tableContent = data;
			}
		},
		async getTimeSpent() {
			const { data } = await api.index('/auth/total_spent');
			if (!data) {
				this.timeSpent = null;
			} else {
				this.timeSpent = data;
			}
		},
	},
	async mounted() {
		this.isLoading = true;
		await this.getTableContent();
		await this.getTimeSpent();
		this.onStopWasClicked();
		this.isLoading = false;
	},
};
</script>

<style scoped>
td,
th {
	vertical-align: middle;
}
</style>
