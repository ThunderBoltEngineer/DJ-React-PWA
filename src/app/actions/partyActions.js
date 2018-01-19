import axios from "axios";

let baseUrl = "https://api-next.spinfluence.live/api/v1";
let apiUrl = "/parties/join/TEST";

export function fetchParty(token) {
	     		
	return function(dispatch) {
        return axios({
              method: 'post',
              url: baseUrl + apiUrl,
              headers: {'Authorization': "Bearer " + token}

        }).then(response => dispatch({type: 'FETCH_PARTY_FULFILLED', payload: response.data}),
        		error => dispatch({type: 'FETCH_PARTY_REJECTED', payload: error})
        		);

	}
}