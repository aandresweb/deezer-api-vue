<template>
	<div
		class="shadow-md bg-white rounded-lg cursor-pointer"
		:class="activeClass(index)"
		@click.prevent="playTrack(track, index)"
	>
		<div>
			<img :src="track.album.cover_xl" alt="img" class="w-full" />
		</div>
		<div class="info p-5">
			<p class="track-name text-lg font-semibold m-0">
				{{ track.title }}
			</p>
			<small class="track-artist">{{ track.artist.name }}</small>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
	export default {
		props: ["track", "index"],
		methods: {
			playTrack(track, index) {
				if (this.currentTrack) {
					this.currentTrack.pause();
					this.currentTrack.currentTime = 0;
				}
				this.$store.commit("SET_CURRENT_TRACK", track);
				this.$store.commit("SET_TRACK_INDEX", index);
				this.$store.commit("SET_TRACK", track);
				this.$store.commit("UPDATE_TRACK_STATUS", true);
				this.currentTrack.play();
			},
			activeClass(index) {
				return this.trackIndex === index ? "active" : "";
			},
		},
		computed: {
			...mapGetters(["trackIndex"]),
			...mapState(["currentTrack"]),
		},
	};
</script>

<style></style>
