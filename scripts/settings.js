import { logger } from './logger.js';

export class settings{
  static TITLE = "World Scripter";
  static NAME = "world-scripter";
  static KEY = "world.macros";

  static register(){
    logger.info("Registering all Settings");
    settings.register_logger();
  }

  static value(key){
    return game.settings.get(settings.NAME, key);
  }
  static i18n(key){
    return game.i18n.localize(key);
  }

  static register_logger(){
    //logger.info("Registering Logger Debugging");
    game.settings.register(
      settings.NAME,
      'debug', 
      {
        name : settings.i18n("settings.debug.name"),
        hint : settings.i18n("settings.debug.hint"),
        scope :"world",
        config : true,
        default : false,
        type : Boolean
      },
    );

    game.settings.register(
      settings.NAME,
      'enableContext', {
        name: settings.i18n("ws.settings.enableContext.name"),
        hint: settings.i18n("ws.settings.enableContext.hint"),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
      }
    );
  }

  //gmOnly edit
}
