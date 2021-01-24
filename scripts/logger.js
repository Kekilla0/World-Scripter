export class logger {
  static info(...args) {
      console.log("World Scripter | ", ...args);
  }

  static debug(...args) {
      if (game.settings.get('world-scripter', 'debug'))
          logger.info("DEBUG | ", ...args);
  }
}