<template>
	<div class="w-full bg-red-500 sticky  bottom-0  ">
		<div class="wrapper">
			<div class="items-center px-4 py-3 grid grid-cols-12 items-center">
				<div class="col-span-3 ">
					<p class="font-semibold text-white text-sm" v-if="track">
						{{ track.title }}
					</p>
					<p v-if="track" class="text-xs text-gray-300 leading-4">
						{{ track.album.title }}
					</p>
				</div>
				<!-- -->
				<div class="col-span-6 flex justify-center">
					<button
						@click.prevent="prevTrack"
						class="bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</button>
					<!-- -->
					<button
						@click.prevent="toggleTrackStatus"
						class="bg-red-600 hover:bg-red-700 mx-3 py-2 px-7 rounded-lg text-white shadow-md font-semibold focus:outline-none"
					>
						<template v-if="trackStatus">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
									clip-rule="evenodd"
								/>
							</svg>
						</template>
						<template v-else>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
						</template>
					</button>
					<!-- -->
					<button
						@click.prevent="nextTrack"
						class="bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</button>
				</div>
				<!-- -->
				<div class="col-span-3">
					<div class="input-wrapper">
						<input
							class="input"
							@change="changeVolumen"
							step="0.01"
							type="range"
							min="0"
							max="1"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
	export default {
		methods: {
			toggleTrackStatus() {
				if (this.trackStatus) {
					this.currentTrack.pause();
				} else {
					this.currentTrack.play();
				}
				this.$store.commit("UPDATE_TRACK_STATUS");
			},
			prevTrack() {
				let index = this.trackIndex - 1 < 0 ? 0 : this.trackIndex - 1;
				let track = this.tracks[index];
				this.changeTrack(track, index);
			},
			nextTrack() {
				let index =
					this.trackIndex + 1 === this.tracks.length
						? this.trackIndex
						: this.trackIndex + 1;
				let track = this.tracks[index];
				this.changeTrack(track, index);
			},
			changeTrack(track, index) {
				if (this.currentTrack) {
					this.currentTrack.pause();
					this.currentTrack.currentTime = 0;
				}
				this.$store.commit("SET_CURRENT_TRACK", track);
				this.$store.commit("SET_TRACK_INDEX", index);
				this.$store.commit("SET_TRACK", track);
				this.currentTrack.play();
			},
			changeVolumen({ target }) {
				if (this.trackStatus) {
					this.currentTrack.volume = target.value;
				}
			},
		},
		computed: {
			...mapGetters(["tracks", "track"]),
			...mapState(["currentTrack", "trackStatus", "trackIndex"]),
		},
	};
</script>

<style lang="scss" scoped>
	.input-wrapper {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		.input {
			-webkit-appearance: none;
			-moz-appearance: none;
			width: 50%;
			height: 5px;
			padding: 0;
			border-radius: 2px;
			outline: none;
			cursor: pointer;
		}

		.input::-webkit-slider-thumb {
			-webkit-appearance: none;
			-moz-appearance: none;
			-webkit-border-radius: 5px;
			/*16x16px adjusted to be same as 14x14px on moz*/
			height: 16px;
			width: 16px;
			border-radius: 50%;
			background: #e7e7e7;
			border: 1px solid #c5c5c5;
		}
	}
</style>
