import express, { json } from "express";
import logger from "morgan";
import Routes from "./routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(json());

app.use("/api", Routes);

export default app;
