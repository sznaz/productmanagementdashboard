import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.message);
  const response = {
    statusCode: 500,
    message: "Server Error"
  };
  res.status(response.statusCode).json(response);
};

export default errorMiddleware;