import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import Infinite from "react-infinite";
import MessageItem from "src/app/components/messageitem";
import firebase from 'firebase';

// import css
import * as styles from "./styles.css";

// import images
import MainBackground from "src/resources/images/main/background.png";
import Back from "src/resources/images/main/Back.png";
import SendMessage from "src/resources/images/main/sendmessage.png";

// redux
import store from 'src/app/store';

import {sendMessage} from 'src/app/actions/messagesActions';

export default class Message extends Component {

	constructor(props) {
		super(props);

		// function binding

		// state initialization
		this.state = {
			partyId: store.getState().party.partyId,
			djId: store.getState().party.djId,
   			token: null,
   			tableHeight: 1,
   			messages: store.getState().messages.messages
		};
	}


	componentDidMount() {
		//connect to store
		this.unsubscribe = store.subscribe(()=>{

			this.setState({messages: store.getState().messages.messages});
			
        });

        // get table height
		let height = document.getElementById("tableContainer").clientHeight;
		this.setState({tableHeight: height});
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
		send message

		*/

	onSendMessage(e) {
		let message = document.getElementById("message").value;
		if (message) {
			let _this = this;
			firebase.auth().onAuthStateChanged(function(user) {
	        	if(user) {

	                user.getIdToken().then(function(token) {
	                    _this.setState({token: token});
	    				store.dispatch(sendMessage(token, _this.state.partyId, _this.state.djId, message));
	                });

	            }
		    });
			
		}
	}



	/*
		render

		*/

	render() {
		if (this.state.partyId >= 0) {
			this.state.messages.sort(function(left, right) {
				return left.sent_at > right.sent_at
			})

			var elements = [];
			for (var i = 0; i < this.state.messages.length; i++) {
    			elements.push(<MessageItem key={i} message={this.state.messages[i]} />)
			}

			return (
				<div>
					<img src={MainBackground} alt="Main" className="img-responsive" className={`${styles["img-bg"]}`} />
					
					<div className={`${styles["container-main"]}`}>
						
						<div className={`${styles["div-header"]}`}>
							<p>Message</p>
							<img src={Back} alt="back" className="img-responsive" className={`${styles["img-back"]}`} onClick={this.onBack.bind(this)} />					
						</div>

						<div className={`${styles["div-dj-name"]}`}>
							<p>{store.getState().party.djName}</p>
						</div>

						<div className={`${styles["div-separator"]}`}/>

						<div className={`${styles["div-table"]}`} id="tableContainer">
							<Infinite 	elementHeight={40}
										containerHeight={this.state.tableHeight}
										infiniteLoadBeginEdgeOffset={this.state.tableHeight - 50}
										isInfiniteLoading={false}
										>
								{elements}
							</Infinite>
						</div>

						<div className={`${styles["div-messagebox-container"]}`}>
							<div className={`${styles["div-messagebox"]}`}>
								<input id="message"  type="text" placeholder="Your Message" className={`${styles["input-message"]}`}/>
								<img src={SendMessage} alt="send" className="img-responsive" className={`${styles["img-message"]}`} onClick={this.onSendMessage.bind(this)}/>
							</div>
						</div>


					</div>
				</div>
				);
			
		} else {
			return <Redirect to="/"/>;
		}
	}
}