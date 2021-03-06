import axios from "axios";

let baseUrl = "https://api-test.spinfluence.live/api/v1";
let apiUrl = "/parties/join/";

export function fetchParty(token, partyCode) {
	     		
	return function(dispatch) {
        console.log(token);
        console.log(partyCode);

        return axios({
              method: 'post',
              url: baseUrl + apiUrl + partyCode,
              headers: {'Authorization': 'Bearer ' + token}

        }).then(response => dispatch({type: 'FETCH_PARTY_FULFILLED', payload: response.data}),
        		error => dispatch({type: 'FETCH_PARTY_REJECTED', payload: error})
        		);

	}
}