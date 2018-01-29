import {combineReducers} from "redux";

import party from "./partyReducer";
import recentlyPlayedSongs from "./recentlyPlayedSongsReducer";
import searchSongs from "./searchSongsReducer";

export default combineReducers({
	party,
	recentlyPlayedSongs,
	searchSongs
});