import express from 'express';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import responder from './utils/responder';

dotenv.config();

//Initialize app
const app = express(); 

// Middlewares
app.use(bodyParser.json());
app.use(cors()); //Cross origin resource sharing
app.use(morgan('dev')); // Logger

// Routes
const registerRoutes = require('./routes/register')
app.use("/register", registerRoutes);

const loginRoutes = require('./routes/login')
app.use("/login", loginRoutes);

const userRoutes = require('./routes/user')
app.use("/user" , userRoutes)

const contentRoutes = require('./routes/content')
app.use("/content", contentRoutes);

const adminRoutes = require('./routes/admin')
app.use("/admin", adminRoutes);

//Test Route
const indexRoutes = require('./routes/index');
app.use("/", indexRoutes);

//favicon.ico automatic request handler
app.get('/favicon.ico', (req : Request, res : Response) => {
    res.status(204).end();
  });

// Invalid routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({error: "Invalid route"});
});

// Export the fully configured app instance
export default app;