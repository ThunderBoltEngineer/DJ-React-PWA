import React, { Component } from "react";
import firebase from 'firebase';
import axios from 'axios';

// import css
import * as styles from "./styles.css";

// import images
import LoginBackground from "src/resources/images/login/bg.png";

// import firebase configuration info
// import config from "src/config/firebase_config.js";
// const firebaseConfig = config.config;


// // configure firebase 
// firebase initialization
const firebaseConfiguration = {
            apiKey: "AIzaSyCKO0ZkKAemKMSnGeq1K192y8pemWfvZNE",
      authDomain: "spinfluence-320d8.firebaseapp.com",
      databaseURL: "https://spinfluence-320d8.firebaseio.com",
      projectId: "spinfluence-320d8",
      storageBucket: "spinfluence-320d8.appspot.com",
      messagingSenderId: "133793994050"
};

// configure firebase 
firebase.initializeApp(firebaseConfiguration);

// redux

import store from 'src/app/store';
import {fetchParty} from 'src/app/actions/partyActions';


// component

export default class Login extends Component {

      constructor(props) {
            super(props);

            this.signInAnonymously = this.signInAnonymously.bind(this);
            this.requestFCMPermission = this.requestFCMPermission.bind(this);

            this.state = {
                  partyCode: props.match.params.code,
                  joining: props.match.params.code === undefined ? false : true
            };
      }

      componentDidMount() {
            this.unsubscribe = store.subscribe(() => {
                  this.setState({party: store.getState().party})
                  
                  console.log('subscribe');

                  if (this.state.party.paid) {
                        alert('this is paid party');
                  }


                  // navigate to main page
                  this.setState({joining: false});
                  this.props.history.push('/main');
            });


            this.setState({party: store.getState().party});

            if(this.state.joining) {
                  this.signInAnonymously();
            }

            this.requestFCMPermission();
      }

      componentWillUnmount() {
            this.unsubscribe();
      }

      /*
            request messaging permission

            */

      requestFCMPermission = () => {
            // firebase.messaging().requestPermission()
            // .then(function() {
            //       console.log('Notification Permission Granted');
            // })
            // .catch(function(err) {
            //       console.log('Unabled to get permission to notify ' + err);
            // });
      }



      /*
            firebase anonymous authentication

            */

      signInAnonymously = () => {
            let _this = this;

            firebase.auth().signInAnonymously().catch(function(error) {
                  alert('authentication failed');

                  var errorMessage = error.message;
                  console.log(errorMessage);

                  this.setState({joining: false});
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
            Join Party Event Handler

            */

      handleJoin(e) {
            

            if(this.state.partyCode) {
                  this.setState({joining: true});

                  this.signInAnonymously();
            } else {
                  alert('Please enter party code');
            }
            
      }

      /*
            PartyCode Change handler

            */

      onPartyCodeChange(e) {
            this.setState({partyCode: e.target.value.toUpperCase()});
      }

      /*
            Render Login Page

            */

      render() {
            let joining = this.state.joining;

            if (joining) {
                  return (
                        <div>
                              <img src={LoginBackground} alt="Login" className="img-responsive" className={`${styles["img-bg"]}`} />
                              <div className={`${styles["joining-text"]}`}>
                                    Joining ...
                              </div>
                        </div>
                        );
            } else {
                 return (
                        <div>
                              <img src={LoginBackground} alt="Login" className="img-responsive" className={`${styles["img-bg"]}`} />
                              <div className={`${styles["container-login"]}`}> 
                                    <p className={`${styles["label-login"]}`}> Log In </p>
                                    <div className={`${styles["div-login"]}`}>
                                          <div className={`${styles["div-title"]}`}>
                                                <p>spINFLUENCEit</p>
                                                <div className={`${styles["div-separator"]}`}/>
                                          </div>
                                          <div className={`${styles["div-code"]}`}>
                                                <input type="text" placeholder="ENTER CODE" className={`${styles["input-code"]}`} defaultValue={this.state.partyCode} onChange={this.onPartyCodeChange.bind(this)}/>
                                          </div >
                                          <div className={`${styles["div-skip"]}`}>
                                                <div className={`${styles["btn-transparent"]} ${styles["btn-skip"]}`} onClick={this.handleJoin.bind(this)}>
                                                      Join Party
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  ); 
            }
          
      }
}