import { Response, NextFunction } from "express";
import { ErrorHandler, AsyncHandler } from "../utils/handlers.util";
import { CustomRequest } from "../types/types";

const verifyRecruiter = AsyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new ErrorHandler("Recruiter Not Found", 404));
    if (user.role !== "recruiter") return next(new ErrorHandler("You are not authorized to access this route", 401));
    next();
});

export { verifyRecruiter };