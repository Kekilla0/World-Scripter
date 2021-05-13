import { logger } from './logger.js';
import { settings } from './settings.js';

export class scripter{
  static async execute_pack(){
    logger.info("Accessing Pack | ", settings.key);
    let pack = game.packs.get(settings.key);
    if(!pack) return logger.error(`${settings.title} script pack missing.`);
    let contents = await pack.getContent();
    contents.forEach(macro => scripter.execute_macro(macro));
  }

  static execute_macro(macro){
    logger.info("Macro Data | Executing | ", macro.data.name);
    try{
      eval(macro.data.command);
    }catch(err){
      logger.error(`Failed to execute | `, macro.data);
      console.error(err);
    }
  }

  static add_context(html, contextOptions){
    logger.info("Adding Context Menu Items");
    contextOptions.push({
      name : `Add to ${settings.title} Compendium`,
      icon : '<i class="fas fa-download"></i>',
      condition : () => game.user.isGM,
      callback : li => scripter.add_To_Compendium(li?.data("entityId")),
    });
  }

  static async add_To_Compendium(_id){
    logger.info("Context Clicked | ", _id);
    let macro = game.macros.get(_id);
    if(!macro) return logger.error(`Macro ID Error, ${_id}`);
    let pack = game.packs.get(settings.key);
    if(!pack) return logger.error(`${settings.title} script pack missing.`);
    let index = await pack.getIndex();
    if(index.find(ele => ele.name === macro.name))
      await pack.updateEntity({_id : index.find(ele => ele.name === macro.name)._id, command : macro.data.command });
    else 
      await pack.createEntity(macro);
  }
}
