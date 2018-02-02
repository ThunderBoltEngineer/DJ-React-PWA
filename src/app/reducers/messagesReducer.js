const initialState = {
	messages: [],

	fetching: false,
	fetched: false,
	error: null

};

export default function reducer(state = initialState, action){
	let currentMessages = state.messages;

	switch(action.type) {
		case "FETCH_MESSAGES":
			return {...state, fetching: true}
		case "FETCH_MESSAGES_FULFILLED":
			console.log(action.payload);
			currentMessages.push(...action.payload.data);


			return {...state, fetching: false, messages: currentMessages}
		case "FETCH_MESSAGES_REJECTED":
			return {...state, fetching: false}


		case "FETCH_BROADCASTS_FULFILLED":

			console.log(action.payload);
			currentMessages.push(...action.payload.data);

			return {...state, fetching: false, messages: currentMessages}

		case "FETCH_BROADCASTS_REJECTED":
			return {...state, fetching: false}

		default:
			return state;
	}
}