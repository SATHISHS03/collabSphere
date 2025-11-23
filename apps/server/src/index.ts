import express from "express";
import AuthRouter from "./auth/auth.route";
import { globalErrorHandler } from "./utils/errorMiddleware";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route
app.use("/auth", AuthRouter);
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
