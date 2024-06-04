import express from "express";
import { healthCheck, healthCheckJson } from "./controller/health.js";
import { databaseInit } from "./database/index.js";
import { createNewUser } from "./controller/user/createNewUser.js";

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

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
