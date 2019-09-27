<template>
	<div>
		<div class="tabs">
			<ul class="tabs-list">
				<li
					class="list-item"
					v-for="(tab, index) in tabs"
					:key="index"
					:class="{ 'is-active': tab.isActive }"
				>
					<a class="tab-link" :href="tab.href" @click="selectTab(tab)">{{
						tab.name
					}}</a>
				</li>
			</ul>
		</div>

		<div class="tabs-details">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tabs: [],
		};
	},
	created() {
		this.tabs = this.$children;
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach((tab) => {
				tab.isActive = tab.name === selectedTab.name;
			});
		},
	},
};
</script>

<style scoped>
.tab-link {
	text-decoration: none;
	width: 100%;
	color: inherit;
	display: flex;
	justify-content: center;
}

.tabs-list {
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	justify-content: center;
	font-size: 14px;
}

.list-item {
	width: 50%;
	height: 43px;
	background-color: #3f51b5;
	display: flex;
	align-items: center;
	border-bottom: 2px solid transparent;
	color: rgba(255, 255, 255, 0.7);
	transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.is-active {
	border-bottom: 2px solid #f50057;
	color: rgba(255, 255, 255, 1);
}
</style>
