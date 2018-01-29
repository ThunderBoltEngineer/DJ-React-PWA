import React, { Component } from "react";

// import css
import * as styles from "./styles.css";

export default class ListItem extends Component {

	onClick(e) {
		this.props.onSelected(this.props.index);
	}

	render() {
		var textColor = null;
		var backgroundColor = null;
		if (this.props.selected == true) {
			textColor = '#000000';
			backgroundColor = '#FFFFFF';
		} else {
			textColor = '#DEBDC2';
			backgroundColor = this.props.index % 2 == 0 ? '#FFFFFF00' : '#00000066';
		}

		return <div className={`${styles["list-item"]}`} style={{backgroundColor: backgroundColor, color: textColor}} onClick={this.onClick.bind(this)}>{this.props.content}</div>;
	}
}