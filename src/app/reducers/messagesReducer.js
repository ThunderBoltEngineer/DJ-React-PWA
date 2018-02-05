const initialState = {
	messages: [],

	fetching: false,
	messagesFetched: false,
	broadcastsFetched: false,
	error: null

};

export default function reducer(state = initialState, action){
	let currentMessages = state.messages;

	switch(action.type) {
		case "FETCH_MESSAGES":
			return {...state, fetching: true}
		case "FETCH_MESSAGES_FULFILLED":

			if (state.messagesFetched) {
				return {...state, fetching: false}
			} else {
				currentMessages.push(...action.payload.data);

				currentMessages.sort(function(left, right) {
				left.sent_at < right.sent_at
				});


				return {...state, fetching: false, messagesFetched: true, messages: currentMessages}
			}
			
		case "FETCH_MESSAGES_REJECTED":
			return {...state, fetching: false}


		case "FETCH_BROADCASTS_FULFILLED":
			currentMessages.sort(function(left, right) {
				left.sent_at < right.sent_at
			});

			if (state.broadcastsFetched) {
				return {...state, fetching: false}
			} else {
				currentMessages.push(...action.payload.data);
				return {...state, fetching: false, broadcastsFetched: true, messages: currentMessages}
			}

		case "FETCH_BROADCASTS_REJECTED":
			return {...state, fetching: false}


		case "SEND_MESSAGE_FULFILLED": 
			let sentMessage = action.payload.data;
			currentMessages.push(sentMessage);


			return {...state, messages: currentMessages}

		case "SEND_MESSAGE_REJECTED": 
			console.log('message sent failure: ' + action.payload);
			return {...state}

		default:
			return state;
	}
}