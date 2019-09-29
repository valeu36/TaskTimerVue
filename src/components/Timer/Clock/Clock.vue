<template>
	<div class="clock-timer">
		<time ref="counter">00:00:00</time>
	</div>
</template>

<script>
export default {
	props: ['startIsClicked', 'difference'],
	data() {
		return {
			seconds: 0,
			minutes: 0,
			hours: 0,
			interval: null,
		};
	},
	methods: {
		add() {
			this.seconds++;
			if (this.seconds >= 60) {
				this.seconds = 0;
				this.minutes++;
				if (this.minutes >= 60) {
					this.minutes = 0;
					this.hours++;
				}
			}
			this.$refs.counter.textContent =
				(this.hours ? (this.hours > 9 ? this.hours : '0' + this.hours) : '00') +
				':' +
				(this.minutes
					? this.minutes > 9
						? this.minutes
						: '0' + this.minutes
					: '00') +
				':' +
				(this.seconds > 9 ? this.seconds : '0' + this.seconds);
			this.timer();
		},
		timer() {
			this.interval = setTimeout(this.add, 1000);
		},
		setInitialState() {
			clearTimeout(this.interval);
			this.$refs.counter.textContent = '00:00:00';
			this.seconds = 0;
			this.minutes = 0;
			this.hours = 0;
		},
	},
  mounted() {
    console.log('Clock is mounted');
  },
	watch: {
		startIsClicked() {
			if (this.startIsClicked) {
				this.seconds = this.difference.seconds();
				this.minutes = this.difference.minutes();
				this.hours = this.difference.hours();
				this.timer();
			} else {
				this.setInitialState();
			}
		},
	},
};
</script>

<style>
.clock-timer {
	margin: 5px auto;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 48px;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
