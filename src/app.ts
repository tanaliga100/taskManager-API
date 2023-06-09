import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/connect";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { tasksRoute } from "./routers/tasks";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1/tasks", tasksRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async (port: any) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log("DB ESTABLISHED && LISTENING => " + port)
    );
  } catch (error: any) {
    console.log(error);
  }
};
start(port);
