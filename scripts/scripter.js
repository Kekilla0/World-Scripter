import { logger } from './logger.js';

const info = {
  name : "World Scripter",
  key : "world-scripter",
  comp : "world-scripter-macros",
};

export async function execute_pack(){
  logger.info("Accessing Pack | ", info);
  let pack = game.packs.get(`${info.key}.${info.comp}`);
  let contents = await pack.getContent();
  contents.forEach(c=> execute_command(c.data.name, c.data.command));
}

function execute_command(name, command){
  logger.info("Macro Data | Executing ", name);
  try{
    eval(command);
  }catch(err){
    logger.error(`Failed to execute : ${name}`, err);
  }
}
export function addContext(html, contextOptions){
  logger.info("Adding Context Menu Items");
  contextOptions.push({
    name : `Add to ${info.name} Compendium`,
    icon : '<i class="fas fa-download"></i>',
    condition : () => game.user.isGM,
    callback : li => add_To_Compendium(li?.data("entityId")),
  })
}

async function add_To_Compendium(_id){
  logger.info("Context Clicked | ", _id);
  let macro = game.macros.get(_id);
  if(!macro) return new Error("Macro ID Error");
  let pack = game.packs.get(`${info.key}.${info.comp}`);
  let index = await pack.getIndex();
  if(index.find(ele => ele.name === macro.name))
    await pack.updateEntity({_id : index.find(ele => ele.name === macro.name)._id, command : macro.data.command });
  else 
    await pack.createEntity(macro);
}

