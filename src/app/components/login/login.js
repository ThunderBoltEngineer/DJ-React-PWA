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

// redux

import store from 'src/app/store';
import {fetchParty} from 'src/app/actions/partyActions';


// component

export default class Login extends Component {

      constructor(props) {
            super(props)
            store.subscribe(()=>{
                  this.setState({party: store.getState().party})
                  console.log(this.state.party)
            })

            this.state = {
                  partyCode: props.match.params.code
            }
      }

      componentDidMount() {

            this.signInWithProvider = this.signInWithProvider.bind(this);
            this.signInAnonymously = this.signInAnonymously.bind(this);
            this.setState({party: store.getState().party})
      }

      /*
            firebase authentication with given provider, get access token

            */

      signInWithProvider = (provider) => {

            let _this = this;

            firebase.auth().signInWithPopup(provider).then(function(result) {
                  var user = result.user;

                  result.user.getIdToken().then(function(token) {

                        store.dispatch(fetchParty(token, _this.state.partyCode));
                  });

                  
 
            }).catch(function(error) {
                  // output error message
                  var errorMessage = error.message;
                  console.log(errorMessage);
            });
      }

      /*
            firebase anonymous authentication

            */

      signInAnonymously = () => {
            firebase.auth().signInAnonymously().catch(function(error) {
                  var errorMessage = error.message;
                  console.log(errorMessage);
            });

            firebase.auth().onAuthStateChanged(function(user) {
                  if(user) {
                        // user signed in 
                        var isAnonymous = user.isAnonymous;
                        
                        if(isAnonymous) { // anonymous sign in
                              user.getIdToken().then(function(token) {
                                    
                                    store.dispatch(fetchParty(token, _this.state.partyCode));
                              });
                        }

                  } else {
                        // user signed out
                  }
            });
      }


      /* 
            Social Login Event Handler

            */

      handleFBLogin(e) {
      
            if(this.state.partyCode) {
                  this.signInWithProvider(fbAuthProvider);
            }  else {
                  alert('Please enter party code');
            }
            
      }

      handleTwitterLogin(e) {

            if(this.state.partyCode) {
                  this.signInWithProvider(twitterAuthProvider);
            }  else {
                  alert('Please enter party code');
            }
      }

      handleGooglePlusLogin(e) {

            if(this.state.partyCode) {
                  this.signInWithProvider(googleAuthProvider);
            } else {
                  alert('Please enter party code');
            }      
      }


      /*
            Skip Login Event Handler

            */

      handleSkip(e) {

            if(this.state.partyCode) {
                  this.signInAnonymously();
            } else {
                  alert('Please enter party code');
            }
            
      }

      /*
            PartyCode Change handler

            */

      onPartyCodeChange(e) {
            this.setState({partyCode: e.target.value});
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
                              <input type="text" placeholder="ENTER CODE" className={`${styles["input-code"]}`} defaultValue={this.state.partyCode} onChange={this.onPartyCodeChange.bind(this)}/>
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