import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

//Using Required Middlewares

//1. CORS
const corsOptions = {
    origin: 'https://pro-manage-frontend-drlu8qxst-harshithaajs-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

//2. EXPRESS
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Handle preflight requests
app.options('*', cors(corsOptions));

//Health Api
app.get("/api/v1/health", (_, res) => {
    res.status(200).json({
        status: "active",
        service: "Pro Manage Backend",
        time: new Date(),
    })
})

//Importing Routers
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

//Declaring Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

//Error Handler Middleware
app.use(errorHandler)

export default app;