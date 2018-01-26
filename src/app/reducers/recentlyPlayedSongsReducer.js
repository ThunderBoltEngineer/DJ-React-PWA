const initialState = {
	data: [{
		id: 0,
		picture_url: null,
		artist: "",
		title: "",
		user_vote: "none"
	}],

	fetching: false,
	fetched: false,
	error: null

};

export default function reducer(state = initialState, action){
	switch(action.type) {
		case "FETCH_RECENT_LIST":
			return {...state, fetching: true}
		case "FETCH_RECENT_LIST_FULFILLED":
			console.log(action.payload);
			let data = action.payload.data;
			var playList = [];
			data.forEach(function(item) {
				if (item.picture_url == null) {
					item.picture_url = "";
				}
				playList.push(item);
			});

			return {...state, fetching: false, fetched: true, 
				data: playList}
		case "FETCH_RECENT_LIST_REJECTED":
			return {...state, fetching: false}

		case "VOTE_SONG_FULFILLED":
			console.log(action.payload);
			let index = action.payload.index;
			let user_vote = action.payload.vote == "upvote" ? "up" : "down";

			var newState = state;
			newState.data[index].user_vote = user_vote;

			return newState;

		default:
			return state;
	}
}