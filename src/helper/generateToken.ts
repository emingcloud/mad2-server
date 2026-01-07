import jwt from "jsonwebtoken";
import DotEnv from "../core/service/DotEnv";

export default function generateToken(claim: string | Buffer | object) {
  const token = jwt.sign(claim, DotEnv.privateKey, {
    expiresIn: 3600,
    algorithm: "RS256",
  });
  return token;
}
