import express from "express";
import { healthCheck, healthCheckJson } from "./controller/health.js";
import { databaseInit } from "./database/index.js";
import { createNewUser } from "./controller/user/createNewUser.js";
import createNewChildren from "./controller/children/createNewChildren.js";
import loginUser from "./controller/user/loginUser.js";
import isAuth from "./middleware/isAuth.js";

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db initialization
databaseInit();

//health check
app.get("/helloworld", healthCheck);
app.get("/helloworld-json", healthCheckJson);

//register new user
app.post("/register", createNewUser);

//login user
app.post("/login", loginUser);

//create Children
app.post("/children", isAuth, createNewChildren);

//start server
app.listen(PORT, () => {
  console.log(`PicknDrop app listening on http://localhost:${PORT}`);
});
