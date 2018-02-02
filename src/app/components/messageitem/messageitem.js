import React, { Component } from "react";

// import css
import * as styles from "./styles.css";

let broadcastStyle = {
	textAlign: 'center',
	//backgroundColor: '#141414'
};

let	toDjStyle = {
	textAlign: 'right',
	//backgroundColor: '#876048'
};

let fromDjStyle = {
	textAlign: 'left',
	//backgroundColor: '#876048'
};

export default class ListItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		var paragraphStyle = null;

		if (this.props.message.dj_id) {
			if (this.props.message.direction == 'to_dj') {
				paragraphStyle = toDjStyle;
			} else {
				paragraphStyle = fromDjStyle;
			}
		} else {
			paragraphStyle = broadcastStyle;
		}

		//let date = this.props.message.sent_at;
		let date = (new Date(this.props.message.sent_at)).toLocaleTimeString('en-US');

		return (
			<div className={`${styles["div-container"]}`}>
				<div className={`${styles["div-time"]}`}>
					<p style={paragraphStyle}>{date}</p>
				</div>
				<div className={`${styles["div-message"]}`}>
					<p style={paragraphStyle}>{this.props.message.body}</p>
				</div>
			</div>
		);
	}
}