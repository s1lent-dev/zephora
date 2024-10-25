import { Request, Response, NextFunction } from "express";

interface User {
    _id: string;
    googleId: string;
    githubId: string;
    firstName: string;
    lastName: string;
    username: string;   
    email: string;
    password: string;
    gender: string;
    dob: Date;
    phone: string;
    address: string;
    location: string;
    avatar: string;
    role: string;
    profile: Profile;
    refreshToken: string;
}

interface Profile {
    bio: string;
    skills: string[];
    social: {
        twitter: string;
        github: string;
        leetcode: string;
    };
    education: [{
        qualification: string;
        degree: string;
        stream: string;
        institute: string;
        cgpa: number;
        start: Date;
        end: Date;
    }];
    experience: [{
        title: string;
        company: string;
        location: string;
        start: Date;
        end: Date;
        current: boolean;
        description: string;
    }];
}

interface Job {
    title: string;
    description: string;
    type: string;
    requirements: string;
    salary: number;
    location: string;
}


interface Company {
    name: string;
    logo: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    location: string;
    address: string;
    geo_location: {
        longitude: number;
        latitude: number;
    };
}



type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
interface CustomRequest extends Request {
    user?: User;
}
export { ControllerType, CustomRequest, User, Company, Job };
