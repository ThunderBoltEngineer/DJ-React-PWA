import axios from "axios";

let baseUrl = "https://api-test.spinfluence.live/api/v1";
let apiUrl = "/parties/";

export function sendRequest(token, partyId, song, message) {
	     		
	return function(dispatch) {
        if (message) {
          song.message = message;
        }

        return axios({
              method: 'post',
              url: baseUrl + apiUrl + partyId + '/requests',
              headers: {'Authorization': 'Bearer ' + token},
              params: song
        }).then(response => dispatch({type: 'SEND_REQUEST_FULFILLED', payload: response.data}),
        		error => dispatch({type: 'SEND_REQUEST_REJECTED', payload: error})
        		);

	}
}