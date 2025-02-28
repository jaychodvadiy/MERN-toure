import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import authRoute from "./routes/authRouter.js";
import userRoute from "./routes/users.js";
import tourRoute from "./routes/tours.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/bookings.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

dbConnect();

// CORS Middleware
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
