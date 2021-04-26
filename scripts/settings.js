import { logger } from './logger.js';

export function registerSettings()
{
  logger.info("Registering all Settings.");
  Logger_Settings();
}

function Logger_Settings()
{
  logger.info("Registering Logger Debugging");
  game.settings.register('world-scripter','debug', {
    name : "",
    hint : "",
    scope :"world",
    config : false,
    default : false,
    type : Boolean
  });
}