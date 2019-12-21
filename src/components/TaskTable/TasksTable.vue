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
					<template v-if="tableContent.length">
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
							<th colspan="4">All tasks time:</th>
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

			<paginate
                :page-count="data.total / 10"
				:page-range="3"
				:margin-pages="3"
				:click-handler="getTableContent"
				:prev-text="'Prev'"
				:next-text="'Next'"
				:container-class="'pagination'"
				:page-class="'page-item'"
				:active-class="'page-item-active'"
				:prev-class="'page-item-prev'"
				:next-class="'page-item-next'"
				:prev-link-class="'page-item-link-prev'"
				:next-link-class="'page-item-link-next'"
                v-if="data.total > 10"
			>
			</paginate>
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
			tableContent: [],
			timeSpent: null,
			milliseconds: 0,
			showModal: false,
			indexOfDeletedItem: null,
			isLoading: false,
            data: null
		};
	},
	computed: {},
	methods: {
		async deleteTask() {
			eventBus.$emit('deleteTaskWasClicked');
			await this.deleteTableContent(this.tableContent[this.indexOfDeletedItem].id);
			await this.getTableContent();
			await this.getTimeSpent();
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
		async deleteTableContent(data) {
			await api.destroy('/auth/tasks', data);
		},
		async updateTableContent(data) {
			await api.store('/auth/tasks', data);
		},
		async getTableContent(page) {
            const { data } = await api.index(`/auth/tasks?page=${page}`);
			console.log(data);
			this.data = data;
			if (!data.data) {
				this.tableContent = [];
			} else {
				this.tableContent = data.data;
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

<style>
td,
th {
	vertical-align: middle;
}
.pagination {
	display: flex;
	justify-content: center;
}
.page-item {
	color: black;
	padding: 8px 16px;
	text-decoration: none;
	margin: 3px;
	border: 1px solid #eee;
	border-radius: 5px;
}

.page-item-active {
	background-color: #343a40;
	color: white;
	border-radius: 5px;
}

.page-item-prev {
	color: black;
	padding: 8px 16px;
	text-decoration: none;
	margin: 3px;
	border: 1px solid #eee;
	border-radius: 5px;
}

.page-item-next {
	color: black;
	padding: 8px 16px;
	text-decoration: none;
	margin: 3px;
	border: 1px solid #eee;
	border-radius: 5px;
}

.page-item:hover {
	background-color: #ddd;
	border-radius: 5px;
}

.page-item-active:hover {
	background-color: #636a70;
	border-radius: 5px;
}

.page-item-prev:hover {
	background-color: #ddd;
	border-radius: 5px;
}

.page-item-next:hover {
	background-color: #ddd;
	border-radius: 5px;
}
</style>
