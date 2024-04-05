import jwt from "jwt-simple";
import moment from "moment";
import { UserDocument } from "../models/userModel";

const secret = "CanarioMartinez2024";

export function createToken(user: UserDocument): string {
  const payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, secret);
}

export function getDataToken(token: string | undefined): any {
  if (token != undefined) {
    return jwt.decode(token, secret);
  }
}
