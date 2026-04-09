import type { Response } from "express";

export const errorHandler = (
  err: any,
  res: Response,
) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
};
