import cors from "cors";
import express from "express";
import { db } from "./db";
import { logger } from "./logger";

const app = express();

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

await db();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
