import { logger } from './logger.js';
import * as settings from './settings.js';

const pack_key = "world-scripter.world-scripter-macros";
const wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));

Hooks.on('init', ()=>{
  logger.info("Register All Settings");
  settings.registerSettings();
});

Hooks.on('ready', async ()=>{
  logger.debug("Macro Data (INIT) | ", game.packs.get(pack_key));
  
  let pack = game.packs.get(pack_key);
  let contents = await pack.getContent();

  for(let content of contents)
  {
    content.execute();
    await wait(100); //might not be necessary
  }
});


