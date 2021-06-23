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


import {
  list,
  create,
  edit,
  remove,
  deactive
} from "../api/controllers/TodoController";

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

routes.post("/login", login);
routes.post("/registerUser", registerUser);
routes.post("/updateUser", isAuthorized, updateUser);
routes.post("/logOut", isAuthorized, logOut);
routes.post("/deleteUser", isAuthorized, deleteUser);
routes.post("/userDetails", isAuthorized, userDetails);


// ToDo 
routes.get("/todo", isAuthorized, list);
routes.post("/todo", isAuthorized, create);
routes.put("/todo", isAuthorized, edit);
routes.delete("/todo", isAuthorized, remove);


export default routes;
