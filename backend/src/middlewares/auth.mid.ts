import { HTTP_UNAUTHERISED } from "@constants/http_status";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export default (req: any, res: Response, next: NextFunction): void => {
  const token = req.headers.access_token as string;
  if (!token) {
    res.status(HTTP_UNAUTHERISED).send();
    return;
  }
  try {
    const decodeUser = verify(token, process.env.JWT_SECRET!);
    const { user } = decodeUser as JwtPayload;
    req.user = user;
  } catch (error) {
    console.log("error in middleware", error);
    res.status(HTTP_UNAUTHERISED).send();
  }

  return next();
};
