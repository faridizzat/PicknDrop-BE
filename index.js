import express from "express";
import { healthCheck, healthCheckJson } from "./controller/health.js";
import { databaseInit } from "./database/index.js";
import { createNewUser } from "./controller/user/createNewUser.js";
import createNewChildren from "./controller/children/createNewChildren.js";
import loginUser from "./controller/user/loginUser.js";
import isAuth from "./middleware/isAuth.js";
import getAllChildren from "./controller/children/getAllChildren.js";
import deleteChildren from "./controller/children/deleteChildren.js";
import updateChildren from "./controller/children/updateChildren.js";
import cors from "cors";
import updateUser from "./controller/user/updateUser.js";
import getUserById from "./controller/user/getUserById.js";
import getAttendanceById from "./controller/attendance/getAttendancebyId.js";
import createAttendance from "./controller/attendance/createAttendance.js";
import date from "date-and-time";
import updateAttendance from "./controller/attendance/updateAttendance.js";
import deleteAttendance from "./controller/attendance/deleteAttendance.js";

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//db initialization
databaseInit();

//health check
app.get("/api/helloworld", healthCheck);
app.get("/api/helloworld-json", healthCheckJson);

//register new user
app.post("/register", createNewUser);

//login user
app.post("/login", loginUser);

//get user profile
app.get("/user", isAuth, getUserById);

//update user profile
app.put("/user", isAuth, updateUser);

//create Children
app.post("/children", isAuth, createNewChildren);
//get Children
app.get("/children", isAuth, getAllChildren);
//delete Children
app.delete("/children", isAuth, deleteChildren);
//update Children
app.put("/children", isAuth, updateChildren);

//get attendance
app.get("/attendance", isAuth, getAttendanceById);
app.post("/attendance", isAuth, createAttendance);
app.put("/attendance", isAuth, updateAttendance);
app.delete("/attendance", isAuth, deleteAttendance);

//start server
app.listen(PORT, () => {
  console.log(`PicknDrop app listening on http://localhost:${PORT}`);
  const currentDate = new Date();
  console.log(date.format(currentDate, "DD/MM/YYYY"));
});
