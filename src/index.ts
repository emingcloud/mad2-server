import express from "express";
import DotEnv from "./core/service/DotEnv";
import app from "./app";
import generateQR from "./helper/generateQR";

const server = express();

server.use(app);

server.listen(DotEnv.port, DotEnv.host, () => {
  console.log(`server started at http://${DotEnv.host}:${DotEnv.port}`);
});
