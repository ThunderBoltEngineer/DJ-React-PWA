import React, { Component } from "react";
import firebase from "firebase";
import {Redirect} from "react-router-dom";

// import css
import * as styles from "./styles.css";

// redux
import store from 'src/app/store';
import {fetchRecentlyPlayedSongs} from 'src/app/actions/recentlyPlayedSongsActions';
//

export default class Main extends Component {

		constructor(props) {
			super(props);

   			this.hasJoinedParty = this.hasJoinedParty.bind(this);

		}

		componentDidMount() {

			//connect to store
			this.unsubscribe = store.subscribe(()=>{
                  this.setState({recentPlayList: store.getState().recentlyPlayedSongs.data});
                  console.log('subscribe on mainpage');
            });

			if (this.hasJoinedParty()) {
				firebase.auth().onAuthStateChanged(function(user) {
	        	if(user) {
	                // user signed in 
	                console.log('logged in');

	                user.getIdToken().then(function(token) {
	                    
	    				store.dispatch(fetchRecentlyPlayedSongs(token, store.getState().party.partyId));
	                });

	            }
	        });
			}
			
		}

		componentWillUnmount() {
			this.unsubscribe();
		}

		hasJoinedParty = () => {
			if(store.getState().party.partyId == -1) {
				return false;
			} else {
				return true;
			}
		}

		render() {
			if (this.hasJoinedParty()) {
				return (

				<div>
				Home
				</div>
				);
			} else {
				return <Redirect to="/"/>;
			}

			
		}
}