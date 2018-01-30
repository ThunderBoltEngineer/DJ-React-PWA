const initialState = {
	success: false,

	fetching: false,
	fetched: false,
	error: null

};

export default function reducer(state = initialState, action){
	switch(action.type) {
		case "SEND_REQUEST":
			return {...state, fetching: true}
		case "SEND_REQUEST_FULFILLED":
		
			console.log(action.payload);

			return {...state, fetching: false, fetched: true, success: true}

		case "SEND_REQUEST_REJECTED":
			return {...state, fetching: false}


		default:
			return state;
	}
}