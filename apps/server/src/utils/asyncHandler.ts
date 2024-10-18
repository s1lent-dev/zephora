import { Request, Response, NextFunction } from "express";
import { ControllerType } from "../types/types.js";

const AsyncHandler = (reqHandler: ControllerType) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(reqHandler(req, res, next)).catch(next);
};

export { AsyncHandler };
