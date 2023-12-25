import * as process from "process";

export const jwtSecret = process.env.jwt_secret || "This is default secret";
