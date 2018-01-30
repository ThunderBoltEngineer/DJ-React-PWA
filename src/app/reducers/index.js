import {combineReducers} from "redux";

import party from "./partyReducer";
import recentlyPlayedSongs from "./recentlyPlayedSongsReducer";
import searchSongs from "./searchSongsReducer";
import sendRequest from "./sendRequestReducer";

export default combineReducers({
	party,
	recentlyPlayedSongs,
	searchSongs,
	sendRequest
});