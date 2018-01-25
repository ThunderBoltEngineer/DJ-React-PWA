import React, { Component } from "react";
import firebase from "firebase";
import {Redirect} from "react-router-dom";
import Carousel from "src/app/components/carousel";
import Sidebar from 'react-sidebar';

// import css
import * as styles from "./styles.css";

// import images
import MainBackground from "src/resources/images/main/background.png";
import EQLZ from "src/resources/images/main/eqlz.png";
import Like from "src/resources/images/main/like.png";
import LikeSelected from "src/resources/images/main/ex-sel-like.png";
import Dislike from "src/resources/images/main/dislike.png";
import DislikeSelected from "src/resources/images/main/ex-sel-dislike.png";
import Menu from "src/resources/images/main/Menu.png";

import Chat from "src/resources/images/main/chat.png";

// redux
import store from 'src/app/store';
import {fetchRecentlyPlayedSongs} from 'src/app/actions/recentlyPlayedSongsActions';
import {voteSong} from 'src/app/actions/voteSongActions';
import {logout} from 'src/app/actions/logoutActions';
//

export default class Main extends Component {

		constructor(props) {
			super(props);

			// function binding
   			this.onSetSidebarOpen.bind(this);

   			// state initialization
   			this.state = {
   				partyId: store.getState().party.partyId,
   				recentPlayList: store.getState().recentlyPlayedSongs.data,
   				currentIndex: 0,
   				sidebarOpen: false
   				};

		}

		componentDidMount() {

			//connect to store
			this.unsubscribe = store.subscribe(()=>{
                  console.log('subscribe on mainpage');
                  this.setState({
                  	recentPlayList: store.getState().recentlyPlayedSongs.data,
                  	partyId: store.getState().party.partyId
                  });
            });




			// if user has joined party, fetch recently played song list
			if (this.state.partyId > 0) {
				let _this = this;


				firebase.auth().onAuthStateChanged(function(user) {
	        	if(user) {
	                // user signed in 
	                console.log('logged in');

	                user.getIdToken().then(function(token) {
	                    _this.setState({token: token});
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
			set sidebar status
			*/
		onSetSidebarOpen = (open) => {
			this.setState({sidebarOpen: open});
		}

		/*
			slide change event listener

			*/
		onSlideChange(index) {
			console.log(index);
			this.setState({currentIndex: index});
		}

		/*
			user clicked like button

			*/
		onLike(e) {
			let index = this.state.currentIndex;

			if (this.state.recentPlayList[index].user_vote != "up") {
				let vote = "upvote";
				let songId = this.state.recentPlayList[index].id;
				let partyId = this.state.recentPlayList[index].party_id;
				let token = this.state.token;

				store.dispatch(voteSong(index, token, vote, songId, partyId));
			}
		}

		/*
			user clicked dislike button

			*/

		onDislike(e) {
			let index = this.state.currentIndex;

			if (this.state.recentPlayList[index].user_vote != "down") {
				let vote = "downvote";
				let songId = this.state.recentPlayList[index].id;
				let partyId = this.state.recentPlayList[index].party_id;
				let token = this.state.token;
				
				store.dispatch(voteSong(index, token, vote, songId, partyId));
			}
		}

		/*
			menu events

			*/

		onMenu(e) {
			this.onSetSidebarOpen(true);
		}

		onHome(e) {
			this.onSetSidebarOpen(false);
		}

		onPolicy(e) {
			window.open("https://www.iubenda.com/privacy-policy/976377");
			this.onSetSidebarOpen(false);
		}

		onLogout(e) {
			this.onSetSidebarOpen(false);

			//log out
			store.dispatch(logout(this.state.token));
		}



		/*
			render 

			*/

		render() {
			if (this.state.partyId >= 0) {
				var sidebarContent = (
					<b>
						
						<div className={`${styles["container-sidebar"]}`}>
							<div className={`${styles["div-header-sidebar"]}`}>
								<p>Menu</p>
							</div>

							<div className={`${styles["div-menu-sidebar"]}`} onClick={this.onHome.bind(this)}>
								Home
							</div>

							<div className={`${styles["div-menu-sidebar"]}`} onClick={this.onPolicy.bind(this)}>
								Privacy Policy
							</div>

							<div className={`${styles["div-menu-sidebar"]}`} onClick={this.onLogout.bind(this)}>
								Logout
							</div>
						</div>
					</b>
				);

				return (
					<Sidebar sidebar={sidebarContent} open={this.state.sidebarOpen} onSetOpen={this.onSetSidebarOpen}>
					<b>
					<div>
						<img src={MainBackground} alt="Main" className="img-responsive" className={`${styles["img-bg"]}`} />
						
						<div className={`${styles["container-main"]}`}>
							
							<div className={`${styles["div-header"]}`}>
								<p>spINFLUENCEit</p>
								<img src={Menu} alt="Menu" className="img-responsive" className={`${styles["img-menu"]}`} onClick={this.onMenu.bind(this)} />
								
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
										<img src={this.state.recentPlayList[this.state.currentIndex].user_vote=="up"?LikeSelected:Like} disabled={this.state.recentPlayList[this.state.currentIndex].user_vote=="up"} alt="song" className="img-responsive pull-right" onClick={this.onLike.bind(this)}/>
									</div>
									<div className={`${styles["col-like-dislike"]}`}>
										<img src={this.state.recentPlayList[this.state.currentIndex].user_vote=="down"?DislikeSelected:Dislike} disabled={this.state.recentPlayList[this.state.currentIndex].user_vote=="down"} alt="song" className="img-responsive pull-left" onClick={this.onDislike.bind(this)}/>
									</div>
								</div>
								
							</div>

							<div className={`${styles["div-footer"]}`}>
								<div className="row" className={`${styles["row-footer"]}`}>
									<div className={`${styles["col-left"]}`}>
										<div>
											Request New Songs
										</div>
									</div>
									<div className={`${styles["col-right"]}`}>
										<img src={Chat} className="img-responsive"/>
									</div>
								</div>
							</div>

						</div>
					</div>
					</b>
					</Sidebar>
				);
			} else {
				return <Redirect to="/"/>;
			}

			
		}
}