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
			//let searchId = action.payload["search_id"];
			//let data = action.payload.matches;
			
			//matches = data;

			//return {...state, fetching: false, fetched: true, data: playList}
			return {...state, fetching: false}
		case "SEARCH_SONG_REJECTED":
			return {...state, fetching: false}


		default:
			return state;
	}
}