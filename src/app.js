import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

//Using Required Middlewares

//1. CORS
const corsOptions = {
      // Your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
    credentials: true  // If you need to support cookies or other credentials
};

app.use(cors(corsOptions));
app.use(cors());

//2. EXPRESS
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//Health Api
app.get("/api/v1/health", (_, res)=> {
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