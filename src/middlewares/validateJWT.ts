import type { NextFunction, Response } from "express";
import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import type { ExtendRequest } from "../types/extendedRequest.js";

const validataJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("Authorization");
  if (!authorizationHeader) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).json("Bearer token is required");
    return;
  }
  Jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid token");
      return;
    }
    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };
    // Fetch user database based on the payload
    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};

export default validataJWT;
