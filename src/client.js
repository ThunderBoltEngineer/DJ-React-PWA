import {trackPageView} from "pawjs/src/utils/analytics";

// Importing bootstrap
import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/css/bootstrap.css";

import * as appReducers from "./app/reducers";

export const reduxReducers = appReducers;

if (module.hot) module.hot.accept();

// // firebase initialization
// import firebase from "firebase";

// const firebaseConfiguration = {
// 		apiKey: "AIzaSyCKO0ZkKAemKMSnGeq1K192y8pemWfvZNE",
//     	authDomain: "spinfluence-320d8.firebaseapp.com",
//     	databaseURL: "https://spinfluence-320d8.firebaseio.com",
//     	projectId: "spinfluence-320d8",
//     	storageBucket: "spinfluence-320d8.appspot.com",
//     	messagingSenderId: "133793994050"
// };

// // configure firebase 
// firebase.initializeApp(firebaseConfiguration);

// firebase.messaging().requestPermission()
//             .then(function() {
//                   console.log('Notification Permission Granted');
// })
// .catch(function(err) {
//       console.log('Unabled to get permission to notify ' + err);
// });


// firebase.messaging().getToken().then(function(currentToken) {
// 	console.log(currentToken);
// })
// .catch(function(err) {
// 	console.log(err);
// });