import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { PUBLIC_APP_NAME } from '$env/static/public';

const transport = new DailyRotateFile({
  filename: `logs/${PUBLIC_APP_NAME}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d'
});

const accessTransport = new DailyRotateFile({
    filename: `logs/access/${PUBLIC_APP_NAME}-%DATE%.access.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d'
});

const authTransport = new DailyRotateFile({
    filename: `logs/auth/${PUBLIC_APP_NAME}-%DATE%.auth.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d'
});

const errorTransport = new DailyRotateFile({
    filename: `logs/error/${PUBLIC_APP_NAME}-%DATE%.error.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d'
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [transport, new winston.transports.Console()]
});

export const accessLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [accessTransport, new winston.transports.Console()]
});

export const authLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [authTransport, new winston.transports.Console()]
});

export const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(error => `[${error.timestamp}] ${error.level.toUpperCase()}: ${error.message}`)
  ),
  transports: [errorTransport, new winston.transports.Console()]
});

export default logger;
