import jwt from "jsonwebtoken";

import { secretOrKey } from "../config/jwt";

/**
 * TODO: Set an expiry time. When the user wants to log out, add the token to a black list. Have a recurring check to remove expired tokens from black list
 */
export const generateToken = (username) => jwt.sign({ id: username }, secretOrKey);