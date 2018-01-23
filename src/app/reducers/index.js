import {combineReducers} from "redux";

import party from "./partyReducer";
import recentlyPlayedSongs from "./recentlyPlayedSongsReducer";

export default combineReducers({
	party,
	recentlyPlayedSongs
});