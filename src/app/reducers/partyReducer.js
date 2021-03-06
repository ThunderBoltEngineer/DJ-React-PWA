const initialState = {
	partyId: -1,
	partyName: "",
	djName: "",
	djId: "",
	paid: false,

	fetching: false,
	fetched: false,
	error: null

};

export default function reducer(state = initialState, action){
	switch(action.type) {
		case "FETCH_PARTY":
			return {...state, fetching: true}
		case "FETCH_PARTY_FULFILLED":
		console.log(action.payload);
			return {...state, fetching: false, fetched: true, 
				partyId: action.payload.data.id, 
				partyName: action.payload.data.name, 
				djName: action.payload.data.dj.performance_name, 
				djId: action.payload.data.dj.id,
				paid: action.payload.data.paid}
		case "FETCH_PARTY_REJECTED":
			return {...state, fetching: false}

		case "LOGOUT_FULFILLED":
			return {...state, partyId: -1}
			
		default:
			return state;
	}
}