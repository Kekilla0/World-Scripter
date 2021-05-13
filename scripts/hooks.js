import { logger } from './logger.js';
import { settings } from './settings.js';
import { scripter } from './scripter.js';

logger.info("Initializing Module");
Hooks.on('init', settings.register);
Hooks.on('ready', scripter.execute_pack);
Hooks.on('getMacroDirectoryEntryContext', scripter.add_context);


/*
  Ideas : Add a context menu to add macro to compendium.
    Hooks :
      `getMacroDirectoryEntryContext`
      `getCompendiumDirectoryEntryContext`
      `getItemDirectoryEntryContext`
      //getHotbarEntryContext???
*/