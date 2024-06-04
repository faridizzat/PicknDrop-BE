import express from "express";
import { healthCheck, healthCheckJson } from "./controller/health.js";
import { databaseInit } from "./database/index.js";

const app = express();
const PORT = 3000;

app.get("/helloworld", healthCheck);
app.get("/helloworld-json", healthCheckJson);

//db initialization
databaseInit();

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
