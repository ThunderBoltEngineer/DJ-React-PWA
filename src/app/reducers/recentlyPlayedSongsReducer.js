const initialState = {
	data: [{
		code: "",
		dj: {
			first_name: "",
			id: 0,
			last_name: "",
			performance_name: ""
		},
		id: -1,
		name: "",
		paid: false,
		status: "",
		url: "",
		venue: ""
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
				playList.push(item);
			});

			return {...state, fetching: false, fetched: true, 
				data: playList}
		case "FETCH_RECENT_LIST_REJECTED":
			return {...state, fetching: false}
		default:
			return state;
	}
}