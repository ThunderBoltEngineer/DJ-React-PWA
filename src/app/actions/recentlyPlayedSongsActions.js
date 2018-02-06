import axios from "axios";

let baseUrl = "https://api-test.spinfluence.live/api/v1";
let apiUrl = "/parties/";

export function fetchRecentlyPlayedSongs(token, partyId) {
	     		
	return function(dispatch) {
        console.log('requesting recently played songs from ' + partyId);

        return axios({
              method: 'get',
              url: baseUrl + apiUrl + partyId + '/playlist/recently_played',
              headers: {'Authorization': 'Bearer ' + token}

        }).then(response => dispatch({type: 'FETCH_RECENT_LIST_FULFILLED', payload: response.data}),
        		error => dispatch({type: 'FETCH_RECENT_LIST_REJECTED', payload: error})
        		);

	}
}