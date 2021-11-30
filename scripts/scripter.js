import { logger } from './logger.js';
import { settings } from './settings.js';

export class scripter{
  static async execute_pack(){
    logger.debug("Accessing Pack | ", settings.KEY);
    let pack = game.packs.get(settings.KEY);
    if(!pack) return logger.error(`${settings.TITLE} ${settings.i18n("error.scriptMissing")}`);
    let contents = await pack.getDocuments();
    contents.forEach(macro => scripter.execute_macro(macro));
  }

  static execute_macro(macro){
    logger.info("Macro Data | Executing | ", macro.data.name);
    try{
      eval(macro.data.command);
    }catch(err){
      logger.error(`${settings.i18n("error.scriptFailure")} | `, macro.data);
      console.error(err);
    }
  }

  static add_context(html, contextOptions){
    logger.info("Adding Context Menu Items");
    contextOptions.push({
      name : `${settings.i18n("context.PreTitle")} ${settings.TITLE} ${settings.i18n("context.PostTitle")}`,
      icon : '<i class="fas fa-download"></i>',
      condition : () => game.user.isGM,
      callback : li => scripter.add_To_Compendium(li?.data("entityId")),
    });
  }

  static async add_To_Compendium(_id){
    logger.info("Context Clicked | ", _id);

    let macro = game.macros.get(_id);
    if(!macro) return logger.error(`${settings.i18n("error.macroID")}, ${_id}`);

    let pack = game.packs.get(settings.KEY);
    if(!pack) return logger.error(`${settings.TITLE} ${settings.i18n("error.scriptMissing")}`);

    let status = pack.locked;
    if(!status) pack.configure({ locked : !status });

    let index = await pack.getIndex();
    if(index.find(ele => ele.name === macro.name))
      await pack.updateEntity({_id : index.find(ele => ele.name === macro.name)._id, command : macro.data.command });
    else 
      await pack.createEntity(macro.data);

    if(!status) pack.configure({ locked : status });
  }
}
