import React, { Component } from "react";
import Infinite from "react-infinite";
import {Redirect} from "react-router-dom";
import ListItem from "src/app/components/listitem"
import firebase from "firebase";

// import css
import * as styles from "./styles.css";

// import images
import MainBackground from "src/resources/images/main/background.png";
import Back from "src/resources/images/main/Back.png";

// redux
import store from 'src/app/store';

import {searchSongs} from 'src/app/actions/searchSongsActions';

var prevTimer = null;

export default class Search extends Component {

		constructor(props) {
			super(props);

			// function binding

   			// state initialization
   			this.state = {
   				partyId: store.getState().party.partyId,
   				backPressed: false,
   				sid: 1,
   				nextAccepted: 1,
   				token: null,
   				matches: store.getState().searchSongs.matches,
   				tableHeight: 1,
   				selectedRow: -1
   				};

		}

		componentDidMount() {

			//connect to store
			this.unsubscribe = store.subscribe(()=>{
                  console.log(store.getState().searchSongs);
                  this.setState({
                  	partyId: store.getState().party.partyId,
                  	matches: store.getState().searchSongs.matches,
                  	sid: store.getState().searchSongs.searchId
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
	                });

	            }
	        });
			}

			// get table height
			let height = document.getElementById("tableContainer").clientHeight - 20;
			this.setState({tableHeight: height});
			
		}

		componentWillUnmount() {
			// unsubscribe from store
			this.unsubscribe();
		}


		/*
			user click back button

			*/

		onBack(e) {
			this.setState({backPressed: true});
		}

		/*
			search word change ...

			*/
		

		onSearchTermChange(e) {
			let _this = this;
			let searchTerm = e.target.value;

			if (searchTerm != "") {
				window.clearTimeout(prevTimer);
				prevTimer = window.setTimeout(() => {
					_this.setState({selectedRow: -1});
					store.dispatch(searchSongs(_this.state.token, _this.state.partyId, searchTerm, _this.state.sid));

				}, 500);
			}
		}

		/*
			user click request

			*/

		onRequest(e) {
			
		}

		/*
			user selected one row at index

			*/
		onSelected(index) {
			console.log(index);
			this.setState({selectedRow: index});
		}


		/*
			render 

			*/

		render() {
			if (this.state.partyId >= 0) {
				if (this.state.backPressed == false) {

					console.log(this.state.matches);
					var elements = [];
        			for (var i = 0; i < this.state.matches.length; i++) {
            			elements.push(<ListItem key={i} content={this.state.matches[i].title + " - " + this.state.matches[i].artist} index={i} onSelected={this.onSelected.bind(this)} selected={this.state.selectedRow == i ? true : false}/>)
        			}

					return (
					<div>
						<img src={MainBackground} alt="Main" className="img-responsive" className={`${styles["img-bg"]}`} />
						
						<div className={`${styles["container-main"]}`}>
							
							<div className={`${styles["div-header"]}`}>
								<p>spINFLUENCEit</p>
								<img src={Back} alt="back" className="img-responsive" className={`${styles["img-back"]}`} onClick={this.onBack.bind(this)} />
								
							</div>

							<div className={`${styles["div-search"]}`}>
								<input type="text" placeholder="Search here for a new request" onChange={this.onSearchTermChange.bind(this)}/>
							</div>

							<div className={`${styles["div-table"]}`} id="tableContainer">
								<Infinite elementHeight={40}
											containerHeight={this.state.tableHeight}
											infiniteLoadBeginEdgeOffset={this.state.tableHeight - 50}
											isInfiniteLoading={false}
											>
									{elements}
								</Infinite>
							</div>

							<div className={`${styles["div-request"]}`} onClick={this.onRequest.bind(this)}>
								<p>Request</p>
							</div>

						</div>
					</div>
					);
				} else {
					return <Redirect to="/main"/>;
				}
				
			} else {
				return <Redirect to="/"/>;
			}

			
		}
}