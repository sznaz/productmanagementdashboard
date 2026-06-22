import express from "express";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";
import productRouter from './api/routes/product.router'
import categoryRouter from './api/routes/category.router'

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

app.use(errorMiddleware);

export default app;