import { logger } from './logger.js';
import * as settings from './settings.js';
import * as scripter from './scripter.js';


//CONFIG.debug.hooks = true;
logger.info("Initializing Module");
Hooks.on('init', settings.registerSettings);
Hooks.on('ready', scripter.execute_pack);
Hooks.on('getMacroDirectoryEntryContext', scripter.addContext);
//Hooks.on('getHotbarEntryContext', scripter.addContext);


/*
  Ideas : Add a context menu to add macro to compendium.
    Hooks :
      `getMacroDirectoryEntryContext`
      `getCompendiumDirectoryEntryContext`
      `getItemDirectoryEntryContext`
      //getHotbarEntryContext???
*/