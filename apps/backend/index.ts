import { dbLogger, logger } from "logger";
import mongoose from "mongoose";
import { app } from "./server";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`[INFO] Server development has started on port ${PORT}`);
});

const onCloseSignal = async () => {
  logger.info("sigint received, shutting down");

  await mongoose.connection.close(true);
  dbLogger.info("Database connection close");

  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
