const winston = require("winston");

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`;
  })
);

class Logger {
  logger = winston.Logger;

  constructor() {
    const transport = new winston.transports.Console({
      format: formatter,
    });

    this.logger = winston.createLogger({
      level: "info",
      transports: [
        transport,
        new winston.transports.File({ filename: "logs/combined.log" , level: 'info'}),
        new winston.transports.File({
          filename: "logs/errors.log",
          level : 'error'
        }),
      ],
    });
  }

  info(msg, meta = {}) {
    this.logger.info(msg, meta);
  }

  warn(msg, meta = {}) {
    this.logger.warn(msg, meta);
  }

  error(msg, meta = {}) {
    this.logger.error(msg, meta);
  }

  fatal(msg, meta = {}) {
    this.logger.log("fatal", msg, meta);
  }
}

exports.logger = new Logger();
