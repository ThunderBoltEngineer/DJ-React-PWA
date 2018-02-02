import React, { Component } from "react";
import firebase from "firebase";
import {Redirect} from "react-router-dom";

// import css
import * as styles from "./styles.css";

// import images
import MainBackground from "src/resources/images/main/background.png";
import Back from "src/resources/images/main/Back.png";
import SendMessage from "src/resources/images/main/sendmessage.png";

// redux
import store from 'src/app/store';

export default class Message extends Component {

	constructor(props) {
		super(props);

		// function binding

		// state initialization
		this.state = {
			partyId: store.getState().party.partyId,
   			token: null,
   			message: "",

   			messages: store.getState().messages.messages
		};
	}


	componentDidMount() {
		//connect to store
		this.unsubscribe = store.subscribe(()=>{
			this.setState({messages: store.getState().messages.messages});

			
        });

        console.log(this.state.messages);
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
		message input event

		*/

	onMessageChanged(e) {
		this.setState({message: e.target.value});
	}

	/*
		send message

		*/

	onSendMessage(e) {

	}



	/*
		render

		*/

	render() {
		if (this.state.partyId >= 0) {

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
						</div>

						<div className={`${styles["div-messagebox-container"]}`}>
							<div className={`${styles["div-messagebox"]}`}>
								<input type="text" placeholder="Your Message" className={`${styles["input-message"]}`} defaultValue={this.state.message} onChange={this.onMessageChanged.bind(this)}/>
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