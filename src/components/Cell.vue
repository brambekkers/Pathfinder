<template>
	<div id="cell" :style="{ height: size + 'px',  width: size + 'px'}" @click="changeCell()">
		<!-- Background visited-->

		<div class="background bg-visited" :class="{ 'visited': data.visited}"></div>

		<!-- Background path-->
		<div class="background bg-path" :class="{'path': data.path}"></div>

		<!-- Start -->
		<i class="fas fa-play" v-if="data.start"></i>

		<!-- Finish -->
		<i class="fas fa-bullseye" v-if="data.finish"></i>

		<!-- Wall -->
		<transition name="bounce">
			<i class="fas fa-square-full wall" v-if="data.wall"></i>
		</transition>

		<p
			v-if="data.dijkstra.distFromStart != Infinity && !data.start && !data.finish && !data.wall && dev"
		>{{data.dijkstra.distFromStart}}</p>
		<p
			v-if="data.aStar.fCost != Infinity && !data.start && !data.finish && !data.wall && dev"
		>{{data.aStar.fCost}}</p>
	</div>
</template>

<script>
export default {
	name: "Cell",
	props: ["size", "data"],
	data() {
		return {
			color: "",
		};
	},
	computed: {
		dev() {
			return this.$store.getters.dev;
		}
	},
	methods: {
		changeCell(){
			if(!this.data.disableInput){
				this.data.disableInput = true
				this.$store.dispatch('add', this.data)

				setTimeout(()=>{
					this.data.disableInput = false
				},500)
			}
		},
		RandomColor() {
			this.color = "x";
		}
	},
	mounted() {
		this.RandomColor();
	}
};
</script>

<style scoped lang="scss">
	#cell {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.background {
			position: absolute;
			width: 100%;
			height: 100%;
		}

		.bg-visited {
			z-index: 1;
		}

		.bg-path {
			z-index: 2;
		}

		p {
			z-index: 5;
		}

		&:hover {
			background: #adc7ea;
		}

		i {
			color: #3d5a80;
			z-index: 10;
		}

		.wall {
			font-size: 30px;
		}
	}

	.visited {
		animation: color-in 2000ms ease-in;
		background: lightgreen;
	}

	.path {
		background: lightyellow;
	}

	.bounce-enter-active {
		animation: bounce-in 0.5s;
	}
	.bounce-leave-active {
		animation: bounce-in 0.5s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}

	.color-enter-active {
		animation: bounce-in 0.5s;
	}
	.color-leave-active {
		animation: bounce-in 0.5s reverse;
	}
	@keyframes color-in {
		0% {
			background: rgba($color: #ffffff, $alpha: 0);
		}
		20% {
			background: lightseagreen;
		}
		100% {
			background: lightgreen;
		}
	}
</style>
