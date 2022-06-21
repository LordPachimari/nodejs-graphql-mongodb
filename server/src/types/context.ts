import { Request, Response } from "express";
import { Db } from "mongodb";

export type Context = {
  req: Request & { session: { userId?: number } };
  res: Response;
  db: Db;
};
