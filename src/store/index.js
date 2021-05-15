import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentTrack: null,
		trackIndex: null,
		trackStatus: false,
		tracks: [],
		track: null,
		loader: false,
	},
	getters: {
		tracks: (state) => state.tracks,
		track: (state) => state.track,
		currentTrack: (state) => state.currentTrack,
		trackStatus: (state) => state.trackStatus,
		trackIndex: (state) => state.trackIndex,
		loader: (state) => state.loader,
	},
	mutations: {
		SET_TRACK_INDEX(state, index) {
			state.trackIndex = index;
		},
		SET_CURRENT_TRACK(state, track) {
			state.currentTrack = new Audio(track.preview);
		},
		SET_TRACK(state, track) {
			state.track = track;
		},
		UPDATE_TRACK_STATUS(state, status = null) {
			state.trackStatus = status ? status : !state.trackStatus;
		},
		UPDATE_LOADER(state) {
			state.loader = !state.loader;
		},
		SET_TRACKS: (state, tracks) => {
			state.tracks = tracks;
		},
	},
	actions: {
		async GET_PLAYLIST({ commit }) {
			commit("UPDATE_LOADER");
			try {
				let res = await axios.get(
					"https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=justin",
				);
				commit(
					"SET_TRACKS",
					res.data.data.filter((track) => track.preview != ""),
				);
			} catch (error) {
				console.log(error);
			} finally {
				commit("UPDATE_LOADER");
			}
		},
		async SEARCH_TRACKS({ commit }, query) {
			commit("UPDATE_LOADER");
			try {
				let res = await axios.get(
					"https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" +
						query,
				);
				commit(
					"SET_TRACKS",
					res.data.data.filter((track) => track.preview != ""),
				);
			} catch (error) {
				console.log(error);
			} finally {
				commit("UPDATE_LOADER");
			}
		},
	},
	modules: {},
});
