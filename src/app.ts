import express from "express";
import router from "./route";
import nodeCron from "node-cron";
import { database } from "./core/service/database";
import cors from "cors";

const app = express.Router();

app.use(express.json());

app.use(
  cors({
    origin: "*", // for development
  })
);

app.use(router);

nodeCron.schedule("0 0 * * * *", async () => {
  console.log("checking");
  try {
    const [rows] = await database.execute(`
                update batch set status = 'EXPIRED'
                where exp <= NOW() and status = 'ACTIVE';
            `);
    console.log(rows);
  } catch (err) {
    console.error("Cron error:", err);
  }
});

export default app;
