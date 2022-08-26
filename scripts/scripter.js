import { logger } from './logger.js';
import { settings } from './settings.js';

export class scripter{
  static async execute_pack(){
    logger.debug("Accessing Pack | ", settings.KEY);
    let pack = game.packs.get(settings.KEY) ?? game.packs.get(`world.macros`);

    logger.debug("SCRIPTER | PACK | ", { pack, key : pack?.collection });

    if(!pack && game.user.isGM){
      logger.error(`${settings.TITLE} ${settings.i18n("error.scriptMissing")}`);
      logger.error(`${settings.TITLE} CREATING COMPENDIUM.`);
      pack = await CompendiumCollection.createCompendium({
        type : "Macro", label : "World Scripter Macros", name : "macros", package : "world", path : "packs/macros.db", private : false,
      });
    } 
    let contents = await pack.getDocuments();
    contents.forEach(macro => scripter.execute_macro(macro));
  }

  static execute_macro(macro){
    
    //back compat
    const data = game.release.generation < 10 ? macro.data : macro;

    logger.info("Macro Data | Executing | ", data.name);
    try{
      eval(data.command);
    }catch(err){
      logger.error(`${settings.i18n("error.scriptFailure")} | `, data);
      console.error(err);
    }
  }

  static add_context(origin, contextOptions){

    logger.info("Adding Context Menu Items");

    const callback = origin == "HotBar" 
      ? (li) => scripter.add_To_Compendium(li?.data("macroId"))
      : (li) => scripter.add_To_Compendium(li?.data("documentId"));

    contextOptions.push({
      name : `${settings.i18n("context.PreTitle")} ${settings.TITLE} ${settings.i18n("context.PostTitle")}`,
      icon : '<i class="fas fa-download"></i>',
      condition : () => game.user.isGM && game.settings.get(settings.NAME, 'enableContext'),
      callback,
    });
  }

  static async add_To_Compendium(_id){
    logger.info("Context Clicked | ", _id);

    let macro = game.macros.get(_id);
    if(!macro) return logger.error(`${settings.i18n("error.macroID")}, ${_id}`);

    let pack = game.packs.get(settings.KEY);
    if(!pack) return logger.error(`${settings.TITLE} ${settings.i18n("error.scriptMissing")}`);

    let status = pack.locked;
    if(status) await pack.configure({ locked : false });

    //back compat
    const data = game.release.generation < 10 ? macro.data : macro;

    let index = await pack.getIndex();
    if(index.find(ele => ele.name === macro.name))
      await (await pack.getDocument(index.find(ele => ele.name === data.name)._id)).update({ command : data.command }, { pack : pack.collection });
    else 
      await pack.documentClass.create(data, { pack : pack.collection });

    if(status) await pack.configure({ locked : true });
  }
}
