import { logger } from './logger.js';
import * as settings from './settings.js';

const pack_key = "world-scripter.world-scripter-macros";

Hooks.on('init', ()=>{
  logger.info("Register All Settings");
  settings.registerSettings();
});

Hooks.on('ready', async ()=>{  
  execute_pack();
});

async function execute_pack(){
  let pack = game.packs.get(pack_key);
  let contents = await pack.getContent();
  contents.forEach(c=> execute_command(c.data.name, c.data.command));
}

function execute_command(name, command){
  logger.info("Macro Data | Executing ", name);
  try{
    eval(command);
  }catch(err){
    logger.error(`Failed to execute : `, name);
  }
}


/*
  Ideas : Add a context menu to add macro to compendium.
*/