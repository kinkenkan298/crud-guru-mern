import { logger } from "logger";
import { app } from "./server";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`[INFO] Server development has started on port ${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
