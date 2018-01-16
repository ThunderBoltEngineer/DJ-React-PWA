import React, { Component } from "react";

// import css
import * as styles from "./styles.css";

// import images
import LoginBackground from "src/resources/images/login/bg.png";
import EnterCode from "src/resources/images/login/enter_code.png";
import FacebookButton from "src/resources/images/login/fb_signin.png";
import TwitterButton from "src/resources/images/login/tw_signin.png";
import GooglePlusButton from "src/resources/images/login/gp_signin.png";



// component

export default class Login extends Component {

  render() {
    return (
      <div>
      	<img src={LoginBackground} alt="Login" className={`${styles["img-bg"]}`} />
      	<p className={`${styles["label-login"]}`}> Log In </p>
      	<div className={`${styles["div-login"]}`}>
      		<div className={`${styles["div-title"]}`}>
      			<p>Spinfluence</p>
      			<div className={`${styles["div-separator"]}`}/>
      		</div>
      		<div className={`${styles["div-code"]}`}>
      			<img src={EnterCode} alt="Enter code" className="img-responsive" className={`${styles["img-entercode"]}`} />
      			<div className={`${styles["div-separator"]}`}/>
      		</div >
      		<div className={`${styles["div-fb"]}`}>

      			<button className="btn btn-default" className={`${styles["btn-social"]}`}>
      				<img className="img-responsive" src={FacebookButton}/>
      			</button>
      			<div className={`${styles["div-or-separator"]}`}>

      			</div>
      		</div>
      		<div className={`${styles["div-other"]}`}>
      			<div className={`${styles["div-other-half"]}`}>
      				<button className="btn btn-default" className={`${styles["btn-social"]}`}>
      					<img className="img-responsive" src={TwitterButton}/>
      				</button>
      			</div>
      			<div className={`${styles["div-other-half"]}`}>
      				<button className="btn btn-default" className={`${styles["btn-social"]}`}>
      					<img className="img-responsive" src={GooglePlusButton}/>
      				</button>
      			</div>
      		</div>
      		<div className={`${styles["div-skip"]}`}>
      			<button className="btn btn-default" className={`${styles["btn-transparent"]} ${styles["btn-skip"]}`}>
      				Skip Login
      			</button>
      		</div>
      	</div>
      </div>
    );
  }
}