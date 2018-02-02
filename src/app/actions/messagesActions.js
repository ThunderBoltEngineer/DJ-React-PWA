import axios from "axios";

let baseUrl = "https://api-next.spinfluence.live/api/v1";
let apiUrl = "/parties/";

export function fetchMessages(token, partyId, djId) {
	     		
	return function(dispatch) {

        return axios({
              method: 'get',
              url: baseUrl + apiUrl + partyId + '/djs/' + djId + '/messages',
              headers: {'Authorization': 'Bearer ' + token}

        }).then(response => dispatch({type: 'FETCH_MESSAGES_FULFILLED', payload: response.data}),
        		error => dispatch({type: 'FETCH_MESSAGES_REJECTED', payload: error})
        		);

	}
}

export function fetchBroadcasts(token, partyId) {
          
  return function(dispatch) {

        return axios({
              method: 'get',
              url: baseUrl + apiUrl + partyId + '/broadcasts',
              headers: {'Authorization': 'Bearer ' + token}

        }).then(response => dispatch({type: 'FETCH_BROADCASTS_FULFILLED', payload: response.data}),
            error => dispatch({type: 'FETCH_BROADCASTS_REJECTED', payload: error})
            );

  }
}