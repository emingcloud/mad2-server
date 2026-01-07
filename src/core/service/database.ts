import mysql, { type Pool } from "mysql2/promise";
import DotEnv from "./DotEnv";

export const database = mysql.createPool({
  host: DotEnv.mysql_host,
  user: DotEnv.mysql_user,
  password: DotEnv.mysql_password,
  waitForConnections: true,
  connectionLimit: 10,
  database: "ims",
}) as Pool;
