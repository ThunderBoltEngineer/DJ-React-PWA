import axios from "axios";

let baseUrl = "https://api-next.spinfluence.live/api/v1";
let apiUrl = "/parties/";

export function searchSongs(token, partyId, searchTerm, sid) {
	     		
 	return function(dispatch) {

        return axios({
              method: 'get',
              url: baseUrl + apiUrl + partyId + '/tracks/search',
              headers: {
                'Authorization': 'Bearer ' + token
              },
              params: {
                'term': searchTerm,
                'search_id': sid
              }
        }).then(response => dispatch({type: 'SEARCH_SONG_FULFILLED', payload: response.data}),
        		error => dispatch({type: 'SEARCH_SONG_REJECTED', payload: error})
        		);

	}
}