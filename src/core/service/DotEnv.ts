import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const privateKey = fs.readFileSync("./private.key", "utf-8");
export default class DotEnv {
  static port: number = Number(process.env.PORT) || 3000;
  static host: string = process.env.HOST!;
  static mysql_host: string = process.env.mysql_host!;
  static mysql_user: string = process.env.mysql_user!;
  static mysql_password: string = process.env.mysql_password!;
  static privateKey: string = privateKey;
}
