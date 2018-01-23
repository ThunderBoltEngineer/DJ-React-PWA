import React, { Component } from "react";
import firebase from 'firebase';
import axios from 'axios';

// import css
import * as styles from "./styles.css";

// import images
import LoginBackground from "src/resources/images/login/bg.png";

// import firebase configuration info
import config from "src/config/firebase_config.js";
const firebaseConfig = config.config;


// configure firebase 
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth; 

// redux

import store from 'src/app/store';
import {fetchParty} from 'src/app/actions/partyActions';


// component

export default class Login extends Component {

      constructor(props) {
            super(props);

            this.signInAnonymously = this.signInAnonymously.bind(this);

            this.state = {
                  partyCode: props.match.params.code,
                  joining: props.match.params.code === undefined ? false : true
            };
      }

      componentDidMount() {
            this.unsubscribe = store.subscribe(() => {
                  this.setState({party: store.getState().party})
                  
                  console.log('subscribe');


                  // navigate to main page
                  this.setState({joining: false});
                  this.props.history.push('/main');
            });


            this.setState({party: store.getState().party});

            if(this.state.joining) {
                  this.signInAnonymously();
            }
      }

      componentWillUnmount() {
            this.unsubscribe();
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