const initialState = {
	searchId: null,
	matches: [],

	fetching: false,
	fetched: false,
	error: null

};

export default function reducer(state = initialState, action){
	switch(action.type) {
		case "SEARCH_SONG":
			return {...state, fetching: true}
		case "SEARCH_SONG_FULFILLED":
			console.log(action.payload);
			let searchId = action.payload.data.search_id;
			let term = action.payload.data.term;
			let matches = action.payload.data.matches;

			return {...state, fetching: false, fetched: true, searchId: searchId, matches: matches}

		case "SEARCH_SONG_REJECTED":
			return {...state, fetching: false}


		default:
			return state;
	}
}