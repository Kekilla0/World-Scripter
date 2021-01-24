import { logger } from './logger.js';

export function registerSettings()
{
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
    default : true,
    type : Boolean
  });
}