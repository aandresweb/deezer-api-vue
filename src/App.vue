<template>
	<div id="app">
		<top-bar-component></top-bar-component>
		<div v-if="!loader" class="px-4 min-h-screen py-10 ">
			<div class="wrapper">
				<div class="grid grid-cols-12 gap-4">
					<div
						v-for="(track, index) in tracks"
						:key="index"
						class="col-span-6 md:col-span-3"
					>
						<track-component :index="index" :track="track"></track-component>
					</div>
				</div>
			</div>
		</div>
		<!-- -->
		<loader-component v-else></loader-component>
		<!---->
		<music-player-component></music-player-component>
	</div>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
	import LoaderComponent from "./components/LoaderComponent.vue";
	import MusicPlayerComponent from "./components/MusicPlayerComponent.vue";
	import TopBarComponent from "./components/TopBarComponent.vue";
	import TrackComponent from "./components/TrackComponent.vue";
	export default {
		components: {
			MusicPlayerComponent,
			TopBarComponent,
			LoaderComponent,
			TrackComponent,
		},
		methods: {},

		mounted() {
			this.$store.dispatch("GET_PLAYLIST");
		},
		computed: {
			...mapGetters(["tracks", "loader"]),
			...mapState(["currentTrack"]),
		},
	};
</script>

<style lang="scss">
	body {
		background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
	}
	.wrapper {
		max-width: 1024px;
		margin: auto;
	}
	.track-artist {
		color: rgb(143, 143, 143);
	}
	.active {
		background-color: #ef4444 !important;
		.track-artist,
		.track-name {
			color: #fff;
		}
	}
</style>
