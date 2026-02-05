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

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
    "Request received",
  );

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? "warn" : "info";

    logger[logLevel](
      {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: `${duration}ms`,
        contentLength: res.get("Content-Length") || "0",
      },
      "Response sent",
    );
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

const logBodyRequests = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    if (req.body && Object.keys(req.body).length > 0) {
      logger.debug(
        {
          body: req.body,
        },
        "Body parameters",
      );
    }
  }
  next();
};

const logQueryParams = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    if (Object.keys(req.query).length > 0) {
      logger.debug(
        {
          query: req.query,
        },
        "Query parameters",
      );
    }
  }
  next();
};

export {
  dbLogger,
  errorLogger,
  logBodyRequests,
  logger,
  logQueryParams,
  requestLogger
};

