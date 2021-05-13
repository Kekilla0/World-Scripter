import { logger } from './logger.js';

export class settings{
  static title = "World Scripter";
  static name = "world-scripter";
  static key = "world-scripter.world-scripter-macros";

  static register(){
    logger.info("Registering all Settings");
    settings.register_logger();
  }

  static value(str){
    return game.settings.get(settings.name, str);
  }

  static register_logger(){
    logger.info("Registering Logger Debugging");
    game.settings.register(
      settings.name,
      'debug', 
      {
        name : "",
        hint : "",
        scope :"world",
        config : false,
        default : false,
        type : Boolean
      },
    );
  }
}