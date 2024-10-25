import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { expressMiddleware } from "@apollo/server/express4";
import { graphqlServer } from "./graphql/graphql.js";
import bodyParser from "body-parser";
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import passport from 'passport';
import session from 'express-session';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
await graphqlServer.start();
app.use('/graphql', bodyParser.json(), expressMiddleware(graphqlServer));

app.use(session({
    secret: process.env.OAUTH_SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found',
    });
});

app.use(ErrorMiddleware as any);

export { app };