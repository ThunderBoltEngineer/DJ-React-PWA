const initialState = {
	partyId: -1,
	partyName: "",
	djName: "",
	djId: "",

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
				djId: action.payload.data.dj.id}
		case "FETCH_PARTY_REJECTED":
			return {...state, fetching: false}
		default:
			return state;
	}
}