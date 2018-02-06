import axios from "axios";

let baseUrl = "https://api-test.spinfluence.live/api/v1";
let apiUrl = "/parties/";

export function voteSong(index, token, vote, songId, partyId) {
	     		
	return function(dispatch) {
        console.log(token);

        return axios({
              method: 'post',
              url: baseUrl + apiUrl + partyId + '/tracks/' + songId + '/voting/' + vote,
              headers: {'Authorization': 'Bearer ' + token}

        }).then(response => dispatch({type: 'VOTE_SONG_FULFILLED', payload: {index: index, vote: vote}}),
        		error => dispatch({type: 'VOTE_SONG_REJECTED', payload: error})
        		);

	}
}