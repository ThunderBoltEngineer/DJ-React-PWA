import {trackPageView} from "pawjs/src/utils/analytics";

// Importing bootstrap
import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/css/bootstrap.css";

import * as appReducers from "./app/reducers";

export const reduxInitialState = {
  counter: {
    count: 5
  }
};
export const reduxReducers = appReducers;
export const onPageChange = function() {
  trackPageView().catch();
};

if (module.hot) module.hot.accept();