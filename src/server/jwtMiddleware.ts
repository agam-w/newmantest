import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./constants";

interface AuthUser {
  id: number;
  address: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: AuthUser;
    }
  }
}

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded as AuthUser;

    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden" });
  }
};
