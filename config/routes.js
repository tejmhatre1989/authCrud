const routes = require("express").Router();

import isAuthorized from "../api/policies/isAuthorized";

import {
  registerUser,
  updateUser,
  login,
  logOut,
  userDetails,
  deleteUser
} from "../api/controllers/UserController";

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

routes.post("/login", login);
routes.post("/registerUser", registerUser);
routes.post("/updateUser", isAuthorized, updateUser);
routes.post("/logOut", isAuthorized, logOut);
routes.post("/deleteUser", isAuthorized, deleteUser);

routes.post("/userDetails", isAuthorized, userDetails);


export default routes;
