import { settings } from './settings.js';

export class logger {
  static info(...args) {
    console.log(`${settings.TITLE} | `, ...args);
  }
  static debug(...args) {
    if (game.settings.get(settings.NAME, 'debug'))
      logger.info(`${settings.i18n("logger.debug")} | `, ...args);
  }
  static error(...args){
    logger.info(`${settings.i18n("logger.debug")} | `, ...args);
    ui.notifications.error(`${settings.i18n("logger.debug")} | ${args.join(' ')}`);
  }
}
