import { logger } from './logger.js';
import * as settings from './settings.js';

const pack_key = "world-scripter.world-scripter-macros";

Hooks.on('init', ()=>{
  logger.info("Register All Settings");
  settings.registerSettings();
});

Hooks.on('ready', async ()=>{  
  let pack = game.packs.get(pack_key);
  let contents = await pack.getContent();

  contents.forEach(content=>{
    try{
      logger.info("Macro Data | Executing ", content.data.name);
      eval(content.data.command);
    }catch(err){
      logger.error(`Failed to execute : `, content.data.name);
    }
  });
});


