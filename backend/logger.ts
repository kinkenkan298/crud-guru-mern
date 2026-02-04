import type { NextFunction, Request, Response } from "express";
import pino, { type Logger } from "pino";

const logger: Logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname",
      singleLine: true,
    },
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
    bindings: (bindings) => {
      return {
        pid: bindings.pid,
        hostname: bindings.hostname,
      };
    },
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: {
        "user-agent": req.headers["user-agent"],
        "content-type": req.headers["content-type"],
      },
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
    err: pino.stdSerializers.err,
  },
});

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers["user-agent"],
    };
    if (res.statusCode >= 500) {
      logger.error(logData, "Server Error");
    } else if (res.statusCode >= 400) {
      logger.warn(logData, "Client Error");
    } else {
      logger.info(logData, "Request completed");
    }
  });

  next();
};

const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(
    {
      err: err,
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
      ip: req.ip,
    },
    "Unhandled Error",
  );

  res.status(500).json({
    error: "Internal Server Error",
  });
};

const dbLogger = {
  info: (message: string, data?: any) => {
    logger.info({ ...data, context: "DATABASE" }, message);
  },
  error: (message: string, data?: any) => {
    logger.error({ ...data, context: "DATABASE" }, message);
  },
  warn: (message: string, data?: any) => {
    logger.warn({ ...data, context: "DATABASE" }, message);
  },
};

export { dbLogger, errorLogger, logger, requestLogger };
