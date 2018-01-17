import React, { Component } from "react";

// import css
import * as styles from "./styles.css";

// import images
import LoginBackground from "src/resources/images/login/bg.png";
import FacebookButton from "src/resources/images/login/fb_signin.png";
import TwitterButton from "src/resources/images/login/tw_signin.png";
import GooglePlusButton from "src/resources/images/login/gp_signin.png";



// component

export default class Login extends Component {

      componentDidMount() {
            console.log("component mount!");
      }


      /* 
            Social Login Event Handler

            */

      handleFBLogin(e) {
            console.log("facebook button clicked!");

      }

      handleTwitterLogin(e) {
            console.log("twitter button clicked!");

      }

      handleGooglePlusLogin(e) {
            console.log("google plus button clicked");

      }


      /*
            Skip Login Event Handler

            */

      handleSkip(e) {
            console.log("skip button clicked");

      }

      /*
            Render Login Page

            */

      render() {
          return (
            <div>
            	<img src={LoginBackground} alt="Login" className="img-responsive" className={`${styles["img-bg"]}`} />
            	<p className={`${styles["label-login"]}`}> Log In </p>
            	<div className={`${styles["div-login"]}`}>
            		<div className={`${styles["div-title"]}`}>
            			<p>spINFLUENCEit</p>
            			<div className={`${styles["div-separator"]}`}/>
            		</div>
            		<div className={`${styles["div-code"]}`}>
                              <input type="text" placeholder="ENTER CODE" className={`${styles["input-code"]}`} defaultValue={this.props.match.params.code}/>
            			<div className={`${styles["div-separator"]}`}/>
            		</div >
            		<div className={`${styles["div-fb"]}`}>

            			<div className={`${styles["btn-social"]}`} onClick={this.handleFBLogin}>
            				<img className="img-responsive" src={FacebookButton}/>
            			</div>
            			<div className={`${styles["div-or-separator"]}`}>

            			</div>
            		</div>
            		<div className={`${styles["div-other"]}`}>
            			<div className={`${styles["div-other-half"]}`}>
            				<div className={`${styles["btn-social"]}`} onClick={this.handleTwitterLogin}>
            					<img className="img-responsive" src={TwitterButton}/>
            				</div>
            			</div>
            			<div className={`${styles["div-other-half"]}`}>
            				<div className={`${styles["btn-social"]}`} onClick={this.handleGooglePlusLogin}>
            					<img className="img-responsive" src={GooglePlusButton}/>
            				</div>
            			</div>
            		</div>
            		<div className={`${styles["div-skip"]}`}>
            			<div className={`${styles["btn-transparent"]} ${styles["btn-skip"]}`} onClick={this.handleSkip}>
            				Skip Login
            			</div>
            		</div>
            	</div>
            </div>
          );
      }
}