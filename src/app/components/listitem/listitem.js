import React, { Component } from "react";

// import css
import * as styles from "./styles.css";

export default class ListItem extends Component {

	render() {
		return <div className={`${styles["list-item"]}`}>{this.props.content}</div>;
	}
}