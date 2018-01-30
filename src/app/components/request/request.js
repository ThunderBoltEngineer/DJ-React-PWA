import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import firebase from "firebase";

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
   			token: null,
   			index: this.props.match.params.index
		};

	}

	componentDidMount() {

		//connect to store
		this.unsubscribe = store.subscribe(()=>{

              this.setState({

              });
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



	render() {
		if (this.state.partyId >= 0) {

			return (
				<div>
					<img src={MainBackground} alt="Main" className="img-responsive" className={`${styles["img-bg"]}`} />
					
					<div className={`${styles["container-main"]}`}>
						
						<div className={`${styles["div-header"]}`}>
							<p>New Request</p>
							<img src={Back} alt="back" className="img-responsive" className={`${styles["img-back"]}`} onClick={this.onBack.bind(this)} />					
						</div>

					</div>
				</div>
				);
			
		} else {
			return <Redirect to="/"/>;
		}
	}
}