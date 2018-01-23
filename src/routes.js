import {configureRoutes} from "pawjs/src/utils/bundler";
// routes
import * as Login from "./pages/login";
import * as Main from "./pages/main";

export default configureRoutes([
  Login,
  Main
]);