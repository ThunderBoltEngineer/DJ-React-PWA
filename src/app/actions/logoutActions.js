import axios from "axios";

let baseUrl = "https://api-test.spinfluence.live/api/v1";
let apiUrl = "/users/auth/sign_out";

export function logout(token) {
	     		
	return function(dispatch) {
        console.log('log out');

        dispatch({type: 'LOGOUT_FULFILLED', payload: {}});

        // return axios({
        //       method: 'delete',
        //       url: baseUrl + apiUrl,
        //       headers: {'Authorization': 'Bearer ' + token}

        // }).then(response => dispatch({type: 'LOGOUT_FULFILLED', payload: response.data}),
        // 		error => dispatch({type: 'LOGOUT_REJECTED', payload: error})
        // 		);

	}
}