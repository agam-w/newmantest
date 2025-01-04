import express from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./constants";
import { jwtMiddleware } from "./jwtMiddleware";

const api = express.Router();

// api routes here
// all routes are prefixed with /api

api.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

// receive address from request body
// create jwt token from address
// send jwt token as response
api.post("/auth", (req, res) => {
  // get address from request body
  const address = req.body.address;
  if (!address) {
    res.status(400).json({ error: "address is required" });
    return;
  }

  // create jwt token from address
  const token = jwt.sign({ address }, SECRET_KEY);

  res.json({ token });
});

api.get("/profile", jwtMiddleware, (req, res) => {
  res.json({ message: "Hello from server" });
});

export const apiRouter = api;
