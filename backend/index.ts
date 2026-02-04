import { app } from "./server";

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.info(`[INFO] Server development has started on port ${PORT}`);
});

const onCloseSignal = () => {
  console.info("sigint received, shutting down");
  server.close(() => {
    console.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
