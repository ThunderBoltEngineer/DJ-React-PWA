import React, { Component } from "react";
import firebase from "firebase";
import {Redirect} from "react-router-dom";
import Carousel from "src/app/components/carousel";

// import css
import * as styles from "./styles.css";

// import images
import MainBackground from "src/resources/images/main/background.png";
import EQLZ from "src/resources/images/main/eqlz.png";
import Like from "src/resources/images/main/like.png";
import Dislike from "src/resources/images/main/dislike.png";
import Chat from "src/resources/images/main/chat.png";

// redux
import store from 'src/app/store';
import {fetchRecentlyPlayedSongs} from 'src/app/actions/recentlyPlayedSongsActions';
//

export default class Main extends Component {

		constructor(props) {
			super(props);

			// function binding
   			this.hasJoinedParty = this.hasJoinedParty.bind(this);

   			// state initialization
   			this.state = {
   				recentPlayList: store.getState().recentlyPlayedSongs.data,
   				currentIndex: 0
   				};
		}

		componentDidMount() {

			//connect to store
			this.unsubscribe = store.subscribe(()=>{
                  console.log('subscribe on mainpage');
                  this.setState({recentPlayList: store.getState().recentlyPlayedSongs.data});
            });




			// if user has joined party, fetch recently played song list
			if (this.hasJoinedParty()) {
				firebase.auth().onAuthStateChanged(function(user) {
	        	if(user) {
	                // user signed in 
	                console.log('logged in');

	                user.getIdToken().then(function(token) {
	                    
	    				store.dispatch(fetchRecentlyPlayedSongs(token, store.getState().party.partyId));
	                });

	            }
	        });
			}
			
		}

		componentWillUnmount() {
			// unsubscribe from store
			this.unsubscribe();
		}


		/*
			check if user joined party or not

			*/

		hasJoinedParty = () => {
			if(store.getState().party.partyId == -1) {
				return false;
			} else {
				return true;
			}
		}

		/*
			slide change event listener

			*/
		onSlideChange(index) {
			console.log(index);
			this.setState({currentIndex: index});
		}



		/*
			render 

			*/

		render() {
			if (this.hasJoinedParty()) {
				return (

					<div>
						<img src={MainBackground} alt="Main" className="img-responsive" className={`${styles["img-bg"]}`} />
						
						<div className={`${styles["container-main"]}`}>
							
							<div className={`${styles["div-header"]}`}>
								<p>spINFLUENCEit</p>
							</div>

							<div className={`${styles["div-perform-name"]}`}>
								<p>{store.getState().party.djName}</p>
							</div>

							<div className={`${styles["div-party-name"]}`}>
								<p>{store.getState().party.partyName}</p>
							</div>

							<div className={`${styles["div-carousel"]}`}>
								<Carousel playList={this.state.recentPlayList} className={`${styles["carousel"]}`} onSlideChange={this.onSlideChange.bind(this)}></Carousel>
							</div>	

							<div className={`${styles["div-song-info"]}`}>

								<div className="row">
									<div className="col-xs-3">
										<img src={EQLZ} alt="song" className="img-responsive"/>
									</div>
									<div className="col-xs-9">
										<p className={`${styles["song-title"]}`}>{this.state.recentPlayList[this.state.currentIndex].title}</p><br/>
										<p className={`${styles["song-artist"]}`}>{this.state.recentPlayList[this.state.currentIndex].artist}</p>
									</div>
								</div>
							</div>

							<div className={`${styles["div-like-dislike"]}`}>
								

								<div className="row" className={`${styles["row-like-dislike"]}`}>
									<div className={`${styles["col-like-dislike"]}`}>
										<img src={Like} alt="song" className="img-responsive pull-right" />
									</div>
									<div className={`${styles["col-like-dislike"]}`}>
										<img src={Dislike} alt="song" className="img-responsive pull-left" />
									</div>
								</div>
								
							</div>

							<div className={`${styles["div-footer"]}`}>
								<div className="row" className={`${styles["row-footer"]}`}>
									<div className={`${styles["col-left"]}`}>

									</div>
									<div className={`${styles["col-right"]}`}>
										<img src={Chat} className="img-responsive"/>
									</div>
								</div>
							</div>

						</div>
					</div>
				);
			} else {
				return <Redirect to="/"/>;
			}

			
		}
}