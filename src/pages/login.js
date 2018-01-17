import Login from "../app/components/login";

const routes = [
  {
    path: "/",
    exact: true,
    component: Login
  },
  {
  	path: "/:code",
  	exact: true,
  	component: Login
  }
];
export default routes;