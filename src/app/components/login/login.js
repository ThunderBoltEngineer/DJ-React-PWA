import React, { Component } from "react";
import firebase from 'firebase';
import axios from 'axios';

// import css
import * as styles from "./styles.css";

// import images
import LoginBackground from "src/resources/images/login/bg.png";
import FacebookButton from "src/resources/images/login/fb_signin.png";
import TwitterButton from "src/resources/images/login/tw_signin.png";
import GooglePlusButton from "src/resources/images/login/gp_signin.png";

// import firebase configuration info
import config from "src/config/firebase_config.js";
const firebaseConfig = config.config;

// configure firebase 
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const fbAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


// component

export default class Login extends Component {

      componentDidMount() {
            console.log("component mount!");
      }

      /*
            firebase authentication with given provider, get access token

            */

      signInWithProvider(provider) {

            firebase.auth().signInWithPopup(provider).then(function(result) {
                  var user = result.user;

                  result.user.getIdToken().then(function(token) {
                        console.log(token);

                        let baseUrl = "https://api-next.spinfluence.live/api/v1";
                        let apiUrl = "/parties/join/TEST";
                        let bearerToken = "Bearer " + token;
        
                        axios({
                              method: 'post',
                              url: baseUrl + apiUrl,
                              headers: {'Authorization': bearerToken}
                        }).then(function(response) {

                              console.log(response);

                        }).catch(function(error) {

                              // output error message
                              var errorMessage = error.message;
                              console.log(errorMessage);
                        });
                  });

                  
 
            }).catch(function(error) {
                  // output error message
                  var errorMessage = error.message;
                  console.log(errorMessage);
            });
      }


      /* 
            Social Login Event Handler

            */

      handleFBLogin(e) {
            console.log("facebook button clicked!");

            this.signInWithProvider(fbAuthProvider);
      }

      handleTwitterLogin(e) {
            console.log("twitter button clicked!");

            this.signInWithProvider(twitterAuthProvider);
      }

      handleGooglePlusLogin(e) {
            console.log("google plus button clicked");

            this.signInWithProvider(googleAuthProvider);
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

            			<div className={`${styles["btn-social"]}`} onClick={this.handleFBLogin.bind(this)}>
            				<img className="img-responsive" src={FacebookButton}/>
            			</div>
            			<div className={`${styles["div-or-separator"]}`}>

            			</div>
            		</div>
            		<div className={`${styles["div-other"]}`}>
            			<div className={`${styles["div-other-half"]}`}>
            				<div className={`${styles["btn-social"]}`} onClick={this.handleTwitterLogin.bind(this)}>
            					<img className="img-responsive" src={TwitterButton}/>
            				</div>
            			</div>
            			<div className={`${styles["div-other-half"]}`}>
            				<div className={`${styles["btn-social"]}`} onClick={this.handleGooglePlusLogin.bind(this)}>
            					<img className="img-responsive" src={GooglePlusButton}/>
            				</div>
            			</div>
            		</div>
            		<div className={`${styles["div-skip"]}`}>
            			<div className={`${styles["btn-transparent"]} ${styles["btn-skip"]}`} onClick={this.handleSkip.bind(this)}>
            				Skip Login
            			</div>
            		</div>
            	</div>
            </div>
          );
      }
}