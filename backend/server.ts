import cors from "cors";
import express from "express";
import { teacherRoutes } from "routes/teacher.routes";
import { db } from "./db";
import {
  logBodyRequests,
  logQueryParams,
  requestLogger
} from "./logger";

const app = express();

app.use(requestLogger);
app.use(logBodyRequests);
app.use(logQueryParams);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

await db();

app.use("/v1/teachers", teacherRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
