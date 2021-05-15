<template>
	<div class="top-bar shadow  mx-auto px-4 bg-gray-400">
		<div class="wrapper">
			<div class="grid grid-cols-12 gap-2 ">
				<div class="col-start-7 col-span-6 py-2">
					<div class="input-icon">
						<input
							@keyup="searchTracks"
							v-model="query"
							placeholder="Search tracks..."
							type="text"
							class="w-full shadow border-0 text-gray-400  py-2 px-4 rounded-full text-sm focus:outline-none"
						/>
						<svg
							v-if="searching"
							@click.prevent="clearSearch"
							xmlns="http://www.w3.org/2000/svg"
							class="icon h-4 w-4 text-gray-400 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
						<!-- -->
						<svg
							v-else
							xmlns="http://www.w3.org/2000/svg"
							class="icon h-4 w-4 text-gray-400 "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => {
			return {
				query: "",
				searching: false,
			};
		},
		methods: {
			searchTracks() {
				if (this.query != "") {
					this.$store.dispatch("SEARCH_TRACKS", this.query);
					this.searching = true;
				} else {
					this.defaultSearch();
				}
			},
			clearSearch() {
				this.query = "";
				this.defaultSearch();
			},
			defaultSearch() {
				this.$store.dispatch("GET_PLAYLIST");
				this.searching = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.top-bar {
		min-height: var(--topHeight);
	}
	.input-icon {
		position: relative;
		.icon {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
