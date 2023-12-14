import winston from "winston";

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.errors({ stack: true }),
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((x) => `${x.timestamp} [${x.level}] ${x.message} ${x.stack ? "\n" + x.stack : ""}`)
  ),
  transports: [
    new winston.transports.Console(), //
    new winston.transports.File({ filename: "error.log" }),
  ],
});
