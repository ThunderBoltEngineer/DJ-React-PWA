import {trackPageView} from "pawjs/src/utils/analytics";

// Importing bootstrap
import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/css/bootstrap.css";

import * as appReducers from "./app/reducers";

export const reduxReducers = appReducers;

if (module.hot) module.hot.accept();