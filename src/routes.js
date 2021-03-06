import {configureRoutes} from "pawjs/src/utils/bundler";
// routes
import * as Login from "./pages/login";
import * as Main from "./pages/main";
import * as Search from "./pages/search";
import * as Request from "./pages/request";
import * as Message from "./pages/message";

export default configureRoutes([
  Login,
  Main,
  Search,
  Request,
  Message
]);