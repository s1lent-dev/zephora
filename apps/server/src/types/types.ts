import { Request, Response, NextFunction } from "express";

type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export { ControllerType };
