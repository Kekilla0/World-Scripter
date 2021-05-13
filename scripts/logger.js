import { settings } from './settings.js';

export class logger {
  static info(...args) {
    console.log(`${settings.title} | `, ...args);
  }

  static debug(...args) {
    if (game.settings.get(settings.name, 'debug'))
      logger.info("DEBUG | ", ...args);
  }

  static error(...args){
    logger.info("ERROR | ", ...args);
    ui.notifications.error(`Error `, ...args);
  }
}