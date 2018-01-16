import React, { Component } from "react";

// import css
import * as styles from "./styles.css";

// import images
import LoginBackground from "src/resources/images/login/bg.png";



// component

export default class Login extends Component {

  render() {
    return (
      <div>
      	<img src={LoginBackground} alt="Login" className={`${styles["img-bg"]}`} />
      </div>
    );
  }
}