import bcrypt from "bcrypt";
export default async function verifyPassword(password: string, hashed: string) {
  return await bcrypt.compare(password, hashed);
}
