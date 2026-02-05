import { dbLogger } from "logger";
import mongoose from "mongoose";

export const db = async () => {
  try {
    dbLogger.info("Trying to connect database!");
    await mongoose.connect(process.env.DATABASE_URI!);
    dbLogger.info("Database connected");
  } catch (error) {
    dbLogger.error("Database connection failed", error);
  }
};
