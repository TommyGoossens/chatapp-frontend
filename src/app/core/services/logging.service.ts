import {Injectable} from '@angular/core';


export enum LogLevel {
  TRACE,
  INFO,
  WARN,
  ERROR
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() {
  }

  public log(level: LogLevel, sender: string, message: string) {
    switch (level) {
      case LogLevel.TRACE:
        console.trace(`${sender}: ${message}`);
        break;
      case LogLevel.INFO:
        console.info(`${sender}: ${message}`);
        break;
      case LogLevel.WARN:
        console.warn(`${sender}: ${message}`);
        break;
      case LogLevel.ERROR:
        console.error(`${sender}: ${message}`);
        break;

    }
  }
}
