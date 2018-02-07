import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import firebase from 'firebase';

// import css
import * as styles from "./styles.css";

// import images
import MainBackground from "src/resources/images/main/background.png";
import Back from "src/resources/images/main/Back.png";

// redux
import store from 'src/app/store';

import {sendRequest} from 'src/app/actions/sendRequestActions';


export default class Request extends Component {

	constructor(props) {
		super(props);

		// function binding

		// state initialization
		this.state = {
			partyId: store.getState().party.partyId,
   			index: this.props.match.params.index,
   			song: store.getState().searchSongs.matches[this.props.match.params.index],
   			message: "",
   			requestSentSuccessfully: store.getState().sendRequest.success
		};



	}

	componentDidMount() {

		//connect to store
		this.unsubscribe = store.subscribe(()=>{
			let success = store.getState().sendRequest.success;
          	this.setState({requestSentSuccessfully: success});
        });
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	/*
		user click back button

		*/

	onBack(e) {
		this.props.history.goBack();
	}

	/*
		user send request

		*/

	onSendRequest(e) {

		if(this.state.message) {
			let _this = this;
			firebase.auth().onAuthStateChanged(function(user) {
	        	if(user) {

	                user.getIdToken().then(function(token) {
	                	console.log(token);
	    				store.dispatch(sendRequest(token, _this.state.partyId, _this.state.song, _this.state.message));
	                });

	            }
		    });
		}
		
	}


	/*
		user types message

		*/

	onMessageChange(e) {
		this.setState({message: e.target.value});
	}


	/*
		render

		*/

	render() {
		if (!this.state.requestSentSuccessfully) {
		if (this.state.partyId >= 0) {

			return (
				<div>
					<img src={MainBackground} alt="Main" className="img-responsive" className={`${styles["img-bg"]}`} />
					
					<div className={`${styles["container-main"]}`}>
						
						<div className={`${styles["div-header"]}`}>
							<p>New Request</p>
							<img src={Back} alt="back" className="img-responsive" className={`${styles["img-back"]}`} onClick={this.onBack.bind(this)} />					
						</div>


						<div className={`${styles["div-song-artist"]}`}>
								<p>{this.state.song.artist}</p>
						</div>

						<div className={`${styles["div-song-title"]}`}>
								<p>{this.state.song.title}</p>
						</div>

						<textarea rows={4}  className={`${styles["textarea-message"]}`} value={this.state.message} onChange={this.onMessageChange.bind(this)}>
						</textarea>

						<p className={`${styles["div-sendrequest"]}`} onClick={this.onSendRequest.bind(this)}>
							Send Request
						</p>

					</div>
				</div>
				);
			
		} else {
			return <Redirect to="/"/>;
		}
	} else {
		return <Redirect to="/main"/>;
	}
	}
}